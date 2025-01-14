<template>
  <main class=" flex flex-col items-center text-center min-h-screen pb-10 md:pb-32 relative">
    <div class="absolute -top-5 -left-5 z-10">
      <LaunchingBanner class="w-[180px] md:w-[250px]" />
      <div class="text-white font-bold text-sm md:text-xl absolute top-[65px] left-[14px] md:top-[93px] md:left-[14px] -rotate-45 text-center whitespace-nowrap">Launching Jan 15th</div>
    </div>

    <div class="absolute top-0 left-0 py-3 pr-3 md:pt-5 md:pr-5 w-full whitespace-nowrap text-sm md:text-base text-white flex flex-row justify-end gap-2 md:gap-4 cursor-default">
      <div class="opacity-80 hidden md:block">Live On</div>
      <a href="https://github.com/argonprotocol/mainchain/blob/main/docs/README.md" class="flex flex-row items-center gap-2" v-tooltip="'Argon\'s Testnet is live and operational. Click to view our Getting Started Guide.'" align="right">
        <div class="rounded-full w-4 h-4 bg-[#8FFF23] border border-black"></div>
        TESTNET
      </a>
      <div class="flex flex-row items-center gap-2" v-tooltip="'Argon\'s Mainnet is launching live on January 15, 2024.'" align="right">
        <div class="rounded-full w-4 h-4 bg-[#8B1699] border border-black"></div>
        <span class="opacity-50">
          MAINNET
        </span>
      </div>
    </div>

    <Logo class="mt-20 w-[80px] md:w-[100px]" />

    <h1 class="LOGO-TEXT text-white font-black text-6xl md:text-8xl uppercase opacity-65 my-5">Argon</h1>

    <header class="relative w-full md:w-10/12 py-10 md:py-14 mt-6 md:mt-9">
      <div class="LINE LINE1"></div>
      <div class="text-white">
        <div class="text-3xl md:text-4xl lg:text-6xl px-10 font-black md:leading-[3rem] lg:leading-[4.5rem] opacity-80">
          Crypto's First Stable Asset
        </div>
        <div class="px-6 md:px-10 text-xl mt-4 md:mt-2 md:text-3xl lg:text-5xl font-light md:leading-[3rem] lg:leading-[4.5rem] opacity-80">
          <div class="inline md:block">Argon is protected from inflation, immune</div>
          to death spirals, and powered by Bitcoin.
        </div>
      </div>
      <div class="flex flex-col md:flex-row gap-8 text-white font-bold text-lg justify-center mt-10 px-10 md:px-0">
        <a href="https://clarkbyrnes.substack.com/p/the-future-of-ulixee-is-argon" class="border border-[#B95EC5] rounded-md md:px-20 py-2 hover:bg-white/10 font-bold">
          Letter from the Founders
        </a>
        <a href="https://github.com/argonprotocol/mainchain/blob/main/docs/README.md" class="border border-[#B95EC5] rounded-md md:px-20 py-2 hover:bg-white/10 font-bold">
          Getting Started Guide
          <ChevronDoubleRightIcon class="w-4 h-4 inline-block" />
        </a>
      </div>
      <div class="LINE LINE2"></div>
    </header>

    <div class="relative flex flex-col items-center justify-center w-full md:w-10/12 pt-8 cursor-default">
      <div class="flex flex-row flex-wrap items-center justify-between w-10/12 text-center pb-8">
        <!-- binance -->
        <div class="opacity-80 hover:opacity-100 w-[33.33%] md:w-auto" v-tooltip="'Going Live On January 15, 2025'">
          <OptimismIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">Optimism</div>
        </div>
        <div class="opacity-80 hover:opacity-100 w-[33.33%] md:w-auto" v-tooltip="'Going Live In 2025'">
          <PolygonIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">Polygon</div>
        </div>
        <div class="opacity-80 hover:opacity-100 w-[33.33%] md:w-auto" v-tooltip="'Going Live On January 15, 2025'">
          <BaseIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">Base</div>
        </div>
        <div class="opacity-80 hover:opacity-100 w-[33.33%] md:w-auto mt-8 md:mt-0" v-tooltip="'Going Live On January 15, 2025'">
          <EthereumIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">Ethereum</div>
        </div>
        <div class="opacity-80 hover:opacity-100 w-[33.33%] md:hidden mt-8 md:mt-0" v-tooltip="'Going Live On January 15, 2025'">
          <ArbitrumIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">Arbitrum</div>
        </div>
        <div class="opacity-80 hover:opacity-100 w-[33.33%] md:w-auto mt-8 md:mt-0" v-tooltip="'Going Live In 2025'">
          <CardanoIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">Cardano</div>
        </div>
        <div class="opacity-80 hover:opacity-100 w-[33.33%] sm:hidden mt-8 md:mt-0" v-tooltip="'Going Live In 2025'">
          <PolkadotIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">Polkadot</div>
        </div>
        <div class="opacity-80 hover:opacity-100 w-[33.33%] md:w-auto mt-8 md:mt-0" v-tooltip="'Going Live In 2025'">
          <GnosisIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">Gnosis</div>
        </div>
        <div class="opacity-80 hover:opacity-100 w-[33.33%] md:w-auto mt-8 md:mt-0" v-tooltip="'Going Live On January 15, 2025'">
          <BnbChainIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">BNB Chain</div>
        </div>
      </div>
      <div class="LINE LINE2"></div>
    </div>

    <div class="TOOLS border-1 border-[#B95EC5] rounded text-white text-center block border px-0 md:px-8 pb-7 mt-16 md:mt-24 w-10/12 md:w-8/12 bg-[#901D9C] shadow-md">
      <span class="relative -top-3 whitespace-nowrap px-3 bg-[#9721A6] text-[#C98BD1] text-lg"><span class="hidden md:inline">TEST </span>OUR SIMULATION ENGINE</span>
      <div class="relative flex flex-row gap-1 md:gap-3 justify-around">
        <a class="block pb-3 pt-5 w-5/12" href="https://llb.argonprotocol.org">
          <div class="text-lg md:text-3xl font-black pt-2 leading-snug mb-2 md:mb-0">L.L.B</div>
          <div class="opacity-80 italic md:text-md mt-1">Liquid Locking for Bitcoin</div>
        </a>
        <div class="DIVIDER-VERTICAL absolute top-2 left-1/2 -translate-x-1/2 w-[1px] h-full"></div>
        <a class="block pb-3 pt-5 w-5/12" href="https://sam.argonprotocol.org">
          <div class="text-lg md:text-3xl font-black pt-2 leading-snug mb-2 md:mb-0">S.A.M</div>
          <div class="opacity-80 italic md:text-md mt-1">Stabilization Analysis Model</div>
        </a>
      </div>
    </div>
    
    <div class="WHITEPAPERS border-1 border-[#B95EC5] rounded text-white text-center block border px-6  md:px-8 pb-2 md:pb-7 mt-16 md:mt-24 w-10/12 md:w-8/12 bg-[#9722A6] shadow-md">
      <span class="relative -top-3 whitespace-nowrap px-3 bg-[#9721A6] text-[#C98BD1] text-lg"><span class="hidden md:inline">DOWNLOAD </span>OUR WHITEPAPERS</span>
      <a class="block pb-3 pt-1 md:pt-3" href="/on-the-stabilization-of-collateral-backed-stablecoins.pdf">
        <div class="text-lg md:text-3xl font-black pt-2 leading-snug mb-2 md:mb-0">On the Stabilization of Collateral-Backed Stablecoins</div>
        <div class="opacity-80 italic md:text-xl mt-1">By Caleb Clark and Blake Byrnes</div>
      </a>
      <div class="DIVIDER h-[1px] w-11/12 mt-3 mb-5 mx-auto"></div>
      <a class="block pb-3" href="/the-fundamentals-for-creating-a-stable-crypto-asset.pdf">
        <div class="text-lg md:text-3xl font-black pt-2 leading-snug mb-2 md:mb-0">The Fundamentals for Creating a Stable Crypto Asset</div>
        <div class="opacity-80 italic md:text-xl mt-1">By Caleb Clark and Blake Byrnes</div>
      </a>
      <div class="DIVIDER h-[1px] w-11/12 my-5 mx-auto"></div>
      <div class="opacity-30">
        <div class="text-lg md:text-3xl font-black pt-2 leading-snug mb-2 md:mb-0">Bootstrapping a Currency From Zero to Global</div>
        <div class="opacity-80 italic md:text-xl mt-1">In Progress, Coming Soon</div>
      </div>
    </div>
  </main>
  <FooterBar />
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import Logo from '../assets/logo.svg';
import LaunchingBanner from '../assets/launching.svg';
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/outline';
import OptimismIcon from '../assets/optimism.svg';
import PolygonIcon from '../assets/polygon.svg';
import BaseIcon from '../assets/base.svg';
import EthereumIcon from '../assets/ethereum.svg';
import ArbitrumIcon from '../assets/arbitrum.svg';
import CardanoIcon from '../assets/cardano.svg';
import PolkadotIcon from '../assets/polkadot.svg';
import GnosisIcon from '../assets/gnosis.svg';
import BnbChainIcon from '../assets/bnbchain.svg';
import vTooltip from '../directives/tooltip';
import FooterBar from '../components/FooterBar.vue';
</script>

