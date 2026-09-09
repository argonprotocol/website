import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { calculateMiningEntryBid, createGrowthCycle, iterateGrowthCycle, MAX_MINING_BID_PER_SEAT, type GrowthCycleState } from "@/lib/exponentialTriggers";
import { advanceOperatorAccount, createOperatorAccount, operatorAccountValue } from "@/lib/growthOperatorAccount";
import { createPlayback, iteratePlaybackStep, type PlaybackFrame } from "@/lib/growthSimulatorPlayback";

function networkState(): GrowthCycleState {
  const data = JSON.parse(readFileSync("public/data/argonBasics.mainnet.json", "utf8"), (_, value) => {
    return typeof value === "string" && /^-?\d+n$/.test(value) ? BigInt(value.slice(0, -1)) : value;
  });
  return createGrowthCycle(data);
}

function finishStep(frame: PlaybackFrame) {
  const iterator = iteratePlaybackStep(frame);
  for (let day = 0; day < 10000; day++) {
    const next = iterator.next();
    if (next.done) return next.value;
  }
  throw new Error("Playback step did not finish");
}

describe("growth operator account", () => {
  it.each([0.1, 0.5, 0.9])("preserves the initial capital with a %s mining allocation", allocation => {
    const state = networkState();
    const account = createOperatorAccount(state, allocation);
    expect(account.miningAllocation).toBe(allocation);
    expect(account.value).toBeCloseTo(10000, 8);
    expect(account.miningPositions.every(position => Number.isInteger(position.seats))).toBe(true);
    expect(account.miningPositions.reduce((sum, position) => sum + position.seats, 0)).toBeLessThanOrEqual(state.dailySeatCount);
    expect(account.vaultArgons + account.vaultArgonots * state.argonotPriceUsd / state.argonPriceUsd + account.vaultCash).toBeCloseTo(10000 * (1 - allocation));
    expect(account.vaultArgonots * state.argonotPriceUsd / state.argonPriceUsd).toBeLessThanOrEqual(account.vaultArgons * 2 + 1e-8);
    expect(account.recruitedBitcoinValue).toBeLessThanOrEqual(state.bitcoinLocked * state.bitcoinPriceUsd / state.argonPriceUsd);
    expect(account.recruitedBonds).toBeLessThanOrEqual(state.bondCapital);
    expect(operatorAccountValue({ ...account, recruitedBitcoinValue: 1e9, recruitedBonds: 1e9, recruitedStakeValue: 1e9 }, state)).toBeCloseTo(10000);
  });

  it("does not buy fractional seats or spend unavailable cash", () => {
    const state = { ...networkState(), argonsBidPerSeat: 20000 };
    const account = createOperatorAccount(state, 0.5);
    expect(account.miningPositions).toHaveLength(0);
    expect(account.miningCash).toBe(5000);
  });

  it("amortizes paid bids and returns only mining ARGNOT after ten days", () => {
    const state = { ...networkState(), argonsBidPerSeat: 1e9, miningAuctionRevenue: 0 };
    let account = {
      ...createOperatorAccount(state, 1),
      miningCash: 0,
      miningPositions: [{ seats: 1, daysRemaining: 10, prepaidBids: 100, argonots: 5 }],
    };
    const collateral = 5 * state.argonotPriceUsd / state.argonPriceUsd;
    account.value = operatorAccountValue(account, state);
    expect(account.value).toBeCloseTo(100 + collateral);
    for (let day = 1; day <= 10; day++) {
      account = advanceOperatorAccount(account, { ...state, elapsedDays: state.elapsedDays + day }, 0, 0);
      expect(account.value).toBeCloseTo(100 * (10 - day) / 10 + collateral);
    }
    expect(account.miningPositions).toHaveLength(0);
    expect(account.miningCash).toBeCloseTo(collateral);
  });

  it("pays actual daily issuance only to existing seats and does not mutate prior snapshots", () => {
    const state = networkState();
    const account = createOperatorAccount(state, 0.5);
    const snapshot = structuredClone(account);
    const seats = account.miningPositions.reduce((sum, position) => sum + position.seats, 0);
    const next = advanceOperatorAccount(account, { ...state, elapsedDays: state.elapsedDays + 1 }, 100, 2);
    expect(next.miningIncome).toBeCloseTo((100 + 2 * state.argonotPriceUsd / state.argonPriceUsd) * seats / state.seatCount);
    expect(account).toEqual(snapshot);
    expect(advanceOperatorAccount(next, { ...state, elapsedDays: next.elapsedDays }, 100, 2)).toBe(next);
  });

  it("marks owned ARGNOT to market without treating recruitment as profit", () => {
    const state = networkState();
    const account = createOperatorAccount(state, 0.5);
    const ownedArgonots = account.vaultArgonots + account.miningPositions.reduce((total, position) => total + position.argonots, 0);
    expect(operatorAccountValue(account, { ...state, argonotPriceUsd: state.argonotPriceUsd * 2 }) - account.value)
      .toBeCloseTo(ownedArgonots * state.argonotPriceUsd / state.argonPriceUsd);
  });

  it("keeps recruitment and investments within an exhausted network's available capital", () => {
    const state = { ...networkState(), vaultArgonSecuritization: 0, bitcoinLocked: 0, bondCapital: 0, stakePercent: 0 };
    const account = createOperatorAccount(state, 0.5);
    expect(account.vaultCash).toBe(5000);
    expect(account.vaultArgons).toBe(0);
    expect(account.vaultArgonots).toBe(0);
    expect(account.recruitedBitcoinValue).toBe(0);
    expect(account.recruitedBonds).toBe(0);
    expect(account.recruitedStakeValue).toBe(0);
  });

  it("advances only on engine days, retains the split, and leaves network economics unchanged", () => {
    let miningHeavy = createPlayback(networkState(), 0.8);
    let vaultHeavy = createPlayback(networkState(), 0.2);
    for (let step = 0; step < 6 * 12; step++) {
      const previousAccount = miningHeavy.operatorAccount;
      const previousStep = miningHeavy.step;
      miningHeavy = finishStep(miningHeavy);
      vaultHeavy = finishStep(vaultHeavy);
      expect(miningHeavy.state).toEqual(vaultHeavy.state);
      expect(miningHeavy.operatorAccount.miningAllocation).toBe(0.8);
      expect(miningHeavy.operatorAccount.elapsedDays).toBe(miningHeavy.state.elapsedDays);
      expect(Number.isFinite(miningHeavy.operatorValue)).toBe(true);
      expect(miningHeavy.operatorValue).toBeGreaterThanOrEqual(0);
      expect(miningHeavy.operatorAccount.miningCash).toBeGreaterThanOrEqual(0);
      expect(miningHeavy.operatorAccount.vaultCash).toBeGreaterThanOrEqual(0);
      expect(miningHeavy.operatorAccount.miningPositions.reduce((sum, position) => sum + position.seats, 0)).toBeLessThanOrEqual(miningHeavy.state.seatCount);
      if (previousStep !== 0 && previousStep !== 3) expect(miningHeavy.operatorAccount).toBe(previousAccount);
    }
  });
});


