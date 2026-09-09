<template>
  <DocHeader>Treasury (Level Two)</DocHeader>

  <DocContent>
    <p>
      Treasury is the second level of Argon Desktop. It adds the tools for
      putting Bitcoin, ARGN, and ARGNOT into protocol-defined positions without
      requiring you to operate mining or vaulting infrastructure.
    </p>

    <p>
      Treasury is unlocked through an invitation from an existing Operator. The
      invitation connects the app to a sponsor and adds three sections to the
      sidebar: Bitcoin Locks, Argon Bonds, and Argonot Stakes. All
      <DocLink to="/docs/desktop-app/basic-functionality"
        >Basic Functionality</DocLink
      >, including Stable Swaps, remains available.
    </p>

    <VideoLoop src="/videos/testing.webm" class="mb-10" />

    <h2>Unlocking Treasury</h2>
    <p>
      A Treasury access code is a one-use invitation created by an Operator. It
      identifies the sponsor, the sponsor's vault, and the
      <DocLink to="/docs/assets-and-entities/upstream-nodes"
        >Upstream Node</DocLink
      >
      that will provide the app's supported network services. The app previews
      this information before you accept the invitation.
    </p>

    <p>
      Accepting a code establishes the sponsored connection and unlocks the
      Treasury interface. It does not move funds, create a position, share your
      recovery phrase, or give the sponsor authority over your wallet. Each
      Treasury transaction remains a separate action that you approve.
    </p>

    <p>
      See
      <DocLink to="/docs/desktop-app/access-codes"
        >Access and Upgrades</DocLink
      >
      for the invitation and sponsorship process.
    </p>

    <h2>Bitcoin Locks</h2>
    <p>
      The Bitcoin Locks section guides you through selecting a vault and moving
      Bitcoin into a native multisig shared by you and that vault. A Lock can
      use zero or more insurance, depending on how much downside protection you
      want to arrange.
    </p>

    <p>
      Locking Bitcoin does not automatically create ARGN. After the Bitcoin is
      locked, you can separately create a Liquid against it when you want
      spendable ARGN. Argon Desktop tracks the Lock, any Liquid, its current
      protection, and the actions needed when you are ready to release the
      Bitcoin.
    </p>

    <p>
      Read
      <DocLink to="/docs/assets-and-entities/bitcoin-locks"
        >Bitcoin Locks</DocLink
      >
      and
      <DocLink to="/docs/assets-and-entities/bitcoin-liquids"
        >Bitcoin Liquids</DocLink
      >
      for the rules behind the two stages.
    </p>

    <h2>Argon Bonds</h2>
    <p>
      The Argon Bonds section shows vaults with available bond capacity and the
      share of eligible vault revenue each one offers. Purchasing a Bond commits
      a whole number of ARGN to the selected vault's capital pool. The position
      then earns according to the protocol's frame and distribution rules.
    </p>

    <p>
      Argon Desktop keeps each position visible after purchase, including its
      principal, earnings, current state, and release timing. Releasing a Bond
      stops its future participation and begins the protocol-defined period
      before the ARGN becomes spendable again. See
      <DocLink to="/docs/assets-and-entities/argon-bonds"
        >Argon Bonds</DocLink
      >
      for the complete lifecycle.
    </p>

    <h2>Argonot Stakes</h2>
    <p>
      Argonot Stakes commit ARGNOT through a mining operation and receive a
      proportional share of the Stake allocation from mining bids. The ARGNOT
      remains in a protocol-controlled position rather than becoming the miner's
      property.
    </p>

    <p>
      The app shows available capacity, the mining operation associated with a
      position, accumulated distributions, and the position's release state.
      Read
      <DocLink to="/docs/assets-and-entities/argonot-stakes"
        >Argonot Stakes</DocLink
      >
      for participation, earnings, and release rules.
    </p>

    <h2>Tracking Treasury Positions</h2>
    <p>
      Treasury positions are reflected throughout the app. The sidebar shows
      their current value, the Profits menu brings their returns together, and
      the Internal App Wallet distinguishes immediately usable ARGN from value
      committed to active or releasing positions.
    </p>

    <p>
      Each activity also has its own dashboard. These screens preserve the
      position history and surface actions that are currently available, such as
      creating another position or beginning a release. Network values and
      estimated returns can change while a position is active.
    </p>

    <h2>Treasury Certification</h2>
    <p>
      Unlocking Treasury also adds Treasury Certification to the top navigation.
      Certification is a practical checklist covering wallet recovery, Bitcoin
      Locks, qualifying inbound ARGN transfers, and active Argon Bonds. Argon
      Desktop reads the relevant account activity and keeps the checklist up to
      date.
    </p>

    <p>
      Completing the checklist makes you eligible to request an Operations
      upgrade from your sponsor. It does not automatically make you an Operator
      or require the sponsor to approve the request. Continue to
      <DocLink to="/docs/desktop-app/treasury-certification"
        >Treasury Certification</DocLink
      >
      for the requirements and
      <DocLink to="/docs/desktop-app/operations"
        >Operations (Level Three)</DocLink
      >
      for what the next level adds.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import VideoLoop from "@/components/VideoLoop.vue";
</script>
