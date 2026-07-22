<template>
  <div class="UpdateArticle Screen min-h-screen bg-[var(--bg-color)] text-slate-800">
    <TopBar mode="light" />

    <main class="mx-auto w-full max-w-4xl px-5 pb-20 pt-12 md:px-10 md:pt-20">
      <RouterLink to="/updates" class="text-sm font-bold uppercase tracking-[0.12em] no-underline!">
        ← All updates
      </RouterLink>

      <div v-if="isLoading" class="mt-12 text-slate-500">Loading update…</div>

      <div v-else-if="error || !article" class="mt-12 rounded-xl border border-argon-error/30 bg-white/50 p-8">
        <h1 class="font-serif text-3xl text-slate-900">Update not found</h1>
        <p class="mt-2 text-slate-600">This article may have moved or is temporarily unavailable.</p>
        <RouterLink to="/updates" class="mt-4 inline-block font-semibold">Return to Updates →</RouterLink>
      </div>

      <article v-else class="mt-10">
        <header class="border-b border-argon-200/70 pb-8">
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-[0.08em]">
            <span class="text-argon-700">{{ article.categories[0] || 'Argon update' }}</span>
            <time class="text-slate-500">{{ formatUpdateDate(article.publishedAt) }}</time>
            <span v-if="article.author" class="text-slate-500">By {{ article.author }}</span>
          </div>
          <h1 class="mt-4 font-serif text-4xl leading-tight text-black md:text-6xl">{{ article.title }}</h1>
          <p v-if="article.summary" class="mt-5 text-lg leading-relaxed text-slate-600 md:text-xl">
            {{ article.summary }}
          </p>
          <img
            v-if="article.imageUrl"
            :src="article.imageUrl"
            :alt="article.title"
            class="mx-auto mt-8 max-h-96 w-full rounded-xl border border-argon-200/60 bg-white/50 object-contain p-4 md:p-8"
          />
        </header>

        <div class="ArticleBody" v-html="article.contentHtml" />

        <footer class="mt-14 border-t border-argon-200/70 pt-7">
          <p class="text-sm text-slate-500">
            Originally published by {{ feed?.publication || 'Argon' }}.
            <a :href="article.url" target="_blank" rel="noopener">View the original on Substack →</a>
          </p>

          <nav class="mt-8 grid gap-4 sm:grid-cols-2" aria-label="More updates">
            <RouterLink
              v-if="previousArticle"
              :to="updatePath(previousArticle)"
              class="rounded-lg border border-argon-200/70 bg-white/30 p-4 no-underline! hover:bg-white/60"
            >
              <span class="block text-xs font-bold uppercase tracking-wider text-slate-500">Newer</span>
              <span class="mt-1 block font-serif text-lg text-slate-900">← {{ previousArticle.title }}</span>
            </RouterLink>
            <RouterLink
              v-if="nextArticle"
              :to="updatePath(nextArticle)"
              class="rounded-lg border border-argon-200/70 bg-white/30 p-4 text-right no-underline! hover:bg-white/60 sm:col-start-2"
            >
              <span class="block text-xs font-bold uppercase tracking-wider text-slate-500">Older</span>
              <span class="mt-1 block font-serif text-lg text-slate-900">{{ nextArticle.title }} →</span>
            </RouterLink>
          </nav>

          <div class="mt-10 flex flex-col items-center justify-between gap-5 rounded-xl border border-argon-200/60 bg-white/30 p-6 text-center sm:flex-row sm:text-left">
            <div>
              <h2 class="font-serif text-2xl text-slate-900">Get Argon updates by email</h2>
              <p class="mt-1 text-slate-600">Major releases and announcements, delivered through Substack.</p>
            </div>
            <a
              :href="feed?.subscribeUrl || `${SUBSTACK_URL}/subscribe`"
              target="_blank"
              rel="noopener"
              class="rounded-lg bg-argon-600 px-5 py-3 font-bold text-white! no-underline! hover:bg-argon-700"
            >
              Subscribe
            </a>
          </div>
        </footer>
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import { useRoute } from 'vue-router';
import TopBar from '@/navigation/TopBar.vue';
import {
  formatUpdateDate,
  loadUpdates,
  updatePath,
  type UpdateArticle,
  type UpdatesFeed,
} from '@/lib/Updates';

