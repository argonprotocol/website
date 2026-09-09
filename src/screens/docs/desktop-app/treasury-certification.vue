<template>
  <DocHeader>Treasury Certification</DocHeader>

  <DocContent>
    <p>
      Treasury Certification is a practical checklist that prepares a member to
      request access to Operations. It confirms that the member has secured
      their wallet and used the principal Treasury activities that support an
      Operational Account.
    </p>

    <p>
      Certification does not transfer custody, promise a return, or make the
      member an operator. It establishes eligibility to request the next access
      level from the member's sponsoring operator.
    </p>

    <h2>Current Certification Requirements</h2>
    <p>
      Argon Desktop reads the current protocol settings and tracks the member's
      progress. The current checklist contains one local wallet-safety step and
      three financial participation requirements.
    </p>

    <section
      class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40"
    >
      <header
        class="border-b border-slate-300 bg-slate-100/70 px-5 py-3 text-sm font-bold tracking-wide text-slate-600 uppercase"
      >
        Treasury Checklist
      </header>
      <dl class="m-0">
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-52 md:shrink-0">
            Back up the wallet
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Record and verify the wallet's recovery phrase. This safety step is
            completed locally in Argon Desktop and is not published onchain.
          </dd>
        </div>
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-52 md:shrink-0">
            Lock Bitcoin
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Complete Bitcoin Locks with a combined value of at least 500 ARGN.
            Because Bitcoin's ARGN value can change, Argon Desktop may suggest
            locking more than the minimum.
          </dd>
        </div>
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-52 md:shrink-0">
            Transfer ARGN in
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Transfer a cumulative total of at least 250 ARGN into the member's
            linked accounts through the supported Uniswap transfer path.
          </dd>
        </div>
        <div class="px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-52 md:shrink-0">
            Hold Argon Bonds
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Maintain active Argon Bond principal of at least 200 ARGN.
          </dd>
        </div>
      </dl>
    </section>

    <p>
      The transfer requirement is enforced while the supported crosschain
      transfer system is active. If protocol transfer tracking is unavailable,
      that requirement can be temporarily waived by the protocol rather than
      blocking every registration.
    </p>

    <h2>What Each Activity Demonstrates</h2>

    <h3>Wallet Recovery</h3>
    <p>
      Argon Desktop is self-custodial. A recovery phrase is the last line of
      defense if the computer fails or the local app data is lost. The sponsor
      and Upstream Node do not receive a copy. Review
      <DocLink to="/docs/desktop-app/self-custody-risks"
        >Self-Custody Risks</DocLink
      >
      before committing assets.
    </p>

    <h3>Bitcoin Locks</h3>
    <p>
      A
      <DocLink to="/docs/assets-and-entities/bitcoin-locks"
        >Bitcoin Lock</DocLink
      >
      moves Bitcoin into an owner-and-vault multisig. It can have zero or more
      insurance. Locking Bitcoin does not by itself issue ARGN; creating a
      <DocLink to="/docs/assets-and-entities/bitcoin-liquids"
        >Bitcoin Liquid</DocLink
      >
      is a separate action.
    </p>

    <h3>ARGN Transfers</h3>
    <p>
      Only qualifying inbound ARGN transfers through the supported Uniswap path
      count toward this requirement. An ordinary transfer between Argon accounts
      does not create new qualifying transfer history.
    </p>

    <h3>Argon Bonds</h3>
    <p>
      The member must maintain enough active
      <DocLink to="/docs/assets-and-entities/argon-bonds"
        >Argon Bond</DocLink
      >
      principal. A position that is Releasing no longer counts as active
      certification principal.
    </p>

    <h2>How Progress Is Recorded</h2>
    <p>
      Argon Desktop displays Treasury Certification in the top navigation. The
      checklist shows completed, underway, and unfinished requirements, and an
      unfinished item can open the relevant guided workflow.
    </p>

    <p>
      The wallet-backup step is recorded locally. Bitcoin, transfer, and bond
      progress comes from public protocol activity associated with the member's
      account. The sponsoring operator can see this public certification
      progress through Member Onboarding, but cannot see the member's recovery
      phrase or private keys.
    </p>

    <h2>Requesting an Operations Upgrade</h2>
    <p>
      When the checklist is complete, Argon Desktop allows the member to send an
      Operations upgrade request to the sponsor. The sponsor must have an
      available upgrade code and must choose to approve the request. Completion
      therefore creates eligibility, not guaranteed access.
    </p>

    <p>
      The protocol checks the financial minimums again when the Operational
      Account registers. Bitcoin value or active bond principal that falls below
      its minimum before registration can make the account ineligible even if
      Argon Desktop previously showed that step as complete.
    </p>

    <p>
      See
      <DocLink to="/docs/desktop-app/access-codes"
        >Access and Upgrades</DocLink
      >
      for the sponsor-approval process and
      <DocLink to="/docs/desktop-app/operations-certification"
        >Operator Certification</DocLink
      >
      for what follows after registration.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
