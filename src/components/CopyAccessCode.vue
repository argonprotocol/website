<template>
  <div class="relative flex flex-col rounded-lg border border-slate-600/50 sm:flex-row sm:items-center">
    <div class="relative shrink-0 px-3 py-3 whitespace-nowrap sm:py-4">
      <div class="absolute -left-px -top-px w-full h-[calc(100%+2px)] rounded-lg bg-[#F2F2F2] border border-[#979797]" />
      <span class="relative">Access Code:</span>
    </div>
    <CopyToClipboard ref="copyToClipboard" :content="props.accessCode" class="relative super ml-3 flex-1 min-w-0">
      <template #default="{ isCopying }">
        <div class="overflow-hidden py-3 text-sm sm:pb-0 sm:pt-1">{{ props.accessCode }}</div>
        <div class="absolute top-0 bottom-0 right-0 cursor-pointer rounded-lg flex flex-row items-center justify-end pl-1 pr-3 bg-white">
          <div class="absolute top-0 bottom-0 right-full w-7 bg-gradient-to-r from-transparent to-white" />
          <span v-if="isCopying" class="text-white bg-slate-600 rounded-full px-2">Copied</span>
          <CopyIcon v-else class="h-5" />
        </div>
      </template>
      <template #copying="{ isCopying }">
        <div class="absolute top-0 left-0 h-full w-full">
          <div class="overflow-hidden py-3 text-sm sm:pb-0 sm:pt-1">{{ props.accessCode }}</div>
          <div class="absolute top-0 bottom-0 right-0 cursor-pointer rounded-lg flex flex-row items-center justify-end pl-1 pr-3 bg-white">
            <div class="absolute top-0 bottom-0 right-full w-7 bg-gradient-to-r from-transparent to-white" />
            <span v-if="isCopying" class="text-white bg-slate-600 rounded-full px-2">Copied</span>
            <CopyIcon v-else class="h-5" />
          </div>
        </div>
      </template>
    </CopyToClipboard>
  </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import CopyIcon from '@/assets/copy.svg?component';
import CopyToClipboard from "@/components/CopyToClipboard.vue";

const props = defineProps<{
  accessCode: string;
}>();

const copyToClipboard = Vue.ref<InstanceType<typeof CopyToClipboard>>();

function copyAccessCode() {
  copyToClipboard.value?.copyContent();
}

defineExpose({
  copyAccessCode,
});
</script>
