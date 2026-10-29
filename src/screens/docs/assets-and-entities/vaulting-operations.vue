<template>
  <DocHeader>Vaulting Operations</DocHeader>

  <DocContent>
    <p>
      A Stabilization Vault is an operator-run service that combines committed ARGN capital with Bitcoin
      cosigning infrastructure. A vault can provide a Cosigner Guarantee for
      <DocLink to="/docs/assets-and-entities/bitcoin-locks">Bitcoin Locks</DocLink>, support liquidity
      supplied through <DocLink to="/docs/assets-and-entities/argon-bonds">Argon Bonds</DocLink>, and
      optionally operate as a
      <DocLink to="/docs/bridgeless-transfers/remote-minting-authorities">Remote Minting Authority</DocLink>.
    </p>

    <p>
      These are separate capabilities, not stages every vault must complete. The operator chooses which
      services to offer, commits the required capital, sets the vault's commercial terms, and runs the
      machine that performs its time-sensitive duties.
    </p>

    <aside class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4">
      <strong class="mb-1 block">A vault does not take custody of Bitcoin</strong>
      <p class="m-0">
        Bitcoin is sent to an owner-and-vault multisig address on the Bitcoin network. The operator
        controls the vault cosigning key, but cannot move the Bitcoin without a valid second signature or
        the applicable timelock path.
      </p>
    </aside>

    <h2>What a Vault Provides</h2>

    <h3>Bitcoin Cosigning and Cosigner Guarantees</h3>

    <p>
      A vault supplies one of the public keys used to create a Bitcoin Lock and cosigns valid release
      transactions. The Lock owner can choose a Cosigner Guarantee of any supported amount, including
      zero. Locking Bitcoin by itself does not issue ARGN, whether or not a guarantee was selected.
    </p>

    <p>
      A Cosigner Guarantee is ARGN capital committed by the vault to address defined failures involving
      its Bitcoin cosigning responsibilities. The applicable capital remains held while it supports the
      guarantee or another protocol commitment. A vault can charge a flat fee plus an annualized rate for
      its capital and cosigning service.
    </p>

    <p>
      A Lock can hold BTC with zero guarantee, but it has no capacity for a
      <DocLink to="/docs/assets-and-entities/bitcoin-liquids">Bitcoin Liquid</DocLink>. Creating a
      Liquid is a separate action, and its amount is limited by both the eligible Bitcoin value and
      available guarantee capacity. A guarantee can be added before creating a Liquid, subject to vault
      availability and fees.
    </p>

    <p>
      The guarantee does not protect against Bitcoin price changes or guarantee ARGN’s market value. The Liquid’s release rules provide its separate price protection. Releasing
      a Liquid settles its ARGN obligation and frees the guarantee capacity used by that position; releasing the Bitcoin is a
      separate transaction.
    </p>

    <h3>Liquidity Through Argon Bonds</h3>

    <p>
      Argon Bonds supply ARGN capital to the protocol through a selected vault. That capital helps the
      network provide liquidity for
      <DocLink to="/docs/assets-and-entities/bitcoin-liquids">Bitcoin Liquids</DocLink>. Bond principal
      remains under protocol control and is not transferred to the vault operator.
    </p>

    <p>
      Bond admission capacity and revenue eligibility are separate limits. Available bond space is tied
      to the vault’s securitization capital. The supported portion that participates in revenue
      distributions is limited by the ARGN market value of Bitcoin secured by the vault. Adding bond
      capital alone does not create an unlimited claim on mining-bid revenue. See
      <DocLink to="/docs/assets-and-entities/argon-bonds">Argon Bonds</DocLink> for position terms and
      eligibility rules.
    </p>

    <h3>Remote Minting Authority</h3>

    <p>
      A vault operator can separately make active ARGN or
      <DocLink to="/docs/assets-and-entities/argonot-tokens">ARGNOT</DocLink> securitization available to
      authorize transfers from Argon to a supported external network. Ethereum is the first supported
      network. An ARGN transfer uses available bond-backed ARGN before committed ARGNOT; an ARGNOT
      transfer can be backed only by ARGNOT. Committing capital to a vault does not activate an authority
      by itself. The operator must prepare its relay delegate and complete the council-coordinated
      authority activation process.
    </p>

    <p>
      Registering an authority encumbers its selected collateral. Reservations for individual transfers
      cannot be assigned to a second transfer while the first remains unresolved. Proven finalization
      releases the temporary backing used by that transfer and reduces the authority’s remaining
      registered capacity. A canceled or expired transfer releases its reservations; it does not, by
      itself, establish a collateral-burning event. If proven gateway activity shows issuance without a
      matching Argon transfer, the protocol burns the collateral consumed for that issuance.
    </p>

    <p>
      An authority can also earn authorization tips. Tips are paid in the token transferred, in
      proportion to the collateral contributed, after finalization is proven. See
      <DocLink to="/docs/bridgeless-transfers/remote-minting-authorities">Remote Minting Authorities</DocLink>
      for activation, funding, settlement, and retirement.
    </p>

    <h2>Vault Capital and Guarantee Capacity</h2>

    <p>
      The operator chooses how much ARGN to commit to vault securitization. Operator capital, third-party
      Bond principal, and optional ARGNOT commitments have different roles and release conditions. The
      protocol holds capital that supports active obligations or withdrawal commitments; that capital
      cannot be withdrawn while those restrictions apply.
    </p>

    <p>
      The selected Cosigner Guarantee determines the amount of backing promised to a Bitcoin Lock,
      subject to available vault capacity. Review the guarantee amount, fees, and capital commitments
      before accepting a new Lock or changing the vault’s funding.
    </p>

    <p>
      Increasing funding adds capital. Reducing funding or closing the vault requests the release of
      capital subject to its commitments and any required withdrawal notice. Capital committed for
      certification, regular Bonds, or reward participation can require a one-year withdrawal notice.
      That notice begins when the withdrawal is requested; the vault’s opening anniversary does not make
      committed capital immediately available. Active Bitcoin or crosschain obligations can delay release
      further.
    </p>

    <h2>Operator Alliances</h2>

    <p>
      Planned operator alliances will allow vault operators to borrow unused Securitization or BTC
      from other vaults or operators to help fill their own vaults. Argon Desktop will add tools to
      search for operators and create connections around these resources. See
      <DocLink to="/docs/assets-and-entities/connections">Connections</DocLink> for how alliances will
      fit into an operator's network.
    </p>

    <h2>The Life of a Vault</h2>

    <ol class="my-8 ml-0! grid list-none gap-3 p-0 md:grid-cols-2">
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <span class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700" aria-hidden="true">1</span>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Obtain Operations access and register the Operational Account. Treasury Certification and
          approval from a sponsoring Operator are prerequisites; see
          <DocLink to="/docs/desktop-app/access-codes">Access and Upgrades</DocLink>.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <span class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700" aria-hidden="true">2</span>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Connect a supported server, fund the vault, and set its Bitcoin service fees. Review the
          capital needed for
          <DocLink to="/docs/desktop-app/operations-certification">Operator Certification</DocLink>
          separately from the amount required to create the vault.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <span class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700" aria-hidden="true">3</span>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Keep the server and signing keys available, monitor Locks and capital utilization, fulfill
          cosigning duties, and collect eligible revenue within its collection window.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <span class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700" aria-hidden="true">4</span>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          To reduce funding or close, request the change and continue servicing existing obligations.
          Capital becomes spendable only after the applicable withdrawal notice and remaining obligations
          have been satisfied.
        </p>
      </li>
    </ol>

    <h2>How Vault Revenue Works</h2>

    <p>
      A vault can earn ARGN from two primary sources:
    </p>

    <ul>
      <li>
        Bitcoin service fees paid for its Cosigner Guarantee capital and cosigning service.
      </li>
      <li>
        Mining-bid revenue allocated to the operator according to the protocol’s eligibility, capital,
        and participation rules.
      </li>
    </ul>

    <p>
      At each frame distribution, mining-bid revenue is allocated among protocol-defined pools and
      eligible participants. The model below expresses each allocation as a share of total
      mining-auction revenue, before subtracting other pools. See
      <DocLink to="/docs/assets-and-entities/mining-operations">Mining Operations</DocLink> for the
      source of the bid pool, <DocLink to="/docs/assets-and-entities/argon-bonds">Argon Bonds</DocLink>
      for Bond position terms, and
      <DocLink to="/docs/system-design/economic-drivers">Economic Drivers</DocLink> for the calculator.
    </p>

    <h3>How the Website Model Estimates Vault Revenue</h3>

    <p>
      The following six steps explain how the vaulting calculator models the effects of capital,
      Bitcoin participation, Bonds, and ARGNOT on operator revenue. These are illustrative
      assumptions, not the currently deployed payout rules. Actual earnings depend on the protocol
      version, active parameters, eligibility, and each frame’s network state.
    </p>

    <p>
      All model capital values are expressed in ARGN. Initial ARGN Securitization means the operator’s
      ARGN commitment and excludes third-party Bond principal. ARGNOT Securitization Value is the ARGN
      value of the operator’s ARGNOT commitment. Utilization values are fractions from 0 to 1; 50% is
      entered as 0.5. The formulas below assume positive initial ARGN securitization. The calculator
      returns zero revenue and zero return when that amount is zero.
    </p>

    <p>
      Mining Auction Revenue is the modeled full-network ARGN bid revenue over ten days. The ten-day
      interval is a comparison period for the estimate; protocol distributions and collection obligations
      operate by frame.
    </p>

    <h4>1. Establish the Network's Desired Bitcoin Space</h4>

    <p>
      The model begins with a network-wide target for Bitcoin capacity. It compares circulation
      attributed to Bitcoin with 15% of circulation attributed to mining, then uses whichever amount is
      greater. A minimum denominator of 1 ARGN avoids division by zero.
    </p>

    <section class="my-8 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-5">
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">Desired Bitcoin Space</div>
      <div class="my-4 overflow-x-auto rounded-md border border-slate-300 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-lg text-slate-800 sm:text-xl">
        Desired Bitcoin Space = max(ARGN circulation attributed to Bitcoin, ARGN circulation attributed
        to mining × 15%, 1 ARGN)
      </div>
      <p class="m-0 text-sm text-slate-600">
        The website calculator uses a fixed Bitcoin-capacity rate of 15%. The deployed rate depends
      on the active protocol parameters.
      </p>
    </section>

    <h4>2. Measure the Vault's Contribution</h4>

    <p>
      The model compares the operator’s initial ARGN securitization with Desired Bitcoin Space. The
      resulting Vault Factor is capped at 1. This factor describes one vault scenario; it does not reproduce how live vaults share the pool.
    </p>

    <div class="my-6 overflow-x-auto rounded-md border border-slate-300 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-lg text-slate-800 sm:text-xl">
      Vault Factor = min(1, Initial ARGN Securitization ÷ Desired Bitcoin Space)
    </div>

    <h4>3. Measure How Fully the Vault Is Used</h4>

    <p>
      The model measures Bitcoin utilization by dividing its locked-Bitcoin value input by the initial
      ARGN securitization and capping the result at 1. It measures Bond utilization the same way using
      its Bond capital input. These simplified inputs do not reproduce the deployed rules for covered
      Bitcoin, admission capacity, or revenue eligibility.
    </p>

    <div class="my-6 overflow-x-auto rounded-md border border-slate-300 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-lg text-slate-800 sm:text-xl">
      Bitcoin Utilization = min(1, Bitcoin Locked Value ÷ Initial ARGN Securitization)
    </div>

    <div class="my-6 overflow-x-auto rounded-md border border-slate-300 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-lg text-slate-800 sm:text-xl">
      Bond Utilization = min(1, Bond Capital ÷ Initial ARGN Securitization)
    </div>

    <p>
      In this model, Bitcoin supplies 90% of the core utilization score. Bond utilization supplies the
      remaining 10%, multiplied by Bitcoin utilization. Bonds therefore cannot increase the modeled
      utilization score when the Bitcoin input is zero.
    </p>

    <div class="my-6 overflow-x-auto rounded-md border border-slate-300 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-lg text-slate-800 sm:text-xl">
      Core Utilization = Bitcoin Utilization × (90% + 10% × Bond Utilization)
    </div>

    <p>
      For example, a vault at 50% Bitcoin utilization receives 50% of the available Bitcoin component. A
      vault at 100% Bitcoin utilization receives the full Bitcoin component and can unlock the final 10%
      through purchased bonds.
    </p>

    <h4>4. Add ARGNOT Securitization</h4>

    <p>
      The website model includes optional ARGNOT securitization. It measures ARGNOT utilization against
      capacity equal to twice the initial ARGN securitization. It also scales modeled revenue with the
      operator’s total capital. Both effects are model assumptions; they do not establish the deployed ARGNOT reward rules.
    </p>

    <div class="my-6 overflow-x-auto rounded-md border border-slate-300 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-lg text-slate-800 sm:text-xl">
      ARGNOT Utilization = min(1, ARGNOT Securitization Value ÷ (2 × Initial ARGN Securitization))
    </div>

    <div class="my-6 overflow-x-auto rounded-md border border-slate-300 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-lg text-slate-800 sm:text-xl">
      Total Operator Capital = Initial ARGN Securitization + ARGNOT Securitization Value
    </div>

    <div class="my-6 overflow-x-auto rounded-md border border-slate-300 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-lg text-slate-800 sm:text-xl">
      Capital Multiplier = Total Operator Capital ÷ Initial ARGN Securitization
    </div>

    <p>
      The modeled ARGNOT bonus can increase the calculated return by up to 29% relative to the model
      without ARGNOT. The bonus is multiplied by Bitcoin utilization and reaches its full effect only
      when both utilization inputs are 1.
    </p>

    <div class="my-6 overflow-x-auto rounded-md border border-slate-300 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-lg text-slate-800 sm:text-xl">
      ARGNOT Bonus = 1 + (29% × ARGNOT Utilization × Bitcoin Utilization)
    </div>

    <h4>5. Calculate the Modeled Revenue Rate</h4>

    <p>
      The model begins with a core revenue rate of 1% and increases it according to core utilization.
      This is an intermediate weight applied to auction revenue, not a 1% return on invested capital. The
      core maximum reserves room for the ARGNOT capital multiplier and bonus, and a final cap limits the
      modeled operator rate.
    </p>

    <p>
      The model’s standard 65% vaulting allocation comprises a maximum 57% operator share, a 5% Bond
      share, and a 3% Bitcoin Liquid share. In this model, Bonds can be offered up to 7% and Liquids up
      to 5%; percentage points above their standard allocations reduce the operator’s maximum. These are
      model allocations expressed against the full auction-revenue input, not annual yields or successive
      percentages of a shrinking remainder.
    </p>

    <div class="my-6 overflow-x-auto rounded-md border border-slate-300 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-lg text-slate-800 sm:text-xl">
      Adjusted Maximum = max(1%, 57% − max(0, Bond Revenue Share − 5%) − max(0, Liquid Revenue Share −
      3%))
    </div>

    <div class="my-6 overflow-x-auto rounded-md border border-slate-300 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-lg text-slate-800 sm:text-xl">
      Core Maximum = Adjusted Maximum ÷ 3 ÷ 1.29
    </div>

    <div class="my-6 overflow-x-auto rounded-md border border-slate-300 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-lg text-slate-800 sm:text-xl">
      Core Revenue Rate = 1% + Core Utilization × (Core Maximum − 1%)
    </div>

    <h4>6. Calculate Modeled Revenue and Return</h4>

    <p>
      The model applies the Vault Factor and capped operator revenue rate to the full-network auction
      revenue estimated for the ten-day period. The result is modeled mining-bid revenue before operating
      expenses. It excludes Bitcoin service fees and optional authority tips.
    </p>

    <div class="my-6 overflow-x-auto rounded-md border border-slate-300 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-lg text-slate-800 sm:text-xl">
      Ten-Day Mining-Bid Revenue = Mining Auction Revenue × Vault Factor × min(Adjusted Maximum, Core
      Revenue Rate × Capital Multiplier × ARGNOT Bonus)
    </div>

    <p>
      The modeled ten-day return compares this mining-bid revenue with the ARGN value of the operator’s
      initially committed ARGN and ARGNOT. It is a gross revenue-to-capital measure. Server costs,
      transaction costs, and other operating expenses reduce net profit; Bitcoin service fees and
      optional authority tips are separate earnings.
    </p>

    <div class="my-6 overflow-x-auto rounded-md border border-slate-300 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-lg text-slate-800 sm:text-xl">
      Modeled Ten-Day Return (%) = Ten-Day Mining-Bid Revenue ÷ Total Operator Capital × 100
    </div>

    <section class="my-8 rounded-lg border border-slate-300 bg-white/40 px-5 py-5">
      <h5 class="mt-0 text-lg font-bold text-slate-800">Modeled Example</h5>
      <p>
        Suppose Initial ARGN Securitization is ₳10,000, ARGNOT Securitization Value is ₳20,000, Bitcoin
        Locked Value and Bond Capital are each ₳10,000, Desired Bitcoin Space is ₳100,000, and ten-day
        Mining Auction Revenue is ₳1,000. Use the standard 5% Bond and 3% Liquid shares.
      </p>

      <p>
        Vault Factor is 0.1. Bitcoin, Bond, ARGNOT, and core utilization are all 1. Core Maximum is 0.57
        ÷ 3 ÷ 1.29; Capital Multiplier is 3 and ARGNOT Bonus is 1.29. The capped operator revenue rate is
        therefore 0.57.
      </p>

      <p>
        Ten-Day Mining-Bid Revenue is ₳1,000 × 0.1 × 0.57 = ₳57. Total Operator Capital is ₳30,000, so
        the modeled ten-day return is 0.19% before operating costs. The 57% revenue rate is not a 57%
        return on that capital.
      </p>

      <p class="mb-0">
        Explore the assumptions in the
        <DocLink to="/docs/system-design/economic-drivers">Economic Drivers vaulting calculator</DocLink>. Any annualized yield assumes the modeled conditions continue and earnings are repeatedly
        reinvested; collecting revenue does not automatically reinvest it.
      </p>
    </section>

    <aside class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4">
      <strong class="mb-1 block">In plain language</strong>
      <p class="m-0">
        In the website model, more operator capital can increase absolute revenue, while Bitcoin and Bond
        utilization determine how much of the modeled capacity is used. ARGNOT provides the optional
        modeled multiplier and bonus. Larger revenue shares offered to Bonds and Liquids reduce the
        model’s operator maximum. Protocol payouts follow the active deployment’s rules.
      </p>
    </aside>

    <p>
      Vault earnings are held pending collection. The operator must resolve required cosigning work and
      collect the revenue within the protocol's collection window. Revenue left uncollected after that
      window is burned.
    </p>

    <h2>Core Operating Rules</h2>

    <section class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40">
      <header class="border-b border-slate-300 bg-slate-100/70 px-5 py-3 text-sm font-bold tracking-wide text-slate-600 uppercase">
        Access, Capital, and Action Windows
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
            Operations access
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Complete Treasury Certification, obtain sponsor approval using an available Operations
            upgrade code, and register the Operational Account. See
            <DocLink to="/docs/desktop-app/access-codes">Access and Upgrades</DocLink>.
          </dd>
        </div>
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-48 md:shrink-0">
            Vault creation minimum
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            The desktop vault-creation flow requires at least 2,000 ARGN in securitization. This is
            separate from the capital needed to complete Operator Certification.
          </dd>
        </div>
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-48 md:shrink-0">
            Operator Certification capital
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Commit at least 2,500 ARGN in vault securitization and complete the other requirements
            described in
            <DocLink to="/docs/desktop-app/operations-certification">Operator Certification</DocLink>.
          </dd>
        </div>
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-48 md:shrink-0">
            Withdrawal notice
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Committed capital can require a one-year withdrawal notice beginning when release is
            requested. Capital remains held while required notice or active obligations prevent release.
            See the capital section above.
          </dd>
        </div>
        <div class="px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-48 md:shrink-0">
            Action windows
          </dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Valid Bitcoin release requests and uncollected revenue have ten-frame deadlines,
            approximately ten days.
          </dd>
        </div>
      </dl>
    </section>

    <h2>Operator Responsibilities</h2>

    <p>
      The operator must keep its connected machine, vault software, and keys available. The vault service
      monitors onchain work, cosigns valid Bitcoin releases, and prepares revenue collection, but
      automation does not move those responsibilities to Argon or another custodian.
    </p>

    <p>
      A vault must clear pending Bitcoin cosigns and overdue duties that block revenue collection. If the
      operator is a member of the
      <DocLink to="/docs/bridgeless-transfers/global-issuance-council">Global Issuance Council</DocLink>, it must sign required gateway updates in queue order. An overdue council approval prevents
      revenue collection until the member’s approval position is current again. A missed council
      signature does not directly burn the operator’s capital.
    </p>

    <p>
      Defined Bitcoin cosigning failures can trigger compensation and capital penalties under the
      applicable Cosigner Guarantee rules. Unauthorized issuance backed by a Remote Minting Authority can
      burn the collateral consumed for that issuance. These are separate failure rules from the council’s
      revenue-collection restriction. Revenue that remains uncollected beyond its collection window is
      burned.
    </p>

    <p>
      Closing a vault stops new Bitcoin Locks and new Bond purchases and schedules existing Bond
      positions for release. It does not cancel existing obligations or bypass withdrawal notice. The
      operator must continue servicing outstanding Locks and any crosschain duties until they are
      resolved. Operator capital becomes available only when its applicable notice and remaining
      commitments permit release.
    </p>

    <aside class="my-8 rounded-lg border border-amber-300 bg-amber-50/60 px-5 py-4">
      <strong class="mb-2 block text-lg text-amber-900">Warning: Capital Can Be Lost</strong>
      <p class="m-0! text-amber-900/80">
        Vaulting revenue is not guaranteed. Bitcoin demand, Bond participation, mining bids, service
        fees, asset prices, capital utilization, operating costs, and operator availability affect
        results. Capital penalties apply under defined failure rules; expired uncollected revenue is
        burned. Review
        <DocLink to="/docs/desktop-app/operations-certification">Operator Certification</DocLink> and
        <DocLink to="/docs/desktop-app/self-custody-risks">Self-Custody Risks</DocLink> before opening a
        vault.
      </p>
    </aside>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
