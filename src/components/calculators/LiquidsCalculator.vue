<template>
  <div v-if="!isLoaded">Loading...</div>
  <div v-else ref="runwayRef" class="calculator-runway text-white! mt-5 mb-10">
    <div
      class="calculator-shell bg-[color-mix(in_oklab,var(--color-gray-700)_35%,var(--color-gray-800))]"
      :style="{
        paddingBottom: `${footerHeight}px`,
        '--calculator-header-height': `${headerHeight}px`,
      }"
    >
      <header ref="headerRef" class="calculator-header relative z-20 mt-0">
        <div class="pointer-events-none absolute z-0 -top-5 left-0 bottom-1 w-full bg-[var(--bg-color)]" />
        <div class="pointer-events-none absolute z-0 -top-5 -left-10 -bottom-5 w-10 bg-linear-to-t from-transparent to-[20px] to-[var(--bg-color)]" />
        <div class="pointer-events-none absolute z-20 top-[calc(100%-4px)] left-0 h-4 w-full bg-linear-to-b from-gray-800 to-transparent" />
        <div class="relative z-10 overflow-hidden pb-1">
          <h3
            class="mt-0! mb-0! border-b border-gray-500/50 px-5 py-4 text-white! rounded-t-lg bg-gray-800"
            style="box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5)"
          >
            Bitcoin Liquids Calculator
          </h3>
        </div>
      </header>

      <footer ref="footerRef" aria-label="Bitcoin Liquid return summary" class="relative z-10 w-full">
        <div class="pointer-events-none absolute z-0 -bottom-5 left-0 top-1 w-full bg-[var(--bg-color)]" />
        <div class="pointer-events-none absolute z-0 -bottom-5 -left-10 -top-5 w-10 bg-linear-to-b from-transparent to-[20px] to-[var(--bg-color)]" />
        <div class="pointer-events-none absolute z-20 bottom-[calc(100%-4px)] left-0 h-4 w-full bg-linear-to-t from-gray-800 to-transparent" />

        <div class="relative z-10 overflow-hidden pt-1 w-full">
          <div
            class="grid w-full grid-cols-3! items-stretch gap-2 rounded-b-lg border-t border-gray-600 bg-gray-800 p-2 sm:gap-3 sm:p-3"
            style="box-shadow: 0 -1px 2px rgba(0, 0, 0, 1)"
          >
            <div class="min-w-0 rounded-md bg-white/5 px-2 py-2 sm:px-4 sm:py-3">
              <div class="mt-1 whitespace-nowrap text-xl font-bold sm:text-3xl">
                {{ numeral(traditionalBitcoinReturn).format("0,0.[00]") }}%
              </div>
              <div class="mt-1 text-[13px] uppercase leading-tight text-white/50">Bitcoin APR Return</div>
            </div>

            <div class="min-w-0 rounded-md bg-gradient-to-br from-argon-500/20 to-argon-500/40 px-2 py-2 text-center sm:px-4 sm:py-3">
              <div class="mt-1 whitespace-nowrap text-xl font-bold sm:text-3xl">
                ₳{{ numeral(modeledLiquidProfits).formatIfElse('< 10_000', '0,0.00', '0,0') }}
              </div>
              <div class="mt-1 text-[13px] uppercase leading-tight text-white/60">Modeled Liquid Profits</div>
            </div>

            <div class="min-w-0 rounded-md bg-white/5 px-2 py-2 text-right sm:px-4 sm:py-3">
              <div class="mt-1 whitespace-nowrap text-xl font-bold sm:text-3xl">
                {{ numeral(combinedOneYearReturn).format("0,0.[00]") }}%
              </div>
              <div class="mt-1 text-[13px] uppercase leading-tight text-white/50">Modeled APR Return</div>
            </div>
          </div>
        </div>
      </footer>

      <div class="calculator-middle">
        <div ref="trackRef" class="calculator-track">
          <section class="calculator-network-stats grid-cols-[max-content_minmax(0,1fr)_max-content_minmax(0,1fr)]! gap-x-4 gap-y-2 text-white/60 @max-sm:grid-cols-[minmax(0,1fr)_auto]!">
            <header class="col-span-full">Current Stats From Mainnet</header>
            <div>Starting ARGN Price</div>
            <div class="text-left font-bold">₳{{ usdToArgonNm(data.usdForArgon).format("0.00") }}</div>
            <div>Starting ARGNOT Price</div>
            <div class="text-left font-bold">₳{{ usdToArgonNm(data.usdForArgonot).format("0,0.00") }}</div>
            <div>Total Active Mining Seats</div>
            <div class="text-left font-bold">{{ seatCount }}</div>
            <div>Mining Seat Return</div>
            <div class="text-left font-bold">
              {{ numeral(data.miningTDR).formatIfElse("< 1_000", "0.[0]", "0,0") }}%
            </div>
            <div>Current BTC Price</div>
            <div class="text-left font-bold">${{ numeral(data.usdForBtc).format("0,0.00") }}</div>
            <div>Active Liquid Principal</div>
            <div class="text-left font-bold">{{ numeral(activeLiquidPrincipal).format("0,0") }} ARGN</div>
          </section>

          <section>
            <div class="calculator-grid-row">
              <header class="flex flex-col">
                <div Number>
                  <span class="relative -top-px -left-px">1</span>
                </div>
                <span>Bitcoin Amount</span>
                <span>for the Liquid</span>
              </header>
              <div>
                <SliderRoot
                  v-model="bitcoinAmount"
                  class="relative flex h-5 w-full touch-none items-center select-none"
                  :min="0"
                  :max="1"
                  :step="0.001"
                >
                  <SliderTrack class="relative h-2.5 grow overflow-hidden rounded-full border border-neutral-900 bg-neutral-200/40 shadow-inner">
                    <SliderRange class="absolute h-full rounded-full bg-argon-200" />
                  </SliderTrack>
                  <SliderThumb
                    class="relative block h-6 w-6 rounded-full bg-white shadow-sm hover:bg-stone-50 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
                    aria-label="Bitcoin used for the Liquid"
                  >
                    <span class="slider-value-indicator">{{ numeral(bitcoinAmount[0]).format("0,0.[000]") }} BTC</span>
                  </SliderThumb>
                </SliderRoot>
                <div class="slider-endpoints">
                  <span>0 BTC</span>
                  <span>1 BTC</span>
                </div>
              </div>
              <div Output>
                <div class="text-4xl font-bold">₳{{ numeral(bitcoinMarketValueInArgons).format("0,0") }}</div>
                <div>Market Value</div>
              </div>
            </div>
            <div class="calculator-grid-row mt-5 items-start!">
              <header />
              <div>
                <p>
                  The selected Bitcoin remains in its native Lock while its market value determines the modeled size of
                  the Liquid position.
                </p>
              </div>
              <div class="font-light text-right">
                <button
                  type="button"
                  class="text-argon-100"
                  :class="bitcoinAmount[0] === DEFAULT_BITCOIN_AMOUNT ? 'opacity-30' : 'cursor-pointer'"
                  @click="resetBitcoinAmount"
                >
                  Reset to 0.1 BTC
                </button>
              </div>
            </div>
          </section>

          <section>
            <div class="calculator-grid-row">
              <header class="flex flex-col">
                <div Number>
                  <span class="relative -top-px -left-px">2</span>
                </div>
                <span>Ratcheting</span>
                <span>Threshold</span>
              </header>
              <div>
                <SliderRoot
                  :model-value="ratchetChange"
                  @update:model-value="updateRatchetChange"
                  class="relative flex h-5 w-full touch-none items-center select-none"
                  :min="0"
                  :max="100"
                  :step="0.1"
                >
                  <SliderTrack class="relative h-2.5 grow overflow-hidden rounded-full border border-neutral-900 bg-neutral-200/40 shadow-inner">
                    <SliderRange class="absolute h-full rounded-full bg-argon-200" />
                  </SliderTrack>
                  <SliderThumb
                    class="relative block h-6 w-6 rounded-full bg-white shadow-sm hover:bg-stone-50 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
                    aria-label="Bitcoin price change required to ratchet"
                  >
                    <span class="slider-value-indicator">{{ numeral(ratchetChange[0]).format("0,0.[0]") }}% Change</span>
                  </SliderThumb>
                </SliderRoot>
                <div class="slider-endpoints">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
              <div Output>
                <div class="text-4xl font-bold">{{ ratchetResult.ratchetCount }}</div>
                <div>Ratchets</div>
              </div>
            </div>
            <div class="calculator-grid-row mt-5 items-start!">
              <header />
              <div>
                <p>
                  The model replays the last year of Bitcoin prices and ratchets whenever BTC moves this far from its
                  most recent ratchet price. Upward ratchets provide full liquidity until total ARGN received reaches
                  the current market value, then provide 50% liquidity above it.
                </p>
              </div>
              <div class="font-light text-right">
                <button
                  type="button"
                  class="text-argon-100"
                  :class="ratchetChange[0] === DEFAULT_RATCHET_CHANGE ? 'opacity-30' : 'cursor-pointer'"
                  @click="resetRatchetChange"
                >
                  Reset to 10%
                </button>
              </div>
            </div>
          </section>

          <section>
            <div class="calculator-grid-row">
              <header class="flex flex-col">
                <div Number>
                  <span class="relative -top-px -left-px">3</span>
                </div>
                <span>Argonot</span>
                <span>Market Price</span>
              </header>
              <div>
                <SliderRoot
                  v-model="customArgonotPrice"
                  class="relative flex items-center select-none touch-none w-full h-5"
                  :min="0.01"
                  :max="1000"
                  :step="0.01"
                >
                  <SliderTrack class="relative h-2.5 grow overflow-hidden rounded-full border border-neutral-900 bg-neutral-200/40 shadow-inner">
                    <SliderRange class="absolute h-full rounded-full bg-argon-200" />
                  </SliderTrack>
                  <SliderThumb
                    class="relative block w-6 h-6 bg-white rounded-full hover:bg-stone-50 shadow-sm focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
                    aria-label="Argonot market price"
                  >
                    <span class="slider-value-indicator">₳{{ numeral(customArgonotPrice[0]).format("0,0.00") }}</span>
                  </SliderThumb>
                </SliderRoot>
                <div class="slider-endpoints">
                  <span>₳0.01</span>
                  <span>₳1,000</span>
                </div>
              </div>
              <div Output>
                <div class="text-4xl font-bold">
                  ₳{{ numeral(customArgonotPrice[0]).formatIfElse("< 1000", "0.[00]", "0,0") }}
                </div>
                <div>Market Price</div>
              </div>
            </div>
            <div class="calculator-grid-row mt-5 items-start!">
              <header />
              <div>
                <p>
                  The market price of Argonots affects the cost of mining bids, which in turn affects the revenue shared
                  with Bitcoin Liquids.
                </p>
              </div>
              <div class="font-light text-right">
                <button
                  type="button"
                  class="text-argon-100"
                  :class="{
                    'opacity-30':
                      customArgonotPrice[0] === (data.usdForArgon > 0 ? data.usdForArgonot / data.usdForArgon : 0),
                    'cursor-pointer':
                      customArgonotPrice[0] !== (data.usdForArgon > 0 ? data.usdForArgonot / data.usdForArgon : 0),
                  }"
                  @click="resetCustomArgonotPrice"
                >
                  Reset to Mainnet
                </button>
              </div>
            </div>
          </section>

          <section>
            <div class="calculator-grid-row">
              <header class="flex flex-col">
                <div Number>
                  <span class="relative -top-px -left-px">4</span>
                </div>
                <span>Growth In Argon</span>
                <span>Circulation</span>
              </header>
              <div>
                <SliderRoot
                  v-model="argonCirculationChange"
                  class="relative flex h-5 w-full touch-none items-center select-none"
                  :min="-100"
                  :max="100"
                  :step="0.1"
                >
                  <SliderTrack class="relative h-2.5 grow overflow-hidden rounded-full border border-neutral-900 bg-neutral-200/40 shadow-inner">
                    <div
                      aria-hidden="true"
                      class="absolute h-full rounded-full bg-argon-200"
                      :style="{
                        left: `${Math.min(50, 50 + argonCirculationChange[0] / 2)}%`,
                        width: `${Math.abs(argonCirculationChange[0]) / 2}%`,
                      }"
                    />
                  </SliderTrack>
                  <SliderThumb
                    class="relative block h-6 w-6 rounded-full bg-white shadow-sm hover:bg-stone-50 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
                    aria-label="Growth in Argon circulation"
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
                <div class="text-4xl font-bold">
                  +{{ numeral(plusArgonMinted).formatIfElse("< 1000", "0.[00]", "0,0") }}
                </div>
                <div>ARGN Per Seat</div>
              </div>
            </div>
            <div class="calculator-grid-row mt-5 items-start!">
              <header />
              <div>
                <p>
                  Whenever the market demand for Argons increase, miners are given the exclusive right to mint these new
                  tokens.
                </p>
              </div>
              <div class="font-light text-right">
                <button
                  type="button"
                  class="text-argon-100"
                  :class="argonCirculationChange[0] === 0 ? 'opacity-30' : 'cursor-pointer'"
                  @click="resetArgonCirculationChange"
                >
                  Reset to Zero
                </button>
              </div>
            </div>
          </section>

          <section>
            <div class="calculator-grid-row">
              <header class="flex flex-col">
                <div Number>
                  <span class="relative -top-px -left-px">5</span>
                </div>
                <span>Expected Return</span>
                <span>Per Mining Seat</span>
              </header>
              <div>
                <SliderRoot
                  :model-value="expectedTDR"
                  @update:model-value="updateExpectedTDR"
                  class="relative flex items-center select-none touch-none w-full h-5 mt-2"
                  :min="0"
                  :max="MAX_EXPECTED_RETURN"
                  :step="0.1"
                >
                  <SliderTrack class="relative h-2.5 grow overflow-hidden rounded-full border border-neutral-900 bg-neutral-200/40 shadow-inner">
                    <SliderRange class="absolute h-full rounded-full bg-argon-200" />
                  </SliderTrack>
                  <SliderThumb
                    class="relative block w-6 h-6 bg-white rounded-full hover:bg-stone-50 shadow-sm focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
                    aria-label="Expected return per mining seat"
                  >
                    <span class="slider-value-indicator flex flex-col">
                      <span>{{ expectedTDR[0] }}% Over Ten Days</span>
                      <span>₳{{ usdToArgonNm(valueOfBid).format("0,0.00") }} Per Seat</span>
                    </span>
                  </SliderThumb>
                </SliderRoot>
                <div class="slider-endpoints">
                  <span>0%</span>
                  <span>{{ MAX_EXPECTED_RETURN }}%</span>
                </div>
              </div>
              <div Output>
                <div class="text-4xl font-bold">
                  {{ numeral(expectedTDR[0]).formatIfElse("< 1_000", "0.[0]", "0,0") }}%
                </div>
                <div>Over Ten Days</div>
              </div>
            </div>
            <div class="calculator-grid-row mt-10 items-start!">
              <header />
              <div>
                <p>
                  Changing this slider changes the Submitted Bid. The lower the mining-seat return, the higher the bid
                  and the more revenue available to Bitcoin Liquids.
                </p>
                <div class="flex flex-row w-full gap-x-5 opacity-60 mt-4 font-mono">
                  <div class="w-1/2">
                    <div class="font-bold uppercase py-1">Submitted Bid</div>
                    <div class="border-t border-gray-500 py-1">{{ numeral(argonsBid).format("0,0.00") }} ARGN</div>
                    <div class="border-t border-gray-500 py-1">{{ numeral(argonotsBid).format("0,0.00") }} ARGNOT</div>
                    <div class="border-t-2 border-gray-400 font-bold py-1">
                      ₳{{ usdToArgonNm(valueOfBid).format("0,0.00") }} Bid Cost
                    </div>
                  </div>
                  <div class="w-1/2">
                    <div class="font-bold uppercase py-1">
                      {{ argonCirculationChange[0] > 0 ? "Final Takeaway" : "Minimum Takeaway" }}
                    </div>
                    <div class="border-t border-gray-500 py-1">
                      {{ numeral(baseArgonRewards + plusArgonMinted).format("0.[00]") }}
                      ARGN
                    </div>
                    <div class="border-t border-gray-500 py-1">
                      {{ numeral(argonotsTotal).format("0.[00]") }} ARGNOT
                    </div>
                    <div class="border-t-2 border-gray-400 font-bold py-1">
                      ₳{{ usdToArgonNm(expectedValueOfSeat).format("0,0.00") }}
                      Return Value
                    </div>
                  </div>
                </div>
              </div>
              <div class="font-light text-right">
                <button
                  type="button"
                  class="text-argon-100"
                  :class="expectedTDR[0] === Math.floor(data.miningTDR * 10) / 10 ? 'opacity-30' : 'cursor-pointer'"
                  @click="resetExpectedTDR"
                >
                  Reset to Mainnet
                </button>
              </div>
            </div>
          </section>

          <section>
            <div class="calculator-grid-row">
              <header class="flex flex-col">
                <div Number>
                  <span class="relative -top-px -left-px">6</span>
                </div>
                <span>Profit Split</span>
                <span>for Liquids</span>
              </header>
              <div>
                <SliderRoot
                  :model-value="liquidProfitSplit"
                  @update:model-value="updateLiquidProfitSplit"
                  class="relative flex items-center select-none touch-none w-full h-5"
                  :min="0"
                  :max="5"
                  :step="0.01"
                >
                  <SliderTrack class="relative h-2.5 grow overflow-hidden rounded-full border border-neutral-900 bg-neutral-200/40 shadow-inner">
                    <SliderRange class="absolute h-full rounded-full bg-argon-200" />
                  </SliderTrack>
                  <SliderThumb
                    class="relative block w-6 h-6 bg-white rounded-full hover:bg-stone-50 shadow-sm focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
                    aria-label="Profit split for Bitcoin Liquids"
                  >
                    <span class="slider-value-indicator">{{ numeral(liquidProfitSplit[0]).format("0,0.00") }}%</span>
                  </SliderThumb>
                </SliderRoot>
                <div class="slider-endpoints">
                  <span>0%</span>
                  <span>5%</span>
                </div>
              </div>
              <div Output>
                <div class="text-4xl font-bold">{{ numeral(liquidProfitSplit[0]).format("0,0.00") }}%</div>
                <div>Of Revenue</div>
              </div>
            </div>
            <div class="calculator-grid-row my-5 items-start!">
              <header />
              <div>
                <p>
                  Bitcoin Liquids earn 3% of eligible vaulting revenue by default. Vault operators can offer a higher
                  split, up to 5%, to attract Bitcoin capital.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as Vue from "vue";
