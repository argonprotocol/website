<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
      <RouterLink to="/learn/vaulting-metrics">Vaulting Metrics</RouterLink>
    </Breadcrumbs>
    <SubTitle>Current Vaulting APY</SubTitle>

    <SubContent>
      The current vaulting APY.
    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '../../../navigation/SubLayout.vue';
</script>


<style scoped>
@import "../../../main.css";

</style>