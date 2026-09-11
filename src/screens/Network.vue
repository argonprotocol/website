<template>
  <MainLayout>
    <div class="mt-5 md:mt-12 max-w-5xl mx-auto px-4 sm:px-6">

      <p v-if="chainName === NetworkName.mainnet" class="md:text-lg font-light font-serif leading-normal text-center">
        Mainnet is Argon's live production network. It went live on January 15, 2025, and it holds all the assets
        of the Argon ecosystem. <router-link to="/desktop-app">Download our simple desktop app</router-link> for
        the easiest way to manage mining and vaulting efforts.
      </p>
      <p v-else class="md:text-lg font-light font-serif leading-normal text-center">
        Testnet is meant for developing and testing new Argon features before deploying to the
        <router-link to="/mainnet">Mainnet</router-link>. This network was activated on January 7, 2025. The assets
        in this network hold zero value.
      </p>
    </div>

    <div class="mt-6 md:mt-12 w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-20">

      <div class="relative border-b-4 border-gray-500/20 flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 text-lg sm:text-xl font-serif pb-2 sm:pb-0">
        <div
          class="absolute left-0 h-1 top-full bg-argon-600/50 transition-[width,opacity] duration-1000 ease-linear"
          :class="isLastBlockProgressHidden ? 'opacity-0' : 'opacity-100'"
          :style="{ width: `${lastBlockProgressPct}%` }"
        />
        <div class="grow flex flex-row items-center justify-center sm:justify-start gap-x-2 text-center sm:text-left">
          <div NetworkStatusWrapper class="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0">
            <div NetworkStatus />
          </div>
          LIVE ON THE MAINNET
        </div>
        <div class="text-center sm:text-right text-sm sm:text-md opacity-70 italic">
          LAST BLOCK WAS MINED
          <CountupClock
            as="span"
            :time="lastBlockAt"
            v-slot="{ hours, minutes, seconds, isNull }"
            class="font-mono ml-1"
            @update:tick="onLastBlockTick"
          >
            <template v-if="hours">{{ hours }}h, </template>
            <template v-if="minutes || hours">{{ minutes }}m{{ !isNull && !hours ? ', ' : '' }}</template>
            <template v-if="!isNull && !hours">{{ seconds }}s <span class="font-serif">AGO</span></template>
            <template v-else-if="isNull">-- ----</template>
          </CountupClock>
        </div>
      </div>

      <div class="mt-3">
        <div StatWrapper class="min-h-20 mb-3 pb-7! pt-0! text-left px-6!">
          <table class="NetworkTable w-full -mt-2">
            <template v-for="network of networks">
              <thead>
                <tr>
                  <th colspan="4" class="text-left text-lg pt-7! opacity-50">{{ network.name }} Cross-Chain Integration</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="token of network.tokens" :key="token.address">
                  <tr>
                    <td ChainIcon><component :is="network.icon" /></td>
                    <td TokenName>
                      <div><strong>{{ token.name }} Ethereum Contract</strong> ({{ token.symbol }})</div>
                    </td>
                    <td AddressToCopy>
                      <CopyToClipboard :content="token.address">
                        <div class="flex min-w-0 flex-row items-center cursor-pointer">
                          <span class="min-w-0 font-mono lg:hidden">{{ shortenAddress(token.address) }}</span>
                          <span class="hidden min-w-0 font-mono lg:inline">{{ token.address }}</span>
                          <CopyIcon class="h-5 ml-2" />
                        </div>
                        <template #copying>
                          <div class="absolute top-0 left-0 w-full h-full flex min-w-0 flex-row items-center cursor-pointer">
                            <span class="min-w-0 font-mono lg:hidden">{{ shortenAddress(token.address) }}</span>
                            <span class="hidden min-w-0 font-mono lg:inline">{{ token.address }}</span>
                            <CopyIcon class="h-5 ml-2" />
                          </div>
                        </template>
                      </CopyToClipboard>
                    </td>
                    <td Links>
                      <div>
                        <a target="_blank" rel="noopener noreferrer" :href="`https://etherscan.io/token/${token.address}`">Etherscan</a>
                        <a v-if="token.coingecko" target="_blank" rel="noopener noreferrer" :href="token.coingecko">CoinGecko</a>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="token.pool" class="opacity-70">
                    <td ChainIcon style="border-top-style: hidden"></td>
                    <td TokenName>
                      <div>{{ token.pool.pair }} Uniswap V3 Pool ({{ token.pool.fee }})</div>
                    </td>
                    <td AddressToCopy>
                      <CopyToClipboard :content="token.pool.address">
                        <div class="flex min-w-0 flex-row items-center cursor-pointer">
                          <span class="min-w-0 font-mono lg:hidden">{{ shortenAddress(token.pool.address) }}</span>
                          <span class="hidden min-w-0 font-mono lg:inline">{{ token.pool.address }}</span>
                          <CopyIcon class="h-5 ml-2" />
                        </div>
                        <template #copying>
                          <div class="absolute top-0 left-0 w-full h-full flex min-w-0 flex-row items-center cursor-pointer">
                            <span class="min-w-0 font-mono lg:hidden">{{ shortenAddress(token.address) }}</span>
                            <span class="hidden min-w-0 font-mono lg:inline">{{ token.address }}</span>
                            <CopyIcon class="h-5 ml-2" />
                          </div>
                        </template>
                      </CopyToClipboard>
                    </td>
                    <td Links>
                      <div>
                        <a target="_blank" rel="noopener noreferrer" :href="`https://dexscreener.com/ethereum/${token.pool.address}`">DexScreener</a>
                        <a target="_blank" rel="noopener noreferrer" :href="`https://www.geckoterminal.com/eth/pools/${token.pool.address}`">GeckoTerminal</a>
                        <a target="_blank" rel="noopener noreferrer" :href="`https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${token.address}`">Uniswap</a>
                      </div>
                    </td>
                  </tr>
                </template>
                <tr v-if="!network.tokens.length">
                  <td ChainIcon><component :is="network.icon" /></td>
                  <td colspan="3">
                    <strong>Coming soon</strong>.
                    <span class="italic">In the meantime, any token on {{ network.name }} that purports to be Argon/Argonot
                    is a fraud.</span>
                  </td>
                </tr>

              </tbody>
            </template>
          </table>
          <p v-if="chainName === NetworkName.mainnet" class="mt-4 text-sm font-light opacity-70">
            Ethereum · Chain ID 1 · Always copy addresses from this page.
            Verified against
            <a
              class="underline hover:text-argon-700"
              href="https://github.com/argonprotocol/mainchain/blob/main/chains/ethereum/deploy/mainnet/deployment-manifest.json"
              target="_blank"
              rel="noopener noreferrer"
            >deployment-manifest.json</a>
            (generated 2026-06-10).
            USDC:
            <span class="font-mono">0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48</span>
          </p>
        </div>
        <div StatWrapper class="w-full flex flex-col h-full border-b border-slate-400/50">
          <span class="text-5xl! sm:text-5xl! md:text-6xl! ">${{ data.totalMarketValueUsd ? numeral(data.totalMarketValueUsd).format('0,0') : '---' }}</span>
          <label>Current Global Market Value of Network</label>
        </div>

        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full grow gap-3 sm:gap-x-3.5">

          <div StatWrapper class="col-span-1 xl:col-span-2 flex flex-col h-full border-b border-slate-400/50">
            <span class="text-5xl! sm:text-5xl! md:text-6xl! ">{{ data.miningAPR ? numeral(data.miningAPR).formatCapped('0,0.[0]', 9_999) : '---' }}%</span>
            <label>Current Mining APR</label>
          </div>

          <div StatWrapper class="col-span-1 xl:col-span-2 flex flex-col h-full border-b border-slate-400/50">
            <span class="text-5xl! sm:text-5xl! md:text-6xl! ">
              {{ data.vaultingAPR ? numeral(data.vaultingAPR).formatIfElseCapped('< 1_000', '0,0.[0]', '0,0', 9_999) : '---' }}%
            </span>
            <label>Current Vaulting APR</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span class="relative">
              ${{ data.usdTargetForArgon ? numeral(data.usdTargetForArgon).format('0,0.00') : '---.--' }}
            </span>
            <label>Price Per Argon</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>${{ data.usdForArgonot ? numeral(data.usdForArgonot).format('0,0.00') : '---.--' }}</span>
            <label>Price Per Argonot</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>
              {{ data.bitcoinAPR ? numeral(data.bitcoinAPR).formatIfElseCapped('< 1_000', '0,0.[0]', '0,0', 9_999) : '---' }}%
            </span>
            <label>Current Locked Bitcoin APR</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>
              {{ data.bondsAPR ? numeral(data.bondsAPR).formatIfElseCapped('< 1_000', '0,0.[0]', '0,0', 9_999) : '---' }}%
            </span>
            <label>Current Treasury Bond APR</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>{{ microgonsInCirculation ? microgonToArgonNm(microgonsInCirculation).format('0,0') : '---' }}</span>
            <label>Argons In Circulation</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>{{ micronotsInCirculation ? micronotToArgonotNm(micronotsInCirculation).format('0,0') : '---'}}</span>
            <label>Argonots In Circulation</label>
          </div>

          <div StatWrapper class="col-span-1 sm:col-span-2 flex flex-col h-full border-b border-slate-400/50">
            <span>{{ data.restabilizationLeverage || '---' }} <span class="text-xl font-semibold lg:text-2xl">TO</span> {{ data.restabilizationLeverage ? '1' : '--'}}</span>
            <label>Argon Restabilization <span class="hidden md:inline">Capacity</span></label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>
              ${{ data.mining.activeBidCostsUsd ? numeral(data.mining.activeBidCostsUsd).format('0,0.00') : '---' }}
            </span>
            <label>Cost of Mining Seats</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>
              ${{
                data.mining.activeBlockRewardsUsd ? numeral(data.mining.activeBlockRewardsUsd).format('0,0.00') : '---'
              }}
            </span>
            <label>Revenue from Mining Seats</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>{{ data.vaulting.bitcoinLocked ? numeral(data.vaulting.bitcoinLocked).format('0,0.[00000]') : '---' }}</span>
            <label>Bitcoin In Vaults</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span class="block md:hidden">${{ numeral(data.usdForBtc).format('0,0')}}</span>
            <span class="hidden md:block">${{ numeral(data.usdForBtc).format('0,0.00')}}</span>
            <label>Price Per Bitcoin</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>
              {{ currentBlockNumber ? numeral(currentBlockNumber).format('0,0') : '---' }}
            </span>
            <label>Mined Blocks</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>{{ data.vaulting.count ? data.vaulting.count : '---' }}</span>
            <label>Active Vaults</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>
              ${{ data.vaulting.valueInVaults ? numeral(data.vaulting.valueInVaults).format('0,0.00') : '---' }}
            </span>
            <label>Total Value In Vaults</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>{{ data.mining.activeSeatCount || '---' }}</span>
            <label>Active Mining Seats</label>
          </div>
        </div>

        <div v-if="networks.some(network => network.deprecated?.length)" StatWrapper class="mt-5 min-h-20 pb-7! pt-0! text-left px-6!">
          <table class="NetworkTable w-full">
            <template v-for="network of networks" :key="network.name">
              <tbody v-if="network.deprecated?.length">
                <tr>
                  <th colspan="4" class="text-left text-base pt-7! text-red-800/80">Deprecated Addresses (do not use)</th>
                </tr>
                <tr v-for="item of network.deprecated" :key="item.address">
                  <td ChainIcon><component :is="network.icon" /></td>
                  <td TokenName>
                    <div><strong>{{ item.symbol.replace('(old)', '') }} Ethereum Contract (old)</strong></div>
                    <div class="text-sm font-light opacity-70">{{ item.notes }}</div>
                  </td>
                  <td AddressToCopy>
                    <CopyToClipboard :content="item.address">
                      <div class="flex min-w-0 flex-row items-center">
                        <span class="min-w-0 font-mono lg:hidden">{{ shortenAddress(item.address) }}</span>
                        <span class="hidden min-w-0 font-mono lg:inline">{{ item.address }}</span>
                        <CopyIcon class="h-5 ml-2" />
                      </div>
                    </CopyToClipboard>
                  </td>
                  <td Links>
                    <div>
                      <a target="_blank" rel="noopener noreferrer" :href="`https://etherscan.io/address/${item.address}`">Etherscan</a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </table>
        </div>

        <p class="font-light mt-10">Documentation for connecting and using Argon's {{ titleize(chainName) }} can be <a href="https://github.com/argonprotocol/mainchain">found on our Github repo</a>.</p>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts">

