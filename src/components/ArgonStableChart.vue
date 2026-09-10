<template>
  <TimeChart
    ref="chartRef"
    :series="series"
    :startingDate="startingDate.format('YYYY-MM-DD')"
    :maxYAxisValue="200"
    :fmtYAxisLabel="(value: number) => `${value}%`"
    :height="props.height"
    :showXAxisLabels="true"
  >
    <PopoverRoot v-if="argonCoordinates" :open="true">
      <PopoverAnchor asChild>
        <CarIcon
          class="absolute w-20 -translate-y-full transition-transform duration-75 ease-out"
          :style="{
            top: `${argonCoordinates.y}px`,
            left: `${carPosition}%`,
            transform: `translateX(${-carPosition}%)`,
          }"
        />
      </PopoverAnchor>
      <PopoverPortal>
        <PopoverContent
          side="top"
          align="start"
          :alignOffset="-5 - carPosition * 1.4"
          :avoidCollisions="false"
          class="rounded-md border border-black/30 bg-white p-2 text-black/80 shadow-lg"
        >
          The goal: the same purchasing power<br />
          for ₳100 across 1,000 years
          <PopoverArrow :width="24" :height="12" class="-mt-px fill-white stroke-gray-400/50 shadow-2xl" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </TimeChart>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { PopoverAnchor, PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot } from 'reka-ui';
import CarIcon from '@/assets/car.svg?component';
import TimeChart from '@/components/TimeChart.vue';

dayjs.extend(utc);

const props = defineProps<{
  height?: number;
}>();

const chartRef = Vue.ref<InstanceType<typeof TimeChart> | null>(null);
const argonCoordinates = Vue.ref<{ x: number; y: number } | null>(null);
const carPosition = Vue.ref(0);
let resizeObserver: ResizeObserver | null = null;

const argonPoints: { x: string; y: number }[] = [];
const startingDate = dayjs.utc('2025-01-15');
const maxDate = startingDate.add(1000, 'year');
let currentDate = startingDate;

while (!currentDate.isAfter(maxDate)) {
  argonPoints.push({
    x: currentDate.format('YYYY-MM-DD'),
    y: 100,
  });
  currentDate = currentDate.add(1, 'year');
}

const series = [{ color: 'oklch(0.48 0.24 320)', points: argonPoints }];

function updateCoordinates() {
  const chart = chartRef.value;
  if (!chart) return;

  chart.updateChartPoints([argonPoints]);
  argonCoordinates.value = chart.getChartPointCoordinates(0, argonPoints.length - 1);
}

function updateCarPosition() {
  const chartElement = chartRef.value?.$el;
  if (!chartElement) return;

  const chartTop = chartElement.getBoundingClientRect().top;
  const startThreshold = window.innerHeight * 0.5;
  const endThreshold = window.innerHeight * 0.15;

  let progress = 0;
  if (chartTop <= startThreshold && chartTop >= endThreshold) {
    progress = (startThreshold - chartTop) / (startThreshold - endThreshold);
  } else if (chartTop < endThreshold) {
    progress = 1;
  }

  carPosition.value = Math.max(0, Math.min(1, progress)) * 100;
}

Vue.onMounted(() => {
  window.addEventListener('scroll', updateCarPosition, { passive: true });

  const chartElement = chartRef.value?.$el;
  if (chartElement) {
    resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(updateCoordinates);
    });
    resizeObserver.observe(chartElement);
  }

  window.requestAnimationFrame(() => {
    updateCoordinates();
    updateCarPosition();
  });
});

Vue.onUnmounted(() => {
  window.removeEventListener('scroll', updateCarPosition);
  resizeObserver?.disconnect();
});
</script>