describe("expanding mining seat capacity", () => {
  it("caps bids, reprices 2x collateral, and rolls whole-seat cohorts on every engine day", () => {
    let frame = createPlayback(networkState(), 0.324);
    const startingSeatCount = frame.state.seatCount;
    let sawExpansion = false;
    for (let step = 0; step < 48; step++) {
      const iterator = iteratePlaybackStep(frame);
      let previousState = frame.state;
      while (true) {
        const result = iterator.next();
        frame = result.value;
        const state = frame.state;
        expect(state.argonsBidPerSeat).toBeLessThanOrEqual(MAX_MINING_BID_PER_SEAT);
        expect(state.argonotsBidPerSeat * state.argonotPriceUsd / state.argonPriceUsd).toBeCloseTo(2 * state.argonsBidPerSeat, 6);
        expect(state.miningCohortSeats.every(seats => Number.isSafeInteger(seats) && seats > 0)).toBe(true);
        expect(state.miningCohortSeats.reduce((total, seats) => total + seats, 0)).toBe(state.seatCount);
        if (state.elapsedDays > previousState.elapsedDays) {
          expect(state.miningCohortSeats.slice(0, -1)).toEqual(previousState.miningCohortSeats.slice(1));
          expect(state.dailySeatCount).toBeGreaterThanOrEqual(previousState.dailySeatCount);
          expect(state.miningCohortSeats[9]).toBe(state.dailySeatCount);
          const latestBid = state.miningAuctionCohortRevenues[9] / state.dailySeatCount;
          expect(latestBid).toBeCloseTo(state.argonsBidPerSeat);
          sawExpansion ||= state.seatCount > startingSeatCount * 2;
        }
        previousState = state;
        if (result.done) break;
      }
    }
    expect(sawExpansion).toBe(true);
  });

  it("allows more than the original daily allotment without changing locked mining collateral", () => {
    const initial = networkState();
    const state = {
      ...initial,
      seatCount: 1000,
      dailySeatCount: 100,
      miningCohortSeats: Array(10).fill(100),
      baseArgonRewards: 1,
      baseArgonotRewards: 0,
      pendingMiningMint: 0,
      argonsBidPerSeat: 10,
      argonotsBidPerSeat: 20 * initial.argonPriceUsd / initial.argonotPriceUsd,
    };
    const account = createOperatorAccount(state, 0.9);
    expect(account.miningPositions[0].seats).toBe(100);
    const next = advanceOperatorAccount(account, {
      ...state,
      elapsedDays: state.elapsedDays + 1,
      argonotPriceUsd: state.argonotPriceUsd * 2,
      argonotsBidPerSeat: state.argonotsBidPerSeat / 2,
    }, 0, 0);
    expect(next.miningPositions[0].argonots).toBe(account.miningPositions[0].argonots);
    expect(next.miningPositions[0].daysRemaining).toBe(9);
  });
});


