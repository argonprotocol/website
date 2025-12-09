import './_globals.js';
import * as Fs from 'node:fs';
import * as Path from 'node:path';
import { fileURLToPath } from 'node:url';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { MainchainClients, MiningFrames, NetworkConfig, PriceIndex, JsonExt, defaultExchangeRates } from '@argonprotocol/apps-core';
import type {  IFrameHistory, IMainchainExchangeRates } from '@argonprotocol/apps-core';
import IArgonExchangeRatesRecord from "../src/interfaces/IArgonExchangeRatesRecord.ts";

import { type ApiDecoration, PriceIndex as PriceIndexModel } from '@argonprotocol/mainchain';

dayjs.extend(utc);

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

export default async function run() {
  for (const chain of ['testnet', 'mainnet'] as const) {
    console.log('------------------------------------------------------');
    console.log(`Fetching Argon Exchange Rates for ${chain}`);
    console.log('------------------------------------------------------');
    const records: IArgonExchangeRatesRecord[] = [];
    
    // Write data to JSON file
    const dataDir = Path.join(__dirname, '..', 'public', 'data');
    const filePath = Path.join(dataDir, `argonExchangeRates.${chain}.json`);

    if (!Fs.existsSync(dataDir)) {
      console.log(`Creating directory: ${dataDir}`);
      Fs.mkdirSync(dataDir, { recursive: true });
    }

    NetworkConfig.setNetwork(chain);
    const networkConfig = NetworkConfig.get();
    const mainchainClients = new MainchainClients(networkConfig.archiveUrl);
    const archiveClient = await mainchainClients.archiveClientPromise
    const miningFrames = new MiningFrames(mainchainClients);

    for (const frame of miningFrames.frames) {
      console.log(`Fetching exchange rates for frame ${frame.frameId}`);
      const api = frame.firstBlockHash ? await archiveClient.at(frame.firstBlockHash) : null;
      await appendToData(records, api, frame);
    }

    Fs.writeFileSync(filePath, JsonExt.stringify(records, 2));
    console.log(`Successfully saved Argon Exchange Rates`);
  }
}

async function appendToData(records: any[], api: ApiDecoration<'promise'> | null, frame: IFrameHistory) {
  let exchangeRates: IMainchainExchangeRates | null = null;
  
  if (api) {
    try {
      const priceIndexModel = new PriceIndexModel();
      await priceIndexModel.load(api);
      exchangeRates = PriceIndex.extractMicrogonExchangeRatesTo(priceIndexModel);
    } catch (e) {}
  }

  const lastRecord = records[records.length - 1] || defaultExchangeRates;

  records.push({
    frameId: frame.frameId,
    date: frame.dateStart,
    USD: exchangeRates?.USD || lastRecord?.USD || defaultExchangeRates?.USD || 0n,
    USDTarget: exchangeRates?.USDTarget || lastRecord?.USDTarget || defaultExchangeRates?.USDTarget || 0n,
    ARGNOT: exchangeRates?.ARGNOT || lastRecord?.ARGNOT || defaultExchangeRates?.ARGNOT || 0n,
    BTC: exchangeRates?.BTC || lastRecord?.BTC || defaultExchangeRates?.BTC || 0n,
  });
}

