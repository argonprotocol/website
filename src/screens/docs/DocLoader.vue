<template>
  <MainLayout>
    <div ref="docsLayoutRef" class="flex flex-col-reverse items-stretch pb-10 md:flex-row min-h-screen">
      <div
        ref="leftbarWrapperRef"
        id="docs-leftbar"
        class="LEFTBARWRAPPER"
        :class="{ 'translate-x-0': isLeftbarOpen, '-translate-x-full': !isLeftbarOpen }"
      >
        <div ref="leftbarRef" class="LEFTBAR">
          <div class="LEFTBARCONTENT">
            <template v-if="docsToc" v-for="(group, i1) in docsToc" :key="`title-${i1}`">
              <template v-if="group.items">
                <h3 class="mt-5 whitespace-nowrap font-semibold uppercase tracking-widest text-argon-900/40">{{ group.title }}</h3>
                <template v-for="(item, i2) in group.items" :key="`title-${i1}-${i2}`">
                  <RouterLink
                    :class="{ isSelected: isSelected(resolveDocPath(group.base, item.link)) }"
                    class="block whitespace-nowrap pl-5"
                    @click="handleLeftbarNavigation"
                    :to="resolveDocPath(group.base, item.link)"
                  >
                    <template v-if="Array.isArray(item.title)">
                      <span>{{ item.title[0] }}</span>
                      <span class="opacity-50 ml-1">({{ item.title[1] }})</span>
                    </template>
                    <template v-else>
                      {{ item.title }}
                    </template>
                  </RouterLink>
                </template>
              </template>
              <RouterLink
                  v-else
                  class="block whitespace-nowrap pl-2"
                  :class="{ isSelected: isSelected(group.link) }"
                  @click="handleLeftbarNavigation"
                  :to="cleanPath(group.link)"
              >
                {{ group.title }}
              </RouterLink>
            </template>
          </div>
        </div>
        <div Fade />
      </div>
      <button
        v-if="isLeftbarOpen"
        aria-label="Close documentation menu"
        class="fixed inset-0 z-40 bg-slate-950/30 md:hidden"
        type="button"
        @click="closeLeftbar"
      />

      <div class="DOCSCONTENT flex-1 max-w-full">
        <div class="md:mt-5 md:mx-32">
          <div class="post mb min-h-screen md:pt-6">
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
import toc from './toc.json';
import MainLayout from '@/navigation/MainLayout.vue';
import GithubLogo from '@/assets/github.svg?component';

const route = useRoute();
const isLeftbarOpen = Vue.ref(false);
const docsLayoutRef = Vue.ref<HTMLElement | null>(null);
const leftbarWrapperRef = Vue.ref<HTMLElement | null>(null);
const leftbarRef = Vue.ref<HTMLElement | null>(null);
let scrollFrame: number | undefined;
let layoutResizeObserver: ResizeObserver | undefined;
let preservedLeftbarScrollTop: number | undefined;

const syncLeftbarScroll = () => {
  scrollFrame = undefined;

  const layout = docsLayoutRef.value;
  const leftbarWrapper = leftbarWrapperRef.value;
  const leftbar = leftbarRef.value;
  if (!layout || !leftbarWrapper || !leftbar) return;

  if (window.matchMedia('(max-width: 767px)').matches) {
    leftbarWrapper.style.height = '';
    return;
  }

  const leftbarTop = Math.max(0, leftbarWrapper.getBoundingClientRect().top);
  leftbarWrapper.style.height = `${window.innerHeight - leftbarTop}px`;

  const layoutTop = window.scrollY + layout.getBoundingClientRect().top;
  const scrollStart = Math.max(0, layoutTop - 69);
  const scrollEnd = Math.max(scrollStart, layoutTop + layout.offsetHeight - window.innerHeight);
  const pageScrollRange = scrollEnd - scrollStart;
  const pageProgress = pageScrollRange > 0
    ? Math.min(1, Math.max(0, (window.scrollY - scrollStart) / pageScrollRange))
    : 0;
  const leftbarScrollRange = leftbar.scrollHeight - leftbar.clientHeight;
  const proportionalScrollTop = pageProgress * Math.max(0, leftbarScrollRange);

  if (
    preservedLeftbarScrollTop !== undefined
    && proportionalScrollTop < preservedLeftbarScrollTop
  ) {
    leftbar.scrollTop = preservedLeftbarScrollTop;
    return;
  }

  preservedLeftbarScrollTop = undefined;
  leftbar.scrollTop = proportionalScrollTop;
};

const requestLeftbarSync = () => {
  if (scrollFrame !== undefined) return;
  scrollFrame = window.requestAnimationFrame(syncLeftbarScroll);
};

const resumeLeftbarSync = (event: Event) => {
  const eventTarget = event.target;
  if (eventTarget instanceof Node && leftbarRef.value?.contains(eventTarget)) return;

  if (preservedLeftbarScrollTop !== undefined) {
    preservedLeftbarScrollTop = leftbarRef.value?.scrollTop;
  }
};

const resumeLeftbarSyncFromKeyboard = (event: KeyboardEvent) => {
  if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) return;
  resumeLeftbarSync(event);
};

Vue.onMounted(() => {
  window.addEventListener('scroll', requestLeftbarSync, { passive: true });
  window.addEventListener('resize', requestLeftbarSync);
  window.addEventListener('wheel', resumeLeftbarSync, { passive: true });
  window.addEventListener('touchmove', resumeLeftbarSync, { passive: true });
  window.addEventListener('keydown', resumeLeftbarSyncFromKeyboard);

  if (docsLayoutRef.value) {
    layoutResizeObserver = new ResizeObserver(requestLeftbarSync);
    layoutResizeObserver.observe(docsLayoutRef.value);
  }

  requestLeftbarSync();
});

Vue.onBeforeUnmount(() => {
  window.removeEventListener('scroll', requestLeftbarSync);
  window.removeEventListener('resize', requestLeftbarSync);
  window.removeEventListener('wheel', resumeLeftbarSync);
  window.removeEventListener('touchmove', resumeLeftbarSync);
  window.removeEventListener('keydown', resumeLeftbarSyncFromKeyboard);
  layoutResizeObserver?.disconnect();
  if (scrollFrame !== undefined) window.cancelAnimationFrame(scrollFrame);
});

type TocItem = {
  title: string;
  link: string;
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

const handleLeftbarNavigation = () => {
  preservedLeftbarScrollTop = leftbarRef.value?.scrollTop;
  closeLeftbar();
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

const activePage = Vue.computed(() => {
  const docPath = normalizeRoutePath(
    route.params.id as string | undefined,
    route.params.subId as string | undefined,
  );
  const loader = moduleLookup.get(docPath);
  return loader ? Vue.defineAsyncComponent(() => loader().then((m) => m.default)) : null;
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
  @apply fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transition-transform duration-200 ease-out md:sticky md:top-0 md:h-[calc(100vh-69px)] md:inset-x-auto md:z-auto md:w-auto md:max-w-none md:translate-x-0 md:self-start;
}

.LEFTBAR {
  @apply h-full overflow-x-hidden overflow-y-auto;
}

.LEFTBARCONTENT {
  box-shadow: 1px 0 0 white;
  @apply min-h-full border-r border-slate-300 bg-argon-50 pl-6 pr-8 py-5 md:pr-12 md:bg-argon-50/50;
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
  @apply absolute top-full left-0 hidden h-30 w-full bg-linear-to-b from-argon-50/50 to-transparent md:block;

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
    @apply text-2xl text-slate-900/80 mt-7 mb-4 font-serif;
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
  @apply min-w-80;
}
</style>
