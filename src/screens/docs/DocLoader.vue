<template>
  <MainLayout>
    <div class="flex min-h-screen flex-col-reverse items-stretch pb-10 xl:flex-row">
      <div
        ref="leftbarWrapperRef"
        id="docs-leftbar"
        class="LEFTBARWRAPPER"
        :class="{ 'translate-x-0': isLeftbarOpen, '-translate-x-full': !isLeftbarOpen }"
      >
        <div ref="leftbarRef" class="LEFTBAR" @wheel="revealLeftbarTop" @scroll.passive="updateLeftbarScrollCue">
          <div ref="leftbarContentRef" class="LEFTBARCONTENT">
            <template v-if="docsToc" v-for="(group, i1) in docsToc" :key="`title-${i1}`">
              <template v-if="group.items">
                <h3 class="mt-5 whitespace-nowrap font-semibold uppercase tracking-widest text-argon-900/40">{{ group.title }}</h3>
                <template v-for="(item, i2) in group.items" :key="`title-${i1}-${i2}`">
                  <DocLink
                    :class="{ isSelected: isDocLinkActive(resolveDocPath(group.base, item.link)) && isSelected(resolveDocPath(group.base, item.link)) }"
                    class="block whitespace-nowrap pl-5"
                    @click="closeLeftbar"
                    @mouseenter="prefetchPage(resolveDocPath(group.base, item.link))"
                    @focusin="prefetchPage(resolveDocPath(group.base, item.link))"
                    :to="resolveDocPath(group.base, item.link)"
                  >
                    <template v-if="Array.isArray(item.title)">
                      <span>{{ item.title[0] }}</span>
                      <span class="opacity-50 ml-1">({{ item.title[1] }})</span>
                    </template>
                    <template v-else>
                      {{ item.title }}
                    </template>
                  </DocLink>
                </template>
              </template>
              <DocLink
                  v-else
                  class="block whitespace-nowrap pl-2"
                  :class="{ isSelected: isSelected(group.link) }"
                  @click="closeLeftbar"
                  @mouseenter="prefetchPage(cleanPath(group.link))"
                  @focusin="prefetchPage(cleanPath(group.link))"
                  :to="cleanPath(group.link)"
              >
                {{ group.title }}
              </DocLink>
            </template>
          </div>
        </div>
        <div v-if="isLeftbarBottomVisible" class="LEFTBARTEXTFADE" aria-hidden="true" />
        <div v-if="canScrollLeftbarDown" class="LEFTBARSCROLLCUE" aria-hidden="true">
          <svg class="LEFTBARSCROLLARROWS" width="28" height="32" viewBox="0 0 28 32" fill="none">
            <path d="m6 9 8 7 8-7M6 18l8 7 8-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div Fade />
      </div>
      <button
        v-if="isLeftbarOpen"
        aria-label="Close documentation menu"
        class="fixed inset-0 z-40 bg-slate-950/30 xl:hidden"
        type="button"
        @click="closeLeftbar"
      />

      <div class="DOCSCONTENT min-w-0 flex-1 max-w-full">
        <div class="max-w-[52rem] xl:mx-32 xl:mt-5">
          <div class="post mb min-h-screen xl:pt-6">
            <component :is="activePage" v-if="activePage" />
            <div v-else class="py-6">
              <h2 class="text-xl font-semibold">Documentation</h2>
              <p class="mt-2">This page could not be found.</p>
            </div>
          </div>
<!--          <div class="relative top-10">-->
<!--            <div class="h-px bg-linear-to-r from-slate-300 to-transparent w-full mb-5" />-->
<!--            <a class="github-edit-link flex flex-row gap-x-2" href="editLink" target="_blank">-->
<!--              <GithubLogo />-->
<!--              <span>Edit this page on GitHub</span>-->
<!--            </a>-->
<!--            <div class="h-px bg-linear-to-r from-slate-300 to-transparent w-full mt-5" />-->
<!--          </div>-->
        </div>
      </div>
      <div class="RIGHTBAR">

      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import { useRoute } from 'vue-router';
import DocLink from './DocLink.vue';
import { isDocLinkActive } from './docLinkState';
import toc from './toc.json';
import MainLayout from '@/navigation/MainLayout.vue';
import GithubLogo from '@/assets/github.svg?component';

