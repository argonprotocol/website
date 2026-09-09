<template>
  <DocHeader>Argon Tokenomics</DocHeader>
  <DocContent>
    <p>
      Argon (ARGN) is the network's transactional currency. It has no fixed supply supply.
      It's designed to expand and contract with demand in order to give it stable
      purchasing-power.
    </p>

    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Symbol</td>
          <td>ARGN</td>
        </tr>
        <tr>
          <td>Smallest unit</td>
          <td>1 microgon = 0.000001 ARGN</td>
        </tr>
        <tr>
          <td>Genesis issuance</td>
          <td>No ARGN was issued in the genesis block</td>
        </tr>
        <tr>
          <td>First issuance</td>
          <td>January 15, 2025, through mining rewards</td>
        </tr>
        <tr>
          <td>Supply policy</td>
          <td>Elastic, with no fixed cap</td>
        </tr>
      </tbody>
    </table>

    <h2>An Elastic Supply</h2>
    <p>
      The block rewards began at 0.5 ARGN per block on January 15, 2025. It will continue rising
      by 0.001 ARGN every 180 ticks until it reaches a base rate of 5 ARGN per block. That
      base rate does not decline.
    </p>
    <p>
      When Argon trades above its target price, the protocol adds
      price-responsive mining rewards that mint more argons. It also issues Argons to eligible
      Bitcoin Liquids, but only gradually and never cumulatively beyond the amount
      issued through mining.
    </p>

    <p>
      Moving ARGN to another supported network only changes where it is represented;
      it does not create an independent second supply.
    </p>

    <h2>How Argons Leave Circulation</h2>
    <p>
      Argons are burned when Bitcoin Liquids are released or when finalized
      Sidechain transaction taxes are recorded on the mainchain. These burns
      counter ongoing issuance, with Bitcoin unlocking providing the
      price-responsive contraction mechanism.
    </p>
    <p>
      Mainchain fees and mining bids are different: they transfer existing
      Argons rather than destroy them. Fees reward block production, while
      mining bids flow into Treasury reserves, Argonot Stakes, and vault
      treasury pools.
    </p>

    <h2>Common Argon Usage</h2>
    <p>In addition to the more traditional uses for stablecoins in crypto trading and payments, Argons
    have multiple other use-cases:</p>
    <ul class="list-disc ml-10">
      <li>As auction bids for Mining Seats</li>
      <li>As capital for Argon Bonds</li>
      <li>As securitization for Stabilization Vaults</li>
      <li>As the unlocking token for Bitcoin Liquids</li>
      <li>As traditional stablecoins in crypto trading</li>
      <li>As traditional medium of exchange in payments</li>
    </ul>

    <h2>Circulation Freezes</h2>
    <p>
      Argon has several mechanisms that freeze argons on-chain. This has a similar outcome on
      market pricing as removing from circulation, at least for the duration of the freeze:
    </p>
    <ul class="list-disc ml-10">
      <li>Mining (1 to 10 days)</li>
      <li>Vault Securitization (365 days)</li>
      <li>Bonds (10 days)</li>
    </ul>

    <aside class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4">
      <strong class="block mb-1">Argon Is Not a Dollar Stablecoin</strong>
      <p class="m-0">
        Argon's target uses the U.S. Consumer Price Index as a measuring tool.
        ARGN is not directly redeemable for dollars, and the protocol does not guarantee
        its market price will equal its target price.
      </p>
    </aside>

    <p>
      See
      <DocLink to="/docs/system-design/stability-algorithms"
        >Stability Algorithms</DocLink
      >
      for the rules that translate market prices into supply incentives.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
</script>
