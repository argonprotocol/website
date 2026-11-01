<template>
  <DocHeader>Argonot Stakes Calculator</DocHeader>

  <DocContent>
    <aside class="mb-4 rounded-lg border border-amber-300 px-4 py-2 text-amber-950 font-bold">
      NOTE: Some parts of this page document the upcoming release of Argon Mainnet v1.6.
    </aside>

    <p>
      The following calculator models how mining economics, Stake participation,
      and ARGNOT's market price can affect returns. It begins with current Mainnet
      data, but its results are illustrations rather than predictions.
    </p>

    <aside class="mb-8 rounded-lg border border-amber-300 bg-amber-50 px-5 pt-4 text-amber-950">
      <strong class="mb-1 block">Academic Illustrations Only</strong>
      <p class="m-0">
        This calculator uses current network data and adjustable models to illustrate
        how value moves through Argon's economy. It does not predict future
        market prices or imply any specific return.
      </p>
    </aside>

    <StakesCalculator />

    <h2>Understanding the Results</h2>
    <p>
      The Expected Ten Day Return compares a Stake's modeled ARGN earnings with
      the market value of its ARGNOT principal. Expected APY annualizes that
      ten-day return under the assumption that the same conditions continue and
      earnings are repeatedly reinvested. Stake earnings do not compound
      automatically, and actual bids, participation, prices, and Profit Surges can
      all change.
    </p>

    <h2>The Five Variables that Drive Returns</h2>

    <h3>1. ARGNOT Market Price</h3>
    <p>
      Stake earnings are paid in ARGN, while each Stake requires one ARGNOT.
      If mining revenue remains unchanged, a higher ARGNOT price produces a lower
      percentage return. However, ARGNOT is also part of the value produced by a
      mining seat, so a higher price can support larger mining bids and increase
      the revenue distributed to Stakes.
    </p>

    <h3>2. Growth In Argon Circulation</h3>
    <p>
      Growth in Argon circulation creates additional ARGN mining rewards. Those
      rewards increase the value produced by each mining seat, allowing operators
      to submit larger bids and increasing the revenue available to Stakes.
    </p>

    <h3>3. Expected Return Per Mining Seat</h3>
    <p>
      Mining operators bid according to the value they expect a seat to produce.
      Accepting a lower mining return allows a larger bid, while requiring a higher
      return reduces the amount an operator can bid. Larger winning bids create
      more revenue for Argonot Stakes.
    </p>

    <h3>4. Percent of ARGNOT Staked</h3>
    <p>
      Up to 60% of circulating ARGNOT can participate in active Stakes. Each Stake
      receives a proportional share of the available revenue, so returns per Stake
      decrease as more ARGNOT participates and increase as participation falls.
    </p>

    <h3>5. Payout From the Mining Pool</h3>
    <p>
      Argonot Stakes receive a standard 15% allocation from mining-bid revenue.
      Mining operators can increase this allocation through Profit Surges, raising
      the payout as high as 21%.
    </p>

    <p>
      Read <DocLink to="/docs/asset-rules/argonot-stakes">Argonot Stakes</DocLink>
      for position sizes, revenue distributions, and release rules.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocLink from "@/screens/docs/DocLink.vue";
import StakesCalculator from "@/components/calculators/StakesCalculator.vue";
</script>
