<template>
  <DocHeader>Mining Calculator</DocHeader>

  <DocContent>
    <aside class="mb-4 rounded-lg border border-amber-300 px-4 py-2 text-amber-950 font-bold">
      NOTE: Some parts of this page document the upcoming release of Argon Mainnet v1.6.
    </aside>

    <p>
      The following calculator starts with the network's current pricing. Adjust
      the sliders to control expected return, growth in ARGN circulation, and ARGNOT's market
      price.
    </p>

    <aside class="mb-8 rounded-lg border border-amber-300 bg-amber-50 px-5 pt-4 text-amber-950">
      <strong class="mb-1 block">Academic Illustrations Only</strong>
      <p class="m-0">
        This calculator uses current network data and adjustable models to illustrate
        how value moves through Argon's economy. It does not predict future
        market prices or imply any specific return.
      </p>
    </aside>

    <MiningCalculator />

    <h2>Understanding the Results</h2>
    <p>
      The calculator uses ten-day returns because each mining seat lasts
      approximately ten days. It also shows Annual Percentage Yield (APY) to
      make comparisons with other assets easier. For example, the average return of
      Warren Buffett's Berkshire Hathaway is 19.9% APY over the last six decades.
    </p>

    <h2>The Three Variables that Drive Returns</h2>

    <p>
      The circled numbers on the left side of the calculator highlight the three primary variables
      that drive mining returns.
    </p>

    <h3>1. Bid Price</h3>
    <p>
      The ARGN in a winning bid is the price paid for a mining seat. The ARGNOT
      is committed operating capital and returns after the term. A lower winning
      bid leaves more of the immutable base rewards as potential profit, while
      competition for seats can push bids higher.
    </p>

    <h3>2. Growth in ARGN Demand</h3>
    <p>
      When market demand moves ARGN above its target, the stabilization
      algorithm makes additional ARGN issuance available to miners. Greater
      circulation growth can therefore increase a seat's output beyond its
      immutable base rewards.
    </p>

    <h3>3. ARGNOT's Market Price</h3>
    <p>
      A mining term produces ARGNOT as well as ARGN. Changes in ARGNOT's market
      value affect the final value of those rewards and of the ARGNOT committed
      to the seat. This creates a direct connection between demand for
      operational access and the economics of mining.
    </p>

    <p>
      Read <DocLink to="/docs/network-rules/mining-operations">Mining Operations</DocLink>
      for the auction, collateral, and block-production rules behind the model.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocLink from "@/screens/docs/DocLink.vue";
import MiningCalculator from "@/components/calculators/MiningCalculator.vue";
</script>