import BigNumber from "bignumber.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { BitcoinPrices } from "@argonprotocol/apps-core";
import numeral, { usdToArgonNm } from "@/lib/numeral";
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui";
import { type IBasicsRecord } from "@/interfaces/IBasicsRecord";
import Data from "@/lib/Data";
import {
  BITCOIN_LIQUID_SCENARIO_UNIT_SCALE,
  calculateBitcoinLiquidRatchetReturn,
} from "@/lib/bitcoinLiquidReturns";
import { microgonToArgon, micronotToArgonot } from "@/lib/currencyUtils";

gsap.registerPlugin(ScrollTrigger);
dayjs.extend(utc);

const DEFAULT_BITCOIN_AMOUNT = 0.1;
const DEFAULT_RATCHET_CHANGE = 10;
const MIN_RATCHET_CHANGE = 5;
const MAX_RATCHET_CHANGE = 100;
const DEFAULT_LIQUID_PROFIT_SPLIT = 3;
const MAX_LIQUID_PROFIT_SPLIT = 5;
const RATCHET_FLAT_FEE = 2;
const RATCHET_PERCENTAGE_FEE = 5;
const BITCOIN_CAPACITY_RATE = 0.15;
const TEN_DAY_PERIODS_PER_YEAR = 365 / 10;
const MAX_EXPECTED_RETURN = 100;
const STICKY_VIEWPORT_INSET = 10;

