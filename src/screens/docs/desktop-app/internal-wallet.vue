<template>
  <DocHeader>Internal Wallet</DocHeader>

  <DocContent>
    <p>
      Argon Desktop's internal wallet uses the Argon account you created or
      imported when setting up the app. You can use it to check balances, receive
      tokens, and send funds.
    </p>

    <VideoLoop src="/videos/desktop-app-overview.webm" class="mt-8 mb-10">
      <li>Account Overview -- Click Wallet in Bottom Left</li>
      <li>Wallet Overlay</li>
      <li>Add Ethereum Connector - Mnemonic</li>
      <li>Transfer ARGN on Ethereum to Internal</li>
      <li>Add Bitcoin Channel</li>
      <li>Add Bitcoin Channel -- Show Incoming</li>
      <li>Send ARGN to External Address</li>
      <li>Show Pending Transfers (Bitcoin + Sending)</li>
    </VideoLoop>

    <p>
      Open your wallet by selecting your balance at the bottom left of the app.
      You can also open it from Account Overview.
    </p>

    <p>
      The wallet shows your Argon (ARGN), Argonot (ARGNOT), and Bitcoin (BTC)
      balances, along with their value in your selected currency. It also shows
      any ARGN awaiting issuance.
    </p>

    <p>
      To use ARGN or ARGNOT from an Ethereum wallet on the Argon network, first
      transfer those tokens into your internal wallet.
    </p>

    <h2>Send and Receive On the Argon Network</h2>
    <p>
      You can send ARGN and ARGNOT to other accounts on the Argon network and
      receive either token at your Argon address.
    </p>
    <VideoLoop src="/videos/desktop-app-overview.webm" class="mt-8 mb-10">
      <li>Wallet Overlay</li>
      <li>Send ARGN to External Address</li>
    </VideoLoop>

    <p>
      Select Receive to copy your public Argon address or display its QR code.
      ARGN and ARGNOT use the same address.
    </p>
    <p>
      Select Send, choose the token, and enter the amount and recipient's Argon
      address. Review the destination and estimated fees before confirming the
      transfer.
    </p>

    <h2>Send and Receive On the Ethereum Network</h2>
    <p>
      An Ethereum connector links an Ethereum wallet to Argon Desktop so you can
      view its supported balances and transfer ARGN and ARGNOT between Ethereum
      and Argon.
    </p>
    <VideoLoop src="/videos/desktop-app-overview.webm" class="mt-8 mb-10">
      <li>Wallet Overlay</li>
      <li>Add Ethereum Connector - Mnemonic</li>
      <li>Transfer ARGN on Ethereum to Internal</li>
      <li>Show Pending Transfers (Bitcoin + Sending)</li>
    </VideoLoop>

    <p>
      Each Ethereum wallet has a separate balance. Connecting it does not
      automatically move its tokens into your internal wallet.
    </p>
    <p>
      To transfer tokens into Argon, open the Ethereum connector, choose a token,
      and enter an amount. To transfer tokens back to Ethereum, select Send in
      your internal wallet and choose a connected Ethereum wallet as the
      destination.
    </p>
    <p>
      Review the estimated costs before initiating a transfer. Ethereum network
      fees are paid in ETH, and transfers out of Argon also require ARGN for
      Argon network fees.
    </p>
    <p>
      Transfers between Argon and Ethereum take several steps. Open the pending
      transfers bar at the bottom of the wallet to follow progress and review any
      required actions or error messages. See
      <DocLink to="/docs/bridgeless-transfers">Bridgeless Transfers</DocLink>
      for more details about moving tokens between networks.
    </p>

    <h2>Send and Receive On the Bitcoin Network</h2>
    <p>
      Receiving Bitcoin requires you to set up a Bitcoin channel with a vault
      cosigner. The channel identifies the vault cosigner, derives your Bitcoin
      key, and produces a multisig funding address for your deposit.
      Depositing BTC creates a
      <DocLink to="/docs/assets-and-entities/bitcoin-locks">Bitcoin Lock</DocLink>:
      Bitcoin held on the Bitcoin network in a multisig arrangement between you
      and the vault. Argon Desktop displays and manages this position.
    </p>

    <VideoLoop src="/videos/desktop-app-overview.webm" class="mt-8 mb-10">
      <li>Wallet Overlay</li>
      <li>Add Bitcoin Channel</li>
      <li>Add Bitcoin Channel -- Show Incoming</li>
      <li>Show Pending Transfers (Bitcoin + Sending)</li>
    </VideoLoop>

    <ol class="ml-6 list-decimal">
      <li>Select Receive for BTC and follow the steps to create a Bitcoin channel.</li>
      <li>Review the vault cosigner and any Cosigner Guarantee before proceeding.</li>
      <li>Once the app displays your deposit address, send BTC to that address.</li>
    </ol>

    <p>
      After the Bitcoin transaction is confirmed, the funded UTXO appears in the
      wallet as a Bitcoin Lock. Your recovery phrase controls your side of the
      Lock; the selected vault supplies the second signing key.
    </p>
    <p>
      Funding a Bitcoin Lock does not automatically create or distribute ARGN.
      To receive Argon stablecoins, separately create a Bitcoin Liquid against
      an eligible Lock. See <DocLink to="/docs/desktop-app/treasury">Treasury</DocLink>
      for instructions.
    </p>

    <p>
      During the channel's normal operation, spending the deposited BTC requires
      both your signature and the vault's signature.
    </p>
    <p>
      The optional Cosigner Guarantee specifies a penalty for the vault if it
      fails to sign when required. Review the guarantee's amount and terms before
      creating the channel.
    </p>
    <p>
      To send BTC, select Send, enter the amount and recipient's Bitcoin address,
      and review the Bitcoin network fee before confirming. Any open Bitcoin
      Liquid must first be closed. You and the vault then sign the release
      transaction, and the app broadcasts it to the Bitcoin network.
    </p>
    <p>
      The protocol gives the vault a defined period to provide its signature
      before failure-handling rules apply. See
      <DocLink to="/docs/assets-and-entities/bitcoin-locks">Bitcoin Locks</DocLink>
      for more about releasing BTC.
    </p>

    <h2>Protect Your Wallet Access</h2>
    <p>
      Open the wallet menu to view your private key. The key remains hidden until
      you select Show. Anyone with this key can spend funds from your Argon
      account. Never share it.
    </p>
    <p>
      Read
      <DocLink to="/docs/desktop-app/self-custody-risks">Self-Custody Risks</DocLink>
      for more about protecting your wallet access.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocLink from "@/screens/docs/DocLink.vue";
import VideoLoop from "@/components/VideoLoop.vue";
</script>
