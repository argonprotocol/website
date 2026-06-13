<template>
  <div ref="overlayRef" class="ScrollOverlay Component relative py-3 px-3 md:py-5 md:px-5 h-screen">
    <div Background class="absolute inset-0 bg-[var(--bg-charcoal)] hidden" />
    <div class="relative bg-[var(--bg-charcoal)] rounded-lg" style="box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.5)">
      <div
        ref="gsapBackgroundToRef"
        style="box-shadow: inset 1px 1px 1px rgba(255, 255, 255, 0.2)"
        class="relative flex flex-col items-center h-[calc(100vh-24px)] md:h-[calc(100vh-40px)] rounded-lg border border-black shadow-lg"
        :class="[props.color === 'argon' ? 'bg-[#EADDEC]' : 'bg-[#3C3844]']"
      >
        <div class="grow mx-2 mt-2 overflow-hidden flex flex-col items-center w-full">
          <div v-if="slots.header" class="relative z-30 isolate w-full px-4" :class="[props.color === 'argon' ? 'bg-[#EADDEC]' : 'bg-[#3C3844]']">
            <slot name="header" />
            <div class="absolute w-full h-10 left-0 -bottom-10 bg-linear-to-b from-[#3C3844] to-transparent" />
          </div>
          <div ref="contentRef" class="relative grow flex flex-col z-20">
            <slot
              :setFadeWhenLeavingRef="setFadeWhenLeavingRef"
              :setMoveWhenLeavingRef="setMoveWhenLeavingRef"
              :setMoveWhenAtEndRef="setMoveWhenAtEndRef"
              :setTopWhileScrollingRef="setTopWhileScrollingRef"
              :setMoveToCenterRef="setMoveToCenterRef"
            />
          </div>
        </div>
        <div v-if="props.color === 'charcoal'" class="absolute left-0 right-0 md:-left-5 md:-right-5 -bottom-5 bg-linear-to-b from-transparent to-[var(--bg-charcoal)] to-90% h-1/2 z-10" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Vue from "vue";
import * as gsapUtils from '../lib/gsapUtils';
import type {VNodeRef} from "vue";

const props = defineProps<{
  color: 'argon' | 'charcoal'
}>();

const slots = Vue.useSlots();

const overlayRef = Vue.ref<HTMLElement | null>(null);
const contentRef = Vue.ref<HTMLElement | null>(null);

const gsapBackgroundToRef = Vue.ref<HTMLElement | null>(null)
const fadeWhenLeavingRefs = Vue.ref<HTMLElement[]>([]);
const moveWhenLeavingRefs = Vue.ref<HTMLElement[]>([]);
const moveWhenAtEndRefs = Vue.ref<HTMLElement[]>([]);
const topWhileScrollingRefs = Vue.ref<HTMLElement[]>([]);
const moveToCenterRefs = Vue.ref<HTMLElement[]>([]);

const setFadeWhenLeavingRef: VNodeRef = gsapUtils.setRef(fadeWhenLeavingRefs);
const setMoveWhenLeavingRef: VNodeRef = gsapUtils.setRef(moveWhenLeavingRefs);
const setMoveWhenAtEndRef: VNodeRef = gsapUtils.setRef(moveWhenAtEndRefs);
const setTopWhileScrollingRef: VNodeRef = gsapUtils.setRef(topWhileScrollingRefs);
const setMoveToCenterRef: VNodeRef = gsapUtils.setRef(moveToCenterRefs);

defineExpose({
  $el: overlayRef,
  $contentEl: contentRef,
  $fadeWhenLeavingEls: fadeWhenLeavingRefs,
  $moveWhenLeavingEls: moveWhenLeavingRefs,
  $moveWhenAtEndEls: moveWhenAtEndRefs,
  $topWhileScrollingEls: topWhileScrollingRefs,
  $moveToCenterEls: moveToCenterRefs,
  $gsapBackgroundToEl: gsapBackgroundToRef,
});
</script>

<style>
.ScrollOverlay {
  text-shadow :1px 1px 1px rgba(255, 255, 255, 0.2);
}
.ScrollOverlay.gsap-is-at-or-above-top {
  [Background] {
    display: block !important;
  }
}

</style>
