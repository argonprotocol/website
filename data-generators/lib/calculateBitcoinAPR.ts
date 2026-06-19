import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { BitcoinFees, BitcoinPrices } from '@argonprotocol/apps-core';

dayjs.extend(utc);

const BTC_FLAT_FEE = 2.00;
const BTC_PCT_FEE = 5;
const RATCHET_THRESHOLD = 0.10;

type RatchetDirection = 'above' | 'below';

interface IBitcoinRatchet {
  date: string;
  direction: RatchetDirection;
  previousLockPrice: number;
  currentPrice: number;
  priceDiff: number;
  percentChange: number;
  bitcoinFee: number;
  argonFeeAdded: number;
  argonFees: number;
  argonsReceived: number;
}

interface IBitcoinRatchetAnalysis {
  startingDate: string;
  endingDate: string;
  startingMarketPrice: number;
  startingBitcoinFee: number;
  finalLockPrice: number;
  finalBitcoinFee: number;
  cost: number;
  finalValue: number;
  apr: number;
  argonsReceived: number;
  argonFees: number;
  ratchets: IBitcoinRatchet[];
}

function calculateBitcoinRatchetAnalysis(): IBitcoinRatchetAnalysis {
  const bitcoinPrices = new BitcoinPrices();
  const bitcoinFees = new BitcoinFees();
  const startingDate = dayjs.utc().subtract(1, 'year').format('YYYY-MM-DD');
  const endingDate = dayjs.utc().format('YYYY-MM-DD');
  const prices = bitcoinPrices.getDateRange(startingDate, endingDate);

  if (!prices.length) {
    throw new Error(`No bitcoin prices found between ${startingDate} and ${endingDate}`);
  }

  const startingPrice = prices[0].price;
  let lockPrice = startingPrice;
  let bitcoinFee = bitcoinFees.getByDate(prices[0].date);
  let argonsReceived = startingPrice;
  let argonFees = BTC_FLAT_FEE + startingPrice * (BTC_PCT_FEE / 100);
  const ratchets: IBitcoinRatchet[] = [];

  for (const priceRow of prices.slice(1)) {
    const currentPrice = priceRow.price;
    const percentChange = (currentPrice - lockPrice) / lockPrice;

    if (Math.abs(percentChange) < RATCHET_THRESHOLD) {
      continue;
    }

    const previousLockPrice = lockPrice;
    const priceDiff = currentPrice - previousLockPrice;
    const direction: RatchetDirection = priceDiff > 0 ? 'above' : 'below';
    bitcoinFee = bitcoinFees.getByDate(priceRow.date);

    let argonFeeAdded = BTC_FLAT_FEE;
    if (direction === 'above') {
      argonFeeAdded += priceDiff * (BTC_PCT_FEE / 100);
      argonsReceived += priceDiff;
    }

    argonFees += argonFeeAdded;
    lockPrice = currentPrice;

    ratchets.push({
      date: priceRow.date,
      direction,
      previousLockPrice,
      currentPrice,
      priceDiff,
      percentChange,
      bitcoinFee,
      argonFeeAdded,
      argonFees,
      argonsReceived,
    });
  }

  const cost = startingPrice + argonFees;
  const finalValue = argonsReceived;

  return {
    startingDate: prices[0].date,
    endingDate: prices[prices.length - 1].date,
    startingMarketPrice: startingPrice,
    startingBitcoinFee: bitcoinFees.getByDate(prices[0].date),
    finalLockPrice: lockPrice,
    finalBitcoinFee: bitcoinFee,
    cost,
    finalValue,
    apr: (finalValue - cost) / cost,
    argonsReceived,
    argonFees,
    ratchets,
  };
}

export default function calculateBitcoinAPR(): number {
  return calculateBitcoinRatchetAnalysis().apr * 100;
}
