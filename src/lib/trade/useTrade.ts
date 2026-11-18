import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue';
import {
  connect,
  createConfig,
  disconnect,
  getAccount,
  getConnectors,
  getWalletClient,
  injected,
  reconnect,
  switchChain,
  watchAccount,
  watchConnectors,
  type Connector,
} from '@wagmi/core';
import {
  AtomicityNotSupportedError,
  BaseError,
  ContractFunctionRevertedError,
  UserRejectedRequestError,
  decodeErrorResult,
  encodeFunctionData,
  erc20Abi,
  http,
  isHash,
  toHex,
  zeroAddress,
  type Address,
  type Hash,
  type Hex,
} from 'viem';
import { mainnet, sepolia } from 'viem/chains';
import {
  APPROVAL_LIFETIME,
  QUOTE_LIFETIME,
  buildAtomicSwapCalls,
  buildSwap,
  buildTokenApproval,
  minimumOutput,
  parseTokenAmount,
  permit2Abi,
  permit2Types,
  quoterAbi,
  tradeClients,
  tradeNetworks,
  tradeRoute,
  type PermitSingle,
  type TradeQuote,
} from './pool';
import {
  matchRecoveredTransaction,
  readPendingTrade,
  removePendingTrade,
  validatePendingTrade,
  writePendingTrade,
  type PendingBatch,
  type PendingTrade,
  type PendingTransaction,
  type TradeStep,
} from './pendingTrade';

const walletConfig = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: { [mainnet.id]: http(tradeNetworks[1].rpcUrl), [sepolia.id]: http(tradeNetworks[11155111].rpcUrl) },
});

