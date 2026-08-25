<template>
  <DocHeader>
    Exponential Triggers
  </DocHeader>
  <DocContent>
    <p>
      Argon's vaulting and mining algorithms have a unique property in that, as two sides of the same coin, they use
      Bitcoin Liquid Locking to exponentially drive the circulation of the stablecoin.
    </p>

    <p>
      Its exponential factor drives a loop that continues to drive greater and greater returns until it closes in on
      twice the size of Bitcoin's market value.
    </p>

    <p>
      The following simulator uses actual algorithms from the Argon blockchain, and it starts with the current
      network constraints and economic returns. It's an interactive tool. At each stage, you're invited to place
      market pressure on the highest profit generating side of the network. Click on it will show you what will
      bring the profits down to a more realistic level.
    </p>

    <p>
      You can continue playing the game until the network's returns fall below the S&P 500's best year ever (53.99%),
      or you run out of bitcoin to vault.
    </p>

    <div class="border border-gray-400 rounded-lg px-4 my-10 min-h-200">
      <h2>Exponential Simulator (Stage 1)</h2>
    </div>

  </DocContent>
</template>
<script setup lang="ts">
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import MiningCalculator from "@/components/calculators/MiningCalculator.vue";
</script>
