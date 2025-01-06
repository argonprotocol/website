<template>
  <main class=" flex flex-col items-center text-center min-h-screen pb-10 md:pb-32">

    <div class="absolute top-0 left-0 py-3 pr-3 md:pt-5 md:pr-5 w-full whitespace-nowrap text-sm md:text-base text-white flex flex-row justify-end gap-2 md:gap-4 cursor-default">
      <div class="absolute left-3 top-3 md:left-5 md:top-5 opacity-50 hover:opacity-100 cursor-pointer" @click="$router.push('/')">
        <ArrowLeftIcon class="inline-block w-4 h-4 md:w-5 md:h-5" />
        Back to Home
      </div>
      
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

    <a href="/"><Logo class="mt-20 w-[80px] md:w-[100px]" /></a>

    <h1 class="LOGO-TEXT text-white font-black text-3xl md:text-6xl uppercase opacity-65 mt-10 mb-5">Argon's Founding Manifesto</h1>

    <div class="w-10/12 text-white mt-10 mx-auto text-left font-extralight leading-9 flex flex-col gap-10">
      <div class="LINE LINE2"></div>

      <div class="flex flex-col md:flex-row w-full space-y-5 md:space-y-0">
        <div class="leading-7 md:leading-9 text-lg md:text-xl w-full md:w-[65%] mr-0 md:mr-[7%]">
          <strong class="uppercase">We believe society needs an immutable, easily transmissible asset that holds consistent value over an infinite timeframe</strong>. The world has no 
          such asset. All the assets are either being continually debased by inflation or are at constant risk of volatility. This is true of the dollar, the stock market, and even of gold.
        </div>
        <div class="w-full md:w-[28%] text-base md:text-lg opacity-80">
          <p>Over the last hundred years, the dollar lost 96%+ of its value. Argon is the first truly hard currency with no inflation or deflation. Although gold has outperformedthe dollar, 
            it is still susceptible to inflation of 1.5-2% annually.</p>
        </div>
      </div>

      <div class="LINE LINE2"></div>

      <div class="flex flex-col md:flex-row w-full space-y-5 md:space-y-0">
        <div class="leading-7 md:leading-9 text-lg md:text-xl w-full md:w-[65%] mr-0 md:mr-[7%]">
          <strong class="uppercase">We believe crypto needs a new medium of exchange that is fully and truly decentralized</strong>. The current market relies on stablecoins that are collaterally backed 
          by the old banking system. Crypto can never achieve its goal of disrupting the old banking system so long as it is based on the same system. It will eventually be reeled back 
          in and merged into the old banking system until only the old system remains.
        </div>

        <div class="w-full md:w-[28%] text-base md:text-lg opacity-80">
          <p>Ninety-eight percent of all stablecoins in circulation are minted and controlled by centralized entities like Tether, Circle, etc. They are basically traditional finance 
            entities with a different API.</p>
        </div>
      </div>

      <div class="LINE LINE2"></div>

      <div class="flex flex-col md:flex-row w-full space-y-5 md:space-y-0">
        <div class="leading-7 md:leading-9 text-lg md:text-xl w-full md:w-[65%] mr-0 md:mr-[7%]">
          <strong class="uppercase">We believe the current crop of stablecoins are doomed to failure because of their off-chain collateral architecture</strong>. Off-chain assets cannot be independently 
          verified using on-chain algorithms. As such, these stablecoins inherit all the problems of fractional reserve banking without the regulatory oversight and insurance guarantees 
          of traditional banking. It's hard to see how these centrally backed stablecoins become anything other than CBDCs (Central Bank Digital Currencies).
        </div>

        <div class="w-full md:w-[28%] text-base md:text-lg opacity-80">
          <p>We invite you to read our first whitepaper (<a href="/on-the-stabilization-of-collateral-backed-stablecoins.pdf" target="_blank" class="underline decoration-dashed">On the 
            Stabilization of Collateral-Backed Stablecoins</a>) to learn more. It dives into the history of currency, the role of existing stablecoins, and the risk that these 
            collateral-backed architectures bring to consumers.</p>
        </div>
      </div>

      <div class="LINE LINE2"></div>

      <div class="flex flex-col md:flex-row w-full space-y-5 md:space-y-0">
        <div class="leading-7 md:leading-9 text-lg md:text-xl w-full md:w-[65%] mr-0 md:mr-[7%]">
          <strong class="uppercase">We believe the practice of rewarding genesis block tokens, smart contract air drops, and other pre-allocation methods has destroyed the purity and potential of the 
            crypto industry</strong>. Pre-allocation goes against the founding ethos of Bitcoin and the basic tenants of decentralization. It creates uneven playing fields that 
            incentivize short-term hype over long-term value. It rewards past involvement over future behavior. It fuels projects that masquerade as decentralized, but are, in reality 
            controlled by shadow entities.
        </div>

        <div class="w-full md:w-[28%] text-base md:text-lg opacity-80">
          Argon is launching on January 15, 2025, with zero tokens being distributed to founders, funders, or any other entity. There will be no ICOs, no genesis block rewards, and 
          no revenue streams allocated to a company or individual. Zipo. All the intellectual property -- code, trademarks, patents, etc -- is being open sourced. Everyone has a chance
          to participate on an even playing field.
        </div>
      </div>
    </div>
  </main>
  <FooterBar />
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import FooterBar from '../components/FooterBar.vue';
import vTooltip from '../directives/tooltip';
import Logo from '../assets/logo.svg';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
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