</script>

<script setup lang="ts">
import * as Vue from 'vue';
import dayjs from "dayjs";
import numeral, { microgonToArgonNm, micronotToArgonotNm } from '@/lib/numeral';
import MainLayout from "@/navigation/MainLayout.vue";
import Data, { NetworkName } from "@/lib/Data";
import {defaultBasicsRecord, type IBasicsRecord} from "@/interfaces/IBasicsRecord";
import router from "@/router";
import CountupClock from "@/components/CountupClock.vue";
import EthereumIcon from '../assets/chains/ethereum.svg?component';
import SolanaIcon from '../assets/chains/solana.svg?component';
import BaseIcon from '../assets/chains/base.svg?component';
import CopyToClipboard from "@/components/CopyToClipboard.vue";
import CopyIcon from '../assets/copy.svg?component';

const chainName = Vue.ref<NetworkName>(extractChainName(router.currentRoute.value.path));
const data = Vue.ref<IBasicsRecord>(defaultBasicsRecord);

const lastBlockAt = Vue.ref(dayjs().startOf('minute'));
const lastBlockSecondsElapsed = Vue.ref(0);
const isLastBlockProgressHidden = Vue.ref(false);
let minuteTimeout: ReturnType<typeof setTimeout> | null = null;
let progressRevealTimeout: ReturnType<typeof setTimeout> | null = null;

