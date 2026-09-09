<template>
  <DocHeader>Economic Drivers</DocHeader>

  <DocContent v-if="isLoaded">
    <aside class="mb-4 rounded-lg border border-amber-300 px-4 py-2 text-amber-950 font-bold">
      NOTE: This page documents the upcoming release of Argon Mainnet v1.5.
    </aside>

    <p>
      Argon Network’s economic model is designed to function without relying on appreciation in
      the market price of Argon (ARGN) or Argonot (ARGNOT). Instead, it creates an interlocking
      system of Mining Seats, Argonot Stakes, Stabilization Vaults, Argon Bonds, and Bitcoin Liquid Locking.
    </p>

    <p>
      These mechanisms reward participants who operate network infrastructure and commit capital
      to the system. Because no organization or founding entity received pre-mined tokens in
      <DocLink to="/docs/system-design/the-genesis-block">the genesis block</DocLink>,
      rewards are distributed through participation rather than an initial allocation. Costs
      incurred by one participant often become revenue for another, creating a connected,
      closed-loop economic model.
    </p>

    <aside class="mb-8 rounded-lg border border-amber-300 bg-amber-50 px-5 pt-4 text-amber-950">
      <strong class="mb-1 block">Academic Illustrations Only</strong>
      <p class="m-0">
        This page uses current network data and adjustable models to illustrate
        how value moves through Argon's economy. It does not predict future
        market prices or imply any specific return.
      </p>
    </aside>

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
      Bitcoin Liquid Locking. Its target follows purchasing power, so the
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
      opportunities change. Because ARGNOT is both earned through mining and
      required to compete for mining seats, its price feeds directly into the
      economics of the network.
    </p>

    <ArgonotVolatilityChart :height="200" class="mt-8 mb-10" />

    <h3>Bitcoin Provides Exogenous Stabilization</h3>
    <p>
      Bitcoin remains native to the Bitcoin network, but its value is integrated
      into Argon's economic system through
      <DocLink to="/docs/assets-and-entities/bitcoin-locks">Bitcoin Locks</DocLink>
      and
      <DocLink to="/docs/assets-and-entities/bitcoin-locks">Liquids</DocLink>.
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
      <li>Mining operators bid ARGN and ARGNOT for Mining Seats. 15% of the revenue from those mining auctions is distributed to Argonot Stakes and 65% is distributed to Vaults, Bonds, and Bitcoin Liquids.</li>
      <li>Vaults use ARGN and ARGNOT to securitize Bitcoins. Their earnings from mining auctions are then shared with their Bond holders.</li>
      <li>Argon Bonds contribute liquidity to Bitcoins locked in Vaults, and in return, they earn a share of the Vault's revenue.</li>
      <li>Argonot Stakes let holders lease their tokens to Mining and Vaulting in return for a proportional share of of mining seat auction revenue.</li>
      <li>Bitcoins temporarily lock into Argon's Vaults and in exchange receive their full-market value as a unencumbered stablecoin loan.</li>
      <li>The yield-bearing properties of Argonot Stakes, Argon Bonds, and Vault securitization creates increased demand cycles within trading markets.</li>
    </ul>

    <h2>Mining</h2>
    <p>
      Mining is the foundational component of Argon's economic model.
      Operators compete for mining seats by bidding ARGN and committing a
      required amount of ARGNOT. Winning a seat gives the operator a share
      of the network's base mining rewards plus any additional rewards
      created by future growth in ARGN demand.
    </p>

    <p>
      The following calculator starts with the network's current pricing. Adjust
      the sliders to control expected return, growth in ARGN circulation, and ARGNOT's market
      price. Go to <DocLink to="/docs/assets-and-entities/mining-operations">Mining Operations</DocLink>
      to better understand the details of how the bidding and mining process works.
    </p>

    <MiningCalculator />

    <p>
      The above calculator uses ten-day returns because each mining seat lasts approximately ten days. Annual Percentage
      Rate is also shown to make it easier to compare with more familiar assets. For example, the average return of
      Warren Buffet's Berkshire Hathaway is {{ averageBerkshireHathawayAPY }}% APY over the last six decades.
    </p>

    <h3>The Three Variables that Drive Mining Returns</h3>

    The circled numbers on the left-side of the calculator highlight the three primary variables
    that drive mining returns.

    <h4>1. Bid Price</h4>
    <p>
      The ARGN in a winning bid is the price paid for a mining seat. The ARGNOT
      is committed operating capital and returns after the term. A lower winning
      bid leaves more of the immutable base rewards as potential profit, while
      competition for seats can push bids higher.
    </p>

    <h4>2. Growth in ARGN Demand</h4>
    <p>
      When market demand moves ARGN above its target, the stabilization
      algorithm makes additional ARGN issuance available to miners. Greater
      circulation growth can therefore increase a seat's output beyond its
      immutable base rewards.
    </p>

    <h4>3. ARGNOT's Market Price</h4>
    <p>
      A mining term produces ARGNOT as well as ARGN. Changes in ARGNOT's market
      value affect the final value of those rewards and of the ARGNOT committed
      to the seat. This creates a direct connection between demand for
      operational access and the economics of mining.
    </p>

    <p>
      Read
      <DocLink to="/docs/assets-and-entities/mining-operations"
        >Mining Operations</DocLink
      >
      for the auction, cohort, and block-production rules behind the model.
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
          1-57%
        </dt>
        <dd class="m-0 mt-2 sm:mt-0">
          <strong class="block text-lg">
            <DocLink to="/docs/assets-and-entities">Stabilization Vaults</DocLink>
          </strong>
          Allocated among qualifying vaults according to their amount of securitization. The range is based
          on each vault's locked Bitcoins, securitized Argonots, and bonds generated.
        </dd>
      </div>
      <div class="border-b border-slate-300 py-5 sm:flex sm:gap-6">
        <dt class="text-3xl font-bold text-argon-700 sm:w-28 sm:shrink-0">
          0-20%
        </dt>
        <dd class="m-0 mt-2 sm:mt-0">
          <strong class="block text-lg">
            <DocLink to="/docs/assets-and-entities/operational-rewards-pool"
            >Expansion Rewards Pool</DocLink
            >
          </strong>
          This is an experimental fund meant to support the growth of the network. The
          range is based on viable uses. Any capital not used is burned from the ecosystem.
        </dd>
      </div>
      <div class="border-b border-slate-300 py-5 sm:flex sm:gap-6">
        <dt class="text-3xl font-bold text-argon-700 sm:w-28 sm:shrink-0">
          15-21%
        </dt>
        <dd class="m-0 mt-2 sm:mt-0">
          <strong class="block text-lg">
            <DocLink to="/docs/assets-and-entities/argonot-stakes"
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
            <DocLink to="/docs/assets-and-entities/argonot-stakes"
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
            <DocLink to="/docs/assets-and-entities">Bitcoin Liquids</DocLink>
          </strong>
          Distributed proportionally among the BTC positions supplying short positions against
          the ARGN token. The higher range is based on Profit Surges gifted by upstream operators.
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
      The following calculator models how mining economics, Stake participation,
      and ARGNOT's market price can affect returns. It begins with current Mainnet
      data, but its results are illustrations rather than predictions.
    </p>

    <StakesCalculator />

    <p>
      The Expected Ten Day Return compares a Stake's modeled ARGN earnings with
      the market value of its ARGNOT principal. Expected APY annualizes that
      ten-day return under the assumption that the same conditions continue and
      earnings are repeatedly reinvested. Stake earnings do not compound
      automatically, and actual bids, participation, prices, and Profit Surges can
      all change.
    </p>

    <h3>The Five Variables that Drive Staking Returns</h3>

    <h4>1. ARGNOT Market Price</h4>
    <p>
      Stake earnings are paid in ARGN, while each Stake requires one ARGNOT.
      If mining revenue remains unchanged, a higher ARGNOT price produces a lower
      percentage return. However, ARGNOT is also part of the value produced by a
      mining seat, so a higher price can support larger mining bids and increase
      the revenue distributed to Stakes.
    </p>

    <h4>2. Growth In Argon Circulation</h4>
    <p>
      Growth in Argon circulation creates additional ARGN mining rewards. Those
      rewards increase the value produced by each mining seat, allowing operators
      to submit larger bids and increasing the revenue available to Stakes.
    </p>

    <h4>3. Expected Return Per Mining Seat</h4>
    <p>
      Mining operators bid according to the value they expect a seat to produce.
      Accepting a lower mining return allows a larger bid, while requiring a higher
      return reduces the amount an operator can bid. Larger winning bids create
      more revenue for Argonot Stakes.
    </p>

    <h4>4. Percent of ARGNOT Staked</h4>
    <p>
      Up to 60% of circulating ARGNOT can participate in active Stakes. Each Stake
      receives a proportional share of the available revenue, so returns per Stake
      decrease as more ARGNOT participates and increase as participation falls.
    </p>

    <h4>5. Payout From the Mining Pool</h4>
    <p>
      Argonot Stakes receive a standard 15% allocation from mining-bid revenue.
      Mining operators can increase this allocation through Profit Surges, raising
      the payout as high as 21%.
    </p>

    <p>
      Read
      <DocLink to="/docs/assets-and-entities/argonot-stakes">Argonot Stakes</DocLink>
      for position sizes, miner selection, revenue distributions, and release
      rules.
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
      allocation, as much as 57% can be retained by vault operators, 5% is
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

    <p>
      The following calculator begins with current network data and lets you
      explore how operator capital, Bitcoin utilization, bond participation,
      market conditions, and revenue-sharing affects a vault's possible
      returns.
    </p>

    <VaultingCalculator />

    <p>
      The footer compares the operator's invested capital with its estimated
      ten-day revenue. The annualized yield assumes the same conditions continue
      and that earnings are repeatedly reinvested; it is an illustration rather
      than a prediction.
    </p>

    <h3>The Nine Variables that Shape Vaulting Returns</h3>

    <p>
      The circled numbers on the left side of the calculator identify the nine
      inputs that shape the vault's revenue and percentage return.
    </p>

    <h4>1. ARGNOT Market Price</h4>
    <p>
      ARGNOT is part of the value produced by mining and committed in mining
      bids. A change in its market price changes mining-seat economics, which can
      change the ARGN bid revenue available to vaults.
    </p>

    <h4>2. Growth In Argon Circulation</h4>
    <p>
      Growth in Argon circulation creates additional ARGN mining rewards. Those
      rewards increase the value produced by each mining seat, allowing operators
      to submit larger bids and increasing the revenue available to vaults.
    </p>

    <h4>3. Expected Return Per Mining Seat</h4>
    <p>
      Mining operators bid according to the return they expect a seat to
      produce. Accepting a lower mining return supports a larger bid and creates
      more revenue for vaulting, while requiring a higher return reduces the bid.
    </p>

    <h4>4. Initial ARGN Securitization</h4>
    <p>
      Initial ARGN securitization establishes the vault's Bitcoin capacity. The
      protocol compares it with the network's desired Bitcoin space to determine
      the vault's share of eligible mining-bid revenue. Increasing it generally
      raises absolute revenue, although it does not always raise the percentage
      return by the same amount.
    </p>

    <h4>5. Initial ARGNOT Securitization</h4>
    <p>
      ARGNOT adds supporting operator capital without diluting the calculated
      return. Once Bitcoin is locked, ARGNOT can also provide a return bonus of
      up to 29%. The bonus grows proportionally with Bitcoin utilization and
      reaches its maximum only when both capacities are full.
    </p>

    <h4>6. Bitcoin Utilization</h4>
    <p>
      Bitcoin utilization is the primary driver of vaulting returns. It supplies
      90% of core utilization and acts as the gate for the benefits provided by
      ARGNOT and Bonds. Each additional amount of locked Bitcoin contributes
      proportionally to the calculation.
    </p>

    <h4>7. Bond Participation</h4>
    <p>
      Purchased Argon Bonds supply the final 10% of core utilization. Their
      contribution is multiplied by Bitcoin utilization, so Bonds cannot improve
      the operator's return when no Bitcoin is locked.
    </p>

    <h4>8. Revenue Shared With Bonds</h4>
    <p>
      The standard bondholder share is 5% of eligible vaulting revenue. A vault
      can offer as much as 7% to attract bond capital, but every percentage point
      above the standard share comes out of the operator's maximum.
    </p>

    <h4>9. Revenue Shared With Bitcoin Liquids</h4>
    <p>
      Bitcoin Liquids receive a standard 3% share. A vault can increase it to 5%
      to attract Bitcoin users, but the additional share also comes out of the
      operator's maximum.
    </p>

    <p>
      Read
      <DocLink to="/docs/assets-and-entities/vaulting-operations"
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
      unlimited claim on mining-bid revenue. The following calculator begins
      with current Mainnet data and shows how mining economics and the vault's
      offered profit split can affect a Bond's modeled return.
    </p>

    <BondsCalculator />

    <p>
      Modeled Ten Day Return compares a Bond's estimated ARGN earnings with its
      one-ARGN principal. Modeled APY annualizes that ten-day return under the
      assumption that the same conditions continue and earnings are repeatedly
      reinvested. Bond earnings do not compound automatically, and actual mining
      bids, Bitcoin-backed capacity, participation, and revenue-sharing terms can
      all change.
    </p>

    <h3>The Four Variables that Drive Bond Returns</h3>

    <p>
      The circled numbers on the left side of the calculator identify the four
      inputs that shape the revenue available to eligible Bonds and the share
      they receive.
    </p>

    <h4>1. ARGNOT Market Price</h4>
    <p>
      ARGNOT is part of the value produced by a mining seat and committed in a
      mining bid. A higher market price can increase the modeled value of the
      seat, allowing operators to submit larger ARGN bids. Because a portion of
      those bids flows through vaults to Bonds, this can increase Bond revenue.
    </p>

    <h4>2. Growth In Argon Circulation</h4>
    <p>
      Growth in ARGN circulation creates additional mining rewards. Those
      rewards increase the value produced by each mining seat, which can support
      larger bids and increase the mining-bid revenue available to eligible
      Bonds.
    </p>

    <h4>3. Expected Return Per Mining Seat</h4>
    <p>
      Mining operators bid according to the return they expect a seat to
      produce. Accepting a lower mining return supports a larger bid and creates
      more revenue for Bonds, while requiring a higher return reduces the bid
      and the revenue available for distribution.
    </p>

    <h4>4. Profit Split for Bonds</h4>
    <p>
      Bonds receive 5% of eligible vaulting revenue by default. A vault operator
      can offer as much as 7% to attract Bond capital. A higher split increases
      the portion paid to Bond holders, but every additional percentage point
      comes out of the vault operator's share.
    </p>

    <p>
      Read
      <DocLink to="/docs/assets-and-entities/argon-bonds"
        >Argon Bonds</DocLink
      >
      for position capacity, earnings, and release rules.
    </p>

    <h2>Bitcoin Liquid Locking</h2>
    <p>
      Bitcoin Liquid Locking brings an asset from outside Argon into this return
      system. A Bitcoin holder can keep BTC in a native multisig Lock and create
      an optional Liquid to receive spendable ARGN against its value. The holder
      retains exposure to Bitcoin while gaining liquidity without selling it.
    </p>

    <p>
      The following calculator begins with current Mainnet prices and activity.
      Choose how much BTC participates in the Liquid, replay the last year of
      Bitcoin prices with a selected ratchet threshold, and adjust the mining
      conditions and revenue share to see how they affect its modeled return.
    </p>

    <LiquidsCalculator />

    <p>
      The selected BTC amount is modeled as a new position added to the Bitcoin
      already locked across the network. Its share of the resulting BTC total
      determines its proportional share of Liquid revenue. Modeled Liquid
      profits include both a simple annual projection of current ten-day mining
      proceeds and the net liquidity taken off the table by upward ratchets.
      The modeled APR expresses that combined profit against the historical
      starting capital and does not assume automatic compounding.
    </p>

    <h3>The Six Variables that Drive Bitcoin Liquid Returns</h3>

    <h4>1. Bitcoin Used for the Liquid</h4>
    <p>
      The Bitcoin amount establishes the modeled size of the position. Its ARGN
      market value is calculated from current BTC and ARGN prices, while the BTC
      itself remains inside its native multisig Lock.
    </p>

    <h4>2. Ratchet Threshold</h4>
    <p>
      The ratchet threshold controls how far Bitcoin's price must move from the
      most recent ratchet price before the position adjusts. The calculator
      replays the trailing year of daily Bitcoin prices using a minimum
      threshold of 5%. An upward ratchet provides full liquidity until the
      cumulative ARGN received reaches the position's current market value. Any
      remaining increase provides 50% liquidity.
    </p>

    <h4>3. ARGNOT Market Price</h4>
    <p>
      ARGNOT contributes to the value produced by mining seats. Its market price
      can therefore change mining bids and the revenue available to Bitcoin
      Liquids.
    </p>

    <h4>4. Growth In Argon Circulation</h4>
    <p>
      Growth in ARGN circulation creates additional mining rewards. That added
      value can support larger mining bids and increase downstream Liquid
      revenue.
    </p>

    <h4>5. Expected Return Per Mining Seat</h4>
    <p>
      A lower expected mining return supports a larger competitive bid, while a
      higher expected return leaves less bid revenue available for distribution.
    </p>

    <h4>6. Profit Split for Bitcoin Liquids</h4>
    <p>
      Bitcoin Liquids receive 3% of eligible vaulting revenue by default. A
      vault can offer as much as 5%, with the additional share coming out of the
      vault operator's portion.
    </p>

    <p>
      The closing obligation does not rise above the amount established by the
      Liquid. If Bitcoin appreciates, the holder retains that upside without a
      larger closing ceiling. If ARGN trades below target, the protocol's
      closing rules can make acquiring the required ARGN less expensive while
      removing a larger quantity from circulation.
    </p>

    <p>
      The same activity supplies returns elsewhere in the system. Vaults can
      earn service fees from the Lock, and insured Bitcoin expands the eligible
      bond capacity that determines how mining-bid revenue reaches Vaults and
      Bond holders. Explore
      <DocLink to="/docs/assets-and-entities/bitcoin-locks"
        >Bitcoin Locks</DocLink
      >
      and
      <DocLink to="/docs/assets-and-entities/bitcoin-liquids"
        >Bitcoin Liquids</DocLink
      >
      for the two parts of this position.
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
      capital. The calculators on this page make those relationships visible by
      letting one variable flow through the opportunities that follow it.
    </p>
  </DocContent>

  <DocContent v-else>Loading current network data...</DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import * as Vue from "vue";
