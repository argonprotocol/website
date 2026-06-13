<template>
  <div v-bind="rootAttrs" :class="rootClass">
    <TopBar :mode="props.mode" class="relative z-10" />
    <slot />
  </div>
  <FooterBar :mode="props.mode" class="relative z-10" />
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import { twMerge } from 'tailwind-merge';
import TopBar from './TopBar.vue';
import FooterBar from './FooterBar.vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  mode?: 'argon' | 'charcoal' | 'light';
}>();

const attrs = Vue.useAttrs();

const rootAttrs = Vue.computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});

const rootClass = Vue.computed(() => twMerge('flex flex-col min-h-screen pb-20', attrs.class as string));
</script>