const runwayRef = Vue.ref<HTMLElement | null>(null);
const headerRef = Vue.ref<HTMLElement | null>(null);
const trackRef = Vue.ref<HTMLElement | null>(null);
const footerRef = Vue.ref<HTMLElement | null>(null);
const headerHeight = Vue.ref(76);
const footerHeight = Vue.ref(0);
let gsapContext: gsap.Context | undefined;
let layoutResizeObserver: ResizeObserver | undefined;

const data = Vue.ref<IBasicsRecord>(Data.basics);
const isLoaded = Vue.ref(false);

const seatCount = Vue.ref(100);
const argonotsBid = Vue.ref(0);

const expectedTDR = Vue.ref([0]);
const customArgonotPrice = Vue.ref([0]);
const argonCirculationChange = Vue.ref([0]);
const bitcoinAmount = Vue.ref([DEFAULT_BITCOIN_AMOUNT]);
const ratchetChange = Vue.ref([DEFAULT_RATCHET_CHANGE]);
const liquidProfitSplit = Vue.ref([DEFAULT_LIQUID_PROFIT_SPLIT]);

const oneYearBitcoinPrices = new BitcoinPrices().getDateRange(
  dayjs.utc().subtract(1, "year").format("YYYY-MM-DD"),
  dayjs.utc().format("YYYY-MM-DD"),
);

