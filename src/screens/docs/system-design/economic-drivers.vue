<template>
  <DocHeader>Economic Drivers</DocHeader>

  <DocContent>
    <aside class="mb-4 rounded-lg border border-amber-300 px-4 py-2 text-amber-950 font-bold">
      NOTE: Some parts of this page document the upcoming release of Argon Mainnet v1.6.
    </aside>

    <p>
      Argon Network’s economic model is designed to function without relying on appreciation in
      the market price of Argon (ARGN) or Argonot (ARGNOT). Instead, it creates an interlocking
      system of Mining Seats, Argonot Stakes, Stabilization Vaults, Argon Bonds, and Bitcoin Liquids.
    </p>

    <p>
      These mechanisms reward participants who operate network infrastructure and commit capital
      to the system. Because no organization or founding entity received pre-mined tokens in
      <DocLink to="/docs/system-design/the-genesis-block">the genesis block</DocLink>,
      rewards are distributed through participation rather than an initial allocation. Costs
      incurred by one participant often become revenue for another, creating a connected,
      closed-loop economic model.
    </p>

    <h2>Three Underlying Assets</h2>
    <p>
      Argon's economic model begins with three assets that perform different
      jobs:
    </p>

    <div class="mt-10 mb-10 flex flex-row gap-4 text-center font-bold">
      <div class="flex w-1/3 flex-col items-center">
        <ArgonIcon class="mb-3 h-16" />
        <div>Argon Stablecoin</div>
        <div class="font-light">ARGN</div>
      </div>
      <div class="flex w-1/3 flex-col items-center">
        <ArgonotIcon class="mb-3 h-16" />
        <div>Argon Ownership Token</div>
        <div class="font-light">ARGNOT</div>
      </div>
      <div class="flex w-1/3 flex-col items-center">
        <BitcoinIcon class="mb-3 h-16" />
        <div>Bitcoin Token</div>
        <div class="font-light">BTC</div>
      </div>
    </div>

    <h3>ARGN Is the Network's Stable Currency</h3>
    <p>
      ARGN is never meant to appreciate in value. It is the stablecoin used for payments,
      mining bids, Argon Bonds, vault capital, and
      Bitcoin Liquids. Its target follows purchasing power, so the
      network expands or contracts its circulating supply as market demand
      changes.
    </p>

    <ArgonStableChart :height="200" class="mt-8 mb-10" />

    <h3>ARGNOT Unlocks Operational Opportunities</h3>
    <p>
      ARGNOT has a fixed maximum supply of 21 million tokens. It is not designed
      to function as a currency or speculative asset. Instead, it supplies the ownership and
      operating keys required to mine, vault, and provide cross-chain services.
    </p>

    <p>
      Its market price rises and falls as the market's perception of these
      opportunities changes. Because ARGNOT is both earned through mining and
      required to compete for mining seats, its price feeds directly into the
      economics of the network.
    </p>

    <ArgonotVolatilityChart :height="200" class="mt-8 mb-10" />

    <h3>Bitcoin Provides Exogenous Stabilization</h3>
    <p>
      Bitcoin remains native to the Bitcoin network, but its value is integrated
      into Argon's economic system through
      <DocLink to="/docs/asset-rules/bitcoin-locks">Bitcoin Locks</DocLink>
      and
      <DocLink to="/docs/asset-rules/bitcoin-liquids">Liquids</DocLink>.
      Bitcoins locked inside the Argon ecosystem gain liquidity and downside-hedging opportunities,
      while vaults gain service revenue and Argon Bond capacity.
    </p>

    <BitcoinVolatilityChart :height="200" class="mt-8 mb-10" />

    <h2 class="pt-5">High-Level Economic Flow</h2>
    <p>
      The following diagram shows how Argonots control operating access, how Argon capital flows, and how token demand
      moves through the economy.
    </p>

    <img src="./images/economic-drivers.png" class="mt-8" />

    <p class="mt-6">
      This page breaks down each item in greater detail, but here's a quick summary:
    </p>

    <ul class="list-disc ml-10">
      <li>
        Mining operators bid ARGN and ARGNOT for Mining Seats. 5-51% of the revenue from
        mining auctions is distributed to Vaults, 15-21% is distributed to Argonot Stakes,
        5-7% to Bonds, and 3-5% to Bitcoin Liquids.
      </li>
      <li>Vaults use ARGN and ARGNOT to securitize Bitcoins. Their earnings from mining auctions are then shared with their Bond holders.</li>
      <li>Argon Bonds contribute liquidity to Bitcoins locked in Vaults, and in return, they earn a share of the Vault's revenue.</li>
      <li>Argonot Stakes let holders lease their tokens to Mining and Vaulting in return for a proportional share of mining seat auction revenue.</li>
      <li>Bitcoins temporarily lock into Argon's Vaults and in exchange receive their full-market value as an unencumbered stablecoin loan.</li>
      <li>The yield-bearing properties of Argonot Stakes, Argon Bonds, and Vault securitization create increased demand cycles within trading markets.</li>
    </ul>

    <h3>The Two Primary Entities</h3>

    <p>
      Mining and Vaulting provide the infrastructure at the center of Argon's economy.
      Miners operate the Argon blockchain, while vault operators connect it to Bitcoin.
      Mining-seat auctions link the two by funding the operators and capital providers
      that support the ecosystem.
    </p>

    <p>
      <strong>Mining</strong> keeps the network running and distributes newly issued
      ARGN and ARGNOT. Operators pay ARGN for a mining seat and commit ARGNOT to qualify
      for access. In return, they produce blocks and earn mining rewards. Their seat
      payments become a source of revenue for the rest of the ecosystem.
    </p>

    <p>
      <strong>Vaulting</strong> brings Bitcoin into Argon's stabilization system.
      Operators commit capital to insure Bitcoin Locks and run the infrastructure
      needed to cosign Bitcoin transactions. Their vaults support Bitcoin liquidity
      and Argon Bonds, earning mining-auction revenue and service fees for that work.
    </p>

    <h3>The Three Supporting Entities</h3>

    <p>
      Stakes, Bonds, and Liquids let token holders participate without running mining
      or vaulting infrastructure themselves. Each connects a different asset to the
      network's operations and receives a share of mining-auction revenue in return.
    </p>

    <p>
      <strong>Argonot Stakes</strong> connect ARGNOT holders to mining operators.
      Holders commit their tokens to supply the operating capital miners need to
      qualify for seats. In return, Stakes earn ARGN from mining-auction revenue,
      allowing holders to put ARGNOT to work without operating a miner.
    </p>

    <p>
      <strong>Argon Bonds</strong> connect ARGN holders to Stabilization Vaults.
      Holders commit stablecoins to supply liquidity for Bitcoin secured by a vault.
      In return, Bonds receive a share of the vault's eligible mining-auction revenue.
      Locked Bitcoin determines the capacity available for this participation.
    </p>

    <p>
      <strong>Bitcoin Liquids</strong> connect Bitcoin holders to Argon's stablecoin
      economy. A holder locks native BTC through a vault and opens a Liquid to access
      spendable ARGN while retaining exposure to Bitcoin. Liquids also receive a share
      of mining-auction revenue, and their closing rules help remove ARGN from
      circulation as part of the network's stabilization process.
    </p>

    <h2>Mining</h2>
    <p>
      Mining is the foundational component of Argon's economic model.
      Operators compete for mining seats by bidding ARGN and committing a
      required amount of ARGNOT. Winning a seat gives the operator a share
      of the network's base mining rewards plus any additional rewards
      created by future growth in ARGN demand.
    </p>

    <p>
      Read
      <DocLink to="/docs/network-rules/mining-operations"
      >Mining Operations</DocLink
      >
      for the auction, cohort, and block-production rules behind the model.
    </p>

    <p class="my-6">
      <DocLink class="font-semibold" to="/docs/calculators/mining">Explore the Mining Calculator →</DocLink>
    </p>

    <h3>Distribution of Auction Revenue</h3>
    <p>
      A winning mining bid is an expense for the miner, but it does not
      disappear. At the end of each frame, the protocol directs the bid pool
      toward the people and capital that support the rest of the network.
    </p>

    <dl class="my-8 border-t border-slate-300">
      <div class="border-b border-slate-300 py-5 sm:flex sm:gap-6">
        <dt class="text-3xl font-bold text-argon-700 sm:w-28 sm:shrink-0">
          5-51%
        </dt>
        <dd class="m-0 mt-2 sm:mt-0">
          <strong class="block text-lg">
            <DocLink to="/docs/network-rules/vaulting-operations">Stabilization Vaults</DocLink>
          </strong>
          Allocated among qualifying vaults according to their amount of securitization. The range is based
          on each vault's locked Bitcoins, securitized Argonots, and bonds generated.
        </dd>
      </div>
      <div class="border-b border-slate-300 py-5 sm:flex sm:gap-6">
        <dt class="text-3xl font-bold text-argon-700 sm:w-28 sm:shrink-0">
          15-21%
        </dt>
        <dd class="m-0 mt-2 sm:mt-0">
          <strong class="block text-lg">
            <DocLink to="/docs/asset-rules/argonot-stakes"
            >Argonot Stakes</DocLink
            >
          </strong>
          Distributed proportionally among the ARGNOT positions supplying
          operating capital to miners. The higher range is based on Profit Surges
          gifted by upstream operators.
        </dd>
      </div>
      <div class="border-b border-slate-300 py-5 sm:flex sm:gap-6">
        <dt class="text-3xl font-bold text-argon-700 sm:w-28 sm:shrink-0">
          5-7%
        </dt>
        <dd class="m-0 mt-2 sm:mt-0">
          <strong class="block text-lg">
            <DocLink to="/docs/asset-rules/argon-bonds"
            >Argon Bonds</DocLink
            >
          </strong>
          Distributed proportionally among the ARGN positions supplying
          liquidity capital to vaults. The higher range is based on Profit Surges
          gifted by upstream operators.
        </dd>
      </div>
      <div class="border-b border-slate-300 py-5 sm:flex sm:gap-6">
        <dt class="text-3xl font-bold text-argon-700 sm:w-28 sm:shrink-0">
          3-5%
        </dt>
        <dd class="m-0 mt-2 sm:mt-0">
          <strong class="block text-lg">
            <DocLink to="/docs/asset-rules/bitcoin-liquids">Bitcoin Liquids</DocLink>
          </strong>
          Distributed proportionally among the BTC positions supplying short positions against
          the ARGN token. The higher range is based on Profit Surges gifted by upstream operators.
        </dd>
      </div>
      <div class="border-b border-slate-300 py-5 sm:flex sm:gap-6">
        <dt class="text-3xl font-bold text-argon-700 sm:w-28 sm:shrink-0">
          10%
        </dt>
        <dd class="m-0 mt-2 sm:mt-0">
          <strong class="block text-lg">
            <DocLink to="/docs/network-rules/market-stabilizers">Market Stabilizers</DocLink>
          </strong>
          Allocated to Uniswap trading pools on Ethereum and other remote networks.
          It incentives liquidity near Argon’s target price to help deepen markets and support price stability.
        </dd>
      </div>
      <div class="border-b border-slate-300 py-5 sm:flex sm:gap-6">
        <dt class="text-3xl font-bold text-argon-700 sm:w-28 sm:shrink-0">
          10%
        </dt>
        <dd class="m-0 mt-2 sm:mt-0">
          <strong class="block text-lg">
            <DocLink to="/docs/network-rules/certification-rewards">Certification Rewards</DocLink>
          </strong>
          This is an experimental fund meant to support the growth of the network. It rewards
          those who become Certified Operators as well as the Operators who onboarded them.
        </dd>
      </div>
    </dl>

    <p>
      The distribution of auction revenue is the primary connection between mining and the other return
      opportunities in Argon. More competition for mining seats can produce higher returns
      for Vaults, Stakes, Bonds, and Liquids.
    </p>

    <h2>Argonot Stakes</h2>
    <p>
      Argonot Stakes let holders commit ARGNOT to a mining operation in exchange
      for a proportional share of its mining-bid revenue. The protocol holds the
      ARGNOT principal, so the miner never takes custody of it. When a Stake
      completes its release period, the ARGNOT becomes available to its owner
      again.
    </p>

    <p>
      Read
      <DocLink to="/docs/asset-rules/argonot-stakes">Argonot Stakes</DocLink>
      for position sizes, miner selection, revenue distributions, and release
      rules.
    </p>

    <p class="my-6">
      <DocLink class="font-semibold" to="/docs/calculators/argonot-stakes">Explore the Argonot Stakes Calculator →</DocLink>
    </p>

    <h2>Vaulting</h2>
    <p>
      Stabilization Vaults connect Bitcoin activity with the revenue generated
      by mining-seat auctions. A vault operator commits ARGN, can add ARGNOT
      securitization, provides Bitcoin cosigning infrastructure, and creates
      capacity for Bitcoin Locks and Argon Bonds.
    </p>

    <p>
      The vaulting economy receives 65% of mining-bid revenue. Under the standard
      allocation, as much as 51% can be retained by vault operators, 5% is
      shared with Argon Bond holders, and 3% is shared with Bitcoin Liquids.
      Vault operators can offer Bonds and Liquids a larger share, but any
      increase comes out of the operator's portion.
    </p>

    <p>A vault can earn ARGN from two primary sources:</p>

    <ul class="list-disc ml-10">
      <li>
        <strong>Mining-bid revenue</strong> earned according to the vault's
        committed capital and the utilization of its Bitcoin and Bond capacities.
      </li>
      <li>
        <strong>Bitcoin service fees</strong> charged for the vault's insurance
        capital and cosigning work. We expect this to be minimal, at least during
        the early days of the network. Therefore we opted to leave this revenue
        out of any economic projections.
      </li>
    </ul>

    <p>
      Bitcoin utilization is the primary driver of vaulting returns. ARGNOT can
      provide an additional bonus after Bitcoin is locked, while purchased Argon
      Bonds provide a smaller final increase. The percentage offered to capital
      providers determines how the resulting revenue is divided between them and
      the operator.
    </p>

    <p class="my-6">
      <DocLink class="font-semibold" to="/docs/calculators/vaulting">Explore the Vaulting Calculator →</DocLink>
    </p>

    <p>
      Read
      <DocLink to="/docs/network-rules/vaulting-operations"
        >Vaulting Operations</DocLink
      >
      for the complete revenue formula, capital requirements, insurance rules,
      and ongoing operator responsibilities.
    </p>

    <h2>Argon Bonds</h2>
    <p>
      Argon Bonds let ARGN holders supply liquidity capital to a Stabilization
      Vault and participate in its revenue without operating the vault
      themselves. Each Bond commits one ARGN to a selected vault. The protocol
      holds the principal, so the vault operator never takes custody of it, and
      returns the ARGN after the position completes its release period.
    </p>

    <p>
      A Bond earns the percentage of eligible vaulting revenue offered when its
      position was created. Revenue eligibility is tied to the ARGN market value
      of Bitcoin secured by the vault, so adding Bonds alone does not create an
      unlimited claim on mining-bid revenue.
    </p>

    <p>
      Read
      <DocLink to="/docs/asset-rules/argon-bonds"
        >Argon Bonds</DocLink
      >
      for position capacity, earnings, and release rules.
    </p>

    <p class="my-6">
      <DocLink class="font-semibold" to="/docs/calculators/argon-bonds">Explore the Argon Bonds Calculator →</DocLink>
    </p>

    <h2>Bitcoin Liquids</h2>
    <p>
      Bitcoin Liquids bring an asset from outside Argon into this return system. A Bitcoin holder can keep BTC in a native multisig Lock and create
      an optional Liquid to receive spendable ARGN against its value. The holder
      retains exposure to Bitcoin while gaining liquidity without selling it.
    </p>

    <p>
      Read <DocLink to="/docs/asset-rules/bitcoin-liquids">Bitcoin Liquids</DocLink>
      for liquidity, ratcheting, revenue, and release rules.
    </p>

    <p class="my-6">
      <DocLink class="font-semibold" to="/docs/calculators/bitcoin-liquids">Explore the Bitcoin Liquids Calculator →</DocLink>
    </p>

    <h2>The Economic Flywheel</h2>
    <p>
      Argon's return opportunities reinforce one another. Increased demand for
      ARGN can increase mining rewards. Greater mining value can support more
      competition and larger bids. Those bids fund Argonot Stakes, operator
      onboarding, Stabilization Vaults, and Argon Bonds. The resulting capital
      and infrastructure make it possible to support more Bitcoin and more
      network activity.
    </p>

    <EconomicFlywheel />

    <p>
      In this way, the network does not need ARGN itself to become a speculative
      asset. Its economy is driven by recurring demand for useful currency,
      scarce operational access, independent infrastructure, and productive
      capital. The linked calculators make those relationships visible by
      letting one variable flow through the opportunities that follow it.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import ArgonIcon from "@/assets/logo.svg?component";
import ArgonotIcon from "@/assets/argonot.svg?component";
import BitcoinIcon from "@/assets/bitcoin.svg?component";
import ArgonStableChart from "@/components/ArgonStableChart.vue";
import ArgonotVolatilityChart from "@/components/ArgonotVolatilityChart.vue";
import BitcoinVolatilityChart from "@/components/BitcoinVolatilityChart.vue";
import EconomicFlywheel from "@/components/EconomicFlywheel.vue";
</script>

<style scoped>
@import "../../../main.css";
</style>
