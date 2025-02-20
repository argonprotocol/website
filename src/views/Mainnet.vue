<template>
  <main class="relative flex flex-col items-center text-center min-h-screen pb-10 md:pb-32">

    <div class="pr-3 md:pr-5 w-full whitespace-nowrap text-sm mb-2 md:text-base text-white flex flex-row justify-end gap-2 md:gap-4 cursor-default">
      <div class="absolute left-3 top-3 md:left-5 md:top-4 hover:opacity-100 cursor-pointer flex flex-row gap-2" @click="$router.push('/')">
        <Logo class="w-7 md:w-9" />
        <span class="text-2xl font-bold text-white/80 md:ml-1 relative top-[1px]">
          Argon
          <span class="font-light opacity-80 hidden md:inline"><span class="opacity-60">(</span>Crypto's First Stable Asset<span class="opacity-60">)</span></span>
        </span>
      </div>
      
      <ChainStatus class="mt-[10px] md:mt-0" />
    </div>
    
    <div class="LINE LINE2"></div>

    <div class="relative w-full mt-3">
      <Map ref="mapRef" class="w-full h-full block mx-auto text-white opacity-50" />
      <div class="absolute left-0 top-0 w-full h-full overflow-hidden">
        <div class="absolute" :style="{ left: `${blockBubble.left}px`, top: `${blockBubble.top}px`, width: `${blockBubble.width}px`, height: `${blockBubble.height}px`}">
          <div class="absolute left-full top-1/2 -translate-x-2 -translate-y-1/2 bg-[#E8C1ED] border border-black shadow rounded-sm whitespace-nowrap pl-3 pr-2 py-1 opacity-90">
            Block #{{blockBubble.number}}
          </div>
          <div class="relative w-full h-full bg-[#E8C1ED] border border-black shadow rounded-full"></div>
        </div>
      </div>
    </div>

    <div Clock class="relative w-10/12 md:w-8/12 bg-black/20 border border-white/30 rounded-lg p-4 text-white md:-mt-16 z-10">
      <div class="text-xl md:text-3xl font-light pt-4 md:pt-8">ARGON'S BOOTSTRAPPING PHASE ENDS IN</div>
      <vue-countdown CountdownClock :time="millisecondsUntilLaunch" v-slot="{ days, hours, minutes, seconds }">
        <div class="flex flex-row w-full justify-around py-4 md:py-10 px-2 md:px-8">
          <ul class="flex flex-col items-center">
            <li>{{ days }}</li>
            <li>DAYS</li>
          </ul>
          <div>:</div>
          <ul class="flex flex-col items-center">
            <li>{{ hours }}</li>
            <li>HOURS</li>
          </ul>
          <div>:</div>
          <ul class="flex flex-col items-center">
            <li>{{ minutes }}</li>
            <li>MINUTES</li>
          </ul>
          <div>:</div>
          <ul class="flex flex-col items-center">
            <li>{{ seconds }}</li>
            <li>SECONDS</li>
          </ul>
        </div>
      </vue-countdown>
    </div>

    <div class="text-white/70 w-min">
      <h1 class="LOGO-TEXT text-white text-3xl md:text-5xl uppercase font-bold mb-4 mt-10 md:mt-20 md:whitespace-nowrap">
        Full Launch Begins <span class="block md:inline font-bold">February 20, 2025</span>
      </h1>
    
      <p class="text-lg md:text-2xl leading-8 md:leading-10 text-justify uppercase px-5 md:px-0">
        Argon uses a novel proof-of-work blockchain that forces efficiency through mining auctions and two-step commit-reveal. Since the network provides zero grants in the genesis block, there are no tokens to kick-start the bidding process. The network solves this by bootstrapping itself into existence through an open proof-of-work compute phase that lasts ten days. Argon is currently in this phase.
      </p>

      <p class="text-lg md:text-2xl leading-8 md:leading-10 mt-5 text-justify uppercase px-5 md:px-0">
        Anyone can participate in the bootstrapping process and collect Argons and Argonots using standard compute resources. The algorithm is ASIC-resistant, which means everyone can participate without the need for specialized hardware.
      </p>

      <h1 class="LOGO-TEXT text-white text-left text-3xl md:text-5xl uppercase font-bold mb-4 mt-20 whitespace-nowrap">
        JOIN THE BOOTSTRAP
      </h1>

      <div class="text-white mt-10 mx-auto text-left font-extralight leading-9 flex flex-col gap-10">
        <div class="LINE LINE2"></div>
        <p v-if="countryCode === 'LOADING'" class="text-center mt-10 opacity-50 text-xl">Loading...</p>
        <div v-else-if="['US', 'GB'].includes(countryCode)">
          <div class="flex flex-row mb-10">
            <div class="px-20 bg-black/20 flex align-middle mr-10">
              <AlertIcon class="w-40 inline-block" />
            </div>
            <div class="text-3xl font-medium opacity-70 pr-20 leading-[50px]">
              Uh oh! Due to 
              <template v-if="countryCode === 'US'">
                unclear crypto regulations within the United States, 
              </template>
              <template v-else-if="countryCode === 'GB'">
                some issues with crypto regulations within the United Kingdom, 
              </template>
              we have been advised to block all IP addresses originating from your country.
            </div>
          </div>
          <div class="LINE LINE2"></div>
          <div class="text-xl opacity-80 mt-10 text-left pr-10">Please continue checking back in with us. We hope to bring the innovation of Argon to the United States as soon as possible. </div>
        </div>
        <div v-else class="px-48">
          <p class="text-xl opacity-80 font-light">Below are a few of the many ways to participate in Argon's Mainnet, along with links to related documentation:</p>

          <div class="mt-8">
            <div class="text-xl font-bold pb-2">Run a Mining Rig</div>
            <div class="text-xl opacity-80 font-light">Earn block rewards of both argons and argonots by participate in the mining operations of the network.</div>
            <ul class="border-t border-dashed border-white/30 pt-3 mt-3">
              <li class="text-xl font-light border-b border-dashed border-white/30 pb-3">
                <span class="opacity-60 mr-2">-></span>
                <a href="https://github.com/argonprotocol/mainchain/blob/main/docs/run-a-miner.md" class="opacity-80 hover:opacity-100">Step-by-Step for how to become a miner</a>
              </li>
            </ul>
          </div>

          <div class="mt-8">
            <div class="text-xl font-bold pb-2">Manage a Stabilization Vault</div>
            <div class="text-xl opacity-80 font-light">Generate revenue by Liquid Locking Bitcoins and by creating and loaning Bonded Argons to miners.</div>
            <ul class="border-t border-dashed border-white/30 pt-3 mt-3">
              <li class="text-xl font-light border-b border-dashed border-white/30 pb-3">
                <span class="opacity-60 mr-2">-></span>
                <a href="https://github.com/argonprotocol/mainchain/blob/main/docs/running-a-vault.md" class="opacity-80 hover:opacity-100">How to create and manage a Vault using the Argon Bitcoin CLI</a>
              </li>
            </ul>
          </div>

          <div class="mt-8">
            <div class="text-xl font-bold pb-2">Send and Receive Payments</div>
            <div class="text-xl opacity-80 font-light">Argon uses a novel peer-to-peer architecture that makes settling global payments (and micropayments) incredibly fast and inexpensive.</div>
            <ul class="border-t border-dashed border-white/30 pt-3 mt-3">
              <li class="text-xl font-light border-b border-dashed border-white/30 pb-3">
                <span class="opacity-60 mr-2">-></span>
                <a href="https://github.com/argonprotocol/mainchain/blob/main/docs/account-setup.md" class="opacity-80 hover:opacity-100">How to set up an Account</a>
              </li>
              <li class="text-xl font-light border-b border-dashed border-white/30 pb-3">
                <span class="opacity-60 mr-2">-></span>
                <a href="https://github.com/argonprotocol/mainchain/blob/main/docs/localchain.md#command-line-interface" class="opacity-80 hover:opacity-100">How to use the Argon Localchain CLI</a>
              </li>
            </ul>
          </div>

          <div class="mt-8">
            <div class="text-xl font-bold pb-2">Trade Argons and Argonots</div>
            <div class="border-t border-b border-dashed border-white/30 py-3 text-xl font-light italic">
              <span class="opacity-60">Documentation and URLs for the Uniswap markets launching before January 25, 2025.</span>
            </div>
          </div>

        </div>
      </div>
    </div>

  </main>
  <FooterBar />
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import FooterBar from '../components/FooterBar.vue';
import ChainStatus from '../components/ChainStatus.vue';
import Logo from '../assets/logo.svg';
import Map from '../assets/map.svg?skipsvgo';
import { ApiPromise, WsProvider } from '@polkadot/api';
import VueCountdown from '@chenfengyuan/vue-countdown';

dayjs.extend(utc);

const launchDate = dayjs.utc('2025-02-20 17:00:00');
const millisecondsUntilLaunch = launchDate.valueOf() - Date.now();

const countryCode = Vue.ref('LOADING');
const mapRef = Vue.ref(null);
const blockBubble = Vue.ref({
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  number: 0,
});

function showBlock(blockNumber: number) {
  const map = mapRef.value as any;
  if (!map) return;

  const svg = map.$el;
  const svgRect = svg.getBoundingClientRect();
  const scaleX = svgRect.width / svg.viewBox.baseVal.width;
  const scaleY = svgRect.height / svg.viewBox.baseVal.height;

  const paths = svg.querySelectorAll('path');
  const randomIndex = Math.floor(Math.random() * paths.length);
  const path = paths[randomIndex];
  const bbox = path.getBBox();

  blockBubble.value.width = (bbox.width * scaleX) + 30;
  blockBubble.value.height = (bbox.height * scaleY) + 30;
  blockBubble.value.left = (bbox.x * scaleX) - 15;
  blockBubble.value.top = (bbox.y * scaleY) - 15;
  blockBubble.value.number = blockNumber;
}

let unsubscribe: any;

Vue.onMounted(async () => {
  showBlock(5);
  countryCode.value = await (window as any).geotargetlyCountryCode;
  const wsProvider = new WsProvider('wss://rpc.argon.network');
  const api = await ApiPromise.create({ provider: wsProvider });
  unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => showBlock(header.number as any));
});

Vue.onBeforeUnmount(() => {
  unsubscribe();
});

</script>

<style scoped>
[CountdownClock] {
  div > div {
    @apply text-xl md:text-8xl font-normal opacity-50 md:-mt-2;
  }
  ul li:first-child {
    @apply text-3xl md:text-8xl font-bold;
  }
  ul li:last-child {
    @apply text-sm md:text-xl font-light;
  }
}

.LOGO-TEXT {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.LINE {
  position: relative;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0.3) 90%,  rgba(0, 0, 0, 0) 100%);
  &:after {
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -1px;
    left: 0;
    content: '';
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 10%, rgba(255, 255, 255, 0.2) 90%, rgba(255, 255, 255, 0) 100%);  }
}

.LINE1 {
  top: 0;
}
</style>