<template>
  <MainLayout>
    <div class="mt-5 md:mt-12 max-w-5xl mx-auto px-4 sm:px-6">

      <p v-if="chainName === NetworkName.mainnet" class="md:text-lg font-light font-serif leading-normal text-center">
        Mainnet is Argon's live production network. It went live on January 15, 2025, and it holds all the assets
        of the Argon ecosystem. <router-link to="/apps">Download our simple desktop app</router-link> for
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
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full grow gap-3 sm:gap-x-3.5">

          <div StatWrapper class="col-span-1 xl:col-span-2 flex flex-col h-full border-b border-slate-400/50">
            <span class="text-5xl! sm:text-6xl! md:text-7xl! text-argon-600">{{ data.miningAPR ? numeral(data.miningAPR).formatCapped('0,0', 9_999) : '---' }}%</span>
            <label>Current Mining APR</label>
          </div>

          <div StatWrapper class="col-span-1 xl:col-span-2 flex flex-col h-full border-b border-slate-400/50">
            <span class="text-5xl! sm:text-6xl! md:text-7xl! text-argon-600">
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
            <span>{{ data.vaulting.argonBurnCapacity ? numeral(data.vaulting.argonBurnCapacity).format('0,0'): '---' }}</span>
            <label>Argon Restabilization <span class="hidden md:inline">Capacity</span></label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>
              ${{ data.mining.activeBidCosts ? numeral(data.mining.activeBidCosts).format('0,0.00') : '---' }}
            </span>
            <label>Cost of Mining Seats</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>
              ${{ data.mining.activeBlockRewards ? numeral(data.mining.activeBlockRewards).format('0,0.00') : '---' }}
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

        <p class="font-light mt-10 text-center">Documentation for connecting and using Argon's {{ titleize(chainName) }} can be <a href="https://github.com/argonprotocol/mainchain">found on our Github repo</a>.</p>
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

const chainName = Vue.ref<NetworkName>(extractChainName(router.currentRoute.value.path));
const data = Vue.ref<IBasicsRecord>(defaultBasicsRecord);

const lastBlockAt = Vue.ref(dayjs().startOf('minute'));
const lastBlockSecondsElapsed = Vue.ref(0);
const isLastBlockProgressHidden = Vue.ref(false);
let minuteTimeout: ReturnType<typeof setTimeout> | null = null;
let progressRevealTimeout: ReturnType<typeof setTimeout> | null = null;

const minutesElapsed = Vue.computed(() => {
  const lastUpdatedAt = dayjs(data.value.lastUpdatedAt);
  if (!lastUpdatedAt.isValid()) {
    return 0;
  }

  const minutesSinceLastUpdate = lastBlockAt.value.diff(lastUpdatedAt.startOf('minute'), 'minute');
  return Math.max(minutesSinceLastUpdate, 0);
});

const microgonsInCirculation = Vue.computed(() => {
  return data.value.microgonsInCirculation + BigInt(minutesElapsed.value) * data.value.baseMicrogonsMinedPerBlock;
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

async function loadData() {
  data.value = await Data.fetchBasics(chainName.value);
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
</style>
