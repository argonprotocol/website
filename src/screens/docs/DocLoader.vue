<template>
  <MainLayout>
    <div class="flex flex-col-reverse items-stretch pb-10 md:flex-row min-h-screen">
<!--      <div-->
<!--        id="docs-leftbar"-->
<!--        class="LEFTBAR"-->
<!--        :class="{ 'translate-x-0': isLeftbarOpen, '-translate-x-full': !isLeftbarOpen }"-->
<!--      >-->
<!--        <template v-if="docsToc" v-for="(group, i1) in docsToc" :key="`title-${i1}`">-->
<!--          <template v-if="group.items">-->
<!--            <h3 class="mt-5 whitespace-nowrap font-semibold uppercase tracking-widest text-argon-900/40">{{ group.title }}</h3>-->
<!--            <template v-for="(item, i2) in group.items" :key="`title-${i1}-${i2}`">-->
<!--              <RouterLink-->
<!--                :class="{ isSelected: isSelected(resolveDocPath(group.base, item.link)) }"-->
<!--                class="block whitespace-nowrap pl-5"-->
<!--                @click="closeLeftbar"-->
<!--                :to="resolveDocPath(group.base, item.link)"-->
<!--              >-->
<!--                {{ item.title }}-->
<!--              </RouterLink>-->
<!--            </template>-->
<!--          </template>-->
<!--          <RouterLink-->
<!--              v-else-->
<!--              class="block whitespace-nowrap pl-2"-->
<!--              :class="{ isSelected: isSelected(group.link) }"-->
<!--              @click="closeLeftbar"-->
<!--              :to="cleanPath(group.link)"-->
<!--          >-->
<!--            {{ group.title }}-->
<!--          </RouterLink>-->
<!--        </template>-->
<!--        <div Fade />-->
<!--      </div>-->
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

  if (!section) return 'index';
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

.LEFTBAR {
  box-shadow: 1px 0 0 white;
  @apply fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] overflow-x-hidden overflow-y-auto border-r border-slate-300 bg-argon-50 pl-6 pr-8 py-5 transition-transform duration-200 ease-out md:relative md:inset-auto md:z-auto md:w-auto md:max-w-none md:translate-x-0 md:overflow-visible md:pr-12 md:bg-argon-50/50;

  div[Fade] {
    @apply bg-linear-to-b from-argon-50/50 to-transparent absolute top-full left-0 w-full h-30;
    &::before {
      content: "";
      @apply bg-linear-to-b from-slate-300 to-transparent absolute top-0 -right-px w-px h-full;
    }
    &::after {
      content: "";
      @apply bg-linear-to-b from-white to-transparent absolute top-0 -right-0.5 w-px h-full;
    }
  }

  a {
    font-size: 0.9rem;
    margin-top: 5px;
    line-height: 1em;
    @apply text-gray-700 no-underline pl-0 py-1;

    &.isSelected {
      @apply text-argon-600 border-argon-600 border-l-4 pl-2 -ml-3;
    }
  }
}

.DOCSCONTENT {
  h2 {
    @apply font-bold text-lg text-slate-900/80 mt-10;
  }

  header {
    @apply mt-2 font-bold;
  }

  ul > li,
  p {
    @apply mb-4;
  }

  ol > li {
    @apply mt-2;
  }

  ol {
    @apply ml-6;
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
</style>
