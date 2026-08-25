<template>
  <DocHeader>Argonot Stakes</DocHeader>

  <DocContent>
    <p>
      Argonot Stakes are onchain, yield-bearing positions that supply
      <router-link to="/docs/assets-and-entities/argonot-tokens"
        >ARGNOT</router-link
      >
      capital to mining operations. Each Stake is created by committing one
      ARGNOT through a miner, with the ARGNOT held by the protocol until the
      position is released.
    </p>

    <p>
      Creating one or more Stakes records a <strong>stake position</strong> with
      its own principal, earnings history, miner association, and release
      status. Creating more Stakes later produces another position rather than
      adding them to the first one.
    </p>

    <section
      class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40"
    >
      <header
        class="border-b border-slate-300 bg-slate-100/70 px-5 py-3 text-sm font-bold tracking-wide text-slate-600 uppercase"
      >
        Stake Rules
      </header>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4">
        <div class="border-b border-slate-300 p-5 sm:border-r lg:border-b-0">
          <div class="text-2xl font-bold text-argon-600">1 ARGNOT</div>
          <div class="mt-1 text-sm text-slate-600">
            Creates one Argonot Stake
          </div>
        </div>
        <div class="border-b border-slate-300 p-5 lg:border-r lg:border-b-0">
          <div class="text-2xl font-bold text-argon-600">Whole units</div>
          <div class="mt-1 text-sm text-slate-600">
            Fractional Stakes are not supported
          </div>
        </div>
        <div class="border-b border-slate-300 p-5 sm:border-r sm:border-b-0">
          <div class="text-2xl font-bold text-argon-600">100 Stakes</div>
          <div class="mt-1 text-sm text-slate-600">Minimum position size</div>
        </div>
        <div class="p-5">
          <div class="text-2xl font-bold text-argon-600">Onchain hold</div>
          <div class="mt-1 text-sm text-slate-600">
            Principal remains under protocol control
          </div>
        </div>
      </div>
    </section>

    <h2>Why Miners Use Stakes</h2>
    <p>
      Every
      <router-link to="/docs/assets-and-entities/mining-operations"
        >mining seat</router-link
      >
      requires ARGNOT collateral in addition to an ARGN bid. Argonot Stakes let
      holders supply this operating capital through a miner rather than
      requiring the miner to provide all of it independently.
    </p>

    <p>
      This creates a relationship similar to the one between
      <router-link to="/docs/assets-and-entities/argon-bonds"
        >Argon Bonds</router-link
      >
      and Stabilization Vaults: Bonds supply ARGN capital through a vault, while
      Stakes supply ARGNOT capital through a miner. In both cases, the protocol
      holds the position's principal instead of transferring it into the
      operator's custody.
    </p>

    <h2>Where Stake Earnings Come From</h2>
    <p>
      Mining operators compete for seats by bidding ARGN. At the end of each
      frame, the protocol allocates 10% of the full mining-bid pool to active
      Argonot Stakes.
    </p>

    <section
      class="my-8 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-5"
    >
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
        Stake Revenue
      </div>
      <div
        class="my-4 overflow-x-auto rounded-md border border-argon-200 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-xl text-slate-800 sm:text-2xl"
      >
        Mining-bid revenue × 10% = Revenue for active Stakes
      </div>
      <p class="m-0 text-sm text-slate-600">
        The amount changes from frame to frame because mining bids and the
        amount of participating stake capital both change.
      </p>
    </section>

    <p>
      Each active position receives a proportional share based on its number of
      Stakes relative to the participating total. The miner association
      identifies the mining operation the position supports; it does not give
      the miner custody of the committed ARGNOT.
    </p>

    <p>
      Earnings are paid in ARGN after each participating frame. They are sent to
      the position owner and do not increase the ARGNOT principal or compound
      automatically.
    </p>

    <h2>System-Wide Stake Capacity</h2>
    <p>
      The protocol limits how much of the ARGNOT supply can participate in
      Stakes at once. New positions cannot increase the active total beyond 40%
      of all issued ARGNOT.
    </p>

    <section
      class="my-8 rounded-lg border border-slate-300 bg-white/40 px-5 py-5"
    >
      <div class="text-sm font-bold tracking-wide text-slate-600 uppercase">
        Active-Stake Limit
      </div>
      <div
        class="my-4 overflow-x-auto rounded-md border border-slate-300 bg-slate-50/70 px-4 py-5 text-center font-['Latin_Modern_Math'] text-xl text-slate-800 sm:text-2xl"
      >
        Active Stakes ≤ 40% of circulating ARGNOT
      </div>
      <p class="m-0 text-sm text-slate-600">
        Capacity grows as new ARGNOT enters circulation and becomes available
        again when existing positions begin releasing.
      </p>
    </section>

    <h2>The Life of a Stake Position</h2>
    <p>Every position follows the same protocol-defined lifecycle.</p>

    <ol class="my-8 ml-0! grid list-none gap-3 p-0 md:grid-cols-2">
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >1</span
          >
          <strong class="text-lg">Create</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Select a miner, choose the number of Stakes, and submit the position.
          The protocol places the committed ARGNOT on hold.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >2</span
          >
          <strong class="text-lg">Participate</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          The position begins earning after its first full frame and continues
          automatically from one frame to the next.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >3</span
          >
          <strong class="text-lg">Release</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Releasing removes the position from future participation. It still
          receives the distribution for a frame in which it was already active.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >4</span
          >
          <strong class="text-lg">Return</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Stakes take ten frames to fully release. The original ARGNOT becomes
          spendable in the owner's wallet when the release period ends.
        </p>
      </li>
    </ol>

    <aside
      class="my-8 rounded-lg border border-amber-300 bg-amber-50/60 px-5 py-4"
    >
      <strong class="block mb-2 text-lg text-amber-900"
        >Automatic Release Rule</strong
      >
      <p class="m-0! text-amber-900/80">
        The active set accepts up to <strong>1,000 stake positions</strong>.
        Once full, a new position must be larger than the smallest active
        position. If it is, the new position displaces the smallest one and
        automatically starts its release.
      </p>
    </aside>

    <h2>Principal Is Held by the Protocol</h2>
    <p>
      The miner associated with a Stake never receives direct control of its
      ARGNOT principal. The protocol applies the capital to the stake position,
      records its participation, and enforces its release. This prevents the
      miner from taking the principal or defaulting on its return.
    </p>
    <p>
      This protection does not protect ARGNOT's market value, guarantee a level
      of earnings, or remove any protocol-defined risks disclosed in the
      position's terms.
    </p>

    <h2>Using Argon Desktop</h2>
    <p>
      Argon Desktop manages these positions under
      <strong>Argonot Stakes</strong>. Choose a miner, review the available
      capacity and projected return, select the number of Stakes, and submit the
      position from your Internal App Wallet.
    </p>
    <p>
      The dashboard tracks each position's ARGNOT principal, distributed ARGN
      income, return to date, associated miner, and release status. Because
      positions are independent, each one must be released separately. See
      <router-link to="/docs/desktop-app/treasury"
        >Accessing Treasury</router-link
      >
      for the features available at the Treasury level.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
