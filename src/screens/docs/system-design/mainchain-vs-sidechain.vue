<template>
  <DocHeader>Mainchain vs Sidechain</DocHeader>

  <DocContent>
    <p>
      Argon's Mainchain and Sidechain work together. The Mainchain maintains
      the shared record of the Argon economy and enforces its protocol rules.
      The Sidechain supports payments through personal account histories,
      grouping many payments into a shared settlement process on the Mainchain.
    </p>

    <h2 id="at-a-glance">At a Glance</h2>

    <div class="my-8 overflow-x-auto rounded-lg border border-slate-300">
      <table class="m-0! w-full min-w-[36rem] border-collapse font-sans! text-left">
        <caption class="sr-only">Comparison of Argon's Mainchain and Sidechain</caption>
        <thead class="bg-slate-100/70">
          <tr>
            <th scope="col" class="px-4 py-3 text-left!">Aspect</th>
            <th scope="col" class="px-4 py-3 text-left!">Mainchain</th>
            <th scope="col" class="px-4 py-3 text-left!">Sidechain</th>
          </tr>
        </thead>
        <tbody class="align-top">
          <tr class="border-t border-slate-300">
            <th scope="row" class="px-4 py-3 text-left!">Purpose</th>
            <td class="px-4 py-3 text-left!">Shared economic records, asset rules, and network settlement.</td>
            <td class="px-4 py-3 text-left!">Person-to-person payments and frequent, small payments.</td>
          </tr>
          <tr class="border-t border-slate-300">
            <th scope="row" class="px-4 py-3 text-left!">Balances</th>
            <td class="px-4 py-3 text-left!">Records Mainchain ARGN and ARGNOT balances and Treasury positions.</td>
            <td class="px-4 py-3 text-left!">Maintains a separate ARGN balance backed by Mainchain escrow.</td>
          </tr>
          <tr class="border-t border-slate-300">
            <th scope="row" class="px-4 py-3 text-left!">Processing</th>
            <td class="px-4 py-3 text-left!">Miners produce blocks containing transactions and network updates.</td>
            <td class="px-4 py-3 text-left!">Notaries validate signed balance changes and collect them into Notebooks.</td>
          </tr>
          <tr class="border-t border-slate-300">
            <th scope="row" class="px-4 py-3 text-left!">Final Settlement</th>
            <td class="px-4 py-3 text-left!">The network finalizes the block containing the transaction's result.</td>
            <td class="px-4 py-3 text-left!">The Mainchain finalizes the block recording the payment's Notebook.</td>
          </tr>
          <tr class="border-t border-slate-300">
            <th scope="row" class="px-4 py-3 text-left!">Fees and Taxes</th>
            <td class="px-4 py-3 text-left!">Mainchain transaction fees are paid in ARGN.</td>
            <td class="px-4 py-3 text-left!">Transaction taxes are burned from Mainchain escrow when the Notebook is processed.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="the-mainchain">The Mainchain</h2>

    <p>
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

    <h3>What the Mainchain Handles</h3>
    <ul>
      <li>
        <strong>Balances and Transfers.</strong> It tracks mainchain ARGN and
        ARGNOT balances, processes transfers between accounts, and collects
        network transaction fees.
      </li>
      <li>
        <strong>Treasury Positions.</strong> It records
        <DocLink to="/docs/asset-rules/argon-bonds">Argon Bonds</DocLink>,
        <DocLink to="/docs/asset-rules/argonot-stakes">Argonot Stakes</DocLink>,
        and
        <DocLink to="/docs/asset-rules/bitcoin-liquids">Bitcoin Liquids</DocLink>,
        enforcing their capital requirements, revenue distributions, and
        release conditions.
      </li>
      <li>
        <strong>Network Operations.</strong> It manages mining-seat auctions,
        vault registrations, operating collateral, and protocol rewards. These
        are the shared rules behind
        <DocLink to="/docs/network-rules/mining-operations">mining</DocLink>
        and
        <DocLink to="/docs/network-rules/vaulting-operations">vaulting</DocLink>
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
      <DocLink to="/docs/asset-rules/bitcoin-locks">Bitcoin Locks</DocLink>
      and the Argon positions associated with them, while Bitcoin transactions
      follow Bitcoin's own confirmation process.
    </p>

    <h3>From Submission to Final Settlement</h3>
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

    <h2 id="the-sidechain">The Sidechain</h2>

    <aside class="my-8 rounded-lg border border-amber-300 bg-amber-50/60 px-5 py-4">
      <strong class="mb-2 block text-lg text-amber-900">Testnet Only</strong>
      <p class="m-0! text-amber-900/80">
        The Sidechain is still on testnet and is not live on mainnet.
      </p>
    </aside>

    <p>
      The Argon Sidechain handles payments through personal account histories
      called <strong>Sidechains</strong>. It allows many payments to be
      processed together while relying on the Mainchain for final settlement.
    </p>

    <p>
      A Sidechain runs inside a wallet or application and keeps a signed
      history of its account's balance changes. You authorize payments with
      your own keys, while a registered <strong>Notary</strong> checks and
      records the changes. The Sidechain builds on these personal histories
      and Notaries rather than producing a separate set of blockchain blocks.
    </p>

    <h3>What the Sidechain Is For</h3>
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

    <h3>Transaction Taxes and Availability</h3>
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

    <h2 id="how-they-work-together">How They Work Together</h2>

    <h3>Settling Sidechain Payments</h3>
    <p>
      Notaries collect signed balance changes into batches called Notebooks.
      Mainchain nodes audit the Notebooks, and the chain records commitments
      that allow users to prove their balances. Many payments can share this
      settlement process:
    </p>
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

    <h3>Moving ARGN Between the Two Chains</h3>
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
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocLink from "@/screens/docs/DocLink.vue";
</script>
