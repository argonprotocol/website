<template>
  <DocHeader>Argon Bonds Calculator</DocHeader>

  <DocContent>
    <aside class="mb-4 rounded-lg border border-amber-300 px-4 py-2 text-amber-950 font-bold">
      NOTE: Some parts of this page document the upcoming release of Argon Mainnet v1.6.
    </aside>

    <p>
      The following calculator begins
      with current Mainnet data and shows how mining economics and the vault's
      offered profit split can affect a Bond's modeled return.
    </p>

    <aside class="mb-8 rounded-lg border border-amber-300 bg-amber-50 px-5 pt-4 text-amber-950">
      <strong class="mb-1 block">Academic Illustrations Only</strong>
      <p class="m-0">
        This calculator uses current network data and adjustable models to illustrate
        how value moves through Argon's economy. It does not predict future
        market prices or imply any specific return.
      </p>
    </aside>

    <BondsCalculator />

    <h2>Understanding the Results</h2>
    <p>
      Modeled Ten Day Return compares a Bond's estimated ARGN earnings with its
      one-ARGN principal. Modeled APY annualizes that ten-day return under the
      assumption that the same conditions continue and earnings are repeatedly
      reinvested. Bond earnings do not compound automatically, and actual mining
      bids, Bitcoin-backed capacity, participation, and revenue-sharing terms can
      all change.
    </p>

    <h2>The Four Variables that Drive Returns</h2>

    <p>
      The circled numbers on the left side of the calculator identify the four
      inputs that shape the revenue available to eligible Bonds and the share
      they receive.
    </p>

    <h3>1. ARGNOT Market Price</h3>
    <p>
      ARGNOT is part of the value produced by a mining seat and committed in a
      mining bid. A higher market price can increase the modeled value of the
      seat, allowing operators to submit larger ARGN bids. Because a portion of
      those bids flows through vaults to Bonds, this can increase Bond revenue.
    </p>

    <h3>2. Growth In Argon Circulation</h3>
    <p>
      Growth in ARGN circulation creates additional mining rewards. Those
      rewards increase the value produced by each mining seat, which can support
      larger bids and increase the mining-bid revenue available to eligible
      Bonds.
    </p>

    <h3>3. Expected Return Per Mining Seat</h3>
    <p>
      Mining operators bid according to the return they expect a seat to
      produce. Accepting a lower mining return supports a larger bid and creates
      more revenue for Bonds, while requiring a higher return reduces the bid
      and the revenue available for distribution.
    </p>

    <h3>4. Profit Split for Bonds</h3>
    <p>
      Bonds receive 5% of eligible vaulting revenue by default. A vault operator
      can offer as much as 7% to attract Bond capital. A higher split increases
      the portion paid to Bond holders, but every additional percentage point
      comes out of the vault operator's share.
    </p>

    <p>
      Read <DocLink to="/docs/asset-rules/argon-bonds">Argon Bonds</DocLink>
      for position capacity, earnings, and release rules.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocLink from "@/screens/docs/DocLink.vue";
import BondsCalculator from "@/components/calculators/BondsCalculator.vue";
</script>
