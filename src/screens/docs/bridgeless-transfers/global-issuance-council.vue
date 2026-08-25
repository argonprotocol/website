<template>
  <DocHeader>Global Issuance Council</DocHeader>

  <DocContent>
    <p>
      The <strong>Global Issuance Council</strong> is a capital-weighted group of
      vault operators that authorizes shared gateway updates for
      <router-link to="/docs/bridgeless-transfers"
        >Bridgeless Transfers</router-link
      >. Its signatures keep Argon and supported external networks aligned on
      which authorities may underwrite external issuance.
    </p>

    <p>
      Ethereum is the first network coordinated by the council. No member can
      change its gateway alone. A proposed update must move through an ordered
      approval queue and collect enough of the council's combined voting weight
      before Ethereum can accept it.
    </p>

    <section
      class="my-9 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-6 text-center"
    >
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
        The Gateway Approval Rule
      </div>
      <div
        class="my-4 font-['Latin_Modern_Math'] text-xl font-semibold text-slate-800 sm:text-2xl"
      >
        Member signatures + weighted quorum + queue order = valid gateway
        update
      </div>
      <p class="m-0 text-sm text-slate-600">
        A valid set of signatures is not enough by itself. The update must also
        be the next expected item in the gateway's approval sequence.
      </p>
    </section>

    <h2>What the Council Approves</h2>
    <p>
      The council signs three narrowly defined types of shared gateway update:
    </p>

    <ul>
      <li>
        <strong>Minting Authority activation</strong> adds an approved,
        collateral-backed signer to the external gateway.
      </li>
      <li>
        <strong>Minting Authority deactivation</strong> retires a signer and
        resolves its verified remaining collateral.
      </li>
      <li>
        <strong>Council rotation</strong> moves the gateway from one frozen
        council snapshot to the next.
      </li>
    </ul>

    <p>
      The council does not sign individual user transfers. That work belongs to
      <router-link
        to="/docs/bridgeless-transfers/localized-minting-authorities"
        >Localized Minting Authorities</router-link
      >, which select specific Argon-to-Ethereum requests and place collateral
      behind them.
    </p>

    <h2>Council Members and Voting Weight</h2>
    <p>
      Each council member is a vault operator with a registered
      Ethereum-compatible signing key. A council snapshot fixes the member
      accounts, their signing keys, and their voting weights for that snapshot.
      The protocol also records the council's total weight.
    </p>

    <p>
      When a council is formed from vault accounts, each member's weight
      combines:
    </p>

    <ul>
      <li>
        eligible ARGN committed to the operator's
        <router-link to="/docs/assets-and-entities/vaulting-operations"
          >vault</router-link
        >; and
      </li>
      <li>
        committed
        <router-link to="/docs/assets-and-entities/argonot-tokens"
          >ARGNOT</router-link
        >
        converted to an ARGN value using the protocol-defined value recorded
        for that council.
      </li>
    </ul>

    <p>
      Voting power therefore follows committed capital rather than assigning
      one equal vote to each operator. The runtime currently supports as many
      as 100 members in one council snapshot.
    </p>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="mb-1 block">Quorum is measured by weight</strong>
      <p class="m-0">
        An update reaches quorum with at least 90% of the council's total
        weight. It can also reach quorum with at least 80% when no more than two
        council members remain unsigned. The number of signatures is tracked,
        but member count alone does not determine approval.
      </p>
    </aside>

    <h2>Scheduled Council Rotations</h2>
    <p>
      The protocol evaluates the council for rotation every ten frames. A
      scheduled rotation carries forward the existing members and their frozen
      weights, applies any pending signing-key changes, and records the latest
      council-wide ARGNOT conversion value. It does not recalculate every
      member's weight from current capital at each scheduled boundary.
    </p>

    <p>
      When the resulting snapshot differs from the active one, the protocol
      places a council-rotation update into the approval queue. The current
      council must authorize that update before Ethereum begins recognizing the
      next snapshot. A membership change is likewise represented by a
      replacement snapshot that the two networks must reconcile.
    </p>

    <h2>The Ordered Approval Queue</h2>
    <p>
      Every queued update receives a sequence number, a due frame, and an
      approval hash. That hash incorporates the preceding update, forming a
      continuous chain of approved gateway state.
    </p>

    <p>
      Each member maintains its own position in the queue and signs entries in
      order. A member cannot skip an earlier item and approve a later one. This
      prevents different groups from presenting Ethereum with competing or
      reordered versions of the authority set.
    </p>

    <ol>
      <li>
        Argon queues an authority activation, authority deactivation, or council
        rotation.
      </li>
      <li>
        Council members inspect the target and sign its exact approval hash.
      </li>
      <li>
        Argon records each member's signature and adds that member's frozen
        weight to the approved total.
      </li>
      <li>
        After quorum, the update becomes ready to relay to the Ethereum gateway.
      </li>
      <li>
        The gateway applies the update in sequence, and its Ethereum activity is
        proven back to Argon to complete the change.
      </li>
    </ol>

    <h2>Working in Argon Desktop</h2>
    <p>
      Active members see council work in the
      <strong>Global Council Approval Queue</strong> within Crosschain
      Transfers. Each row identifies the type of gateway update, its queue
      position, approval progress, and what it is waiting for.
    </p>

    <p>
      <strong>Approve Updates</strong> opens the Vault Approvals flow, where the
      operator can review the pending targets and record the required council
      signatures. Argon Desktop can combine those approvals with other vault
      actions and submit multiple contiguous signatures together.
    </p>

    <p>
      Once the queue reaches quorum, the dashboard reports that the update is
      ready for Ethereum. Argon Desktop coordinates the relay and exposes
      <strong>Relay Gateway Updates</strong> when direct action is needed. The
      queue remains visible while Ethereum finalizes the update and Argon waits
      for the proof confirming it.
    </p>

    <h2>An Operational Obligation</h2>
    <p>
      Every approval item has a due frame. If a council member has not signed
      its next required item by that deadline, the protocol prevents that
      operator from collecting vault revenue until its approval position is
      current again.
    </p>

    <p>
      A missed signature does not directly burn the member's capital. The
      revenue-collection restriction connects timely council participation to
      the vault activity from which the member's role and weight originate.
    </p>

    <h2>Protecting the Council Signer</h2>
    <p>
      Argon Desktop derives a dedicated Ethereum-compatible key for council
      approvals and registers proof that the vault operator controls it. A
      requested signer replacement remains pending until a council rotation
      makes the new key part of the recognized snapshot.
    </p>

    <p>
      Each signature is bound to a specific gateway update and queue position.
      A single signature reaches quorum only if that member's recorded weight
      satisfies the quorum rule, so council security also depends on how voting
      weight is distributed. Every member remains responsible for protecting
      its signing key and reviewing each target before approval.
    </p>

    <h2>Limits of the Council</h2>
    <p>
      The Global Issuance Council is not a general-purpose governing body. It
      cannot set ARGN's target price, create discretionary monetary policy,
      approve arbitrary issuance, bypass collateral requirements, or replace
      the proofs that synchronize Ethereum activity back to Argon. Its authority
      is limited to the ordered gateway updates defined by the protocol.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
