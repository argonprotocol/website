import * as Fs from 'node:fs';
import * as Path from 'node:path';
import { fileURLToPath } from 'node:url';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import {
  MainchainClients,
  NetworkConfig,
  JsonExt,
} from '@argonprotocol/apps-core';
import { Vaults } from './lib/Vaults.ts';
import { PriceIndex as PriceIndexModel } from "@argonprotocol/mainchain";
import IBasicsRecord from "../src/interfaces/IBasicsRecord.ts";
import { getMainchainClients, getMiningFrames, getPriceIndex } from './lib/mainchain.ts';
import BigNumber from 'bignumber.js';

dayjs.extend(utc);

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

export default async function run() {
  for (const chain of ['testnet', 'mainnet'] as const) {
    console.log('------------------------------------------------------');
    console.log(`Fetching Argon Basic Data for ${chain}`);
    console.log('------------------------------------------------------');

    // Write data to JSON file
    const dataDir = Path.join(__dirname, '..', 'public', 'data');
    const filePath = Path.join(dataDir, `argonBasics.${chain}.json`);

    if (!Fs.existsSync(dataDir)) {
      console.log(`Creating directory: ${dataDir}`);
      Fs.mkdirSync(dataDir, {recursive: true});
    }

    NetworkConfig.setNetwork(chain);
    const networkConfig = NetworkConfig.get();
    const mainchainClients = new MainchainClients(networkConfig.archiveUrl);
    const api = await mainchainClients.archiveClientPromise;

    const microgonsIssued = await api.query.balances.totalIssuance();
    const micronotsIssued = await api.query.ownership.totalIssuance();
    const priceIndexModel = new PriceIndexModel();
    await priceIndexModel.load(api);

    const dollarValueOfVaultedBitcoin = await fetchDollarValueOfVaultedBitcoin(chain);
    const burnPerBitcoinDollar = calculateUnlockBurnPerBitcoinDollar(0.001);
    const argonBurnPotentialFromBitcoins = burnPerBitcoinDollar * dollarValueOfVaultedBitcoin;

    const data: IBasicsRecord = {
      lastUpdatedAt: dayjs.utc().toISOString(),
      microgonsInCirculation: microgonsIssued.toBigInt(),
      micronotsInCirculation: micronotsIssued.toBigInt(),
      usdForArgon: (priceIndexModel.argonUsdPrice || BigNumber(0)).toNumber(),
      argonotUsdPrice: (priceIndexModel.argonotUsdPrice || BigNumber(0)).toNumber(),
      btcUsdPrice: (priceIndexModel.btcUsdPrice || BigNumber(0)).toNumber(),
      argonBurnPotentialFromBitcoins,
    };

    Fs.writeFileSync(filePath, JsonExt.stringify(data, 2));
    console.log(`Successfully saved Argon Basic Data`);
  }
}

// FUNCTIONS

async function fetchDollarValueOfVaultedBitcoin(chain: 'testnet' | 'mainnet'): Promise<number> {
  const miningFrames = getMiningFrames(chain);
  const priceIndex = getPriceIndex(chain);
  const mainchainClients = getMainchainClients(chain);
  const vaults = new Vaults(chain, priceIndex, miningFrames, mainchainClients);
  await vaults.load();
  const satsLocked = vaults.getTotalSatoshisLocked();

  const microgonValue = await vaults.getMarketRate(satsLocked);
  const microgonExchangeRatesTo = await priceIndex.fetchMicrogonExchangeRatesTo();
  return BigNumber(microgonValue).dividedBy(microgonExchangeRatesTo.USD).toNumber();
}

function calculateUnlockBurnPerBitcoinDollar(argonRatioPrice: number): number {
  const r = argonRatioPrice;
  if (r >= 1.0) {
    return 1;
  } else if (r >= 0.9) {
    return 20 * Math.pow(r, 2) - 38 * r + 19;
  } else if (r >= 0.01) {
    return (0.5618 * r + 0.3944) / r;
  } else {
    return (1 / r) * (0.576 * r + 0.4);
  }
}
