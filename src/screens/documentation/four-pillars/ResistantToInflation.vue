<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
      <RouterLink to="/learn/four-pillars">The Four Pillars of Argon</RouterLink>
    </Breadcrumbs>
    <SubTitle>Resistant to Inflation</SubTitle>

    <SubContent class="space-y-4">
      <div class="font-extralight italic text-4xl leading-12 my-10 mr-28">
        A well-designed currency should preserve value across generations, free from the inflation 
        and unchecked over-printing that has destroyed every form of fiat money throughout history.
      </div>
      
      <p>
        Every fiat in history has eventually become devalued. It always 
        starts with good intention &mdash; grand plans and noble projects &mdash; and it always ends with debt, 
        runaway spending, and hyperinflation. Eventually, the currency collapses, and the people's 
        wealth is destroyed.
      </p>

      <p>
        Argon is the new foundation for money. Unlike fiat, it allows you to build and preserve 
        generational wealth. Let's explore the difference in four simple charts.
      </p>

      <h3 class="text-2xl font-bold mt-12">
        The Dollar's Historical Inflation
      </h3>

      <p>
        The chart below shows how U.S. inflation has compounded over the past century. The 
        Consumer Price Index (CPI) has risen steadily, meaning every dollar buys less with each passing decade.
      </p>

      <div class="text-sm opacity-90 italic mb-2 mt-8">U.S. Consumer Price Index</div>
      <TimeChart :series="[{ color: '#0B961CFF', points: inflationPoints }]" class="mb-5" />

      <div class="text-sm opacity-50 italic mb-7">
        <a href="https://www.bls.gov/cpi/">Source U.S. Bureau of Labor Statistics</a>
      </div>
      
      <p>
        Some government economists argue inflation stimulates growth, but the long-term effect is undeniable: a persistent 
        rise in prices and a steady decline in purchasing power.
      </p>

      <h3 class="text-2xl font-bold mt-14">
        The Dollar's Historical Loss
      </h3>
      
      <p>
        This next chart shows the same CPI data from the previous chart, but it flips it into purchasing power, 
        which allows you to see the dollar's devaluation over time.
      </p>

      <p>
        If you had purchased $10,000 a century ago, today it would buy little more than 96% of its original value.
        To say it another way, if you describe the dollar as an investment, it would be one of the worst investments of the last one hundred years. 
        The type of loss is not unique to the dollar; it eventually happens to every fiat currency.
      </p>

      <div class="text-sm opacity-90 italic mb-2 mt-8">If the Dollar Were an Investment</div>
      <TimeChart ref="devaluationChartRef" :series="[{ color: '#0B961CFF', points: devaluationPoints }]" :maxYAxisValue="200" :fmtYAxisLabel="(x: number) => `${x}%`" class="mt-3 mb-5 relative">
        <PopoverRoot :open="!!devaluationCoordinates1?.x" class="relative">
          <PopoverAnchor as="div" class="absolute w-10 h-10" :style="{ top: `${devaluationCoordinates1?.y}px`, left: `${(devaluationCoordinates1?.x || 0) - 20}px` }" />
          <PopoverPortal>
            <PopoverContent side="top" align="start" :alignOffset="-20" :avoidCollisions="false" class="bg-white text-black/80 p-2 rounded-md border border-black/30 shadow-lg">
              In this example, you start<br />
              with a value of $10,000
              <PopoverArrow :width="24" :height="12" class="fill-white stroke-gray-400/50 shadow-2xl -mt-px" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>

        <PopoverRoot :open="!!devaluationCoordinates3?.x">
          <PopoverAnchor class="absolute w-1 h-1" :style="{ top: `${devaluationCoordinates3?.y}px`, left: `${devaluationCoordinates3?.x}px` }" />
          <PopoverPortal>
            <PopoverContent side="top" align="end" :alignOffset="-50" :avoidCollisions="false" class="bg-white text-black/80 p-2 rounded-md border border-black/30 shadow-lg">
              By the end, you've lost nearly<br />
              96%, salvaging only $400.20
              <PopoverArrow :width="24" :height="12" class="fill-white stroke-gray-400/50 shadow-2xl -mt-px" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
      </TimeChart>

      <div class="text-sm opacity-50 italic mb-5">
        <a href="https://www.in2013dollars.com/">Source in2013dollars.com</a>
      </div>

      <p>
        Why has the dollar lost so much value? You can blame it on the Federal Reserve's over-printing of money, but ultimately
        it's a natural consequence of fiat's weakness. The power for a government to print free money is too enticing to resist. 
        As Milton Friedman warned, inflation is  "taxation without legislation," quietly eroding the savings of the middle class.
      </p>

      <h3 class="text-2xl font-bold mt-14">
        Argon's Consistent Purchasing Power Over Time
      </h3>

      <p>
        Instead of succumbing to inflation, Argon pegs itself directly to the Consumer Price Index (CPI) in order 
        to maintain consistent purchasing power across generations. Its decentralized algorithms adjust supply 
        based on market demand -- deflationary pressures are absorbed by miners, while inflationary pressures are 
        absorbed through Bitcoin's store of value.
      </p>

      <p>
        As the following chart shows, one unit of Argon today will buy the same basket of goods as one unit of Argon a hundred — 
        or even thousand — years from now.
      </p>

      <div class="text-sm opacity-90 italic mb-2 mt-8">Argon's Value Is Permanently Stable</div>
      <TimeChart ref="thousandArgonChartRef" :series="[{ color: 'oklch(0.48 0.24 320)', points: thousandArgonPoints }]" :startingDate="startingDate.format('2025-09-15')" :maxYAxisValue="200" :fmtYAxisLabel="(x: number) => `${x}%`" class="mt-3 mb-10">
        <PopoverRoot :open="true">
          <PopoverAnchor asChild>
            <CarIcon
              class="absolute -translate-y-full w-20 transition-transform duration-75 ease-out" 
              :style="{ top: `${thousandArgonCoordinates?.y}px`, left: `${carPosition}%`, transform: `translateX(${-carPosition}%)` }" 
            />
          </PopoverAnchor>
          <PopoverPortal>
            <PopoverContent side="top" align="start" :alignOffset="-5 + -(carPosition*1.4)" :avoidCollisions="false" class="bg-white text-black/80 p-2 rounded-md border border-black/30 shadow-lg">
              ₳100 buys you the same today<br />
              as it will 1,000 years from now
              <PopoverArrow :width="24" :height="12" class="fill-white stroke-gray-400/50 shadow-2xl -mt-px" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
      </TimeChart>

      <h3 class="text-2xl font-bold mt-14">
        A Tale of Two Diverging Currencies
      </h3>

      <p>
        As we look toward the future, inflation is virtually guaranteed to continue. The only question is, how fast will 
        inflation accelerate? The rising tide of debt and government spending creates a situation that has 
        rarely resolved favorably.
      </p>

      <p>
        The following chart maps the purchasing power of the dollar and  argon over the same thousand-year 
        horizon. It begins on January 15, 2025, when the argon started at a value of exactly $1.00. 
        The chart models the dollar's future inflation at the historical average, meaning, it does not include accelerations due
        to future debt or spending. As you can see, even with this artificial inflation cap, within the next 100 years, the 
        dollar will become practically worthless.
      </p>

      <div class="text-sm opacity-90 italic mb-2 mt-8">Putting Argon and the Dollar On The Same Timeline</div>
      <TimeChart ref="thousandCombinedChartRef" class="mt-3 mb-10" :series="[{ color: '#0B961CFF', points: thousandDollarPoints }, { color: 'oklch(0.48 0.24 320)', points: thousandArgonPoints }]" :startingDate="startingDate.format('2025-09-15')" :maxYAxisValue="200" :fmtYAxisLabel="(x: number) => `${x}%`">
        <PopoverRoot :open="true">
          <PopoverAnchor class="absolute w-10 h-10" :style="{ top: `${devaluationCoordinates1?.y}px`, left: `${(devaluationCoordinates1?.x || 0) - 20}px` }" />
          <PopoverPortal>
            <PopoverContent side="top" align="start" :alignOffset="-40" :avoidCollisions="false" class="bg-white text-black/80 p-2 rounded-md border border-black/30 shadow-lg">
              Argon started on January 15, 2025 with<br />
              the same value per-unit as the dollar
              <PopoverArrow :width="24" :height="12" class="fill-white stroke-gray-400/50 shadow-2xl -mt-px" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>

        <PopoverRoot :open="true">
          <PopoverAnchor class="absolute w-10 h-10" :style="{ top: `${devaluationCoordinates2?.y}px`, left: `${(devaluationCoordinates2?.x || 0) - 20}px` }" />
          <PopoverPortal>
            <PopoverContent side="top" align="start" :alignOffset="-40" :avoidCollisions="false" class="bg-white text-black/80 p-2 rounded-md border border-black/30 shadow-lg">
              Given enough time, the dollar<br />
              will become a worthless currency
              <PopoverArrow :width="24" :height="12" class="fill-white stroke-gray-400/50 shadow-2xl -mt-px" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>

        <PopoverRoot :open="true">
          <PopoverAnchor class="absolute w-10 h-10" :style="{ top: `${(devaluationCoordinates3?.y || 0) + 8}px`, left: `${devaluationCoordinates3?.x}px` }" />
          <PopoverPortal>
            <PopoverContent side="top" align="end" :alignOffset="0" :avoidCollisions="false" class="bg-white text-black/80 p-2 rounded-md border border-black/30 shadow-lg">
              No fiat has ever rebounded<br />
              once it's fully collapsed
              <PopoverArrow :width="24" :height="12" class="fill-white stroke-gray-400/50 shadow-2xl -mt-px" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>

        <PopoverRoot :open="true">
          <PopoverAnchor class="absolute" :style="{ top: `${thousandArgonCoordinates?.y}px`, left: `${thousandArgonCoordinates?.x}px` }" />
          <PopoverPortal>
            <PopoverContent side="top" align="end" :alignOffset="-20" :avoidCollisions="false" class="bg-white text-black/80 p-2 rounded-md border border-black/30 shadow-lg">
              The argon will always be worth<br />
              the same as when you earned it
              <PopoverArrow :width="24" :height="12" class="fill-white stroke-gray-400/50 shadow-2xl -mt-px" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
      </TimeChart>

      <h3 class="text-2xl font-bold mt-14">
        Learn More About the Argon
      </h3>

      <p>
        Argon has similar properties to gold in that both can hold a stable value over thousands of years. The big 
        difference is that gold is heavy to move, hard to divide, and impossible to transmit digitally. Argon 
        retains long-term durability while being portable, divisible, and natively digital. For more information, check
        out Argon's other core properties:
      </p>

      <ul class="list-disc list-outside space-y-4 pl-6">
        <li class="pl-2">
          <RouterLink to="/learn/four-pillars/indifferent-to-catastrophe" class="font-bold">Indifferent to Catastrophe</RouterLink>
          <div class="mt-1">
            Argon works regardless of banking collapses or government bond failures.
          </div>
        </li>
        <li class="pl-2">
          <RouterLink to="/learn/four-pillars/intrinsic-price-stabilization" class="font-bold">Intrinsic Price Stabilization</RouterLink>
          <div class="mt-1">
            Argon creates economic balance between the growth of currency and its stabilization
          </div>
        </li>
        <li class="pl-2">
          <RouterLink to="/learn/four-pillars/immune-from-death-spirals" class="font-bold">Immune from Death Spirals</RouterLink>
          <div class="mt-1">
            Argon solves the core problem inherent in previous algorithmic stablecoins.
          </div>
        </li>
      </ul>
     
    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import BigNumber from 'bignumber.js';
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '../../../navigation/SubLayout.vue';
import TimeChart from '../../../components/TimeChart.vue';
import type { IConsumerPriceIndexRecord } from '@/interfaces/IConsumerPriceIndexRecord';
import { PopoverRoot, PopoverAnchor, PopoverPortal, PopoverArrow, PopoverContent  } from 'reka-ui';
import CarIcon from '../../../assets/car.svg?component';

