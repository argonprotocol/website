<template>
  <MainLayout>
    <div class="mt-10 md:mt-24 md:w-8/12 mx-auto px-4">
      <h1 class="text-2xl pulse-item uppercase mb-2 md:text-center font-bold text-argon-700/80">
        <span v-if="chainName === NetworkName.mainnet" class="md:text-[4.25rem]">
          Argon's Mainnet Is Live!
        </span>
        <span v-else class="md:text-[4rem] pt-2">
          Argon's Testnet
        </span>
      </h1>

      <p v-if="chainName === NetworkName.mainnet" class="mb-10 md:text-lg font-light">
        Mainnet is Argon's live production network. It went live on January 15, 2025, and it holds all the assets
        of the Argon ecosystem. <router-link to="/start">Download our simple desktop app</router-link> for
        the easiest way to manage mining and vaulting efforts.
      </p>
      <p v-else class="mb-10 md:text-lg font-light">
        Testnet is meant for developing and testing new Argon features before deploying to the
        <router-link to="/mainnet">Mainnet</router-link>. This network was activated on January 7, 2025. The assets
        in this network hold zero value.
      </p>

      <div class="border border-gray-300 rounded-md p-8 font-mono text-center">
        LAST BLOCK WAS MINED
        <CountupClock as="span" :time="lastBlockAt" v-slot="{ hours, minutes, seconds, isNull }" class="font-mono">
          <template v-if="hours">{{ hours }}h, </template>
          <template v-if="minutes || hours">{{ minutes }}m{{ !isNull && !hours ? ', ' : '' }}</template>
          <template v-if="!isNull && !hours">{{ seconds }}s AGO</template>
          <template v-else-if="isNull">-- ----</template>
        </CountupClock>
      </div>

      <div class="mt-2">
        <div class="grid grid-cols-2 md:grid-cols-3 w-full grow space-y-5 gap-x-4">

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span class="relative">
              ${{ numeral(data.usdForArgon).format('0,0.00')}}
            </span>
            <label>Price Per Argon</label>
          </div>

<!--            <div class="h-full w-[1px] bg-slate-400/50"></div>-->

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>${{ numeral(data.usdForArgonot).format('0,0.00')}}</span>
            <label>Price Per Argonot</label>
          </div>

<!--          <div class="h-full w-[1px] bg-slate-400/50"></div>-->

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span class="block md:hidden">${{ numeral(data.usdForBtc).format('0,0')}}</span>
            <span class="hidden md:block">${{ numeral(data.usdForBtc).format('0,0.00')}}</span>
            <label>Price Per Bitcoin</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>{{ microgonToArgonNm(data.microgonsInCirculation).format('0,0')}}</span>
            <label>Argon Circulation</label>
          </div>

<!--            <div class="h-full w-[1px] bg-slate-400/50"></div>-->

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>{{ micronotToArgonotNm(data.micronotsInCirculation).format('0,0')}}</span>
            <label>Argonot Circulation</label>
          </div>

<!--            <div class="h-full w-[1px] bg-slate-400/50"></div>-->

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>{{ numeral(data.vaulting.argonBurnCapability).format('0,0')}}</span>
            <label>Argon Burn <span class="hidden md:inline">Potential</span> From Bitcoin</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>{{ data.mining.activeSeatCount }}</span>
            <label>Mining Seats</label>
          </div>

<!--            <div class="h-full w-[1.05px] bg-slate-400/50"></div>-->

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>
              ${{  numeral(data.mining.aggregatedBidCosts).format('0,0.00') }}
            </span>
            <label>Active Seat Cost</label>
          </div>

<!--          <div class="h-full w-[1px] bg-slate-400/50"></div>-->

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>
              ${{  numeral(data.mining.aggregatedBlockRewards).format('0,0.00') }}
            </span>
            <label>Active Seat Rewards</label>
          </div>

<!--          <div class="h-full w-[1.05px] bg-slate-400/50"></div>-->

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>{{ numeral(data.mining.averageAPY).formatCapped('0,0', 9_999) }}%</span>
            <label>Average Mining APY</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>{{ data.vaulting.count }}</span>
            <label>Active Vaults</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>
              ${{  numeral(data.vaulting.valueInVaults).format('0,0.00') }}
            </span>
            <label>Total Value In Vaults</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>{{ data.vaulting.bitcoinLocked }}</span>
            <label>Bitcoin In Vaults</label>
          </div>

          <div StatWrapper class="flex flex-col h-full border-b border-slate-400/50">
            <span>
              {{ numeral(data.vaulting.averageAPY).formatCapped('0,0', 9_999) }}%
            </span>
            <label>Average Vault APY</label>
          </div>

          <div StatWrapper class="!hidden md:block h-full border-b border-slate-400/50" />
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
import utc from 'dayjs/plugin/utc';
import numeral, { microgonToArgonNm, micronotToArgonotNm } from '@/lib/numeral';
import MainLayout from "@/navigation/MainLayout.vue";
import Data, { NetworkName } from "@/lib/Data";
import {defaultBasicsRecord, type IBasicsRecord} from "@/interfaces/IBasicsRecord";
import router from "@/router";
import CountupClock from "@/components/CountupClock.vue";

dayjs.extend(utc);

const chainName = Vue.ref<NetworkName>(extractChainName(router.currentRoute.value.path));
const data = Vue.ref<IBasicsRecord>(defaultBasicsRecord);

const lastBlockAt = Vue.computed(() => {
  return dayjs.utc();
});

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
  await loadData();
});
</script>

<style scoped>
@import '../main.css';

[StatWrapper] {
  @apply flex flex-col items-center justify-center text-slate-800/70 py-12;
  & > span {
    @apply text-3xl md:text-4xl font-bold whitespace-nowrap;
  }
  label {
    @apply mt-1 font-light;
  }
}
</style>