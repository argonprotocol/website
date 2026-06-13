<template>
  <div ref="overlayRef" class="ScrollGroup Component" :class="twMerge('relative min-h-screen', attrs.class as string)">
    <slot
        :setFadeWhenLeavingRef="setFadeWhenLeavingRef"
        :setMoveWhenLeavingRef="setMoveWhenLeavingRef"
        :setMoveWhenAtEndRef="setMoveWhenAtEndRef"
        :setTopWhileScrollingRef="setTopWhileScrollingRef"
        :setMoveToCenterRef="setMoveToCenterRef"
    />
  </div>
</template>

<script setup lang="ts">
import * as Vue from "vue";
import type { VNodeRef } from "vue";
import * as gsapUtils from '../lib/gsapUtils';
import { twMerge } from 'tailwind-merge';

const attrs = Vue.useAttrs();

const overlayRef = Vue.ref<HTMLElement | null>(null);

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
  $fadeWhenLeavingEls: fadeWhenLeavingRefs,
  $moveWhenLeavingEls: moveWhenLeavingRefs,
  $moveWhenAtEndEls: moveWhenAtEndRefs,
  $topWhileScrollingEls: topWhileScrollingRefs,
  $moveToCenterEls: moveToCenterRefs,
});
</script>
