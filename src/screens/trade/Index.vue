<template>
  <div class="trade-page min-h-screen text-argon-text-primary">
    <TopBar />
    <main class="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-20 pt-8 sm:pt-12">
      <header class="mb-7 w-full max-w-[480px] text-center">
        <h1 class="font-serif text-3xl tracking-tight sm:text-4xl">Swap with Deep Liquidity</h1>
        <p class="mt-3 text-sm leading-relaxed text-argon-800/75">
          Trade ARGN through the Argon community’s USDC pool on Uniswap v4. The pool charges 0.5% when you buy
          ARGN and adjusts the sell fee for U.S. dollar inflation.
          <span class="inline-block align-middle leading-none">
            <HelpTooltip label="About this pool">
              The pool’s hook sets the sell fee between 0.5% and 10% to account for accumulated U.S. dollar inflation.
              You can trade here while we work to add support for the hook on Uniswap’s website.
            </HelpTooltip>
          </span>
        </p>
      </header>

      <section
        class="swap-card w-full max-w-[480px] rounded-[28px] border border-argon-200/50 bg-white p-3 sm:p-4"
        aria-label="Swap form"
      >
        <div class="mb-3 flex min-h-9 items-center justify-between gap-2 px-1 text-sm">
          <PopoverRoot v-if="account.address">
            <PopoverTrigger class="wallet-button" type="button" aria-label="Wallet account">
              <img v-if="account.connector?.icon" :src="account.connector.icon" class="size-4 rounded-sm" alt="" />
              <WalletIcon v-else class="size-4" aria-hidden="true" />
              {{ account.address.slice(0, 7) }}...{{ account.address.slice(-5) }}
            </PopoverTrigger>
            <PopoverPortal>
              <PopoverContent align="start" :side-offset="8" :collision-padding="12" class="trade-popover" aria-label="Wallet account">
                <p class="font-semibold">{{ account.connector?.name ?? 'Connected wallet' }}</p>
                <p class="mt-1 break-all font-mono text-xs text-argon-800/70">{{ account.address }}</p>
                <button
                  type="button"
                  class="mt-3 cursor-pointer rounded-lg bg-argon-50 px-3 py-1.5 font-semibold text-argon-700 hover:bg-argon-100 disabled:cursor-default disabled:opacity-50"
                  :disabled="busy"
                  @click="disconnectWallet"
                >
                  Disconnect
                </button>
              </PopoverContent>
            </PopoverPortal>
          </PopoverRoot>
          <button
            v-else-if="!pending || pending.kind === 'batch'"
            type="button"
            class="wallet-button"
            :disabled="busy"
            @click="walletOpen = true"
          >
            <WalletIcon class="size-4" aria-hidden="true" />
            Connect wallet
          </button>

          <div class="ml-auto flex items-center gap-2">
            <p v-if="networkId === 11155111" class="text-xs font-medium text-argon-800/75">Sepolia testnet</p>
            <PopoverRoot>
              <PopoverTrigger
                type="button"
                aria-label="Swap settings"
                class="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg text-argon-700 hover:bg-argon-50 data-[state=open]:bg-argon-50"
              >
                <Cog6ToothIcon class="size-5" aria-hidden="true" />
              </PopoverTrigger>
              <PopoverPortal>
                <PopoverContent
                  align="end"
                  :side-offset="8"
                  :collision-padding="12"
                  class="trade-popover space-y-3"
                  aria-label="Swap settings"
                  @open-auto-focus.prevent="slippageSelect?.focus()"
                >
                  <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center">
                      <label for="slippage">Max. slippage</label>
                      <HelpTooltip label="About max slippage">
                        How far the output can fall from your quote before the swap reverts.
                      </HelpTooltip>
                    </div>
                    <select
                      id="slippage"
                      ref="slippageSelect"
                      v-model.number="slippage"
                      class="cursor-pointer rounded-lg border border-argon-200/50 bg-white px-2 py-1.5 disabled:cursor-default"
                      :disabled="busy || !!pending"
                    >
                      <option :value="10">0.1%</option>
                      <option :value="50">0.5%</option>
                      <option :value="100">1%</option>
                    </select>
                  </div>
                  <div class="flex items-center justify-between gap-3">
                    <label for="trade-testnet" class="cursor-pointer">Testnet</label>
                    <SwitchRoot
                      id="trade-testnet"
                      v-model="networkId"
                      :true-value="11155111"
                      :false-value="1"
                      :disabled="busy || !!pending"
                      class="flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-argon-200 px-0.5 transition-colors data-[state=checked]:bg-argon-600 disabled:cursor-default disabled:opacity-50"
                    >
                      <SwitchThumb class="block size-5 rounded-full bg-white shadow-sm transition-transform data-[state=checked]:translate-x-4" />
                    </SwitchRoot>
                  </div>
                  <details class="border-t border-argon-200/40 pt-3 text-xs text-argon-800/75">
                    <summary class="w-fit cursor-pointer">Pool contracts</summary>
                    <div class="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
                      <a class="underline" :href="`${network.chain.blockExplorers!.default.url}/address/${network.usdc.address}`" target="_blank" rel="noopener noreferrer">USDC ↗</a>
                      <a class="underline" :href="`${network.chain.blockExplorers!.default.url}/address/${network.argon.address}`" target="_blank" rel="noopener noreferrer">ARGN ↗</a>
                      <a class="underline" :href="`${network.chain.blockExplorers!.default.url}/address/${network.deployment.poolKey.hooks}`" target="_blank" rel="noopener noreferrer">Hook ↗</a>
                    </div>
                    <p class="mt-2 break-all">Pool ID <span class="font-mono">{{ network.deployment.poolId }}</span></p>
                  </details>
                </PopoverContent>
              </PopoverPortal>
            </PopoverRoot>
          </div>
        </div>
        <div
          v-if="account.address && account.chainId !== networkId && (!pending || pending.kind === 'batch')"
          class="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-argon-200/60 bg-argon-50 px-3 py-2 text-sm"
        >
          <span>Wallet on a different network</span>
          <button
            class="cursor-pointer rounded-lg bg-white px-3 py-1.5 font-semibold text-argon-700 hover:bg-argon-20 disabled:cursor-default disabled:opacity-50"
            :disabled="busy"
            @click="changeNetwork"
          >
            Switch to <template v-if="networkId === 11155111">Sepolia</template><template v-else>Ethereum Mainnet</template>
          </button>
        </div>

        <div class="token-panel rounded-[20px] bg-argon-20 p-4">
          <div class="mb-3 flex items-center justify-between text-sm text-argon-800/65">
            <label for="sell-amount">You pay</label>
            <span v-if="balances" class="max-w-[75%] truncate">
              Balance: <TokenAmount :value="balances.input" :decimals="inputToken.decimals" kind="balance" />
            </span>
          </div>
          <div class="flex items-center gap-3">
            <input
              id="sell-amount"
              v-model="amount"
              class="min-w-0 flex-1 bg-transparent text-[34px] tracking-tight outline-none placeholder:text-argon-200"
              inputmode="decimal"
              autocomplete="off"
              placeholder="0"
              :disabled="busy || !!pending"
              aria-describedby="trade-issue"
            />
            <TradeTokenPicker v-if="buying" v-model="counterSymbol" :tokens="counterTokens" :disabled="busy || !!pending" />
            <span v-else class="flex shrink-0 items-center gap-2 rounded-full border border-argon-200/40 bg-white py-2 pl-2 pr-3 font-semibold shadow-sm">
              <ArgonIcon class="h-7 w-7 text-argon-600" />
              ARGN
            </span>
          </div>
        </div>

        <div class="relative z-[1] -my-3 flex justify-center">
          <button
            class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-4 border-white bg-argon-50 text-argon-700 transition hover:bg-argon-100 disabled:cursor-default"
            :disabled="busy || !!pending"
            aria-label="Reverse swap direction"
            @click="
              buying = !buying;
              amount = '';
            "
          >
            <ArrowDownIcon class="h-5 w-5"/>
          </button>
        </div>

        <div class="token-panel rounded-[20px] bg-argon-20 p-4">
          <div class="mb-3 flex items-center justify-between text-sm text-argon-800/65">
            <span>You receive</span>
            <span v-if="balances" class="max-w-[75%] truncate">
              Balance: <TokenAmount :value="balances.output" :decimals="outputToken.decimals" kind="balance" />
            </span>
          </div>
          <div class="flex items-center gap-3">
            <output
              class="min-w-0 flex-1 overflow-hidden text-ellipsis text-[34px] tracking-tight"
              :class="quote ? 'text-argon-text-primary' : 'text-argon-200'"
              aria-live="polite"
            >
              <template v-if="quoting">…</template>
              <TokenAmount v-else-if="quote" :value="quote.amountOut" :decimals="outputToken.decimals" />
              <template v-else>0</template>
            </output>
            <TradeTokenPicker v-if="!buying" v-model="counterSymbol" :tokens="counterTokens" :disabled="busy || !!pending" />
            <span v-else class="flex shrink-0 items-center gap-2 rounded-full border border-argon-200/40 bg-white py-2 pl-2 pr-3 font-semibold shadow-sm">
              <ArgonIcon class="h-7 w-7 text-argon-600" />
              ARGN
            </span>
          </div>
        </div>

        <div id="trade-issue" class="px-2 text-sm leading-relaxed" aria-live="polite">
          <p v-if="insufficient" class="mt-4 text-argon-error">
            Insufficient {{ inputToken.symbol }} balance.
          </p>
          <p v-if="issue" class="mt-4 text-argon-error">
            <template v-if="issue === 'precision'">Use at most {{ inputToken.decimals }} decimal places. Your amount has not been rounded.</template>
            <template v-else-if="issue === 'amount'">Enter a positive decimal amount within the pool’s size limit.</template>
            <template v-else-if="issue === 'rejected'">Request declined in your wallet. You can try again when ready.</template>
            <template v-else-if="issue === 'changed'">Your wallet or trade changed. Review the updated trade before continuing.</template>
            <template v-else-if="issue === 'stale'">This quote expired. Refresh it before continuing.</template>
            <template v-else-if="issue === 'balances'">Could not verify balances and approvals. Refresh the quote to try again.</template>
            <template v-else-if="issue === 'storage'">Browser storage is unavailable. Enable storage for pending transaction recovery before trading.</template>
            <template v-else-if="issue === 'liquidity'">This route does not have enough liquidity to fill this trade.</template>
            <template v-else-if="issue === 'elsewhere'">Another tab is submitting or tracking a trade. Finish that request before continuing here.</template>
            <template v-else-if="issue === 'locking'">This browser cannot coordinate trade submissions. Open this page over HTTPS in a current browser.</template>
            <template v-else-if="issue === 'hash'">Enter a valid transaction hash from the wallet that signed this request on the selected
              network.</template>
            <template v-else-if="issue === 'quote'">No executable quote is available. Check the amount and try refreshing.</template>
            <template v-else-if="issue === 'wallet'">Could not connect. Open or install a browser wallet, unlock it, and try again.</template>
            <template v-else-if="issue === 'batch-unavailable'">Your wallet cannot batch this swap on this network. Review the separate approval and swap steps below.</template>
            <template v-else-if="issue === 'batch-status'">The wallet did not return a batch confirmation. Check the request status before trying again.</template>
            <template v-else-if="issue === 'permit-signature'">Could not sign the swap permission. Check that your wallet supports typed data signatures and try again.</template>
            <template v-else-if="issue === 'network'">Switch to <template v-if="networkId === 1">Ethereum Mainnet</template><template v-else>Ethereum Sepolia</template> in your wallet, then try again.</template>
            <template v-else>Transaction could not be submitted. Check your
              <template v-if="networkId === 11155111">Sepolia </template>ETH for gas and refresh the quote before trying
              again.</template>
          </p>
          <details v-if="errorDetail" class="mt-2 break-words text-xs text-argon-800/65">
            <summary class="cursor-pointer">Wallet or network details</summary>
            {{ errorDetail }}
          </details>
          <p v-if="outcome === 'success'" class="mt-4 text-argon-700" role="status">
            <template v-if="completedStep === 'swap' || completedStep === 'batch'">Swap confirmed. Your tokens are in the wallet that signed the swap.</template>
            <template v-else>Approval confirmed. Review the quote before continuing.</template>
          </p>
          <p v-else-if="outcome === 'reverted'" class="mt-4 text-argon-error" role="status">
            Transaction reverted. Refresh your quote before trying again.
          </p>
          <p v-else-if="outcome === 'cancelled' || outcome === 'replaced'" class="mt-4 text-argon-700" role="status">
            The transaction was cancelled or replaced in your wallet. Review your wallet history before starting another
            trade.
          </p>
          <p v-else-if="outcome === 'timeout'" class="mt-4 text-argon-700" role="status">
            Confirmation is taking longer than expected. Your transaction may still complete. Check its status below; it
            will not be sent again.
          </p>
          <p v-if="phase === 'authorizing'" class="mt-4 text-argon-700" role="status">
            Sign the spending permission in your wallet. Then your wallet will ask you to confirm the swap.
          </p>
          <p v-else-if="phase === 'signing'" class="mt-4 text-argon-700" role="status">
            Confirm this step in your wallet. Every transaction requires your approval.
          </p>
        </div>

        <div
          v-if="pending && pending.kind !== 'batch' && (!pending.hash || outcome === 'timeout') && !busy"
          class="mt-4 space-y-3 rounded-xl bg-argon-50 p-3 text-xs leading-relaxed"
        >
          <p>
            The wallet response was interrupted. Check your wallet history before continuing. This step will not be sent
            again automatically.
          </p>
          <label for="recovery-hash">Transaction hash from your wallet</label>
          <input
            id="recovery-hash"
            v-model="recoveryHash"
            class="w-full rounded-lg border border-argon-200 bg-white p-2"
            placeholder="0x…"
            autocomplete="off"
          />
          <template v-if="pending.hash && pending.nonce === undefined">
            <label for="recovery-nonce">Original transaction nonce from wallet history</label>
            <input id="recovery-nonce" v-model="recoveryNonce" class="w-full rounded-lg border border-argon-200 bg-white p-2" inputmode="numeric" autocomplete="off" />
            <label class="flex items-start gap-2">
              <input v-model="verifiedRecoveryNonce" type="checkbox" class="mt-1" />
              I verified this nonce against the original transaction in my wallet history. A different nonce can leave the original trade live.
            </label>
          </template>
          <button class="cursor-pointer rounded-lg bg-argon-600 px-3 py-2 text-white disabled:opacity-40" :disabled="!recoveryHash || busy" @click="recoverTransaction">Recover transaction status</button>
          <label v-if="!pending.hash" class="flex items-start gap-2"><input v-model="noTransactionSent" type="checkbox" class="mt-1" />I checked my wallet and confirmed that
            this transaction was never sent.</label>
          <button
            class="cursor-pointer underline disabled:cursor-default disabled:opacity-40"
            :disabled="!noTransactionSent"
            v-if="!pending.hash"
            @click="clearUnsent"
          >
            Clear unsent request
          </button>
        </div>
        <p v-if="pending?.kind === 'batch' && !batchWalletConnected && !busy" class="mt-4 px-2 text-sm text-argon-700">
          Reconnect the wallet and account that approved this swap to check its status.
        </p>
        <div
          v-if="pending?.kind === 'batch' && !pending.accepted && outcome === 'timeout' && !busy"
          class="mt-4 space-y-3 rounded-xl bg-argon-50 p-3 text-xs leading-relaxed"
        >
          <label class="flex items-start gap-2">
            <input v-model="noTransactionSent" type="checkbox" class="mt-1" />
            I checked my wallet and confirmed that this swap was never sent.
          </label>
          <button class="cursor-pointer underline disabled:opacity-40" :disabled="!noTransactionSent" @click="clearUnsent">Clear unsent request</button>
        </div>
        <div class="mt-4">
          <button
            v-if="pending?.kind === 'batch' || pending?.hash"
            class="trade-button"
            :disabled="busy || (pending.kind === 'batch' && !batchWalletConnected)"
            @click="checkPending"
          >
            <template v-if="busy">Waiting for confirmation…</template><template v-else>Check transaction status</template>
          </button>
          <button v-else-if="pending" class="trade-button" disabled>
            <template v-if="busy">Waiting for wallet…</template><template v-else>Review wallet history above</template>
          </button>
          <button v-else-if="!account.address || account.chainId !== networkId" class="trade-button" disabled>
            <template v-if="amount">Swap</template><template v-else>Enter an amount</template>
          </button>
          <button
            v-else-if="amount && (!fresh || !balances) && !quoting"
            class="trade-button"
            :disabled="busy"
            @click="
              refreshQuote();
              refreshBalances();
            "
          >
            Refresh quote
          </button>
          <button v-else class="trade-button" :disabled="!canSubmit" @click="submit">
            <template v-if="busy">Check your wallet…</template>
            <template v-else-if="quoting">Getting quote…</template>
            <template v-else-if="!amount">Enter an amount</template>
            <template v-else-if="insufficient">Insufficient balance</template>
            <template v-else-if="step === 'batch' && balances && quote && balances.tokenAllowance < quote.amountIn">Approve &amp; swap</template>
            <template v-else-if="step === 'reset'">Reset token approval</template>
            <template v-else-if="step === 'token'">Approve {{ inputToken.symbol }}</template>
            <template v-else>Swap {{ inputToken.symbol }} for {{ outputToken.symbol }}</template>
          </button>
        </div>
        <p v-if="pending?.hash" class="mt-3 break-all px-2 text-center text-xs">
          <a
            :href="`${network.chain.blockExplorers!.default.url}/tx/${pending.hash}`"
            target="_blank"
            rel="noopener noreferrer"
            >View pending transaction ↗</a>
        </p>
        <p
          v-if="fresh && account.address && !pending && (step === 'reset' || step === 'token')"
          class="mt-2 px-2 text-center text-xs leading-relaxed text-argon-800/65"
        >
          <template v-if="step === 'reset'">Clear the previous allowance to approve this trade amount.</template>
          <template v-else>Authorize {{ formatUnits(quote!.amountIn, inputToken.decimals) }} {{ inputToken.symbol }} for this trade.</template>
        </p>

        <details v-if="quote && counterPerArgn" class="group mt-2 text-xs text-argon-800/75">
          <summary class="flex cursor-pointer list-none items-center justify-between gap-2 rounded-xl px-2 py-2.5 hover:bg-argon-20">
            <span>1 ARGN = {{ counterPerArgn.precision(6).toFormat() }} {{ counterToken.symbol }}</span>
            <span class="flex shrink-0 items-center gap-1">
              Quote details <ChevronDownIcon class="size-3.5 group-open:rotate-180" aria-hidden="true" />
            </span>
          </summary>
          <dl class="space-y-2 border-t border-argon-200/40 px-2 pb-2 pt-2">
            <div class="flex items-center justify-between gap-3">
              <dt class="flex shrink-0 items-center">
                Minimum received
                <HelpTooltip label="About minimum received">
                  The swap reverts if the pool returns less than this amount.
                </HelpTooltip>
              </dt>
              <dd class="break-all text-right">
                <TokenAmount :value="quote.minimum" :decimals="outputToken.decimals" kind="minimum" /> {{ outputToken.symbol }}
              </dd>
            </div>
            <div v-if="quote.route.length > 1" class="flex justify-between gap-3">
              <dt>Route</dt>
              <dd>{{ inputToken.symbol }} → USDC → {{ outputToken.symbol }}</dd>
            </div>
            <div class="flex justify-between gap-3">
              <dt>Max. slippage</dt>
              <dd>{{ slippage / 100 }}%</dd>
            </div>
            <div class="flex justify-between gap-3">
              <dt>Network fee</dt>
              <dd>Paid in <template v-if="networkId === 11155111">Sepolia </template>ETH</dd>
            </div>
            <div class="flex justify-between gap-3">
              <dt>Quote block</dt>
              <dd>{{ quote.blockNumber.toString() }}<template v-if="!fresh"> · Expired</template></dd>
            </div>
          </dl>
        </details>
      </section>
    </main>

    <DialogRoot v-model:open="walletOpen">
      <DialogPortal>
        <DialogOverlay class="fixed inset-0 z-40" />
        <DialogContent class="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 text-argon-text-primary shadow-xl">
          <div class="mb-3 flex items-center justify-between">
            <DialogTitle class="text-lg font-semibold">Connect wallet</DialogTitle>
            <DialogClose class="cursor-pointer rounded-lg p-1 hover:bg-argon-50" aria-label="Close wallet selection"
              ><XMarkIcon class="h-5 w-5"/></DialogClose>
          </div>
          <DialogDescription class="mb-5 text-sm text-argon-800/65">Choose a browser wallet to trade on <template v-if="networkId === 1">Ethereum Mainnet</template><template v-else>Ethereum Sepolia</template>.</DialogDescription>
          <button
            v-for="connector in connectors"
            :key="connector.uid"
            class="mb-2 flex w-full cursor-pointer items-center justify-between rounded-xl border border-argon-200/50 p-4 text-left font-medium hover:bg-argon-50"
            @click="
              connectWallet(connector);
              walletOpen = false;
            "
          >
            {{ connector.name }} <span aria-hidden="true">↗</span>
          </button>
          <p class="mt-3 text-xs leading-relaxed text-argon-800/55">
            Install and unlock a wallet extension if yours does not appear. Connecting does not authorize a trade.
          </p>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatUnits } from 'viem';
