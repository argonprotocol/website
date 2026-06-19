<template>
  <div class="Home Screen bg-[#670973] relative">
    <div class="absolute top-0 left-0 w-full h-screen bg-[radial-gradient(ellipse_90%_55%_at_50%_-5%,#8a1a9e_0%,transparent_65%)]" />
    <TopBar class="relative z-10" mode="argon" />

    <main class="flex flex-col items-start min-h-screen border-b border-argon-800 relative z-10">

      <div class="grid w-full overflow-hidden lg:grow lg:grid-cols-[minmax(0,50%)_minmax(0,1fr)] lg:grid-rows-[1fr_auto_auto_1fr_auto]">
        <router-link as="h1" to="/why-its-better" class="order-1 px-5 pt-10 text-center text-argon-100 opacity-80 text-shadow-sm text-shadow-argon-800 font-light text-lg tracking-widest uppercase font-serif hover:text-white/90 md:text-3xl lg:col-start-1 lg:row-start-2 lg:px-10 lg:pt-0 lg:text-left xl:px-14 2xl:px-20">
          THE BETTER STABLECOIN
        </router-link>

        <div class="order-2 h-80 overflow-hidden w-full relative pointer-events-none md:h-96 lg:col-start-2 lg:row-start-1 lg:row-span-4 lg:h-auto lg:min-h-[620px] lg:-left-5 xl:min-h-[700px] 2xl:min-h-[900px]">
          <DottedGlobe
              :dot-size="4"
              :rotation-speed="0.005"
              :pulse-interval="2600"
              class="absolute top-8 left-1/2 w-80 max-w-[85vw] -translate-x-1/2 pointer-events-none md:top-5 md:w-96 lg:top-12 lg:right-0 lg:left-auto lg:w-[520px] lg:max-w-none lg:translate-x-0 xl:top-14 xl:w-[620px] 2xl:top-16 2xl:w-[720px]"
          />
        </div>

        <div class="order-3 flex flex-col px-5 pt-8 pb-10 text-center relative md:px-10 lg:col-start-1 lg:row-start-3 lg:px-10 lg:pt-8 lg:pb-0 lg:text-left xl:px-14 xl:pt-10 2xl:px-20">
          <div class="flex flex-col gap-y-6 text-2xl font-serif leading-tight md:text-4xl lg:gap-y-7 lg:text-4xl xl:gap-y-8 xl:text-[2.75rem] 2xl:gap-y-10 2xl:text-6xl">
            <router-link to="/docs/economic-pillars/protected-from-inflation" class="hover:underline decoration-1 decoration-argon-100 text-white/85 w-fit mx-auto hover:text-white lg:mx-0">
              IT'S PROTECTED FROM<br />
              <span>THE DOLLAR'S INFLATION</span>,
            </router-link>

            <router-link to="docs/economic-pillars/insulated-from-fiat-money" class="hover:underline decoration-1 decoration-argon-100 text-white/85 w-fit mx-auto hover:text-white lg:mx-0">
              INSULATED FROM THE<br />
              <span>COLLAPSE OF FIAT-MONEY</span>,
            </router-link>

            <router-link to="docs/economic-pillars/resistant-to-death-spirals" class="hover:underline decoration-1 decoration-argon-100 text-white/85 w-fit mx-auto hover:text-white lg:mx-0">
              AND IMMUNE TO<br />
              <span>CRYPTO DEATH SPIRALS</span>.
            </router-link>
          </div>
        </div>

        <div class="relative z-10 order-4 mx-5 mb-8 flex flex-col items-stretch md:mx-10 lg:col-start-2 lg:row-start-5 lg:mx-0 lg:mb-0 lg:h-32 lg:items-end lg:pr-5 xl:h-36 2xl:-mt-40 2xl:h-39 2xl:pr-10">
          <div class="hidden w-full lg:block">
            <div class="mt-1 h-px w-full bg-linear-to-r from-transparent via-20% via-argon-900 to-argon-900" />
            <div class="h-px w-full bg-linear-to-r from-transparent via-20% via-white/20 to-white/20" />
          </div>
          <router-link to="/why-its-better" class="flex flex-row items-center justify-center cursor-pointer group text-white lg:mt-2 lg:justify-start 2xl:mt-6">
            <div class="bg-argon-800/70 text-argon-100 group-hover:text-white rounded-full border border-argon-900 pl-4 pr-3 py-0.5 font-bold">NEW</div>
            <div class="ml-3 mr-2 text-base text-argon-100 group-hover:text-white lg:text-xl lg:whitespace-nowrap 2xl:text-2xl">
              Three Core Reasons Why Argon Is Better
            </div>
            <ArrowLongRightIcon class="h-8 shrink-0 text-argon-100 group-hover:text-white lg:h-10" />
          </router-link>
        </div>
      </div>

      <div class="flex flex-col relative px-5 py-8 bg-[#5B0968] border-t border-argon-900 md:px-10 lg:px-20 lg:py-16" style="box-shadow: inset 0 1px 0 0 rgba(255,255,255, 0.2);">
        <div class="flex flex-col items-stretch lg:flex-row lg:items-start">
          <p class="text-argon-100/80 argon-dark-text-shadow font-light w-full text-base leading-relaxed md:text-lg lg:w-7/12 lg:text-2xl">
            Argon uses Bitcoin’s pricing volatility to create a new type of decentralized stabilization mechanism.
            Unlike fiat or fiat-pegged stablecoins, Argon will never lose value. It has the same purchasing power
            today as it will a hundred years from now. And it has zero
            centralized dependencies, meaning it can outlast any nation state or world calamity.
          </p>
          <div class="grow flex flex-col gap-y-4 pt-6 text-white/80 font-bold text-xl text-center lg:ml-10 lg:pl-20 lg:pt-3">
            <RouterLink to="/apps" class="flex flex-row items-center justify-center whitespace-nowrap grow bg-argon-500 border border-argon-700 rounded-xl py-4 hover:bg-argon-500/70 hover:text-white font-bold lg:px-32" style="box-shadow: inset 1px 1px 3px rgba(255, 255, 255, 0.3), 1px 1px 3px rgba(0, 0, 0, 0.3)">
              Get Started
              <ChevronDoubleRightIcon class="w-5 ml-2 inline-block" />
            </RouterLink>
            <RouterLink to="/apps" class="whitespace-nowrap grow border border-argon-200/50 rounded-xl py-4 hover:bg-argon-500/20 hover:text-white font-bold lg:px-32">
              Documentation
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="flex flex-col relative w-full bg-[#5B0968] border-t border-argon-900" style="box-shadow: inset 0 1px 0 0 rgba(255,255,255, 0.2);">
        <div class="relative flex flex-col md:flex-row items-stretch md:whitespace-nowrap w-full text-white/80 py-3 text-center">
          <div as="div" to="/learn/currency-metrics/argons-in-circulation" class="md:w-1/3 py-6 md:py-10 hover:bg-black/10 hover:text-white">
            <div class="text-4xl lg:text-6xl font-bold">{{ microgonToArgonNm(data.microgonsInCirculation).format('0,0') }}</div>
            <div class="mt-2 font-light">Argon Circulation</div>
          </div>
          <div class="DIVIDER-VERTICAL !h-auto self-stretch mx-3 hidden md:block"></div>
          <div as="div" to="/learn/currency-metrics/argon-to-fiat-exchange-rate" class="md:w-1/3 py-6 md:py-10 hover:bg-black/10 hover:text-white">
            <div class="text-4xl lg:text-6xl font-bold">₳1.00 -> ${{ data.usdForArgon ? numeral(data.usdForArgon).format('0.00') : '-.--' }}</div>
            <div class="mt-2 font-light">Argon-to-Dollar Exchange Rate</div>
          </div>
          <div class="DIVIDER-VERTICAL !h-auto self-stretch mx-3 hidden md:block"></div>
          <div as="div" to="/learn/currency-metrics/bitcoin-to-argon-short-value" class="md:w-1/3 py-6 md:py-10 hover:bg-black/10 hover:text-white">
            <div class="flex flex-row items-center justify-center text-4xl gap-x-3 lg:text-6xl font-bold">43.6 <span class="text-2xl font-semibold lg:text-4xl">TO</span> 1</div>
            <div class="mt-2 font-light">Restabilization Leverage</div>
          </div>
        </div>
      </div>
    </main>
      
    <section class="relative flex flex-col bg-white items-justify justify-center w-full cursor-default text-center border-b border-argon-600/30 shadow-md">
      <h3 class="text-argon-600/60 font-bold text-base pt-14 px-5 tracking-widest font-serif md:text-lg md:pt-20 lg:text-xl lg:pt-24">
        DECENTRALIZED & DEMOCRATIZED
      </h3>
      <header class="text-2xl font-serif mt-4 leading-tight px-5 md:text-5xl lg:text-[3.25rem] xl:text-6xl">
        ARGON MINING REQUIRES<br />
        LITTLE MORE THAN A LAPTOP
      </header>

      <div
        ref="appSliderEl"
        class="AppPreviewSlider relative opacity-70 w-10/12 aspect-[16/10] max-h-100 max-w-260 mx-auto mt-8 overflow-hidden touch-none select-none md:mt-10 lg:mt-12"
        :class="{ 'is-dragging': isAppSliderDragging }"
        role="slider"
        aria-label="Compare Operations and Treasury app previews"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-valuenow="Math.round(activeSliderPercent)"
        tabindex="0"
        @pointerdown="startAppSliderDrag"
        @keydown.left.prevent="nudgeAppSlider(-5)"
        @keydown.right.prevent="nudgeAppSlider(5)"
        @keydown.home.prevent="setAppSliderPercent(0)"
        @keydown.end.prevent="setAppSliderPercent(100)"
      >
        <img src="/app-treasury.png" alt="Argon Treasury App" class="w-full h-full object-cover object-top pointer-events-none" draggable="false" />
        <div
          class="absolute inset-0 pointer-events-none"
          :style="{ clipPath: `inset(0 ${100 - activeSliderPercent}% 0 0)` }"
        >
          <img src="/app-operations.png" alt="Argon Operations App" class="w-full h-full object-cover object-top" draggable="false" />
        </div>
        <div
          class="AppPreviewSlider__divider absolute top-1 bottom-0 pointer-events-none"
          :style="{ left: `${activeSliderPercent}%` }"
        >
          <div class="AppPreviewSlider__handle">
            <span>&lsaquo;</span>
            <span>&rsaquo;</span>
          </div>
        </div>
        <div class="absolute left-0 bottom-0 w-full h-1/2 z-10" style="background: linear-gradient(to bottom, var(--bg-transparent) 0%, white 100%)" />
      </div>

      <div class="flex flex-col items-center w-10/12 max-w-260 mx-auto md:mt-0 px-2.5">
        <div class="flex flex-col gap-3 w-full md:flex-row md:gap-x-4">
          <a
              :href="stableUrl"
              class="w-full flex flex-row items-center justify-center gap-3 bg-argon-button border border-argon-800 text-white rounded-lg text-base px-2 py-3 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap md:w-1/2 md:py-4 md:text-xl xl:py-5 xl:text-2xl"
              style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);"
              @mouseenter="previewApp('operations')"
              @mouseleave="clearAppPreview"
              @focus="previewApp('operations')"
              @blur="clearAppPreview"
          >
            <ArgonotLogo class="w-8 h-8 relative -top-0.5 inline-block md:w-10 md:h-10" />
            <span>Download Operations</span>
          </a>
          <a
            :href="stableUrl"
            class="w-full flex flex-row items-center justify-center gap-3 bg-argon-button border border-argon-800 text-white rounded-lg text-base px-2 py-3 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap md:w-1/2 md:py-4 md:text-xl xl:py-5 xl:text-2xl"
            style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);"
            @mouseenter="previewApp('treasury')"
            @mouseleave="clearAppPreview"
            @focus="previewApp('treasury')"
            @blur="clearAppPreview"
          >
            <ArgonLogo class="w-8 h-8 relative inline-block md:w-10 md:h-10" />
            <span>Download Treasury</span>
          </a>
        </div>

        <p class="text-base md:text-lg xl:text-xl text-left md:text-justify opacity-70 mt-8 md:mt-12 xl:mt-16 leading-relaxed">
          Unlike most crypto networks, you can become a key player in Argon’s ecosystem without needing millions of
          dollars and complex systems. The Operations app makes it easy to start mining and vaulting without the need
          for expensive ASIC mining rigs or specialized cloud machines. The Treasury app gives you full access to all of
          the network's yield-bearing assets.
        </p>
      </div>

      <div class="w-10/12 max-w-360 mx-auto h-px mt-10 bg-argon-400/20 md:mt-14 xl:mt-18" />

      <div class="grid grid-cols-2 md:grid-cols-3 w-10/12 max-w-360 mx-auto text-center py-4 divide-argon-400/20 text-slate-400/80 md:divide-x md:py-6">
        <div as="div" to="/learn/mining-metrics/current-mining-apy" class="hover:text-argon-600/70 py-5">
          <div class="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold">100</div>
          <div class="mt-2 font-light">Active Mining Seats</div>
        </div>
        <div as="div" to="/learn/vaulting-metrics/active-vaults" class="hover:text-argon-600/70 py-5">
          <div class="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold">{{ data.vaulting.count }}</div>
          <div class="mt-2 font-light">Active Vaults</div>
        </div>
        <div as="div" to="/learn/vaulting-metrics/current-vaulting-apy" class="hidden hover:text-argon-600/70 py-5 md:block">
          <div class="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold">{{ numeral(data.vaulting.activeAPY).formatCapped('0,0', 9_999) }}%</div>
          <div class="mt-2 font-light">Active Bitcoin Txns</div>
        </div>
      </div>

      <div class="w-10/12 max-w-360 mx-auto h-px bg-argon-400/20" />

      <div class="grid grid-cols-2 md:grid-cols-4 w-10/12 max-w-360 mx-auto text-center py-4 divide-argon-400/20 text-slate-400/80 md:divide-x md:py-6">
        <div as="div" to="/learn/mining-metrics/active-mining-seats" class="hover:text-argon-600/70 py-5">
          <div class="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold">{{ data.mining.activeSeatCount }}</div>
          <div class="mt-2 font-light">Mining APY</div>
        </div>
        <div as="div" to="/learn/mining-metrics/current-mining-apy" class="hover:text-argon-600/70 py-5">
          <div class="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold">{{ numeral(data.mining.activeAPY).formatCapped('0,0', 9_999) }}%</div>
          <div class="mt-2 font-light">Treasury APY</div>
        </div>
        <div as="div" to="/learn/vaulting-metrics/active-vaults" class="border-t border-argon-400/20 hover:text-argon-600/70 py-5 md:border-t-0">
          <div class="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold">{{ data.vaulting.count }}%</div>
          <div class="mt-2 font-light">Vaulting APY</div>
        </div>
        <div as="div" to="/learn/vaulting-metrics/current-vaulting-apy" class="border-t border-argon-400/20 hover:text-argon-600/70 py-5 md:border-t-0">
          <div class="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold">{{ numeral(data.vaulting.activeAPY).formatCapped('0,0', 9_999) }}%</div>
          <div class="mt-2 font-light">Bitcoin APY</div>
        </div>
      </div>
    </section>

    <section class="relative flex flex-col bg-[var(--bg-color)] text-center pb-10">
      <h3 class="text-argon-600/70 font-bold text-base pt-14 px-5 tracking-widest font-serif md:text-lg md:pt-16 lg:text-xl">
        BRIDGELESS & NATIVE
      </h3>
      <header class="text-2xl font-serif mt-4 leading-tight px-5 md:text-5xl lg:text-[3.25rem] xl:text-6xl">
        ARGON AVOIDS THE RISK<br />
        OF CROSS-CHAIN BRIDGING
      </header>

      <div class="flex flex-col items-center w-10/12 max-w-260 mx-auto px-2.5">
        <p class="text-base md:text-xl text-left md:text-justify opacity-70 mt-8 md:mt-10 leading-relaxed">
          According to Chainalysis, cross-chain bridges are the single largest source of crypto hacks. Argon sidesteps
          this risk by integrating cross-chain in a bridgeless capacity. Minting Authorities are empowered to mint/burn
          argons native to each chain without knowledge of the other chain and without forcing collateral to be exposed
          across the bridges.  Learn more.
        </p>
      </div>

      <div class="w-10/12 max-w-360 mx-auto h-px mt-10 bg-argon-400/30 md:mt-16 xl:mt-28" />

      <div class="w-10/12 max-w-360 mx-auto grid grid-cols-2 md:grid-cols-4 text-center pt-8 pb-2 divide-argon-400/30 text-argon-600/70 md:divide-x md:pt-12 xl:pt-16">
        <div class="py-5 hover:text-argon-600 md:py-0">
          <OptimismIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Optimism</div>
        </div>
        <div class="border-l border-argon-400/30 py-5 hover:text-argon-600 md:border-l-0 md:py-0">
          <PolygonIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Polygon</div>
        </div>
        <div class="border-t border-argon-400/30 py-5 hover:text-argon-600 md:border-t-0 md:py-0">
          <BaseIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Base</div>
        </div>
        <div class="border-l border-t border-argon-400/30 py-5 hover:text-argon-600 md:border-l-0 md:border-t-0 md:py-0">
          <EthereumIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Ethereum</div>
        </div>
      </div>

      <div class="w-10/12 max-w-360 mx-auto h-px bg-argon-400/30" />

      <div class="grid grid-cols-2 md:grid-cols-5 w-10/12 max-w-360 mx-auto text-center pt-8 pb-2 divide-argon-400/30 text-argon-600/70 md:divide-x md:pt-12 xl:pt-16">
        <div class="py-5 opacity-80 hover:opacity-100 md:py-0">
          <ArbitrumIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Arbitrum</div>
        </div>
        <div class="border-l border-argon-400/30 py-5 opacity-80 hover:opacity-100 md:border-l-0 md:py-0">
          <CardanoIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Cardano</div>
        </div>
        <div class="border-t border-argon-400/30 py-5 opacity-80 hover:opacity-100 md:border-t-0 md:py-0">
          <PolkadotIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Polkadot</div>
        </div>
        <div class="border-l border-t border-argon-400/30 py-5 opacity-80 hover:opacity-100 md:border-l-0 md:border-t-0 md:py-0">
          <GnosisIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Gnosis</div>
        </div>
        <div class="hidden opacity-80 hover:opacity-100 md:block">
          <BnbChainIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">BNB Chain</div>
        </div>
      </div>
    </section>

    <section class="relative flex flex-col bg-white items-center justify-center w-full pb-5 cursor-default text-center border-t border-argon-800/15 border-b border-b-argon-900/70" style="box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);">
      <h3 class="text-argon-600/70 font-bold text-base pt-14 px-5 tracking-widest font-serif md:text-lg md:pt-16 lg:text-xl">
        LIQUID LOCKING
      </h3>
      <header class="text-2xl font-serif mt-4 leading-tight px-5 md:text-5xl lg:text-[3.25rem] xl:text-6xl">
        ARGON TURNS BITCOIN<br />
        INTO A LOSS-PROTECTED,<br />
        YIELD-GENERATING ASSET
      </header>

      <div class="flex flex-col items-center w-10/12 max-w-260 mx-auto px-2.5">
        <p class="text-base md:text-xl text-left md:text-justify opacity-70 mt-8 md:mt-10 leading-relaxed">
          Liquid Locking lets Bitcoin holders unlock stable liquidity without selling their Bitcoin. Argon preserves
          the locked value, protects against downside volatility, and allows the position to keep earning yield — turning
          Bitcoin from a passive asset into productive capital.
        </p>
      </div>

      <div class="w-10/12 max-w-480 mx-auto my-8 md:my-10">
        <img src="/bitcoin-flow.png" class="w-full mx-auto opacity-60 md:opacity-50" />
      </div>
    </section>

    <section HelpUsBootstrap class="text-white">
      <h3 class="text-argon-100/70 font-bold text-base pt-14 px-5 tracking-widest font-serif text-center md:text-lg md:pt-16 lg:text-xl">
        LAUNCH PLAN
      </h3>
      <header class="md:flex flex-col font-serif mt-4 px-5 text-2xl leading-tight text-white text-center uppercase md:text-5xl lg:text-[3.25rem] xl:text-6xl">
        <span>Argon's Path to Becoming a </span>
        <span>Global Transactional Currency</span>
      </header>

      <div class="flex flex-col gap-4 w-10/12 max-w-260 mx-auto text-base mt-8 font-light md:gap-5 md:text-lg md:mt-10 xl:text-xl xl:mt-12">
        <p class="text-left md:text-justify">
          We believe the world needs an alternative to inflation-ridden fiat currencies. Every year, fiat quietly erodes
          the savings of hard-working families while governments continue to accumulate unsustainable debts that threaten
          to collapse the entire system.
        </p>

        <p class="text-left md:text-justify">
          Argon is designed to break this cycle of inflation, and it's doing it through Bitcoin. Argon's economic model uses the
          process of endosymbiosis &ndash; the act of minting Argon from Bitcoin &ndash; to consume and convert Bitcoin's
          fixed 21M supply into a stable currency. Its incentive structure creates an exponential growth curve that will escalate
          until it establishes a stablecoin circulation at twice Bitcoin's market value. At that scale, Argon will have
          achieved the critical mass required to stand as an independent, global currency.
        </p>

        <p class="text-left md:text-justify">
          Unlike most other crypto projects, Argon has shown no favoritism to the founders or early adopters. On January
          15, 2025, Argon launched with zero rewards in its genesis block. Its goal of becoming the world's dominant currency
          requires a platform that can be fully trusted, fully open, and accessible to everyone. From day one.
        </p>

        <p class="text-left md:text-justify">
          Argon's launch is unfolding across six phases. The first two are now complete. The third is underway. You're
          invited to join us at any point along the journey.
        </p>
      </div>

      <div class="flex flex-col items-center w-10/12 max-w-260 mx-auto mt-8 pb-20 md:mt-10 lg:pb-32 xl:mt-12 xl:pb-40">
        <router-link to="/launch-plan" class="flex flex-row items-center justify-center border border-white/30 hover:shadow-lg text-white rounded-md text-base md:text-xl xl:text-2xl w-full px-2 py-3 md:py-5 font-bold cursor-pointer hover:bg-argon-600 whitespace-nowrap">
          <span>Read Our Launch Plan</span>
        </router-link>
      </div>
    </section>

    <FooterBar mode="argon" />
  </div>
