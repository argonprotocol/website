<template>
  <DocHeader>Argon Bonds</DocHeader>

  <DocContent>
    <p>
      Argon Bonds are onchain, yield-bearing positions that earn a share of
      Stabilization Vault revenue. Each bond is created by committing one
      <DocLink to="/docs/assets-and-entities/argon-stablecoins"
        >ARGN</DocLink
      >
      to a vault, with the ARGN held by the protocol until the position is
      released.
    </p>

    <p>
      Each purchase of one or more bonds are recorded on the chain as a
      <strong>bond position</strong> with its own revenue-sharing terms,
      earnings history, and release status. Buying more bonds at a later date
      creates another position rather than adding to the first one.
    </p>

    <section
      class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40"
    >
      <header
        class="border-b border-slate-300 bg-slate-100/70 px-5 py-3 text-sm font-bold tracking-wide text-slate-600 uppercase"
      >
        Bond Rules
      </header>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4">
        <div class="border-b border-slate-300 p-5 sm:border-r lg:border-b-0">
          <div class="text-2xl font-bold text-argon-600">1 ARGN</div>
          <div class="mt-1 text-sm text-slate-600">Creates one Argon Bond</div>
        </div>
        <div class="border-b border-slate-300 p-5 lg:border-r lg:border-b-0">
          <div class="text-2xl font-bold text-argon-600">Whole units</div>
          <div class="mt-1 text-sm text-slate-600">
            Fractional bonds are not supported
          </div>
        </div>
        <div class="border-b border-slate-300 p-5 sm:border-r sm:border-b-0">
          <div class="text-2xl font-bold text-argon-600">100 bonds</div>
          <div class="mt-1 text-sm text-slate-600">Minimum purchase size</div>
        </div>
        <div class="p-5">
          <div class="text-2xl font-bold text-argon-600">Onchain hold</div>
          <div class="mt-1 text-sm text-slate-600">
            Principal remains under protocol control
          </div>
        </div>
      </div>
    </section>

    <p>
      A bond's underlying argons are never transferred to the vault operator for
      them to control. Unlike traditional bonds, a Argon Bond position
      cannot default becaUSE A vault operator has no ability to take the funds or refuse repayment.
    </p>

    <h2>Why Vaults Use Bonds</h2>
    <p>
      <DocLink to="/docs/assets-and-entities/vaulting-operations"
        >Stabilization Vaults</DocLink
      >
      support the network's
      <DocLink to="/docs/assets-and-entities/bitcoin-locks"
        >Bitcoin Locks</DocLink
      >. These vaults need ARGN capital to provide liquidity for the locks.
      Argon Bonds let the broader community participate in supplying this
      capital.
    </p>

    <p>
      A vault cannot accept an unlimited number of bonds. Its available bond
      space is tied to its securitization capital. The protocol
      reviews this backing at every frame boundary and counts only the supported
      portion of its bonds when allocating revenue.
    </p>

    <section
      class="my-8 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-5"
    >
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
        Revenue-Eligible Capacity
      </div>
      <div
        class="my-4 overflow-x-auto rounded-md border border-argon-200 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-xl text-slate-800 sm:text-2xl"
      >
        Eligible bond capital ≤ ARGN market value of secured Bitcoin
      </div>
      <p class="m-0 text-sm text-slate-600">
        The ratio is one to one. If a vault has ₳100 worth of secured Bitcoin,
        up to 100 of its bonds can participate in revenue distributions.
      </p>
    </section>

    <h2>Where Bond Earnings Come From</h2>
    <p>
      Bond earnings come from the ARGN paid by miners in winning mining-seat
      bids. A portion of that revenue flows through Stabilization Vaults to
      eligible Bond positions at the end of each frame.
    </p>

    <section class="my-8 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-5">
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
        Bond Revenue Share
      </div>
      <div class="my-3 text-3xl font-bold text-argon-700">5%–7%</div>
      <p class="m-0 text-sm text-slate-600">
        Bonds receive 5% of eligible vaulting revenue by default. A vault
        operator can offer as much as 7% to attract Bond capital. Every
        additional percentage point comes out of the operator's share.
      </p>
    </section>

    <p>
      Each position earns according to the revenue-sharing terms offered when
      it was created. Revenue eligibility is tied to the ARGN market value of
      Bitcoin secured by the vault, so adding Bonds alone does not create an
      unlimited claim on mining-bid revenue.
    </p>

    <p>
      The amount available to Bonds changes with mining-seat bids. ARGNOT's
      market price and growth in ARGN circulation can increase the value a
      mining seat produces, supporting larger bids. A lower expected return
      for miners also allows them to bid more, while a higher expected return
      leaves less revenue available for distribution.
    </p>

    <p>
      Earnings are paid in ARGN after each participating frame. They do not
      increase the bond principal or compound automatically. See
      <DocLink to="/docs/system-design/economic-drivers">Economic Drivers</DocLink>
      for the Bond return model and the factors that affect it.
    </p>

    <h2>The Life of a Bond Position</h2>
    <p>Every position moves through the same protocol-defined lifecycle.</p>

    <ol class="my-8 ml-0! grid list-none gap-3 p-0 md:grid-cols-2">
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >1</span
          >
          <strong class="text-lg">Purchase</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          You choose a vault with available capacity and set your purchase amount. The argons used in the purchase are placed on hold.
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
          Your position begins earning after its first full frame and continues
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
          Releasing stops the position from earning after the current frame. It
          still receives the current frame's distribution.
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
          Bonds take ten days to fully release. Your original ARGN becomes spendable in
          your wallet after the release period ends.
        </p>
      </li>
    </ol>

    <aside
      class="my-8 rounded-lg border border-amber-300 bg-amber-50/60 px-5 py-4"
    >
      <strong class="block mb-2 text-amber-900 text-lg">Automatic Release Rule</strong>
      <p class="m-0! text-amber-900/80">
        A vault only accepts up to <strong>100 active positions</strong>. Once full,
        a new purchase must be larger than the smallest active position. If it
        is, the new position displaces the smallest one and automatically starts
        its release. Closing a vault also schedules its positions for release.
      </p>
    </aside>

    <h2>Principal Capital Is Protected</h2>
    <p>
      Argons used in the purchase of a bond are applied to the vault where they were
      purchased, however the vault operator never receives direct control of those
      stablecoins. Instead, the onchain protocol holds the ARGN and enforces their eventual
      return. This prevents the operator from taking the principal or defaulting on
      their repayment.
    </p>
    <p>
      Principal protection only applies to the ARGN entities. It does not protect ARGN's market value or guarantee any level
      of financial return.
    </p>

  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
