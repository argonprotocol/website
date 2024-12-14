<template>
  <div class="Tooltip Component" :style="{ opacity }">
    <div Arrow :style="arrowStyles" class="absolute">
      <svg class="relative z-10" width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L24 12H0L12 0Z" fill="#E5B2E9"/>
      </svg>
      <svg class="absolute z-0 -top-0.5 left-[-1px] opacity-10" width="26" height="14" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L24 12H0L12 0Z" fill="black"/>
      </svg>
    </div>
    <div Box :style="boxStyles">
      {{ props.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';

const props = defineProps<{
  text: string;
}>();

const opacity = Vue.ref(0);

const arrowStyles = Vue.ref({
  top: '0',
  left: '0',
  right: 'auto',
  transform: 'translateX(-50%)',
});

const boxStyles = Vue.ref({
  top: '0',
  left: '0',
  right: 'auto',
  maxWidth: 'auto',
  whiteSpace: 'nowrap',
  transform: 'translateX(-50%)',
});

function showTooltip({ top, left, right, arrowLeft, arrowRight }: { top: number; left?: number | null; right?: number | null; arrowLeft?: number | null; arrowRight?: number | null }) {
  const isRight = !!right;
  boxStyles.value = {
    top: `${top}px`,
    left: [null, undefined].includes(left as any) ? 'auto' : `${left}px`,
    right: [null, undefined].includes(right as any) ? 'auto' : `${right}px`,
    maxWidth: right ? '250px' : 'auto',
    whiteSpace: right ? 'normal' : 'nowrap',
    transform: isRight ? 'translateX(0%)' : 'translateX(-50%)',
  };
  arrowStyles.value = {
    top: `${top-11}px`,
    left: [null, undefined].includes(arrowLeft as any) ? 'auto' : `${arrowLeft}px`,
    right: [null, undefined].includes(arrowRight as any) ? 'auto' : `${arrowRight}px`,
    transform: isRight ? 'translateX(100%)' : 'translateX(-50%)',
  };
  opacity.value = 1;
}

function hideTooltip() {
  opacity.value = 0;
}

defineExpose({ showTooltip, hideTooltip });
</script>

<style>
.Tooltip.Component {
  transition: opacity 0.2s ease;
  [Box] {
    position: absolute;
    background: #E5B2E9;
    color: #501456;
    padding: 10px 15px;
    border-radius: 6px;
    pointer-events: none;
    border: 1px solid #521759;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.2);
  }
  [Arrow] {
    z-index: 1001;
    pointer-events: none;
  }
}
</style>
