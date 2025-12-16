<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
    </Breadcrumbs>
    <SubTitle>The Four Pillars of Argon</SubTitle>

    <SubContent>
      <p>Argon has a number of innovative features. Here are the four that we view as fundamental to its success.</p>

      <ul class="grid grid-cols-2 gap-y-10 gap-x-14 mt-10">
        <li>
          <RouterLink to="/learn/four-pillars/resistant-to-inflation">
            <header class="text-xl font-bold">Resistant to Inflation</header>
          </RouterLink>
          <p>
            A well-designed currency should preserve value across generations, free from inflation
            and unchecked over-printing that has destroyed every form of fiat money throughout history. 
          </p>
        </li>
        <li>
          <RouterLink to="/learn/four-pillars/indifferent-to-catastrophe">
            <header class="text-xl font-bold">Indifferent to Catastrophe</header>
          </RouterLink>
          <p>
            A well-designed currency should function independently of worldly affairs, fully decoupled from
            any single nation state, banking institution, or other fallible entity.
          </p>
        </li>
        <li>
          <RouterLink to="/learn/four-pillars/intrinsic-price-stabilization">
            <header class="text-xl font-bold">Intrinsic Price Stabilization</header>
          </RouterLink>
          <p>
            A well-designed currency should function as a self-contained microcosm, 
            maintaining stable purchasing power regardless of external factors or pressures.
          </p>
        </li>
        <li>
          <RouterLink to="/learn/four-pillars/immune-from-death-spirals">
            <header class="text-xl font-bold">Immune from Death Spirals</header>
          </RouterLink>
          <p>
            A well-designed currency should never be at risk of collapsing to worthless;
            it must contain properties that are eternally desirous regardless of its usage as money.
          </p>
        </li>
      </ul>

    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '../../../navigation/SubLayout.vue';
</script>


<style scoped>
@import "../../../main.css";

</style>