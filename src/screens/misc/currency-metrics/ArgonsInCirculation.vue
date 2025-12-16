<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
      <RouterLink to="/learn/currency-metrics">Currency Metrics</RouterLink>
    </Breadcrumbs>
    <SubTitle>Argons In Circulation</SubTitle>

    <SubContent class="space-y-4">
      <p>The total number of argons in circulation.</p>

      <p>Argon's circulation grows and shrinks with the demand. </p>

      <p>As demand grows, it's minted. As demand shrinks, it's burned.</p>

      <TimeChart startingDate="2025-01-01" xTimeUnit="month" />
      
      <table>
        <tr>
          <th>Date</th>
          <th>Argons In Circulation</th>
        </tr>
        <tr>
          <td>At Launch</td>
          <td>0</td>
        </tr>
        <tr>
          <td>End of Compute Phase</td>
          <td>10,000</td>
        </tr>
        <tr>
          <td>Start of Phase Two</td>
          <td>10,000</td>
        </tr>

        Current Circulation: 10,000
      </table>
      
    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '@/navigation/SubLayout.vue';
import TimeChart from '@/components/TimeChart.vue';
import Data from '@/lib/Data';

Data.fetchArgonCirculation().then(data => {
  console.log(data);
});
</script>


<style scoped>
@import "../../../main.css";

</style>