dayjs.extend(utc);

const inflationPoints = Vue.ref<{ x: string, y: number }[]>([]);
const devaluationPoints = Vue.ref<{ x: string, y: number }[]>([]);
const thousandDollarPoints = Vue.ref<{ x: string, y: number }[]>([]);
const thousandArgonPoints = Vue.ref<{ x: string, y: number }[]>([]);

const devaluationChartRef = Vue.ref<InstanceType<typeof TimeChart> | null>(null);
const thousandArgonChartRef = Vue.ref<InstanceType<typeof TimeChart> | null>(null);
const thousandCombinedChartRef = Vue.ref<InstanceType<typeof TimeChart> | null>(null);

const thousandArgonCoordinates = Vue.ref<{ x: number, y: number } | null | undefined>(null);
const devaluationCoordinates1 = Vue.ref<{ x: number, y: number } | null | undefined>(null);
const devaluationCoordinates2 = Vue.ref<{ x: number, y: number } | null | undefined>(null);
const devaluationCoordinates3 = Vue.ref<{ x: number, y: number } | null | undefined>(null);

const startingDate = dayjs.utc();

// Car scroll animation state
const carPosition = Vue.ref(0); // 0 to 100 percentage

// Generate data immediately
const maxDate = dayjs.utc().add(1000, 'year');
let currentDate = startingDate;
let dollarValueBn = BigNumber(100);
while (currentDate.isBefore(maxDate)) {
  thousandDollarPoints.value.push({
    x: currentDate.format('YYYY-MM-DD'),
    y: dollarValueBn.toNumber() < 0.1 ? 0 : dollarValueBn.toNumber(),
  });
  thousandArgonPoints.value.push({
    x: currentDate.format('YYYY-MM-DD'),
    y: 100,
  });
  dollarValueBn = dollarValueBn.multipliedBy(.965617);
  currentDate = currentDate.add(1, 'year');
}

