import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import { useTrade } from './useTrade';
import {
  BaseError,
  ContractFunctionRevertedError,
  decodeAbiParameters,
  decodeFunctionData,
  encodeErrorResult,
  erc20Abi,
  toHex,
  type Hex,
} from 'viem';
import { permit2Abi, permit2PermitParameters, quoterAbi, routerAbi, tradeClients, tradeNetworks } from './pool';
import type { Connector, GetAccountReturnType } from '@wagmi/core';

const publicClient = tradeClients[11155111];
const { argon: ARGN, usdc: USDC, deployment } = tradeNetworks[11155111];
const { permit2: PERMIT2, router: ROUTER } = deployment!;

type TestAccount = Pick<GetAccountReturnType, 'address' | 'chainId' | 'status'> & {
  connector?: Pick<Connector, 'id' | 'uid'>;
};

const state = vi.hoisted(() => ({
  account: {
    address: '0x0000000000000000000000000000000000000001',
    chainId: 11155111,
    status: 'connected',
  } as TestAccount,
  accountChanged: (_value: TestAccount) => {},
  sendCalls: vi.fn(),
  waitForCallsStatus: vi.fn(),
  getCapabilities: vi.fn(),
  tokenAllowance: 0n,
  permitAmount: 0n,
  expiration: 0,
  permitNonce: 7,
  sign: vi.fn(),
  send: vi.fn(),
  receipt: vi.fn(),
}));
const hash = `0x${'1'.repeat(64)}` as const;
const signature = `0x${'2'.repeat(130)}` as const;

vi.mock('@wagmi/core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@wagmi/core')>()),
  getAccount: () => state.account,
  getConnectors: () => [],
  reconnect: async () => [],
  watchAccount: (_config: unknown, options: { onChange: typeof state.accountChanged }) => {
    state.accountChanged = options.onChange;
    return () => {};
  },
  watchConnectors: () => () => {},
  getWalletClient: async () => ({
    getAddresses: async () => [state.account.address],
    getChainId: async () => state.account.chainId,
    signTypedData: state.sign,
    sendTransaction: state.send,
    sendCalls: state.sendCalls,
    waitForCallsStatus: state.waitForCallsStatus,
    getCapabilities: state.getCapabilities,
  }),
}));

let trade: ReturnType<typeof useTrade>;
let wrapper: ReturnType<typeof mount>;

async function loadTrade() {
  wrapper = mount(
    defineComponent({
      setup() {
        trade = useTrade();
        return () => h('div');
      },
    }),
  );
  trade.amount.value = '1';
  await vi.advanceTimersByTimeAsync(351);
  await flushPromises();
}

beforeEach(() => {
  vi.useFakeTimers();
  localStorage.clear();
  Object.defineProperty(navigator, 'locks', {
    configurable: true,
    value: { request: vi.fn(async (_name, _options, run) => run({})) },
  });
  state.account = {
    address: '0x0000000000000000000000000000000000000001',
    chainId: 11155111,
    status: 'connected',
  } as TestAccount;
  state.tokenAllowance = 0n;
  state.permitAmount = 0n;
  state.expiration = 0;
  state.getCapabilities.mockReset().mockResolvedValue({});
  state.sendCalls.mockReset().mockImplementation(async ({ id }) => ({ id }));
  state.waitForCallsStatus.mockReset().mockImplementation(async ({ id }) => ({
    id,
    atomic: true,
    chainId: 11155111,
    statusCode: 200,
    receipts: [{ status: 'success', transactionHash: hash }],
  }));
  state.sign.mockReset().mockResolvedValue(signature);
  state.send.mockReset().mockResolvedValue(hash);
  state.receipt.mockReset().mockResolvedValue({ status: 'success' });
  vi.spyOn(publicClient, 'getTransactionCount').mockResolvedValue(0);
  vi.spyOn(publicClient, 'getTransaction').mockResolvedValue({ nonce: 0 } as never);
  vi.spyOn(publicClient, 'getBlockNumber').mockResolvedValue(100n);
  vi.spyOn(publicClient, 'simulateContract').mockImplementation(async (request) => {
    if (request.functionName === 'quoteExactInputSingle') return { result: [1000000000000000000n, 1000n, 1n] } as never;
    return { request } as never;
  });
  vi.spyOn(publicClient, 'call').mockResolvedValue({ data: '0x' });
  vi.spyOn(publicClient, 'readContract').mockImplementation(async (request) => {
    if (request.functionName === 'balanceOf') return 100000000000000000000n as never;
    if (request.address === PERMIT2) return [state.permitAmount, state.expiration, state.permitNonce] as never;
    return state.tokenAllowance as never;
  });
  vi.spyOn(publicClient, 'waitForTransactionReceipt').mockImplementation(state.receipt);
});

