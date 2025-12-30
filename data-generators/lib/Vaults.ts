import {
  MiningFrames,
  Currency,
  MainchainClients,
  Vaults as VaultsBase,
  type IAllVaultStats,
} from '@argonprotocol/apps-core';

export class Vaults extends VaultsBase {
  constructor(
    network: string,
    currency: Currency,
    miningFrames: MiningFrames,
    mainchainClients: MainchainClients
  ) {
    super(network, currency, miningFrames, mainchainClients);
  }

  protected async saveStats(): Promise<void> {
    return undefined;
  }

  protected async loadStatsFromFile(): Promise<IAllVaultStats | void> {
    return undefined;
  }
}
