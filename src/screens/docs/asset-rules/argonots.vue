<template>
  <DocHeader>Argonot Tokens</DocHeader>

  <DocContent>
    <p>
      Argonot (ARGNOT) is the network’s ownership and operating-capital token.
      It works alongside
      <DocLink to="/docs/asset-rules/argons">Argon stablecoins</DocLink>
      and <DocLink to="/docs/asset-rules/bitcoins">Bitcoin</DocLink>.
      It is a native token used to capitalize and participate in the Argon
      network. It is separate from the
      <DocLink to="/docs/asset-rules/argons"
        >ARGN stablecoin</DocLink
      >, has no target price, and can rise or fall in market value. Each ARGNOT
      can be divided into one million micronots.
    </p>

    <p>
      The protocol classifies ARGNOT as its <strong>ownership token</strong>
      because it connects ownership of the asset to specific forms of network
      participation. Miners use it to qualify for mining seats, vault operators
      commit it as operational collateral, and holders can put it into
      yield-bearing Argonot Stakes.
    </p>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="block mb-1">What "Ownership" Does Not Mean</strong>
      <p class="m-0">
        ARGNOT does not represent shares in a company or create an automatic
        claim on network revenue. Holding
        ARGNOT and putting ARGNOT to work are separate actions.
      </p>
    </aside>

    <h2>What Argonots Are Used For</h2>
    <ul>
      <li>
        <strong>Mining Bid Support.</strong>
        A mining operator must commit the required amount of ARGNOT before bidding
        for a
        <DocLink to="/docs/network-rules/mining-operations"
          >mining seat</DocLink
        >. The bid itself is made in ARGN; the ARGNOT is separate collateral that
        the protocol places on hold while it is needed for bidding or an active
        seat.

        The requirement is not permanently fixed. For each new group of mining
        seats, the protocol derives an ARGNOT requirement from recent winning bids
        and ARGNOT's market price. This keeps the required collateral tied to the
        economic value of the seats being awarded.
      </li>
      <li>
        <strong>Vault Securitization.</strong>
        <DocLink to="/docs/network-rules/vaulting-operations"
        >Vault operators</DocLink
        >
        can commit ARGNOT as additional securitization capital. Once Bitcoin is
        locked, this capital can increase the vault's eligible mining-bid revenue
        and provide a bonus that grows with Bitcoin utilization.
      </li>
      <li>
        <strong>Argonot Stakes.</strong>
        A holder can commit ARGNOT to an
        <DocLink to="/docs/asset-rules/argonot-stakes"
          >Argonot Stake</DocLink
        >. Active stakes receive a proportional share of the ARGN revenue that the
        protocol allocates from mining auctions. Simply holding liquid ARGNOT does
        not produce these earnings; the holder must create a stake position.
      </li>
      <li>
        <strong>Crosschain Collateral.</strong>
        ARGNOT can also be committed as collateral for a
        <DocLink to="/docs/bridgeless-transfers/remote-minting-authorities"
          >Remote Minting Authority</DocLink
        >. The protocol holds the committed tokens and can assign part of them to
        active crosschain obligations. Collateral assigned to an obligation cannot
        be released until that obligation is resolved, and it can be burned if the
        authority fails to fulfill its responsibility.
      </li>
    </ul>

    <h2>Issuance and Supply</h2>
    <p>
      New ARGNOT enters circulation through mining rewards. Its issuance follows
      a protocol-defined schedule and does not expand or contract in response to
      ARGN's target price. See
      <DocLink to="/docs/system-design/argonot-tokenomics"
        >Argonot Tokenomics</DocLink
      >
      for the reward schedule and supply rules.
    </p>

    <h2>Holding and Transferring Argonots</h2>
    <p>
      Liquid ARGNOT can be transferred between accounts or moved to a supported
      external network through Argon's minting-authority system. A crosschain
      transfer changes where the tokens are represented; it does not create an
      independent supply. As with ARGN, holders remain responsible for their own
      keys and transaction approvals.
    </p>

    <h2>How Commitment Changes Availability</h2>
    <p>
      ARGNOT remains visible in its owner's account while it is committed, but
      its availability depends on how the protocol is using it.
    </p>

    <section class="my-8 grid gap-3 md:grid-cols-3">
      <div class="rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="text-sm font-bold tracking-wide text-slate-500 uppercase">
          Spendable
        </div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          The ARGNOT can be transferred, traded or committed to a supported network
          activity.
        </p>
      </div>
      <div class="rounded-lg border border-argon-200 bg-argon-50/40 p-5">
        <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
          Committed
        </div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          These include Argonots in a Stake position, attached to a Mining Bid, or in a Vault's securitization. They cannot be
          used until the position completes its release period.
        </p>
      </div>
      <div class="rounded-lg border border-amber-300 bg-amber-50/50 p-5">
        <div class="text-sm font-bold tracking-wide text-amber-800 uppercase">
          Encumbered
        </div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          At the moment, only Minting Authorities hold Argonots that
          are at risk. They can be burned if the protocol's rules are not followed.
        </p>
      </div>
    </section>

    <p>
      These are availability conditions, not a lifecycle every Argonot follows.
      For example, ARGNOT held in a stake does not become minting-authority
      collateral. The rules of the activity determine when a hold ends and
      whether any capital is at risk.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