afterEach(() => {
  wrapper?.unmount();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('trade boundaries', () => {
  it('quotes both ETH hops at one block, pays native value without approvals, and matches that value during recovery', async () => {
    await loadTrade();
    const nativeBalance = vi.spyOn(publicClient, 'getBalance').mockResolvedValue(2n * 10n ** 18n);
    const quoteCall = vi.mocked(publicClient.simulateContract);
    quoteCall.mockClear();
    quoteCall.mockResolvedValueOnce({ result: [1000000n, 1000n, 1n] } as never);
    quoteCall.mockResolvedValueOnce({ result: [990000000000000000n, 1000n, 1n] } as never);
    trade.counterSymbol.value = 'ETH';
    expect(trade.amount.value).toBe('');
    expect(trade.quote.value).toBeUndefined();
    trade.amount.value = '.001';
    await vi.advanceTimersByTimeAsync(351);
    const ether = 10n ** 15n;
    expect(quoteCall.mock.calls.map(([request]) => [request.blockNumber, request.args])).toEqual([
      [100n, [expect.objectContaining({ exactAmount: ether })]],
      [100n, [expect.objectContaining({ poolKey: deployment.poolKey, exactAmount: 1000000n })]],
    ]);
    expect(nativeBalance).toHaveBeenCalledWith({ address: state.account.address });
    expect(trade.step.value).toBe('swap');

    vi.mocked(publicClient.getTransaction).mockRejectedValueOnce(new Error('transaction not yet indexed'));
    state.receipt.mockRejectedValueOnce(new Error('timeout'));
    await trade.submit();
    const request = state.send.mock.calls[0][0];
    expect(request).toMatchObject({ to: ROUTER, value: ether });
    expect(state.sign).not.toHaveBeenCalled();
    const intent = trade.pending.value!;
    expect(intent).toMatchObject({ kind: 'swap', value: toHex(ether) });
    expect(JSON.parse(localStorage.getItem('argon.trade.pending.v1.11155111')!)).toMatchObject({ value: toHex(ether) });

    const walletTransaction = { from: state.account.address, to: ROUTER, input: request.data, nonce: 0, hash };
    trade.recoveryHash.value = hash;
    vi.mocked(publicClient.getTransaction).mockResolvedValueOnce({ ...walletTransaction, value: 0n } as never);
    await trade.recoverTransaction();
    expect(trade.issue.value).toBe('hash');
    expect(trade.pending.value).toBe(intent);
    vi.mocked(publicClient.getTransaction).mockResolvedValueOnce({ ...walletTransaction, value: ether } as never);
    await trade.recoverTransaction();
    expect(state.receipt.mock.calls[1][0].replacement.value).toBe(ether);
    expect(trade.outcome.value).toBe('success');
    expect(trade.issue.value).toBe('');
    expect(state.send).toHaveBeenCalledTimes(1);
  });

  it('combines a nonzero insufficient token allowance reset, exact approvals, and swap into one atomic wallet request', async () => {
    state.account.connector = { id: 'injected', uid: 'synthetic' };
    state.getCapabilities.mockResolvedValue({ 11155111: { atomic: { status: 'supported' } } });
    state.tokenAllowance = 500000n;
    await loadTrade();
    expect(trade.step.value).toBe('batch');
    state.sendCalls.mockImplementationOnce(async ({ id }) => {
      expect(JSON.parse(localStorage.getItem('argon.trade.pending.v1.11155111')!)).toMatchObject({
        kind: 'batch',
        batchId: id,
      });
      return { id };
    });
    await trade.submit();
    expect(state.sendCalls).toHaveBeenCalledTimes(1);
    expect(state.send).not.toHaveBeenCalled();
    expect(state.sign).not.toHaveBeenCalled();
    const request = state.sendCalls.mock.calls[0][0];
    expect(request).toMatchObject({ account: state.account.address, chain: { id: 11155111 }, forceAtomic: true });
    expect(request.calls.map((call: { to: string }) => call.to)).toEqual([USDC.address, USDC.address, PERMIT2, ROUTER]);
    expect(decodeFunctionData({ abi: erc20Abi, data: request.calls[0].data }).args).toEqual([PERMIT2, 0n]);
    expect(decodeFunctionData({ abi: erc20Abi, data: request.calls[1].data }).args).toEqual([PERMIT2, 1000000n]);
    const [commands, , deadline] = decodeFunctionData({ abi: routerAbi, data: request.calls[3].data }).args!;
    expect(commands).toBe('0x10');
    expect(decodeFunctionData({ abi: permit2Abi, data: request.calls[2].data }).args).toEqual([
      USDC.address,
      ROUTER,
      1000000n,
      Number(deadline),
    ]);
    expect(trade.outcome.value).toBe('success');
    expect(trade.pending.value).toBeUndefined();
  });

  it('uses separate approvals when the wallet would require a smart-account upgrade', async () => {
    state.account.connector = { id: 'injected', uid: 'synthetic' };
    state.getCapabilities.mockResolvedValue({ 11155111: { atomic: { status: 'ready' } } });
    await loadTrade();
    expect(trade.step.value).toBe('token');
    await trade.submit();
    expect(state.sendCalls).not.toHaveBeenCalled();
    expect(state.send.mock.calls[0][0].to).toBe(USDC.address);
  });

  it('blocks a resend when wallet batch status is unavailable and recovers it after reload', async () => {
    state.account.connector = { id: 'injected', uid: 'synthetic' };
    state.getCapabilities.mockResolvedValue({ 11155111: { atomic: { status: 'supported' } } });
    await loadTrade();
    state.waitForCallsStatus.mockRejectedValueOnce(new Error('timeout'));
    await trade.submit();
    const saved = JSON.parse(localStorage.getItem('argon.trade.pending.v1.11155111')!);
    expect(saved).toMatchObject({ kind: 'batch', accepted: true });
    expect(trade.outcome.value).toBe('timeout');
    await trade.submit();
    expect(state.sendCalls).toHaveBeenCalledTimes(1);
    wrapper.unmount();
    await loadTrade();
    expect(state.waitForCallsStatus.mock.calls[1][0]).toMatchObject({ id: saved.batchId });
    expect(trade.outcome.value).toBe('success');
    expect(state.sendCalls).toHaveBeenCalledTimes(1);
    expect(state.send).not.toHaveBeenCalled();
  });

  it('never reports success or unlocks the swap for a non-atomic result', async () => {
    state.account.connector = { id: 'injected', uid: 'synthetic' };
    state.getCapabilities.mockResolvedValue({ 11155111: { atomic: { status: 'supported' } } });
    state.waitForCallsStatus.mockImplementationOnce(async ({ id }) => ({
      id,
      atomic: false,
      chainId: 11155111,
      statusCode: 200,
      receipts: [{ status: 'success', transactionHash: hash }],
    }));
    await loadTrade();
    await trade.submit();
    expect(trade.outcome.value).toBe('timeout');
    expect(trade.pending.value?.kind).toBe('batch');
    expect(trade.canSubmit.value).toBeFalsy();
  });

  it('clears a rejected atomic request without falling back to separate sends', async () => {
    state.account.connector = { id: 'injected', uid: 'synthetic' };
    state.getCapabilities.mockResolvedValue({ 11155111: { atomic: { status: 'supported' } } });
    state.sendCalls.mockRejectedValueOnce({ code: 4001 });
    await loadTrade();
    await trade.submit();
    expect(trade.issue.value).toBe('rejected');
    expect(trade.pending.value).toBeUndefined();
    expect(state.sendCalls).toHaveBeenCalledTimes(1);
    expect(state.send).not.toHaveBeenCalled();
  });

  it('requests one exact token approval, refreshes the quote, then bundles the signed permit with the swap', async () => {
    await loadTrade();
    state.send.mockImplementationOnce(async (request) => {
      state.tokenAllowance = decodeFunctionData({ abi: erc20Abi, data: request.data }).args![1] as bigint;
      return hash;
    });
    await trade.submit();
    expect(state.sign).not.toHaveBeenCalled();
    expect(state.send).toHaveBeenCalledTimes(1);
    expect(state.send.mock.calls[0][0].to).toBe(USDC.address);
    expect(decodeFunctionData({ abi: erc20Abi, data: state.send.mock.calls[0][0].data })).toMatchObject({
      functionName: 'approve',
      args: [PERMIT2, 1000000n],
    });
    expect(trade.quote.value).toBeDefined();
    expect(trade.step.value).toBe('swap');
    const deadline = BigInt(Math.floor(trade.quote.value!.expiresAt / 1000));
    await trade.submit();
    expect(state.sign).toHaveBeenCalledTimes(1);
    expect(state.sign.mock.calls[0][0]).toMatchObject({
      account: state.account.address,
      domain: { name: 'Permit2', chainId: 11155111, verifyingContract: PERMIT2 },
      primaryType: 'PermitSingle',
      message: {
        details: { token: USDC.address, amount: 1000000n, expiration: Number(deadline), nonce: state.permitNonce },
        spender: ROUTER,
        sigDeadline: deadline,
      },
    });
    expect(state.send).toHaveBeenCalledTimes(2);
    expect(state.send.mock.calls[1][0]).toMatchObject({ to: ROUTER, account: state.account.address });
    const [commands, inputs, transactionDeadline] = decodeFunctionData({
      abi: routerAbi,
      data: state.send.mock.calls[1][0].data,
    }).args!;
    expect(commands).toBe('0x8a10');
    expect(transactionDeadline).toBe(deadline);
    expect(decodeAbiParameters(permit2PermitParameters, inputs[0])).toEqual([
      state.sign.mock.calls[0][0].message,
      signature,
    ]);
    expect(trade.outcome.value).toBe('success');
    expect(trade.completedStep.value).toBe('swap');
  });

  it('reuses sufficient token allowance and an exact active router allowance without prompting for a permit', async () => {
    state.tokenAllowance = 2n ** 256n - 1n;
    state.permitAmount = 1000000n;
    state.expiration = Math.floor(Date.now() / 1000) + 300;
    await loadTrade();
    expect(trade.step.value).toBe('swap');
    await trade.submit();
    expect(state.sign).not.toHaveBeenCalled();
    expect(state.send).toHaveBeenCalledTimes(1);
    expect(state.send.mock.calls[0][0].to).toBe(ROUTER);
    expect(decodeFunctionData({ abi: routerAbi, data: state.send.mock.calls[0][0].data }).args![0]).toBe('0x10');
  });

  it('resets a nonzero allowance only when it is too small for the trade', async () => {
    state.tokenAllowance = 500000n;
    await loadTrade();
    expect(trade.step.value).toBe('reset');
    await trade.submit();
    expect(decodeFunctionData({ abi: erc20Abi, data: state.send.mock.calls[0][0].data }).args).toEqual([PERMIT2, 0n]);
  });

  it('does not request a transaction if the spending signature is rejected', async () => {
    state.tokenAllowance = 1000000n;
    await loadTrade();
    state.sign.mockRejectedValueOnce({ code: 4001 });
    await trade.submit();
    expect(trade.issue.value).toBe('rejected');
    expect(trade.pending.value).toBeUndefined();
    expect(state.send).not.toHaveBeenCalled();
  });

  it('does not request a transaction if the quote expires during the permit signature', async () => {
    state.tokenAllowance = 1000000n;
    await loadTrade();
    let finish!: (value: Hex) => void;
    state.sign.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
    );
    const operation = trade.submit();
    await flushPromises();
    await vi.advanceTimersByTimeAsync(31_000);
    finish(signature);
    await operation;
    expect(trade.issue.value).toBe('stale');
    expect(state.send).not.toHaveBeenCalled();
  });

  it('makes rejection actionable and never chains an approval retry', async () => {
    await loadTrade();
    state.send.mockRejectedValueOnce({ code: 4001 });
    await trade.submit();
    expect(trade.issue.value).toBe('rejected');
    expect(trade.pending.value).toBeUndefined();
    expect(trade.busy.value).toBe(false);
    expect(state.send).toHaveBeenCalledTimes(1);
  });

  it('distinguishes an RPC failure from a wallet rejection', async () => {
    await loadTrade();
    vi.mocked(publicClient.call).mockRejectedValueOnce(new BaseError('Execution reverted'));
    await trade.submit();
    expect(trade.issue.value).toBe('transaction');
    expect(state.send).not.toHaveBeenCalled();
  });

  it('does not send when the account changes during simulation', async () => {
    await loadTrade();
    let finish!: (value: never) => void;
    vi.mocked(publicClient.call).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
    );
    const operation = trade.submit();
    await flushPromises();
    state.account = { ...state.account, address: '0x0000000000000000000000000000000000000002' } as Pick<
      GetAccountReturnType,
      'address' | 'chainId' | 'status'
    >;
    state.accountChanged(state.account);
    finish({ request: {} } as never);
    await operation;
    expect(state.send).not.toHaveBeenCalled();
    expect(trade.issue.value).toBe('changed');
  });

  it('invalidates quotes immediately on direction/slippage edits and rejects expired quotes', async () => {
    await loadTrade();
    trade.slippage.value = 100;
    expect(trade.quote.value).toBeUndefined();
    expect(trade.canSubmit.value).toBeFalsy();
    trade.buying.value = false;
    trade.amount.value = '1.000000000000000001';
    await vi.advanceTimersByTimeAsync(351);
    expect(trade.inputToken.value).toEqual(ARGN);
    expect(trade.quote.value?.amountIn).toBe(1000000000000000001n);
    await vi.advanceTimersByTimeAsync(31_000);
    await trade.submit();
    expect(state.send).not.toHaveBeenCalled();
  });

  it('checks a saved hash after reload, retains it after timeout, and never resends it', async () => {
    localStorage.setItem(
      'argon.trade.pending.v1.11155111',
      JSON.stringify({
        id: '00000000-0000-4000-8000-000000000001',
        hash,
        kind: 'swap',
        from: state.account.address,
        to: ROUTER,
        data: '0x10',
        nonceFloor: 0,
      }),
    );
    state.receipt.mockRejectedValueOnce(new Error('timeout'));
    await loadTrade();
    expect(trade.pending.value?.hash).toBe(hash);
    expect(trade.outcome.value).toBe('timeout');
    await trade.submit();
    expect(state.send).not.toHaveBeenCalled();
    await trade.checkPending();
    expect(trade.pending.value).toBeUndefined();
    expect(trade.outcome.value).toBe('success');
    expect(localStorage.getItem('argon.trade.pending.v1.11155111')).toBeNull();
    expect(state.send).not.toHaveBeenCalled();
  });

  it('reports the actual pool liquidity failure instead of suggesting a wallet retry', async () => {
    await loadTrade();
    const nested = encodeErrorResult({ abi: quoterAbi, errorName: 'NotEnoughLiquidity', args: [deployment!.poolId] });
    vi.mocked(publicClient.simulateContract).mockRejectedValueOnce(
      new ContractFunctionRevertedError({
        abi: quoterAbi,
        functionName: 'quoteExactInputSingle',
        data: encodeErrorResult({ abi: quoterAbi, errorName: 'UnexpectedRevertBytes', args: [nested] }),
      }),
    );
    await trade.refreshQuote();
    expect(trade.issue.value).toBe('liquidity');
    expect(trade.quote.value).toBeUndefined();
  });

  it('does not renew the lifetime of a slow quote when it finally returns', async () => {
    await loadTrade();
    let finish!: (value: never) => void;
    vi.mocked(publicClient.simulateContract).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
    );
    const operation = trade.refreshQuote();
    await flushPromises();
    await vi.advanceTimersByTimeAsync(31_000);
    finish({ result: [1000000000000000000n, 1000n, 1n] } as never);
    await operation;
    expect(trade.quote.value).toBeUndefined();
    expect(trade.issue.value).toBe('stale');
  });

  it('does not send when another tab owns the chain submission lock', async () => {
    await loadTrade();
    vi.mocked(navigator.locks.request).mockImplementationOnce(async (_name, _options, run) => run!(null));
    await trade.submit();
    expect(trade.issue.value).toBe('elsewhere');
    expect(trade.busy.value).toBe(false);
    expect(state.send).not.toHaveBeenCalled();
  });

  it('does not let an unmounted receipt watcher clear a newer saved transaction', async () => {
    await loadTrade();
    let finish!: (value: unknown) => void;
    state.receipt.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
    );
    const operation = trade.submit();
    await flushPromises();
    wrapper.unmount();
    const newerHash = `0x${'2'.repeat(64)}`;
    const saved = JSON.parse(localStorage.getItem('argon.trade.pending.v1.11155111')!);
    localStorage.setItem('argon.trade.pending.v1.11155111', JSON.stringify({ ...saved, hash: newerHash }));
    finish({ status: 'success' });
    await operation;
    expect(JSON.parse(localStorage.getItem('argon.trade.pending.v1.11155111')!).hash).toBe(newerHash);
  });

  it('preserves an interrupted wallet prompt and requires explicit unsent confirmation to clear it', async () => {
    await loadTrade();
    state.send.mockRejectedValueOnce(new Error('wallet connection lost'));
    await trade.submit();
    expect(trade.pending.value?.hash).toBeUndefined();
    expect(trade.pending.value?.kind).toBe('token');
    expect(localStorage.getItem('argon.trade.pending.v1.11155111')).toContain('data');
    await trade.submit();
    expect(state.send).toHaveBeenCalledTimes(1);
    trade.clearUnsent();
    expect(trade.pending.value).toBeDefined();
    trade.noTransactionSent.value = true;
    trade.clearUnsent();
    expect(trade.pending.value).toBeUndefined();
    expect(trade.quote.value).toBeUndefined();
    expect(state.send).toHaveBeenCalledTimes(1);
  });

  it('resynchronizes a remounted page when an unresolved wallet prompt later returns its hash', async () => {
    await loadTrade();
    let finish!: (value: string) => void;
    state.send.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
    );
    const operation = trade.submit();
    await flushPromises();
    const intent = trade.pending.value!;
    if (intent.kind === 'batch') throw new Error('Expected an individual transaction');
    expect(intent.hash).toBeUndefined();
    wrapper.unmount();
    await loadTrade();
    expect(trade.pending.value?.id).toBe(intent.id);
    await trade.submit();
    expect(state.send).toHaveBeenCalledTimes(1);
    finish(hash);
    await operation;
    await vi.advanceTimersByTimeAsync(1001);
    await flushPromises();
    expect(trade.outcome.value).toBe('success');
    expect(trade.pending.value).toBeUndefined();
    expect(state.send).toHaveBeenCalledTimes(1);
  });

  it('rejects an unrelated wallet-history hash while recovering an interrupted submission', async () => {
    await loadTrade();
    state.send.mockRejectedValueOnce(new Error('wallet connection lost'));
    await trade.submit();
    const intent = trade.pending.value!;
    if (intent.kind === 'batch') throw new Error('Expected an individual transaction');
    trade.recoveryHash.value = hash;
    vi.mocked(publicClient.getTransaction).mockResolvedValueOnce({
      from: intent.from,
      to: intent.from,
      input: '0x',
      nonce: 0,
      hash,
    } as never);
    await trade.recoverTransaction();
    expect(trade.issue.value).toBe('hash');
    expect(trade.pending.value).toBe(intent);
    vi.mocked(publicClient.getTransaction).mockResolvedValueOnce({
      from: intent.from,
      to: intent.to,
      input: intent.data,
      nonce: -1,
      hash,
    } as never);
    await trade.recoverTransaction();
    expect(trade.pending.value).toBe(intent);
    expect(state.send).toHaveBeenCalledTimes(1);
  });

  it('recovers a cancellation by hash after a receipt timeout using the stored exact nonce', async () => {
    await loadTrade();
    state.receipt.mockRejectedValueOnce(new Error('timeout'));
    await trade.submit();
    expect(trade.outcome.value).toBe('timeout');
    const intent = trade.pending.value!;
    if (intent.kind === 'batch') throw new Error('Expected an individual transaction');
    const cancellationHash = `0x${'2'.repeat(64)}` as const;
    trade.recoveryHash.value = cancellationHash;
    vi.mocked(publicClient.getTransaction).mockResolvedValueOnce({
      from: intent.from,
      to: intent.from,
      input: '0x',
      nonce: intent.nonce,
      value: 0n,
      hash: cancellationHash,
    } as never);
    await trade.recoverTransaction();
    expect(trade.outcome.value).toBe('cancelled');
    expect(trade.pending.value).toBeUndefined();
    expect(state.send).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem('argon.trade.pending.v1.11155111')).toBeNull();
  });

  it('requires explicit original-nonce verification when the original transaction was dropped before lookup', async () => {
    await loadTrade();
    vi.mocked(publicClient.getTransaction).mockRejectedValueOnce(new Error('original dropped'));
    state.receipt.mockRejectedValueOnce(new Error('timeout'));
    await trade.submit();
    const intent = trade.pending.value!;
    if (intent.kind === 'batch') throw new Error('Expected an individual transaction');
    expect(intent.nonce).toBeUndefined();
    const cancellationHash = `0x${'2'.repeat(64)}` as const;
    trade.recoveryHash.value = cancellationHash;
    vi.mocked(publicClient.getTransaction).mockResolvedValue({
      from: intent.from,
      to: intent.from,
      input: '0x',
      nonce: 0,
      value: 0n,
      hash: cancellationHash,
    } as never);
    await trade.recoverTransaction();
    expect(trade.pending.value).toBe(intent);
    trade.recoveryNonce.value = '0';
    await trade.recoverTransaction();
    expect(trade.pending.value).toBe(intent);
    trade.verifiedRecoveryNonce.value = true;
    await trade.recoverTransaction();
    expect(trade.outcome.value).toBe('cancelled');
    expect(trade.pending.value).toBeUndefined();
    expect(state.send).toHaveBeenCalledTimes(1);
  });

  it('invalidates a Sepolia trade when mainnet is selected', async () => {
    await loadTrade();
    expect(trade.quote.value).toBeDefined();
    trade.networkId.value = 1;
    expect(trade.quote.value).toBeUndefined();
    expect(trade.balances.value).toBeUndefined();
    expect(trade.network.value.argon.address).toBe(tradeNetworks[1].argon.address);
    await trade.submit();
    expect(state.send).not.toHaveBeenCalled();
    expect(localStorage.getItem('argon.trade.pending.v1.1')).toBeNull();
  });

  it.each(['reverted', 'cancelled', 'replaced'] as const)(
    'reports %s without claiming a successful swap',
    async (result) => {
      await loadTrade();
      state.receipt.mockImplementationOnce(async (options) => {
        if (result !== 'reverted') options.onReplaced({ reason: result, transaction: { hash: `0x${'2'.repeat(64)}` } });
        return { status: result === 'reverted' ? 'reverted' : 'success' };
      });
      await trade.submit();
      expect(trade.outcome.value).toBe(result);
      expect(trade.pending.value).toBeUndefined();
      expect(state.send).toHaveBeenCalledTimes(1);
    },
  );
});
