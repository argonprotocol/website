<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
      <RouterLink to="/learn/mining-metrics">Mining Metrics</RouterLink>
    </Breadcrumbs>
    <SubTitle>Active Mining Seats</SubTitle>

    <SubContent class="space-y-4">
      <p>The total number of mining seats that are currently active.</p>

      <p>It's between 100 and 10,000.</p>

      <p>It tries to keep the number of argons per seat as close to 1,000 as possible.</p>

      [show mining seats chart]
      
    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '../../../navigation/SubLayout.vue';
</script>


<style scoped>
@import "../../../main.css";

</style>