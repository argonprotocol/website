<template>
  <div class="grow min-h-62 bg-black px-8 py-7 text-center">
    <div class="text-2xl font-bold">{{ props.title }}</div>
    <div class="mt-3 text-4xl md:text-[5.5rem] leading-none">{{ props.value }}</div>
    <p class="mt-4 text-lg md:text-xl leading-snug text-[#f0b7f3] px-8"><slot /></p>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string;
  value: string;
}>();

</script>