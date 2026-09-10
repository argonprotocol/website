<template>
  <DocHeader>
    Protection from Inflation
  </DocHeader>
  <DocContent>
    <div class="font-extralight italic text-3xl leading-10 my-6">
      A well-designed currency should preserve value across generations, free from the inflation and
      unchecked over-printing that have eroded savings throughout history.
    </div>

    <p>
      Fiat money has a long history of devaluation. It often starts with good intentions — grand plans and
      noble projects — followed by debt and pressure to create more money. In the worst cases, runaway
      spending and monetary expansion end in hyperinflation and currency collapse. Even moderate inflation
      erodes the wealth people have spent a lifetime building. Given enough time at a sustained rate of
      inflation, the dollar becomes practically worthless.
    </p>

    <p>
      Argon is the new foundation for money. Unlike fiat, it is designed to preserve the purchasing power of
      your savings across generations. Let's explore the difference in four simple charts.
    </p>

    <h3 class="text-2xl font-bold mt-12">
      The Dollar's Historical Inflation
    </h3>

    <p>
      The chart below shows how U.S. inflation has compounded from 1933 to 2025. The Consumer Price Index
      (CPI) tracks changes in the prices urban consumers pay for goods and services. Its rise over this
      period shows how much more it costs to buy an equivalent basket of goods.
    </p>

    <div class="text-sm opacity-90 italic mb-2 mt-8">U.S. Consumer Price Index</div>
    <TimeChart :series="[{ color: '#0B961CFF', points: inflationPoints }]" :showXAxisLabels="true" class="mb-5" />

    <div class="text-sm opacity-50 italic mb-7">
      <a href="https://www.bls.gov/cpi/">Source: U.S. Bureau of Labor Statistics</a>
    </div>

    <p>
      The Federal Reserve deliberately targets a low, positive rate of inflation. Yet the long-term effect
      of persistent inflation is undeniable: a cumulative rise in prices and a steady decline in purchasing
      power.<sup><a href="#inflation-note-2" aria-label="See note 2 on Federal Reserve inflation policy">[2]</a></sup>
    </p>

    <h3 class="text-2xl font-bold mt-14">
      The Dollar's Loss of Purchasing Power
    </h3>

    <p>
      This next chart uses the same CPI data to show the dollar's remaining purchasing power, starting at
      100% in 1933.
    </p>

    <p>
      If you had held $10,000 in cash from 1933 to 2025 without earning interest, it would have lost roughly
      96% of its purchasing power. Your $10,000 would still be $10,000, but it would buy only about $400
      worth of goods measured in 1933 dollars. The balance stays the same; the value it represents shrinks.
      This erosion is not unique to the dollar; it happens wherever inflation is persistent.<sup><a href="#inflation-note-1" aria-label="See note 1 on CPI and purchasing-power calculations">[1]</a></sup>
    </p>

    <div class="text-sm opacity-90 italic mb-2 mt-8">The Dollar's Purchasing Power Since 1933</div>
    <TimeChart ref="devaluationChartRef" :series="[{ color: '#0B961CFF', points: devaluationPoints }]" :showXAxisLabels="true" :maxYAxisValue="200" :fmtYAxisLabel="(x: number) => `${x}%`" class="mt-3 mb-5 relative">
      <PopoverRoot :open="!!historicalStartCoordinates?.x" class="relative">
        <PopoverAnchor as="div" class="absolute w-10 h-10" :style="{ top: `${historicalStartCoordinates?.y}px`, left: `${(historicalStartCoordinates?.x || 0) - 20}px` }" />
        <PopoverPortal>
          <PopoverContent @openAutoFocus.prevent side="top" align="start" :alignOffset="-20" :avoidCollisions="false" class="bg-white text-black/80 p-2 rounded-md border border-black/30 shadow-lg max-w-[min(22rem,calc(100vw-2rem))] text-sm leading-snug">
            In 1933, you start with $10,000 in cash
            <PopoverArrow :width="24" :height="12" class="fill-white stroke-gray-400/50 shadow-2xl -mt-px" />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>

      <PopoverRoot :open="!!historicalEndCoordinates?.x">
        <PopoverAnchor class="absolute w-1 h-1" :style="{ top: `${historicalEndCoordinates?.y}px`, left: `${historicalEndCoordinates?.x}px` }" />
        <PopoverPortal>
          <PopoverContent @openAutoFocus.prevent side="top" align="end" :alignOffset="-50" :avoidCollisions="false" class="bg-white text-black/80 p-2 rounded-md border border-black/30 shadow-lg max-w-[min(22rem,calc(100vw-2rem))] text-sm leading-snug">
            By 2025, about 96% of its purchasing power<br />
            is gone — leaving about $400 in 1933<br />
            dollars
            <PopoverArrow :width="24" :height="12" class="fill-white stroke-gray-400/50 shadow-2xl -mt-px" />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </TimeChart>

    <div class="text-sm opacity-50 italic mb-5">
      <a href="https://www.bls.gov/cpi/">Source: U.S. Bureau of Labor Statistics</a> — purchasing power calculated from CPI.
    </div>

    <p>
      Why has the dollar lost so much value? Fiat gives governments and central banks the power to create
      more money. That flexibility creates a persistent temptation to meet today's obligations at the
      expense of tomorrow's purchasing power. As Milton Friedman warned, inflation is "taxation without
      legislation," quietly eroding the savings of the middle class.<sup><a href="#inflation-note-3" aria-label="See note 3 on the Milton Friedman quotation">[3]</a></sup>
    </p>

    <h3 class="text-2xl font-bold mt-14">
      Argon's Consistent Purchasing Power Over Time
    </h3>

    <p>
      Instead of succumbing to inflation, Argon sets its purchasing-power target using the Consumer Price
      Index (CPI) to maintain consistent purchasing power across generations. As consumer prices rise in
      dollar denominated value, Argon's target dollar value rises as well. Its decentralized algorithms
      adjust supply based on market demand — when Argon trades above target, miners expand the supply. When
      it trades below target, Bitcoin holders have an incentive to buy and burn Argons to recover their
      locked bitcoin, reducing the supply.<sup><a href="#inflation-note-4" aria-label="See note 4 on Argon stabilization">[4]</a></sup>
    </p>

    <p>
      The following chart illustrates the goal: one Argon buys an equivalent basket of goods today, a
      hundred years from now, or a thousand years from now.
    </p>

    <div class="text-sm opacity-90 italic mb-2 mt-8">Argon's Constant Purchasing-Power Target</div>
    <ArgonStableChart class="mt-3 mb-10" />

    <h3 class="text-2xl font-bold mt-14">
      A Tale of Two Diverging Currencies
    </h3>

    <p>
      As long as inflation continues at a steady positive rate, the dollar's eventual loss of useful
      purchasing power is a mathematical inevitability. The rate determines how quickly it gets there. The
      rising tide of debt and government spending adds to the pressure for monetary expansion.
    </p>

    <p>
      The following chart maps the purchasing power of the dollar and Argon over the same thousand-year
      horizon. It begins on January 15, 2025, when the Argon started at a value of exactly $1.00. The model
      assumes Argon maintains its purchasing-power target. The chart holds dollar inflation at about 3.56%
      per year, the average compound rate over the CPI period shown above. As you can see, even without any
      acceleration, the dollar loses roughly 97% of its purchasing power over 100 years in this model.
    </p>

    <p>
      Consider a pack of gum that costs $1 today. If its price rises with inflation at 3.5% per year, that
      same pack will cost about $872 trillion in 1,000 years. The dollar you saved today would still exist,
      but it would buy effectively nothing. This is what becoming worthless means in practice.<sup><a href="#inflation-note-5" aria-label="See note 5 on the projection and gum calculation">[5]</a></sup>
    </p>

    <div class="text-sm opacity-90 italic mb-2 mt-8">Argon and the Dollar: Purchasing Power Over 1,000 Years</div>
    <TimeChart ref="thousandCombinedChartRef" class="mt-3 mb-10" :series="[{ color: '#0B961CFF', points: thousandDollarPoints }, { color: 'oklch(0.48 0.24 320)', points: thousandArgonPoints }]" :startingDate="startingDate.format('YYYY-MM-DD')" :showXAxisLabels="true" :maxYAxisValue="200" :fmtYAxisLabel="(x: number) => `${x}%`">
      <PopoverRoot v-if="combinedStartCoordinates" :open="true">
        <PopoverAnchor class="absolute w-10 h-10" :style="{ top: `${combinedStartCoordinates?.y}px`, left: `${(combinedStartCoordinates?.x || 0) - 20}px` }" />
        <PopoverPortal>
          <PopoverContent @openAutoFocus.prevent side="top" align="start" :alignOffset="-40" :avoidCollisions="false" class="bg-white text-black/80 p-2 rounded-md border border-black/30 shadow-lg max-w-[min(22rem,calc(100vw-2rem))] text-sm leading-snug">
            Argon started on January 15, 2025 with the<br />
            same value per-unit as the dollar
            <PopoverArrow :width="24" :height="12" class="fill-white stroke-gray-400/50 shadow-2xl -mt-px" />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>

      <PopoverRoot v-if="combinedDeclineCoordinates" :open="true">
        <PopoverAnchor class="absolute w-10 h-10" :style="{ top: `${combinedDeclineCoordinates?.y}px`, left: `${(combinedDeclineCoordinates?.x || 0) - 20}px` }" />
        <PopoverPortal>
          <PopoverContent @openAutoFocus.prevent side="top" align="start" :alignOffset="-40" :avoidCollisions="false" class="bg-white text-black/80 p-2 rounded-md border border-black/30 shadow-lg max-w-[min(22rem,calc(100vw-2rem))] text-sm leading-snug">
            Given enough time with continued<br />
            inflation, the dollar will become a<br />
            practically worthless currency
            <PopoverArrow :width="24" :height="12" class="fill-white stroke-gray-400/50 shadow-2xl -mt-px" />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>

      <PopoverRoot v-if="combinedDollarEndCoordinates" :open="true">
        <PopoverAnchor class="absolute w-1 h-1" :style="{ top: `${combinedDollarEndCoordinates?.y}px`, left: `${combinedDollarEndCoordinates?.x}px` }" />
        <PopoverPortal>
          <PopoverContent @openAutoFocus.prevent side="top" align="end" :alignOffset="0" :avoidCollisions="false" class="bg-white text-black/80 p-2 rounded-md border border-black/30 shadow-lg max-w-[min(22rem,calc(100vw-2rem))] text-sm leading-snug">
            No fiat has ever rebounded once it's fully<br />
            collapsed<sup><a href="#inflation-note-6" aria-label="See note 6 on historical currency replacements">[6]</a></sup>
            <PopoverArrow :width="24" :height="12" class="fill-white stroke-gray-400/50 shadow-2xl -mt-px" />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>

      <PopoverRoot v-if="combinedArgonEndCoordinates" :open="true">
        <PopoverAnchor class="absolute" :style="{ top: `${combinedArgonEndCoordinates?.y}px`, left: `${combinedArgonEndCoordinates?.x}px` }" />
        <PopoverPortal>
          <PopoverContent @openAutoFocus.prevent side="top" align="end" :alignOffset="-20" :avoidCollisions="false" class="bg-white text-black/80 p-2 rounded-md border border-black/30 shadow-lg max-w-[min(22rem,calc(100vw-2rem))] text-sm leading-snug">
            At its target, Argon preserves the<br />
            purchasing power you started with
            <PopoverArrow :width="24" :height="12" class="fill-white stroke-gray-400/50 shadow-2xl -mt-px" />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </TimeChart>

    <h3 class="text-2xl font-bold mt-14">
      In Conclusion
    </h3>

    <p>
      Over a long enough horizon, sustained inflation makes the dollar practically worthless as a store of
      value. Preserving wealth across generations requires money that retains its purchasing power.
    </p>

    <p>
      Gold has carried value across thousands of years. Argon is designed to bring that same endurance to a
      currency whose purchasing power follows the cost of living. The big difference is that physical gold
      is heavy to move, hard to divide, and impossible to transmit digitally. Argon is built for that long
      horizon while remaining portable, divisible, and natively digital.
    </p>

    <section class="inflation-notes mt-12 border-t border-black/15 pt-6" aria-labelledby="inflation-notes-heading">
      <h3 id="inflation-notes-heading">Sources and Calculation Notes</h3>
      <ol class="list-decimal">
        <li id="inflation-note-1">
          <strong>CPI and purchasing power.</strong>
          The <a href="https://www.bls.gov/cpi/">U.S. Bureau of Labor Statistics</a> explains the Consumer Price Index.
          The <a href="/data/consumerPriceIndex.json">data used in these charts</a> cover 1933–2025.
          Remaining purchasing power is calculated as the starting CPI divided by the ending CPI:
          $10,000 × 12.9 ÷ 322.3 ≈ $400.25 in 1933 dollars. The example assumes cash held without interest.
        </li>
        <li id="inflation-note-2">
          <strong>Inflation policy.</strong>
          The <a href="https://www.federalreserve.gov/faqs/economy_14400.htm">Federal Reserve's long-run inflation target</a>
          is 2%, measured using the Personal Consumption Expenditures price index (PCE), a different measure from CPI.
        </li>
        <li id="inflation-note-3">
          <strong>Inflation as taxation.</strong>
          Friedman's discussion of inflation as taxation without legislation appears in
          <a href="https://digitalcollections.hoover.org/internal/media/dispatcher/271087/full">The Collected Works of Milton Friedman at the Hoover Institution (PDF)</a>.
        </li>
        <li id="inflation-note-4">
          <strong>Argon's purchasing-power target.</strong>
          For the CPI target and the incentives that expand and contract supply, see
          <DocLink to="/docs/system-design">Architectural Basics</DocLink> and the whitepaper,
          <DocLink to="/docs/whitepapers/fundamentals">The Fundamentals for Creating a Stable Crypto Asset</DocLink>.
        </li>
        <li id="inflation-note-5">
          <strong>The thousand-year illustration.</strong>
          The dollar chart uses a constant annual purchasing-power multiplier of 0.965617, equivalent to about
          3.56% annual inflation. After 100 years, about 3.02% of the starting purchasing power remains.
          The gum example uses 3.5%: $1 × 1.035<sup>1,000</sup> ≈ $871.665 trillion, rounded to $872 trillion.
          It assumes the gum's price rises at that rate. Both future charts illustrate Argon maintaining its target.
          Practical worthlessness means negligible purchasing power; the mathematical curve approaches zero.
        </li>
        <li id="inflation-note-6">
          <strong>Historical currency replacements.</strong>
          The Bundesbank describes <a href="https://www.bundesbank.de/en/press/speeches/welcome-remarks-636304">Germany's introduction of a new currency in November 1923</a>,
          when one U.S. dollar cost 4.2 trillion marks. The Reserve Bank of Zimbabwe documents the
          <a href="https://www.rbz.co.zw/documents/publications/press/demonetisation-press-statement-9-june-2015.pdf">2015 demonetisation of the old Zimbabwe dollar (PDF)</a>.
          These are examples of collapsed monetary units being replaced or retired.
        </li>
      </ol>
    </section>
  </DocContent>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import BigNumber from 'bignumber.js';
