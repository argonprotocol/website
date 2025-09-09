<template>
  <div class="flex flex-row items-center gap-x-2">
    <template v-for="(child, index) in slotChildren" :key="index">
      <component :is="child" />
      <span v-if="index < slotChildren.length - 1" class="text-gray-400">/</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';

// Get the slot content and filter for RouterLink components
const slots = Vue.useSlots();
const slotChildren = Vue.computed(() => {
  const defaultSlot = slots.default?.();
  if (!defaultSlot) return [];
  
  // Filter to only include RouterLink components and flatten any nested arrays
  return defaultSlot
    .flat()
    .filter((child: any) => child.type?.name === 'RouterLink' || child.type?.__name === 'RouterLink');
});
</script>

<style scoped>
@import "../main.css";

</style>