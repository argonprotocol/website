<template>
  <MainLayout>
    <div class="mt-20 ml-[15%] mr-[17%]">
      <slot />
    </div>
  </MainLayout>
</template>

<script lang="ts">
import SubTitle from './SubTitle.vue';
import SubContent from './SubContent.vue';
import Breadcrumbs from './Breadcrumbs.vue';
import MainLayout from './MainLayout.vue';

export {
    SubTitle,
    SubContent,
    Breadcrumbs,
};
</script>

<script setup lang="ts">
import * as Vue from 'vue';

</script>