import TimeChart from '../../../components/TimeChart.vue';
import ArgonStableChart from '@/components/ArgonStableChart.vue';
import type { IConsumerPriceIndexRecord } from '@/interfaces/IConsumerPriceIndexRecord';
import { PopoverRoot, PopoverAnchor, PopoverPortal, PopoverArrow, PopoverContent  } from 'reka-ui';
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocLink from "@/screens/docs/DocLink.vue";

dayjs.extend(utc);

type ChartCoordinates = { x: number; y: number } | null;

const inflationPoints = Vue.ref<{ x: string; y: number }[]>([]);
const devaluationPoints = Vue.ref<{ x: string; y: number }[]>([]);
const thousandDollarPoints = Vue.ref<{ x: string; y: number }[]>([]);
const thousandArgonPoints = Vue.ref<{ x: string; y: number }[]>([]);

const devaluationChartRef = Vue.ref<InstanceType<typeof TimeChart> | null>(null);
const thousandCombinedChartRef = Vue.ref<InstanceType<typeof TimeChart> | null>(null);

const historicalStartCoordinates = Vue.ref<ChartCoordinates>(null);
const historicalEndCoordinates = Vue.ref<ChartCoordinates>(null);
const combinedStartCoordinates = Vue.ref<ChartCoordinates>(null);
const combinedDeclineCoordinates = Vue.ref<ChartCoordinates>(null);
const combinedDollarEndCoordinates = Vue.ref<ChartCoordinates>(null);
const combinedArgonEndCoordinates = Vue.ref<ChartCoordinates>(null);

