<template>
  <MainLayout>
    <div class="mt-20 w-10/12 mx-auto">
      <slot />
    </div>
  </MainLayout>
</template>

<script lang="ts">
import SubTitle from './SubTitle.vue';
import SubContent from './SubContent.vue';
import Breadcrumbs from './Breadcrumbs.vue';

export {
    SubTitle,
    SubContent,
    Breadcrumbs,
};
</script>

<script setup lang="ts">
import * as Vue from 'vue';
import MainLayout from './MainLayout.vue';

</script>