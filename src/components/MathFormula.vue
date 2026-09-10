<template>
  <div class="MathFormula" tabindex="0" role="region" :aria-label="label">
    <div
      class="MathFormula-content"
      v-html="katex.renderToString(source, { displayMode: true, output: 'htmlAndMathml', throwOnError: true, trust: false })"
    />
  </div>
</template>

<script setup lang="ts">
import katex from 'katex';
import 'katex/dist/katex.min.css';

defineProps<{
  source: string;
  label: string;
}>();
</script>

<style scoped>
.MathFormula {
  max-width: 100%;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.MathFormula-content {
  width: max-content;
  min-width: 100%;
}

.MathFormula-content :deep(.katex-display) {
  margin: 0;
}

.MathFormula-content :deep(.katex) {
  font-size: 1.1em;
}
</style>