describe("competitive operator entry prices", () => {
  it("expands vaulting-day seat capacity from competitive demand despite staged revenue", () => {
    const state = networkState();
    state.baseArgonRewards = state.seatCount * MAX_MINING_BID_PER_SEAT * 5;
    state.activeSide = "vaulting";
    state.status = "running";
    expect(calculateMiningEntryBid(state)).toBeGreaterThan(MAX_MINING_BID_PER_SEAT);
    const firstDay = iterateGrowthCycle(state).next().value.next;
    expect(firstDay.dailySeatCount).toBeGreaterThan(state.dailySeatCount);
    expect(firstDay.argonsBidPerSeat).toBeLessThanOrEqual(MAX_MINING_BID_PER_SEAT);
  });

  it("does not buy at a stale bid while rewards require an unaffordable entry price", () => {
    const state = networkState();
    state.argonsBidPerSeat = 1;
    state.argonotsBidPerSeat = 2 * state.argonPriceUsd / state.argonotPriceUsd;
    state.baseArgonRewards = state.seatCount * 5000;
    state.baseArgonotRewards = 0;
    state.pendingMiningMint = 0;
    expect(calculateMiningEntryBid(state)).toBeGreaterThan(4000);
    const account = createOperatorAccount(state, 0.9);
    expect(account.miningPositions).toHaveLength(0);
    expect(account.miningCash).toBe(9000);
  });

  it.each([0.1, 0.2, 0.324, 0.5, 0.7, 0.8, 0.9])("reconciles each day and charges competitive bids for allocation %s", allocation => {
    let frame = createPlayback(networkState(), allocation);
    let revaluation = 0;
    let expiredBidCost = 0;
    for (let step = 0; step < 12; step++) {
      const iterator = iteratePlaybackStep(frame);
      let previous = frame;
      while (true) {
        const result = iterator.next();
        frame = result.value;
        if (frame.state.elapsedDays > previous.state.elapsedDays) {
          const heldArgonots = previous.operatorAccount.vaultArgonots
            + previous.operatorAccount.miningPositions.reduce((total, position) => total + position.argonots, 0);
          revaluation += heldArgonots * (frame.state.argonotPriceUsd / frame.state.argonPriceUsd
            - previous.state.argonotPriceUsd / previous.state.argonPriceUsd);
          expiredBidCost += previous.operatorAccount.miningPositions.reduce((total, position) => total + position.prepaidBids / 10, 0);
          expect(frame.operatorValue).toBeCloseTo(10000 + frame.operatorAccount.miningIncome
            + frame.operatorAccount.vaultIncome + revaluation - expiredBidCost, 6);
          for (const position of frame.operatorAccount.miningPositions.filter(position => position.daysRemaining === 10)) {
            expect(position.prepaidBids / position.seats).toBeGreaterThanOrEqual(calculateMiningEntryBid(frame.state) - 1e-8);
            expect(position.prepaidBids / position.seats).toBeLessThanOrEqual(MAX_MINING_BID_PER_SEAT);
            expect(position.argonots * frame.state.argonotPriceUsd / frame.state.argonPriceUsd).toBeCloseTo(position.prepaidBids * 2, 6);
          }
        }
        previous = frame;
        if (result.done) break;
      }
    }
    expect(frame.completedCycles).toBe(2);
  });
});


