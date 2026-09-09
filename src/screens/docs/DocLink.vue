<template>
  <a
    v-if="!isEnabled"
    v-bind="$attrs"
    class="opacity-50 pointer-events-none cursor-default"
    role="link"
    aria-disabled="true"
    tabindex="-1"
    @click.stop.prevent
    @keydown.enter.stop.prevent
  >
    <slot />
  </a>
  <RouterLink v-else v-bind="$attrs" :to="to" @click="emit('click', $event)">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRouter, type RouteLocationRaw } from 'vue-router';
import { isDocLinkActive } from './docLinkState';

defineOptions({ inheritAttrs: false });
const props = defineProps<{ to: RouteLocationRaw }>();
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const router = useRouter();
const isEnabled = computed(() => isDocLinkActive(router.resolve(props.to).path));
</script>
