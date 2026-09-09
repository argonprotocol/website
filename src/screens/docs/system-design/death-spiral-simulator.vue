<template>
  <DocHeader>Death-Spiral Simulator</DocHeader>
  <DocContent>
    <aside class="mb-4 rounded-lg border border-amber-300 px-4 py-2 text-amber-950 font-bold">
      NOTE: This page documents the upcoming release of Argon Mainnet v1.5.
    </aside>

    <p>
      What happens if Argon's price collapses? This simulator uses current network data to model
      a drop to $0.001, then shows how unlocking bitcoin and burning excess Argon could restore
      the target price.
    </p>

    <DeathSpiralSimulator :data="data" />

    <h3>Why burning helps</h3>
    <p>
      When demand falls, fewer Argons are needed in circulation to support the target price.
      Unlocking bitcoin requires burning Argon, reducing the excess supply. This simulator
      shows how much would need to be burned to bring supply back into balance with the
      remaining demand.
    </p>

    <h3>What the model assumes</h3>
    <p>
      The simulation holds demand and bitcoin's price constant after the initial collapse
      and assumes holders complete the bitcoin unlocks needed to burn excess Argon. It
      illustrates the recovery mechanics; it does not predict how quickly participants
      would act or how market conditions might change. The 36-hour recovery shown is an
      illustrative timeline, not a forecast.
    </p>

  </DocContent>
</template>

<script setup lang="ts">
import * as Vue from "vue";
import DeathSpiralSimulator from "@/components/simulators/DeathSpiralSimulator.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import Data from "@/lib/Data";

const data = Vue.ref(Data.basics);

</script>