const networks = [
  {
    name: 'Ethereum',
    icon: Vue.markRaw(EthereumIcon),
    tokens: [
      {
        name: 'Argon',
        symbol: 'ARGN',
        address: '0xf3D6b714dc93bc6C44bc766cc92F4A0D99344932',
        decimals: 18,
        coingecko: 'https://www.coingecko.com/en/coins/argon',
        pool: {
          pair: 'ARGN / USDC',
          version: 'Uniswap V3',
          fee: '0.05%',
          address: '0x05F3e1C9B15f93F2a5494B381b2Bb623796318D5',
        },
      },
      {
        name: 'Argonot',
        symbol: 'ARGNOT',
        address: '0x6B93a120829558C18f8CD54a96E8024EF973cE52',
        decimals: 18,
        coingecko: 'https://www.coingecko.com/en/coins/argonot',
        pool: {
          pair: 'ARGNOT / USDC',
          version: 'Uniswap V3',
          fee: '0.3%',
          address: '0xA867Bd045a2f3F4Bc597582e12447a6190740545',
        },
      },
    ],
    deprecated: [
      {
        symbol: 'ARGN (old)',
        address: '0x6A9143639D8b70D50b031fFaD55d4CC65EA55155',
        notes: 'Superseded. Empty / unusable Uniswap liquidity.',
      },
      {
        symbol: 'ARGNOT (old)',
        address: '0x64cbd3aa07d427e385cb55330406508718e55f01',
        notes: 'Superseded. Empty / unusable Uniswap liquidity.',
      },
    ],
  },
  {
    name: 'Solana',
    icon: Vue.markRaw(SolanaIcon),
    tokens: [],
  },
  {
    name: 'Base',
    icon: Vue.markRaw(BaseIcon),
    tokens: [],
  },
];

