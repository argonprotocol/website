<template>
  <div class="Updates Screen min-h-screen bg-[var(--bg-color)] text-slate-800">
    <TopBar mode="light" />

    <main class="mx-auto w-full max-w-6xl px-5 pb-20 pt-14 md:px-10 md:pt-20 lg:px-12 lg:pt-24">
      <header>
        <div class="text-sm font-bold uppercase tracking-[0.16em] text-argon-700">Argon Updates</div>
        <h1 class="mt-4 font-serif text-4xl leading-tight text-black md:text-6xl">The latest from Argon</h1>
        <p class="mt-3 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
          Network releases, desktop app updates, protocol changes, and community announcements.
        </p>
      </header>

      <div v-if="isLoading" class="mt-12 rounded-xl border border-argon-200/60 bg-white/40 p-8 text-slate-500">
        Loading the latest updates…
      </div>

      <div v-else-if="error || !featuredArticle" class="mt-12 rounded-xl border border-argon-error/30 bg-white/50 p-8">
        <h2 class="font-serif text-2xl text-slate-800">Updates are temporarily unavailable</h2>
        <p class="mt-2 text-slate-600">Visit our Substack to read the latest announcements.</p>
        <a :href="SUBSTACK_URL" target="_blank" rel="noopener" class="mt-4 inline-block font-semibold">
          View Argon on Substack →
        </a>
      </div>

      <template v-else>
        <RouterLink
          :to="updatePath(featuredArticle)"
          class="group mt-10 block rounded-xl border border-argon-200/70 bg-white/40 p-7 no-underline! transition-colors hover:border-argon-400/70 hover:bg-white/65 md:mt-12 md:p-9"
        >
          <div class="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-[0.08em]">
            <span class="rounded-md bg-argon-100 px-2.5 py-1 text-argon-700">Latest</span>
            <span class="text-slate-500">{{ formatUpdateDate(featuredArticle.publishedAt) }}</span>
          </div>
          <h2 class="mt-4 font-serif text-3xl leading-tight text-slate-900 group-hover:text-argon-800 md:text-4xl">
            {{ featuredArticle.title }}
          </h2>
          <p class="mt-3 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            {{ featuredArticle.summary }}
          </p>
          <div class="mt-4 font-semibold text-argon-700">Read update&nbsp; →</div>
        </RouterLink>

        <section class="mt-12 md:mt-16">
          <div class="flex flex-col gap-5 border-b border-argon-200/60 pb-5 md:flex-row md:items-end md:justify-between">
            <h2 class="font-serif text-3xl text-slate-900">Latest updates</h2>
            <div v-if="availableCategories.length" class="flex flex-wrap gap-2" aria-label="Filter updates by category">
              <button
                v-for="category in ['All', ...availableCategories]"
                :key="category"
                type="button"
                class="rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors"
                :class="selectedCategory === category
                  ? 'border-argon-600 bg-argon-600 text-white'
                  : 'border-argon-200 bg-white/30 text-argon-700 hover:border-argon-400 hover:bg-white/60'"
                @click="selectedCategory = category"
              >
                {{ category }}
              </button>
            </div>
          </div>

          <div v-if="listArticles.length">
            <RouterLink
              v-for="article in listArticles"
              :key="article.id"
              :to="updatePath(article)"
              class="group grid gap-3 border-b border-argon-200/60 py-6 no-underline! md:grid-cols-[120px_130px_1fr_auto] md:items-start md:gap-5"
            >
              <time class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                {{ formatUpdateDate(article.publishedAt) }}
              </time>
              <div class="text-xs font-bold uppercase tracking-[0.08em] text-argon-700">
                {{ article.categories[0] || 'Update' }}
              </div>
              <div>
                <h3 class="font-serif text-2xl leading-tight text-slate-900 group-hover:text-argon-800">
                  {{ article.title }}
                </h3>
                <p class="mt-1.5 leading-relaxed text-slate-600">{{ article.summary }}</p>
              </div>
              <span class="hidden pt-1 text-2xl text-argon-700 transition-transform group-hover:translate-x-1 md:block">→</span>
            </RouterLink>
          </div>
          <p v-else class="border-b border-argon-200/60 py-8 text-slate-500">
            No updates have been published in this category yet.
          </p>
        </section>

        <div class="mt-12 flex flex-col items-center justify-between gap-5 rounded-xl border border-argon-200/60 bg-white/30 px-6 py-6 text-center md:flex-row md:text-left">
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
      </template>

      <div class="mt-10 text-center text-slate-600">
        Join the conversation on
        <a href="https://discord.gg/xDwwDgCYr9" target="_blank" rel="noopener" class="font-semibold">Discord</a>.
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import TopBar from '@/navigation/TopBar.vue';
import { formatUpdateDate, loadUpdates, updatePath, type UpdatesFeed } from '@/lib/Updates';

const SUBSTACK_URL = 'https://clarkbyrnes.substack.com';
const feed = Vue.ref<UpdatesFeed>();
const isLoading = Vue.ref(true);
const error = Vue.ref<unknown>();
const selectedCategory = Vue.ref('All');

const featuredArticle = Vue.computed(() => feed.value?.items[0]);
const availableCategories = Vue.computed(() =>
  [...new Set(feed.value?.items.flatMap(article => article.categories) ?? [])].sort(),
);
const listArticles = Vue.computed(() => {
  const remaining = feed.value?.items.slice(1) ?? [];
  if (selectedCategory.value === 'All') return remaining;
  return remaining.filter(article => article.categories.includes(selectedCategory.value));
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
</script>