import BigNumber from 'bignumber.js';
import { ArrowDownIcon, ChevronDownIcon, Cog6ToothIcon, WalletIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  PopoverRoot,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  SwitchRoot,
  SwitchThumb,
} from 'reka-ui';
import TopBar from '@/navigation/TopBar.vue';
import HelpTooltip from '@/components/HelpTooltip.vue';
import ArgonIcon from '@/assets/logo.svg';
import { useTrade } from '@/lib/trade/useTrade';
import TokenAmount from './TokenAmount.vue';
import TradeTokenPicker from './TradeTokenPicker.vue';

const walletOpen = ref(false);
const slippageSelect = ref<HTMLSelectElement>();
const route = useRoute();
const router = useRouter();
const {
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
} = useTrade(route.query.network === 'sepolia' ? 11155111 : 1);

const counterPerArgn = computed(() => {
  if (!quote.value) return;
  const { amountIn, amountOut } = quote.value;
  const counterAmount = buying.value ? amountIn : amountOut;
  const argnAmount = buying.value ? amountOut : amountIn;
  const decimalShift = network.value.argon.decimals - counterToken.value.decimals;
  return new BigNumber(counterAmount.toString()).shiftedBy(decimalShift).dividedBy(argnAmount.toString());
});

watch(networkId, (chainId) => {
  void router.replace({ query: { ...route.query, network: chainId === 1 ? 'mainnet' : 'sepolia' } });
});
</script>

<style scoped>
@reference '../../main.css';

.trade-page {
  background: radial-gradient(ellipse at 50% 25%, #f1dcf5 0%, transparent 55%), var(--bg-color);
}

.swap-card {
  box-shadow:
    0 12px 60px -24px rgb(120 15 133 / 25%),
    0 2px 8px rgb(75 43 78 / 3%);
}

.trade-button {
  @apply w-full cursor-pointer rounded-2xl bg-argon-button px-4 py-4 text-base font-semibold text-white transition hover:bg-argon-button-hover disabled:cursor-default disabled:bg-argon-50 disabled:text-argon-500/65;
}

.wallet-button {
  @apply inline-flex min-h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-argon-50 px-2.5 font-semibold text-argon-700 hover:bg-argon-100 disabled:cursor-default disabled:opacity-50;
}

:global(.trade-popover) {
  @apply z-30 w-72 max-w-[calc(100vw-24px)] rounded-2xl border border-argon-200/60 bg-white p-4 text-sm text-argon-text-primary shadow-lg;
}

button:focus-visible,
input:focus-visible,
select:focus-visible,
summary:focus-visible {
  outline: 2px solid var(--color-argon-500);
  outline-offset: 3px;
}
</style>
