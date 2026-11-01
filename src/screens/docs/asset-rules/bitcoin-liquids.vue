<template>
  <DocHeader>Bitcoin Liquids</DocHeader>

  <DocContent>
    <p>
      A Bitcoin Liquid is an onchain financial position that lets the owner of a
      <DocLink to="/docs/asset-rules/bitcoin-locks"
        >Bitcoin Lock</DocLink
      >
      receive Argon stablecoins against the market value of their BTC. The
      Liquid does not move the Bitcoin or replace it with a wrapped token.
    </p>

    <p>
      In addition to creating liquidity from their Bitcoin, a Liquid provides protection for the Bitcoin owner
      if BTC's market price falls. It also allows the owner to capture a share of the network's mining revenue
      as well as price movements through ratcheting.
    </p>

    <p>
      Argon Network benefits from these Liquids due to their obligations to burn ARGN when the Liquid is released.
      Their curve formula creates a short position against ARGN that ensures
      ARGN's market price cannot fall without a rebound.
    </p>

    <section
      class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40"
    >
      <header
        class="border-b border-slate-300 bg-slate-100/70 px-5 py-3 text-sm font-bold tracking-wide text-slate-600 uppercase"
      >
        Liquid Requirements
      </header>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4">
        <div class="border-b border-slate-300 p-5 sm:border-r lg:border-b-0">
          <div class="text-2xl font-bold text-argon-600">An Active, Funded Lock</div>
          <div class="mt-1 text-sm text-slate-600">
            The underlying BTC must be in a confirmed Lock position.
          </div>
        </div>
        <div class="border-b border-slate-300 p-5 lg:border-r lg:border-b-0">
          <div class="text-2xl font-bold text-argon-600">Full Cosigner Guarantee</div>
          <div class="mt-1 text-sm text-slate-600">
            The Vault must supply a Guarantee equal to the full market value.
          </div>
        </div>
        <div class="border-b border-slate-300 p-5 sm:border-r sm:border-b-0">
          <div class="text-2xl font-bold text-argon-600">Agreement to Repay ARGN</div>
          <div class="mt-1 text-sm text-slate-600">
            The BTC must fully repay the required ARGN when releasing.
          </div>
        </div>
        <div class="p-5">
          <div class="text-2xl font-bold text-argon-600">The BTC Stays Locked</div>
          <div class="mt-1 text-sm text-slate-600">
            The multisig of UTXO ensures rules are fully followed.
          </div>
        </div>
      </div>
    </section>

    <p class="my-6">
      <DocLink class="font-semibold" to="/docs/calculators/bitcoin-liquids">Explore the Bitcoin Liquids Calculator →</DocLink>
    </p>

    <h2>What The User Receives</h2>
    <p>
      The user receives the full market value of the BTC held in their
      Liquid. It's paid out in ARGN which the user can deploy however they want
      (there are no limitations). These ARGN are minted according to the following rules:
    </p>

    <ol class="list-decimal">
      <li>
        <strong>10% per frame over ten frames.</strong> Each frame can mint 10%
        of the original promised amount, until the full amount has been paid.
      </li>
      <li>
        <strong>Minting only happens at or above target.</strong> New ARGN are
        minted only when Argon's market price is at or above its target price.
      </li>
      <li>
        <strong>ARGN is guaranteed regardless of price.</strong>
        Although minting pauses when ARGN is below target, unpaid amount stays
        queued until minting resumes.
      </li>
    </ol>

    <p>
      The ten-frame schedule depends on minting conditions. Price pauses and
      limits on available mining issuance can extend the time needed to receive
      the full amount. See
      <DocLink to="/docs/system-design/stabilization-algorithms#expand-supply-when-price-is-above-target">Stabilization Algorithms</DocLink>
      for the network's issuance controls.
    </p>

    <p>
      In addition to receiving ARGN equal to the full market price of their BTC, Liquids also earn
      <a href="#earning-yield-from-mining-revenue">yield from mining revenue</a>
      and capture
      <a href="#capturing-price-movements-through-ratcheting">price movements through ratcheting</a>.
      The returns vary with network revenue, the vault's terms, Bitcoin's
      price path, and fees.
    </p>

    <h2>What The User Gives</h2>
    <p>
      In exchange for receiving ARGN, the user agrees to burn the release
      amount calculated by the protocol when they release the Liquid. The
      supporting BTC remains in its multisig Lock until that obligation is
      settled. If the user spends or sells the ARGN they receive, they must
      obtain the required ARGN before releasing the position.
    </p>

    <p>
      The release amount can change. Its base is the lower of the allocated
      Bitcoin's current value and the Liquid's recorded valuation, expressed
      in ARGN at target. Ratcheting updates the recorded valuation, and a
      redemption curve adjusts the final ARGN amount according to Argon's
      market price relative to target. The sections below explain the
      commitment:
    </p>

    <ul>
      <li>
        <a href="#calculating-the-release-amount">Calculating the Release Amount</a>
        explains the valuation and curve that determine how many ARGN must be
        burned.
      </li>
      <li>
        <a href="#protection-when-bitcoins-price-falls">Protection When Bitcoin's Price Falls</a>
        explains how a decline in BTC's value can lower the release base.
      </li>
      <li>
        <a href="#short-positions-against-argn">Short Positions Against ARGN</a>
        explains how ARGN's price affects the token amount and market cost of
        settling the obligation.
      </li>
      <li>
        <a href="#releasing-a-liquid-and-moving-bitcoin">Releasing a Liquid and Moving Bitcoin</a>
        explains how settling the Liquid allows the owner to begin the
        separate Bitcoin Lock release process.
      </li>
    </ul>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="block mb-1">A Liquid Is a Position, Not a Token</strong>
      <p class="m-0!">
        The owner receives ordinary ARGN. “Bitcoin Liquid” refers to the
        recorded relationship between that ARGN and a Bitcoin Lock; it is not a
        separate currency that can be transferred independently.
      </p>
    </aside>

    <h2>Protection When Bitcoin's Price Falls</h2>
    <p>
      If Bitcoin falls below the Liquid's recorded valuation, the base used to
      calculate its release amount falls with it. The owner has already
      received liquidity at the earlier valuation but can release the Liquid against the lower current value. The difference helps offset the decline in the
      Bitcoin allocated to the Liquid.
    </p>

    <section class="my-8 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-4">
      <h3 class="mt-0!">Example: Bitcoin Falls From $100,000 to $70,000</h3>
      <p>
        Suppose a Liquid allocates 1 BTC at $100,000 and receives 100,000 ARGN.
        ARGN's target and market price both remain $1, and the owner keeps that
        liquidity available. Bitcoin then falls to $70,000 without a ratchet.
      </p>
      <ul>
        <li>Releasing the Liquid burns 70,000 ARGN.</li>
        <li>The owner retains the remaining 30,000 ARGN, worth $30,000.</li>
        <li>The owner still has 1 BTC, now worth $70,000.</li>
      </ul>
      <p class="mb-0!">
        The combined value is $100,000 before fees, compared with $70,000 for
        simply holding that Bitcoin. The retained liquidity offsets the
        $30,000 decline under these assumptions.
      </p>
    </section>

    <p>
      This protection applies to the Bitcoin participating in the Liquid and
      depends on the liquidity actually received, its subsequent use, ARGN's
      price, and fees. An owner who spends the proceeds must obtain ARGN to release the Liquid. The Cosigner Guarantee addresses defined vault cosigning
      failures; the price protection comes from the Liquid's release rules.
    </p>

    <h2>Capturing Price Movements Through Ratcheting</h2>
    <p>
      A ratchet updates an existing Liquid's recorded Bitcoin valuation while
      the BTC remains in its Lock. An upward ratchet makes additional ARGN
      eligible for distribution. A downward ratchet resets the position to a
      lower valuation, allowing a later recovery to create another opportunity
      for additional liquidity.
    </p>

    <p>
      Ratcheting must meet the protocol's minimum price-change requirement and
      the vault's guarantee requirements. A downward ratchet can require ARGN
      to be burned before replacement liquidity is distributed. Additional
      payouts remain subject to the network's distribution rules, and fees
      reduce the benefit of frequent ratchets.
    </p>

    <h3>How the Return Model Captures Ratchet Profits</h3>
    <p>
      The <DocLink to="/docs/calculators/bitcoin-liquids">Bitcoin Liquids Calculator</DocLink>
      replays Bitcoin prices with a selected ratchet threshold. It models full
      liquidity from an upward move until cumulative ARGN received reaches the
      Bitcoin's current value, then 50% liquidity for the remaining increase.
    </p>

    <section class="my-8 rounded-lg border border-slate-300 bg-white/40 px-5 py-5">
      <h3 class="mt-0!">Modeled Example: A Drop Followed by a Recovery</h3>
      <p>
        Start with 1 BTC at $100,000 and 100,000 ARGN received. Assume ARGN
        remains at a $1 target and market price, all payouts complete, and fees
        are excluded. Ratchet down when Bitcoin reaches $80,000, then ratchet
        up when it recovers to $100,000.
      </p>
      <p>
        In this model, the downward reset adds no net liquidity. On recovery,
        cumulative receipts already equal Bitcoin's $100,000 current value,
        so the $20,000 upward move provides 50% liquidity: another 10,000 ARGN.
        Total net receipts become 110,000 ARGN.
      </p>
      <p class="mb-0!">
        Releasing the Liquid at the restored 100,000-ARGN valuation leaves
        10,000 ARGN plus the original BTC. That is $10,000 of modeled profit before fees even
        though Bitcoin finishes at its starting price. New liquidity alone is
        not the profit: the release obligation must also be accounted for.
      </p>
    </section>

    <p>
      A ratchet also changes the valuation used for subsequent releases. The
      model illustrates one price path; actual results depend on the path,
      available guarantee capacity, distribution timing, and transaction costs.
      Use the
      <DocLink to="/docs/system-modeling/llb">Liquid Locking for Bitcoin model</DocLink>
      to explore historical prices, ratchets, and hypothetical ARGN price drops.
    </p>

    <h2>Earning Yield From Mining Revenue</h2>
    <p>
      Eligible Liquids also earn ARGN from the proceeds of winning mining-seat
      bids. Under the revenue allocation described in
      <DocLink to="/docs/system-design/economic-drivers">Economic Drivers</DocLink>,
      Liquids collectively receive a standard 3% of eligible vaulting revenue.
      A vault operator can offer as much as 5%, with the additional share
      coming out of the operator's allocation.
    </p>

    <RevenueShareBox :base-share="3" :profit-surge="2" :throttle-apy="100">
      <template #title>Bitcoin Liquids</template>
    </RevenueShareBox>

    <p>
      The reserve carries earnings from stronger mining periods into weaker
      ones. When revenue falls, saved earnings supplement current payouts to
      help sustain returns at the throttle level while reserves remain
      available. Returns can still exceed that level.
    </p>

    <p>
      An individual position receives its proportional share of the eligible
      revenue pool. The revenue-share percentage is not an annual return on
      its Bitcoin's value.
    </p>

    <p>
      For example, 100,000 ARGN of eligible revenue at a 3% Liquid allocation
      produces a 3,000-ARGN pool. A position with 1% of the eligible
      participation receives 30 ARGN from that distribution. A 5% allocation
      would produce a 5,000-ARGN pool and 50 ARGN for the same participation.
      These amounts are before any reduction on the portion above the APY
      threshold.
    </p>

    <p>
      For example, suppose a position's normal distribution is 30 ARGN, and
      20 ARGN corresponds to its 100% APY threshold for that distribution
      period. It receives the full 20 ARGN plus half of the remaining 10 ARGN,
      for a total of 25 ARGN.
    </p>

    <p>
      Yield changes with mining bids, the vault's revenue-sharing terms,
      eligible Bitcoin participation, and the size of the position relative to
      other participants. ARGNOT's market price, growth in ARGN circulation,
      and miners' expected returns can affect what miners bid. The
      <DocLink to="/docs/calculators/bitcoin-liquids">Bitcoin Liquids Calculator</DocLink>
      combines projected mining earnings with modeled
      ratchet profits to estimate an annual return; its 3%–5% revenue share
      should not be read as a promised APR.
    </p>

    <h2>Short Positions Against ARGN</h2>
    <p>
      A Liquid receives ARGN now and carries an obligation to burn ARGN later.
      If the owner sells or spends the received Argons, they must obtain them
      again to release the Liquid. A lower ARGN market price can make those
      purchases less expensive. This is the economic short position that Bitcoin
      Liquids supply against ARGN.
    </p>

    <p>
      The redemption curve adjusts how many Argons must be burned as their
      market price falls below target. A deeper decline can require more
      Argons while still reducing their total purchase cost. Buying those
      Argons adds demand, and burning them when the Liquid is released reduces
      circulation. Together, these actions support Argon's return toward its
      target price.
    </p>

    <p>
      Holding the original ARGN offsets the exposure created by selling or
      spending it, but those tokens may not cover the entire release amount
      after the curve changes. Releasing a Liquid can also become more expensive if ARGN
      trades above target. The opportunity depends on the release quote and
      the prices at which the owner can actually acquire the required tokens.
    </p>

    <h2>Calculating the Release Amount</h2>
    <p>
      The following algorithm determines how many Argons are needed to release a
      Bitcoin Liquid. It uses only the BTC allocated to that Liquid, rather
      than all the Bitcoin in the underlying Lock.
    </p>

    <div class="my-8 w-full max-w-full overflow-hidden rounded-lg border border-gray-400 bg-white/30 px-3 py-5 sm:px-5">
      <MathFormula
        label="Bitcoin Liquid release amount and market purchase cost"
        class="text-base sm:text-lg"
        source="\begin{aligned}
          r &amp;= \frac{A_m}{A_t} \\[1em]
          V_c &amp;= \frac{qP_{\mathrm{BTC}}}{A_t} \\[1em]
          b &amp;= \min(V_c, V_r) \\[1em]
          U(r,b) &amp;= \begin{cases}
            b &amp; \text{if } r \ge 1 \\[0.6em]
            b(20r^2 - 38r + 19) &amp; \text{if } 0.90 \le r &lt; 1 \\[0.6em]
            b\left(\dfrac{0.5618r + 0.3944}{r}\right) &amp; \text{if } 0.01 \le r &lt; 0.90 \\[0.6em]
            \dfrac{b}{r}(0.576r + 0.4) &amp; \text{if } 0 &lt; r &lt; 0.01
          \end{cases} \\[1em]
          C &amp;= U A_m
        \end{aligned}"
      />
      <ul class="mb-0 text-sm text-slate-600">
        <li>
          A<sub>m</sub> is ARGN's current market price and A<sub>t</sub> is its
          purchasing-power target price. Their ratio r measures the deviation
          from target.
        </li>
        <li>
          q is the number of BTC allocated to the Liquid, and
          P<sub>BTC</sub> is the current price per Bitcoin. All quoted prices
          use the same currency, such as USD.
        </li>
        <li>
          V<sub>c</sub> is that BTC's current value expressed in ARGN at target.
          V<sub>r</sub> is its recorded valuation in target-denominated ARGN,
          established at creation or the latest ratchet. The smaller value
          becomes the base b.
        </li>
        <li>
          U is the number of ARGN to burn. C is the market cost of purchasing
          them in the quote currency, before fees and trading costs.
        </li>
      </ul>
    </div>

    <p>
      At target, U equals b. Bitcoin appreciation alone does not increase b
      above the recorded valuation, while a price decline can lower it.
      Ratcheting changes the recorded valuation itself. Below target, the
      curve changes U, so the final ARGN count can exceed b. The protocol
      calculates the burn in microgons, with rounding at that precision.
    </p>

    <div class="my-8 overflow-x-auto rounded-lg border border-slate-300 bg-white/40">
      <table class="m-0 w-full text-sm">
        <caption class="px-4 py-3 text-left font-bold text-slate-800">
          Releasing a Liquid With a 100,000-ARGN Base
        </caption>
        <thead class="border-y border-slate-300 bg-slate-100/70">
          <tr>
            <th class="px-4 py-3 text-left">ARGN market price</th>
            <th class="px-4 py-3 text-right">ARGN burned</th>
            <th class="px-4 py-3 text-right">Market purchase cost</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr>
            <td class="px-4 py-3">$1.00</td>
            <td class="px-4 py-3 text-right">100,000</td>
            <td class="px-4 py-3 text-right">$100,000</td>
          </tr>
          <tr>
            <td class="px-4 py-3">$0.95</td>
            <td class="px-4 py-3 text-right">95,000</td>
            <td class="px-4 py-3 text-right">$90,250</td>
          </tr>
          <tr>
            <td class="px-4 py-3">$0.80</td>
            <td class="px-4 py-3 text-right">105,480</td>
            <td class="px-4 py-3 text-right">$84,384</td>
          </tr>
          <tr>
            <td class="px-4 py-3">$0.20</td>
            <td class="px-4 py-3 text-right">253,380</td>
            <td class="px-4 py-3 text-right">$50,676</td>
          </tr>
          <tr>
            <td class="px-4 py-3">$0.005</td>
            <td class="px-4 py-3 text-right">8,057,600</td>
            <td class="px-4 py-3 text-right">$40,288</td>
          </tr>
          <tr>
            <td class="px-4 py-3">$0.001</td>
            <td class="px-4 py-3 text-right">40,057,600</td>
            <td class="px-4 py-3 text-right">$40,057.60</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      These examples keep b fixed at 100,000 ARGN and the target at $1. They
      assume the required ARGN can be purchased at the displayed market price
      and exclude fees. At $0.80, the owner needs 105,480 ARGN but pays $84,384
      to acquire them. If the original 100,000 ARGN had been sold for $100,000,
      releasing the Liquid leaves $15,616 of those proceeds before fees, while
      freeing the BTC from its Liquid obligation.
    </p>

    <p>
      This price-sensitive burn is part of the supply-contraction mechanism
      described in
      <DocLink to="/docs/system-design/stabilization-algorithms">Stabilization Algorithms</DocLink>.
      The wallet's current release quote reflects the position and the
      protocol's current price inputs.
    </p>

    <h2>The Life of a Bitcoin Liquid</h2>

    <ol class="my-8 ml-0! grid list-none gap-3 p-0 md:grid-cols-2">
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >1</span
          >
          <strong class="text-lg">Prepare the Lock</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Start with confirmed BTC in a Bitcoin Lock and enough unused guarantee
          capacity for the desired Liquid amount.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >2</span
          >
          <strong class="text-lg">Create</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Choose an amount within the Lock's capacity and submit the Liquid. The
          position records its ARGN amount and release terms.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >3</span
          >
          <strong class="text-lg">Use the Argons</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          ARGN distributed from the Liquid is ordinary spendable currency. The
          BTC remains inside its Lock while the position is open.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >4</span
          >
          <strong class="text-lg">Release</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Acquire and burn the required ARGN to release the Liquid. Its Bitcoin
          remains locked until the owner separately requests release.
        </p>
      </li>
    </ol>

    <h2>Releasing a Liquid and Moving Bitcoin</h2>
    <p>
      Releasing a Liquid settles its ARGN obligation and frees the guarantee
      capacity used by the position. It does not spend the Bitcoin UTXO. The
      owner may leave the BTC in the App Wallet or begin the separate Bitcoin
      Lock release process.
    </p>

    <p>
      Likewise, releasing a Bitcoin Lock cannot bypass an open Liquid. The App
      Wallet must release the position before it can construct and submit the
      Bitcoin release transaction.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import MathFormula from "@/components/MathFormula.vue";
import RevenueShareBox from "@/components/RevenueShareBox.vue";
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