function formatAsThousands(y: number, prefix: string = ''): string {
  if (y < 1000) return `${prefix}${y}`;
  return `${prefix}${(y / 1000)}k`;
}

// Load CPI data for the other charts
fetch('/data/consumerPriceIndex.json').then(response => response.json()).then(data => {
  inflationPoints.value = data.map((item: IConsumerPriceIndexRecord) => ({
    x: `${item.year}-01-01`,
    y: item.cpi,
  }));

  const baseEntry = data[0];
  devaluationPoints.value = data.map((item: IConsumerPriceIndexRecord) => ({
    x: `${item.year}-01-01`,
    y: (baseEntry.cpi / item.cpi) * 100,
  }));

  setTimeout(() => {
    devaluationCoordinates1.value = devaluationChartRef.value?.getChartPointCoordinates(0, 0);
    devaluationCoordinates2.value = thousandCombinedChartRef.value?.getChartPointCoordinates(0, 100);
    devaluationCoordinates3.value = devaluationChartRef.value?.getChartPointCoordinates(0, devaluationPoints.value.length - 1);
    thousandArgonCoordinates.value = thousandArgonChartRef.value?.getChartPointCoordinates(0, thousandArgonPoints.value.length - 1);
  }, 0);
});

// Scroll handler for car animation
const handleScroll = () => {
  if (!thousandArgonChartRef.value) return;
  
  const chartElement = thousandArgonChartRef.value.$el;
  const rect = chartElement.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // Calculate scroll progress based on chart visibility
  const chartTop = rect.top;
  
  const startThreshold = windowHeight * 0.5;
  const endThreshold = windowHeight * 0.15;
  
  let progress = 0;
  
  // Calculate progress based on chart position relative to thresholds
  if (chartTop <= startThreshold && chartTop >= endThreshold) {
    // Chart is in the animation range
    const animationRange = startThreshold - endThreshold;
    const currentPosition = startThreshold - chartTop;
    progress = Math.max(0, Math.min(1, currentPosition / animationRange));
  } else if (chartTop > startThreshold) {
    progress = 0;
  } else if (chartTop < endThreshold) {
    progress = 1;
  }
  
  // Convert to percentage and update car position
  carPosition.value = progress * 100;
};

Vue.onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  setTimeout(() => handleScroll());
});

Vue.onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<style scoped>
@import "../../../main.css";

p {
  line-height: 28px;
}

</style>