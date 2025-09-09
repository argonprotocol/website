<template>
  <div class="flex flex-col min-h-screen">
    <TopBar class="relative z-10" />

    <div class="mt-20 w-10/12 mx-auto">
      <START />
      <h1 class="text-4xl font-light mt-10 mb-10 leading-12">
        Resources to Help You Get Started As a Miner or Vaulter.
      </h1>
    </div>
  </div>
  
  <FooterBar class="relative z-10" />
</template>

<script setup lang="ts">
import TopBar from '../../navigation/TopBar.vue';
import FooterBar from '../../navigation/FooterBar.vue';
import START from '../../assets/START.svg?component';
</script>

