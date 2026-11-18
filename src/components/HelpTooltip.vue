<template>
  <TooltipProvider :delay-duration="300">
    <TooltipRoot v-model:open="open" disable-closing-trigger>
      <TooltipTrigger
        type="button"
        :aria-label="label"
        class="inline-flex size-6 shrink-0 cursor-help items-center justify-center rounded-full text-argon-700/70 hover:text-argon-700 focus-visible:outline-2 focus-visible:outline-argon-500"
        @click="open = true"
      >
        <InformationCircleIcon class="size-4" aria-hidden="true" />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          class="z-50 max-w-64 rounded-lg border border-argon-200/60 bg-white px-3 py-2 text-sm leading-relaxed text-argon-text-primary shadow-lg"
          :side-offset="6"
          :collision-padding="12"
        >
          <slot />
          <TooltipArrow class="fill-white" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { InformationCircleIcon } from '@heroicons/vue/24/outline';
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui';

defineProps<{ label: string }>();
const open = ref(false);
</script>
