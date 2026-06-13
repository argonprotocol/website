<template>
  <div class="grow min-h-48 md:min-h-62 bg-black px-5 md:px-8 py-5 md:py-7 text-center">
    <div class="text-lg md:text-2xl font-bold">{{ props.title }}</div>
    <div class="mt-3 text-4xl md:text-6xl xl:text-[5.5rem] leading-none">{{ props.value }}</div>
    <p class="mt-4 text-base md:text-xl leading-snug text-[#f0b7f3] px-0 md:px-8"><slot /></p>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string;
  value: string;
}>();

</script>
