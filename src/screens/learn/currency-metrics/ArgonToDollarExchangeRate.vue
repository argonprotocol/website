<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
      <RouterLink to="/learn/currency-metrics">Currency Metrics</RouterLink>
    </Breadcrumbs>
    <SubTitle>Argon to Dollar Exchange Rate</SubTitle>

    <SubContent>
      The exchange rate of argons to dollars.
    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '../../../navigation/SubLayout.vue';
</script>


<style scoped>
@import "../../../main.css";

</style>