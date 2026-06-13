<template>
  <div
      ref="circleRef"
      :class="twMerge(
        'absolute left-1/2 z-10 w-7 h-7 rounded-full bg-white pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0',
        attrs.class as string
      )"
  />
</template>

<script setup lang="ts">
import * as Vue from "vue";
import { twMerge } from "tailwind-merge";

const attrs = Vue.useAttrs();

const circleRef = Vue.ref<HTMLElement | null>(null);

defineExpose({
  $el: circleRef,
  rootEl: circleRef,
});
</script>
