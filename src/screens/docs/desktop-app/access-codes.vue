<template>
  <DocHeader>Access and Upgrades</DocHeader>

  <DocContent>
    <p>
      Argon Desktop has three access levels: Basic, Treasury, and Operations.
      Each level adds capabilities while you retain control of your account.
      Basic is available to everyone. Treasury requires an invitation from an
      existing Operator. Operations requires Treasury Certification and approval
      from your sponsoring Operator.
    </p>

    <h2>Access to Basic</h2>
    <p>
      Basic is available without an invitation. You can
      <DocLink to="/docs/bridgeless-transfers/connect-uniswap-wallet">connect Ethereum wallets</DocLink>,
      view balances and transaction history,
      <DocLink to="/docs/bridgeless-transfers">transfer supported assets</DocLink>,
      and use
      <DocLink to="/docs/network-rules/market-stabilizers">Market Stabilizers</DocLink>.
      See
      <DocLink to="/docs/desktop-app/basic-functionality">Basic Functionality</DocLink>
      for details.
    </p>

    <h2>Access to Treasury</h2>
    <p>
      Treasury requires a one-use invitation from an existing Operator.
      Accepting the invitation gives you access to
      <DocLink to="/docs/asset-rules/bitcoin-liquids">Bitcoin Liquids</DocLink>,
      <DocLink to="/docs/asset-rules/argon-bonds">Argon Bonds</DocLink>, and
      <DocLink to="/docs/asset-rules/argonot-stakes">Argonot Stakes</DocLink>.
      See <DocLink to="/docs/desktop-app/treasury">Treasury</DocLink> for details.
    </p>

    <h2>Access to Operations</h2>
    <p>
      To request Operations access, you must first complete
      <DocLink to="/docs/desktop-app/treasury-certification">Treasury Certification</DocLink>.
      Your sponsoring Operator decides whether to approve the request and must
      have an available Operations upgrade code. The protocol issues these codes
      in limited quantities.
    </p>
    <p>
      Once your upgrade is approved and your Operational Account is registered,
      you gain access to Mining, Vaulting, and the other operational features.
    </p>
    <p>
      Registration links your operational, vault, and mining accounts and records
      your sponsor as your upstream Operator. You can then set up the
      infrastructure required to complete
      <DocLink to="/docs/desktop-app/operations-certification">Operator Certification</DocLink>.
    </p>

    <h2>The Operator's Role in Controlling Access</h2>
    <p>
      Only Operators can create and distribute Treasury invitations or approve
      upgrades to Operations.
    </p>

    <h3>How Operators Invite Treasury Users</h3>
    <p>
      Operators can open Onboarding from the app's left sidebar and select
      Create Invite to generate a one-use Treasury access code.
    </p>

    <VideoLoop src="/videos/desktop-app-overview.webm" class="mt-8 mb-10">
      <li>Onboarding</li>
      <li>Create Invite Overlay</li>
      <li>Copy Access Code</li>
    </VideoLoop>

    <h3>How Operators Upgrade Treasury Users</h3>
    <p>
      The Onboarding page shows the Treasury users in an Operator's downstream
      network and any upgrade requests. Users who have
      completed Treasury Certification are eligible to request an upgrade.
      Approval remains the sponsoring Operator's decision and requires an
      available Operations upgrade code.
    </p>

    <VideoLoop src="/videos/desktop-app-overview.webm" class="mt-8 mb-10">
      <li>Onboarding</li>
      <li>Create Invite Overlay</li>
      <li>Copy Access Code</li>
    </VideoLoop>

    <h3>How Operators Earn Upgrade Codes</h3>
    <p>
      Each newly certified Operator receives one Operations upgrade code. The
      protocol makes additional codes available through continued participation:
    </p>
    <ul class="ml-6 list-disc">
      <li>A downstream Operator completes Operator Certification.</li>
      <li>
        The Operator secures an additional 5,000 ARGN worth of Bitcoin through
        their vault.
      </li>
      <li>The Operator earns five additional mining seats.</li>
    </ul>
    <p>
      An Operator can currently hold up to three unused upgrade codes at a time.
      The protocol tracks participation that qualifies for additional codes,
      allowing those codes to become available when capacity opens.
    </p>

    <h2>Certification Rewards</h2>
    <p>
      The Certification Rewards pool currently holds
      ₳{{ (Number(data.treasuryRewardsPoolMicrogons) / 1_000_000).toLocaleString('en-US', { maximumFractionDigits: 0 }) }}
      to fund rewards for
      Operators who complete Operator Certification and the upstream Operators
      who help onboard them. Rewards are subject to the protocol's eligibility
      rules. See
      <DocLink to="/docs/network-rules/certification-rewards">Certification Rewards</DocLink>
      for details.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import VideoLoop from "@/components/VideoLoop.vue";
import Data from "@/lib/Data";

const data = Data.basics;
</script>
