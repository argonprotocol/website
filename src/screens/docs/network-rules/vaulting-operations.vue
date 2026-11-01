<template>
  <DocHeader>Vaulting Operations</DocHeader>

  <DocContent>
    <p>
      A Stabilization Vault is an operator-run service that combines committed ARGN capital with Bitcoin
      cosigning infrastructure. A vault can provide a Cosigner Guarantee for
      <DocLink to="/docs/asset-rules/bitcoin-locks">Bitcoin Locks</DocLink>, support liquidity
      supplied through <DocLink to="/docs/asset-rules/argon-bonds">Argon Bonds</DocLink>, and
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

    <p class="my-6">
      <DocLink class="font-semibold" to="/docs/calculators/vaulting">Explore the Vaulting Calculator →</DocLink>
    </p>

    <h2>What a Vault Provides</h2>

    <h3>Bitcoin Cosigning and Cosigner Guarantees</h3>

    <p>
      A vault supplies one of the public keys used to create a Bitcoin Lock and cosigns valid release
      transactions. The Lock owner can choose a Cosigner Guarantee of any supported amount, including
      zero. Locking Bitcoin by itself does not issue ARGN, whether or not a guarantee was selected.
    </p>

    <p>
      A Cosigner Guarantee is ARGN capital committed by the vault to ensure it fulfills
      its Bitcoin cosigning responsibilities. The applicable capital remains held until the vault finishes
      its commitments. A vault can charge a flat fee plus an annualized rate for
      this cosigning service.
    </p>

    <p>
      The guarantee does not protect against Bitcoin price changes or guarantee ARGN’s market value.

    </p>

    <h3>Liquidity Through Argon Bonds</h3>

    <p>
      Argon Bonds supply ARGN capital to the protocol through a selected vault. That capital helps the
      network provide liquidity for
      <DocLink to="/docs/asset-rules/bitcoin-liquids">Bitcoin Liquids</DocLink>. Bond principal
      remains under protocol control and is not transferred to the vault operator.
    </p>

    <p>
      Available bond space is tied to the vault’s ARGN securitization capital. Active Bonds earn from
      their own mining-bid revenue pool and also contribute to the operator’s earnings. Bond and Bitcoin
      contributions are rewarded separately, so a vault does not need to fill its Bitcoin capacity before
      its active Bonds can contribute to revenue. See
      <DocLink to="/docs/asset-rules/argon-bonds">Argon Bonds</DocLink> for position terms and
      eligibility rules.
    </p>

    <h3>Remote Minting Authority</h3>

    <p>
      A vault operator can separately make active ARGN or
      <DocLink to="/docs/asset-rules/argonots">ARGNOT</DocLink> securitization available to
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

    <h2>Operator Alliances <span class="font-light">(Coming Soon)</span></h2>

    <p>
      Planned operator alliances will allow vault operators to borrow unused Securitization or BTC
      from other vaults or operators to help fill their own vaults. Argon Desktop will add tools to
      search for operators and create connections around these resources. See
      <DocLink to="/docs/network-rules/connections">Connections</DocLink> for how alliances will
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

    <p>A vault earns ARGN from two primary sources:</p>

    <ul>
      <li>
        <strong>Mining-Auction Revenue.</strong> Miners pay ARGN for mining seats. The protocol distributes
        part of those winning bids to vault operators for the capital, secured Bitcoin, and liquidity
        they contribute to the network.
      </li>
      <li>
        <strong>Bitcoin Service Fees.</strong> The operator sets a flat fee and an annualized rate for
        providing Cosigner Guarantee capital and cosigning services.
      </li>
    </ul>

    <p>
      A vault that operates as a Remote Minting Authority can also earn authorization tips. Those tips
      are paid in the token being transferred and are separate from mining-bid revenue and Bitcoin fees.
    </p>

    <p>
      The rest of this section will focus on Mining-Auction Revenue, which is the primary way vaults will
      earn during the early stages of Argon's growth.
    </p>

    <h3>Mining-Auction Revenue</h3>

    <p>
      At the end of each frame, the protocol distributes the mining-bid pool recorded in that frame.
      Up to 51% is allocated to vault operators across three earning components:
    </p>

    <aside class="my-8 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-5">
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">Vault Revenue Allocation</div>
      <div class="my-4 rounded-md border border-argon-200 bg-white/60 px-4 py-5 text-center text-xl font-bold text-slate-800 sm:text-2xl">Up to 51% of Mining-Auction Revenue</div>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse font-sans! text-left">
          <thead>
            <tr class="border-b border-argon-200 text-xs tracking-wide text-argon-700 uppercase">
              <th scope="col" class="py-3">Contribution</th>
              <th scope="col" class="px-4 py-3 text-center">Auction Revenue</th>
              <th scope="col" class="py-3 text-left!">What Earns It</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-argon-200">
              <td class="py-4 font-bold text-slate-800 whitespace-nowrap">Argon Securitization</td>
              <td class="px-4 py-4 text-center text-xl font-bold text-argon-700 tabular-nums">5%</td>
              <td class="py-4 text-sm text-slate-600 text-left!">The operator’s committed ARGN collateral.</td>
            </tr>
            <tr class="border-b border-argon-200">
              <td class="py-4 font-bold text-slate-800 whitespace-nowrap">Bitcoin Liquids Participation</td>
              <td class="px-4 py-4 text-center text-xl font-bold text-argon-700 tabular-nums">42.835%</td>
              <td class="py-4 text-sm text-slate-600 text-left!">Bitcoins covered by the vault’s Cosigner Guarantees.</td>
            </tr>
            <tr>
              <td class="py-4 font-bold text-slate-800">Argon Bonds Participation</td>
              <td class="px-4 py-4 text-center text-xl font-bold text-argon-700 tabular-nums">3.165%</td>
              <td class="py-4 text-sm text-slate-600 text-left!">Active ARGN Bond principal supplied through the vault.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </aside>

    <p>
      Vaults earn a proportional share of their pro-rata contribution to the network's Payout Level (see next section).
      All three components are independent of each other. Committing ARGN earns the securitization component, securing
      Bitcoin earns the Bitcoin component, and attracting active Bonds earns the Bond component.
    </p>

    <p>
      For example, a frame with 10,000 ARGN in winning mining bids would allocate up to 500 ARGN for
      Argon Securitization payouts. If the network's Payout Level is 1M
      and your vault has 100K in ARGN Securitization then you would earn
      10%, which is 50 ARGN (20.02% APY).
    </p>

    <p>
      Final payout also includes two multipliers which are applied, both which have their own sections below. The first multiplier
      calculates how much ARGNOT Securitization is in the vault; the other calculates the distribution of capital
      across vaults.
    </p>

    <h3>Payout Level: Network's Shared BTC Target</h3>

    <aside class="my-8 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-5">
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">Shared BTC Target</div>
      <div class="my-4 rounded-md border border-argon-200 bg-white/60 px-4 py-5 text-center text-xl font-bold text-slate-800 sm:text-2xl">BTC @ 50% of ARGN Circulation</div>
      <p class="m-0 text-sm text-slate-600">
        Current circulation is <strong>{{ numeral(argonCirculation / 1_000_000).format('0.0') }}M ARGN</strong>,
        making the shared participation target <strong>{{ numeral(sharedSecuritizationTarget / 1_000_000).format('0.0') }}M ARGN</strong>.
        Actual participation is <strong>{{ numeral(networkBitcoinValue / 1_000_000).format('0.0') }}M ARGN</strong>
        worth of BTC locked across the network's vaults.
      </p>
    </aside>

    <p>
      The shared target is used to calculate each vault’s Argon Securitization,
      Bitcoin Liquids Participation, and Argon Bonds Participation
      payouts. Each contribution is measured separately against the target to determine the vault’s
      pro-rata share of the corresponding mining-auction revenue allocation:
    </p>

    <p>
      Only BTC covered by a Cosigner Guarantee contributes to the Bitcoin component. A Lock
      with zero guarantee does not earn that component. If the market value of all Bitcoin in the vault
      exceeds its ARGN securitization, the Bitcoin component is reduced progressively, reaching a maximum
      reduction of 20% when Bitcoin value is twice the securitization amount.
    </p>

    <ul>
      <li>
        <strong>Argon Securitization:</strong> Committed ARGN collateral determines the vault’s share
        of the 5% allocation.
      </li>
      <li>
        <strong>Bitcoin Liquids Participation:</strong> Qualifying Bitcoin covered by Cosigner
        Guarantees determines the vault’s share of the 42.835% allocation. The shared
        target is converted to BTC using the network’s price feed for this comparison.
      </li>
      <li>
        <strong>Argon Bonds Participation:</strong> Active ARGN Bond principal determines the vault’s
        share of the 3.165% allocation.
      </li>
    </ul>

    <p>
      For example, with 3 million ARGN in circulation, the shared target is
      1.5 million ARGN. A vault committing 150,000 ARGN in securitization contributes
      10% of the target and receives 10% of the 5% payout, equivalent
      to 0.5% of total mining-auction revenue.
    </p>

    <p>
      For each component, participation below the target leaves part of its allocation unearned and
      burned. If total network participation in that component exceeds the target, each vault’s share
      is based on its contribution to that larger total, keeping payouts within the corresponding
      allocation.
    </p>

    <h3>Multiplier: Amount of ARGNOT Securitization</h3>

    <p>
      ARGNOT backing increases a vault’s eligible Bitcoin and Bond earnings. Committing ARGNOT worth up
      to twice the vault’s ARGN securitization provides a capital multiplier of up to <strong>3×</strong>,
      plus an additional bonus of up to <strong>29%</strong>.
    </p>

    <p>
      These multipliers help the vault earn its full eligible share within the <strong>51% mining-bid
      allocation</strong>. They do not increase that allocation or affect the separate ARGN
      securitization component.
    </p>

    <p>
      Committing ARGNOT also increases the operator’s invested capital, so a higher revenue multiplier
      does not translate directly into the same increase in percentage return.
    </p>

    <aside class="my-8 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-5">
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
        ARGNOT Backing Target
      </div>
      <div class="my-4 rounded-md border border-argon-200 bg-white/60 px-4 py-5 text-center text-xl font-bold text-slate-800 sm:text-2xl">
        2× your ARGN securitization value
      </div>
      <p class="m-0 text-sm text-slate-600">
        For 10,000 ARGN in securitization, target ARGNOT worth 20,000 ARGN. The target is measured by
        market value; the number of ARGNOT tokens needed depends on their price. Reaching this target
        fully utilizes ARGNOT backing. Bitcoin and Bond participation still determine the vault’s
        overall earnings.
      </p>
    </aside>

    <h3>Multiplier: Amount of Upstream Distribution</h3>

    <p>
      Your upstream vault is the vault operated by your sponsor. Maintaining eligible Bitcoin and Bond
      positions there helps maximize the Bitcoin Liquids Participation and Argon Bonds Participation
      earnings of your own vault. These upstream positions must belong to your vault account.
    </p>

    <aside class="my-8 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-5">
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">Upstream Participation Targets</div>
      <div class="my-4 rounded-md border border-argon-200 bg-white/60 px-4 py-5 text-center text-xl font-bold text-slate-800 sm:text-2xl">Up to 5,000 Bonds + ₳5,000 in Bitcoin Liquids participation</div>
      <p class="m-0 text-sm text-slate-600">
        Both positions are held in your upstream vault. Each target is limited by the capacity that
        vault can make available to you.
      </p>
    </aside>

    <p>
      Mainchain measures Bitcoin Liquids participation by the ARGN value of Cosigner Guarantee capital
      activated by your funded Bitcoin Locks. Bond participation is measured by active ARGN Bond
      principal. Each side contributes half of your upstream participation score, increasing
      proportionally as you approach its target.
    </p>

    <p>
      With a 90% factor, no participation in either component retains 10% of your otherwise eligible
      Bitcoin and Bond earnings when both
      targets are available. Fully meeting one target with no participation in the other retains 55%,
      and meeting both retains 100%.
      Partial participation scales between these levels. The multiplier applies after the ARGNOT
      adjustments; your ARGN securitization earnings are paid separately.
    </p>

    <p>
      When the upstream vault has less capacity, the corresponding target is reduced. If that adjusted
      target is zero, the component receives full participation credit. Capacity already reserved for
      your unfunded Bitcoin Locks remains included in the Bitcoin target.
      Operators with no upstream vault, or whose upstream vault is closed or inactive, receive the full
      multiplier. Participation is recorded at the start of each frame for that frame’s payout.
    </p>

    <h3>Collecting Revenue</h3>

    <p>
      The operator’s mining-bid earnings and Bitcoin service fees are held pending collection. The
      operator must clear required Bitcoin cosigns and any other duties that block collection, then
      collect within ten frames, approximately ten days. Revenue left uncollected after that window is
      burned. Bond holders’ direct payouts do not use the operator’s collection window.
    </p>

    <p>
      Collected revenue is gross income. Server costs, transaction fees, and other operating expenses
      reduce the operator’s net profit. Revenue collection does not automatically reinvest earnings.
    </p>

    <p>
      See <DocLink to="/docs/network-rules/mining-operations">Mining Operations</DocLink> for the
      auctions that supply this revenue and
      <DocLink to="/docs/system-design/economic-drivers">Economic Drivers</DocLink> for illustrative
      revenue estimates. The calculator uses separate allocation and ARGNOT assumptions.
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
import Data from "@/lib/Data";
import numeral from "@/lib/numeral";
import { microgonToArgon } from "@/lib/currencyUtils";

const argonCirculation = microgonToArgon(Data.basics.microgonsInCirculation.total);
const sharedSecuritizationTarget = argonCirculation * 0.5;
const networkBitcoinValue = Data.basics.vaulting.bitcoinLocked * Data.basics.usdForBtc / Data.basics.usdForArgon;
</script>