const traditionalBitcoinReturn = Vue.computed(() => {
  const startingPrice = oneYearBitcoinPrices[0]?.price ?? 0;
  const endingPrice = oneYearBitcoinPrices[oneYearBitcoinPrices.length - 1]?.price ?? 0;
  if (startingPrice <= 0) return 0;
  return ((endingPrice - startingPrice) / startingPrice) * 100;
});

const ratchetResult = Vue.computed(() => {
  if (bitcoinAmount.value[0] <= 0) {
    return {
      percent: 0,
      totalProfits: 0n,
      eligibleCapitalInvested: 0n,
      ratchetCount: 0,
    };
  }

  return calculateBitcoinLiquidRatchetReturn({
    prices: oneYearBitcoinPrices.map(priceRow => ({
      date: priceRow.date,
      price: priceRow.price * bitcoinAmount.value[0],
    })),
    flatFee: RATCHET_FLAT_FEE,
    percentageFee: RATCHET_PERCENTAGE_FEE,
    ratchetThreshold: ratchetChange.value[0] / 100,
  });
});

const bitcoinMarketValueInArgons = Vue.computed(() => {
  if (data.value.usdForArgon <= 0) return 0;
  return (bitcoinAmount.value[0] * data.value.usdForBtc) / data.value.usdForArgon;
});

