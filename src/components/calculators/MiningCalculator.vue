<template>
  <div v-if="!isLoaded">
    Loading...
  </div>
  <div v-else ref="runwayRef" class="calculator-runway">
    <div ref="shellRef" class="calculator-shell">
      <header class="calculator-header">
        <h2 class="border-b border-gray-500/50 px-5 py-4 text-white!">
          Mining Calculator
        </h2>
      </header>

      <div ref="middleRef" class="calculator-middle">
        <div ref="trackRef" class="calculator-track">
          <section class="calculator-starting">
            <div class="row-label flex flex-col">
              <span>Starting</span>
              <span>Configuration</span>
            </div>
            <div Output class="col-span-2 text-right">
              <div>
                Total Mining Seats =
                {{ seatCount }}
              </div>
              <div>
                Starting Argon Price =
                ₳1.00
              </div>
              <div>
                Starting Argonot Price =
                ₳{{ numeral(data.usdForArgonot / data.usdForArgon).format('0,0.00') }}
              </div>
            </div>
          </section>

          <section>
      <header class="flex flex-col">
        <div Number><span class="relative -top-px -left-px">1</span></div>
        <span>Expected</span>
        <span>Returns</span>
      </header>
      <div>
        <p>
          Changing this value changes your bid price (next section) based on the blockchain’s Immutable Mining Rewards (see below).
        </p>
        <SliderRoot
            v-model="expectedTDR"
            class="relative flex items-center select-none touch-none w-full h-5"
            :min="0"
            :max="maxExpectedReturn"
            :step="0.1"
        >
          <SliderTrack class="bg-argon-200/70 relative grow rounded-full h-2 shadow-inner" />
          <SliderThumb
              class="relative block w-6 h-6 bg-white rounded-full hover:bg-stone-50 shadow-sm focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
              aria-label="Volume"
          >
            <span class="slider-value-indicator">{{ expectedTDR[0] }}%</span>
          </SliderThumb>
        </SliderRoot>
        <div class="slider-endpoints">
          <span>0%</span>
          <span>{{ maxExpectedReturn }}%</span>
        </div>
      </div>
      <div Output>
        <div class="text-4xl font-bold">{{ expectedTDR[0] }}%</div>
        <div>Over Ten Days</div>
      </div>
          </section>

          <section>
      <header class="flex flex-col">
        <span>Mining Seat</span>
        <span>Auction</span>
      </header>
      <p>
        The only thing guaranteed from your mining bid is the Immutable Base Mining Rewards you'll receive over your ten days of mining. To change this bid, change the Expected Returns in the section above.
      </p>
      <div Output>
        <div class="font-bold uppercase">Submitted Bid</div>
        <div>{{ numeral(argonsBid).format('0,0.00') }} ARGN</div>
        <div>{{ numeral(argonotsBid).format('0,0.00') }} ARGNOT</div>
        <div class="border-t border-gray-500/50">₳{{ numeral(valueOfBid).format('0,0.00') }} Value</div>
      </div>
          </section>

          <section>
      <header class="flex flex-col">
        <span>Immutable Base</span>
        <span>Mining Rewards</span>
      </header>
      <p>
        This is an absolute number set in the Argon blockchain before the bidding starts. It cannot be changed, however there is a preset slippage range based on mathematical randomness.
      </p>
      <div Output>
        <div class="font-bold uppercase">Base Rewards</div>
        <div>{{ numeral(baseArgonRewards).format('0.[00]') }} ARGN</div>
        <div>{{ numeral(baseArgonotRewards).format('0.[00]') }} ARGNOT</div>
      </div>
          </section>

          <section>
      <header class="flex flex-col">
        <div Number><span class="relative -top-px -left-px">2</span></div>
        <span>Growth In Argon</span>
        <span>Circulation</span>
      </header>
      <div>
        <p class="pb-3">Whenever the market demand for Argons increase, miners are given the exclusive right to mint these new tokens.</p>
        <SliderRoot
            v-model="argonCirculationChange"
            class="relative flex items-center select-none touch-none w-full h-5"
            :min="-100"
            :max="100"
            :step="0.1"
        >
          <SliderTrack class="bg-argon-200/70 relative grow rounded-full h-2 shadow-inner" />
          <SliderThumb
              class="relative block w-6 h-6 bg-white rounded-full hover:bg-stone-50 shadow-sm focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
              aria-label="Volume"
          >
            <span class="slider-value-indicator">{{ argonCirculationChange[0] }}%</span>
          </SliderThumb>
        </SliderRoot>
        <div class="slider-endpoints">
          <span>-100%</span>
          <span>100%</span>
        </div>
      </div>
      <div Output>
        <div>+ {{ numeral(plusArgonMinted).formatIfElse('< 1000', '0.[00]', '0,0') }} ARGN</div>
      </div>
          </section>

          <section>
      <header class="flex flex-col">
        <div Number><span class="relative -top-px -left-px">3</span></div>
        <span>Price Change</span>
        <span>of Argonots</span>
      </header>
      <div>
        <p class="pb-3">Argonots fluctuate openly on free-market exchanges. This means the value of argonots staked
        on your bid and collected during mining can change your final profit.</p>
        <SliderRoot
            v-model="argonotPriceChange"
            class="relative flex items-center select-none touch-none w-full h-5"
            :min="-100"
            :max="100"
            :step="0.1"
        >
          <SliderTrack class="bg-argon-200/70 relative grow rounded-full h-2 shadow-inner" />
          <SliderThumb
              class="relative block w-6 h-6 bg-white rounded-full hover:bg-stone-50 shadow-sm focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
              aria-label="Volume"
          >
            <span class="slider-value-indicator">{{ argonotPriceChange[0] }}%</span>
          </SliderThumb>
        </SliderRoot>
        <div class="slider-endpoints">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
      <div Output>
        <div>{{ argonotValueChange < 0 ? '-' : '+'}} ₳{{ numeral(Math.abs(argonotValueChange)).format('0,0.[00]') }} Value</div>
      </div>
    </section>

    <section>
      <header class="flex flex-col">
        <span>Final Take</span>
        <span>Home Value</span>
      </header>
      <p>
        This calculates the final value of your Argons and Argonots from mining, which includes the growth of
        circulation and the price change of Argonots.
      </p>
      <div Output>
        <div class="font-bold uppercase">Actual Output</div>
        <div>{{ numeral(argonsTotal).format('0,0.00') }} ARGN</div>
        <div>{{ numeral(argonotsTotal).format('0,0.00') }} ARGNOT</div>
        <div class="border-t border-gray-500/50">₳{{ numeral(valueOfTotal).format('0,0.00') }} Value</div>
      </div>
          </section>
        </div>
      </div>

      <footer>
      <header class="flex flex-col">
        <span>Actual</span>
        <span>Returns</span>
      </header>
      <p>
        The difference between Actual Return versus Expected Return (see above) is based on Growth In Argon Circulation and Price Change of Argonots.
      </p>
      <div Output>
        <div class="text-4xl font-bold">{{ numeral(actualTDR).format('0,0') }}%</div>
        <div>Over Ten Days</div>
      </div>
      </footer>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as Vue from 'vue';