const route = useRoute();
const isLeftbarOpen = Vue.ref(false);
const leftbarWrapperRef = Vue.ref<HTMLElement | null>(null);
const leftbarRef = Vue.ref<HTMLElement | null>(null);
const leftbarContentRef = Vue.ref<HTMLElement | null>(null);
const isLeftbarBottomVisible = Vue.ref(false);
const canScrollLeftbarDown = Vue.ref(false);
let leftbarResizeObserver: ResizeObserver | undefined;

function updateLeftbarScrollCue() {
  const leftbar = leftbarRef.value;
  canScrollLeftbarDown.value = !!leftbar && leftbar.scrollHeight - leftbar.clientHeight - leftbar.scrollTop > 2;
}

function revealLeftbarTop(event: WheelEvent) {
  const wrapper = leftbarWrapperRef.value;
  const leftbar = event.currentTarget as HTMLElement;
  if (!wrapper || event.deltaY >= 0 || event.ctrlKey || !event.cancelable) return;
  if (window.matchMedia('(max-width: 1279px)').matches) return;

  const hiddenHeight = Math.max(0, -wrapper.getBoundingClientRect().top);
  if (hiddenHeight === 0) return;

  const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE
    ? 16
    : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
      ? window.innerHeight
      : 1;
  const requestedDelta = event.deltaY * unit;
  const pageDelta = Math.max(requestedDelta, -hiddenHeight);

  event.preventDefault();
  window.scrollBy({ top: pageDelta, behavior: 'instant' });
  leftbar.scrollTop += requestedDelta - pageDelta;
}

function updateLeftbarHeight() {
  const wrapper = leftbarWrapperRef.value;
  if (!wrapper) return;

  if (window.matchMedia('(max-width: 1279px)').matches) {
    wrapper.style.height = '';
    isLeftbarBottomVisible.value = false;
    updateLeftbarScrollCue();
    return;
  }

  const visibleTop = Math.max(0, wrapper.getBoundingClientRect().top);
  wrapper.style.height = `${Math.max(0, window.innerHeight - visibleTop)}px`;
  isLeftbarBottomVisible.value = wrapper.getBoundingClientRect().bottom < window.innerHeight - 1;
  updateLeftbarScrollCue();
}

Vue.onMounted(() => {
  updateLeftbarHeight();
  leftbarResizeObserver = new ResizeObserver(updateLeftbarScrollCue);
  if (leftbarRef.value) leftbarResizeObserver.observe(leftbarRef.value);
  if (leftbarContentRef.value) leftbarResizeObserver.observe(leftbarContentRef.value);
  window.addEventListener('scroll', updateLeftbarHeight, { passive: true });
  window.addEventListener('resize', updateLeftbarHeight);
});

Vue.onBeforeUnmount(() => {
  leftbarResizeObserver?.disconnect();
  window.removeEventListener('scroll', updateLeftbarHeight);
  window.removeEventListener('resize', updateLeftbarHeight);
});

type TocItem = {
  title: string | string[];
  link: string;
  isActive: boolean;
};

type TocGroup = {
  title: string;
  base?: string;
  link?: string;
  items?: TocItem[];
};

const docsToc = toc as TocGroup[];

const closeLeftbar = () => {
  isLeftbarOpen.value = false;
};

Vue.provide('docsLeftbar', {
  isOpen: Vue.readonly(isLeftbarOpen),
  toggle: () => {
    isLeftbarOpen.value = !isLeftbarOpen.value;
  },
  close: closeLeftbar,
});

Vue.watch(() => route.fullPath, closeLeftbar);

type DocModule = { default: Vue.Component };
type DocLoaderFn = () => Promise<DocModule>;

// The active-docs-only Vite plugin replaces this glob with active TOC imports in production builds.
const pageModules = import.meta.glob<DocModule>('./**/*.vue');

function normalizeRoutePath(id?: string, subId?: string): string {
  const section = String(id ?? '').trim().toLowerCase();
  const rawPage = String(subId ?? (section ? 'index' : '')).trim().toLowerCase();
  const page = rawPage === 'overview' ? 'index' : rawPage;

  if (!section) return 'getting-started';
  if (!page || page === 'index') return section;
  return `${section}/${page}`;
}

