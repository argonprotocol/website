<template>
  <nav v-if="headings.length > 1" class="DOCSPAGENAV" aria-label="On this page">
    <p class="mb-3 pl-3 text-xs font-semibold uppercase tracking-widest text-argon-900/50">On this page</p>
    <ol class="border-l border-slate-300">
      <li v-for="heading in headings" :key="heading.id">
        <a
          :href="`#${encodeURIComponent(heading.id)}`"
          :aria-current="activeId === heading.id ? 'location' : undefined"
        >
          {{ heading.textContent?.trim() }}
        </a>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import * as Vue from 'vue';

const props = defineProps<{
  content: HTMLElement | null;
}>();

const headingSelector = '.DocContent > h2, .DocContent > section > h2';
const headings = Vue.shallowRef<HTMLElement[]>([]);
const activeId = Vue.ref('');
let frame: number | undefined;

function updateActiveHeading() {
  frame = undefined;
  const items = headings.value;
  const threshold = Math.min(window.innerHeight * 0.25, 160);
  let active = items[0];

  for (const heading of items) {
    if (heading.getBoundingClientRect().top > threshold) break;
    active = heading;
  }

  if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    active = items[items.length - 1];
  }

  activeId.value = active?.id ?? '';
}

function scheduleActiveHeading() {
  if (frame === undefined) frame = window.requestAnimationFrame(updateActiveHeading);
}

Vue.watch(() => props.content, (content, _previous, onCleanup) => {
  headings.value = [];
  activeId.value = '';
  if (!content) return;

  let pendingHash = window.location.hash;

  function collectHeadings() {
    const items = Array.from(content!.querySelectorAll<HTMLElement>(headingSelector));
    const usedIds = new Set(Array.from(document.querySelectorAll('[id]'), element => element.id));

    for (const heading of items) {
      if (heading.id) continue;
      const base = heading.textContent?.trim().toLowerCase().normalize('NFKD')
        .replace(/\p{M}/gu, '').replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s+/g, '-') || 'section';
      let id = base;
      let suffix = 2;
      while (usedIds.has(id)) id = `${base}-${suffix++}`;
      heading.id = id;
      usedIds.add(id);
    }

    headings.value = items;

    if (pendingHash && pendingHash === window.location.hash) {
      const target = items.find(heading => `#${encodeURIComponent(heading.id)}` === pendingHash);
      if (target) {
        target.scrollIntoView();
        pendingHash = '';
      }
    }

    scheduleActiveHeading();
  }

  const observer = new MutationObserver(records => {
    const affectsHeadings = records.some(record => {
      if (headings.value.some(heading => heading.contains(record.target))) return true;
      return [...record.addedNodes, ...record.removedNodes].some(node => node instanceof Element
        && (node.matches('h2') || node.querySelector('h2')));
    });
    if (affectsHeadings) collectHeadings();
  });

  observer.observe(content, { childList: true, characterData: true, subtree: true });
  const resizeObserver = new ResizeObserver(scheduleActiveHeading);
  resizeObserver.observe(content);
  collectHeadings();

  onCleanup(() => {
    observer.disconnect();
    resizeObserver.disconnect();
  });
}, { immediate: true, flush: 'post' });

Vue.onMounted(() => {
  window.addEventListener('scroll', scheduleActiveHeading, { passive: true });
  window.addEventListener('resize', scheduleActiveHeading);
});

Vue.onBeforeUnmount(() => {
  if (frame !== undefined) window.cancelAnimationFrame(frame);
  window.removeEventListener('scroll', scheduleActiveHeading);
  window.removeEventListener('resize', scheduleActiveHeading);
});
</script>

<style scoped>
@import "../../main.css";

.DOCSPAGENAV {
  @apply sticky top-8 mt-11 hidden max-h-[calc(100dvh-4rem)] w-64 shrink-0 self-start overflow-y-auto py-1 pr-8 2xl:block;

  a {
    @apply -ml-px block border-l-2 border-transparent py-1.5 pl-3 text-sm leading-snug font-medium text-slate-600 no-underline hover:border-argon-300 hover:text-argon-700 focus-visible:rounded-r focus-visible:outline-2 focus-visible:outline-argon-600;

    &[aria-current="location"] {
      @apply border-argon-600 text-argon-700;
    }
  }
}
</style>
