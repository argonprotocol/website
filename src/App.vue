<template>
  <RouterView v-if="isLoaded" />
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
import { onMounted, ref } from 'vue';
import Data from '@/lib/Data';

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

onMounted(loadData);
</script>