import numeral from "@/lib/numeral";
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import ArgonIcon from "@/assets/logo.svg?component";
import ArgonotIcon from "@/assets/argonot.svg?component";
import BitcoinIcon from "@/assets/bitcoin.svg?component";
import ArgonStableChart from "@/components/ArgonStableChart.vue";
import ArgonotVolatilityChart from "@/components/ArgonotVolatilityChart.vue";
import BitcoinVolatilityChart from "@/components/BitcoinVolatilityChart.vue";
import MiningCalculator from "@/components/calculators/MiningCalculator.vue";
import VaultingCalculator from "@/components/calculators/VaultingCalculator.vue";
import Data, { NetworkName } from "@/lib/Data";
import {
  defaultBasicsRecord,
  type IBasicsRecord,
} from "@/interfaces/IBasicsRecord";
import StakesCalculator from "@/components/calculators/StakesCalculator.vue";
import BondsCalculator from "@/components/calculators/BondsCalculator.vue";
import LiquidsCalculator from "@/components/calculators/LiquidsCalculator.vue";
import EconomicFlywheel from "@/components/EconomicFlywheel.vue";

const chainName = Vue.ref<NetworkName>(NetworkName.mainnet);
const data = Vue.ref<IBasicsRecord>(defaultBasicsRecord);
const isLoaded = Vue.ref(false);

const averageBerkshireHathawayAPY = 19.9;

async function loadData() {
  data.value = await Data.fetchBasics();
}

Vue.onMounted(async () => {
  await loadData();
  isLoaded.value = true;
});
</script>

<style scoped>
@import "../../../main.css";
</style>
