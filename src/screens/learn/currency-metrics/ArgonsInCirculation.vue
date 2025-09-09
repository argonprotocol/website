<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
      <RouterLink to="/learn/currency-metrics">Currency Metrics</RouterLink>
    </Breadcrumbs>
    <SubTitle>Argons In Circulation</SubTitle>

    <SubContent>
      The total number of argons in circulation.
    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '../../../navigation/SubLayout.vue';
</script>


<style scoped>
@import "../../../main.css";

</style>