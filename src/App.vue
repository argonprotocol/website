<template>
  <RouterView v-if="route.meta.skipNetworkData || isLoaded" />
  <main v-else class="flex min-h-dvh items-center justify-center p-6 text-center">
    <div>
      <template v-if="loadFailed">
        <p>Unable to load the latest network data.</p>
        <button type="button" class="mt-4" @click="loadData">Retry</button>
      </template>
      <p v-else>Loading network data...</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Data from '@/lib/Data';

const route = useRoute();
const isLoaded = ref(false);
const loadFailed = ref(false);

async function loadData() {
  loadFailed.value = false;

  try {
    await Data.load();
    isLoaded.value = true;
  } catch {
    loadFailed.value = true;
  }
}

watch(() => route.meta.skipNetworkData, skip => {
  if (!skip && !isLoaded.value) void loadData();
}, { immediate: true });
</script>
