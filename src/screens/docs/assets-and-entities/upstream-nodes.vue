<template>
  <DocHeader>Upstream Nodes</DocHeader>

  <DocContent>
    <p>
      An Upstream Node is the operator-run server that connects an invited
      member to Argon's advanced services. It provides an authenticated network
      connection, coordinates member-specific services, and connects the member
      with the operator who sponsored their access.
    </p>

    <p>
      The server is the <strong>Upstream Node</strong>. The person or account
      responsible for it is the <strong>upstream operator</strong>, also called
      the member's sponsor. The two terms describe different parts of the same
      relationship.
    </p>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="mb-1 block"
        >Upstream does not mean higher authority</strong
      >
      <p class="m-0">
        An upstream operator is not a superior miner, a network administrator,
        or a custodian of the member's wallet. The term describes the direction
        of the member's server connection and, if the member later becomes an
        operator, the sponsorship recorded during registration.
      </p>
    </aside>

    <h2>How the Relationship Begins</h2>
    <p>
      Basic wallet functions do not require an Upstream Node. The relationship
      begins when a user accepts a Treasury access code created by an existing
      operator. The code identifies the operator's server and contains the
      one-use invitation needed to establish an authenticated member session.
    </p>

    <p>
      Accepting the invitation connects Argon Desktop to that server and records
      the sponsor in the app. It does not create an Operational Account, assign
      the sponsor control over the wallet, or record an upstream operator in the
      protocol.
    </p>

    <section
      class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40"
    >
      <header
        class="border-b border-slate-300 bg-slate-100/70 px-5 py-3 text-sm font-bold tracking-wide text-slate-600 uppercase"
      >
        Two Related Connections
      </header>
      <dl class="m-0">
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-48 md:shrink-0">
            Treasury connection
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Begins when the member accepts the sponsor's access code. It is a
            private connection between Argon Desktop and the operator's server.
          </dd>
        </div>
        <div class="px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-48 md:shrink-0">
            Operations sponsorship
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Begins only after the member completes Treasury Certification, the
            sponsor approves an Operations upgrade, and the new Operational
            Account is registered with the sponsor's signed access proof.
          </dd>
        </div>
      </dl>
    </section>

    <p>
      See
      <DocLink to="/docs/desktop-app/access-codes"
        >Access and Upgrades</DocLink
      >
      for the complete path from Basic to Treasury and Operations.
    </p>

    <h2>What an Upstream Node Provides</h2>
    <p>
      An operator's server combines several services behind one authenticated
      connection. Depending on the member's access and the operator's setup, it
      can provide:
    </p>

    <ul>
      <li>
        A protected connection to the operator's Argon node instead of exposing
        the node's unrestricted administrative interface.
      </li>
      <li>
        The invitation and member records used by Argon Desktop to maintain the
        sponsor relationship.
      </li>
      <li>
        Access to the sponsor's Stabilization Vault for
        <DocLink to="/docs/assets-and-entities/bitcoin-locks"
          >Bitcoin Locks</DocLink
        >
        and
        <DocLink to="/docs/assets-and-entities/argon-bonds"
          >Argon Bonds</DocLink
        >.
      </li>
      <li>
        An optional waiver for eligible Bitcoin Lock fees, subject to the amount
        and expiration selected by the sponsor.
      </li>
      <li>
        Certification progress, Operations upgrade requests, and the signed
        proof required if the sponsor approves the upgrade.
      </li>
      <li>
        Coordination for other invitation-specific network services supported by
        Argon Desktop.
      </li>
    </ul>

    <h2>The Sponsor's Vault</h2>
    <p>
      A Treasury invitation identifies the vault through which the sponsor is
      prepared to serve the member. That vault can cosign and optionally provide
      insurance for Bitcoin Locks, and its eligible Bitcoin value can create
      capacity for member Argon Bonds.
    </p>

    <p>
      The member still approves each transaction and chooses whether to commit
      any assets. Accepting an invitation does not create a Bitcoin Lock,
      purchase an Argon Bond, create a Bitcoin Liquid, or promise funds to the
      sponsor's vault.
    </p>

    <h2>Information and Authority Boundaries</h2>
    <p>
      Sponsorship requires enough shared information to authenticate the member
      and coordinate access. It does not turn a self-custodial wallet into an
      operator-controlled account.
    </p>

    <section
      class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40"
    >
      <div class="border-b border-slate-300 px-5 py-5">
        <strong class="block text-lg text-slate-800">The upstream can</strong>
        <p class="mb-0 mt-2 text-slate-600">
          Associate the invitation with the member's public account, maintain
          the authenticated server session, view public onchain activity used
          for certification, manage an offered fee waiver, receive an Operations
          upgrade request, and decide whether to approve it.
        </p>
      </div>
      <div class="px-5 py-5">
        <strong class="block text-lg text-slate-800"
          >The upstream cannot</strong
        >
        <p class="mb-0 mt-2 text-slate-600">
          Obtain the member's recovery phrase or private transaction keys, sign
          wallet transactions, move the member's assets, or complete
          certification activities on the member's behalf.
        </p>
      </div>
    </section>

    <p>
      Argon Desktop authenticates to the server with a separate derived account
      so the wallet's transaction keys do not need to be shared with the
      operator. Public account addresses and public onchain activity are not
      private, even though the wallet keys controlling them remain private.
    </p>

    <h2>Availability and Recovery</h2>
    <p>
      Upstream services depend on the operator's server being reachable. If it
      is temporarily unavailable, invitation-specific services and the private
      upstream connection may also be unavailable. Assets already recorded on
      Argon or Bitcoin remain controlled by their existing keys and protocol
      rules; the outage does not transfer them to the sponsor.
    </p>

    <p>
      Argon Desktop keeps protected recovery information that can help it find
      the upstream service if the operator changes the server's address. Members
      and operators should still maintain their own backups. If both sides lose
      the information that identifies the relationship, some server-managed
      member services may have to be re-established.
    </p>

    <h2>Using Argon Desktop</h2>
    <p>
      Members can open <strong>Sponsor Details</strong> to review the upstream
      operator's name, public account, server, connection type, and any current
      Bitcoin Lock fee waiver. Operators manage their side of the relationship
      from Member Onboarding, where they can create invitations, view
      certification progress, respond to Operations upgrade requests, and track
      sponsored operators.
    </p>

    <p>
      A sponsor may earn an upgrade code or an operational reward when a
      downstream member becomes a certified operator. Those events are defined
      by the protocol, not by the server connection itself. See
      <DocLink to="/docs/assets-and-entities/operational-rewards-pool"
        >Expansion Rewards Pool</DocLink
      >
      for the economic rules.
    </p>

    <aside
      class="my-8 rounded-lg border border-amber-300 bg-amber-50/60 px-5 py-4"
    >
      <strong class="mb-2 block text-lg text-amber-900"
        >Choose a Sponsor Carefully</strong
      >
      <p class="m-0! text-amber-900/80">
        The sponsor cannot take custody of your wallet, but the quality and
        availability of their server and vault can affect your experience.
        Review any fees, waivers, vault terms, and operational expectations
        before accepting an access code.
      </p>
    </aside>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