</template>

<script lang="ts">
import * as Vue from 'vue';
import { type IBasicsRecord, defaultBasicsRecord } from "@/interfaces/IBasicsRecord";
import { ArrowLongRightIcon } from "@heroicons/vue/24/outline";

const data = Vue.ref<IBasicsRecord>(defaultBasicsRecord);
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
import ArgonLogo from '../assets/logo.svg?component';
import ArgonotLogo from '../assets/argonot.svg?component';
import FooterBar from '../navigation/FooterBar.vue';
import TopBar from '../navigation/TopBar.vue';
import numeral, { microgonToArgonNm } from '@/lib/numeral';
import Data from "@/lib/Data";
import DottedGlobe from "@/components/DottedGlobe.vue";
import { Download } from '@/lib/Download';

const download = new Download();
const stableUrl = Vue.ref('');
const stableVersion = Vue.ref('');
const appSliderEl = Vue.ref<HTMLElement | null>(null);
const appSliderPercent = Vue.ref(50);
const appPreviewPercent = Vue.ref<number | null>(null);
const isAppSliderDragging = Vue.ref(false);

const activeSliderPercent = Vue.computed(() => appPreviewPercent.value ?? appSliderPercent.value);

function clampSliderPercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}

function setAppSliderPercent(value: number): void {
  appPreviewPercent.value = null;
  appSliderPercent.value = clampSliderPercent(value);
}