export function useTrade(initialNetworkId: 1 | 11155111 = 11155111) {
  const networkId = ref(initialNetworkId);
  const network = computed(() => tradeNetworks[networkId.value]);
  const client = computed(() => tradeClients[networkId.value]);
  const pendingKey = computed(() => `argon.trade.pending.v1.${networkId.value}`);
  const account = shallowRef(getAccount(walletConfig));
  const connectors = shallowRef(getConnectors(walletConfig));
  const atomicSupported = ref(false);

  const amount = ref('');
  const buying = ref(true);
  const counterSymbol = ref('USDC');
  const slippage = ref(50);
  const quote = shallowRef<TradeQuote>();
  const quoting = ref(false);
  const balances = shallowRef<{
    input: bigint;
    output: bigint;
    tokenAllowance: bigint;
    permitAmount: bigint;
    expiration: number;
    permitNonce: number;
  }>();

  const pending = shallowRef<PendingTrade>();
  const phase = ref<'idle' | 'checking' | 'authorizing' | 'signing' | 'confirming'>('idle');
  const outcome = ref<'success' | 'reverted' | 'replaced' | 'cancelled' | 'timeout'>();
  const completedStep = ref<PendingTrade['kind']>();
  const issue = ref('');
  const errorDetail = ref('');

  const recoveryHash = ref('');
  const recoveryNonce = ref('');
  const verifiedRecoveryNonce = ref(false);
  const noTransactionSent = ref(false);

  const now = ref(Date.now());
  let revision = 0;
  let quoteRequest = 0;
  let balanceRequest = 0;
  let active = true;
  let monitoring = false;
  let receiptController: AbortController | undefined;
  let quoteTimer: ReturnType<typeof setTimeout>;
  let clock: ReturnType<typeof setInterval>;
  let stopAccount: () => void;
  let stopConnectors: () => void;

  const counterTokens = computed(() => [network.value.usdc, ...network.value.additionalTokens]);
  const counterToken = computed(
    () => counterTokens.value.find((token) => token.symbol === counterSymbol.value) ?? network.value.usdc,
  );
  const inputToken = computed(() => (buying.value ? counterToken.value : network.value.argon));
  const outputToken = computed(() => (buying.value ? network.value.argon : counterToken.value));
  const fresh = computed(() => quote.value && now.value < quote.value.expiresAt);
  const busy = computed(() => phase.value !== 'idle');
  const batchWalletConnected = computed(() => {
    const batch = pending.value;
    if (batch?.kind !== 'batch') return false;
    return (
      account.value.status === 'connected' &&
      account.value.chainId === networkId.value &&
      account.value.connector?.id === batch.connectorId &&
      account.value.address?.toLowerCase() === batch.from.toLowerCase()
    );
  });

  const step = computed<TradeStep>(() => {
    if (!quote.value || !balances.value) return 'token';
    if (inputToken.value.address === zeroAddress) return 'swap';
    if (atomicSupported.value) return 'batch';
    if (balances.value.tokenAllowance < quote.value.amountIn) {
      return balances.value.tokenAllowance > 0n ? 'reset' : 'token';
    }
    return 'swap';
  });
  const insufficient = computed(() => quote.value && balances.value && balances.value.input < quote.value.amountIn);
  const canSubmit = computed(
    () =>
      account.value.chainId === networkId.value &&
      account.value.status === 'connected' &&
      fresh.value &&
      balances.value &&
      !insufficient.value &&
      !busy.value &&
      !pending.value &&
      issue.value !== 'storage',
  );

  async function refreshQuote() {
    const request = ++quoteRequest;
    quote.value = undefined;
    const deployment = network.value.deployment;
    const rpc = client.value;
    if (!amount.value) return;
    let amountIn: bigint;
    try {
      amountIn = parseTokenAmount(amount.value, inputToken.value.decimals);
    } catch (error) {
      issue.value = (error as Error).message;
      return;
    }
    const route = tradeRoute(network.value, counterToken.value, buying.value);
    const tolerance = slippage.value;
    const expiresAt = Date.now() + QUOTE_LIFETIME;
    quoting.value = true;
    issue.value = '';
    errorDetail.value = '';
    try {
      const blockNumber = await rpc.getBlockNumber({ cacheTime: 0 });
      if (!active || request !== quoteRequest) return;
      let amountOut = amountIn;
      for (const hop of route) {
        if (amountOut === 0n) throw new Error('quote');
        const { result } = await rpc.simulateContract({
          address: deployment.quoter,
          abi: quoterAbi,
          functionName: 'quoteExactInputSingle',
          blockNumber,
          args: [{ ...hop, exactAmount: amountOut, hookData: '0x' }],
        });
        if (!active || request !== quoteRequest) return;
        amountOut = result[0];
      }
      if (Date.now() >= expiresAt) throw new Error('stale');
      quote.value = {
        route,
        amountIn,
        amountOut,
        minimum: minimumOutput(amountOut, tolerance),
        expiresAt,
        blockNumber,
      };
    } catch (error) {
      if (active && request === quoteRequest) showError(error, 'quote');
    } finally {
      if (request === quoteRequest) quoting.value = false;
    }
  }

  async function refreshBalances() {
    const request = ++balanceRequest;
    const address = account.value.address;
    balances.value = undefined;
    const deployment = network.value.deployment;
    const rpc = client.value;
    if (!address || account.value.chainId !== networkId.value) return;
    const input = inputToken.value.address;
    const output = outputToken.value.address;
    try {
      const [inputBalance, outputBalance, tokenAllowance, permit] = await Promise.all([
        readBalance(input, address),
        readBalance(output, address),
        input === zeroAddress
          ? 0n
          : rpc.readContract({
              address: input,
              abi: erc20Abi,
              functionName: 'allowance',
              args: [address, deployment.permit2],
            }),
        input === zeroAddress
          ? undefined
          : rpc.readContract({
              address: deployment.permit2,
              abi: permit2Abi,
              functionName: 'allowance',
              args: [address, input, deployment.router],
            }),
      ]);
      now.value = Date.now();
      if (active && request === balanceRequest)
        balances.value = {
          input: inputBalance,
          output: outputBalance,
          tokenAllowance,
          permitAmount: permit?.[0] ?? 0n,
          expiration: permit?.[1] ?? 0,
          permitNonce: permit?.[2] ?? 0,
        };
    } catch (error) {
      if (active && request === balanceRequest) showError(error, 'balances');
    }

    function readBalance(token: Address, owner: Address) {
      if (token === zeroAddress) return rpc.getBalance({ address: owner });
      return rpc.readContract({ address: token, abi: erc20Abi, functionName: 'balanceOf', args: [owner] });
    }
  }

  async function connectWallet(connector: Connector) {
    if (busy.value) return;
    phase.value = 'checking';
    issue.value = '';
    try {
      await connect(walletConfig, { connector });
    } catch (error) {
      showError(error, 'wallet');
    } finally {
      phase.value = 'idle';
    }
  }

  async function changeNetwork() {
    if (busy.value) return;
    phase.value = 'checking';
    issue.value = '';
    try {
      await switchChain(walletConfig, { chainId: networkId.value });
    } catch (error) {
      showError(error, 'network');
    } finally {
      phase.value = 'idle';
    }
  }

  async function disconnectWallet() {
    await disconnect(walletConfig);
  }

  async function submit() {
    if (!canSubmit.value || !quote.value) return;
    if (!navigator.locks) {
      issue.value = 'locking';
      return;
    }
    const trade = quote.value;
    const deployment = network.value.deployment;
    const chainId = networkId.value;
    const chain = network.value.chain;
    const rpc = client.value;
    const storageKey = pendingKey.value;
    const address = account.value.address!;
    const connectorId = account.value.connector?.id;
    const currentRevision = revision;
    const selectedStep = step.value;
    let intent: PendingTrade | undefined;

    resetRecoveryInputs();
    phase.value = 'checking';
    outcome.value = undefined;
    issue.value = '';
    errorDetail.value = '';
    try {
      await navigator.locks.request(storageKey, { ifAvailable: true }, submitWithLock);
    } catch (error) {
      showError(error, 'storage');
    } finally {
      if (active && !monitoring) phase.value = 'idle';
    }

    async function submitWithLock(lock: Lock | null) {
      if (!lock) {
        issue.value = 'elsewhere';
        return;
      }
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved && saved !== 'null') {
          loadPending();
          return;
        }
        localStorage.setItem(storageKey, 'null');

        await refreshBalances();
        assertCurrent();
        if (!balances.value || insufficient.value) throw new Error('balances');
        if (selectedStep !== step.value) throw new Error('changed');

        const wallet = await getWalletClient(walletConfig, { chainId });
        assertCurrent();
        const deadline = BigInt(Math.floor(trade.expiresAt / 1000));
        const { permitAmount, expiration, permitNonce, tokenAllowance } = balances.value;
        const latestExpiration = Math.floor(Date.now() / 1000) + APPROVAL_LIFETIME;
        const hasTradeAllowance =
          permitAmount === trade.amountIn && expiration >= Number(deadline) && expiration <= latestExpiration;

        if (selectedStep === 'batch') {
          await sendBatch();
        } else {
          await sendTransaction(selectedStep);
        }

        async function sendBatch() {
          const supported = await supportsAtomicCalls(wallet, address, chainId);
          assertCurrent();
          if (!connectorId || !supported) {
            atomicSupported.value = false;
            throw new Error('batch-unavailable');
          }
          const calls = buildAtomicSwapCalls(deployment, trade, deadline, tokenAllowance, hasTradeAllowance);
          await assertWallet();

          const id = crypto.randomUUID();
          const batch: PendingBatch = {
            id,
            from: address,
            kind: 'batch',
            batchId: `0x${id.replace(/-/g, '')}`,
            connectorId,
          };
          persistBeforeWalletPrompt(batch);
          const result = await wallet.sendCalls({
            account: address,
            chain,
            id: batch.batchId,
            calls,
            forceAtomic: true,
          });
          if (!result || typeof result.id !== 'string' || !result.id || result.id.length > 8194)
            throw new Error('batch-status');
          await followSubmission({ ...batch, batchId: result.id, accepted: true });
        }

        async function sendTransaction(kind: Exclude<TradeStep, 'batch'>) {
          let transaction: { to: Address; data: Hex; value?: bigint };
          if (kind === 'swap') {
            let permit: Parameters<typeof buildSwap>[2];
            if (inputToken.value.address !== zeroAddress && !hasTradeAllowance) {
              const message: PermitSingle = {
                details: {
                  token: inputToken.value.address,
                  amount: trade.amountIn,
                  expiration: Number(deadline),
                  nonce: permitNonce,
                },
                spender: deployment.router,
                sigDeadline: deadline,
              };
              await assertWallet();
              phase.value = 'authorizing';
              const signature = await wallet.signTypedData({
                account: address,
                domain: { name: 'Permit2', chainId, verifyingContract: deployment.permit2 },
                types: permit2Types,
                primaryType: 'PermitSingle',
                message,
              });
              assertCurrent();
              phase.value = 'checking';
              permit = { message, signature };
            }
            const swap = buildSwap(trade, deadline, permit);
            transaction = { to: deployment.router, data: encodeFunctionData(swap) };
            if ('value' in swap) transaction.value = swap.value;
          } else {
            transaction = buildTokenApproval(
              inputToken.value.address,
              deployment.permit2,
              kind === 'reset' ? 0n : trade.amountIn,
            );
          }
          await rpc.call({ ...transaction, account: address });
          assertCurrent();
          const nonceFloor = await rpc.getTransactionCount({ address, blockTag: 'pending' });
          assertCurrent();
          await assertWallet();

          const { value, ...call } = transaction;
          const request: PendingTransaction = {
            ...call,
            id: crypto.randomUUID(),
            kind,
            from: address,
            nonceFloor,
          };
          if (value !== undefined) request.value = toHex(value);
          persistBeforeWalletPrompt(request);
          const hash = await wallet.sendTransaction({ ...transaction, account: address, chain });
          await followSubmission({ ...request, hash });
        }

        async function assertWallet() {
          const [addresses, walletChainId] = await Promise.all([wallet.getAddresses(), wallet.getChainId()]);
          assertCurrent();
          if (addresses[0]?.toLowerCase() !== address.toLowerCase() || walletChainId !== chainId)
            throw new Error('changed');
        }
      } catch (error) {
        showError(error, phase.value === 'authorizing' ? 'permit-signature' : 'transaction');
        if (intent?.kind === 'batch' && issue.value === 'batch-unavailable') atomicSupported.value = false;
        if (intent && (issue.value === 'rejected' || issue.value === 'batch-unavailable')) {
          clearPending(intent, storageKey);
          pending.value = undefined;
        }
      }
    }

    function persistBeforeWalletPrompt(request: PendingTrade) {
      intent = request;
      if (!savePending(request, storageKey)) throw new Error('storage');
      pending.value = request;
      phase.value = 'signing';
    }

    async function followSubmission(request: PendingTrade) {
      savePending(request, storageKey);
      if (!active) return;
      pending.value = request;
      await checkPending();
    }

    function assertCurrent() {
      const currentAccount = getAccount(walletConfig);
      if (
        !active ||
        revision !== currentRevision ||
        currentAccount.status !== 'connected' ||
        currentAccount.address?.toLowerCase() !== address.toLowerCase() ||
        currentAccount.chainId !== chainId
      )
        throw new Error('changed');
      if (Date.now() >= trade.expiresAt) throw new Error('stale');
    }
  }

  async function checkPending() {
    const record = pending.value;
    if (!record || monitoring || (record.kind !== 'batch' && !record.hash)) return;
    if (record.kind === 'batch' && !batchWalletConnected.value) return;

    monitoring = true;
    phase.value = 'confirming';
    outcome.value = undefined;
    const storageKey = pendingKey.value;
    const rpc = client.value;
    try {
      if (record.kind === 'batch') {
        await trackBatch(record);
      } else {
        await trackTransaction(record);
      }
    } catch {
      if (active && pendingKey.value === storageKey) outcome.value = 'timeout';
    } finally {
      monitoring = false;
      if (active) phase.value = 'idle';
    }

    async function trackBatch(batch: PendingBatch) {
      const chainId = networkId.value;
      const wallet = await getWalletClient(walletConfig, { chainId });
      if (!active || pending.value !== batch || !batchWalletConnected.value) return;
      const result = await wallet.waitForCallsStatus({
        id: batch.batchId,
        timeout: 120_000,
        status: ({ statusCode }) =>
          !active || pending.value !== batch || !batchWalletConnected.value || statusCode >= 200,
      });
      if (!active || pendingKey.value !== storageKey || pending.value !== batch || !batchWalletConnected.value) return;
      if (result.id !== batch.batchId || result.chainId !== chainId) throw new Error('batch-status');
      if (result.statusCode === 400) {
        await completeRequest(batch, storageKey, 'cancelled');
        return;
      }
      if (!result.atomic) throw new Error('batch-status');
      if (result.statusCode === 500) {
        await completeRequest(batch, storageKey, 'reverted');
        return;
      }
      if (
        result.statusCode !== 200 ||
        !result.receipts?.length ||
        result.receipts.some((receipt) => receipt.status !== 'success')
      ) {
        throw new Error('batch-status');
      }
      await completeRequest(batch, storageKey, 'success');
    }

    async function trackTransaction(transaction: PendingTransaction) {
      receiptController = new AbortController();
      if (transaction.nonce === undefined) {
        try {
          const sent = await rpc.getTransaction({ hash: transaction.hash! });
          if (!stillTrackingTransaction()) return;
          transaction = { ...transaction, nonce: sent.nonce };
          pending.value = transaction;
          savePending(transaction, storageKey);
        } catch {
          if (!active) return;
        }
      }
      const replacement =
        transaction.nonce === undefined
          ? undefined
          : {
              from: transaction.from,
              nonce: transaction.nonce,
              to: transaction.to,
              input: transaction.data,
              value: BigInt(transaction.value ?? 0n),
            };
      const receipt = await rpc.waitForTransactionReceipt({
        signal: receiptController.signal,
        replacement,
        hash: transaction.hash!,
        timeout: 120_000,
        onReplaced(event) {
          if (!stillTrackingTransaction()) return;
          const replacement = event.reason === 'repriced' ? transaction.replacement : event.reason;
          transaction = { ...transaction, hash: event.transaction.hash, replacement };
          pending.value = transaction;
          savePending(transaction, storageKey);
        },
      });
      if (!stillTrackingTransaction()) return;
      await completeRequest(
        transaction,
        storageKey,
        transaction.replacement ?? (receipt.status === 'success' ? 'success' : 'reverted'),
      );

      function stillTrackingTransaction() {
        return active && pendingKey.value === storageKey && pending.value?.hash === transaction.hash;
      }
    }
  }

  async function completeRequest(
    record: PendingTrade,
    storageKey: string,
    status: 'success' | 'reverted' | 'replaced' | 'cancelled',
  ) {
    completedStep.value = record.kind;
    outcome.value = status;
    clearPending(record, storageKey);
    pending.value = undefined;
    quote.value = undefined;
    if (status === 'success' && record.kind !== 'swap' && record.kind !== 'batch') {
      await Promise.all([refreshBalances(), refreshQuote()]);
    } else {
      await refreshBalances();
    }
  }

  async function recoverTransaction() {
    if (!pending.value || pending.value.kind === 'batch' || busy.value) return;
    if (!isHash(recoveryHash.value)) {
      issue.value = 'hash';
      return;
    }
    const intent = pending.value;
    const storageKey = pendingKey.value;
    const rpc = client.value;
    phase.value = 'checking';
    try {
      const transaction = await rpc.getTransaction({ hash: recoveryHash.value });
      if (!active || pendingKey.value !== storageKey || pending.value !== intent) return;
      const verifiedNonce = verifiedRecoveryNonce.value ? recoveryNonce.value : undefined;
      const recovered = matchRecoveredTransaction(intent, transaction, verifiedNonce);
      if (!savePending(recovered, storageKey)) return;
      pending.value = recovered;
      if (issue.value === 'hash') issue.value = '';
      await checkPending();
    } catch {
      issue.value = 'hash';
    } finally {
      if (active && !monitoring) phase.value = 'idle';
    }
  }

  function clearUnsent() {
    if (!pending.value || pending.value.hash || busy.value || !noTransactionSent.value) return;
    if (pending.value.kind === 'batch' && (pending.value.accepted || outcome.value !== 'timeout')) return;
    clearPending(pending.value, pendingKey.value);
    pending.value = undefined;
    noTransactionSent.value = false;
    quote.value = undefined;
    issue.value = '';
  }

  function savePending(value: PendingTrade, storageKey: string) {
    try {
      if (writePendingTrade(storageKey, value)) return true;
      issue.value = 'elsewhere';
    } catch {
      issue.value = 'storage';
    }
    return false;
  }

  function clearPending(value: PendingTrade, storageKey: string) {
    try {
      removePendingTrade(storageKey, value);
    } catch {
      issue.value = 'storage';
    }
  }

  function loadPending() {
    try {
      const stored = readPendingTrade(pendingKey.value);
      if (stored?.id !== pending.value?.id) resetRecoveryInputs();
      pending.value = undefined;
      if (!stored) return;
      validatePendingTrade(stored);
      pending.value = stored;
      void checkPending();
    } catch {
      issue.value = 'storage';
    }
  }

  function resetRecoveryInputs() {
    recoveryHash.value = '';
    recoveryNonce.value = '';
    verifiedRecoveryNonce.value = false;
    noTransactionSent.value = false;
  }

  function showError(error: unknown, fallback: string) {
    if (error instanceof BaseError) {
      const reverted = error.walk((cause) => cause instanceof ContractFunctionRevertedError);
      if (reverted instanceof ContractFunctionRevertedError && reverted.data?.errorName === 'UnexpectedRevertBytes') {
        try {
          const nested = decodeErrorResult({ abi: quoterAbi, data: reverted.data.args![0] as Hex });
          if (nested.errorName === 'NotEnoughLiquidity') {
            issue.value = 'liquidity';
            return;
          }
        } catch {}
      }
    }
    if (hasRpcErrorCode(UserRejectedRequestError.code)) {
      issue.value = 'rejected';
    } else if (hasRpcErrorCode(AtomicityNotSupportedError.code)) {
      issue.value = 'batch-unavailable';
    } else if (
      error instanceof Error &&
      ['changed', 'stale', 'balances', 'storage', 'batch-unavailable', 'batch-status'].includes(error.message)
    ) {
      issue.value = error.message;
    } else {
      issue.value = fallback;
      errorDetail.value = error instanceof BaseError ? error.shortMessage : '';
    }

    function hasRpcErrorCode(code: number) {
      const matches = (cause: unknown) => (cause as { code?: number })?.code === code;
      return matches(error) || (error instanceof BaseError && error.walk(matches));
    }
  }

  watch(
    counterSymbol,
    () => {
      amount.value = '';
    },
    { flush: 'sync' },
  );

  watch(
    [
      amount,
      buying,
      counterSymbol,
      slippage,
      networkId,
      () => account.value.address,
      () => account.value.chainId,
      () => account.value.connector?.uid,
    ],
    () => {
      revision++;
      quoteRequest++;
      balanceRequest++;
      quote.value = undefined;
      balances.value = undefined;
      quoting.value = false;
      if (!busy.value) issue.value = '';
      clearTimeout(quoteTimer);
      quoteTimer = setTimeout(refreshQuote, 350);
      void refreshBalances();
    },
    { flush: 'sync' },
  );

  watch(
    networkId,
    () => {
      if (counterSymbol.value !== 'USDC') {
        counterSymbol.value = 'USDC';
      }
      outcome.value = undefined;
      loadPending();
    },
    { flush: 'sync' },
  );

  watch(
    [
      networkId,
      () => account.value.address,
      () => account.value.chainId,
      () => account.value.connector?.uid,
      () => account.value.status,
    ],
    async ([chainId, address, walletChainId, connector, status], _previous, onCleanup) => {
      atomicSupported.value = false;
      if (!address || walletChainId !== chainId || !connector || status !== 'connected') return;
      let current = true;
      onCleanup(() => {
        current = false;
      });
      if (batchWalletConnected.value && !busy.value) void checkPending();
      try {
        const wallet = await getWalletClient(walletConfig, { chainId });
        const supported = await supportsAtomicCalls(wallet, address, chainId);
        if (active && current) atomicSupported.value = supported;
      } catch {}
    },
    { immediate: true, flush: 'sync' },
  );

  onMounted(() => {
    stopAccount = watchAccount(walletConfig, {
      onChange(value) {
        account.value = value;
      },
    });
    stopConnectors = watchConnectors(walletConfig, {
      onChange(value) {
        connectors.value = value;
      },
    });
    void reconnect(walletConfig).catch((error) => showError(error, 'wallet'));
    loadPending();
    clock = setInterval(() => {
      now.value = Date.now();
      if (busy.value) return;
      const record = pending.value;
      if (!record || record.hash) return;
      if (record.kind !== 'batch') {
        loadPending();
      } else if (!record.accepted) {
        // The original wallet prompt may return after this page was reloaded.
        try {
          const saved = readPendingTrade(pendingKey.value) as Partial<PendingBatch> | null;
          if (saved?.id !== record.id || saved.accepted) loadPending();
        } catch {
          issue.value = 'storage';
        }
      }
    }, 1000);
  });

  onUnmounted(() => {
    active = false;
    receiptController?.abort();
    revision++;
    quoteRequest++;
    balanceRequest++;
    stopAccount?.();
    stopConnectors?.();
    clearTimeout(quoteTimer);
    clearInterval(clock);
  });

  return {
    recoveryNonce,
    verifiedRecoveryNonce,
    recoveryHash,
    noTransactionSent,
    recoverTransaction,
    clearUnsent,
    networkId,
    network,
    account,
    connectors,
    amount,
    buying,
    counterSymbol,
    counterToken,
    counterTokens,
    slippage,
    inputToken,
    outputToken,
    quote,
    balances,
    pending,
    batchWalletConnected,
    phase,
    outcome,
    completedStep,
    issue,
    errorDetail,
    quoting,
    fresh,
    busy,
    step,
    insufficient,
    canSubmit,
    refreshQuote,
    refreshBalances,
    connectWallet,
    disconnectWallet,
    changeNetwork,
    submit,
    checkPending,
  };
}

async function supportsAtomicCalls(
  wallet: Awaited<ReturnType<typeof getWalletClient>>,
  address: Address,
  chainId: number,
) {
  try {
    const capabilities = await wallet.getCapabilities({ account: address });
    const atomic = capabilities[chainId]?.atomic ?? capabilities[0]?.atomic;
    return atomic?.status === 'supported';
  } catch {
    return false;
  }
}