<style scoped>
.LOGO-TEXT {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.WHITEPAPERS {
  background: rgba(131, 26, 143, 0.23);
  a:hover {
    background: linear-gradient(to right, rgba(131, 26, 143, 0) 0%, rgba(131, 26, 143, 0.6) 10%, rgba(131, 26, 143, 0.6) 90%, rgba(131, 26, 143, 0) 100%);
  }
  span {
    background: linear-gradient(to bottom, rgba(154, 34, 168, 0) 0%, rgba(154, 34, 168, 1) 40%, rgba(154, 34, 168, 0) 60%, rgba(131, 26, 143, 0) 100%);
  }
}

.TOOLS {
  background: rgba(131, 26, 143, 0.23);
  a:hover {
    background: linear-gradient(to right, rgba(131, 26, 143, 0) 0%, rgba(131, 26, 143, 0.6) 10%, rgba(131, 26, 143, 0.6) 90%, rgba(131, 26, 143, 0) 100%);
  }
  span {
    background: linear-gradient(to bottom, rgba(154, 34, 168, 0) 0%, rgba(154, 34, 168, 1) 40%, rgba(154, 34, 168, 0) 60%, rgba(131, 26, 143, 0) 100%);
  }
}

.DIVIDER {
  background: linear-gradient(to right, rgba(185, 94, 197, 0) 0%, rgba(185, 94, 197, 1) 10%, rgba(185, 94, 197, 1) 90%, rgba(185, 94, 197, 0) 100%);
}

.DIVIDER-VERTICAL {
  background: linear-gradient(to bottom, rgba(185, 94, 197, 0) 0%, rgba(185, 94, 197, 1) 10%, rgba(185, 94, 197, 1) 90%, rgba(185, 94, 197, 0) 100%);
}

.LINE {
  position: absolute;
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

.LINE2 {
  bottom: 0;
}
</style>