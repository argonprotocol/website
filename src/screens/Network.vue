<template>
  <MainLayout>
    <div class="mt-14 w-8/12 mx-auto">
      <h1 class="pulse-network-header text-7xl uppercase my-10 leading-12 pb-6 text-center font-bold text-slate-700">
        Argon's {{ chainName === NetworkName.mainnet ? 'Mainnet' : 'Testnet' }} Is Live
      </h1>

      <p v-if="chainName === NetworkName.mainnet" class="mb-10 text-lg font-light">
        Mainnet is Argon's live production network. It went live on January 15, 2025, and it holds all the assets
        of the Argon ecosystem. <router-link to="/start">Download our simple desktop app</router-link> for
        the easiest way to manage mining and vaulting efforts.
      </p>
      <p v-else class="mb-10 text-lg font-light">
        Testnet is meant for developing and testing new Argon features before deploying to the
        <router-link to="/mainnet">Mainnet</router-link>. This testing network went live on January 7, 2025. The assets
        this network are meant to hold zero value.
      </p>

      <div class="border border-gray-300 rounded-md p-8">
        <div class="font-mono text-center">LAST BLOCK 59 SECONDS AGO</div>
      </div>

      <div class="mt-10">

        <div class="flex w-full grow flex-col space-y-5">
          <div class="flex h-1/4 w-full flex-row gap-x-4">
            <div StatWrapper class="flex h-full w-1/3 flex-col border-b border-slate-400/50">
              <span>$0.00</span>
              <label>Price Per Argonot</label>
            </div>
            <div class="h-full w-[1px] bg-slate-400/50"></div>
            <div StatWrapper class="flex h-full w-1/3 flex-col border-b border-slate-400/50">
              <span class="relative">
                $1.00 ->
                <span>
                  $0.00
                </span>
              </span>
              <label>ARGN-to-USD Exchange Rate</label>
            </div>
            <div class="h-full w-[1px] bg-slate-400/50"></div>

            <div StatWrapper class="flex h-full w-1/3 flex-col border-b border-slate-400/50">
              <span>$0.00</span>
              <label>Price Per Bitcoin</label>
            </div>
          </div>

          <div class="flex h-1/4 w-full flex-row gap-x-4">
            <div StatWrapper class="flex h-full w-1/3 flex-col border-b border-slate-400/50">
              <span>{{ microgonToArgonNm(data.microgonsInCirculation).format('0,0')}}</span>
              <label>Argons In Circulation</label>
            </div>
            <div class="h-full w-[1px] bg-slate-400/50"></div>
            <div StatWrapper class="flex h-full w-1/3 flex-col border-b border-slate-400/50">
              <span>{{ micronotToArgonotNm(data.micronotsInCirculation).format('0,0')}}</span>
              <label>Argonots In Circulation</label>
            </div>
            <div class="h-full w-[1px] bg-slate-400/50"></div>
            <div StatWrapper class="flex h-full w-1/3 flex-col border-b border-slate-400/50">
              <span>$0.00</span>
              <label>BTC-to-Argon Short Value</label>
            </div>
          </div>

          <div class="flex h-1/4 w-full flex-row gap-x-4">
            <div StatWrapper class="flex h-full w-1/4 flex-col border-b border-slate-400/50">
              <span>100</span>
              <label>Mining Seats</label>
            </div>
            <div class="h-full w-[1.05px] bg-slate-400/50"></div>

            <div StatWrapper class="flex h-full w-1/4 flex-col border-b border-slate-400/50">
              <span>
                $0.00
              </span>
              <label>Active Seat Cost</label>
            </div>
            <div class="h-full w-[1px] bg-slate-400/50"></div>

            <div StatWrapper class="flex h-full w-1/4 flex-col border-b border-slate-400/50">
              <span>
                $0.00
              </span>
              <label>Active Seat Rewards</label>
            </div>
            <div class="h-full w-[1.05px] bg-slate-400/50"></div>

            <div StatWrapper class="flex h-full w-1/4 flex-col border-b border-slate-400/50">
              <span>0.0%</span>
              <label>Average Mining APY</label>
            </div>
          </div>

          <div class="flex h-1/4 w-full flex-row gap-x-4">
            <div StatWrapper class="flex h-full w-1/4 flex-col">
              <span>11</span>
              <label>Active Vaults</label>
            </div>
            <div class="h-full w-[1.05px] bg-slate-400/50"></div>

            <div StatWrapper class="flex h-full w-1/4 flex-col">
              <span>0.3824</span>
              <label>Bitcoin In Vaults</label>
            </div>
            <div class="h-full w-[1px] bg-slate-400/50"></div>

            <div StatWrapper class="flex h-full w-1/4 flex-col">
              <span>
                $0.00
              </span>
              <label>Total Value In Vaults</label>
            </div>
            <div class="h-full w-[1.05px] bg-slate-400/50"></div>

            <div StatWrapper class="flex h-full w-1/4 flex-col">
          <span>
            0.0%
          </span>
              <label>Average Vault APY</label>
            </div>
          </div>
        </div>

      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts">

</script>

<script setup lang="ts">
import * as Vue from 'vue';
import numeral, { microgonToArgonNm, micronotToArgonotNm } from '@/lib/numeral';
import MainLayout from "@/navigation/MainLayout.vue";
import Data, { NetworkName } from "@/lib/Data";
import type IBasicsRecord from "@/interfaces/IBasicsRecord";
import router from "@/router";

const chainName = Vue.ref<NetworkName>(extractChainName(router.currentRoute.value.path));
const data = Vue.ref<IBasicsRecord>({
  lastUpdatedAt: '',
  microgonsInCirculation: 0n,
  micronotsInCirculation: 0n,
  usdForArgon: 0n,
});

function extractChainName(str: string): NetworkName {
  return str.toLowerCase().replace('/', '') as NetworkName;
}

async function loadData() {
  data.value = await Data.fetchBasics(chainName.value);
}

Vue.watch(router.currentRoute, async () => {
  chainName.value = extractChainName(router.currentRoute.value.path);
  await loadData();
});

Vue.onMounted(async () => {
  await loadData();
});
</script>

<style scoped>
@import "../main.css";

[StatWrapper] {
  @apply flex flex-col items-center justify-center text-slate-800/70 py-7;
  & > span {
    @apply text-4xl font-bold;
  }
  label {
    @apply mt-1 font-light;
  }
}
</style>