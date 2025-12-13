<template>
  <div class="Home Screen">
    <TopBar class="relative z-10" :darkMode="true" />

    <main class=" flex flex-col items-center text-center min-h-screen relative border-b border-argon-800">

      <h1 to="/learn/four-pillars"
        class="text-white/80 text-shadow-md text-shadow-argon-800 text-3xl md:text-8xl uppercase mt-20 md:mt-40 font-black hover:text-white/90"
      >
        <div class="inline lg:block lg:my-5">THE STABLECOIN </div>
        <div class="inline lg:block lg:my-5">BUILT TO LAST FOR A </div>
        <div class="inline lg:block lg:my-5">THOUSAND YEARS </div>
      </h1>
      
      <div class="relative w-full h-56 -mb-20 hidden md:block">
        <div class="DIVIDER-VERTICAL !h-full !absolute top-0 left-[37.5%] translate-x-1/2"></div>
        <div class="DIVIDER-VERTICAL !h-1/2 !absolute top-0 left-1/2 -translate-x-1/2"></div>
        <div class="DIVIDER-VERTICAL !h-full !absolute top-0 !left-auto right-[37.5%] translate-x-1/2"></div>
      </div>
      
      <div class="pointer-events-none relative md:grid grid-cols-2 items-center text-center gap-x-4 space-y-8 text-white/75 argon-dark-text-shadow pt-10 md:pt-24 pb-10 w-10/12">
        
        <div class="flex flex-row justify-start text-left md:pr-[110px]">
          <div class="relative block items-star group hover:text-white" to="/learn/four-pillars/resistant-to-inflation">
            <div class="absolute -top-3 -left-3 right-1 -bottom-3 bg-black/30 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
            <header class="flex flex-row items-center text-xl font-black mb-1 relative">
              <span class="relative z-10 whitespace-nowrap pr-3">Resistant to Inflation</span>
              <div class="hidden md:block grow h-px bg-black/60 group-hover:invisible" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)" />
            </header>
            <div class="text-xl font-light relative w-fit inline-block cursor-pointer md:pr-7">
              <span>Argon allows you to build wealth without </span>
              <span class="lg:block mt-px">worrying about the cost of time eroding it<span class="inline md:hidden">. <strong class="hidden font-bold">Learn more</strong>.</span></span>
            </div>
          </div>
          <div class="grow hidden md:block">
            <div class="text-xl font-black relative z-10">
              &nbsp;
              <div class="absolute bg-black/60 top-1/2 -translate-y-1/2 left-0 w-full h-px" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)"></div>
            </div>
          </div>
        </div>

        <div class="flex flex-row justify-start text-left md:text-right md:pl-[110px]">
          <div class="grow hidden md:block">
            <div class="text-xl font-black relative z-10">
              &nbsp;
              <div class="absolute bg-black/60 top-1/2 -translate-y-1/2 right-0 w-full h-px" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)"></div>
            </div>
          </div>
          <div class="relative block items-star group hover:text-white" to="/learn/four-pillars/indifferent-to-catastrophe">
            <div class="hidden md:block absolute -top-3 -right-3 left-1 -bottom-3 bg-black/30 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
            <header class="flex flex-row items-center text-xl font-black mb-1 relative">
              <div class="hidden md:block grow h-px bg-black/60 group-hover:invisible" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)" />
              <span class="relative z-10 whitespace-nowrap md:pl-3">Indifferent to Catastrophe</span>
            </header>
            <div class="text-xl font-light relative w-fit inline-block cursor-pointer md:pl-7">
              <span>Argon works regardless of banking </span>
              <span class="lg:block mt-px">collapses or government bond failures<span class="inline md:hidden">. <strong class="hidden font-bold">Learn more</strong>.</span></span>
            </div>
          </div>
        </div>

        <div class="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[-90%] w-[80px] md:w-[220px] z-20">
          <LogoSkinny class="w-full text-white/70" />
          <div class="absolute left-1/2 top-[97%] translate-y-4 w-px h-[90%] bg-black/60" style="box-shadow: 1px 0 0 rgba(255,255,255,0.25)" />
        </div>
        
        <div class="flex flex-row justify-start text-left md:pr-[30px]">
          <div class="relative block items-star group hover:text-white" to="/learn/four-pillars/intrinsic-price-stabilization">
            <div class="absolute -top-3 -left-3 right-1 -bottom-3 bg-black/30 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
            <header class="flex flex-row items-center text-xl font-black mb-1 relative">
              <span class="relative z-10 whitespace-nowrap pr-3">Intrinsic Price Stabilization</span>
              <div class="hidden md:block grow h-px bg-black/60 group-hover:invisible" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)" />
            </header>
            <div class="text-xl font-light relative w-fit inline-block cursor-pointer pr-7">
              <span>Argon creates economic balance between the </span>
              <span class="lg:block mt-px">growth of currency and long-term durability<span class="inline md:hidden">. <strong class="hidden font-bold">Learn more</strong>.</span></span>
            </div>
          </div>
          <div class="grow hidden md:block">
            <div class="text-xl font-black relative z-10">
              &nbsp;
              <div class="absolute bg-black/60 top-1/2 -translate-y-1/2 left-0 w-full h-px" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)" />
              <div class="absolute right-0 top-[-125%] w-px h-[180%] bg-black/60" style="box-shadow: 1px 0 0 rgba(255,255,255,0.25)" />
            </div>
          </div>
        </div>

        <div class="flex flex-row justify-start text-left md:text-right md:pl-[30px]">
          <div class="grow hidden md:block">
            <div class="text-xl font-black relative z-10">
              &nbsp;
              <div class="absolute bg-black/60 top-1/2 -translate-y-1/2 right-0 w-full h-px" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)" />
              <div class="absolute left-0 top-[-125%] w-px h-[180%] bg-black/60" style="box-shadow: 1px 0 0 rgba(255,255,255,0.25)" />
            </div>
          </div>
          <div class="relative block items-star group hover:text-white" to="/learn/four-pillars/immunity-from-death-spirals">
            <div class="hidden md:block absolute -top-3 -right-3 left-1 -bottom-3 bg-black/30 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
            <header class="flex flex-row items-center text-xl font-black mb-1 relative">
              <div class="hidden md:block grow h-px bg-black/60 group-hover:invisible" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)" />
              <span class="relative z-10 whitespace-nowrap md:pl-3">Immune from Death Spirals</span>
            </header>
            <div class="text-xl font-light relative w-fit inline-block cursor-pointer md:pl-7">
              <span>Argon solves the core problem inherent </span>
              <span class="lg:block mt-px">in previous algorithmic stablecoins<span class="inline md:hidden">. <strong class="hidden font-bold">Learn more</strong>.</span></span>
            </div>
          </div>
        </div>

      </div>

      <p class="text-justify md:text-center text-white/80 argon-dark-text-shadow font-light w-10/12 md:w-8/12 md:px-10 text-lg md:text-xl my-4 md:my-20 lg:text-[29px] md:leading-[2rem] lg:leading-[43px]">
        Argon's novel algorithmic stablecoin leverages Bitcoin's $2.7T market capitalization to create a currency you can depend
        on. Bitcoin drives both the bootstrapping mechanism of Argon's network and the stabilizing force of its currency. Argon's 
        immutable purchasing power never loses value like fiat or fiat-pegged stablecoins, and it has zero centralized 
        dependencies, meaning it can outlast any nation state or world calamity.
      </p>

      <div class="flex flex-col md:flex-row gap-x-16 gap-y-4 text-white/80 font-bold text-xl w-fit mx-auto py-16 relative">
        <RouterLink to="/learn-more" class="whitespace-nowrap grow w-full bg-argon-500 border border-argon-700 rounded-md md:px-32 py-4 hover:bg-argon-500/70 hover:text-white font-bold" style="box-shadow: inset 1px 1px 3px rgba(255, 255, 255, 0.3), 1px 1px 3px rgba(0, 0, 0, 0.3)">
          Learn More
        </RouterLink>
        <RouterLink to="/desktop-app" class="whitespace-nowrap grow w-full bg-argon-500 border border-argon-700 rounded-md md:px-32 py-4 hover:bg-argon-500/70 hover:text-white font-bold" style="box-shadow: inset 1px 1px 3px rgba(255, 255, 255, 0.3), 1px 1px 3px rgba(0, 0, 0, 0.3)">
          Get Started
          <ChevronDoubleRightIcon class="w-4 h-4 inline-block" />
        </RouterLink>
      </div>

      <div class="relative flex flex-col md:flex-row items-stretch whitespace-nowrap w-full text-white/80 py-3 md:mt-12">
        <div class="DIVIDER-HORIZONTAL-FADED !absolute top-0 left-0"></div>
        <div as="div" to="/learn/currency-metrics/argons-in-circulation" class="md:w-1/3 py-10 hover:bg-black/10 hover:text-white">
          <div class="text-4xl lg:text-6xl font-bold">{{ microgonToArgonNm(microgonsInCirculation).format('0,0') }}</div>
          <div class="mt-2 font-light">ARGNs In Circulation</div>
        </div>
        <div class="DIVIDER-VERTICAL !h-auto self-stretch mx-3 hidden md:block"></div>
        <div class="DIVIDER-HORIZONTAL-FADED w-full h-px block md:hidden"></div>
        <div as="div" to="/learn/currency-metrics/argon-to-fiat-exchange-rate" class="md:w-1/3 py-10 hover:bg-black/10 hover:text-white">
          <div class="text-4xl lg:text-6xl font-bold">₳1.00 -> ${{ usdForArgon ? numeral(usdForArgon).format('0.00') : '-.--' }}</div>
          <div class="mt-2 font-light">ARGN-to-USD Exchange Rate</div>
        </div>
        <div class="DIVIDER-VERTICAL !h-auto self-stretch mx-3 hidden md:block"></div>
        <div class="DIVIDER-HORIZONTAL-FADED w-full h-px block md:hidden"></div>
        <div as="div" to="/learn/currency-metrics/bitcoin-to-argon-short-value" class="md:w-1/3 py-10 hover:bg-black/10 hover:text-white">
          <div class="text-4xl lg:text-6xl font-bold">₳{{ numeral(shortValue).format('0,0') }}</div>
          <div class="mt-2 font-light">BTC-to-ARGN Short Value</div>
        </div>
      </div>
    </main>
      
    <section class="relative flex flex-col bg-white items-center justify-center w-full pt-10 cursor-default text-center border-b border-argon-600/30 shadow-md">
      <h3 class="text-argon-600/70 font-bold text-2xl px-10 md:px-auto">DESIGNED TO WORK ACROSS ALL CHAINS</h3>
      <p class="text-black/50 text-xl w-10/12 md:w-7/12 mx-auto mt-4">
        Argon is a sovereign, level-one blockchain built on Polkadot's rust-based Substrate. It uses the Hyperbridge protocol to deliver
        trustless, native bridging across all major chains.
      </p>
      <div class="grid grid-cols-3 lg:grid-cols-9 space-y-5 w-full text-center pt-12 pb-6 divide-x divide-argon-400/20 text-argon-600/70">
        <div class="opacity-80 hover:opacity-100">
          <OptimismIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Optimism</div>
        </div>
        <div class="opacity-80 hover:opacity-100">
          <PolygonIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Polygon</div>
        </div>
        <div class="opacity-80 hover:opacity-100">
          <BaseIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Base</div>
        </div>
        <div class="opacity-80 hover:opacity-100">
          <EthereumIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Ethereum</div>
        </div>
        <div class="opacity-80 hover:opacity-100">
          <ArbitrumIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Arbitrum</div>
        </div>
        <div class="opacity-80 hover:opacity-100">
          <CardanoIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Cardano</div>
        </div>
        <div class="opacity-80 hover:opacity-100">
          <PolkadotIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Polkadot</div>
        </div>
        <div class="opacity-80 hover:opacity-100">
          <GnosisIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Gnosis</div>
        </div>
        <div class="opacity-80 hover:opacity-100">
          <BnbChainIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">BNB Chain</div>
        </div>
      </div>
    </section>

    <section class="relative flex flex-col pt-12 md:pt-28">
      <h2 class="text-center text-argon-700 px-10 md:px-0">
        <div class="font-light text-2xl md:text-5xl mb-3 uppercase">Participate In Growing the Network</div>
        <div class="font-bold text-3xl md:text-7xl">DIRECTLY FROM YOUR LAPTOP</div>
      </h2>

      <div class="relative opacity-70">
        <img src="/commander.png" alt="Argon Commander" class="w-10/12 mx-auto mt-12 -mb-20 object-cover object-top" />
        <div class="absolute left-0 bottom-0 w-full h-1/2" style="background: linear-gradient(to bottom, var(--bg-transparent) 0%, var(--bg-color) 100%)" />
      </div>

      <div class="flex flex-col items-center px-10 md:mt-20">
        <button @click="downloadCommander" class="flex flex-row items-center justify-center gap-3 bg-argon-button border border-argon-800 text-white rounded-md md:text-2xl w-full md:w-10/12 px-2 md:px-40 py-2 md:py-5 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);">
          <MacIcon v-if="osName === OsName.mac" class="w-7 h-7 relative -top-0.5 inline-block" />
          <WindowsIcon v-if="osName === OsName.windows" class="w-7 h-7 relative inline-block" />
          <span>Download <span class="hidden md:inline">Argon</span> Investor Console</span>
        </button>
        <div class="text-gray-500/80 text-sm md:text-base mt-2">Lastest version: 1.0.0-rc1, experimental for testnet</div>
        <p class="w-full md:w-7/12 mx-auto text-base md:text-xl text-center opacity-70 mt-10 md:mt-16 leading-relaxed">
          Our simple desktop app makes it easy to capitalize on the growth of Argon without needing expensive ASIC mining rigs.
          It runs on any Windows, Linux, or MacOS computer, and it's fully anonymous, meaning there are no centralized logins, 
          telemetry data or other trackable mechanics.
        </p>
      </div>

      <div class="grid md:grid-cols-4 w-full text-center pb-6 mt-32 divide-x divide-argon-400/30 text-argon-600/70">
        <div as="div" to="/learn/mining-metrics/active-mining-seats" class="opacity-80 hover:opacity-100 py-5">
          <div class="text-6xl font-bold">100</div>
          <div class="mt-2 font-light">Active Mining Seats</div>
        </div>
        <div as="div" to="/learn/mining-metrics/current-mining-apy" class="opacity-80 hover:opacity-100 py-5">
          <div class="text-6xl font-bold">473.3%</div>
          <div class="mt-2 font-light">Current Mining APY</div>
        </div>
        <div as="div" to="/learn/vaulting-metrics/active-vaults" class="opacity-80 hover:opacity-100 py-5">
          <div class="text-6xl font-bold">4</div>
          <div class="mt-2 font-light">Active Vaults</div>
        </div>
        <div as="div" to="/learn/vaulting-metrics/current-vaulting-apy" class="opacity-80 hover:opacity-100 py-5">
          <div class="text-6xl font-bold">528.1%</div>
          <div class="mt-2 font-light">Current Vaulting APY</div>
        </div>
      </div>
    </section>

    <section class="relative flex flex-col bg-white items-center justify-center w-full pt-16 pb-4 cursor-default text-center border-t border-argon-800/15 border-b border-b-argon-900/70" style="box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);">
      <h3 class="text-argon-600/80 font-bold text-2xl px-10">THE AI-FIRST MICROPAYMENT STACK</h3>
      <p class="text-black/50 text-base text-justify md:text-xl w-10/12 md:w-8/12 mx-auto mt-4">
        Argon's Localchain is a lightweight, fast throughput, peer-to-peer L2 payment protocol. Our new MCP Payment protocol will
        serve as the foundational layer for AI agents to facilitate micro-transactions.
      </p>
      <div class="grid grid-cols-3 md:grid-cols-6 space-y-3 w-full text-center pt-16 pb-6 divide-x divide-argon-400/20 text-argon-600/70">
        <div class="opacity-80 hover:opacity-100 py-2">
          <ChatgptIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">ChatGPT</div>
        </div>
        <div class="opacity-80 hover:opacity-100 py-2">
          <ClaudeIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Claude</div>
        </div>
        <div class="opacity-80 hover:opacity-100 py-2">
          <GeminiIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Gemini</div>
        </div>
        <div class="opacity-80 hover:opacity-100 py-2">
          <GrokIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Grok</div>
        </div>
        <div class="opacity-80 hover:opacity-100 py-2">
          <LlamaIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Llama</div>
        </div>
        <div class="opacity-80 hover:opacity-100 py-2">
          <MinstralIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Minstral</div>
        </div>
      </div>
    </section>

    <section HelpUsBootstrap class="text-white">
      <h2 class="text-center pt-24">
        <div class="font-light text-2xl md:text-4xl mb-3">JOIN US IN BOOTSTRAPPING ARGON INTO A</div>
        <div class="font-bold text-4xl md:text-7xl">TRILLION DOLLAR STABLECOIN</div>
      </h2>

      <div class="flex flex-col gap-5 w-8/12 mx-auto text-xl mt-12 font-light">
        <p class="text-justify">
          We believe the world needs an alternative to inflation-ridden fiat currencies. Every year, fiat quietly erodes
          the savings of hard-working families while governments continue to accumulate unsustainable debts that threaten
          to collapse the entire system.
        </p>

        <p class="text-justify">
          Argon is designed to break this cycle of inflation, and it's doing it through Bitcoin. Argon's economic model uses the
          process of endosymbiosis &ndash; the act of minting Argon from Bitcoin &ndash; to consume and convert Bitcoin's 
          fixed 21M supply into a stable currency. Its incentive structure creates an exponential growth curve that will escalate
          until it establishes a stablecoin circulation at twice Bitcoin's market value. At that scale, Argon will have
          achieved the critical mass required to stand as an independent, global currency.
        </p>

        <p class="text-justify">
          Unlike most other crypto projects, Argon has shown no favoritism to the founders or early adopters. On January
          15, 2025, Argon launched with zero rewards in its genesis block. Its goal of becoming the world's dominant currency
          requires a platform that can be fully trusted, fully open, and accessible to everyone. From day one.
        </p>

        <p class="text-justify">
          Argon's launch is unfolding across six phases. The first two are now complete. The third is underway. You're
          invited to join us at any point along the journey.
        </p>
      </div>

      <div class="flex flex-col items-center w-8/12 mx-auto mt-12 pb-40">
        <router-link to="/secret-plan" class="flex flex-row items-center justify-center border border-white/30 hover:shadow-lg text-white rounded-md md:text-2xl w-full px-2 md:px-40 py-2 md:py-5 font-bold cursor-pointer hover:bg-argon-600 whitespace-nowrap">
          <span>Read Our Secret Plan</span>
        </router-link>
      </div>

    </section>

    <FooterBar :darkMode="true" />
  </div>
