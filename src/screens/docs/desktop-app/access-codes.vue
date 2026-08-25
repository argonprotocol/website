<template>
  <DocHeader>Access and Upgrades</DocHeader>

  <DocContent>
    <p>
      Argon Desktop has three levels of participation: Basic, Treasury, and
      Operations. Each level adds capabilities without transferring custody of
      the user's account. Basic is available to everyone; Treasury begins with
      an invitation; and Operations requires certification plus approval from a
      sponsoring operator.
    </p>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="mb-1 block">Access does not grant wallet authority</strong>
      <p class="m-0">
        An access code changes which services Argon Desktop can connect to. It
        does not reveal a recovery phrase, authorize a transaction, or give the
        sponsoring operator control over the user's assets.
      </p>
    </aside>

    <h2>Basic</h2>
    <p>
      Anyone can create or import a self-custodial account and use Argon
      Desktop's
      <router-link to="/docs/desktop-app/basic-functionality"
        >Basic functionality</router-link
      >
      without an invitation. This includes viewing balances and managing normal
      wallet transactions.
    </p>

    <p>
      A Basic user is not connected to a sponsoring operator and does not yet
      have access to the operator-supported Treasury or Operations services.
    </p>

    <h2>Treasury</h2>
    <p>
      A network operator can create a one-use Treasury access code for a new
      member. The code contains the information Argon Desktop needs to contact
      the operator's server, preview the invitation, and establish an
      authenticated connection when the member accepts it.
    </p>

    <p>
      The inviting operator becomes the member's sponsor, and the operator's
      server becomes the member's
      <router-link to="/docs/assets-and-entities/upstream-nodes"
        >Upstream Node</router-link
      >. The invitation also identifies the sponsor's vault and any optional
      Bitcoin Lock fee waiver included with the invitation.
    </p>

    <p>
      Accepting the code unlocks the
      <router-link to="/docs/desktop-app/treasury">Treasury level</router-link>
      of the app. It does not automatically commit assets or begin
      <router-link to="/docs/desktop-app/treasury-certification"
        >Treasury Certification</router-link
      >. The member chooses each Treasury action separately.
    </p>

    <h2>Operations</h2>
    <p>
      Operations is not unlocked by entering a second invitation code. After
      completing Treasury Certification, the member sends an Operations upgrade
      request to their sponsor. The sponsor reviews the request and decides
      whether to approve it.
    </p>

    <p>
      Approval requires the sponsor to have an available Operations upgrade
      code. The sponsor's server signs an access proof for the member's exact
      Operational Account, and the protocol consumes one of the sponsor's
      available codes when that account is registered. The proof cannot be
      reused for another account.
    </p>

    <p>
      Registration links the new operator's operational, vault, and mining
      accounts and records the sponsoring operator as its upstream operator. The
      new operator can then set up the infrastructure needed to complete
      <router-link to="/docs/desktop-app/operations-certification"
        >Operator Certification</router-link
      >.
    </p>

    <h2>Two Kinds of Code</h2>
    <p>
      Argon Desktop uses similar language for two different forms of access.
      Keeping them separate explains why an operator can invite a Treasury
      member before having an Operations upgrade code available.
    </p>

    <section
      class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40"
    >
      <div class="border-b border-slate-300 px-5 py-5">
        <strong class="block text-lg text-slate-800"
          >Treasury access code</strong
        >
        <p class="mb-0 mt-2 text-slate-600">
          A one-use invitation created by the operator's server. It connects a
          member to the sponsor and unlocks Treasury services. Creating or
          accepting it does not consume a protocol Operations upgrade code.
        </p>
      </div>
      <div class="px-5 py-5">
        <strong class="block text-lg text-slate-800"
          >Operations upgrade code</strong
        >
        <p class="mb-0 mt-2 text-slate-600">
          Protocol-tracked approval capacity belonging to a certified operator.
          One code is consumed when an approved downstream Operational Account
          registers.
        </p>
      </div>
    </section>

    <h2>How Operators Earn Upgrade Codes</h2>
    <p>
      Operator Certification provides the first Operations upgrade code. After
      that, the protocol currently makes additional codes available through
      three forms of continued participation:
    </p>

    <ul>
      <li>
        Each sponsored downstream operator who completes Operator Certification.
      </li>
      <li>
        Each additional 5,000 ARGN of Bitcoin value secured through the
        operator's vault.
      </li>
      <li>Each additional five mining seats earned by the operator.</li>
    </ul>

    <p>
      An operator can currently have no more than three upgrade codes ready at
      one time. Participation that qualifies for another code is tracked so the
      code can become available when capacity opens. These settings are protocol
      parameters and can change.
    </p>

    <h2>The Upgrade Decision</h2>
    <p>
      Completing Treasury Certification makes a member eligible to request an
      upgrade; it does not compel the sponsor to approve the request. The
      sponsor is deciding whether to spend limited upgrade capacity and create a
      continuing onchain sponsorship relationship with the new operator.
    </p>

    <p>
      Approval does not make the sponsor responsible for the downstream
      operator's mining, vault, keys, capital, or returns. Each operator remains
      responsible for its own accounts and infrastructure.
    </p>

    <h2>Upgrade Sequence</h2>
    <ol>
      <li>An operator sends a one-use Treasury access code.</li>
      <li>
        The member accepts it and connects to the operator's Upstream Node.
      </li>
      <li>The member completes Treasury Certification.</li>
      <li>The member requests an Operations upgrade.</li>
      <li>
        The sponsor approves the request using an available Operations upgrade
        code.
      </li>
      <li>
        The new Operational Account registers with the signed access proof.
      </li>
      <li>The new operator completes Operator Certification.</li>
    </ol>

    <p>
      Certification and sponsorship rewards are earned only at the final
      certification event—not when an invitation is created, accepted, or
      approved. See
      <router-link to="/docs/assets-and-entities/operational-rewards-pool"
        >Operational Rewards Pool</router-link
      >
      for the current reward rules.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
