<template>
  <span :title="formatUnits(value, decimals)">
    <template v-if="value === 0n">0</template>
    <template v-else-if="kind === 'balance'">
      <template v-if="amount.lt(0.001)">&lt;0.001</template>
      <template v-else-if="amount.lt(1)">{{ amount.toFormat(3) }}</template>
      <template v-else-if="amount.lt(1e6)">{{ amount.toFormat(2) }}</template>
      <template v-else>{{ amount.toNumber().toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: 2 }) }}</template>
    </template>
    <template v-else-if="amount.gte(0.1) && amount.lt(1)">
      {{ amount.decimalPlaces(5, kind === 'minimum' ? BigNumber.ROUND_DOWN : BigNumber.ROUND_HALF_UP).toNumber().toLocaleString('en-US', {
        minimumFractionDigits: 2, maximumFractionDigits: 5, useGrouping: false,
      }) }}
    </template>
    <template v-else>
      {{ amount.precision(6, kind === 'minimum' ? BigNumber.ROUND_DOWN : BigNumber.ROUND_HALF_UP).toFixed() }}
    </template>
  </span>
</template>

<script setup lang="ts">
import BigNumber from 'bignumber.js';
import { computed } from 'vue';
import { formatUnits } from 'viem';

const props = defineProps<{
  value: bigint;
  decimals: number;
  kind?: 'balance' | 'minimum';
}>();

const amount = computed(() => new BigNumber(props.value.toString()).shiftedBy(-props.decimals));
</script>
