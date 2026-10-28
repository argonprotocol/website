<template>
  <DocHeader>Basic Functionality (Level One)</DocHeader>

  <DocContent>
    <p>
      Basic is the first level of Argon Desktop and is available to
      everyone. You can manage your wallet, transfer supported assets, view
      network activity, and use Market Stabilizers. No invitation or
      Operator sponsorship is required.
    </p>

    <VideoLoop src="/videos/desktop-app-overview.webm" class="mt-8 mb-10">
      <li>Account Overview</li>
      <li>Internal Wallet</li>
      <li>Network Economics</li>
      <li>Market Stabilizers</li>
      <li>Upgrade to Treasury</li>
    </VideoLoop>

    <p>
      When you first open Argon Desktop, you can create a new account or
      import an existing account. This account is used by the app's
      internal wallet.
    </p>

    <p>
      If you create a new account, the app generates its recovery
      credentials locally. Record your recovery phrase and verify your
      backup before funding the wallet. Argon does not keep a copy, and an
      Operator cannot recover the account for you. Read
      <DocLink to="/docs/desktop-app/self-custody-risks">Self-Custody Risks</DocLink>
      for guidance on protecting your wallet.
    </p>

    <h2>Account Overview</h2>

    <p>
      Account Overview is the app’s home screen. It shows the value of
      assets in your internal wallet and connected Ethereum wallets. It also
      distinguishes argons available to spend from argons committed to
      positions or involved in pending transactions.
    </p>

    <p>
      The purchasing-power indicators show Argon’s current target value, how
      its purchasing power compares with your selected currency, and the
      network’s capacity to respond to price deviations.
    </p>

    <h2>Wallets and Transfers</h2>

    <p>
      Open a wallet to view its supported balances. From your internal
      wallet, you can send ARGN and ARGNOT to another Argon address or share
      your address or QR code to receive them. Ethereum connectors let you
      transfer supported tokens between Argon and Ethereum.
    </p>

    <p>
      See
      <DocLink to="/docs/desktop-app/internal-wallet">Internal Wallet</DocLink>
      for sending and receiving instructions, network fees, and
      pending-transfer guidance.
    </p>

    <p>
      You can connect an external Ethereum wallet directly into the app
      which allows you to view remote balances and initiate transfers. See
      <DocLink to="/docs/bridgeless-transfers">Bridgeless Transfers</DocLink>.
    </p>

    <h2>Network Economics</h2>

    <p>
      Network Economics helps you understand current asset prices, token
      circulation, mining and vaulting activity, Bitcoin held in vaults,
      mining-seat costs, estimated annual returns, and more. It is available
      at every access level. Estimated returns do not guarantee future
      results.
    </p>

    <h2>Market Stabilizers</h2>

    <p>
      Market Stabilizers help you earn yield through Uniswap trading
      activity. In addition to the standard fees that Uniswap gives, the Argon Network
      allows you to earn a portion of daily mining revenue on these same Uniswap
      liquidity positions.
    </p>

    <p>
      Also, whenever Argon deviates from its target price, the Argon Network
      activates Stabilizer Buy positions that allow you to earn a portion of
      vaulting revenues.
    </p>

    <h2>Beyond Basic</h2>

    <p>
      You can gain access to even more Argon features by upgrading to
      <DocLink to="/docs/desktop-app/treasury">Treasury (Level Two)</DocLink>.
      All you need is an invite from a network Operator. Treasury unlocks
      Desktop with a number of additional yield-bearing instruments such as Bitcoin
      Liquids, Argon Bonds, and Argonot Stakes.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import VideoLoop from "@/components/VideoLoop.vue";
</script>
