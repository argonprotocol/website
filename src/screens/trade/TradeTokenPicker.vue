<template>
  <div class="flex shrink-0 items-center gap-1.5 rounded-full border border-argon-200/40 bg-white py-2 pl-2 pr-3 font-semibold shadow-sm">
    <UsdcIcon v-if="symbol === 'USDC'" class="size-7" aria-hidden="true" />
    <select
      v-model="symbol"
      class="min-h-7 cursor-pointer bg-transparent text-argon-text-primary disabled:cursor-default"
      :disabled="disabled"
      aria-label="Select token to trade for ARGN"
    >
      <option v-for="token in tokens" :key="token.symbol" :value="token.symbol">{{ token.symbol }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import UsdcIcon from '@/assets/apocalyptic/usdc.svg';
import type { TradeToken } from '@/lib/trade/pool';

defineProps<{ tokens: TradeToken[]; disabled: boolean }>();
const symbol = defineModel<string>({ required: true });
</script>
