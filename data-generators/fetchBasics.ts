import './_globals.js';
import * as Fs from 'node:fs';
import * as Path from 'node:path';
import { fileURLToPath } from 'node:url';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import {
  MainchainClients,
  NetworkConfig,
  JsonExt,
  bigNumberToBigInt
} from '@argonprotocol/apps-core';
import { PriceIndex as PriceIndexModel } from "@argonprotocol/mainchain";
import IBasicsRecord from "../src/interfaces/IBasicsRecord.ts";

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

    const data: IBasicsRecord = {
      lastUpdatedAt: dayjs.utc().toISOString(),
      microgonsInCirculation: microgonsIssued.toBigInt(),
      micronotsInCirculation: micronotsIssued.toBigInt(),
      usdForArgon: bigNumberToBigInt(priceIndexModel.argonUsdPrice || BigNumber(0)),
    };

    Fs.writeFileSync(filePath, JsonExt.stringify(data, 2));
    console.log(`Successfully saved Argon Basic Data`);
  }
}