const activeLiquidPrincipal = Vue.computed(() => microgonToArgon(data.value.microgonsInCirculation.fromBitcoin));

const customArgonotPriceUsd = Vue.computed(() => customArgonotPrice.value[0] * data.value.usdForArgon);
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

const plusArgonMinted = Vue.computed(() => {
  if (seatCount.value <= 0) return 0;
  const totalMinted =
    microgonToArgon(data.value.microgonsInCirculation.total) * (argonCirculationChange.value[0] / 100);
  return Math.max(0, totalMinted / seatCount.value);
});

const argonotsTotal = Vue.computed(() => {
  return argonotsBid.value + baseArgonotRewards.value;
});

const combinedRewardsValue = Vue.computed(
  () =>
    (baseArgonRewards.value + plusArgonMinted.value) * data.value.usdForArgon +
    baseArgonotRewards.value * customArgonotPriceUsd.value,
);

const argonotBidValue = Vue.computed(() => argonotsBid.value * customArgonotPriceUsd.value);
const maxAllowedExpectedReturn = Vue.computed(() => {
  if (argonotBidValue.value <= 0) return MAX_EXPECTED_RETURN;
  const zeroArgonBidReturn = (combinedRewardsValue.value / argonotBidValue.value) * 100;
  return Math.max(0, Math.min(MAX_EXPECTED_RETURN, Math.ceil(zeroArgonBidReturn * 10) / 10));
});