function nudgeAppSlider(amount: number): void {
  setAppSliderPercent(appSliderPercent.value + amount);
}

function updateAppSliderFromPointer(event: PointerEvent): void {
  if (!appSliderEl.value) return;

  const bounds = appSliderEl.value.getBoundingClientRect();
  const percent = ((event.clientX - bounds.left) / bounds.width) * 100;
  setAppSliderPercent(percent);
}

function stopAppSliderDrag(): void {
  isAppSliderDragging.value = false;
  window.removeEventListener('pointermove', updateAppSliderFromPointer);
  window.removeEventListener('pointerup', stopAppSliderDrag);
  window.removeEventListener('pointercancel', stopAppSliderDrag);
}

function startAppSliderDrag(event: PointerEvent): void {
  event.preventDefault();
  isAppSliderDragging.value = true;
  updateAppSliderFromPointer(event);
  window.addEventListener('pointermove', updateAppSliderFromPointer);
  window.addEventListener('pointerup', stopAppSliderDrag);
  window.addEventListener('pointercancel', stopAppSliderDrag);
}

function previewApp(app: 'operations' | 'treasury'): void {
  appPreviewPercent.value = app === 'operations' ? 100 : 0;
}

function clearAppPreview(): void {
  appPreviewPercent.value = null;
}

