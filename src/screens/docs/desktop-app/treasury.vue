<template>
  <DocHeader>Treasury (Level Two)</DocHeader>

  <DocContent>
    <p>
      Treasury is the second level of Argon Desktop. It lets you use Bitcoin
      Liquids, purchase Argon Bonds, and create Argonot Stakes without running
      mining or vaulting infrastructure.
    </p>

    <VideoLoop src="/videos/desktop-app-overview.webm" class="mt-8 mb-10">
      <li>Upgrade to Treasury</li>
      <li>Bitcoin Liquids</li>
      <li>Argon Bonds</li>
      <li>Argonot Stakes</li>
    </VideoLoop>

    <p>
      Upgrading from <DocLink to="/docs/desktop-app/basic-functionality">Basic</DocLink> to <DocLink to="/docs/desktop-app/treasury">Treasury</DocLink> requires a one-use access
      code from an existing Operator. Accepting it adds a new section to the
      left-hand navigation bar of your app.
    </p>

    <p>
      See <DocLink to="/docs/desktop-app/access-codes">Access and Upgrades</DocLink> for the invitation and sponsorship process.
    </p>

    <h2>Bitcoin Liquids</h2>

    <p>
      The Bitcoin Liquids page lets you view your existing Liquids and create
      new ones using BTC held in your internal wallet.
    </p>

    <p>
      A Liquid lets you receive Argons without selling your Bitcoin. How much
      you can receive depends on your Bitcoin’s value and the backing available
      from the vault. Deposit your Bitcoin first, then create a Liquid. See
      <DocLink to="/docs/desktop-app/internal-wallet">Internal Wallet</DocLink> for deposit instructions.
    </p>

    <p>
      Select a Liquid to view its details, daily returns, and available actions,
      including release.
    </p>

    <p>
      See <DocLink to="/docs/assets-and-entities/bitcoin-locks">Bitcoin Locks</DocLink> and <DocLink to="/docs/assets-and-entities/bitcoin-liquids">Bitcoin Liquids</DocLink> for funding, cosigning guarantees, and
      release rules.
    </p>

    <h2>Argon Bonds</h2>

    <p>
      The Argon Bonds section lets you view your existing bond purchases and buy
      new Bonds. To buy Bonds, open the purchase flow, review available vaults,
      their capacity, and the share of eligible revenue each offers. Select a
      vault, choose the number of Bonds, and submit the onchain purchase from
      your Internal App Wallet. Each Bond commits one ARGN to your selected
      vault, and purchases use whole units. Active Bonds earn a share of eligible
      vault revenue under the position’s terms.
    </p>

    <p>
      The bond dashboard tracks each position’s principal, distributed income,
      return to date, vault, status, and release timing. Each position must be
      released separately. Requesting release ends its participation in future
      earnings and starts the waiting period before its ARGN becomes available
      to spend. See <DocLink to="/docs/assets-and-entities/argon-bonds">Argon Bonds</DocLink> for the complete lifecycle.
    </p>

    <h2>Argonot Stakes</h2>

    <p>
      The Argonot Stakes section lets you view your existing stake positions and
      create new Stakes. To create Stakes, choose a miner, review the available
      capacity and projected return, select the number of Stakes, and submit the
      position from your Internal App Wallet. Creating Stakes commits ARGNOT through a mining
      operation so you can earn a share of mining-bid revenue. The protocol
      holds your committed ARGNOT; it does not become the mining Operator’s
      property.
    </p>

    <p>
      The stake dashboard tracks each position’s ARGNOT principal, distributed
      ARGN income, return to date, associated miner, and release status. Each
      position must be released separately. Requesting release ends its
      participation in future earnings and starts the waiting period before its
      ARGNOT becomes available to spend. See <DocLink to="/docs/assets-and-entities/argonot-stakes">Argonot Stakes</DocLink> for
      participation, earnings, and release rules.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import VideoLoop from "@/components/VideoLoop.vue";
</script>
