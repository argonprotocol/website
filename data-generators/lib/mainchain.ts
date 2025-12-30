import { BlockWatch, MainchainClients, MiningFrames, NetworkConfig, NetworkConfigSettings } from "@argonprotocol/apps-core";
import * as Fs from 'node:fs/promises';
import { dirname } from 'path';
import { createRequire } from 'module';

export function getMainchainClients(networkName: keyof typeof NetworkConfigSettings): MainchainClients {
  NetworkConfig.setNetwork(networkName);
  const networkConfig = NetworkConfig.get();
  return new MainchainClients(networkConfig.archiveUrl);
}

export function getBlockWatch(networkName: keyof typeof NetworkConfigSettings): BlockWatch {
  const clients = getMainchainClients(networkName);
  return new BlockWatch(clients);
}

export function getMiningFrames(networkName: keyof typeof NetworkConfigSettings): MiningFrames {
  console.log('Initializing MiningFrames', networkName);
  const clients = getMainchainClients(networkName);
  const require = createRequire(import.meta.url);
  const coreDir = dirname(require.resolve('@argonprotocol/apps-core/package.json'));
  const framesFilePath = `${coreDir}/src/data/frames.${networkName}.json`;
  console.log('FRAMES FILE PATH: ', framesFilePath);
  return new MiningFrames(clients, getBlockWatch(networkName), {
    read: () => {
      return Fs.readFile(framesFilePath, 'utf8');
    },
    write: data => {
      return Fs.writeFile(framesFilePath, data);
    }
  });
}