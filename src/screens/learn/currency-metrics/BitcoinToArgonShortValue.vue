<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
      <RouterLink to="/learn/currency-metrics">Currency Metrics</RouterLink>
    </Breadcrumbs>
    <SubTitle>Bitcoin to Argon Short Value</SubTitle>

    <SubContent>
      The short value of bitcoin to argon.
    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '../../../navigation/SubLayout.vue';
</script>


<style scoped>
@import "../../../main.css";

</style>