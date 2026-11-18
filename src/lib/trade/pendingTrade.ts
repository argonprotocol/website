import { isAddress, isHash, isHex, type Address, type Hash, type Hex, type Transaction } from 'viem';

export type TradeStep = 'reset' | 'token' | 'swap' | 'batch';

type PendingRequest = { id: string; from: Address };

export type PendingTransaction = PendingRequest & {
  kind: Exclude<TradeStep, 'batch'> | 'permit';
  to: Address;
  data: Hex;
  value?: Hex;
  nonceFloor: number;
  hash?: Hash;
  nonce?: number;
  replacement?: 'replaced' | 'cancelled';
};

export type PendingBatch = PendingRequest & {
  kind: 'batch';
  batchId: string;
  connectorId: string;
  accepted?: true;
  hash?: never;
};

export type PendingTrade = PendingTransaction | PendingBatch;

export function readPendingTrade(key: string): Partial<PendingTrade> | null {
  return JSON.parse(localStorage.getItem(key) ?? 'null');
}

export function writePendingTrade(key: string, trade: PendingTrade) {
  const stored = readPendingTrade(key);
  if (stored?.id && stored.id !== trade.id) return false;
  localStorage.setItem(key, JSON.stringify(trade));
  return true;
}

export function removePendingTrade(key: string, trade: PendingTrade) {
  const stored = readPendingTrade(key);
  if (stored?.id !== trade.id) return;
  if (trade.kind === 'batch') {
    const batch = stored as Partial<PendingBatch>;
    if (batch.batchId !== trade.batchId || batch.accepted !== trade.accepted) return;
  } else if (stored.hash !== trade.hash) {
    return;
  }
  localStorage.removeItem(key);
}

export function validatePendingTrade(stored: Partial<PendingTrade>): asserts stored is PendingTrade {
  if (typeof stored.id !== 'string' || !/^[a-f0-9-]{36}$/i.test(stored.id)) throw new Error('storage');
  if (!stored.from || !isAddress(stored.from)) throw new Error('storage');

  if (stored.kind === 'batch') {
    if (typeof stored.batchId !== 'string' || !stored.batchId || stored.batchId.length > 8194)
      throw new Error('storage');
    if (typeof stored.connectorId !== 'string' || !stored.connectorId) throw new Error('storage');
    if (stored.accepted !== undefined && stored.accepted !== true) throw new Error('storage');
    return;
  }

  if (!stored.kind || !['reset', 'token', 'permit', 'swap'].includes(stored.kind)) throw new Error('storage');
  const transaction = stored as Partial<PendingTransaction>;
  if (!transaction.to || !isAddress(transaction.to) || !isHex(transaction.data)) throw new Error('storage');
  if (
    transaction.value !== undefined &&
    (!isHex(transaction.value) || transaction.value.length < 3 || transaction.value.length > 66)
  )
    throw new Error('storage');
  if (
    typeof transaction.nonceFloor !== 'number' ||
    !Number.isSafeInteger(transaction.nonceFloor) ||
    transaction.nonceFloor < 0
  )
    throw new Error('storage');
  if (transaction.nonce !== undefined && (!Number.isSafeInteger(transaction.nonce) || transaction.nonce < 0))
    throw new Error('storage');
  if (transaction.hash && !isHash(transaction.hash)) throw new Error('storage');
  if (transaction.replacement && !['replaced', 'cancelled'].includes(transaction.replacement))
    throw new Error('storage');
}

export function matchRecoveredTransaction(
  intent: PendingTransaction,
  transaction: Transaction,
  verifiedNonce?: string,
) {
  if (transaction.from.toLowerCase() !== intent.from.toLowerCase()) throw new Error('hash');
  const sameCall =
    transaction.to?.toLowerCase() === intent.to.toLowerCase() &&
    transaction.input.toLowerCase() === intent.data.toLowerCase() &&
    transaction.value === BigInt(intent.value ?? 0n);

  let originalNonce = intent.nonce;
  if (originalNonce === undefined && intent.hash && verifiedNonce !== undefined) {
    if (!/^\d+$/.test(verifiedNonce)) throw new Error('hash');
    originalNonce = Number(verifiedNonce);
    if (!Number.isSafeInteger(originalNonce) || originalNonce < intent.nonceFloor) throw new Error('hash');
  }

  const recovered: PendingTransaction = { ...intent, hash: transaction.hash, nonce: transaction.nonce };
  if (originalNonce === undefined) {
    if (!sameCall || transaction.nonce < intent.nonceFloor) throw new Error('hash');
    return recovered;
  }

  if (transaction.nonce !== originalNonce) throw new Error('hash');
  if (!sameCall) {
    const cancelled =
      transaction.to?.toLowerCase() === intent.from.toLowerCase() &&
      transaction.input === '0x' &&
      transaction.value === 0n;
    recovered.replacement = cancelled ? 'cancelled' : 'replaced';
  }
  return recovered;
}