const minutesElapsed = Vue.computed(() => {
  const lastUpdatedAt = dayjs(data.value.lastUpdatedAt);
  if (!lastUpdatedAt.isValid()) {
    return 0;
  }

  const minutesSinceLastUpdate = lastBlockAt.value.diff(lastUpdatedAt.startOf('minute'), 'minute');
  return Math.max(minutesSinceLastUpdate, 0);
});

const microgonsInCirculation = Vue.computed(() => {
  return data.value.microgonsInCirculation.total + BigInt(minutesElapsed.value) * data.value.baseMicrogonsMinedPerBlock;
});

const micronotsInCirculation = Vue.computed(() => {
  return data.value.micronotsInCirculation + BigInt(minutesElapsed.value) * data.value.baseMicronotsMinedPerBlock;
});

const currentBlockNumber = Vue.computed(() => {
  return data.value.currentBlockNumber + minutesElapsed.value;
});

const lastBlockProgressPct = Vue.computed(() => {
  if (lastBlockSecondsElapsed.value >= 59) {
    return 100;
  }
  return Math.min(100, Math.max(0, (lastBlockSecondsElapsed.value / 60) * 100));
});

function onLastBlockTick({ seconds, isNull }: { seconds: number; isNull: boolean }) {
  lastBlockSecondsElapsed.value = isNull ? 0 : seconds;

  if (isNull) {
    isLastBlockProgressHidden.value = true;
    return;
  }

  if (seconds >= 59) {
    isLastBlockProgressHidden.value = true;
    return;
  }

  if (isLastBlockProgressHidden.value && seconds <= 1) {
    if (!progressRevealTimeout) {
      progressRevealTimeout = setTimeout(() => {
        isLastBlockProgressHidden.value = false;
        progressRevealTimeout = null;
      }, 1000);
    }
    return;
  }

  if (progressRevealTimeout) {
    clearTimeout(progressRevealTimeout);
    progressRevealTimeout = null;
  }
  isLastBlockProgressHidden.value = false;
}