describe("mining return target settlement", () => {
  it("settles eight mining phases at 53.99% using actual bids, seats, and rewards", () => {
    let frame = createPlayback(networkState(), 0.5);
    for (let cycle = 0; cycle < 8; cycle++) {
      const startingDays = frame.state.elapsedDays;
      frame = finishStep(frame);
      const state = frame.state;
      const latest = state.miningCohortSeats.length - 1;
      const seats = state.miningCohortSeats[latest];
      const bid = state.miningAuctionCohortRevenues[latest] / seats;
      const baseRewards = state.rewardReductionActive ? state.miningCohortBaseArgonRewards[latest] : state.baseArgonRewards;
      const argonotPrice = state.argonotPriceUsd / state.argonPriceUsd;
      const rewards = (baseRewards + state.pendingMiningMint) / state.seatCount
        + state.miningCohortMintedArgons[latest] / seats
        + state.baseArgonotRewards / state.seatCount * argonotPrice;
      const invested = bid + state.argonotsBidPerSeat * argonotPrice;
      const actualApy = ((1 + (rewards - bid) / invested) ** (365 / 10) - 1) * 100;
      expect(actualApy).toBeCloseTo(53.99, 5);
      expect(frame.miningApy).toBeCloseTo(actualApy, 6);
      expect(state.elapsedDays).toBeGreaterThan(startingDays);
      expect(frame.step).toBe(1);
      expect(bid).toBeLessThanOrEqual(MAX_MINING_BID_PER_SEAT);
      expect(state.argonotsBidPerSeat * argonotPrice).toBeCloseTo(2 * bid, 6);
      for (let step = 1; step < 6; step++) frame = finishStep(frame);
    }
  });

  it("does not apply extra simulated days or issuance while solving the final bid", () => {
    const initial = networkState();
    const iterator = iterateGrowthCycle({ ...initial, activeSide: "mining" });
    let lastDays = 0;
    for (const result of iterator) {
      expect(result.days).toBe(lastDays + 1);
      expect(result.next.elapsedDays).toBe(initial.elapsedDays + result.days);
      expect(result.next.argonCirculation).toBeCloseTo(initial.argonCirculation
        + result.miningMintLoaded + result.bitcoinMintLoaded - result.argonBurned, 5);
      expect(result.next.argonotCirculation).toBeCloseTo(initial.argonotCirculation + result.argonotMintLoaded, 5);
      lastDays = result.days;
    }
    expect(lastDays).toBe(2);
  });
});