const argonsBid = Vue.computed(() => {
  if (data.value.usdForArgon <= 0) return 0;
  const endingValue = combinedRewardsValue.value + argonotBidValue.value;
  const targetBidValue = endingValue / (1 + expectedTDR.value[0] / 100);
  return Math.max(0, (targetBidValue - argonotBidValue.value) / data.value.usdForArgon);
});

const valueOfBid = Vue.computed(() => {
  const argonValue = argonsBid.value * data.value.usdForArgon;
  const argonotValue = argonotsBid.value * customArgonotPriceUsd.value;
  return argonValue + argonotValue;
});

const expectedValueOfSeat = Vue.computed(() => combinedRewardsValue.value + argonotBidValue.value);

const desiredBtcSpaceInArgons = Vue.computed(() =>
  Math.max(
    microgonToArgon(data.value.microgonsInCirculation.fromMining) * BITCOIN_CAPACITY_RATE,
    microgonToArgon(data.value.microgonsInCirculation.fromBitcoin),
  ),
);

const totalBitcoinAfterPosition = Vue.computed(() => data.value.vaulting.bitcoinLocked + bitcoinAmount.value[0]);

const lockedBitcoinValueInArgons = Vue.computed(() => {
  if (data.value.usdForArgon <= 0) return 0;
  return (totalBitcoinAfterPosition.value * data.value.usdForBtc) / data.value.usdForArgon;
});

