<script setup lang="ts">
import Logo from '../assets/logo.svg';
import GithubIcon from '../assets/github.svg';
import DiscordIcon from '../assets/discord.svg';
import SubstackIcon from '../assets/substack.svg';
import LaunchingBanner from '../assets/launching.svg';
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/outline';
import OptimismIcon from '../assets/optimism.svg';
import PolygonIcon from '../assets/polygon.svg';
import BaseIcon from '../assets/base.svg';
import EthereumIcon from '../assets/ethereum.svg';
import ArbitrumIcon from '../assets/arbitrum.svg';
import CardanoIcon from '../assets/cardano.svg';
import PolkadotIcon from '../assets/polkadot.svg';
</script>

<template>
  <main class=" flex flex-col items-center text-center min-h-screen pb-32">
    <div class="absolute -top-5 -left-5 md:-top-8 md:-left-8">
      <LaunchingBanner class="w-[150px] md:w-[250px]" />
      <div class="text-white font-bold text-xl absolute top-[108px] left-[34px] -rotate-45 text-center whitespace-nowrap">Launching Jan 15th</div>
    </div>

    <div class="absolute top-5 right-5 whitespace-nowrap text-white flex flex-row gap-4 cursor-default">
      <div class="opacity-80">LIVE ON</div>
      <div class="flex flex-row items-center gap-2">
        <div class="rounded-full w-4 h-4 bg-[#8FFF23] border border-black"></div>
        TESTNET
      </div>
      <div class="opacity-40 flex flex-row items-center gap-2">
        <div class="rounded-full w-4 h-4 bg-[#8B1699] border border-black"></div>
        MAINNET
      </div>
    </div>

    <Logo class="mt-20 w-[80px] md:w-[100px]" />

    <h1 class="LOGO-TEXT text-white font-black text-5xl md:text-8xl uppercase opacity-65 my-5">Argon</h1>

    <header class="relative w-full md:w-10/12 py-10 md:py-14 mt-6 md:mt-9">
      <div class="LINE LINE1"></div>
      <div class="text-white">
        <div class="text-3xl md:text-4xl lg:text-6xl px-10 font-black md:leading-[3rem] lg:leading-[4.5rem] opacity-80">
          Crypto's First Stable Asset
        </div>
        <div class="px-10 text-xl mt-4 md:mt-2 md:text-3xl lg:text-5xl font-light md:leading-[3rem] lg:leading-[4.5rem] opacity-80">
          <div class="inline md:block">Argon is protected from inflation, immune</div>
          to death spirals, and powered by Bitcoin.
        </div>
      </div>
      <div class="flex flex-row gap-8 text-white font-bold text-lg justify-center mt-10">
        <button class="border border-[#B95EC5] rounded-md px-20 py-2 flex flex-row items-center gap-2 hover:bg-white/10">
          Our Founding Manfesto
        </button>
        <button class="border border-[#B95EC5] rounded-md px-20 py-2 flex flex-row items-center gap-2 hover:bg-white/10">
          Getting Started Guide
          <ChevronDoubleRightIcon class="w-4 h-4" />
        </button>
      </div>
      <div class="LINE LINE2"></div>
    </header>

    <div class="relative flex flex-col items-center justify-center w-full md:w-10/12 pt-8 cursor-default">
      <div class="flex flex-row items-center justify-between w-10/12 text-center pb-8">
        <!-- binance -->
        <div class="opacity-80 hover:opacity-100">
          <OptimismIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">Optimism</div>
        </div>
        <div class="opacity-80 hover:opacity-100">
          <PolygonIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">Polygon</div>
        </div>
        <div class="opacity-80 hover:opacity-100">
          <BaseIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">Base</div>
        </div>
        <div class="opacity-80 hover:opacity-100">
          <EthereumIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">Ethereum</div>
        </div>
        <div class="opacity-80 hover:opacity-100">
          <ArbitrumIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">Arbitrum</div>
        </div>
        <div class="opacity-80 hover:opacity-100">
          <CardanoIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">Cardano</div>
        </div>
        <div class="opacity-80 hover:opacity-100">
          <PolkadotIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-white/80 text-md">Polkadot</div>
        </div>
      </div>
      <div class="LINE LINE2"></div>
    </div>

    <div class="TOOLS border-1 border-[#B95EC5] rounded text-white text-center block border px-6 md:px-8 pb-7 mt-16 md:mt-24 w-10/12 md:w-8/12 bg-[#901D9C] shadow-md">
      <span class="relative -top-3 whitespace-nowrap px-3 bg-[#9721A6] text-[#C98BD1] text-lg">TEST OUR INTERACTIVE MODELS</span>
      <div class="relative flex flex-row gap-3 justify-around">
        <a class="block pb-3 pt-5 w-5/12" href="http://localhost:5174">
          <div class="text-lg md:text-3xl font-black pt-2 leading-snug mb-2 md:mb-0">S.A.M</div>
          <div class="opacity-80 italic md:text-md mt-1">Stabilization Analysis Model</div>
        </a>
        <div class="DIVIDER-VERTICAL absolute top-2 left-1/2 -translate-x-1/2 w-[1px] h-full"></div>
        <a class="block pb-3 pt-5 px-10 w-5/12" href="http://localhost:5173">
          <div class="text-lg md:text-3xl font-black pt-2 leading-snug mb-2 md:mb-0">L.L.B</div>
          <div class="opacity-80 italic md:text-md mt-1">Liquid Locking for Bitcoin</div>
        </a>
      </div>
    </div>
    
    <div class="WHITEPAPERS border-1 border-[#B95EC5] rounded text-white text-center block border px-6  md:px-8 pb-7 mt-16 md:mt-24 w-10/12 md:w-8/12 bg-[#9722A6] shadow-md">
      <span class="relative -top-3 whitespace-nowrap px-3 bg-[#9721A6] text-[#C98BD1] text-lg">DOWNLOAD OUR WHITEPAPERS</span>
      <a class="block pb-3" href="/on-the-stabilization-of-collateral-backed-stablecoins.pdf">
        <div class="text-lg md:text-3xl font-black pt-2 leading-snug mb-2 md:mb-0">On the Stabilization of Collateral-Backed Stablecoins</div>
        <div class="opacity-80 italic md:text-xl mt-1">By Caleb Clark and Blake Byrnes</div>
      </a>
      <div class="DIVIDER h-[1px] w-11/12 mt-3 mb-5 mx-auto"></div>
      <a class="block pb-3" href="/on-the-stabilization-of-collateral-backed-stablecoins.pdf">
        <div class="text-lg md:text-3xl font-black pt-2 leading-snug mb-2 md:mb-0">The Fundamentals of Creating a Stable Crypto Asset</div>
        <div class="opacity-80 italic md:text-xl mt-1">By Caleb Clark and Blake Byrnes</div>
      </a>
      <div class="DIVIDER h-[1px] w-11/12 my-5 mx-auto"></div>
      <div class="opacity-30">
        <div class="text-lg md:text-3xl font-black pt-2 leading-snug mb-2 md:mb-0">Bootstrapping a Currency From Zero to Global</div>
        <div class="opacity-80 italic md:text-xl mt-1">In Progress, Coming Soon</div>
      </div>
    </div>
  </main>

  <footer class="bg-[#9422A2] border-t border-[#C362CE] w-full">
    <div class="text-white py-3 flex flex-row opacity-60 px-5 md:px-10 whitespace-nowrap">
      <p class="text-sm w-full text-left">
        <span class="hidden md:inline">An open source project for the world.</span>
        <span class="inline md:hidden">Open source.</span>
        Zero rights reserved.
      </p>
      <div class="flex flex-row gap-4">
        <SubstackIcon class="w-[22px] text-white mx-auto mr-1" />
        <GithubIcon class="relative top-[1px] w-6 h-6 text-white mx-auto" />
        <DiscordIcon class="relative top-[1px] w-6 h-6 text-white mx-auto" />
      </div>
    </div>
  </footer>
</template>

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