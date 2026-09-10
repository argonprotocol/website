<template>
  <DocHeader>Basic Functionality (Level One)</DocHeader>

  <DocContent>
    <p>
      Basic is the first level of Argon Desktop and is available to everyone. It
      provides the self-custodial wallet, transfer, market, and network tools
      needed to begin using Argon. No invitation or sponsoring Operator is
      required.
    </p>

    <p>
      Basic is not a limited demonstration mode. You control a real Argon
      account, can connect supported external wallets, and authorize your own
      transactions. Treasury and Operations add new forms of participation to
      this same foundation.
    </p>

    <h2>Start with an Argon Account</h2>
    <p>
      When Argon Desktop opens for the first time, you can create a new Argon
      account or import one using its recovery phrase. The account created or
      imported here becomes the Internal App Wallet shown throughout the app.
    </p>

    <p>
      Creating an account also creates its recovery credentials locally. Argon
      does not keep a copy, and an Operator cannot recover the account for you.
      Record the recovery phrase before moving significant assets. See
      <DocLink to="/docs/desktop-app/self-custody-risks"
        >Self-Custody Risks</DocLink
      >
      for the responsibilities that come with controlling the account.
    </p>

    <h2>Account Overview</h2>
    <p>
      Account Overview is the home screen. It shows the value held in the
      Internal App Wallet and any connected Ethereum wallets. It also separates
      immediately usable ARGN from value currently committed to positions or
      awaiting completion.
    </p>

    <p>
      The purchasing-power indicators at the top of the screen provide context
      for ARGN's current target, its performance relative to the selected
      currency, and the network's available restabilization capacity. These
      indicators describe the network; they do not change which assets are
      available to spend.
    </p>

    <h2>Wallets and Transfers</h2>
    <p>
      Selecting a wallet opens its ARGN, ARGNOT, and other supported token
      balances. From the wallet interface you can send assets to another Argon
      address, receive assets using an address or QR code, and move supported
      tokens between the Argon and Ethereum networks.
    </p>

    <p>
      Ethereum wallets can be created inside Argon Desktop or connected from a
      supported external wallet. Connecting a wallet lets the app display its
      supported balances and prepare transfers, but it does not give Argon
      Desktop permission to move assets without the required authorization.
    </p>

    <p>
      Argon Desktop records completed and pending activity in its transaction
      history. Onchain transactions can also be followed using their network
      details. For the crosschain process, continue to
      <DocLink to="/docs/bridgeless-transfers"
        >Bridgeless Transfers</DocLink
      >.
    </p>

    <h2>Stable Swaps</h2>
    <p>
      Stable Swaps are part of Basic Functionality. They do not require a
      Treasury invitation. The Stable Swaps screen compares ARGN's market price
      on supported exchanges with its current purchasing-power target and
      identifies trades that can help close a price gap.
    </p>

    <p>
      When a supported opportunity is available, Argon Desktop calculates the
      relevant direction and amount before you authorize the trade with a funded
      Ethereum wallet. The decision to trade remains yours, and market
      conditions can change before a transaction completes. Read
      <DocLink to="/docs/assets-and-entities/stable-swaps"
        >Stable Swaps</DocLink
      >
      for the underlying stabilization role.
    </p>

    <h2>Network Economics</h2>
    <p>
      Network Economics is a public view of Argon's current activity. It brings
      together measures such as asset prices, circulation, mining and vaulting
      participation, Bitcoin in vaults, seat costs, and modeled annual returns.
      You do not need Treasury or Operations access to follow these conditions.
    </p>

    <p>
      These figures summarize current network data. They are useful for
      understanding the system and evaluating possible activities, but they are
      not promises of future prices or returns.
    </p>

    <h2>Moving Beyond Basic</h2>
    <p>
      Basic does not include Bitcoin Locks, Argon Bonds, Argonot Stakes, Mining,
      Vaulting, or Member Onboarding. Those activities appear when the
      corresponding access level is unlocked.
    </p>

    <p>
      An existing Operator can invite you to
      <DocLink to="/docs/desktop-app/treasury"
        >Treasury (Level Two)</DocLink
      >. Treasury Certification can then make you eligible to request
      <DocLink to="/docs/desktop-app/operations"
        >Operations (Level Three)</DocLink
      >. Read
      <DocLink to="/docs/desktop-app/access-codes"
        >Access and Upgrades</DocLink
      >
      for the complete progression.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
