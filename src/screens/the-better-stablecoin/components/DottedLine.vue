<template>
  <div ref="lineRef" class="absolute top-0 w-px border-r-2 border-dashed border-gray-300 bottom-0 left-1/2 -translate-x-1/2 z-0">
    <div class="bg-linear-to-t from-transparent to-[var(--bg-charcoal)] h-10 w-10 z-10 absolute top-0 -left-5" />
  </div>
</template>

<script setup lang="ts">
import * as Vue from "vue";

const lineRef = Vue.ref<HTMLElement | null>(null);

defineExpose({
  $el: lineRef,
  rootEl: lineRef,
});
</script>
