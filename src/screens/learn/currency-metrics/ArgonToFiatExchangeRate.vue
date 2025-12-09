<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
      <RouterLink to="/learn/currency-metrics">Currency Metrics</RouterLink>
    </Breadcrumbs>
    <SubTitle>Argon to Fiat Exchange Rates</SubTitle>

    <SubContent>
      <p>The exchange rate of argons to dollars.</p>

      <p>The argon stands alone as its own currency, completley separate from the dollar's value.</p>

      <p>98% of all stablecoins are pegged to the dollar.</p>

      <p>98% of all sovereign currencies are also pegged to the dollar.</p>

      The argon has already gone up 2.0% in value against the dollar in the last six months.

      <p>Current exchange rates:</p>
      <table></table>

    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '../../../navigation/SubLayout.vue';


</script>


<style scoped>
@import "../../../main.css";

</style>