export interface IBasicsRecord {
  lastUpdatedAt: string;
  microgonsInCirculation: bigint;
  micronotsInCirculation: bigint;
  usdForArgon: number;
  usdForArgonot: number;
  usdForBtc: number;
  mining: {
    activeSeatCount: number;
    aggregatedBidCosts: number;
    aggregatedBlockRewards: number;
    averageAPY: number;
  },
  vaulting: {
    count: number;
    valueInVaults: number;
    bitcoinLocked: number;
    averageAPY: number;
    epochEarnings: number;
    argonBurnCapacity: number;
  }
};

export const defaultBasicsRecord: IBasicsRecord = {
  lastUpdatedAt: '',
  microgonsInCirculation: 0n,
  micronotsInCirculation: 0n,
  usdForArgon: 0,
  usdForArgonot: 0,
  usdForBtc: 0,
  mining: {
    activeSeatCount: 0,
    aggregatedBidCosts: 0,
    aggregatedBlockRewards: 0,
    averageAPY: 0,
  },
  vaulting: {
    count: 0,
    valueInVaults: 0,
    bitcoinLocked: 0,
    averageAPY: 0,
    epochEarnings: 0,
    argonBurnCapacity: 0,
  }
};