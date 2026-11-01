<template>
  <DocHeader>Treasury Certification</DocHeader>

  <DocContent>
    <p>
      Treasury Certification introduces you to the components of Treasury
      through a guided checklist of practical activities. It helps you learn how
      to use Treasury’s features and manage your positions. Completing
      certification also makes you eligible to request Operations access.
    </p>

    <VideoLoop src="/videos/desktop-app-overview.webm" class="mt-8 mb-10">
      <li>Recovery phrase backup</li>
      <li>Qualifying Uniswap transfer</li>
      <li>Qualifying Bitcoin Liquid activity</li>
      <li>Active Argon Bonds</li>
      <li>Operations upgrade request</li>
    </VideoLoop>

    <h2>Requirements</h2>

    <p>
      Open Treasury Certification from the app’s top bar to view your progress.
      Select an item to open its guided workflow.
    </p>

    <h3>Back Up Your Recovery Phrase</h3>

    <p>
      Saving your wallet’s recovery phrase is a critical first step to using
      Argon Desktop. This phrase lets you restore your account if your computer
      fails or the app’s local data is lost. This step is completed locally in
      Argon Desktop and is not published onchain. Read <DocLink to="/docs/desktop-app/self-custody-risks">Self-Custody Risks</DocLink> before
      funding your wallet.
    </p>

    <h3>Transfer at Least 250 ARGN from Uniswap</h3>

    <p>
      Transfer a cumulative total of at least 250 ARGN through the supported
      Uniswap transfer workflow. You can meet this requirement through multiple
      qualifying inbound transfers. Transfers between Argon accounts do not
      count.
    </p>

    <p>
      See <DocLink to="/docs/bridgeless-transfers">Bridgeless Transfers</DocLink> for transfer instructions.
    </p>

    <h3>Create Bitcoin Liquids Worth at Least ₳2,500</h3>

    <p>
      Create qualifying Bitcoin Liquids totaling at least ₳2,500. The amount of
      BTC that totals ₳2,500 can change as Bitcoin’s price fluctuates in the
      market.
    </p>

    <p>
      See <DocLink to="/docs/asset-rules/bitcoin-locks">Bitcoin Locks</DocLink> and <DocLink to="/docs/asset-rules/bitcoin-liquids">Bitcoin Liquids</DocLink> for details.
    </p>

    <h3>Maintain 2,500 Active Argon Bonds</h3>

    <p>
      Maintain active <DocLink to="/docs/asset-rules/argon-bonds">Argon Bond</DocLink> positions with a combined principal of at
      least 2,500 ARGN. Positions that are being released do not count toward
      this requirement.
    </p>

    <p>
      See <DocLink to="/docs/asset-rules/argon-bonds">Argon Bonds</DocLink> for details.
    </p>

    <h2>Request an Operations Upgrade</h2>

    <p>
      When your checklist is complete, you can request Operations access from
      your sponsoring Operator. Approval remains your sponsor’s decision and
      requires an available Operations upgrade code.
    </p>

    <p>
      The protocol checks the financial requirements again when you register
      your Operational Account. If your qualifying Bitcoin value or active Bond
      principal has fallen below the required minimum, you may need to restore
      your eligibility before registration—even if the checklist previously
      showed the requirement as complete.
    </p>

    <p>
      See <DocLink to="/docs/desktop-app/access-codes">Access and Upgrades</DocLink> for the sponsor-approval process and <DocLink to="/docs/desktop-app/operations-certification">Operator Certification</DocLink> for
      the requirements that follow registration.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import VideoLoop from "@/components/VideoLoop.vue";
</script>
