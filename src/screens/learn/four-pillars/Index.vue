<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
    </Breadcrumbs>
    <SubTitle>The Four Pillars of Argon</SubTitle>

    <SubContent>
      Argon allows you to build wealth without worrying about time eroding it.
    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '../../../navigation/SubLayout.vue';
</script>


<style scoped>
@import "../../../main.css";

</style>