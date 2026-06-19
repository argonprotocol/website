<template>
  <h1>
    <ol>
      <li v-for="breadcrumb of breadcrumbs" :key="breadcrumb.link">
        <RouterLink :to="breadcrumb.link">{{ breadcrumb.title }}</RouterLink>
      </li>
    </ol>
    <slot />
  </h1>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import { useRoute } from 'vue-router';
import toc from './toc.json';

const route = useRoute();

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
      title: 'Documentation',
      link: '/docs',
    },
    ...(parentGroup && parentFolder
      ? [{
        title: parentGroup.title,
        link: `/docs/${parentFolder}`,
      }]
      : []),
  ];
});

</script>

<style scoped>
@import "../../main.css";

h1 {
  @apply font-light font-serif text-5xl leading-normal;
  ol {
    @apply flex flex-row list-none p-0 m-0;
  }
  ol li {
    @apply block tracking-widest text-md not-italic font-sans uppercase font-semibold opacity-60;
    &:after {
      content: "/";
      @apply mx-3 opacity-40;
    }
    &:last-child:after {
      content: "";
    }
  }
}

</style>
