import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { calculateAggregateReturn, type IBitcoinPriceRecord } from "@argonprotocol/apps-core";

dayjs.extend(utc);

export const BITCOIN_LIQUID_SCENARIO_UNIT_SCALE = 1_000_000;

export function calculateBitcoinLiquidRatchetReturn({
  prices,
  flatFee,
  percentageFee,
  ratchetThreshold,
}: {
  prices: readonly IBitcoinPriceRecord[];
  flatFee: number;
  /** Percentage points charged by the vault. For example, 5 means 5%. */
  percentageFee: number;
  /** Ratio required to ratchet. For example, 0.1 means 10%. */
  ratchetThreshold: number;
}) {
  if (!prices.length) {
    return {
      ...calculateAggregateReturn([]),
      finalLockPrice: 0,
      grossFees: 0n,
      ratchetCount: 0,
    };
  }

  const startingPrice = prices[0].price;
  const startingDate = dayjs.utc(prices[0].date);
  const fullTermDays = Math.max(1, dayjs.utc(prices.at(-1)!.date).diff(startingDate, "day"));
  let lockPrice = startingPrice;
  let argonsReceived = startingPrice;
  let grossFees = flatFee + startingPrice * (percentageFee / 100);
  let ratchetCount = 0;

  for (const priceRow of prices.slice(1)) {
    const priceDifference = priceRow.price - lockPrice;
    if (Math.abs(priceDifference / lockPrice) < ratchetThreshold) continue;

    grossFees += flatFee;
    if (priceDifference > 0) {
      const liquidityUntilMarketValue = Math.max(0, priceRow.price - argonsReceived);
      const fullLiquidity = Math.min(priceDifference, liquidityUntilMarketValue);
      const halfLiquidity = (priceDifference - fullLiquidity) * 0.5;
      const liquidityReleased = fullLiquidity + halfLiquidity;
      const elapsedDays = dayjs.utc(priceRow.date).diff(startingDate, "day");
      const remainingDays = Math.max(0, fullTermDays - elapsedDays);
      const amountToMint = BigInt(Math.floor(liquidityReleased * BITCOIN_LIQUID_SCENARIO_UNIT_SCALE));
      const percentageFeeAmount = BigInt(Math.ceil(Number(amountToMint) * (percentageFee / 100)));

      const proratedFee = (percentageFeeAmount * BigInt(remainingDays)) / BigInt(fullTermDays);
      grossFees += Number(proratedFee) / BITCOIN_LIQUID_SCENARIO_UNIT_SCALE;
      argonsReceived += liquidityReleased;
    }

    lockPrice = priceRow.price;
    ratchetCount += 1;
  }

  const grossFeesScaled = scaleScenarioValue(grossFees);
  const aggregateReturn = calculateAggregateReturn([
    {
      startingCapital: scaleScenarioValue(startingPrice) + grossFeesScaled,
      endingCapital: scaleScenarioValue(argonsReceived),
    },
  ]);

  return {
    ...aggregateReturn,
    finalLockPrice: lockPrice,
    grossFees: grossFeesScaled,
    ratchetCount,
  };
}

function scaleScenarioValue(value: number): bigint {
  return BigInt(Math.round(value * BITCOIN_LIQUID_SCENARIO_UNIT_SCALE));
}
