<template>
  <div>
    <ol>
      <li v-for="breadcrumb of breadcrumbs" :key="breadcrumb.link">
        <template v-if="breadcrumb.isRoot">
          <button
            aria-controls="docs-leftbar"
            :aria-expanded="isDocsLeftbarOpen"
            class="DOCS_MENU_TRIGGER"
            type="button"
            @click="docsLeftbar?.toggle()"
          >
            <LeftbarIcon class="w-4 h-4 mr-2" />
            <span>{{ breadcrumb.title }}</span>
          </button>
          <div class="DOCS_DESKTOP_LINK" :to="breadcrumb.link">
            <LeftbarIcon class="w-4 h-4 mr-2" />
            <span>{{ breadcrumb.title }}</span>
          </div>
        </template>
        <template v-else>
          <RouterLink :to="breadcrumb.link">{{ breadcrumb.title }}</RouterLink>
        </template>
      </li>
    </ol>
    <h1>
      <slot />
    </h1>
  </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import { useRoute } from 'vue-router';
import LeftbarIcon from '@/assets/leftbar.svg?component';
import toc from './toc.json';

const route = useRoute();
const docsLeftbar = Vue.inject<{
  isOpen: Readonly<Vue.Ref<boolean>>;
  toggle: () => void;
  close: () => void;
}>('docsLeftbar');
const isDocsLeftbarOpen = Vue.computed(() => docsLeftbar?.isOpen.value ?? false);

type TocGroup = {
  title: string;
  base?: string;
  link?: string;
};

function cleanDocPath(path: unknown) {
  return String(path ?? '')
    .trim()
    .replace(/^\/?docs\/?/, '')
    .replace(/^\/+|\/+$/g, '');
}

const breadcrumbs = Vue.computed(() => {
  const parentFolder = cleanDocPath(route.params.id);
  const parentGroup = (toc as TocGroup[]).find((group) => cleanDocPath(group.base) === parentFolder);

  return [
    {
      title: 'Docs',
      link: '/docs',
      isRoot: true,
    },
    ...(parentGroup && parentFolder
      ? [{
        title: parentGroup.title,
        link: `/docs/${parentFolder}`,
        isRoot: false,
      }]
      : []),
  ];
});

</script>

<style scoped>
@import "../../main.css";

ol {
  @apply flex flex-row list-none py-0 px-4 m-0 bg-argon-200/10 border-b border-argon-200/50 md:border-b-0 md:bg-none;
}

ol li {
  @apply flex flex-row items-center my-2 tracking-widest text-md not-italic font-sans uppercase font-semibold opacity-60;
  &:after {
    content: "/";
    @apply mx-3 opacity-40;
  }
  &:last-child:after {
    content: "";
  }
}

.DOCS_MENU_TRIGGER,
.DOCS_DESKTOP_LINK,
ol a {
  @apply flex flex-row items-center text-inherit no-underline! decoration-transparent! hover:decoration-transparent!;
}

.DOCS_MENU_TRIGGER {
  @apply -mx-2 cursor-pointer appearance-none rounded-md border-0 bg-transparent px-2 py-1 text-inherit uppercase hover:bg-argon-200/25 focus-visible:bg-argon-200/25 focus-visible:outline-none md:hidden;
}

.DOCS_DESKTOP_LINK {
  @apply hidden md:flex;
}

h1 {
  @apply font-light font-serif mt-5 md:mt-0 text-4xl md:text-5xl leading-snug px-4;
}

</style>
