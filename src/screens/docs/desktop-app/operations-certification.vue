<template>
  <DocHeader>Operator Certification</DocHeader>

  <DocContent>
    <p>
      Operator Certification introduces you to running Argon’s mining and
      vaulting infrastructure through a guided checklist of practical
      activities. You create and fund a Stabilization Vault, earn mining seats,
      and complete the qualifying transfer requirement.
    </p>

    <p>
      Completing the process establishes your status as a certified Operator and
      makes you eligible for certification rewards under the protocol’s rules.
    </p>

    <VideoLoop src="/videos/desktop-app-overview.webm" class="mt-8 mb-10">
      <li>Open the Operator Certification checklist</li>
      <li>Complete qualifying Uniswap transfers</li>
      <li>Create and fund a Stabilization Vault</li>
      <li>Earn two qualifying mining seats</li>
      <li>Finalize certification</li>
      <li>View rewards and the first upgrade code</li>
    </VideoLoop>

    <p>
      After your Operations upgrade is approved and your Operational Account is
      registered, open the certification checklist to view your progress and
      begin each guided workflow. See <DocLink to="/docs/desktop-app/access-codes">Access and Upgrades</DocLink> for the access process.
    </p>

    <h2>Requirements</h2>

    <p>
      Mining and Vaulting require server software that stays online, sufficient
      operating capital, secure keys, and ongoing attention to protocol duties.
      The checklist guides you through the initial requirements. After
      certification, you remain responsible for maintaining your infrastructure
      and fulfilling those duties.
    </p>

    <h3>Transfer at Least 3,000 ARGN from Uniswap</h3>

    <p>
      Complete a cumulative total of at least 3,000 ARGN in qualifying inbound
      transfers through the supported Uniswap transfer workflow. Qualifying
      transfers during Treasury Certification also count toward this total. See
      <DocLink to="/docs/bridgeless-transfers">Bridgeless Transfers</DocLink> for transfer instructions.
    </p>

    <h3>Create and Fund a Stabilization Vault</h3>

    <p>
      Create a Stabilization Vault and commit at least 2,500 ARGN in vault
      securitization capital. Connect the server that will perform the vault’s
      ongoing work.
    </p>

    <p>
      See <DocLink to="/docs/assets-and-entities/vaulting-operations">Vaulting Operations</DocLink> for setup instructions, capital requirements, withdrawal
      restrictions, and operating responsibilities.
    </p>

    <h3>Win Two Mining Seats</h3>

    <p>
      Earn at least two qualifying mining seats through the seat-auction
      process. Configuring a miner or submitting a bid does not complete this
      requirement; the bid must win a qualifying seat.
    </p>

    <p>
      See <DocLink to="/docs/assets-and-entities/mining-operations">Mining Operations</DocLink> for seat auctions, terms, collateral, and operating
      responsibilities.
    </p>

    <h2>Finalize Your Certification</h2>

    <p>
      When all requirements are complete, follow the checklist’s final step to
      register your certification onchain.
    </p>

    <p>
      The protocol checks your eligibility again when certification is
      finalized. Keep the required Treasury positions and vault capital in place
      until that step is complete.
    </p>

    <p>
      Certification also provides your first Operations upgrade code.
    </p>

    <h2>Certification Rewards</h2>

    <p>
      When Operator Certification is finalized, the protocol records your
      certification reward and any eligible reward for your sponsoring Operator.
    </p>

    <p>
      See <DocLink to="/docs/assets-and-entities/certification-rewards">Certification Rewards</DocLink> for reward amounts, eligibility, and collection rules.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import VideoLoop from "@/components/VideoLoop.vue";
</script>
