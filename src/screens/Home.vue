<template>
  <div class="Home Screen bg-[#670973] relative">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-5%,#8a1a9e_0%,transparent_65%)]" />
    <TopBar class="relative z-10" mode="argon" />

    <main class="flex flex-col items-start min-h-screen border-b border-argon-800">

      <div class="flex flex-row grow w-full overflow-hidden">
        <div class="flex flex-col px-20 pt-20 pb-24 relative">
          <router-link as="h1" to="/the-better-stablecoin" class="text-argon-100 opacity-80 text-shadow-sm text-shadow-argon-800 font-light text-lg md:text-3xl tracking-widest uppercase font-serif hover:text-white/90">
            THE BETTER STABLECOIN
          </router-link>

          <div class="flex flex-col gap-y-10 mt-10 text-2xl md:text-6xl font-serif leading-tight">
            <router-link to="/docs/economic-pillars/protected-from-inflation" class="hover:underline decoration-1 decoration-argon-100 text-white/85 w-fit hover:text-white">
              IT'S PROTECTED FROM<br />
              <span>THE DOLLAR'S INFLATION RISK</span>,
            </router-link>

            <router-link to="docs/economic-pillars/insulated-from-fiat-money" class="hover:underline decoration-1 decoration-argon-100 text-white/85 w-fit hover:text-white">
              INSULATED FROM THE<br />
              <span>COLLAPSE OF FIAT-MONEY</span>,
            </router-link>

            <router-link to="docs/economic-pillars/resistant-to-death-spirals" class="hover:underline decoration-1 decoration-argon-100 text-white/85 w-fit hover:text-white">
              AND RESISTANT TO<br />
              <span>CRYPTO DEATH SPIRALS</span>.
            </router-link>
          </div>
        </div>
        <div class="grow flex flex-col relative items-end">
          <img src="/colony.png" class="absolute -top-10 left-[-60%] h-[calc(100%+100px)] w-auto max-w-none opacity-30 pointer-events-none" />

          <div class="z-10 absolute top-18 right-20 bg-[#9317A3] border-8 border-[#7B128B]  rounded-full text-white/90  w-fit">
            <router-link to="/the-better-stablecoin" class="flex flex-row items-center border border-argon-900 cursor-pointer rounded-full hover:text-white pr-5 group hover:bg-argon-700/50">
              <div class="bg-[#BD19D2] group-hover:bg-argon-500/80 rounded-l-full border border-[#9317A3] pl-4 pr-3 py-2 text-lg font-bold">NEW</div>
              <div class="pl-4 pr-2 text-xl whitespace-nowrap ">
                Three Reasons Why Argon Is Better
              </div>
              <ArrowLongRightIcon class="h-10" />
            </router-link>
          </div>
        </div>
      </div>

      <div class="flex flex-col relative px-20 py-16 bg-[#5B0968] border-t border-argon-900" style="box-shadow: inset 0 1px 0 0 rgba(255,255,255, 0.2);">
        <div class="flex flex-row items-start">
          <p class="text-argon-100/80 argon-dark-text-shadow font-light w-10/12 md:w-7/12 text-lg md:text-lg lg:text-2xl leading-relaxed">
            Argon uses Bitcoin’s pricing volatility to create a new type of decentralized stabilization mechanism.
            Unlike fiat or fiat-pegged stablecoins, Argon will never lose value. It has the same purchasing power
            today as it will a hundred years from now. And it has zero
            centralized dependencies, meaning it can outlast any nation state or world calamity.
          </p>
          <div class="grow flex md:flex-col flex-row gap-x-16 gap-y-4 md:ml-10 pl-20 pt-3 text-white/80 font-bold text-xl text-center">
            <RouterLink to="/launch-plan" class="flex flex-row items-center justify-center whitespace-nowrap grow bg-argon-500 border border-argon-700 rounded-xl md:px-32 py-4 hover:bg-argon-500/70 hover:text-white font-bold" style="box-shadow: inset 1px 1px 3px rgba(255, 255, 255, 0.3), 1px 1px 3px rgba(0, 0, 0, 0.3)">
              Get Started
              <ChevronDoubleRightIcon class="w-5 ml-2 inline-block" />
            </RouterLink>
            <RouterLink to="/apps" class="whitespace-nowrap grow border border-argon-200/50 rounded-xl md:px-32 py-4 hover:bg-argon-500/20 hover:text-white font-bold">
              Documentation
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="flex flex-col relative w-full bg-[#5B0968] border-t border-argon-900" style="box-shadow: inset 0 1px 0 0 rgba(255,255,255, 0.2);">
        <div class="relative flex flex-col md:flex-row items-stretch whitespace-nowrap w-full text-white/80 py-3 text-center">
          <div as="div" to="/learn/currency-metrics/argons-in-circulation" class="md:w-1/3 py-10 hover:bg-black/10 hover:text-white">
            <div class="text-4xl lg:text-6xl font-bold">{{ microgonToArgonNm(data.microgonsInCirculation).format('0,0') }}</div>
            <div class="mt-2 font-light">Argon Circulation</div>
          </div>
          <div class="DIVIDER-VERTICAL !h-auto self-stretch mx-3 hidden md:block"></div>
          <div as="div" to="/learn/currency-metrics/argon-to-fiat-exchange-rate" class="md:w-1/3 py-10 hover:bg-black/10 hover:text-white">
            <div class="text-4xl lg:text-6xl font-bold">₳1.00 -> ${{ data.usdForArgon ? numeral(data.usdForArgon).format('0.00') : '-.--' }}</div>
            <div class="mt-2 font-light">Argon-to-Dollar Exchange Rate</div>
          </div>
          <div class="DIVIDER-VERTICAL !h-auto self-stretch mx-3 hidden md:block"></div>
          <div as="div" to="/learn/currency-metrics/bitcoin-to-argon-short-value" class="md:w-1/3 py-10 hover:bg-black/10 hover:text-white">
            <div class="flex flex-row items-center justify-center text-6xl gap-x-3 lg:text-6xl font-bold">43.6 <span class="text-4xl font-semibold">TO</span> 1</div>
            <div class="mt-2 font-light">Restabilization Leverage</div>
          </div>
        </div>
      </div>
    </main>
      
    <section class="relative flex flex-col bg-white items-justify justify-center w-full cursor-default text-center border-b border-argon-600/30 shadow-md">
      <h3 class="text-argon-600/60 font-bold text-xl pt-24 px-10 md:px-auto tracking-widest font-serif">
        DECENTRALIZED & DEMOCRATIZED
      </h3>
      <header class="text-6xl font-serif mt-5 leading-tight">
        ARGON MINING REQUIRES<br />
        LITTLE MORE THAN A LAPTOP
      </header>

      <div
        ref="appSliderEl"
        class="AppPreviewSlider relative opacity-70 w-10/12 h-100 max-w-260 mx-auto mt-12 overflow-hidden touch-none select-none"
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
        <img src="/app-treasury.png" alt="Argon Treasury App" class="w-full -mb-20 object-cover object-top pointer-events-none" draggable="false" />
        <div
          class="absolute inset-0 pointer-events-none"
          :style="{ clipPath: `inset(0 ${100 - activeSliderPercent}% 0 0)` }"
        >
          <img src="/app-operations.png" alt="Argon Operations App" class="w-full -mb-20 object-cover object-top" draggable="false" />
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
        <div class="flex flex-row gap-x-4 w-full">
          <a
              :href="stableUrl"
              class="w-1/2 flex flex-row items-center justify-center gap-3 bg-argon-button border border-argon-800 text-white rounded-lg md:text-2xl px-2 py-2 md:py-5 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap"
              style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);"
              @mouseenter="previewApp('operations')"
              @mouseleave="clearAppPreview"
              @focus="previewApp('operations')"
              @blur="clearAppPreview"
          >
            <ArgonotLogo class="w-10 h-10 relative -top-0.5 inline-block" />
            <span>Download Operations</span>
          </a>
          <a
            :href="stableUrl"
            class="w-1/2 flex flex-row items-center justify-center gap-3 bg-argon-button border border-argon-800 text-white rounded-lg md:text-2xl px-2 py-2 md:py-5 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap"
            style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);"
            @mouseenter="previewApp('treasury')"
            @mouseleave="clearAppPreview"
            @focus="previewApp('treasury')"
            @blur="clearAppPreview"
          >
            <ArgonLogo class="w-10 h-10 relative inline-block" />
            <span>Download Treasury</span>
          </a>
        </div>

        <p class="text-base md:text-xl text-justify opacity-70 mt-10 md:mt-16 leading-relaxed">
          Unlike most crypto networks, you can become a key player in Argon’s ecosystem without needing millions of
          dollars and complex systems. The Operations app makes it easy to start mining and vaulting without the need
          for expensive ASIC mining rigs or specialized cloud machines. The Treasury app gives you full access to all of
          the network's yield-bearing assets.
        </p>
      </div>

      <div class="w-[calc(75%-48px)] mx-auto h-px mt-18 bg-argon-400/20" />

      <div class="grid md:grid-cols-3 w-[75%] mx-auto text-center py-6 divide-x divide-argon-400/20 text-slate-400/80">
        <div as="div" to="/learn/mining-metrics/current-mining-apy" class="hover:text-argon-600/70 py-5">
          <div class="text-6xl font-bold">100</div>
          <div class="mt-2 font-light">Active Mining Seats</div>
        </div>
        <div as="div" to="/learn/vaulting-metrics/active-vaults" class="hover:text-argon-600/70 py-5">
          <div class="text-6xl font-bold">{{ data.vaulting.count }}</div>
          <div class="mt-2 font-light">Active Vaults</div>
        </div>
        <div as="div" to="/learn/vaulting-metrics/current-vaulting-apy" class="hover:text-argon-600/70 py-5">
          <div class="text-6xl font-bold">{{ numeral(data.vaulting.activeAPY).formatCapped('0,0', 9_999) }}%</div>
          <div class="mt-2 font-light">Active Bitcoin Txns</div>
        </div>
      </div>

      <div class="mx-12 h-px bg-argon-400/20" />

      <div class="grid md:grid-cols-4 w-full text-center py-6 divide-x divide-argon-400/20 text-slate-400/80">
        <div as="div" to="/learn/mining-metrics/active-mining-seats" class="hover:text-argon-600/70 py-5">
          <div class="text-6xl font-bold">{{ data.mining.activeSeatCount }}</div>
          <div class="mt-2 font-light">Mining APY</div>
        </div>
        <div as="div" to="/learn/mining-metrics/current-mining-apy" class="hover:text-argon-600/70 py-5">
          <div class="text-6xl font-bold">{{ numeral(data.mining.activeAPY).formatCapped('0,0', 9_999) }}%</div>
          <div class="mt-2 font-light">Treasury APY</div>
        </div>
        <div as="div" to="/learn/vaulting-metrics/active-vaults" class="hover:text-argon-600/70 py-5">
          <div class="text-6xl font-bold">{{ data.vaulting.count }}%</div>
          <div class="mt-2 font-light">Vaulting APY</div>
        </div>
        <div as="div" to="/learn/vaulting-metrics/current-vaulting-apy" class="hover:text-argon-600/70 py-5">
          <div class="text-6xl font-bold">{{ numeral(data.vaulting.activeAPY).formatCapped('0,0', 9_999) }}%</div>
          <div class="mt-2 font-light">Bitcoin APY</div>
        </div>
      </div>
    </section>

    <section class="relative flex flex-col bg-[var(--bg-color)] text-center">
      <h3 class="text-argon-600/70 font-bold text-xl pt-16 px-10 md:px-auto tracking-widest font-serif">
        BRIDGELESS & NATIVE
      </h3>
      <header class="text-6xl font-serif mt-5 leading-tight">
        ARGON AVOIDS THE RISK<br />
        OF CROSS-CHAIN BRIDGING
      </header>

      <div class="flex flex-col items-center w-10/12 max-w-260 mx-auto px-2.5">
        <p class="text-base md:text-xl text-justify opacity-70 mt-10 leading-relaxed">
          According to Chainalysis, cross-chain bridges are the single largest source of crypto hacks. Argon sidesteps
          this risk by integrating cross-chain in a bridgeless capacity. Minting Authorities are empowered to mint/burn
          argons native to each chain without knowledge of the other chain and without forcing collateral to be exposed
          across the bridges.  Learn more.
        </p>
      </div>

      <div class="w-[80%] mx-auto h-px mt-28 bg-argon-400/30" />

      <div class="w-[80%] mx-auto grid grid-cols-3 lg:grid-cols-4 space-y-5 text-center pt-16 pb-2 divide-x divide-argon-400/30 text-argon-600/70">
        <div class="hover:text-argon-600">
          <OptimismIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Optimism</div>
        </div>
        <div class="hover:text-argon-600">
          <PolygonIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Polygon</div>
        </div>
        <div class="hover:text-argon-600">
          <BaseIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Base</div>
        </div>
        <div class="hover:text-argon-600">
          <EthereumIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Ethereum</div>
        </div>
      </div>

      <div class="mx-12 h-px bg-argon-400/30" />

      <div class="grid grid-cols-3 lg:grid-cols-5 space-y-5 w-full text-center pt-16 pb-2 divide-x divide-argon-400/30 text-argon-600/70">
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

    <section class="relative flex flex-col bg-white items-center justify-center w-full pb-5 cursor-default text-center border-t border-argon-800/15 border-b border-b-argon-900/70" style="box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);">
      <h3 class="text-argon-600/70 font-bold text-xl pt-16 px-10 md:px-auto tracking-widest font-serif">
        LIQUID LOCKING
      </h3>
      <header class="text-6xl font-serif mt-5 leading-tight">
        ARGON TURNS BITCOIN<br />
        INTO A LOSS-PROTECTED,<br />
        YIELD-GENERATING ASSET
      </header>

      <div class="flex flex-col items-center w-10/12 max-w-260 mx-auto px-2.5">
        <p class="text-base md:text-xl text-justify opacity-70 mt-10 leading-relaxed">
          Liquid Locking lets Bitcoin holders unlock stable liquidity without selling their Bitcoin. Argon preserves
          the locked value, protects against downside volatility, and allows the position to keep earning yield — turning
          Bitcoin from a passive asset into productive capital.
        </p>
      </div>

      <div class="my-10">
        <img src="/bitcoin-flow.png" class="w-full mx-auto max-w-480 opacity-50" />
      </div>
    </section>

    <section HelpUsBootstrap class="text-white">
      <h3 class="text-argon-100/70 font-bold text-xl pt-16 px-10 md:px-auto tracking-widest font-serif text-center">
        TRILLION DOLLAR STABLECOIN
      </h3>
      <header class="font-serif mt-5 text-7xl leading-tight text-white text-center">
        <span class="text-6xl">JOIN US ON THE ADVENTURE TO</span><br />
        <span class="">REMAKE GLOBAL CURRENCY</span>
      </header>

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
        <router-link to="/launch-plan" class="flex flex-row items-center justify-center border border-white/30 hover:shadow-lg text-white rounded-md md:text-2xl w-full px-2 md:px-40 py-2 md:py-5 font-bold cursor-pointer hover:bg-argon-600 whitespace-nowrap">
          <span>Read Our Launch Plan</span>
        </router-link>
      </div>

    </section>

    <FooterBar :darkMode="true" />
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
import ChatgptIcon from '../assets/aimodels/chatgpt.svg?component';
import ClaudeIcon from '../assets/aimodels/claude.svg?component';
import GeminiIcon from '../assets/aimodels/gemini.svg?component';
import GrokIcon from '../assets/aimodels/grok.svg?component';
import LlamaIcon from '../assets/aimodels/llama.svg?component';
import MinstralIcon from '../assets/aimodels/minstral.svg?component';
import ArgonLogo from '../assets/logo.svg?component';
import ArgonotLogo from '../assets/argonot.svg?component';
import FooterBar from '../navigation/FooterBar.vue';
import TopBar from '../navigation/TopBar.vue';
import numeral, { microgonToArgonNm } from '@/lib/numeral';
import Data from "@/lib/Data";
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
