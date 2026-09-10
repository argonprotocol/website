<template>
  <TooltipProvider v-if="!isEnabled" :delay-duration="0" disable-hoverable-content>
    <TooltipRoot>
      <TooltipTrigger as-child :reference="tooltipReference" @pointermove="trackTooltipPointer">
        <a
          v-bind="$attrs"
          :title="undefined"
          class="opacity-50 cursor-default"
          role="link"
          aria-disabled="true"
          tabindex="-1"
          @click.stop.prevent
          @keydown.enter.stop.prevent
        >
          <slot />
        </a>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          class="pointer-events-none z-100 rounded-md bg-[#333333] px-[0.5625rem] py-[0.28125rem] text-sm font-normal text-white shadow-md"
          side="bottom"
          :side-offset="16"
          :collision-padding="8"
        >
          Coming Soon
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
  <RouterLink v-else v-bind="$attrs" :to="to" @click="emit('click', $event)">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui';
import { RouterLink, useRouter, type RouteLocationRaw } from 'vue-router';
import { isDocLinkActive } from './docLinkState';

defineOptions({ inheritAttrs: false });
const props = defineProps<{ to: RouteLocationRaw }>();
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const router = useRouter();
const isEnabled = computed(() => isDocLinkActive(router.resolve(props.to).path));
const tooltipReference = shallowRef<{ getBoundingClientRect: () => DOMRect }>();

function trackTooltipPointer(event: PointerEvent) {
  if (event.pointerType === 'touch') return;
  const { clientX, clientY } = event;
  tooltipReference.value = {
    getBoundingClientRect: () => new DOMRect(clientX, clientY, 0, 0),
  };
}

</script>
