import * as Fs from 'node:fs';
import * as Path from 'node:path';
import {fileURLToPath} from 'node:url';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import {
  Currency, GlobalMiningStats,
  JsonExt,
  MainchainClients,
  Mining,
  NetworkConfig,
  UnitOfMeasurement,
  GlobalVaultingStats
} from '@argonprotocol/apps-core';
import {Vaults} from './lib/Vaults.ts';
import { PriceIndex as PriceIndexModel } from "@argonprotocol/mainchain";
import { type IBasicsRecord } from "../src/interfaces/IBasicsRecord.ts";
import { getMainchainClients, getMiningFrames } from './lib/mainchain.ts';
import BigNumber from 'bignumber.js';

dayjs.extend(utc);

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

export default async function run() {
  for (const chain of ['mainnet', 'testnet'] as const) {
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
    const currency = new Currency(mainchainClients);

    const microgonsInCirculation = await currency.fetchMicrogonsInCirculation();
    const micronotsInCirculation = await currency.fetchMicronotsInCirculation();

    const priceIndexModel = new PriceIndexModel();
    await priceIndexModel.load(api as any);

    const miningStats = await fetchMiningStats(chain, currency);
    const vaultingStats = await fetchVaultingStats(chain, currency);

    const data: IBasicsRecord = {
      lastUpdatedAt: dayjs.utc().toISOString(),
      microgonsInCirculation: microgonsInCirculation,
      micronotsInCirculation: micronotsInCirculation,
      usdForArgon: (priceIndexModel.argonUsdPrice || BigNumber(0)).toNumber() || 1,
      usdForArgonot: (priceIndexModel.argonotUsdPrice || BigNumber(0)).toNumber() || 1,
      usdForBtc: (priceIndexModel.btcUsdPrice || BigNumber(0)).toNumber() || 80_000,
      mining: miningStats,
      vaulting: vaultingStats,
    };

    Fs.writeFileSync(filePath, JsonExt.stringify(data, 2));
    console.log(`Successfully saved Argon Basic Data`);
  }
}

// FUNCTIONS

async function fetchMiningStats(chain: 'testnet' | 'mainnet', currency: Currency) {
  const mainchainClients = getMainchainClients(chain);
  const mining = new Mining(mainchainClients);
  const stats = new GlobalMiningStats(mining, currency);
  await stats.load();

  return {
    activeSeatCount: stats.activeSeatCount,
    activeBidCosts: currency.convertMicrogonTo(stats.activeBidCosts, UnitOfMeasurement.USD),
    activeBlockRewards: currency.convertMicrogonTo(stats.activeBlockRewards, UnitOfMeasurement.USD),
    activeAPY: Math.max(stats.activeAPY, 0),
  }
}

async function fetchVaultingStats(chain: 'testnet' | 'mainnet', currency: Currency) {
  const mainchainClients = getMainchainClients(chain);
  const miningFrames = getMiningFrames(chain);
  const vaults = new Vaults(chain, currency, miningFrames, mainchainClients);
  const stats = new GlobalVaultingStats(vaults, currency);
  await stats.load();

  return {
    count: stats.vaultCount,
    valueInVaults: currency.convertMicrogonTo(stats.microgonValueOfVaultedBitcoins, UnitOfMeasurement.USD),
    bitcoinLocked: stats.bitcoinLocked,
    epochEarnings: currency.convertMicrogonTo(stats.epochEarnings, UnitOfMeasurement.USD),
    argonBurnCapacity: stats.argonBurnCapacity,
    activeAPY: Math.max(stats.activeAPY),
  }
}
