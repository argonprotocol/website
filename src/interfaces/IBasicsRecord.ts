export interface IBasicsRecordMining {
  activeSeatCount: number;
  activeBidCostsUsd: number;
  activeBlockRewardsUsd: number;
}

export interface IBasicsRecordVaulting {
  count: number;
  valueInVaults: number;
  bitcoinLocked: number;
  bitcoinTxnCount: number;
  epochEarnings: number;
  argonBurnCapacity: number;
}

export interface IBasicsRecord {
  lastUpdatedAt: string;
  currentBlockNumber: number;
  baseMicrogonsMinedPerBlock: bigint;
  baseMicronotsMinedPerBlock: bigint;
  microgonsInCirculation: bigint;
  micronotsInCirculation: bigint;
  usdForArgon: number;
  usdTargetForArgon: number;
  usdForArgonot: number;
  usdForBtc: number;
  totalMarketValueUsd: number;
  restabilizationLeverage: number;
  miningAPR: number;
  vaultingAPR: number;
  bondsAPR: number;
  bitcoinAPR: number;
  mining: IBasicsRecordMining;
  vaulting: IBasicsRecordVaulting;
}

export const defaultBasicsRecord: IBasicsRecord = {
  lastUpdatedAt: '',
  currentBlockNumber: 0,
  baseMicrogonsMinedPerBlock: 0n,
  baseMicronotsMinedPerBlock: 0n,
  microgonsInCirculation: 0n,
  micronotsInCirculation: 0n,
  usdForArgon: 0,
  usdTargetForArgon: 0,
  usdForArgonot: 0,
  usdForBtc: 0,
  totalMarketValueUsd: 0,
  restabilizationLeverage: 0,
  miningAPR: 0,
  vaultingAPR: 0,
  bondsAPR: 0,
  bitcoinAPR: 0,
  mining: {
    activeSeatCount: 0,
    activeBidCostsUsd: 0,
    activeBlockRewardsUsd: 0,
  },
  vaulting: {
    count: 0,
    valueInVaults: 0,
    bitcoinLocked: 0,
    bitcoinTxnCount: 0,
    epochEarnings: 0,
    argonBurnCapacity: 0,
  }
};
