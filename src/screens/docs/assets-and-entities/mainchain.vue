<template>
  <DocHeader>The Mainchain</DocHeader>

  <DocContent>
    <p>
      The Argon Mainchain maintains the shared record of the Argon economy.
      <DocLink to="/docs/desktop-app">Argon Desktop</DocLink>
      gives you an interface for managing assets and participating in the
      network; the Mainchain enforces the rules and finalizes the resulting
      transactions.
    </p>

    <p>
      When you send tokens, open a Treasury position, or bid for a mining seat,
      your wallet signs a transaction describing what you want to do. The
      Mainchain checks that request against your available balance and the
      protocol's rules, then records successful changes in its blocks.
    </p>

    <h2>What the Mainchain Handles</h2>
    <ul>
      <li>
        <strong>Balances and Transfers.</strong> It tracks mainchain ARGN and
        ARGNOT balances, processes transfers between accounts, and collects
        network transaction fees.
      </li>
      <li>
        <strong>Treasury Positions.</strong> It records
        <DocLink to="/docs/assets-and-entities/argon-bonds">Argon Bonds</DocLink>,
        <DocLink to="/docs/assets-and-entities/argonot-stakes">Argonot Stakes</DocLink>,
        and
        <DocLink to="/docs/assets-and-entities/bitcoin-liquids">Bitcoin Liquids</DocLink>,
        enforcing their capital requirements, revenue distributions, and
        release conditions.
      </li>
      <li>
        <strong>Network Operations.</strong> It manages mining-seat auctions,
        vault registrations, operating collateral, and protocol rewards. These
        are the shared rules behind
        <DocLink to="/docs/assets-and-entities/mining-operations">mining</DocLink>
        and
        <DocLink to="/docs/assets-and-entities/vaulting-operations">vaulting</DocLink>
        operations.
      </li>
      <li>
        <strong>Issuance and Stabilization.</strong> It applies the protocol's
        issuance and burning rules using accepted price data and the
        inflation-adjusted target. See
        <DocLink to="/docs/system-design/stabilization-algorithms">Stabilization Algorithms</DocLink>.
      </li>
    </ul>

    <p>
      Bitcoin itself remains on the Bitcoin network. The Mainchain records
      <DocLink to="/docs/assets-and-entities/bitcoin-locks">Bitcoin Locks</DocLink>
      and the Argon positions associated with them, while Bitcoin transactions
      follow Bitcoin's own confirmation process.
    </p>

    <h2>From Submission to Final Settlement</h2>
    <p>
      Miners produce blocks containing transactions and other network updates.
      The active mining authorities also participate in finalization, agreeing
      on which blocks form the network's settled history. A transaction passes
      through three distinct stages:
    </p>
    <ol>
      <li>
        <strong>Submitted.</strong> Your signed request has been sent to the
        network and is waiting to be processed.
      </li>
      <li>
        <strong>Included.</strong> A block contains the transaction and its
        result. Check that it succeeded; inclusion alone does not mean the
        requested action was accepted.
      </li>
      <li>
        <strong>Finalized.</strong> The network has finalized the block,
        establishing the transaction's result in its settled history.
      </li>
    </ol>

    <p>
      An action shown as pending in your wallet may still be waiting for block
      inclusion or finalization. Mainchain transaction fees are paid in ARGN;
      keep enough spendable ARGN available for the actions you intend to take.
    </p>

    <h2>How It Supports the Sidechain</h2>
    <p>
      The
      <DocLink to="/docs/assets-and-entities/sidechain">Sidechain</DocLink>
      handles payments through personal Sidechains. Notaries collect their
      signed balance changes into batches called Notebooks. Mainchain nodes
      audit these Notebooks, and the chain records commitments that allow users
      to prove their balances.
    </p>
    <p>
      This lets many payments share a settlement process. Their final
      settlement depends on the Mainchain finalizing the block that records
      their Notebook. The Mainchain also processes transfers of ARGN into and
      out of the Sidechain.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocLink from "@/screens/docs/DocLink.vue";
</script>
