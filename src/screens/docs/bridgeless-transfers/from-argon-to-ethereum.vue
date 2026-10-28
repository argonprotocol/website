<template>
  <DocHeader>Transfer from Argon to Ethereum</DocHeader>

  <DocContent>
    <p>
      Argon Desktop makes it easy to transfer tokens from your Internal App
      Wallet to any Ethereum wallet.
    </p>

    <VideoLoop src="/videos/desktop-app-overview.webm" class="mt-8 mb-10">
      <li>Wallet Overlay</li>
      <li>Add Connector</li>
      <li>Transfer</li>
      <li>Show Pending Transfers</li>
    </VideoLoop>

    <h2>Before You Begin</h2>
    <p>
      You need an Ethereum wallet containing the tokens you want to transfer.
      The wallet also needs enough ETH to pay any Ethereum network fees.
    </p>

    <h2>Connect Your Ethereum Wallet</h2>
    <p>
      Argon Desktop can import any Ethereum wallet that has a mnemonic or private key.
    </p>

    <ol class="list-decimal">
      <li>Open the wallet view in Argon Desktop.</li>
      <li>
        Select an empty connector beside the Internal App Wallet and choose the
        type of Ethereum wallet you want to add. Use our step-by-step instructions for
        <DocLink to="/docs/bridgeless-transfers/connect-metamask-wallet">MetaMask</DocLink>
        or
        <DocLink to="/docs/bridgeless-transfers/connect-uniswap-wallet">Uniswap</DocLink>
        wallet.
      </li>
      <li>
        Argon Desktop encrypts the wallet secret on
        your device so it can sign the Ethereum transactions you approve.
      </li>
      <li>
        When the import is complete, the wallet appears as a Connector and
        shows its ARGN and ARGNOT balances.
      </li>
    </ol>

    <h2>Trigger the Transfer</h2>
    <p>
      Sending from your Internal App Wallet is similar to sending from any other
      crypto wallet:
    </p>
    <ol class="list-decimal">
      <li>Open your Internal App Wallet and select <strong>Send</strong>.</li>
      <li>Choose your desired Ethereum wallet as the destination.</li>
      <li>Select ARGN or ARGNOT and enter the amount to transfer.</li>
      <li>
        Review the destination and estimated costs, then initiate the transfer.
      </li>
    </ol>

    <p>
      Transfers out of Argon include an Argon network fee, a Minting Authority
      tip, and an Ethereum network fee. Ensure you keep enough in your Internal App
      Wallet and Ethereum wallet for related fees. The app shows what you'll need
      before you initiate the transfer.
    </p>

    <h2>Track a Pending Transfer</h2>
    <p>
      Bridgeless Transfers cross two networks, so they do not complete
      immediately. The transfer-status bar at the bottom of your screen shows
      pending transfers and their current status. You can close the app while a
      transfer is pending; it resumes tracking the transfer when you reopen it.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import VideoLoop from "@/components/VideoLoop.vue";
</script>
