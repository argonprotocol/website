<template>
  <DocHeader>Bitcoin Liquids Calculator</DocHeader>

  <DocContent>
    <aside class="mb-4 rounded-lg border border-amber-300 px-4 py-2 text-amber-950 font-bold">
      NOTE: Some parts of this page document the upcoming release of Argon Mainnet v1.6.
    </aside>

    <p>
      The following calculator begins with current Mainnet prices and activity.
      Choose how much BTC participates in the Liquid, replay the last year of
      Bitcoin prices with a selected ratchet threshold, and adjust the mining
      conditions and revenue share to see how they affect its modeled return.
    </p>

    <aside class="mb-8 rounded-lg border border-amber-300 bg-amber-50 px-5 pt-4 text-amber-950">
      <strong class="mb-1 block">Academic Illustrations Only</strong>
      <p class="m-0">
        This calculator uses current network data and adjustable models to illustrate
        how value moves through Argon's economy. It does not predict future
        market prices or imply any specific return.
      </p>
    </aside>

    <LiquidsCalculator />

    <h2>Understanding the Results</h2>
    <p>
      The selected BTC amount is modeled as a new position added to the Bitcoin
      already locked across the network. Its share of the resulting BTC total
      determines its proportional share of Liquid revenue. Modeled Liquid
      profits include both a simple annual projection of current ten-day mining
      proceeds and the net liquidity taken off the table by upward ratchets.
      The modeled APR expresses that combined profit against the historical
      starting capital and does not assume automatic compounding.
    </p>

    <h2>The Six Variables that Drive Returns</h2>

    <h3>1. Bitcoin Used for the Liquid</h3>
    <p>
      The Bitcoin amount establishes the modeled size of the position. Its ARGN
      market value is calculated from current BTC and ARGN prices, while the BTC
      itself remains inside its native multisig Lock.
    </p>

    <h3>2. Ratchet Threshold</h3>
    <p>
      The ratchet threshold controls how far Bitcoin's price must move from the
      most recent ratchet price before the position adjusts. The calculator
      replays the trailing year of daily Bitcoin prices using a minimum
      threshold of 5%. An upward ratchet provides full liquidity until the
      cumulative ARGN received reaches the position's current market value. Any
      remaining increase provides 50% liquidity.
    </p>

    <h3>3. ARGNOT Market Price</h3>
    <p>
      ARGNOT contributes to the value produced by mining seats. Its market price
      can therefore change mining bids and the revenue available to Bitcoin
      Liquids.
    </p>

    <h3>4. Growth In Argon Circulation</h3>
    <p>
      Growth in ARGN circulation creates additional mining rewards. That added
      value can support larger mining bids and increase downstream Liquid
      revenue.
    </p>

    <h3>5. Expected Return Per Mining Seat</h3>
    <p>
      A lower expected mining return supports a larger competitive bid, while a
      higher expected return leaves less bid revenue available for distribution.
    </p>

    <h3>6. Profit Split for Bitcoin Liquids</h3>
    <p>
      Bitcoin Liquids receive 3% of eligible vaulting revenue by default. A
      vault can offer as much as 5%, with the additional share coming out of the
      vault operator's portion.
    </p>

    <p>
      These same factors impact returns elsewhere in the system. For example,
      Vaults earn service fees from their Liquids, and the amount of Liquids
      determines how much mining-bid revenue is paid out to Vaults and Bond
      holders.
    </p>
    
    <p>
      Read <DocLink to="/docs/asset-rules/bitcoin-liquids">Bitcoin Liquids</DocLink>
      for liquidity, ratcheting, revenue, and release rules.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocLink from "@/screens/docs/DocLink.vue";
import LiquidsCalculator from "@/components/calculators/LiquidsCalculator.vue";
</script>
