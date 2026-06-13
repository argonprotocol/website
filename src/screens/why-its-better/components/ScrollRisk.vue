<template>
  <div ref="riskRef"
    class="ScrollRisk Component relative min-h-screen font-serif"
    :class="[showBackground ? 'bg-[var(--bg-charcoal)]' : '']"
  >
    <div class="relative min-h-screen font-serif flex flex-col justify-center">
      <div class="grow relative">
        <div v-if="showBackground" class="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 border-r-2 border-dashed border-gray-300" />
      </div>
      <div class="flex flex-col">
        <header ref="headerRef" class="relative bg-[var(--bg-charcoal)] text-center text-slate-100">
          <div class="absolute -top-12 bg-linear-to-b from-transparent to-[var(--bg-charcoal)] to-70% h-12 w-full z-10" />
          <div class="text-2xl md:text-5xl">THE RISK OF</div>
          <div class="text-5xl md:text-7xl xl:text-[8rem] leading-none uppercase">{{ props.header }}</div>
        </header>

        <div class="bg-[var(--bg-charcoal)]">
          <p ref="bodyRef" class="bg-[var(--bg-charcoal)] z-30 mx-auto max-w-270 px-4 md:px-8 text-center text-base md:text-2xl leading-normal text-[#f0b7f3]">
            <slot />
          </p>

          <section ref="statsOneRef" class="w-full md:w-11/12 z-20 mx-auto bg-[var(--bg-charcoal)] grid max-w-330 grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-4 md:px-12 pt-4 md:pt-[2%]">
            <slot name="stat1" />
            <slot name="stat2" />
          </section>

          <section ref="statsTwoRef" class="relative w-full md:w-11/12 z-20 mx-auto bg-[var(--bg-charcoal)] grid max-w-330 grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-4 md:px-12 pt-4 md:pt-[2%]">
            <slot name="stat3" />
            <slot name="stat4" />
            <div class="absolute -bottom-14 bg-linear-to-t from-transparent to-[var(--bg-charcoal)] h-14 w-full z-10" />
          </section>
        </div>
      </div>
      <div class="grow bg-[var(--bg-charcoal)]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Vue from "vue";

const props = withDefaults(defineProps<{
  header: string;
  showBackground?: boolean;
}>(), {
  showBackground: true,
});

const riskRef = Vue.ref<HTMLElement | null>(null);
const headerRef = Vue.ref<HTMLElement | null>(null);
const bodyRef = Vue.ref<HTMLElement | null>(null);
const statsOneRef = Vue.ref<HTMLElement | null>(null);
const statsTwoRef = Vue.ref<HTMLElement | null>(null);

defineExpose({
  $el: riskRef,
  header: headerRef,
  body: bodyRef,
  statsOne: statsOneRef,
  statsTwo: statsTwoRef,
});
</script>
