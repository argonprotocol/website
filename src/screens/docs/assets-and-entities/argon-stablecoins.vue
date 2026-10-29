<template>
  <DocHeader>Argon Stablecoins</DocHeader>

  <DocContent>
    <p>
      Argon (ARGN) is the network’s transactional currency. It is one of three
      assets in Argon’s economy, alongside
      <DocLink to="/docs/assets-and-entities/argonot-tokens">Argonot ownership tokens</DocLink>
      and <DocLink to="/docs/assets-and-entities/bitcoins">Bitcoin</DocLink>. It is
      designed to hold stable purchasing power over time while remaining
      independent of banks, custodians, and fiat reserves. It is represented
      by the symbol ₳, and each Argon can be divided into one million microgons.
    </p>

    <p>
      Argon does not target a permanently fixed price of one U.S. dollar.
      Instead, its target begins with a dollar-denominated reference and moves
      against inflation (as currently tracked by the U.S. Consumer Price Index). The intent is for one Argon
      to retain comparable purchasing power as consumer prices change.
    </p>
    <p>
      The network compares this inflation-agnostic target price with Argon's market price. When
      the market price is above target, the protocol can create opportunities
      for additional issuance. When the market price is below target, new
      price-responsive issuance stops, and releasing Bitcoin Liquids creates an
      incentive to burn Argons. These mechanisms change supply through the voluntary
      actions of independent network participants. The
      <DocLink to="/docs/system-design/stabilization-algorithms"
        >Stabilization Algorithms</DocLink
      >
      page explains this process in detail.
    </p>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="block mb-1">A Target Is Not a Guarantee</strong>
      <p class="m-0">
        ARGN is not redeemable for dollars, and no company guarantees its market
        value. Its price can trade above or below the protocol's target.
      </p>
    </aside>

    <h2>What Argons Are Used For</h2>
    <ul>
      <li>
        <strong>Payments and Fees.</strong> Argons can be transferred between
        accounts, used for network transaction fees, and moved through
        sidechains for person-to-person payments.
      </li>
      <li>
        <strong>Mining Bids.</strong> Mining operators bid Argons for the right
        to occupy mining seats and produce blocks. See
        <DocLink to="/docs/assets-and-entities/mining-operations"
          >Mining Operations</DocLink
        >.
      </li>
      <li>
        <strong>Argon Bonds.</strong> Holders can commit Argons to
        <DocLink to="/docs/assets-and-entities/argon-bonds"
          >Treasury bonds</DocLink
        >
        that supply liquidity for
        <DocLink to="/docs/assets-and-entities/bitcoin-liquids"
          >Bitcoin Liquids</DocLink
        >
        and share in network revenue.
      </li>
      <li>
        <strong>Vault Securitization.</strong>
        <DocLink to="/docs/assets-and-entities/vaulting-operations"
          >Vault operators</DocLink
        >
        commit Argons as capital that secures their participation in the
        network.
      </li>
      <li>
        <strong>Bitcoin Liquids.</strong> A holder burns the required number
        of Argons to release a
        <DocLink to="/docs/assets-and-entities/bitcoin-liquids"
          >Liquid</DocLink
        >.
      </li>
      <li>
        <strong>Crosschain Collateral.</strong> Argons can be transferred to supported
        external networks through Argon's
        <DocLink
          to="/docs/bridgeless-transfers/remote-minting-authorities"
          >minting-authority system</DocLink
        >. Moving ARGN between networks changes where it is represented; it does
        not create a separate supply.
      </li>
    </ul>

    <p>
      These uses connect ARGN to payments, mining, Treasury, and Bitcoin Liquids.
      They allow Argons to move between holders, become temporarily committed,
      or leave circulation.
    </p>

    <h2>Issuance and Supply</h2>
    <p>
      ARGN has an elastic supply with no fixed cap. New Argons enter circulation
      through base mining rewards, with additional price-responsive rewards
      available when ARGN trades above its target. The protocol also issues
      ARGN to eligible Bitcoin Liquids under its issuance limits.
    </p>
    <p>
      Argons leave circulation when they are burned, including when Bitcoin
      Liquids are released and when finalized Sidechain transaction taxes are
      recorded on the mainchain. Holding ARGN in a Bond or as vault capital
      temporarily restricts its availability without destroying it. See
      <DocLink to="/docs/system-design/argon-tokenomics">Argon Tokenomics</DocLink>
      and
      <DocLink to="/docs/system-design/stabilization-algorithms">Stabilization Algorithms</DocLink>
      for the issuance, burning, and supply-response rules.
    </p>

    <h2>Holding and Transferring Argons</h2>
    <p>
      Spendable ARGN can be transferred between accounts or moved to supported
      external networks through Argon's minting-authority system. A crosschain
      transfer changes where the Argons are represented; it does not create an
      independent supply. Committed balances remain subject to their protocol
      holds and release rules before they can be spent or transferred.
    </p>
    <p>
      Holders remain responsible for their own keys and transaction approvals.
      ARGN's purchasing-power target does not guarantee its market value while
      it is held or transferred.
    </p>

    <h2>How Commitment Changes Availability</h2>
    <p>
      ARGN's availability depends on how the protocol is using it. Spendable
      Argons can be used immediately, while committed capital remains subject
      to the rules of the activity it supports.
    </p>

    <section class="my-8 grid gap-3 md:grid-cols-3">
      <div class="rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="text-sm font-bold tracking-wide text-slate-500 uppercase">
          Spendable
        </div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          This is the state of most Argons. They can be transferred, used for payments, or committed
          to a supported network activity.
        </p>
      </div>
      <div class="rounded-lg border border-argon-200 bg-argon-50/40 p-5">
        <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
          Committed
        </div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          These include Argons in a Bond position and a Vault's securitization. They cannot be
          used until the position completes its release period.
        </p>
      </div>
      <div class="rounded-lg border border-amber-300 bg-amber-50/50 p-5">
        <div class="text-sm font-bold tracking-wide text-amber-800 uppercase">
          Encumbered
        </div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          At the moment, only Minting Authorities hold Argons that
          are at risk. They can be burned if the protocol's rules are not followed.
        </p>
      </div>
    </section>

    <p>
      These are availability conditions, not a lifecycle every Argon follows.
      Bond principal and vault securitization have different protections and
      release rules. Mining-seat payments spend ARGN, and releasing a Bitcoin Liquid burns ARGN; neither is a temporary commitment that returns those
      Argons to the holder.
    </p>

    <h2>Learn More</h2>
    <p>
      See
      <DocLink to="/docs/system-design/stabilization-algorithms"
        >Stabilization Algorithms</DocLink
      >
      for a detailed explanation of the target price and expansion and
      contraction mechanisms.
    </p>
  </DocContent>
</template>
<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