function scheduleMinuteReset() {
  const now = Date.now();
  const msToNextMinute = 60000 - (now % 60000);
  if (minuteTimeout) {
    clearTimeout(minuteTimeout);
  }
  minuteTimeout = setTimeout(() => {
    lastBlockAt.value = dayjs().startOf('minute');
    scheduleMinuteReset();
  }, msToNextMinute);
}

function extractChainName(str: string): NetworkName {
  return str.toLowerCase().replace('/', '') as NetworkName;
}

function titleize(str: string): string {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

function shortenAddress(address: string): string {
  if (address.length <= 11) {
    return address;
  }
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

async function loadData() {
  data.value = await Data.fetchBasics();
}

Vue.watch(() => router.currentRoute, async () => {
  chainName.value = extractChainName(router.currentRoute.value.path);
  await loadData();
}, { deep: true });

Vue.onMounted(async () => {
  lastBlockAt.value = dayjs().startOf('minute');
  scheduleMinuteReset();
  await loadData();
});

Vue.onUnmounted(() => {
  if (minuteTimeout) {
    clearTimeout(minuteTimeout);
  }
  if (progressRevealTimeout) {
    clearTimeout(progressRevealTimeout);
  }
});
</script>

<style scoped>
@import '../main.css';

[StatWrapper] {
  @apply flex flex-col items-center justify-center min-w-0 text-slate-800/70 px-3 py-6 sm:py-8 lg:py-10 xl:py-12 bg-white/70 border border-slate-500/20 rounded shadow-md;
  & > span {
    @apply max-w-full text-center text-3xl sm:text-4xl font-bold leading-none break-words;
  }
  label {
    @apply mt-2 px-2 text-center text-sm sm:text-base font-light leading-snug;
  }
}

[NetworkStatusWrapper] {
  @apply relative;
  [NetworkStatus] {
    @apply rounded-full border w-full h-full;
    background-color: oklch(0.55 0.28 320);
    border-color: rgba(0, 0, 0, 0.9);
    animation: pulse-network-status 1.5s ease-in-out infinite;
    transform-origin: center bottom;
    position: relative;

    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  &::after {
    @apply absolute w-full h-full;
    content: '';
    top: 50%;
    left: 50%;
    /* keep size fixed; center once */
    width: 100%;
    height: 100%;
    border: 2px solid oklch(0.48 0.24 320);
    border-radius: 50%;

    /* animate scale instead of width/height */
    transform: translate(-50%, -50%) scale(1);
    transform-origin: center;

    animation: ripple-network-status 2s ease-in-out infinite;
    opacity: 0;

    /* force stable compositing on iOS Safari */
    will-change: transform, opacity;
    -webkit-transform: translate(-50%, -50%) translateZ(0) scale(1);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
}

td, th {
  @apply border-b border-slate-400/30;
}
th {
  @apply pb-2;
}
td {
  @apply py-3;
}
td[ChainIcon] {
  @apply pr-2;
  svg {
    @apply w-4;
  }
}
td[TokenName] {
  @apply w-full;
  strong {
    @apply font-bold;
  }
}
td[AddressToCopy] {
  @apply pr-3;
}
td[Links] {
  @apply align-middle;
  > div {
    @apply flex flex-row flex-wrap items-center justify-start gap-1.5 sm:flex-nowrap;
  }
  a {
    @apply bg-slate-600/60 text-white rounded-full no-underline px-3 py-0.5 hover:bg-argon-600/60 hover:text-white;
  }
}

@media (max-width: 639px) {
  .NetworkTable,
  .NetworkTable thead,
  .NetworkTable tbody,
  .NetworkTable tr,
  .NetworkTable th,
  .NetworkTable td {
    @apply block w-full;
  }

  .NetworkTable {
    @apply border-separate border-spacing-y-3;
  }

  .NetworkTable thead tr {
    @apply px-1 pt-2;
  }

  .NetworkTable tbody tr {
    @apply grid grid-cols-[auto_1fr] items-start gap-x-3 rounded-md border border-slate-400/30 bg-white/60 p-3;
  }

  .NetworkTable th,
  .NetworkTable td {
    @apply border-b-0;
  }

  .NetworkTable th {
    @apply pb-0;
  }

  .NetworkTable td {
    @apply py-0;
  }

  td[ChainIcon] {
    @apply pr-0 pt-1;
  }

  td[TokenName] {
    @apply w-auto;
  }

  td[AddressToCopy],
  td[Links] {
    @apply col-span-2 mt-3 pr-0;
  }

  td[Links] > div {
    @apply justify-start;
  }

  td:not([ChainIcon]):not([TokenName]):not([AddressToCopy]):not([Links]) {
    @apply col-start-2;
  }
}

</style>