function normalizeModulePath(modulePath: string): string {
  return modulePath
    .replace('./', '')
    .replace(/\.vue$/, '')
    .replace(/\/index$/i, '')
    .toLowerCase();
}

const moduleLookup = new Map<string, DocLoaderFn>(
  Object.entries(pageModules)
    .filter(([path]) => path !== './DocLoader.vue')
    .map(([path, loader]) => [normalizeModulePath(path), loader as DocLoaderFn]),
);

const pagePromises = new Map<string, Promise<Vue.Component>>();
const resolvedPages = new Map<string, Vue.Component>();
const asyncPages = new Map<string, Vue.Component>();

function loadPage(docPath: string): Promise<Vue.Component> {
  const cached = pagePromises.get(docPath);
  if (cached) return cached;

  const promise = moduleLookup.get(docPath)!()
    .then((module) => {
      resolvedPages.set(docPath, module.default);
      return module.default;
    })
    .catch((error) => {
      pagePromises.delete(docPath);
      throw error;
    });
  pagePromises.set(docPath, promise);
  return promise;
}

function prefetchPage(path: string) {
  if (!isDocLinkActive(path)) return;
  const [id, subId] = path.replace(/^\/docs\/?/, '').split('/');
  const docPath = normalizeRoutePath(id, subId);
  if (!moduleLookup.has(docPath)) return;
  void loadPage(docPath).catch(() => {
    // A speculative failure must not prevent a later navigation from retrying.
  });
}

const activeDocPath = Vue.computed(() => normalizeRoutePath(
  route.params.id as string | undefined,
  route.params.subId as string | undefined,
));

const activePage = Vue.computed(() => {
  const docPath = activeDocPath.value;
  if (!moduleLookup.has(docPath)) return null;
  const resolved = resolvedPages.get(docPath);
  if (resolved) return resolved;
  if (!asyncPages.has(docPath)) {
    asyncPages.set(docPath, Vue.defineAsyncComponent(() => loadPage(docPath)));
  }
  return asyncPages.get(docPath);
});

const backgroundPaths = [...new Set(docsToc.flatMap((group) => group.items
  ? group.items.map((item) => resolveDocPath(group.base, item.link))
  : [cleanPath(group.link)]))]
  .filter((path) => isDocLinkActive(path))
  .map((path) => {
    const [id, subId] = path.replace(/^\/docs\/?/, '').split('/');
    return normalizeRoutePath(id, subId);
  })
  .filter((path) => moduleLookup.has(path));

let stopWarming: (() => void) | undefined;

Vue.onMounted(() => {
  stopWarming = Vue.watch(activeDocPath, async (docPath, _previous, onCleanup) => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    onCleanup(() => {
      cancelled = true;
      clearTimeout(timer);
    });

    if (!moduleLookup.has(docPath)) return;
    try {
      await loadPage(docPath);
    } catch {
      return;
    }
    await Vue.nextTick();
    if (cancelled) return;

    const pending = backgroundPaths.filter((path) => path !== docPath && !resolvedPages.has(path));

    async function warmNextPage() {
      if (cancelled) return;
      const path = pending.shift();
      if (!path) return;
      try {
        await loadPage(path);
      } catch {
        // Leave failed imports available for an explicit navigation to retry.
      }
      if (!cancelled) timer = setTimeout(warmNextPage, 250);
    }

    timer = setTimeout(warmNextPage, 250);
  }, { immediate: true });
});

Vue.onBeforeUnmount(() => {
  stopWarming?.();
});

function isSelected(path: unknown) {
  if (!path) return false;
  const cleanedPath = cleanPath(path).toLowerCase();
  const currentPath = normalizeCurrentPath(route.path).toLowerCase();
  return currentPath === cleanedPath;
}

function cleanPath(path: unknown) {
  const normalizedPath = String(path ?? '')
    .trim()
    .replace(/^\/?docs\/?/, '')
    .replace(/^\/+|\/+$/g, '');
  return normalizedPath ? `/docs/${normalizedPath}` : '/docs';
}

