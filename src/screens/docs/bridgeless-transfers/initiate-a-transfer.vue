<template>
  <DocHeader>Open a Transfer Portal</DocHeader>

  <DocContent>
    <p>
      A <strong>Transfer Portal</strong> is an Ethereum wallet connected to
      Argon Desktop. It appears beside the Internal App Wallet and gives you a
      direct path for moving ARGN or ARGNOT between Ethereum and Argon.
      Connecting the wallet does not move any tokens.
    </p>

    <div
      class="my-8 flex aspect-video items-center justify-center rounded-lg border border-dashed border-slate-400 bg-slate-100/50 px-6 text-center text-slate-500"
    >
      Silent Transfer Portal walkthrough video
    </div>

    <h2>Before You Begin</h2>
    <p>
      You need an Ethereum wallet containing the tokens you want to transfer.
      The wallet also needs enough ETH to pay any Ethereum network fees. Argon
      Desktop can import a
      <DocLink to="/docs/bridgeless-transfers/connect-metamask-wallet"
        >MetaMask account</DocLink
      >
      using its private key or a
      <DocLink to="/docs/bridgeless-transfers/connect-uniswap-wallet"
        >Uniswap Wallet account</DocLink
      >
      using its recovery phrase.
    </p>

    <h2>Connect the Ethereum Wallet</h2>
    <ol>
      <li>Open the wallet view in Argon Desktop.</li>
      <li>
        Select an empty connector beside the Internal App Wallet and choose
        the type of Ethereum wallet you want to add.
      </li>
      <li>
        Follow the import steps. Argon Desktop encrypts the wallet secret on
        your device so it can sign the Ethereum transactions you approve.
      </li>
      <li>
        When the import is complete, the wallet appears as a Transfer Portal
        showing its ARGN and ARGNOT balances.
      </li>
    </ol>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="mb-1 block">Protect the wallet secret</strong>
      <p class="m-0">
        A private key or recovery phrase gives control of the Ethereum wallet.
        Never share it, and only enter it in the Argon Desktop import flow on a
        device you trust.
      </p>
    </aside>

    <h2>Transfer Into the Internal App Wallet</h2>
    <ol>
      <li>Open the Ethereum Transfer Portal.</li>
      <li>Select ARGN or ARGNOT and enter the amount to transfer.</li>
      <li>
        Review the destination, available balance, and estimated Ethereum
        network fee, then initiate the transfer.
      </li>
      <li>
        Follow the transfer as it finalizes on Ethereum, is proven to Argon,
        and finalizes in the Internal App Wallet.
      </li>
    </ol>

    <p>
      The tokens become spendable in the Internal App Wallet after the final
      Argon stage completes.
    </p>

    <h2>Transfer Back to Ethereum</h2>
    <ol>
      <li>Open the Internal App Wallet and begin a transfer.</li>
      <li>
        Choose a connected Ethereum wallet as the destination, then select
        ARGN or ARGNOT and enter the amount.
      </li>
      <li>
        Review the Argon network fee, Minting Authority tip, and Ethereum
        network fee before initiating the transfer.
      </li>
      <li>
        Follow the transfer as it finalizes on Argon, receives Minting
        Authorization, and is sent to Ethereum.
      </li>
    </ol>

    <h2>Track a Pending Transfer</h2>
    <p>
      Bridgeless Transfers cross two networks, so they do not complete
      immediately. The transfer-status bar at the bottom of Argon Desktop shows
      pending transfers and their current stages. You can close the app while a
      transfer is pending; it resumes tracking the transfer when you reopen it.
    </p>

    <p>
      For the protocol behind these steps, see
      <DocLink to="/docs/bridgeless-transfers"
        >How Bridgeless Transfers Work</DocLink
      >.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