</template>

<script lang="ts">
import * as Vue from 'vue';

const microgonsInCirculation = Vue.ref(0n);
const usdForArgon = Vue.ref(0);
const shortValue = Vue.ref(0);
const bitcoinDollarValue = Vue.ref(1_028);
</script>

<script setup lang="ts">
import LogoSkinny from '../assets/logo-skinny.svg?component';
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/outline';
import OptimismIcon from '../assets/chains/optimism.svg?component';
import PolygonIcon from '../assets/chains/polygon.svg?component';
import BaseIcon from '../assets/chains/base.svg?component';
import EthereumIcon from '../assets/chains/ethereum.svg?component';
import ArbitrumIcon from '../assets/chains/arbitrum.svg?component';
import CardanoIcon from '../assets/chains/cardano.svg?component';
import PolkadotIcon from '../assets/chains/polkadot.svg?component';
import GnosisIcon from '../assets/chains/gnosis.svg?component';
import BnbChainIcon from '../assets/chains/bnbchain.svg?component';
import ChatgptIcon from '../assets/aimodels/chatgpt.svg?component';
import ClaudeIcon from '../assets/aimodels/claude.svg?component';
import GeminiIcon from '../assets/aimodels/gemini.svg?component';
import GrokIcon from '../assets/aimodels/grok.svg?component';
import LlamaIcon from '../assets/aimodels/llama.svg?component';
import MinstralIcon from '../assets/aimodels/minstral.svg?component';
import MacIcon from '../assets/os/mac.svg?component';
import WindowsIcon from '../assets/os/windows.svg?component';
import LinuxIcon from '../assets/os/linux.svg?component';
import FooterBar from '../navigation/FooterBar.vue';
import TopBar from '../navigation/TopBar.vue';
import numeral, { microgonToArgonNm } from '@/lib/numeral';
import Data from "@/lib/Data";
import { Download, OsName } from '@/lib/Download';

