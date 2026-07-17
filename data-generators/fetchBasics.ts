import * as Fs from 'node:fs';
import * as Path from 'node:path';
import {fileURLToPath} from 'node:url';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import {
  BitcoinPrices,
  calculateBitcoinRatchetReturn,
  calculateRestabilizationLeverage,
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
import {type IBasicsRecord, type IBasicsRecordMining, type IBasicsRecordVaulting} from "../src/interfaces/IBasicsRecord.ts";
import { getMainchainClients, getMiningFrames } from './lib/mainchain.ts';
import BigNumber from 'bignumber.js';

dayjs.extend(utc);

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

export default async function run() {
  const bitcoinPrices = new BitcoinPrices().getDateRange(
    dayjs.utc().subtract(1, 'year').format('YYYY-MM-DD'),
    dayjs.utc().format('YYYY-MM-DD'),
  );
  const bitcoinAPR = calculateBitcoinRatchetReturn({
    prices: bitcoinPrices,
    flatFee: 2,
    percentageFee: 5,
    ratchetThreshold: 0.1,
  }).percent;

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
    const mining = new Mining(mainchainClients);

    const currentBlockNumber = (await api.query.system.number()).toNumber();
    const currentTick = await mining.fetchCurrentTick(api as any);
    const currentFrameId = (await mining.fetchNextFrameId(api as any)) - 1;
    const baseMicrogonsMinedPerBlock = await mining.fetchMicrogonsPerBlockForMiner(api as any, currentFrameId);
    const baseMicronotsMinedPerBlock = await mining.minimumMicronotsMinedDuringTickRange(
      currentTick,
      currentTick + 1,
      api as any,
    );
    const microgonsInCirculation = await currency.fetchMicrogonsInCirculation();
    const micronotsInCirculation = await currency.fetchMicronotsInCirculation();

    const priceIndexModel = new PriceIndexModel();
    await priceIndexModel.load(api as any);

    const [miningAPR, miningStats] = await fetchMiningStats(chain, currency);
    const [vaultingAPR, bondsAPR, vaultingStats] = await fetchVaultingStats(chain, currency);

    const data: IBasicsRecord = {
      lastUpdatedAt: dayjs.utc().toISOString(),
      currentBlockNumber,
      baseMicrogonsMinedPerBlock,
      baseMicronotsMinedPerBlock,
      microgonsInCirculation: microgonsInCirculation,
      micronotsInCirculation: micronotsInCirculation,
      usdForArgon: (priceIndexModel.argonUsdPrice || BigNumber(0)).toNumber() || 1,
      usdTargetForArgon: (priceIndexModel.argonUsdTargetPrice || BigNumber(0)).toNumber() || 1,
      usdForArgonot: (priceIndexModel.argonotUsdPrice || BigNumber(0)).toNumber() || 1,
      usdForBtc: (priceIndexModel.btcUsdPrice || BigNumber(0)).toNumber() || 80_000,
      totalMarketValueUsd: await loadTotalEconomicValue(currency),
      restabilizationLeverage: calculateRestabilizationLeverage({
        argonBurnCapacity: vaultingStats.argonBurnCapacity,
        microgonsInCirculation,
      }),
      miningAPR,
      vaultingAPR,
      bondsAPR,
      bitcoinAPR,
      mining: miningStats,
      vaulting: vaultingStats,
    };

    Fs.writeFileSync(filePath, JsonExt.stringify(data, 2));
    console.log(`Successfully saved Argon Basic Data`);
  }
}

// FUNCTIONS

async function loadTotalEconomicValue(currency: Currency): Promise<number> {
  await currency.load();
  const [microgonsInCirculation, micronotsInCirculation] = await Promise.all([
    currency.fetchMicrogonsInCirculation(),
    currency.fetchMicronotsInCirculation(),
  ]);

  const microgonValueOfArgonots = currency.convertMicronotTo(micronotsInCirculation, UnitOfMeasurement.Microgon);

  return currency.convertMicrogonTo(microgonsInCirculation + microgonValueOfArgonots, UnitOfMeasurement.USD);
}

async function fetchMiningStats(chain: 'testnet' | 'mainnet', currency: Currency): Promise<[number, IBasicsRecordMining]> {
  const mainchainClients = getMainchainClients(chain);
  const mining = new Mining(mainchainClients);
  const miningStats = new GlobalMiningStats(mining, currency);
  await miningStats.load();

  return [miningStats.activeAPR, {
    activeSeatCount: miningStats.activeSeatCount,
    activeBidCostsUsd: currency.convertMicrogonTo(miningStats.activeBidCosts, UnitOfMeasurement.USD),
    activeBlockRewardsUsd: currency.convertMicrogonTo(miningStats.activeBlockRewards, UnitOfMeasurement.USD),
  }];
}

async function fetchVaultingStats(chain: 'testnet' | 'mainnet', currency: Currency): Promise<[number, number, IBasicsRecordVaulting]> {
  const mainchainClients = getMainchainClients(chain);
  const miningFrames = getMiningFrames(chain);
  const vaults = new Vaults(chain, currency, miningFrames, mainchainClients);
  const vaultingStats = new GlobalVaultingStats(vaults, currency);
  await vaultingStats.load();
  const bitcoinTxnCount = Object.values(vaults.stats?.vaultsById ?? {}).reduce((total, vaultStats) => {
    const frameCount = vaultStats.changesByFrame.reduce((sum, frame) => sum + frame.bitcoinLocksCreated, 0);
    return total + vaultStats.baseline.bitcoinLocks + frameCount;
  }, 0);

  return [vaultingStats.activeAPR, vaultingStats.bondsAPR, {
    count: vaultingStats.vaultCount,
    valueInVaults: currency.convertMicrogonTo(vaultingStats.microgonValueOfVaultedBitcoins, UnitOfMeasurement.USD),
    bitcoinLocked: vaultingStats.bitcoinLocked,
    bitcoinTxnCount,
    epochEarnings: currency.convertMicrogonTo(vaultingStats.epochEarnings, UnitOfMeasurement.USD),
    argonBurnCapacity: vaultingStats.argonBurnCapacity,
  }];
}
