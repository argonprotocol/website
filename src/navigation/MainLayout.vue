<template>
  <div class="flex flex-col min-h-screen">
    <TopBar class="relative z-10" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import TopBar from './TopBar.vue';

</script>