const liquidEligibilityFactor = Vue.computed(() => {
  if (desiredBtcSpaceInArgons.value <= 0) return 0;
  return Math.min(1, lockedBitcoinValueInArgons.value / desiredBtcSpaceInArgons.value);
});

const payoutToLiquidsEveryTenDays = Vue.computed(
  () => argonsBid.value * seatCount.value * liquidEligibilityFactor.value * (liquidProfitSplit.value[0] / 100),
);

const selectedLiquidEarnings = Vue.computed(() => {
  if (totalBitcoinAfterPosition.value <= 0 || bitcoinAmount.value[0] <= 0) return 0;
  const selectedShare = bitcoinAmount.value[0] / totalBitcoinAfterPosition.value;
  return payoutToLiquidsEveryTenDays.value * selectedShare;
});

const oneYearMiningEarnings = Vue.computed(() => selectedLiquidEarnings.value * TEN_DAY_PERIODS_PER_YEAR);

const ratchetProfitUsd = Vue.computed(
  () => Number(ratchetResult.value.totalProfits) / BITCOIN_LIQUID_SCENARIO_UNIT_SCALE,
);

const modeledLiquidProfits = Vue.computed(() => {
  if (data.value.usdForArgon <= 0) return oneYearMiningEarnings.value;
  return oneYearMiningEarnings.value + ratchetProfitUsd.value / data.value.usdForArgon;
});

const combinedOneYearReturn = Vue.computed(() => {
  const startingCapitalUsd =
    Number(ratchetResult.value.eligibleCapitalInvested) / BITCOIN_LIQUID_SCENARIO_UNIT_SCALE;
  if (startingCapitalUsd <= 0) return 0;

  return ((modeledLiquidProfits.value * data.value.usdForArgon) / startingCapitalUsd) * 100;
});

Vue.watchEffect(() => {
  if (expectedTDR.value[0] > maxAllowedExpectedReturn.value) {
    expectedTDR.value = [maxAllowedExpectedReturn.value];
  }
});

async function loadData() {
  argonotsBid.value = micronotToArgonot(data.value.mining.currentMicronotsForBid);
  seatCount.value = data.value.mining.nextEpochSeatCount;
  resetCustomArgonotPrice();
  resetExpectedTDR();
}

function resetCustomArgonotPrice() {
  customArgonotPrice.value = [data.value.usdForArgon > 0 ? data.value.usdForArgonot / data.value.usdForArgon : 0];
}

function resetExpectedTDR() {
  expectedTDR.value = [Math.min(MAX_EXPECTED_RETURN, Math.floor(data.value.miningTDR * 10) / 10)];
}

function updateExpectedTDR(values: number[] | undefined) {
  expectedTDR.value = [Math.max(0, Math.min(maxAllowedExpectedReturn.value, values?.[0] ?? expectedTDR.value[0]))];
}

function resetArgonCirculationChange() {
  argonCirculationChange.value = [0];
}

function resetBitcoinAmount() {
  bitcoinAmount.value = [DEFAULT_BITCOIN_AMOUNT];
}

function updateRatchetChange(values: number[] | undefined) {
  ratchetChange.value = [
    Math.min(MAX_RATCHET_CHANGE, Math.max(MIN_RATCHET_CHANGE, values?.[0] ?? DEFAULT_RATCHET_CHANGE)),
  ];
}

function resetRatchetChange() {
  ratchetChange.value = [DEFAULT_RATCHET_CHANGE];
}

function updateLiquidProfitSplit(values: number[] | undefined) {
  liquidProfitSplit.value = [
    Math.min(
      MAX_LIQUID_PROFIT_SPLIT,
      Math.max(DEFAULT_LIQUID_PROFIT_SPLIT, values?.[0] ?? DEFAULT_LIQUID_PROFIT_SPLIT),
    ),
  ];
}

