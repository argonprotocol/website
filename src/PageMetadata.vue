<template>
  <Teleport v-if="prerender || isMounted" to="head" :disabled="prerender">
    <template v-if="route.path.replace(/\/$/, '') === '/why-its-better'">
      <title>The Better Stablecoin | Argon</title>
      <meta name="description" content="Argon solves the biggest problems of fiat money and digital stablecoins: inflation, the collapse of fiat money, and death spirals.">
      <link rel="canonical" href="https://argon.network/why-its-better">
    </template>
    <title v-else>Argon - The Better Stablecoin</title>
    <meta v-if="route.path.replace(/\/$/, '') === '/trade'" name="robots" content="noindex, nofollow">
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

defineProps<{ prerender?: boolean }>();

const route = useRoute();
const isMounted = ref(false);

onMounted(() => {
  document.head.querySelectorAll('title, meta[name="description"], link[rel="canonical"], meta[name="robots"]')
    .forEach(element => element.remove());
  isMounted.value = true;
});
</script>
