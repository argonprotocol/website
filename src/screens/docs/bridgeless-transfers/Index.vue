<template>
  <DocHeader>How Bridgeless Transfers Work</DocHeader>

  <DocContent>
    <p>
      Bridgeless Transfers move
      <DocLink to="/docs/assets-and-entities/argon-stablecoins"
        >ARGN</DocLink
      >
      and
      <DocLink to="/docs/assets-and-entities/argonot-tokens"
        >ARGNOT</DocLink
      >
      between Argon and supported external networks without depositing them
      into a conventional bridge reserve. The tokens are removed from the
      source network and issued on the destination network after the transfer
      has been verified.
    </p>

    <p>
      Ethereum is the first supported external network. Argon Desktop brings
      the two networks together through an Internal App Wallet and one or more
      external Ethereum wallets called <strong>Transfer Portals</strong>.
    </p>

    <section
      class="my-9 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-6 text-center"
    >
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
        The Transfer Rule
      </div>
      <div class="mt-4 text-xl font-semibold text-slate-800 sm:text-2xl">
        Burn on the source network
        <span class="mx-2 text-argon-500">→</span>
        Verify the transfer
        <span class="mx-2 text-argon-500">→</span>
        Issue on the destination network
      </div>
    </section>

    <h2>Ethereum to Argon</h2>
    <p>
      A transfer into Argon begins in a connected Ethereum wallet. The Ethereum
      gateway burns the selected ARGN or ARGNOT and records the destination
      address of the Internal App Wallet. The app then follows three stages:
    </p>

    <ol>
      <li>
        <strong>Finalizing on Ethereum.</strong> The transaction containing the
        burn reaches Ethereum finality.
      </li>
      <li>
        <strong>Proving to Argon.</strong> The gateway activity is included in
        the ordered Ethereum activity proven to Argon.
      </li>
      <li>
        <strong>Finalizing on Argon.</strong> Argon verifies the proof and makes
        the corresponding tokens available in the Internal App Wallet.
      </li>
    </ol>

    <p>
      The connected Ethereum wallet pays the Ethereum network fee in ETH. No
      Minting Authority is needed for this direction because the Ethereum burn
      can be proven directly to Argon.
    </p>

    <h2>Argon to Ethereum</h2>
    <p>
      A transfer out of Argon begins with a request naming the selected
      Ethereum wallet, token, and amount. The principal is moved to Argon's burn
      account, and a Minting Authority tip is held while the transfer is open.
      The app then follows a different three-stage lifecycle:
    </p>

    <ol>
      <li>
        <strong>Finalizing on Argon.</strong> Argon records the transfer request
        and removes the amount from spendable circulation.
      </li>
      <li>
        <strong>Waiting for Minting Authorization.</strong> One or more Minting
        Authorities attach signed collateral until the request is fully backed.
      </li>
      <li>
        <strong>Sending to Ethereum.</strong> The Ethereum gateway verifies the
        authorizations and issues the tokens to the named Ethereum address.
      </li>
    </ol>

    <p>
      The completed Ethereum activity is proven back to Argon. That proof
      reconciles the participating authorities' collateral and distributes the
      held tip. Transfers in this direction include an Argon network fee, a
      Minting Authority tip, and an Ethereum network fee paid in ETH.
    </p>

    <h2>Transfer Portals in Argon Desktop</h2>
    <p>
      A Transfer Portal is an Ethereum wallet imported into Argon Desktop. It
      appears as an external connector around the Internal App Wallet and shows
      the ARGN and ARGNOT available at that Ethereum address. Connecting a
      wallet does not move its funds.
    </p>

    <p>
      From a portal, you can select ARGN or ARGNOT, enter an amount, review the
      network costs, and initiate a transfer into the Internal App Wallet. From
      the Internal App Wallet, you can select a connected Ethereum wallet as the
      destination for a transfer in the other direction.
    </p>

    <p>
      Argon Desktop encrypts imported wallet secrets on the device and uses
      them to sign the required Ethereum transactions. Learn how to
      <DocLink to="/docs/bridgeless-transfers/connect-metamask-wallet"
        >import a MetaMask account</DocLink
      >
      using its private key or
      <DocLink to="/docs/bridgeless-transfers/connect-uniswap-wallet"
        >import a Uniswap Wallet account</DocLink
      >
      using its recovery phrase.
    </p>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="mb-1 block">Bitcoin uses a separate channel</strong>
      <p class="m-0">
        Bitcoin also appears as a connector in the wallet interface, but it
        does not use the ARGN and ARGNOT transfer process described here. Its
        channel is used to fund Bitcoin network addresses and create
        <DocLink to="/docs/assets-and-entities/bitcoin-locks"
          >Bitcoin Locks</DocLink
        >.
      </p>
    </aside>

    <h2>The Operational Roles</h2>
    <p>
      Bridgeless Transfers separate user transfers from the operational roles
      that support them:
    </p>

    <ul>
      <li>
        <DocLink
          to="/docs/bridgeless-transfers/localized-minting-authorities"
          >Localized Minting Authorities</DocLink
        >
        commit collateral and authorize individual transfers from Argon to an
        external network.
      </li>
      <li>
        The
        <DocLink
          to="/docs/bridgeless-transfers/global-issuance-council"
          >Global Issuance Council</DocLink
        >
        approves shared gateway changes, including authority activations,
        authority deactivations, and council rotations. It does not approve
        individual user transfers.
      </li>
    </ul>

    <h2>Tracking a Transfer</h2>
    <p>
      Cross-network finality, proof relay, and Minting Authorization take time.
      Argon Desktop records pending transfers locally, resumes tracking them
      after the app restarts, and shows the current stage in the wallet's
      transfer-status bar. A transfer remains pending until its destination
      network has finalized the result.
    </p>

    <p>
      Continue to
      <DocLink to="/docs/bridgeless-transfers/open-a-transfer-portal"
        >Open a Transfer Portal</DocLink
      >
      for the user workflow.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
