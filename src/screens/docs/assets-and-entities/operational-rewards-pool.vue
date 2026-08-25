<template>
  <DocHeader>Operational Rewards Pool</DocHeader>

  <DocContent>
    <p>
      The Operational Rewards Pool is the share of mining-seat bid revenue set
      aside to help qualified members become network operators. It funds
      protocol-defined certification and referral rewards rather than paying a
      standing return to operators or Upstream Nodes.
    </p>

    <p>
      This name distinguishes the pool from <strong>Treasury</strong>, the part
      of Argon Desktop where members use Bitcoin Locks, Argon Bonds, Argonot
      Stakes, and related services.
    </p>

    <h2>How the Pool Is Funded</h2>
    <p>
      Operators compete for mining seats by bidding ARGN. Winning bids enter the
      mining-bid pool. Before the remaining bid revenue is distributed to
      Argonot Stakes and qualifying Stabilization Vaults, the protocol assigns
      20% to Operational Rewards.
    </p>

    <section
      class="my-8 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-5"
    >
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
        Operational Allocation
      </div>
      <div
        class="my-4 overflow-x-auto rounded-md border border-argon-200 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-xl text-slate-800 sm:text-2xl"
      >
        Operational Rewards Pool = 20% of winning mining bids
      </div>
      <p class="m-0 text-sm text-slate-600">
        This is a share of bid revenue paid by winning miners. It is not a share
        of block issuance or transaction fees.
      </p>
    </section>

    <p>
      See
      <router-link to="/docs/assets-and-entities/mining-operations"
        >Mining Operations</router-link
      >
      for how seat auctions create this revenue and
      <router-link to="/docs/assets-and-entities/argon-bonds"
        >Argon Bonds</router-link
      >
      for the rest of the bid-pool distribution.
    </p>

    <h2>When Rewards Are Earned</h2>
    <p>
      Operational rewards are tied to completed Operator Certification. No
      reward is earned merely because an operator creates an invitation, a
      member accepts an access code, or a sponsor approves Operations access.
    </p>

    <section
      class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40"
    >
      <header
        class="border-b border-slate-300 bg-slate-100/70 px-5 py-3 text-sm font-bold tracking-wide text-slate-600 uppercase"
      >
        Current Reward Settings
      </header>
      <dl class="m-0">
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-52 md:shrink-0">
            New operator
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Earns 500 ARGN when the Operational Account completes activation and
            becomes certified.
          </dd>
        </div>
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-52 md:shrink-0">
            Upstream operator
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Earns 500 ARGN when a sponsored downstream account becomes
            certified, provided the upstream account is also certified.
          </dd>
        </div>
        <div class="px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-52 md:shrink-0">
            Referral milestone
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            The upstream operator earns an additional 5,000 ARGN for every five
            sponsored downstream accounts that become certified.
          </dd>
        </div>
      </dl>
    </section>

    <p>
      These amounts and the five-certification interval are protocol settings.
      They can be changed without changing what event qualifies: the downstream
      account must complete Operator Certification.
    </p>

    <h2>Reward, Referral, and Upgrade Code</h2>
    <p>
      Several things happen when a sponsored downstream operator becomes
      certified, but they remain separate protocol records:
    </p>

    <ul>
      <li>The new operator earns its certification reward.</li>
      <li>The certified upstream operator earns a matching reward.</li>
      <li>The upstream operator's successful-certification count increases.</li>
      <li>
        An Operations upgrade code is made available to the upstream operator,
        subject to the current limit on ready codes.
      </li>
    </ul>

    <p>
      The upgrade code permits another eligible member to register as an
      operator; it is not part of the ARGN payment. See
      <router-link to="/docs/desktop-app/access-codes"
        >Access and Upgrades</router-link
      >
      for how codes are earned and consumed.
    </p>

    <h2>Earning and Claiming Are Separate</h2>
    <p>
      Certification records a reward as earned by the Operational Account. ARGN
      is not automatically transferred to the operator's spendable balance at
      that moment. The operator claims some or all of the unclaimed amount later
      from Member Onboarding.
    </p>

    <section
      class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40"
    >
      <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
        <strong class="text-slate-800 md:w-52 md:shrink-0"
          >Claim increment</strong
        >
        <p class="m-0 mt-1 text-slate-600 md:mt-0">
          Claims must be at least 1 ARGN and use whole-ARGN increments.
        </p>
      </div>
      <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
        <strong class="text-slate-800 md:w-52 md:shrink-0">Destination</strong>
        <p class="m-0 mt-1 text-slate-600 md:mt-0">
          Any account linked to the Operational Account can submit the claim and
          receive the requested amount.
        </p>
      </div>
      <div class="px-5 py-4 md:flex md:gap-6">
        <strong class="text-slate-800 md:w-52 md:shrink-0"
          >Pool availability</strong
        >
        <p class="m-0 mt-1 text-slate-600 md:mt-0">
          A claim can be paid only when the pool has enough available ARGN. An
          earned amount remains recorded if it cannot yet be paid in full.
        </p>
      </div>
    </section>

    <h2>Unused Funds</h2>
    <p>
      The Operational Rewards allocation is not a general-purpose protocol
      budget and is not distributed pro rata among operators. Within the
      economic model, the 20% share either funds qualifying onboarding rewards
      or is burned when it is not used for those rewards.
    </p>

    <p>
      This is why it is inaccurate to say that “20% is paid to Upstream Nodes.”
      An Upstream Node earns no automatic share. Its operator earns a specific
      reward only when a sponsored downstream account completes the required
      certification event.
    </p>

    <h2>Using Argon Desktop</h2>
    <p>
      A certified operator's Member Onboarding dashboard displays total rewards
      earned, rewards still unclaimed, available Operations upgrade codes,
      pending invitations, and active members. The operator can claim an
      available reward balance from that area.
    </p>

    <p>
      Member Onboarding also shows public certification progress for sponsored
      members. That visibility helps an operator guide a member, but it does not
      allow the operator to complete the member's transactions or certification
      requirements.
    </p>

    <aside
      class="my-8 rounded-lg border border-amber-300 bg-amber-50/60 px-5 py-4"
    >
      <strong class="mb-2 block text-lg text-amber-900"
        >A Reward Is Not Guaranteed Income</strong
      >
      <p class="m-0! text-amber-900/80">
        Invitations may expire, members may stop before certification, protocol
        settings can change, and claims depend on available pool funds. An
        operator should not treat an invitation or upgrade approval as a
        receivable reward.
      </p>
    </aside>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