const startingDate = dayjs.utc('2025-01-15');
let dollarValueBn = BigNumber(100);
let resizeObserver: ResizeObserver | null = null;
let coordinateFrame = 0;

for (let year = 0; year <= 1000; year++) {
  const date = startingDate.add(year, 'year').format('YYYY-MM-DD');
  thousandDollarPoints.value.push({ x: date, y: dollarValueBn.toNumber() });
  thousandArgonPoints.value.push({ x: date, y: 100 });
  dollarValueBn = dollarValueBn.multipliedBy(0.965617);
}

function updateCoordinates() {
  const historicalChart = devaluationChartRef.value;
  const combinedChart = thousandCombinedChartRef.value;

  historicalStartCoordinates.value = historicalChart?.getChartPointCoordinates(0, 0) ?? null;
  historicalEndCoordinates.value = historicalChart?.getChartPointCoordinates(0, devaluationPoints.value.length - 1) ?? null;
  combinedStartCoordinates.value = combinedChart?.getChartPointCoordinates(0, 0) ?? null;
  combinedDeclineCoordinates.value = combinedChart?.getChartPointCoordinates(0, 100) ?? null;
  combinedDollarEndCoordinates.value = combinedChart?.getChartPointCoordinates(0, thousandDollarPoints.value.length - 1) ?? null;
  combinedArgonEndCoordinates.value = combinedChart?.getChartPointCoordinates(1, thousandArgonPoints.value.length - 1) ?? null;
}

