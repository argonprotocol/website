<template>
  <DocHeader>The Sidechain</DocHeader>

  <DocContent>
    <aside class="my-8 rounded-lg border border-amber-300 bg-amber-50/60 px-5 py-4">
      <strong class="mb-2 block text-lg text-amber-900">Testnet Only</strong>
      <p class="m-0! text-amber-900/80">
        The Sidechain is still on testnet and is not live on mainnet.
      </p>
    </aside>

    <p>
      The Argon Sidechain handles payments through personal account histories
      called <strong>Sidechains</strong>. It allows many payments to be
      processed together while relying on the
      <DocLink to="/docs/assets-and-entities/mainchain">Mainchain</DocLink>
      for final settlement.
    </p>

    <p>
      A Sidechain runs inside a wallet or application and keeps a signed
      history of its account's balance changes. You authorize payments with
      your own keys, while a registered <strong>Notary</strong> checks and
      records the changes. The Sidechain builds on these personal histories
      and Notaries rather than producing a separate set of blockchain blocks.
    </p>

    <h2>What the Sidechain Is For</h2>
    <p>
      The Sidechain is designed for person-to-person payments and applications
      that make frequent, small payments. Batching balance changes reduces the
      need for every payment to occupy its own Mainchain transaction.
    </p>
    <p>
      Applications can also use <strong>channel holds</strong> to set aside
      ARGN for repeated micropayments, such as paying for individual data
      queries. Payments accumulate within the hold, and the resulting amount
      is settled when the channel closes.
    </p>

    <h2>How a Payment Settles</h2>
    <ol>
      <li>
        <strong>Authorize the Payment.</strong> The sender signs a balance
        change, and the recipient signs the corresponding claim. Together,
        these changes describe where the funds came from and where they go.
      </li>
      <li>
        <strong>Notarize the Changes.</strong> The Notary checks signatures,
        available funds, and the previous account history to prevent the same
        balance from being spent twice. Accepted changes are collected into a
        batch called a <strong>Notebook</strong>.
      </li>
      <li>
        <strong>Record the Notebook.</strong> Mainchain nodes audit the
        Notebook, and its header is recorded on the Mainchain. Your Sidechain
        obtains a cryptographic proof linking its updated balance to that
        Notebook.
      </li>
      <li>
        <strong>Finalize Settlement.</strong> Once the Mainchain finalizes the
        block recording the Notebook, the payment is anchored in the network's
        settled history.
      </li>
    </ol>

    <p>
      Notary acceptance and Mainchain finalization are separate steps. A wallet
      can learn that a payment was notarized before its Notebook has been
      recorded and finalized on the Mainchain.
    </p>

    <h2>Moving ARGN Between the Two Chains</h2>
    <p>
      Your Mainchain account and its corresponding Sidechain can use the same
      Argon address, but they maintain separate balances. ARGN held on the
      Mainchain must be transferred into your Sidechain before you can spend
      it through the Sidechain.
    </p>
    <p>
      A transfer into the Sidechain places ARGN in protocol-controlled escrow
      on the Mainchain. Your Sidechain then claims the matching balance
      through its Notary. To move funds back, your Sidechain submits a signed
      transfer that is included in a Notebook; processing that Notebook
      releases the corresponding ARGN to your Mainchain account.
    </p>
    <p>
      These transfers move existing ARGN between the two layers. They do not
      create an additional currency or duplicate your balance. Allow the
      transfer and its settlement steps to complete before relying on the
      destination balance.
    </p>

    <h2>Transaction Taxes and Availability</h2>
    <p>
      Sidechain payments incur protocol-defined transaction taxes. These taxes
      are burned from the Mainchain escrow when the corresponding Notebook is
      processed, reducing Argon's circulating supply as the payments network
      is used. See
      <DocLink to="/docs/system-design/stabilization-algorithms">Stabilization Algorithms</DocLink>.
    </p>
    <p>
      Payment processing depends on your Notary being available and submitting
      Notebooks, as well as the Mainchain continuing to produce and finalize
      blocks. Your wallet or application must stay synchronized to collect
      balance proofs and track settlement.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocLink from "@/screens/docs/DocLink.vue";
</script>
