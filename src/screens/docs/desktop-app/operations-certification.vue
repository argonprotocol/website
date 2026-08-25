<template>
  <DocHeader>Operator Certification</DocHeader>

  <DocContent>
    <p>
      Operator Certification is the final activation process for a registered
      Operational Account. It requires the new operator to establish both sides
      of an operation: a Stabilization Vault with committed insurance capital
      and a mining operation that has successfully earned mining seats.
    </p>

    <p>
      Receiving Operations access and becoming certified are separate events.
      Sponsor approval allows the account to register and begin setting up
      Operations. Certification occurs only after the account meets the protocol
      requirements and completes activation.
    </p>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="mb-1 block">Registered is not yet certified</strong>
      <p class="m-0">
        A registered operator can build the infrastructure needed for
        certification, but it does not receive certification rewards, sponsor
        upgrade codes, or fully certified status until activation succeeds.
      </p>
    </aside>

    <h2>Operational Account Registration</h2>
    <p>
      Registration creates a linked account set consisting of an Operational
      Account, a vault account, and a mining account. Each account proves its
      association with the Operational Account. The registration also includes
      the signed access proof created by the sponsoring operator.
    </p>

    <p>
      The protocol verifies that the access proof was signed for the exact new
      Operational Account, confirms that the sponsor is registered, and consumes
      one of the sponsor's available Operations upgrade codes. It then records
      the sponsor as the new account's upstream operator.
    </p>

    <h2>Current Certification Requirements</h2>
    <p>
      After registration, the operator must satisfy all three operational
      requirements. The values below are current protocol settings and can
      change.
    </p>

    <section
      class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40"
    >
      <header
        class="border-b border-slate-300 bg-slate-100/70 px-5 py-3 text-sm font-bold tracking-wide text-slate-600 uppercase"
      >
        Activation Requirements
      </header>
      <dl class="m-0">
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-52 md:shrink-0">
            ARGN transferred in
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            At least 3,000 ARGN in cumulative qualifying transfers through the
            supported Uniswap path across the linked operational, vault, and
            mining accounts. This is a total requirement, not 3,000 ARGN in
            addition to the Treasury minimum.
          </dd>
        </div>
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-52 md:shrink-0">
            Vault insurance capital
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            A Stabilization Vault with at least 2,000 ARGN committed as operator
            insurance capital.
          </dd>
        </div>
        <div class="px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-52 md:shrink-0">
            Mining seats
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            At least two mining seats earned through the seat-auction process.
          </dd>
        </div>
      </dl>
    </section>

    <p>
      As with Treasury Certification, the transfer requirement is enforced while
      the supported crosschain transfer system is active. The protocol can waive
      that requirement if transfer tracking is unavailable.
    </p>

    <h2>Building the Operation</h2>

    <h3>Open a Stabilization Vault</h3>
    <p>
      The operator creates a vault, commits the required ARGN, configures its
      insurance terms, and connects the machine that will perform its ongoing
      work. The vault can support Bitcoin Locks and Argon Bonds, but
      certification depends on the operator's committed insurance capital—not on
      member deposits.
    </p>

    <p>
      See
      <router-link to="/docs/assets-and-entities/vaulting-operations"
        >Vaulting Operations</router-link
      >
      for the service, capital, and availability requirements.
    </p>

    <h3>Win Mining Seats</h3>
    <p>
      The mining account enters seat auctions with ARGN bids, mining authority
      keys, and the required ARGNOT collateral. Certification counts seats the
      operation earns; configuring a miner or submitting a losing bid is not
      sufficient.
    </p>

    <p>
      See
      <router-link to="/docs/assets-and-entities/mining-operations"
        >Mining Operations</router-link
      >
      for seat auctions, terms, collateral, and operating responsibilities.
    </p>

    <h2>Activation</h2>
    <p>
      Meeting the requirements makes the account eligible, but does not change
      its status automatically. Activation is a separate transaction submitted
      from one of the linked accounts. The protocol checks the current
      requirements again before certifying the Operational Account.
    </p>

    <section
      class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40"
    >
      <header
        class="border-b border-slate-300 bg-slate-100/70 px-5 py-3 text-sm font-bold tracking-wide text-slate-600 uppercase"
      >
        Activation Results
      </header>
      <dl class="m-0">
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-52 md:shrink-0">
            Certified status
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            The protocol marks the Operational Account as operationally
            certified.
          </dd>
        </div>
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-52 md:shrink-0">
            First upgrade code
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            One Operations upgrade code becomes available so the new operator
            can sponsor a future operator.
          </dd>
        </div>
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-52 md:shrink-0">
            Operational rewards
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            The protocol records the new operator's certification reward and,
            when eligible, the certified upstream operator's reward and referral
            progress.
          </dd>
        </div>
        <div class="px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-52 md:shrink-0">
            One-year capital hold
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            The 2,000 ARGN vault minimum cannot be released for one year after
            activation, even if the vault closes during that period.
          </dd>
        </div>
      </dl>
    </section>

    <h2>Using Argon Desktop</h2>
    <p>
      After Operations access is approved, the certification menu guides the
      operator through the qualifying transfer, vault setup, and mining-seat
      requirements. Progress that comes from the protocol updates as linked
      account activity is finalized.
    </p>

    <p>
      After activation, Member Onboarding becomes available for invitations,
      Operations upgrade approvals, upgrade-code tracking, and reward claims.
      See
      <router-link to="/docs/desktop-app/access-codes"
        >Access and Upgrades</router-link
      >
      and
      <router-link to="/docs/assets-and-entities/operational-rewards-pool"
        >Operational Rewards Pool</router-link
      >
      for those rules.
    </p>

    <aside
      class="my-8 rounded-lg border border-amber-300 bg-amber-50/60 px-5 py-4"
    >
      <strong class="mb-2 block text-lg text-amber-900"
        >Certification Begins the Responsibility</strong
      >
      <p class="m-0! text-amber-900/80">
        Activation is not the end of an operator's work. Mining and vaulting
        require available machines, protected keys, adequate capital, and timely
        responses to protocol duties. Missed duties and poor operating decisions
        can reduce revenue or place committed capital at risk.
      </p>
    </aside>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
