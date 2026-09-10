<template>
  <div>
    <TimeChart
      ref="chartRef"
      :series="series"
      :startingDate="startingDate"
      :maxYAxisValue="200"
      :fmtYAxisLabel="(value: number) => `$${Math.round(value).toLocaleString()}`"
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
            <div class="font-semibold">Mining Seat Cost</div>
            <div>${{ Math.round(miningSeatCost).toLocaleString() }}</div>
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
const ARGONOTS_PER_MINING_SEAT = 180;
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
  const random = createSeededRandom(0xA260_007);
  const points: { x: string; y: number }[] = [];
  const finalIndex = 60;
  const peakIndex = 41;
  const firstDate = dayjs.utc(startingDate);
  let smoothedNoise = 0;

  for (let index = 0; index <= finalIndex; index += 1) {
    const isRising = index <= peakIndex;
    const progress = isRising
      ? index / peakIndex
      : (index - peakIndex) / (finalIndex - peakIndex);
    const baseline = isRising
      ? 10 + 170 * progress
      : 180 - 80 * progress;
    smoothedNoise = smoothedNoise * 0.72 + (random() - 0.5) * 10;
    const volatility = index === 0 || index === peakIndex || index === finalIndex
      ? 0
      : smoothedNoise + Math.sin(index * 0.65) * 5;
    const price = Math.round(Math.max(5, Math.min(index === peakIndex ? 180 : 178, baseline + volatility)));

    points.push({
      x: firstDate.add(index * 8, 'month').format('YYYY-MM-DD'),
      y: price,
    });
  }

  return points;
}

const pricePoints = createPricePoints();
const series = [{ color: 'oklch(0.48 0.24 320)', points: pricePoints }];
const miningSeatCost = Vue.computed(() => {
  return (pricePoints[markerIndex.value]?.y ?? pricePoints[0].y) * ARGONOTS_PER_MINING_SEAT;
});

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
