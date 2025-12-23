import * as Fs from 'node:fs';
import * as Path from 'node:path';
import { fileURLToPath } from 'node:url';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { MainchainClients, MiningFrames, NetworkConfig, JsonExt, type IFrameHistory, type ApiDecoration } from '@argonprotocol/apps-core';
import IArgonCirculationRecord from "../src/interfaces/IArgonCirculationRecord.ts";

dayjs.extend(utc);

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

export default async function run() {
  for (const chain of ['testnet', 'mainnet'] as const) {
    console.log('------------------------------------------------------');
    console.log(`Fetching Argon Circulation for ${chain}`);
    console.log('------------------------------------------------------');
    const data: IArgonCirculationRecord[] = [];
    
    // Write data to JSON file
    const dataDir = Path.join(__dirname, '..', 'public', 'data');
    const filePath = Path.join(dataDir, `argonCirculation.${chain}.json`);

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
      console.log(`Fetching circulation for frame ${frame.frameId}`);
      const api = frame.firstBlockHash ? await archiveClient.at(frame.firstBlockHash) : null;
      await appendToData(data, api, frame);
    }

    Fs.writeFileSync(filePath, JsonExt.stringify(data, 2));
    console.log(`Successfully saved Argon Circulation data`);
  }
}

async function appendToData(data: any[], api: ApiDecoration<'promise'> | null, frame: IFrameHistory) {
  const totalIssuance = api ? await api.query.balances.totalIssuance() : null;
  const microgons = totalIssuance ? totalIssuance.toBigInt() : data[0].microgons;
  data.push({
    frameId: frame.frameId,
    date: frame.dateStart,
    microgons,
  });
}
