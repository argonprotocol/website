import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import Data from "@/lib/Data";
import GrowthSimulator from "@/components/simulators/GrowthSimulator.vue";
import { calculateVaultRevenueShare, createGrowthCycle, iterateGrowthCycle, type GrowthCycleResult } from "@/lib/exponentialTriggers";
import { createPlayback, iteratePlaybackStep, type PlaybackFrame } from "@/lib/growthSimulatorPlayback";

function initialFrame() {
  const data = JSON.parse(readFileSync("public/data/argonBasics.mainnet.json", "utf8"), (_, value) => {
    return typeof value === "string" && /^-?\d+n$/.test(value) ? BigInt(value.slice(0, -1)) : value;
  });
  return createPlayback(createGrowthCycle(data));
}

function finishStep(frame: PlaybackFrame) {
  const iterator = iteratePlaybackStep(frame);
  for (let index = 0; index < 10_000; index++) {
    const result = iterator.next();
    if (result.done) return result.value;
  }
  throw new Error("Step exceeded 10,000 days");
}

describe("six-step simulator playback", () => {
  it.each([
    { cycles: 10, peak: 20_000_000, x: 20, y: 50_000_000 },
    { cycles: 2, peak: 50_000_000, x: 10, y: 100_000_000 },
    { cycles: 10, peak: 50_000_000, x: 20, y: 100_000_000 },
    { cycles: 2, peak: 450_000_000, x: 10, y: 800_000_000 },
  ])("resizes only maxed axes for $cycles cycles and $peak value", async ({ cycles, peak, x, y }) => {
    const data = JSON.parse(readFileSync("public/data/argonBasics.mainnet.json", "utf8"), (_, value) => {
      return typeof value === "string" && /^-?\d+n$/.test(value) ? BigInt(value.slice(0, -1)) : value;
    });
    vi.spyOn(Data, "fetchBasics").mockResolvedValue(data);
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => setTimeout(() => callback(performance.now()), 16));
    vi.stubGlobal("cancelAnimationFrame", (id: number) => clearTimeout(id));
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "performance"] });
    const wrapper = mount(GrowthSimulator);
    const state = wrapper.vm as unknown as { frame: PlaybackFrame; chartMaximum: number; chartLastCycle: number };
    try {
      await flushPromises();
      const base = state.frame.history[0];
      state.frame = {
        ...state.frame,
        completedCycles: cycles,
        history: Array.from({ length: cycles + 1 }, (_, index) => index === cycles ? peak : base),
      };
      await wrapper.vm.$nextTick();
      expect(wrapper.find(".chart-resize-overlay").text()).toBe("RESIZING");
      expect(wrapper.find(".mining-apy").attributes("disabled")).toBeUndefined();
      expect(wrapper.find(".autoplay-control").attributes("disabled")).toBeUndefined();
      expect(state.chartLastCycle).toBe(10);
      expect(state.chartMaximum).toBe(50_000_000);
      await vi.advanceTimersByTimeAsync(400);
      expect(state.chartLastCycle).toBe(10);
      expect(state.chartMaximum).toBe(50_000_000);
      await vi.advanceTimersByTimeAsync(1200);
      expect(state.chartLastCycle).toBeCloseTo((10 + x) / 2);
      expect(state.chartMaximum).toBeCloseTo((50_000_000 + y) / 2);
      expect(wrapper.find(".chart-resize-overlay").exists()).toBe(true);
      await vi.advanceTimersByTimeAsync(1200);
      expect(state.chartLastCycle).toBe(x);
      expect(state.chartMaximum).toBe(y);
      expect(wrapper.find(".chart-resize-overlay").exists()).toBe(true);
      await vi.advanceTimersByTimeAsync(200);
      expect(wrapper.find(".chart-resize-overlay").exists()).toBe(true);
      await vi.advanceTimersByTimeAsync(200);
      expect(wrapper.find(".chart-resize-overlay").exists()).toBe(false);
      expect(wrapper.find(".mining-apy").attributes("disabled")).toBeUndefined();
      expect(vi.getTimerCount()).toBe(0);

      state.frame = { ...state.frame, history: [...state.frame.history, y] };
      await wrapper.vm.$nextTick();
      expect(wrapper.find(".chart-resize-overlay").exists()).toBe(true);
      // Further growth during a resize is handled once the current resize ends.
      state.frame = { ...state.frame, history: [...state.frame.history, y * 4] };
      await vi.advanceTimersByTimeAsync(3200);
      expect(wrapper.find(".chart-resize-overlay").exists()).toBe(true);
      await vi.advanceTimersByTimeAsync(3200);
      expect(state.chartMaximum).toBe(y * 8);
      expect(wrapper.find(".chart-resize-overlay").exists()).toBe(false);

      state.frame = { ...state.frame, history: [...state.frame.history, y * 8] };
      await wrapper.vm.$nextTick();
      // Manual steps and autoplay can both start while resizing is visible.
      await wrapper.find(cycles === 2 ? ".autoplay-control" : ".mining-apy").trigger("click");
      expect(wrapper.find(".growth-loop").attributes("data-running")).toBe("true");
      expect(wrapper.find(".chart-resize-overlay").exists()).toBe(true);
      await wrapper.find(".reset-button").trigger("click");
      await flushPromises();
      await vi.runAllTimersAsync();
      expect(wrapper.find(".chart-resize-overlay").exists()).toBe(false);
      expect(state.chartLastCycle).toBe(10);
      expect(state.chartMaximum).toBe(50_000_000);
      expect(state.frame.history).toHaveLength(1);

      state.frame = { ...state.frame, history: [base, 50_000_000] };
      await wrapper.vm.$nextTick();
      wrapper.unmount();
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      if (wrapper.exists()) wrapper.unmount();
      vi.useRealTimers();
      vi.unstubAllGlobals();
      vi.restoreAllMocks();
    }
  });

  it("renders a new chart point and cycle number after six clicks", async () => {
    const data = JSON.parse(readFileSync("public/data/argonBasics.mainnet.json", "utf8"), (_, value) => {
      return typeof value === "string" && /^-?\d+n$/.test(value) ? BigInt(value.slice(0, -1)) : value;
    });
    vi.spyOn(Data, "fetchBasics").mockResolvedValue(data);
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => setTimeout(() => callback(performance.now()), 16));
    vi.stubGlobal("cancelAnimationFrame", (id: number) => clearTimeout(id));
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "performance"] });
    const wrapper = mount(GrowthSimulator);
    try {
      await flushPromises();
      const initialPoints = wrapper.find(".desktop-chart .chart-line").attributes("points");
      expect(initialPoints).not.toBe("107,512");
      const initialCoordinates = (initialPoints ?? "").split(" ").map(point => point.split(",").map(Number));
      expect(initialCoordinates).toHaveLength(2);
      expect(initialCoordinates[1][0]).toBeCloseTo(223.2);
      expect(initialCoordinates[1][1]).toBe(initialCoordinates[0][1]);
      expect(wrapper.findAll(".desktop-chart .chart-cycle-labels text").map(label => label.text())).toEqual(["Start", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
      for (const selector of [".mining-apy", ".bid-costs", ".revenue", ".vaulting-apy", ".new-argon", ".mining-rewards"]) {
        expect(wrapper.find(selector).attributes("disabled")).toBeUndefined();
        await wrapper.find(selector).trigger("click");
        await vi.runAllTimersAsync();
      }
      expect(wrapper.find(".engine-header").text()).toContain("Cycle #2");
      const points = wrapper.find(".desktop-chart .chart-line").attributes("points") ?? "";
      expect(points).not.toBe(initialPoints);
      expect(points.split(" ")).toHaveLength(3);
      expect(points.split(" ").slice(0, 2).join(" ")).toBe(initialPoints);
      expect(Number(points.split(" ")[2].split(",")[1])).toBeLessThan(initialCoordinates[1][1]);
      expect(Number(points.split(" ")[1].split(",")[0])).toBeCloseTo(223.2);
      expect(Number((wrapper.find(".mobile-chart .chart-line").attributes("points") ?? "").split(" ")[1].split(",")[0])).toBeCloseTo(84.8);
      await wrapper.find(".autoplay-control").trigger("click");
      await vi.runAllTimersAsync();
      expect(wrapper.find(".engine-header").text()).toContain("Cycle #3");
      expect(wrapper.find(".autoplay-control").attributes("aria-pressed")).toBe("false");
      expect(wrapper.find(".mining-apy").attributes("disabled")).toBeUndefined();
      expect(vi.getTimerCount()).toBe(0);

      await wrapper.find(".mining-apy").trigger("click");
      await vi.runAllTimersAsync();
      await wrapper.find(".autoplay-control").trigger("click");
      await vi.runAllTimersAsync();
      expect(wrapper.find(".engine-header").text()).toContain("Cycle #4");
      expect(wrapper.find(".autoplay-control").attributes("aria-pressed")).toBe("false");
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      wrapper.unmount();
      vi.useRealTimers();
      vi.unstubAllGlobals();
      vi.restoreAllMocks();
    }
  });

  it("preserves the engine state and bid amount while revealing revenue", () => {
    const start = { ...initialFrame(), step: 1 as const, bidCosts: 12324, cycleDays: 12 };
    const engine = vi.fn(iterateGrowthCycle);
    const iterator = iteratePlaybackStep(start, engine);
    const target = iterator.next().value;
    expect(target.revenue).toBeCloseTo(12324 * calculateVaultRevenueShare(start.state));
    expect(target.revenue).toBeLessThanOrEqual(12324 * 0.57);
    expect(target.bidCosts).toBe(12324);
    expect(target.state).toBe(start.state);
    expect(target.cycleDays).toBe(12);
    expect(start.bidCosts).toBe(12324);
    expect(iterator.next().value.step).toBe(2);
    expect(engine).not.toHaveBeenCalled();
  });

  it.each([
    { bitcoinLocked: 1, minedArgons: 0, securitization: 100, share: 0.57 },
    { bitcoinLocked: 0, minedArgons: 0, securitization: 100, share: 0.03 },
    { bitcoinLocked: 1, minedArgons: 10000, securitization: 100, share: 0.57 / 15 },
    { bitcoinLocked: 0, minedArgons: 0, securitization: 0, share: 0 },
  ])("uses vault utilization and coverage for revenue: $share", ({ bitcoinLocked, minedArgons, securitization, share }) => {
    const start = { ...initialFrame(), step: 1 as const, bidCosts: 1000 };
    start.state = {
      ...start.state,
      argonPriceUsd: 1,
      bitcoinPriceUsd: 100,
      bitcoinLocked,
      minedArgons,
      bitcoinArgons: 0,
      vaultArgonSecuritization: securitization,
      bondCapital: 100,
      miningAuctionRevenue: 1000,
    };
    const result = finishStep(start);
    expect(result.revenue).toBeCloseTo(1000 * share);
    expect(result.revenue).toBeLessThanOrEqual(result.bidCosts * 0.57);
    expect(result.bidCosts).toBe(1000);
    expect(result.state).toBe(start.state);
  });

  it("keeps bid costs through the cycle and replaces them in the next mining step", () => {
    let frame = { ...initialFrame(), step: 1 as const, bidCosts: 12324 } as PlaybackFrame;
    for (let step = 1; step <= 5; step++) {
      frame = finishStep(frame);
      expect(frame.bidCosts).toBe(12324);
    }
    expect(frame.step).toBe(0);
    const expected = finishStep({ ...frame, bidCosts: 0 });
    const next = finishStep(frame);
    expect(next.bidCosts).toBe(expected.bidCosts);
    expect(next.bidCosts).not.toBe(12324);
  });

  it("converts only the staged miner ARGN to reward dollars at the engine price", () => {
    const start = { ...initialFrame(), step: 4 as const, newArgon: 250, cycleDays: 7 };
    start.state = { ...start.state, argonPriceUsd: 1.2 };
    const end = finishStep(start);
    expect(end.newArgon).toBe(start.newArgon);
    expect(end.miningRewards).toBe(300);
    expect(end.cycleDays).toBe(7);
    expect(end.state).toBe(start.state);
    expect(end.completedCycles).toBe(0);
  });

  it("advances days only during APY steps and records one point per complete loop", () => {
    let frame = initialFrame();
    const startDays = frame.state.elapsedDays;
    for (const step of [0, 1, 2, 3, 4, 5]) {
      expect(frame.step).toBe(step);
      const before = frame;
      frame = finishStep(frame);
      expect(frame.stopReason).toBeNull();
      if (step !== 0 && step !== 3) {
        expect(frame.state.elapsedDays).toBe(before.state.elapsedDays);
        expect(frame.cycleDays).toBe(step === 5 ? 0 : before.cycleDays);
      }
      expect(frame.completedCycles).toBe(step === 5 ? 1 : 0);
      expect(frame.history).toHaveLength(step === 5 ? 2 : 1);
    }
    expect(frame.step).toBe(0);
    expect(frame.cycleDays).toBe(0);
    expect(frame.state.elapsedDays - startDays).toBeGreaterThan(0);
    expect(frame.history[1]).toBe(frame.state.networkValueUsd);
    expect(frame.miningRewards).toBe(0);
  });

  it("holds the receiving APY until its apply step and supports resuming between days", () => {
    const start = initialFrame();
    const iterator = iteratePlaybackStep(start);
    const first = iterator.next();
    expect(first.done).toBe(false);
    expect(first.value.cycleDays).toBe(1);
    expect(first.value.vaultingApy).toBe(start.vaultingApy);
    const second = iterator.next();
    if (!second.done) expect(second.value.cycleDays).toBe(2);
    expect(start.cycleDays).toBe(0);
    const ready = finishStep(start);
    const transferred = finishStep(ready);
    const applied = finishStep(transferred);
    expect(applied.vaultingApy).toBe(Math.min(applied.state.returns.vaultingApy, 1e12));
    expect(applied.revenue).toBe(transferred.revenue);
  });

  it("retains the last valid state and does not complete a stalled cycle", () => {
    const start = initialFrame();
    const day = iterateGrowthCycle({ ...start.state, activeSide: "mining" }).next().value;

    function* stalledEngine(): Generator<GrowthCycleResult, GrowthCycleResult, void> {
      const result = { ...day, outcome: "paused" as const, pauseReason: "no-progress" as const };
      yield result;
      return result;
    }

    const iterator = iteratePlaybackStep(start, stalledEngine);
    const valid = iterator.next().value;
    const stopped = iterator.next();
    expect(stopped.done).toBe(true);
    expect(stopped.value.state).toBe(valid.state);
    expect(stopped.value.stopReason).toBe("no-progress");
    expect(stopped.value.completedCycles).toBe(0);
    expect(stopped.value.history).toHaveLength(1);
    expect(iteratePlaybackStep(stopped.value).next().done).toBe(true);
  });

  it("hands off the capacity-limited result without recording a completed loop", () => {
    const start = { ...initialFrame(), step: 3 as const };
    const day = iterateGrowthCycle({ ...start.state, activeSide: "vaulting" }).next().value;

    function* limitedEngine(): Generator<GrowthCycleResult, GrowthCycleResult, void> {
      const result = { ...day, outcome: "capacity-limited" as const, pauseReason: "bitcoin-capacity" as const };
      yield result;
      return result;
    }

    const iterator = iteratePlaybackStep(start, limitedEngine);
    iterator.next();
    const stopped = iterator.next().value;
    expect(stopped.step).toBe(4);
    expect(stopped.stopReason).toBe("bitcoin-capacity");
    expect(stopped.completedCycles).toBe(0);
  });
});


