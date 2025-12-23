import * as Fs from 'node:fs';
import * as Path from 'node:path';
import { fileURLToPath } from 'node:url';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import {MainchainClients, MiningFrames, NetworkConfig, NetworkConfigSettings} from '@argonprotocol/apps-core';

dayjs.extend(utc);

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

export interface IFrameRecord {
  frameId: number | null;
  frameTickRange: [number, number];
  dateStart: string;
  dateEnd: string | null;
  firstBlockNumber: number | null;
  firstBlockHash: string | null;
  firstBlockTick: number | null;
}

export default async function importFrames() {
  for (const chain of ['testnet', 'mainnet'] as const) {
    console.log('------------------------------------------------------');
    console.log(`Fetching Frames for ${chain}`);
    console.log('------------------------------------------------------');
    NetworkConfig.networkName = chain;
    const mainchain = new MainchainClients(NetworkConfigSettings[chain].archiveUrl);
    const miningFrames = new MiningFrames(mainchain);
    console.log('FRAMES: ', miningFrames.frames);
  }
}
