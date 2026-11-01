<template>
  <DocHeader>Remote Wallet Connectors</DocHeader>

  <DocContent>
    <p>
      A Remote Wallet Connector brings an Ethereum wallet into Argon Desktop so
      you can view its ARGN and ARGNOT balances and transfer either token between
      Ethereum and Argon. Each connected wallet appears beside your
      <DocLink to="/docs/desktop-app/internal-wallet">Internal App Wallet</DocLink>.
    </p>

    <p>
      Each wallet keeps its own address and balance. Connecting an Ethereum
      wallet does not move its funds into Argon. To use those tokens on the Argon
      network, you must transfer them into your Internal App Wallet.
    </p>

    <h2>Connect an Ethereum Wallet</h2>
    <p>
      From Account Overview, select <strong>Connect Ethereum Wallet</strong>.
      Argon Desktop connects to an account by importing its private key or
      recovery phrase. Choose the import method that matches your wallet:
    </p>

    <ul>
      <li>
        <DocLink to="/docs/bridgeless-transfers/connect-metamask-wallet">Connect a MetaMask Wallet</DocLink>
        explains how to import an individual account using its private key.
      </li>
      <li>
        <DocLink to="/docs/bridgeless-transfers/connect-uniswap-wallet">Connect a Uniswap Wallet</DocLink>
        explains how to load accounts from a recovery phrase.
      </li>
    </ul>

    <aside class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4">
      <strong class="mb-1 block">WARNING: Protect Your Wallet Access</strong>
      <p class="m-0">
        Anyone with your private key or recovery phrase can control the wallet
        and its funds. Only enter it directly into Argon Desktop on a device
        you trust. Never share it with another person, website, or support
        representative. Read
        <DocLink to="/docs/desktop-app/self-custody-risks">Self-Custody Risks</DocLink>
        for more.
      </p>
    </aside>

    <h2>Note: Bitcoin Is a Completely Different Process</h2>
    <p>
      Bitcoin also appears as a connector in the wallet interface, but it follows a
      completely different transfer mechanism. It uses channels and locks
      to securely transfer BTC into your wallet.
    </p>
    <p>
      Learn more about <DocLink to="/docs/asset-rules/bitcoin-locks">Bitcoin Locks</DocLink>.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocLink from "@/screens/docs/DocLink.vue";
</script>
