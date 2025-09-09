<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
      <RouterLink to="/learn/mining-metrics">Mining Metrics</RouterLink>
    </Breadcrumbs>
    <SubTitle>Active Mining Seats</SubTitle>

    <SubContent>
      The total number of mining seats that are currently active.
    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '../../../navigation/SubLayout.vue';
</script>


<style scoped>
@import "../../../main.css";

</style>