function resolveDocPath(base: unknown, link: unknown) {
  const basePath = String(base ?? '')
    .trim()
    .replace(/^\/?docs\/?/, '')
    .replace(/^\/+|\/+$/g, '');

  const itemPath = String(link ?? '')
    .trim()
    .replace(/^\/?docs\/?/, '')
    .replace(/^\/+|\/+$/g, '');

  const joined = [basePath, itemPath].filter(Boolean).join('/');
  return cleanPath(joined);
}

function normalizeCurrentPath(path: string) {
  const normalizedPath = path.replace(/\/$/, '');
  return normalizedPath.replace(/(\/docs\/.+?)\/(overview|index)$/i, '$1');
}
</script>

<style>
@import "../../main.css";

.LEFTBARWRAPPER {
  @apply fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transition-transform duration-200 ease-out xl:sticky xl:top-0 xl:h-[calc(100vh-69px)] xl:inset-x-auto xl:z-auto xl:w-auto xl:max-w-none xl:translate-x-0 xl:self-start;
}

.LEFTBAR {
  @apply h-full overflow-x-hidden overflow-y-auto overscroll-y-contain xl:overscroll-y-auto;
}

.LEFTBARCONTENT {
  box-shadow: 1px 0 0 white;
  @apply min-h-full border-r border-slate-300 bg-argon-50 pl-6 pr-8 py-5 xl:pb-24 xl:pr-12 xl:bg-argon-50/50;
}

.LEFTBARTEXTFADE {
  @apply pointer-events-none absolute bottom-0 left-0 right-px hidden h-20 xl:block;
  background: linear-gradient(to top, color-mix(in oklab, var(--color-argon-50) 50%, var(--bg-color)), transparent);
}

.LEFTBARSCROLLCUE {
  @apply pointer-events-none absolute bottom-0 left-0 right-px flex h-24 items-end justify-center pb-3 text-argon-600;
  background: linear-gradient(to top, var(--color-argon-50) 52px, transparent);
}

.LEFTBARSCROLLARROWS {
  animation: leftbar-scroll-hint 1.8s ease-in-out infinite;
}

@keyframes leftbar-scroll-hint {
  0%, 100% {
    transform: translateY(-3px);
    opacity: 0.5;
  }
  50% {
    transform: translateY(3px);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .LEFTBARSCROLLARROWS {
    animation: none;
  }
}

.LEFTBAR {
  a {
    font-size: 1rem;
    margin-top: 5px;
    line-height: 1em;
    @apply text-gray-700 no-underline pl-0 py-1;

    &.isSelected {
      @apply text-argon-600 border-argon-600 border-l-4 pl-2 -ml-3;
    }
  }
}

[Fade] {
  @apply absolute top-full left-0 hidden h-30 w-full bg-linear-to-b from-argon-50/50 to-transparent xl:block;

  &::before {
    content: "";
    @apply absolute top-0 -right-px h-full w-px bg-linear-to-b from-slate-300 to-transparent;
  }
  &::after {
    content: "";
    @apply absolute top-0 -right-0.5 h-full w-px bg-linear-to-b from-white to-transparent;
  }
}

.DOCSCONTENT {
  h2 {
    @apply text-4xl text-slate-900 mt-7 mb-4 font-serif;
  }

  h3 {
    @apply text-[26px] text-slate-900/80 mt-7 mb-4 font-serif;
  }

  h4 {
    @apply text-xl text-slate-900/80 mt-5 mb-2 font-serif;
  }

  header {
    @apply mt-2 font-bold;
  }

  ul > li,
  p {
    @apply mb-4 text-base leading-relaxed;
    & > header {
      @apply mt-0;
    }
  }

  ol > li {
    @apply mt-2 text-base leading-relaxed;
  }

  ol {
    @apply mb-4 ml-6;
  }

  table {
    @apply text-md mt-3 mb-5 ml-0.5 w-full font-mono;

    th {
      @apply pb-1 text-right font-bold;
    }

    td {
      @apply border-t border-slate-300 py-1 text-right;
    }

    tr:last-child td {
      @apply border-b border-slate-300;
    }

    th:first-child,
    td:first-child {
      @apply text-left;
    }
  }
}

.RIGHTBAR {
  @apply hidden;
}
</style>
