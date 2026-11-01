<template>
  <DocHeader>Vaulting Calculator</DocHeader>

  <DocContent>
    <aside class="mb-4 rounded-lg border border-amber-300 px-4 py-2 text-amber-950 font-bold">
      NOTE: Some parts of this page document the upcoming release of Argon Mainnet v1.6.
    </aside>

    <p>
      The following calculator begins with current network data and lets you
      explore how operator capital, Bitcoin utilization, bond participation,
      market conditions, and revenue-sharing affect a vault's possible returns.
    </p>

    <aside class="mb-8 rounded-lg border border-amber-300 bg-amber-50 px-5 pt-4 text-amber-950">
      <strong class="mb-1 block">Academic Illustrations Only</strong>
      <p class="m-0">
        This calculator uses current network data and adjustable models to illustrate
        how value moves through Argon's economy. It does not predict future
        market prices or imply any specific return.
      </p>
    </aside>

    <VaultingCalculator />

    <h2>Understanding the Results</h2>
    <p>
      The footer compares the operator's invested capital with its estimated
      ten-day revenue. The annualized yield assumes the same conditions continue
      and that earnings are repeatedly reinvested; it is an illustration rather
      than a prediction.
    </p>

    <h2>The Nine Variables that Drive Returns</h2>

    <p>
      The circled numbers on the left side of the calculator identify the nine
      inputs that shape the vault's revenue and percentage return.
    </p>

    <h3>1. ARGNOT Market Price</h3>
    <p>
      ARGNOT is part of the value produced by mining and committed in mining
      bids. A change in its market price changes mining-seat economics, which can
      change the ARGN bid revenue available to vaults.
    </p>

    <h3>2. Growth In Argon Circulation</h3>
    <p>
      Growth in Argon circulation creates additional ARGN mining rewards. Those
      rewards increase the value produced by each mining seat, allowing operators
      to submit larger bids and increasing the revenue available to vaults.
    </p>

    <h3>3. Expected Return Per Mining Seat</h3>
    <p>
      Mining operators bid according to the return they expect a seat to
      produce. Accepting a lower mining return supports a larger bid and creates
      more revenue for vaulting, while requiring a higher return reduces the bid.
    </p>

    <h3>4. Initial ARGN Securitization</h3>
    <p>
      Initial ARGN securitization establishes the vault's Bitcoin capacity. The
      protocol compares it with the network's desired Bitcoin space to determine
      the vault's share of eligible mining-bid revenue. Increasing it generally
      raises absolute revenue, although it does not always raise the percentage
      return by the same amount.
    </p>

    <h3>5. Initial ARGNOT Securitization</h3>
    <p>
      ARGNOT adds supporting operator capital without diluting the calculated
      return. Once Bitcoin is locked, ARGNOT can also provide a return bonus of
      up to 29%. The bonus grows proportionally with Bitcoin utilization and
      reaches its maximum only when both capacities are full.
    </p>

    <h3>6. Bitcoin Utilization</h3>
    <p>
      Bitcoin utilization is the primary driver of vaulting returns. It supplies
      90% of core utilization and acts as the gate for the benefits provided by
      ARGNOT and Bonds. Each additional amount of locked Bitcoin contributes
      proportionally to the calculation.
    </p>

    <h3>7. Bond Participation</h3>
    <p>
      Purchased Argon Bonds supply the final 10% of core utilization. Their
      contribution is multiplied by Bitcoin utilization, so Bonds cannot improve
      the operator's return when no Bitcoin is locked.
    </p>

    <h3>8. Revenue Shared With Bonds</h3>
    <p>
      The standard bondholder share is 5% of eligible vaulting revenue. A vault
      can offer as much as 7% to attract bond capital, but every percentage point
      above the standard share comes out of the operator's maximum.
    </p>

    <h3>9. Revenue Shared With Bitcoin Liquids</h3>
    <p>
      Bitcoin Liquids receive a standard 3% share. A vault can increase it to 5%
      to attract Bitcoin users, but the additional share also comes out of the
      operator's maximum.
    </p>

    <p>
      Read <DocLink to="/docs/network-rules/vaulting-operations">Vaulting Operations</DocLink>
      for capital requirements, revenue rules, and operator responsibilities.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocLink from "@/screens/docs/DocLink.vue";
import VaultingCalculator from "@/components/calculators/VaultingCalculator.vue";
</script>
