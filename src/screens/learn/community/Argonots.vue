<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
      <RouterLink to="/learn/mining-metrics">Community</RouterLink>
    </Breadcrumbs>
    <SubTitle>Argonots</SubTitle>

    <SubContent>
      The Argonots.
    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '../../../navigation/SubLayout.vue';
</script>


<style scoped>
@import "../../../main.css";

</style>