<template>
  <DocHeader>Localized Minting Authorities</DocHeader>

  <DocContent>
    <p>
      A <strong>Localized Minting Authority</strong> is a vault-operated,
      collateral-backed signer that authorizes individual transfers from Argon
      to a supported external network. Ethereum is the first supported network.
      Argon Desktop shortens the role's name to
      <strong>Minting Authority</strong>.
    </p>

    <p>
      When someone transfers ARGN or ARGNOT to Ethereum, the tokens are first
      removed from spendable circulation on Argon. One or more authorities then
      reserve enough collateral and sign the transfer request. The Ethereum
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

    <h2>Why the Authority Is Localized</h2>
    <p>
      Each authority belongs to a specific
      <DocLink to="/docs/assets-and-entities/vaulting-operations"
        >vault operator</DocLink
      >
      and is registered for a specific destination network. It signs only the
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
        <strong>Bond-backed ARGN</strong> associated with active
        <DocLink to="/docs/assets-and-entities/argon-bonds"
          >Argon Bonds</DocLink
        >
        in the operator's vault account.
      </li>
      <li>
        <strong>Committed ARGNOT</strong> that the operator has explicitly made
        available for minting-authority work. See
        <DocLink to="/docs/assets-and-entities/argonot-tokens"
          >Argonot Tokens</DocLink
        >.
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

    <h2>Becoming an Active Authority</h2>
    <p>
      Operations access alone does not create a Minting Authority. The operator
      must have a vault, prepare the vault's relay delegate, and complete the
      authority activation process:
    </p>

    <ol>
      <li>
        In the Crosschain Transfers dashboard, select
        <strong>Add Authority</strong>.
      </li>
      <li>
        Choose the bond-backed ARGN, committed ARGNOT, or combination that will
        establish the authority's capacity. Argon Desktop generates a new
        Ethereum signing key for the authority.
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

    <p>
      The protocol also holds an estimated activation-relay reimbursement in
      ARGN. When the activation is proven, the relayer receives the applicable
      amount and any unused portion is returned to the operator.
    </p>

    <h2>Funding Transfer Requests</h2>
    <p>
      New Argon-to-Ethereum requests appear in the Crosschain Transfers
      dashboard. Before funding one, the operator can review the token, amount,
      destination, required collateral, expiration, and available tip.
    </p>

    <ol>
      <li>Select one or more available transfer requests.</li>
      <li>
        Review the collateral that will be reserved and the corresponding share
        of each transfer's tip.
      </li>
      <li>
        Select <strong>Fund Selected</strong>. Argon Desktop signs the
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

    <p>
      For the complete user-transfer lifecycle, return to
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
