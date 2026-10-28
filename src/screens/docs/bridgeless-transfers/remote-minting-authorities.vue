<template>
  <DocHeader>Remote Minting Authorities</DocHeader>

  <DocContent>
    <p>
      Remote Minting Authorities are vault-operated,
      collateral-backed signers that authorize individual transfers from Argon
      to a supported external network. Ethereum is the first supported network.
    </p>

    <p>
      When someone transfers ARGN or ARGNOT to Ethereum, the tokens are first
      removed from spendable circulation on Argon. One or more authorities with
      enough collateral sign the minting request. The Ethereum
      gateway can issue the corresponding tokens only after the request is
      fully backed.
    </p>

    <section
      class="my-9 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-6 text-center"
    >
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
        The Authorization Rule
      </div>
      <div
        class="my-4 font-['Latin_Modern_Math'] text-xl font-semibold text-slate-800 sm:text-2xl"
      >
        Signed authority collateral ≥ transfer amount
      </div>
      <p class="m-0 text-sm text-slate-600">
        A transfer becomes ready for Ethereum when its combined,
        protocol-valued collateral covers the amount being transferred.
      </p>
    </section>

    <h2>What Can a Minting Authority Do?</h2>
    <p>
      Each authority belongs to a specific
      <DocLink to="/docs/assets-and-entities/vaulting-operations"
        >vault operator</DocLink
      >
      and is registered for a specific destination network (i.e., Ethereum). It signs only the
      individual transfer requests that the operator chooses to fund. It cannot
      change the gateway, alter token rules, or issue tokens without a valid
      transfer request and sufficient collateral.
    </p>

    <p>
      This separates local transfer authorization from the
      <DocLink to="/docs/bridgeless-transfers/global-issuance-council"
        >Global Issuance Council</DocLink
      >. The council approves shared gateway changes, including the activation
      and deactivation of authorities, but it does not approve individual user
      transfers.
    </p>

    <h2>Collateral Creates Authority Capacity</h2>
    <p>
      A vault operator creates authority capacity from two forms of capital:
    </p>

    <ul>
      <li>
        <strong>ARGN Securitization</strong> that is active in the operator's vault
        and that has been explicitly made available for minting-authority work.
      </li>
      <li>
        <strong>ARGNOT Securitization</strong> that is active in the operator's vault
        and that has been explicitly made available for minting-authority work.
      </li>
    </ul>

    <p>
      The protocol converts the selected collateral to a common ARGN value and
      requires the authority to meet the configured minimum. Registering it
      encumbers the selected capital, preventing the same capital from being
      withdrawn or assigned to another obligation at the same time.
    </p>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="mb-1 block">Collateral depends on the token</strong>
      <p class="m-0">
        An ARGN transfer uses available bond-backed ARGN before committed
        ARGNOT. An ARGNOT transfer can be backed only by ARGNOT. More than one
        authority can contribute when a single authority cannot cover the full
        request.
      </p>
    </aside>

    <h2>Becoming an Active Minting Authority</h2>
    <p>
      Operations access alone does not create a Minting Authority. The operator
      must have a vault, prepare the vault's relay delegate, and complete the
      authority activation process:
    </p>

    <ol class="list-decimal">
      <li>
        In the Crosschain Transfers dashboard, select Add Authority.
      </li>
      <li>
        Choose how much ARGN or ARGNOT you want to commit to
        establish your authority's capacity.
      </li>
      <li>
        Submit the request. The protocol encumbers the collateral and places
        the activation in the council's ordered approval queue.
      </li>
      <li>
        After the Global Issuance Council reaches approval, the activation is
        relayed to Ethereum. Proven gateway activity changes the authority from
        <strong>Pending Activation</strong> to <strong>Active</strong>.
      </li>
    </ol>

    <h2>Funding Transfer Requests</h2>
    <p>
      New Argon-to-Ethereum requests appear in the Crosschain Transfers
      dashboard. Before funding a request, the operator can review the token, amount,
      destination, required collateral, expiration, and available tip.
    </p>

    <ol class="list-decimal">
      <li>Select one or more available transfer requests.</li>
      <li>
        Review the collateral that will be reserved and the corresponding share
        of each transfer's tip.
      </li>
      <li>
        Select "Fund Selected". Argon Desktop signs the
        authorizations and records the collateral reservations on Argon.
      </li>
      <li>
        When the combined reservations cover the transfer, its status changes
        to ready for Ethereum.
      </li>
    </ol>

    <p>
      Reserved capacity cannot be committed to a second transfer while the
      first request remains unresolved. A request can therefore be partially
      funded by one authority and completed by another.
    </p>

    <h2>Settlement and Tips</h2>
    <p>
      After Ethereum issues the tokens, the resulting gateway activity is
      proven back to Argon. The sender's source-side principal remains in
      Argon's burn account as the backing for the external issuance, so the
      authority collateral used as temporary backing is released from its
      encumbrance.
    </p>

    <p>
      The authority's remaining registered capacity decreases by the amount it
      supplied. If multiple authorities finalized the transfer, the held tip is
      divided according to their collateral contributions. Tips are paid in the
      token that was transferred and only after finalization is proven.
    </p>

    <p>
      If a transfer expires or is canceled before finalization, its collateral
      reservations are released, and the sender's principal and held tip are
      returned. No authorization tip is paid for a canceled transfer.
    </p>

    <h2>Collateral at Risk</h2>
    <p>
      Authority signatures have financial consequences. If proven gateway
      activity shows that an authority's collateral supported issuance without
      a matching Argon transfer, the protocol burns the consumed collateral.
      This makes the authority responsible for protecting its signing key and
      authorizing only requests recorded by Argon.
    </p>

    <p>
      An authority can retire through the same coordinated gateway process used
      for activation. Its deactivation enters the council approval queue, is
      applied on Ethereum, and is then proven back to Argon. Any verified
      remaining collateral is released only after that process completes.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
