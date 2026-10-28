<template>
  <DocHeader>How Bridgeless Transfers Work</DocHeader>

  <DocContent>
    <p>
      Argon's Bridgeless Transfer is able to move tokens directly
      from the Argon Network to remote destination networks without needing
      a conventional bridge or requiring proof of transfer. By avoiding the bridge, it
      avoids one of the biggest risks in the crypto world, the hacking of cross-chain bridges.
    </p>

    <p>
      Ethereum is Argon's first supported external network, but more are expected.
    </p>

    <section
      class="my-9 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-6 text-center"
    >
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
        The Transfer Flow
      </div>
      <div class="mt-4 text-xl font-semibold text-slate-800 sm:text-2xl">
        Burn on Argon
        <span class="mx-2 text-argon-500">→</span>
        <span class="opacity-30">No Bridge</span>
        <span class="mx-2 text-argon-500">→</span>
        Mint on Remote
      </div>
    </section>

    <h2>Remote Minting Authorities</h2>
    <p>
      Argon's Remote Minting Authorities allow tokens to jump from Argon
      to external networks without requiring a bridge. They do this without
      needing to follow Argon's blocks or pre-validate transfer details.
    </p>

    <p>
      Each authority has a minting allowance in the Remote Contract. Think of
      it as funds already waiting on the remote network. The authority can
      directly mint up to that amount without needing Argon approval.
    </p>

    <p>
      That freedom is backed by the authority's own funds, which stay locked
      on Argon. To unlock its funds, the authority must provide proof from the Remote
      Contract showing that it followed all protocol rules. If it fails to follow
      the rules it agreed to follow, it cannot reclaim the matching funds on Argon.
    </p>

    <p>
      Although simple in concept, this Minting Authority architecture is a
      profound leap forward in seamlessly moving between networks without
      putting your funds at risk on a bridge.
    </p>

    <p>
      You can read more about
      <DocLink
          to="/docs/bridgeless-transfers/remote-minting-authorities"
      >Remote Minting Authorities</DocLink
      >.
    </p>

    <h2>Remote Wallet Connectors</h2>
    <p>
      Remote Wallet Connectors bring your Ethereum wallets into Argon Desktop,
      showing their ARGN and ARGNOT balances alongside your Internal App Wallet.
      They let you initiate transfers between Ethereum and Argon. Connecting a
      wallet does not move its funds.
    </p>

    <p>
      Learn more about
      <DocLink to="/docs/bridgeless-transfers/remote-wallet-connectors">Remote Wallet Connectors</DocLink>
      and how to connect your wallet.
    </p>

    <h2>Jumping from Argon to Ethereum</h2>
    <p>
      A transfer out of Argon begins with an Ethereum wallet connector and the amount
      of tokens you want to move. You must include an Argon network fee paid in ARGN
      and an Ethereum network fee paid in ETH. The jump follows a three-stage lifecycle:
    </p>

    <ol>
      <li>
        <strong>Finalize on Argon.</strong> The transfer request is submitted to
        the Argon chain and the tokens are removed from spendable circulation.
      </li>
      <li>
        <strong>Wait for Minting Authorization.</strong> One or more Minting
        Authorities attach their signed collateral to the Argon chain until the
        request is fully backed.
      </li>
      <li>
        <strong>Submit to Ethereum.</strong> You submit your request along with the signed
        minting authorizations directly to the Argon contract on Ethereum. It mints your tokens
        and deposits them in your wallet.
      </li>
    </ol>

    <p>
      Throughout this process, the user's funds never sit on a bridge. No messages need to
      pass between Argon and Ethereum; the user submits the final packet of minting
      authorizations directly in the last step.
    </p>

    <p>
      Learn more about
      <DocLink to="/docs/bridgeless-transfers/from-argon-to-ethereum">Transferring from Argon</DocLink>.
    </p>

    <h2>Jumping from Ethereum to Argon</h2>
    <p>
      The user begins by submitting a single transaction to the Ethereum
      contract with the amount of tokens to transfer and the destination address
      on the Argon Network:
    </p>

    <ol>
      <li>
        <strong>Finalize on Ethereum.</strong> The contract burns the requested
        number of tokens from the user's wallet.
      </li>
      <li>
        <strong>Emit to Argon.</strong> An ordered event proving the tokens were burned on Ethereum is emitted
        and transferred to the Argon Network.
      </li>
      <li>
        <strong>Finalize on Argon.</strong> Argon verifies the proof and makes
        the corresponding tokens available in the user's Internal App Wallet.
      </li>
    </ol>

    <p>
      The connected Ethereum wallet pays the Ethereum network fee in ETH. No
      Minting Authority is needed for this direction because the Ethereum burn
      can be proven directly on Argon.
    </p>

    <p>
      Learn more about
      <DocLink to="/docs/bridgeless-transfers/from-ethereum-to-argon">Transferring to Argon</DocLink>.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