Vue.onMounted(async () => {
  const [basics, _] = await Promise.all([
    Data.fetchBasics(),
    download.load(),
  ]);
  data.value = basics;
  stableUrl.value = download.currentUrl;
  stableVersion.value = download.stableVersion;
});

Vue.onBeforeUnmount(stopAppSliderDrag);
</script>

<style>
@import "../main.css";

.Home.Screen {

  .argon-dark-text-shadow {
    text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
  }

  [HelpUsBootstrap] {
    background: linear-gradient(to bottom, #A428B3, #780F85);
  }

  .AppPreviewSlider {
    cursor: ew-resize;
  }

  .AppPreviewSlider > img,
  .AppPreviewSlider > div:not(.AppPreviewSlider__divider) {
    transition: clip-path 180ms ease;
  }

  .AppPreviewSlider.is-dragging > div:not(.AppPreviewSlider__divider),
  .AppPreviewSlider.is-dragging .AppPreviewSlider__divider {
    transition: none;
  }

  .AppPreviewSlider__divider {
    @apply rounded-full border border-argon-400/60;
    width: 7px;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 18px rgba(112, 15, 130, 0.55);
    transform: translateX(-50%);
    transition: left 180ms ease;
    z-index: 2;
  }

  .AppPreviewSlider__handle {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    width: 46px;
    height: 46px;
    color: #70108a;
    font-size: 40px;
    font-weight: 700;
    line-height: 1;
    background: rgba(255, 255, 255, 0.92);
    border: 3px solid #70108a;
    border-radius: 9999px;
    box-shadow: 0 8px 30px rgba(112, 15, 130, 0.3);
    transform: translate(-50%, -50%);
    span {
      @apply leading-none relative top-[-2.5px] font-light;
    }
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
