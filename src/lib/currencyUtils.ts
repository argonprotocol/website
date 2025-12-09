import { MICROGONS_PER_ARGON } from '@argonprotocol/mainchain';

export function microgonToArgon(microgons: bigint): number {
  if (!microgons) return 0;
  return Number(microgons) / MICROGONS_PER_ARGON;
}

export function micronotToArgoonot(micronots: bigint): number {
  if (!micronots) return 0;
  return Number(micronots) / MICROGONS_PER_ARGON;
}