Vue.onMounted(async () => {
  await loadData();
  isLoaded.value = true;
  await Vue.nextTick();

  if (!runwayRef.value) return;

  const pendingImages = Array.from(runwayRef.value.closest(".DocContent")?.querySelectorAll("img") ?? []).filter(
    (image) => !image.complete,
  );

  await Promise.all(
    pendingImages.map(
      (image) =>
        new Promise<void>((resolve) => {
          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  );

  if (!runwayRef.value || !headerRef.value || !trackRef.value || !footerRef.value) return;

  const syncLayoutMetrics = () => {
    if (!headerRef.value || !footerRef.value) return;

    const nextHeaderHeight = headerRef.value.offsetHeight;
    const nextFooterHeight = footerRef.value.offsetHeight;
    if (headerHeight.value === nextHeaderHeight && footerHeight.value === nextFooterHeight) return;

    headerHeight.value = nextHeaderHeight;
    footerHeight.value = nextFooterHeight;
    if (gsapContext) Vue.nextTick(() => ScrollTrigger.refresh());
  };

  syncLayoutMetrics();
  await Vue.nextTick();

  layoutResizeObserver = new ResizeObserver(syncLayoutMetrics);
  layoutResizeObserver.observe(headerRef.value);
  layoutResizeObserver.observe(footerRef.value);

  gsapContext = gsap.context(() => {
    ScrollTrigger.create({
      trigger: footerRef.value,
      refreshPriority: 1,
      start: `bottom bottom-=${STICKY_VIEWPORT_INSET}px`,
      endTrigger: trackRef.value,
      end: () => `bottom bottom-=${footerRef.value!.offsetHeight + STICKY_VIEWPORT_INSET}px`,
      pin: footerRef.value,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });

    ScrollTrigger.create({
      trigger: headerRef.value,
      refreshPriority: 1,
      start: `top ${STICKY_VIEWPORT_INSET}px`,
      endTrigger: trackRef.value,
      end: () => `bottom top+=${headerRef.value!.offsetHeight + STICKY_VIEWPORT_INSET}px`,
      pin: headerRef.value,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });
  }, runwayRef.value);

  ScrollTrigger.sort();
  ScrollTrigger.refresh();
});

Vue.onUnmounted(() => {
  layoutResizeObserver?.disconnect();
  gsapContext?.revert();
});
</script>

<style scoped>
@import "../../main.css";

footer .font-bold,
.calculator-network-stats > div.font-bold,
div[Output],
.slider-value-indicator,
.slider-endpoints {
  @apply font-mono;
}

.calculator-shell {
  @apply relative min-h-0 rounded-lg;
  container-type: inline-size;
}

.calculator-middle {
  @apply min-h-0;
}

section {
  @apply border-b border-gray-500/50 py-6;
}

footer {
  @apply absolute inset-x-0 z-10 mt-0;
  top: var(--calculator-header-height);
}

section {
  @apply grid grid-cols-[160px_minmax(0,1fr)_160px] px-5 items-center;
}

.calculator-network-stats {
  @apply pt-4 pl-[180px];

  > div {
    @apply border-t border-gray-500/50 pt-1 text-sm;
  }
}

.calculator-grid-row {
  @apply col-span-full grid items-center;
  grid-template-columns: subgrid;
}

p {
  @apply opacity-60 mb-0;
}

.row-label,
section > header,
section > .calculator-grid-row > header,
footer > header {
  @apply relative font-bold;
  div[Number] {
    @apply absolute top-1/2 -translate-y-1/2 -translate-x-[135%] text-xl bg-argon-500 border border-argon-900 shadow-sm shadow-white/50 text-white rounded-full w-7 h-7 flex items-center justify-center;
  }
}
div[Output] {
  @apply flex flex-col justify-end text-right pl-7;
}

.slider-value-indicator {
  @apply pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-stone-100! px-2 py-1 text-xs font-bold text-slate-800 shadow-sm;
}
.slider-value-indicator::after {
  content: "";
  @apply absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-stone-100;
}
.slider-endpoints {
  @apply mt-0 flex justify-between text-xs text-stone-400;
}
.slider-endpoints span {
  @apply relative pt-1;
}
.slider-endpoints span::before {
  content: "";
  @apply absolute top-0 h-1.5 w-px bg-stone-400;
}
.slider-endpoints span:first-child::before {
  @apply left-0;
}
.slider-endpoints span:last-child::before {
  @apply right-0;
}

@container (max-width: 639px) {
  section {
    @apply grid-cols-1 gap-3 px-4;
  }

  .calculator-network-stats {
    @apply pl-4;
  }

  div[Output] {
    @apply pl-0 text-left;
  }

  section > header div[Number],
  section > .calculator-grid-row > header div[Number] {
    @apply static mr-2 inline-flex translate-x-0 translate-y-0 align-middle;
  }
}
</style>
