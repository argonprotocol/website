<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
      <RouterLink to="/learn/four-pillars">The Four Pillars of Argon</RouterLink>
    </Breadcrumbs>
    <SubTitle>Full Stack Decentralization</SubTitle>

    <SubContent>
      Argon doesn't care if banks fail or government bonds collapse.
    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '../../../navigation/SubLayout.vue';
</script>


<style scoped>
@import "../../../main.css";

</style>