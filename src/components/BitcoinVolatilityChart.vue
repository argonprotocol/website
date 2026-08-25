<template>
  <div>
    <TimeChart
      ref="chartRef"
      :series="series"
      :startingDate="startingDate"
      :maxYAxisValue="150_000"
      :fmtYAxisLabel="(value: number) => `$${Math.round(value / 1_000).toLocaleString()}k`"
      :height="props.height"
      :showXAxisLabels="false"
    >
      <PopoverRoot v-if="markerCoordinates" :open="true">
        <PopoverAnchor asChild>
          <div
            class="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black transition-[top,left] duration-75 ease-out"
            :style="{
              top: `${markerCoordinates.y}px`,
              left: `${markerCoordinates.x}px`,
            }"
          />
        </PopoverAnchor>
        <PopoverPortal>
          <PopoverContent
            side="top"
            align="center"
            class="rounded-md border border-black/30 bg-white p-2 text-black/80 shadow-lg"
          >
            <div class="font-semibold">Price Per Bitcoin</div>
            <div>${{ Math.round(bitcoinPrice).toLocaleString() }}</div>
            <PopoverArrow :width="24" :height="12" class="-mt-px fill-white stroke-gray-400/50 shadow-2xl" />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </TimeChart>
    <div class="mt-2 text-sm italic opacity-50">Illustrative price behavior—not a forecast.</div>
  </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { PopoverAnchor, PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot } from 'reka-ui';
import TimeChart from '@/components/TimeChart.vue';

dayjs.extend(utc);

const props = withDefaults(defineProps<{
  height?: number;
}>(), {
  height: 300,
});

const startingDate = '2025-01-01';
const chartRef = Vue.ref<InstanceType<typeof TimeChart> | null>(null);
const markerIndex = Vue.ref(0);
const markerCoordinates = Vue.ref<{ x: number; y: number } | null>(null);
let resizeObserver: ResizeObserver | null = null;

function createSeededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function createPricePoints() {
  const random = createSeededRandom(0xB17C_01A);
  const rawPrices: number[] = [];
  const finalIndex = 72;
  const firstDate = dayjs.utc(startingDate);
  let smoothedNoise = 0;

  for (let index = 0; index <= finalIndex; index += 1) {
    const progress = index / finalIndex;
    const baseline = 64_048 + 67_000 * (1 - Math.exp(-2.5 * progress));
    const broadSwings = Math.sin(progress * Math.PI * 7.5) * 13_000;
    const secondarySwings = Math.sin(progress * Math.PI * 16 + 0.8) * 5_500;
    const midpointDownturn = -55_000 * Math.exp(-Math.pow((progress - 0.5) / 0.11, 2));
    smoothedNoise = smoothedNoise * 0.82 + (random() - 0.5) * 4_000;
    rawPrices.push(baseline + broadSwings + secondarySwings + midpointDownturn + smoothedNoise);
  }

  const rawPeak = Math.max(...rawPrices);
  const scale = (150_000 - 64_048) / (rawPeak - rawPrices[0]);

  return rawPrices.map((rawPrice, index) => ({
    x: firstDate.add(index * 2, 'month').format('YYYY-MM-DD'),
    y: index === 0
      ? 64_048
      : Math.round(Math.max(50_000, Math.min(150_000, 64_048 + (rawPrice - rawPrices[0]) * scale))),
  }));
}

const pricePoints = createPricePoints();
const series = [{ color: '#968200FF', points: pricePoints }];
const bitcoinPrice = Vue.computed(() => pricePoints[markerIndex.value]?.y ?? pricePoints[0].y);

function updateMarkerCoordinates() {
  const chart = chartRef.value;
  if (!chart) return;

  chart.updateChartPoints([pricePoints]);
  markerCoordinates.value = chart.getChartPointCoordinates(0, markerIndex.value);
}

function updateMarkerPosition() {
  const chartElement = chartRef.value?.$el;
  if (!chartElement) return;

  const chartTop = chartElement.getBoundingClientRect().top;
  const startThreshold = window.innerHeight * 0.65;
  const endThreshold = window.innerHeight * 0.15;
  let progress = 0;

  if (chartTop <= startThreshold && chartTop >= endThreshold) {
    progress = (startThreshold - chartTop) / (startThreshold - endThreshold);
  } else if (chartTop < endThreshold) {
    progress = 1;
  }

  const nextIndex = Math.round(Math.max(0, Math.min(1, progress)) * (pricePoints.length - 1));
  if (markerIndex.value !== nextIndex) {
    markerIndex.value = nextIndex;
  }
  markerCoordinates.value = chartRef.value?.getChartPointCoordinates(0, markerIndex.value) ?? null;
}

Vue.onMounted(() => {
  window.addEventListener('scroll', updateMarkerPosition, { passive: true });

  const chartElement = chartRef.value?.$el;
  if (chartElement) {
    resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(updateMarkerCoordinates);
    });
    resizeObserver.observe(chartElement);
  }

  window.requestAnimationFrame(() => {
    updateMarkerCoordinates();
    updateMarkerPosition();
  });
});

Vue.onUnmounted(() => {
  window.removeEventListener('scroll', updateMarkerPosition);
  resizeObserver?.disconnect();
});
</script>
