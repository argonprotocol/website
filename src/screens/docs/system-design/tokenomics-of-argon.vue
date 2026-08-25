<template>
  <DocHeader>Tokenomics of Argon</DocHeader>
  <DocContent>
    <p>
      Argon (ARGN) is the network's transactional currency. Its supply is
      designed to expand and contract with demand, so its tokenomics favor
      purchasing-power stability rather than a fixed supply.
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
          <td>None—no ARGN was issued in the genesis block</td>
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
      The scheduled block reward begins at 0.5 ARGN and rises by 0.001 ARGN
      every 180 ticks until it reaches a base rate of 5 ARGN per block. That
      base rate does not decline.
    </p>
    <p>
      When Argon trades above its target price, the protocol can add
      price-responsive mining rewards. It can also issue Argons to eligible
      Bitcoin Locks, but only gradually and never cumulatively beyond the amount
      tracked as issued through mining.
    </p>

    <h2>How Argons Leave Circulation</h2>
    <p>
      Argons are burned when funded Bitcoin is unlocked and when finalized
      Localchain transaction taxes are recorded on the mainchain. These burns
      counter ongoing issuance, with Bitcoin unlocking providing the
      price-responsive contraction mechanism.
    </p>
    <p>
      Mainchain fees and mining bids are different: they transfer existing
      Argons rather than destroy them. Fees reward block production, while
      mining bids flow into Treasury reserves, Argonot Stakes, and vault
      treasury pools.
    </p>

    <h2>What Argons Are Used For</h2>
    <ul>
      <li>Payments and transaction fees</li>
      <li>Bids for mining seats</li>
      <li>Argon Bonds and vault securitization</li>
      <li>Unlocking funded Bitcoin</li>
    </ul>
    <p>
      Moving ARGN to another supported network changes where it is represented;
      it does not create an independent second supply.
    </p>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="block mb-1">The target is not a dollar guarantee</strong>
      <p class="m-0">
        Argon's target uses the U.S. Consumer Price Index as a measuring tool.
        ARGN is not redeemable for dollars, and the protocol does not guarantee
        that its market price will equal the target.
      </p>
    </aside>

    <p>
      See
      <router-link to="/docs/system-design/stability-algorithms"
        >Stability Algorithms</router-link
      >
      for the rules that translate market prices into supply incentives.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
</script>
