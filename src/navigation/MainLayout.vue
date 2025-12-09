<template>
  <div class="flex flex-col min-h-screen pb-20">
    <TopBar class="relative z-10" />
    <slot />
  </div>
  <FooterBar class="relative z-10" />
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import TopBar from './TopBar.vue';
import FooterBar from './FooterBar.vue';

</script>