describe("cycle output issuance breakdown", () => {
  it("retains gross vaulting-stage issuance without changing transfer amounts", () => {
    let frame = initialFrame();
    for (let step = 0; step < 3; step++) frame = finishStep(frame);
    const before = frame;
    const engine = iterateGrowthCycle({ ...before.state, activeSide: "vaulting" });
    let expected: GrowthCycleResult | undefined;
    for (const result of engine) expected = result;
    expect(expected).toBeDefined();
    frame = finishStep(frame);
    expect(frame.demandMiningArgon).toBe(expected!.miningMintLoaded);
    expect(frame.demandBitcoinArgon).toBe(expected!.bitcoinMintLoaded);
    expect(frame.demandArgonot).toBe(expected!.argonotMintLoaded);
    expect(frame.demandArgonotValueChange).toBeCloseTo(
      (frame.state.argonotCirculation * frame.state.argonotPriceUsd
        - before.state.argonotCirculation * before.state.argonotPriceUsd) / before.state.argonPriceUsd,
    );
    const share = frame.demandMiningArgon / (frame.demandMiningArgon + frame.demandBitcoinArgon);
    expect(share).toBeGreaterThan(0);
    expect(share).toBeLessThan(1);
    const rewards = finishStep(frame);
    expect(rewards.miningRewards).toBe(frame.newArgon * frame.state.argonPriceUsd);
    expect(rewards.demandArgonot).toBe(frame.demandArgonot);
    const completed = finishStep(rewards);
    expect(completed.demandMiningArgon).toBe(frame.demandMiningArgon);
    const nextCycle = finishStep(completed);
    expect(nextCycle.demandMiningArgon).toBe(0);
    expect(nextCycle.demandBitcoinArgon).toBe(0);
    expect(nextCycle.demandArgonot).toBe(0);
    expect(nextCycle.demandArgonotValueChange).toBe(0);
  });

  it("adds resumed issuance once instead of summing cumulative daily results", () => {
    let frame = initialFrame();
    for (let step = 0; step < 3; step++) frame = finishStep(frame);
    const baseline = finishStep(frame);
    const resumed = finishStep({
      ...frame,
      demandMiningArgon: 100,
      demandBitcoinArgon: 200,
      demandArgonot: 3,
      demandArgonotValueChange: -40,
    });
    expect(resumed.demandMiningArgon).toBe(baseline.demandMiningArgon + 100);
    expect(resumed.demandBitcoinArgon).toBe(baseline.demandBitcoinArgon + 200);
    expect(resumed.demandArgonot).toBe(baseline.demandArgonot + 3);
    expect(resumed.demandArgonotValueChange).toBeCloseTo(baseline.demandArgonotValueChange - 40);
  });
});