function scheduleCoordinateUpdate() {
  if (!resizeObserver) return;

  cancelAnimationFrame(coordinateFrame);
  coordinateFrame = requestAnimationFrame(updateCoordinates);
}

fetch('/data/consumerPriceIndex.json').then(response => response.json()).then(async (data: IConsumerPriceIndexRecord[]) => {
  inflationPoints.value = data.map(item => ({
    x: `${item.year}-01-01`,
    y: item.cpi,
  }));

  const baseEntry = data[0];
  devaluationPoints.value = data.map(item => ({
    x: `${item.year}-01-01`,
    y: (baseEntry.cpi / item.cpi) * 100,
  }));

  await Vue.nextTick();
  scheduleCoordinateUpdate();
});

Vue.onMounted(() => {
  resizeObserver = new ResizeObserver(scheduleCoordinateUpdate);
  for (const chart of [devaluationChartRef.value, thousandCombinedChartRef.value]) {
    if (chart?.$el) resizeObserver.observe(chart.$el);
  }
  scheduleCoordinateUpdate();
});

Vue.onUnmounted(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  cancelAnimationFrame(coordinateFrame);
});
</script>

<style scoped>
.inflation-notes ol > li {
  color: rgb(0 0 0 / 65%);
  font-size: 0.875rem;
  line-height: 1.6;
  scroll-margin-top: 6rem;
}
</style>
