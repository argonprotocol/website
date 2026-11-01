<template>
  <DocHeader>Operations (Level Three)</DocHeader>

  <DocContent>
    <p>
      Operations is the highest level of access in Argon Desktop. It adds tools
      for running mining and vaulting infrastructure and onboarding new members.
      All Basic and Treasury features remain available.
    </p>

    <VideoLoop src="/videos/desktop-app-overview.webm" class="mt-8 mb-10">
      <li>Operations approval and registration</li>
      <li>Mining setup and dashboard</li>
      <li>Vault creation and dashboard</li>
      <li>Onboarding and upgrade requests</li>
    </VideoLoop>

    <p>
      You must complete <DocLink to="/docs/desktop-app/treasury-certification">Treasury Certification</DocLink>
      before you can request Operations access. Approval remains your sponsor’s decision and
      requires the Operator to have an available upgrade code.
    </p>

    <p>
      Mining and Vaulting rely on server software that must keep running when
      Argon Desktop is closed. The app guides you through setting up a supported
      server or connecting a machine you manage. Once connected, the Server menu
      shows the server’s status and provides configuration, diagnostic, and
      maintenance tools.
    </p>

    <h2>Mining</h2>

    <p>
      The Mining section lets you set up and manage your mining operation. It
      helps you configure the mining server and accounts, prepare mining
      authority keys, and choose a bidding strategy. It also shows the ARGN bid
      and ARGNOT commitment required to compete for seats.
    </p>

    <p>
      The Mining dashboard tracks your bids, upcoming auctions, active seats,
      completed mining terms, block rewards, and balances associated with the
      operation. You can use multiple mining accounts to compete for multiple
      seats. See <DocLink to="/docs/network-rules/mining-operations">Mining Operations</DocLink> for auction rules, seat terms, and operating
      responsibilities.
    </p>

    <h2>Vaulting</h2>

    <p>
      The Vaulting section lets you create and manage a Stabilization Vault. It
      guides you through committing the required capital and setting the terms
      offered to Bitcoin holders and Argon Bond participants. The dashboard
      shows how your vault’s capital is allocated and how much capacity is in
      use.
    </p>

    <p>
      Use the Vaulting dashboard to review Bitcoin cosigning requests, adjust
      capital and settings, collect revenue, and monitor vault health. See
      <DocLink to="/docs/network-rules/vaulting-operations">Vaulting Operations</DocLink> for capital requirements and ongoing responsibilities.
    </p>

    <h2>Member Onboarding</h2>

    <p>
      Operators can use the Onboarding page to invite Treasury
      members, view their certification progress, review Operations upgrade
      requests, and manage available upgrade codes.
    </p>

    <p>
      The Onboarding dashboard also tracks certification and referral progress
      and shows rewards available to claim. See <DocLink to="/docs/network-rules/certification-rewards">Certification Rewards</DocLink> for funding and
      eligibility rules.
    </p>

    <h2>Connections and Alliances</h2>

    <p>
      Your sponsor is your upstream connection, and the members and operators you sponsor are your
      downstream connections. Planned alliance tools will let operators search a list of other
      operators and create connections to borrow or supply unused Securitization or BTC for their
      vaults. See <DocLink to="/docs/network-rules/connections">Connections</DocLink> for how
      these relationships fit together.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import VideoLoop from "@/components/VideoLoop.vue";
</script>