const SUBSTACK_URL = 'https://clarkbyrnes.substack.com';
const route = useRoute();
const feed = Vue.ref<UpdatesFeed>();
const isLoading = Vue.ref(true);
const error = Vue.ref<unknown>();

const articleIndex = Vue.computed(() =>
  feed.value?.items.findIndex(item => item.id === route.params.slug) ?? -1,
);
const article = Vue.computed<UpdateArticle | undefined>(() =>
  articleIndex.value >= 0 ? feed.value?.items[articleIndex.value] : undefined,
);
const previousArticle = Vue.computed(() =>
  articleIndex.value > 0 ? feed.value?.items[articleIndex.value - 1] : undefined,
);
const nextArticle = Vue.computed(() =>
  articleIndex.value >= 0 ? feed.value?.items[articleIndex.value + 1] : undefined,
);

const originalTitle = document.title;
let canonicalLink: HTMLLinkElement | undefined;

Vue.watch(article, current => {
  if (!current) return;
  document.title = `${current.title} — Argon`;
  canonicalLink?.remove();
  canonicalLink = document.createElement('link');
  canonicalLink.rel = 'canonical';
  canonicalLink.href = current.url;
  canonicalLink.dataset.argonUpdateCanonical = 'true';
  document.head.append(canonicalLink);
});

Vue.onMounted(async () => {
  try {
    feed.value = await loadUpdates();
  } catch (caught) {
    error.value = caught;
  } finally {
    isLoading.value = false;
  }
});

Vue.onUnmounted(() => {
  document.title = originalTitle;
  canonicalLink?.remove();
});
</script>

<style scoped>
@reference "../../main.css";

.ArticleBody {
  @apply mt-10 text-base leading-8 text-slate-700 md:text-lg;
}

.ArticleBody :deep(h2) {
  @apply mb-4 mt-12 font-serif text-3xl leading-tight text-slate-900 md:text-4xl;
}

.ArticleBody :deep(h3) {
  @apply mb-3 mt-10 font-serif text-2xl leading-tight text-slate-900 md:text-3xl;
}

.ArticleBody :deep(h4) {
  @apply mb-3 mt-8 font-serif text-xl text-slate-900 md:text-2xl;
}

.ArticleBody :deep(p) {
  @apply my-5;
}

.ArticleBody :deep(ul),
.ArticleBody :deep(ol) {
  @apply my-5 pl-7;
}

.ArticleBody :deep(ul) {
  @apply list-disc;
}

.ArticleBody :deep(ol) {
  @apply list-decimal;
}

.ArticleBody :deep(li) {
  @apply my-2 pl-1;
}

.ArticleBody :deep(blockquote) {
  @apply my-7 border-l-4 border-argon-300 bg-white/35 px-5 py-2 italic text-slate-600;
}

.ArticleBody :deep(img) {
  @apply my-8 h-auto max-w-full rounded-lg;
}

.ArticleBody :deep(figure) {
  @apply my-8;
}

.ArticleBody :deep(figcaption) {
  @apply mt-2 text-center text-sm text-slate-500;
}

.ArticleBody :deep(pre) {
  @apply my-7 overflow-x-auto rounded-lg bg-slate-900 p-5 text-sm leading-6 text-slate-100;
}

.ArticleBody :deep(code) {
  @apply rounded bg-white/60 px-1.5 py-0.5 text-sm;
}

.ArticleBody :deep(pre code) {
  @apply bg-transparent p-0 text-inherit;
}

.ArticleBody :deep(table) {
  @apply my-8 block w-full overflow-x-auto border-collapse text-sm;
}

.ArticleBody :deep(th),
.ArticleBody :deep(td) {
  @apply border border-argon-200/70 px-3 py-2 text-left;
}

.ArticleBody :deep(iframe) {
  @apply my-8 aspect-video h-auto w-full rounded-lg;
}
</style>