import BigNumber from 'bignumber.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import numeral from '@/lib/numeral';
import { SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { defaultBasicsRecord, type IBasicsRecord } from "@/interfaces/IBasicsRecord";
import Data, {NetworkName} from "@/lib/Data";
import {microgonToArgon, micronotToArgonot} from "@/lib/currencyUtils";

gsap.registerPlugin(ScrollTrigger);

const runwayRef = Vue.ref<HTMLElement | null>(null);
const shellRef = Vue.ref<HTMLElement | null>(null);
const middleRef = Vue.ref<HTMLElement | null>(null);
const trackRef = Vue.ref<HTMLElement | null>(null);
let gsapContext: gsap.Context | undefined;

const emit = defineEmits<{
  (e: 'updated', results: { expectedMiningTDR: number; actualMiningTDR: number, argonsBid: number, seatCount: number }): void;
}>();

const chainName = Vue.ref<NetworkName>(NetworkName.mainnet);
const data = Vue.ref<IBasicsRecord>(defaultBasicsRecord);
const isLoaded = Vue.ref(false);

const seatCount = Vue.ref(100);
const argonotsBid = Vue.ref(0);

const expectedTDR = Vue.ref([0]);
const argonCirculationChange = Vue.ref([5.00]);
const argonotPriceChange = Vue.ref([-6.00]);

const plusArgonMinted = Vue.computed(() => {
  const totalMinted = microgonToArgon(data.value.microgonsInCirculation) * (argonCirculationChange.value[0] / 100);
  const perSeat = totalMinted / seatCount.value;
  return Math.max(0, perSeat);
});

const baseArgonotRewards = Vue.computed(() => {
  const bn = BigNumber(data.value.mining.baseMicronotRewardsPerBlock)
      .dividedBy(1_000_000)
      .multipliedBy(14_400)
      .dividedBy(seatCount.value);
  return bn.toNumber();
});

const baseArgonRewards = Vue.computed(() => {
  const bn = BigNumber(data.value.mining.baseMicrogonRewardsPerBlock)
      .dividedBy(1_000_000)
      .multipliedBy(14_400)
      .dividedBy(seatCount.value);
  return bn.toNumber();
});

const argonsTotal = Vue.computed(() => {
  return baseArgonRewards.value + plusArgonMinted.value;
});

const argonotsTotal = Vue.computed(() => {
  return argonotsBid.value + baseArgonotRewards.value;
});

const argonotValueChange = Vue.computed(() => {
  const startingArgonotValue = argonotsTotal.value * data.value.usdForArgonot;
  return startingArgonotValue * (argonotPriceChange.value[0] / 100);
});

const valueOfTotal = Vue.computed(() => {
  const argonValue = argonsTotal.value * data.value.usdForArgon;
  const startingArgonotValue = argonotsTotal.value * data.value.usdForArgonot;
  return argonValue + startingArgonotValue + argonotValueChange.value;
});

const combinedRewardsValue = Vue.computed(() => (
  baseArgonRewards.value * data.value.usdForArgon
  + baseArgonotRewards.value * data.value.usdForArgonot
));

const argonotBidValue = Vue.computed(() => argonotsBid.value * data.value.usdForArgonot);
const maxExpectedReturn = Vue.computed(() => {
  if (argonotBidValue.value <= 0) return 999;
  const maximumReturn = (combinedRewardsValue.value / argonotBidValue.value) * 100;
  return Math.max(0, Math.min(999, Math.floor(maximumReturn)));
});

const argonsBid = Vue.computed(() => {
  if (data.value.usdForArgon <= 0) return 0;
  const endingValue = combinedRewardsValue.value + argonotBidValue.value;
  const targetBidValue = endingValue / (1 + expectedTDR.value[0] / 100);
  return Math.max(0, (targetBidValue - argonotBidValue.value) / data.value.usdForArgon);
});

const valueOfBid = Vue.computed(() => {
  const argonValue = argonsBid.value * data.value.usdForArgon;
  const argonotValue = argonotsBid.value * data.value.usdForArgonot;
  return argonValue + argonotValue;
});

const actualTDR = Vue.computed(() => {
  if (valueOfBid.value <= 0) return 0;
  return ((valueOfTotal.value - valueOfBid.value) / valueOfBid.value) * 100;
});

Vue.watch([() => expectedTDR.value[0], actualTDR, argonsBid, seatCount], ([expectedMiningTDR, actualMiningTDR, argonsBid, seatCount]) => {
  emit('updated', {
    expectedMiningTDR: expectedMiningTDR,
    actualMiningTDR: actualMiningTDR,
    argonsBid,
    seatCount
  });
});

Vue.watchEffect(() => {
  if (expectedTDR.value[0] > maxExpectedReturn.value) {
    expectedTDR.value = [maxExpectedReturn.value];
  }
});

async function loadData() {
  data.value = await Data.fetchBasics(chainName.value);
  argonotsBid.value = micronotToArgonot(data.value.mining.currentMicronotsForBid);
  expectedTDR.value = [Math.floor(data.value.miningTDR)];
  seatCount.value = data.value.mining.nextEpochSeatCount;
}

Vue.onMounted(async () => {
  await loadData();
  isLoaded.value = true;
  await Vue.nextTick();

  if (!runwayRef.value || !shellRef.value || !middleRef.value || !trackRef.value) return;

  const scrollDistance = () => Math.max(0, trackRef.value!.scrollHeight - middleRef.value!.clientHeight);

  gsapContext = gsap.context(() => {
    gsap.to(trackRef.value, {
      y: () => -scrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: runwayRef.value,
        start: 'top 10px',
        end: () => `+=${scrollDistance()}`,
        pin: shellRef.value,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }, runwayRef.value);

  ScrollTrigger.refresh();
});

Vue.onUnmounted(() => {
  gsapContext?.revert();
});
</script>

<style scoped>
@import "../../main.css";

.calculator-shell {
  @apply grid h-[calc(100dvh-20px)] min-h-0 overflow-hidden bg-gray-900;
  container-type: inline-size;
  grid-template-rows: auto minmax(0, 1fr) auto;
}

.calculator-header,
footer {
  @apply relative z-10 mt-0 bg-gray-900;
}

.calculator-header h2 {
  @apply mt-0 mb-0;
}

.calculator-middle {
  @apply min-h-0 overflow-hidden;
}

section, footer {
  @apply grid grid-cols-[160px_minmax(0,1fr)_160px] border-b border-gray-500/50 py-4 px-5 items-center;
}
p {
  @apply opacity-60 mb-0;
}
.row-label,
section > header,
footer > header {
  @apply relative font-bold;
  div[Number] {
    @apply absolute top-1/2 -translate-y-1/2 -translate-[150%] text-xl bg-argon-500 border border-argon-900 shadow-xl text-white rounded-full w-7 h-7 flex items-center justify-center;
  }
}
div[Output] {
  @apply flex flex-col justify-end text-right pl-7;
}

.slider-value-indicator {
  @apply pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-stone-100! px-2 py-1 text-xs font-bold text-slate-800 shadow-sm;
}
.slider-value-indicator::after {
  content: '';
  @apply absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-stone-100;
}
.slider-endpoints {
  @apply mt-0 flex justify-between text-xs text-stone-400;
}
.slider-endpoints span {
  @apply relative pt-1;
}
.slider-endpoints span::before {
  content: '';
  @apply absolute top-0 h-1.5 w-px bg-stone-400;
}
.slider-endpoints span:first-child::before {
  @apply left-0;
}
.slider-endpoints span:last-child::before {
  @apply right-0;
}

@container (max-width: 639px) {
  section, footer {
    @apply grid-cols-1 gap-3 px-4;
  }

  .calculator-starting div[Output] {
    @apply col-span-1;
  }

  div[Output] {
    @apply pl-0 text-left;
  }

  section > header div[Number] {
    @apply static mr-2 inline-flex translate-x-0 translate-y-0 align-middle;
  }
}
</style>
