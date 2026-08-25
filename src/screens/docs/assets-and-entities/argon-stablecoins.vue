<template>
  <DocHeader>Argon Stablecoins</DocHeader>

  <DocContent>
    <p>
      Argon (ARGN) is the transactional currency of the Argon network. It is
      designed to hold stable purchasing power over time while remaining
      <router-link to="/docs/desktop-app/self-custody-risks"
        >self-custodied</router-link
      >
      and independent of banks, custodians, and fiat reserves. It is represented
      by the symbol ₳, and each Argon can be divided into one million microgons.
    </p>

    <p>
      Argon does not target a permanently fixed price of one U.S. dollar.
      Instead, its target begins with a dollar-denominated reference and moves
      with changes in the U.S. Consumer Price Index. The intent is for one Argon
      to retain comparable purchasing power as consumer prices change.
    </p>
    <p>
      The network compares this moving target with Argon's market price. When
      the market price is above target, the protocol can create opportunities
      for additional issuance. When the market price is below target, new
      price-responsive issuance stops and Bitcoin unlocking creates an incentive
      to burn Argons. These mechanisms change supply through the voluntary
      actions of independent network participants. The
      <router-link to="/docs/system-design/stability-algorithms"
        >Stability Algorithms</router-link
      >
      page explains this process in detail.
    </p>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="block mb-1">A target is not a guarantee</strong>
      <p class="m-0">
        ARGN is not redeemable for dollars, and no company guarantees its market
        value. Its price can trade above or below the protocol's target.
      </p>
    </aside>

    <h2>What Argons Are Used For</h2>
    <ul>
      <li>
        <strong>Payments and fees.</strong> Argons can be transferred between
        accounts, used for network transaction fees, and moved through
        Localchains for person-to-person payments.
      </li>
      <li>
        <strong>Mining bids.</strong> Mining operators bid Argons for the right
        to occupy mining seats and produce blocks. See
        <router-link to="/docs/assets-and-entities/mining-operations"
          >Mining Operations</router-link
        >.
      </li>
      <li>
        <strong>Argon Bonds.</strong> Holders can commit Argons to
        <router-link to="/docs/assets-and-entities/argon-bonds"
          >Treasury bonds</router-link
        >
        that supply liquidity for
        <router-link to="/docs/assets-and-entities/bitcoin-locks"
          >Bitcoin Locks</router-link
        >
        and share in network revenue.
      </li>
      <li>
        <strong>Vault securitization.</strong>
        <router-link to="/docs/assets-and-entities/vaulting-operations"
          >Vault operators</router-link
        >
        commit Argons as capital that secures their participation in the
        network.
      </li>
      <li>
        <strong>Bitcoin unlocking.</strong> A holder burns the required number
        of Argons to release funded Bitcoin from a
        <router-link to="/docs/assets-and-entities/bitcoin-locks"
          >lock</router-link
        >.
      </li>
      <li>
        <strong>Crosschain use.</strong> Argons can be transferred to supported
        external networks through Argon's
        <router-link
          to="/docs/bridgeless-transfers/localized-minting-authorities"
          >minting-authority system</router-link
        >. Moving ARGN between networks changes where it is represented; it does
        not create a separate supply.
      </li>
    </ul>

    <p>
      These uses connect ARGN to the network's payments, mining, Treasury, and
      Bitcoin-locking systems. They also create pathways for Argons to move
      between holders, become temporarily committed, or leave circulation.
    </p>

    <h2>Learn More</h2>
    <p>
      See
      <router-link to="/docs/system-design/tokenomics-of-argon"
        >Tokenomics of Argon</router-link
      >
      for the issuance and supply rules, or
      <router-link to="/docs/system-design/stability-algorithms"
        >Stability Algorithms</router-link
      >
      for a detailed explanation of the target price and expansion and
      contraction mechanisms.
    </p>
  </DocContent>
</template>
<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
