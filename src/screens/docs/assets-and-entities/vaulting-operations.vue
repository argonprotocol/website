<template>
  <DocHeader>Vaulting Operations</DocHeader>

  <DocContent>
    <p>
      A Stabilization Vault is an operator-run service that combines committed
      ARGN capital with Bitcoin cosigning infrastructure. A vault can provide
      insurance for
      <router-link to="/docs/assets-and-entities/bitcoin-locks"
        >Bitcoin Locks</router-link
      >, support liquidity supplied through
      <router-link to="/docs/assets-and-entities/argon-bonds"
        >Argon Bonds</router-link
      >, and optionally operate as a
      <router-link to="/docs/bridgeless-transfers/localized-minting-authorities"
        >Localized Minting Authority</router-link
      >.
    </p>

    <p>
      These are separate capabilities, not stages every vault must complete. The
      operator chooses which services to offer, commits the required capital,
      sets the vault's commercial terms, and runs the machine that performs its
      time-sensitive duties.
    </p>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="mb-1 block"
        >A vault does not take custody of Bitcoin</strong
      >
      <p class="m-0">
        Bitcoin is sent to an owner-and-vault multisig address on the Bitcoin
        network. The operator controls the vault cosigning key, but cannot move
        the Bitcoin without a valid second signature or the applicable timelock
        path.
      </p>
    </aside>

    <h2>What a Vault Provides</h2>

    <h3>Bitcoin Cosigning and Insurance</h3>
    <p>
      A vault supplies one of the public keys used to create a Bitcoin Lock and
      cosigns valid release transactions. The Lock owner can select zero or more
      insurance when creating the Lock. Locking Bitcoin by itself does not issue
      ARGN, whether or not insurance was selected.
    </p>

    <p>
      Insurance is ARGN capital committed by the vault. It backs defined risks
      involving the operator's Bitcoin cosigning responsibilities and is held
      while the Lock requires coverage. A vault can charge a flat fee plus an
      annualized rate for this service.
    </p>

    <h3>Liquidity Through Argon Bonds</h3>
    <p>
      Argon Bonds supply ARGN capital to the protocol through a selected vault.
      That capital helps the network provide liquidity for
      <router-link to="/docs/assets-and-entities/bitcoin-liquids"
        >Bitcoin Liquids</router-link
      >. Bond principal remains under protocol control and is not transferred to
      the vault operator.
    </p>

    <p>
      A vault sets the percentage of its eligible mining-bid revenue offered to
      bondholders. Its supported bond capacity and revenue participation depend
      on the value of the Bitcoin it is actively insuring. A vault cannot earn
      against unsupported bond capital simply by attracting more bonds.
    </p>

    <h3>Localized Minting Authority</h3>
    <p>
      A vault can separately commit
      <router-link to="/docs/assets-and-entities/argonot-tokens"
        >ARGNOT</router-link
      >
      and bond-backed ARGN to support transfers between Argon and an external
      network. Committing ARGNOT to a vault does not activate this service by
      itself; the operator must complete the minting-authority process.
    </p>

    <p>
      When part of the commitment is assigned to an active transfer, that
      capital becomes encumbered until the obligation is resolved. Failure to
      fulfill the obligation can cause the protocol to burn the capital that
      backed it.
    </p>

    <h2>Vault Capital and Insurance Capacity</h2>
    <p>
      The operator chooses how much ARGN to commit and how to allocate it
      between Bitcoin insurance and Treasury participation. Capital committed to
      active obligations is held by the protocol and cannot be withdrawn or
      reused at the same time.
    </p>

    <p>
      The vault also selects an <strong>insurance ratio</strong> from 1× to 2×.
      This ratio determines how much operator capital the protocol reserves for
      each amount of insurance promised to a Bitcoin Lock.
    </p>

    <section
      class="my-8 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-5"
    >
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
        Insurance Capital
      </div>
      <div
        class="my-4 overflow-x-auto rounded-md border border-argon-200 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-xl text-slate-800 sm:text-2xl"
      >
        Reserved ARGN = Lock insurance × Vault insurance ratio
      </div>
      <p class="m-0 text-sm text-slate-600">
        Insuring ₳100 reserves ₳100 at 1×, ₳150 at 1.5×, or ₳200 at 2×. A higher
        ratio places more capital behind each insured amount, but leaves less
        capacity for additional Locks.
      </p>
    </section>

    <p>
      The protocol schedules committed capital for release as the obligations it
      supports end. Increasing the commitment adds capacity, while a request to
      reduce it can release only the portion no longer required by Locks,
      Liquids, bonds, or crosschain obligations.
    </p>

    <h2>How Vault Revenue Works</h2>
    <p>A vault can earn ARGN from two primary sources:</p>

    <ul>
      <li>
        <strong>Bitcoin service fees</strong> paid for its insurance capital and
        cosigning service.
      </li>
      <li>
        <strong>Mining-bid revenue</strong> assigned to the vault after its
        bondholders receive the revenue share attached to their positions.
      </li>
    </ul>

    <p>
      At each frame distribution, the protocol first allocates mining-bid
      revenue to the Operational Rewards Pool and
      <router-link to="/docs/assets-and-entities/argonot-stakes"
        >Argonot Stakes</router-link
      >. The remaining distributable revenue is assigned among qualifying vaults
      according to eligible bond capital. See
      <router-link to="/docs/assets-and-entities/mining-operations"
        >Mining Operations</router-link
      >
      for where the bid pool comes from and Argon Bonds for the bondholder
      distribution rules.
    </p>

    <p>
      Vault earnings are held pending collection. The operator must resolve
      required cosigning work and collect the revenue within the protocol's
      collection window. Revenue left uncollected after that window is burned.
    </p>

    <h2>Core Operating Rules</h2>

    <section
      class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40"
    >
      <header
        class="border-b border-slate-300 bg-slate-100/70 px-5 py-3 text-sm font-bold tracking-wide text-slate-600 uppercase"
      >
        Current Protocol Requirements
      </header>
      <dl class="m-0">
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-48 md:shrink-0">
            Operator account
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            An eligible Operational Account can operate one Stabilization Vault.
          </dd>
        </div>
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-48 md:shrink-0">
            Minimum capital
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Operations access currently requires at least 2,000 ARGN in vault
            capital.
          </dd>
        </div>
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-48 md:shrink-0">
            Minimum hold
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            The 2,000 ARGN operational minimum remains unavailable for the first
            year after the vault opens, even if the vault closes.
          </dd>
        </div>
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-48 md:shrink-0">
            Insurance ratio
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            A vault must use a ratio between 1× and 2×.
          </dd>
        </div>
        <div class="px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-48 md:shrink-0">
            Action windows
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Valid Bitcoin release requests and uncollected revenue have
            ten-frame deadlines, approximately ten days.
          </dd>
        </div>
      </dl>
    </section>

    <h2>Operator Responsibilities</h2>
    <p>
      The operator must keep its connected machine, vault software, and keys
      available. The vault service monitors onchain work, cosigns valid Bitcoin
      releases, and prepares revenue collection, but automation does not move
      those responsibilities to Argon or another custodian.
    </p>

    <p>
      A vault must clear pending Bitcoin cosigns and overdue external-service
      duties before collecting revenue. If a covered vault failure causes a
      defined loss, the protocol can use applicable insurance capital to
      compensate the beneficiary and burn the remaining amount required by the
      failure rules.
    </p>

    <p>
      Closing a vault stops it from accepting new Bitcoin Locks and new bond
      positions. It does not cancel existing obligations. The protocol releases
      the operator's capital only as the Locks and other commitments it supports
      are completed.
    </p>

    <h2>Using Argon Desktop</h2>
    <p>
      Vaulting is managed from the
      <router-link to="/docs/desktop-app/operations"
        >Operations level</router-link
      >
      of Argon Desktop. Setup connects a compatible local or cloud machine,
      confirms the vault's capital allocation, insurance ratio, Bitcoin fees,
      and bondholder revenue share, and funds the operational wallet with ARGN
      plus any optional ARGNOT commitment.
    </p>

    <p>
      After launch, the Vaulting dashboard tracks capital utilization, Bitcoin
      Locks, bond capital, revenue, return to date, and pending operator
      actions. The operator remains responsible for machine health, sufficient
      capital, configuration, and secure backups of the vault's Bitcoin and
      account keys.
    </p>

    <aside
      class="my-8 rounded-lg border border-amber-300 bg-amber-50/60 px-5 py-4"
    >
      <strong class="mb-2 block text-lg text-amber-900"
        >Capital Can Be Lost</strong
      >
      <p class="m-0! text-amber-900/80">
        Vaulting revenue is not guaranteed. Bitcoin demand, bond participation,
        mining bids, fee settings, asset prices, capital utilization, and
        operator availability all affect results. Missed duties can also cause
        revenue or committed capital to be burned. Review
        <router-link to="/docs/desktop-app/operations-certification"
          >Operator Certification</router-link
        >
        before opening a vault.
      </p>
    </aside>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