shortValue.value = calculateUnlockBurnPerBitcoinDollar(0.001) * bitcoinDollarValue.value;

const download = new Download();
const osName = Vue.ref(download.currentOsName);

function calculateUnlockBurnPerBitcoinDollar(argonRatioPrice: number): number {
  const r = argonRatioPrice;
  if (r >= 1.0) {
    return 1;
  } else if (r >= 0.9) {
    return 20 * Math.pow(r, 2) - 38 * r + 19;
  } else if (r >= 0.01) {
    return (0.5618 * r + 0.3944) / r;
  } else {
    return (1 / r) * (0.576 * r + 0.4);
  }
}

function downloadCommander() {
  const downloadUrl = download.urlFor(osName.value, false);
  window.open(downloadUrl);
}

Vue.onMounted(async () => {
  const basics = await Data.fetchBasics();
  microgonsInCirculation.value = basics.microgonsInCirculation;
  usdForArgon.value = basics.usdForArgon;
});
</script>

<style>
@import "../main.css";

.Home.Screen {

  .argon-dark-text-shadow {
    text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
  }

  main {
    background: linear-gradient(to bottom, #780F85, #A428B3);
  }

  [HelpUsBootstrap] {
    background: linear-gradient(to bottom, #A428B3, #780F85);
  }

  --line-dark: rgba(15, 1, 17, 0.7);
  --line-dark-transparent: rgba(15, 1, 17, 0);

  --line-light: rgba(255, 255, 255, 0.2);
  --line-light-transparent: rgba(255, 255, 255, 0);

  .DIVIDER-HORIZONTAL {
    background: linear-gradient(to right, var(--line-dark-transparent) 0%,  10%, var(--line-dark) 90%, var(--line-dark-transparent) 100%);
  }

  .DIVIDER-VERTICAL {
    position: relative;
    height: 100%;
    width: 1.5px;
    background: var(--line-dark);
    &:after {
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--line-light);
      top: 0;
      left: 1.5px;
      content: '';
    }
  }

  .DIVIDER-HORIZONTAL-FADED {
    position: relative;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, var(--line-dark-transparent) 0%, var(--line-dark) 10%, var(--line-dark) 90%,  var(--line-dark-transparent) 100%);
    &:after {
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: -1px;
      left: 0;
      content: '';
      background: linear-gradient(to right, var(--line-light-transparent) 0%, var(--line-light) 10%, var(--line-light) 90%, var(--line-light-transparent) 100%);  }
  }
}
</style>