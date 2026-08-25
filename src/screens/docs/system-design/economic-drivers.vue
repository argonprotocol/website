<template>
  <DocHeader>Economic Drivers</DocHeader>

  <DocContent v-if="isLoaded">
    <aside
      class="mb-8 rounded-lg border border-amber-300 bg-amber-50 px-5 py-4 text-amber-950"
    >
      <strong class="mb-1 block">Academic illustration only</strong>
      <p class="m-0">
        This page uses current network data and adjustable models to illustrate
        how value moves through Argon's economy. It does not predict future
        market prices or imply that any specific return will be realized.
      </p>
    </aside>

    <p>
      Argon's economic upside does not depend on its stablecoin becoming more
      valuable. ARGN is designed to preserve purchasing power, not appreciate.
      The network instead creates potential returns for the people who operate
      its infrastructure and supply the capital it needs.
    </p>

    <p>
      Mining, Argonot Stakes, Stabilization Vaults, Argon Bonds, and Bitcoin
      Liquid Locking are not independent products. The cost paid by one
      participant becomes revenue for another, creating a connected economy
      around the work of operating and stabilizing the network.
    </p>

    <h2>Three Assets Drive the Economy</h2>
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
        <div>Bitcoin</div>
        <div class="font-light">BTC</div>
      </div>
    </div>

    <h3>ARGN Is the Network's Stable Currency</h3>
    <p>
      ARGN is used for payments, mining bids, Argon Bonds, vault capital, and
      Bitcoin Liquid Locking. Its target follows purchasing power, so the
      network expands or contracts its circulating supply as market demand
      changes. The opportunity is in using and earning ARGN—not waiting for the
      stablecoin itself to rise indefinitely in price.
    </p>

    <ArgonStableChart :height="200" class="mt-8 mb-10" />

    <h3>ARGNOT Unlocks Operational Opportunity</h3>
    <p>
      ARGNOT has a fixed maximum supply of 21 million tokens. It is not designed
      to function as stable currency. Instead, it supplies the ownership and
      operating capital required by mining, vaulting, crosschain services, and
      Argonot Stakes.
    </p>

    <p>
      Its market price can rise or fall as the market's perception of those
      opportunities changes. Because ARGNOT is both earned through mining and
      required to compete for mining seats, its price feeds directly into the
      economics of operating the network.
    </p>

    <ArgonotVolatilityChart :height="200" class="mt-8 mb-10" />

    <h3>Bitcoin Supplies External Value</h3>
    <p>
      Bitcoin remains native to the Bitcoin network, but its value can be placed
      into Argon's economic system through
      <router-link to="/docs/assets-and-entities/bitcoin-locks"
        >Bitcoin Locks</router-link
      >. Bitcoin holders gain liquidity and downside-hedging opportunities,
      while vaults gain service revenue and Bitcoin-backed capacity for Argon
      Bonds.
    </p>

    <BitcoinVolatilityChart :height="200" class="mt-8 mb-10" />

    <h2>Mining Creates the First Revenue Pool</h2>
    <p>
      Mining is the simplest place to see how Argon's economic model works.
      Operators compete for ten-frame mining terms by bidding ARGN and
      committing the required ARGNOT. Winning a seat gives the operator a share
      of the network's immutable base mining rewards and any additional rewards
      created by growth in ARGN demand.
    </p>

    <p>
      A new cohort is auctioned during every frame. One operator can bid for and
      win multiple seats by funding multiple mining accounts. Each winning ARGN
      bid is paid into the mining-bid pool, while its ARGNOT remains committed
      for the mining term and is returned afterward.
    </p>

    <p>
      The calculator below starts with current network data. The yellow controls
      let you change the expected return, growth in ARGN circulation, and change
      in ARGNOT's market price.
    </p>

    <div
      class="mt-5 mb-10 rounded-lg border border-slate-900 bg-gray-900/90 px-2 text-white!"
    >
      <MiningCalculator @updated="miningCalculatorUpdated" />
    </div>

    <h3>Comparing a Ten-Day Return with an Annual Return</h3>
    <p>
      A mining term lasts ten frames—approximately ten days. Annual Percentage
      Yield expresses that shorter return as a compounded annual rate so it can
      be compared with more familiar assets.
    </p>

    <ul>
      <li>
        Average Berkshire Hathaway return over the last six decades:
        <strong>{{ averageBerkshireHathawayAPY }}% APY</strong>
      </li>
      <li>
        Expected mining return of
        <strong>{{ numeral(expectedMiningTDR).format("0,0.[00]") }}%</strong>
        over ten days:
        <strong
          >{{ numeral(expectedMiningAPY).format("0,0.[00]") }}% APY</strong
        >
      </li>
      <li>
        Modeled return after the selected circulation and ARGNOT changes:
        <strong>{{ numeral(actualMiningTDR).format("0,0.[00]") }}%</strong>
        over ten days, or
        <strong>{{ numeral(actualMiningAPY).format("0,0.[00]") }}% APY</strong>
      </li>
    </ul>

    <p>
      The model begins with the current cohort size. Across the complete active
      miner set, the protocol can support between 100 and 1,440 seats. Capacity
      expands and contracts as auction prices change, dividing the same
      opportunity across more or fewer seats.
    </p>

    <h2>Three Variables Drive Mining Returns</h2>

    <h3>1. The Winning Bid</h3>
    <p>
      The ARGN in a winning bid is the price paid for a mining seat. The ARGNOT
      is committed operating capital and returns after the term. A lower winning
      bid leaves more of the immutable base rewards as potential profit, while
      competition for seats can push bids higher.
    </p>

    <h3>2. Growth in ARGN Demand</h3>
    <p>
      When market demand moves ARGN above its target, the stabilization
      algorithm makes additional ARGN issuance available to miners. Greater
      circulation growth can therefore increase a seat's output beyond its
      immutable base rewards.
    </p>

    <h3>3. ARGNOT's Market Price</h3>
    <p>
      A mining term produces ARGNOT as well as ARGN. Changes in ARGNOT's market
      value affect the final value of those rewards and of the ARGNOT committed
      to the seat. This creates a direct connection between demand for
      operational access and the economics of mining.
    </p>

    <p>
      Read
      <router-link to="/docs/assets-and-entities/mining-operations"
        >Mining Operations</router-link
      >
      for the auction, cohort, and block-production rules behind the model.
    </p>

    <h2>Following the Winning Bids</h2>
    <p>
      A winning mining bid is an expense for the miner, but it does not
      disappear. At the end of each frame, the protocol directs the bid pool
      toward the people and capital that support the rest of the network.
    </p>

    <dl class="my-8 border-y border-slate-300">
      <div class="border-b border-slate-300 py-5 sm:flex sm:gap-6">
        <dt class="text-3xl font-bold text-argon-700 sm:w-24 sm:shrink-0">
          20%
        </dt>
        <dd class="m-0 mt-2 sm:mt-0">
          <strong class="block text-lg">
            <router-link to="/docs/assets-and-entities/operational-rewards-pool"
              >Operational Rewards Pool</router-link
            >
          </strong>
          Funds qualifying operator-onboarding rewards. Funds not used for those
          rewards are burned.
        </dd>
      </div>
      <div class="border-b border-slate-300 py-5 sm:flex sm:gap-6">
        <dt class="text-3xl font-bold text-argon-700 sm:w-24 sm:shrink-0">
          10%
        </dt>
        <dd class="m-0 mt-2 sm:mt-0">
          <strong class="block text-lg">
            <router-link to="/docs/assets-and-entities/argonot-stakes"
              >Argonot Stakes</router-link
            >
          </strong>
          Distributed proportionally among the ARGNOT positions supplying
          operating capital to miners.
        </dd>
      </div>
      <div class="py-5 sm:flex sm:gap-6">
        <dt class="text-3xl font-bold text-argon-700 sm:w-24 sm:shrink-0">
          70%
        </dt>
        <dd class="m-0 mt-2 sm:mt-0">
          <strong class="block text-lg">
            Stabilization Vaults and Argon Bonds
          </strong>
          Allocated among qualifying vaults according to eligible Bitcoin-backed
          bond capital, then shared between vault operators and bondholders.
        </dd>
      </div>
    </dl>

    <p>
      This distribution is the bridge between mining and the other return
      opportunities in Argon. More competition for mining seats can produce more
      revenue for Stakes, onboarding, Vaults, and Bonds.
    </p>

    <h2>Argonot Stake Returns</h2>
    <p>
      Argonot Stakes let holders commit ARGNOT through a mining operation and
      receive a proportional share of the 10% Stake allocation. The miner does
      not take custody of the principal, and the protocol returns the ARGNOT
      when the position completes its release.
    </p>

    <p>
      Using the bid and seat count from the Mining Calculator, the amount
      distributed to Argonot Stakes every ten frames is:
    </p>

    <div class="my-10 rounded-lg border border-gray-400 p-4">
      (₳{{ numeral(argonsBid).format("0,0.[00]") }} ×
      {{ numeral(seatCount).format("0,0") }} seats) × 10% =
      <strong
        >₳{{
          numeral(payoutToArgonotStakesEveryTen).format("0,0.[00]")
        }}</strong
      >
    </div>

    <p>
      Up to 40% of issued ARGNOT can participate in active Stakes. There are
      currently
      {{ micronotToArgonotNm(data.micronotsInCirculation).format("0,0") }}
      ARGNOT in circulation, creating total capacity for approximately
      <strong>{{ numeral(maxArgonotStakes).format("0,0") }} Stakes</strong>.
    </p>

    <p>
      If every available Stake were active, the modeled distribution would be
      ₳{{ numeral(payoutPerArgonotStakePerDay).format("0,0.[0000]") }} per Stake
      each day. At the current market price of ₳{{
        numeral(argonForArgonot).format("0,0.00")
      }}
      per ARGNOT, that is a compounded annual return of
      <strong>{{ numeral(argonotStakeAPY).format("0,0.[00]") }}% APY</strong>.
    </p>

    <p>
      Current participation is
      {{ numeral(activeStakeUtilizationPercent).format("0,0.[00]") }}% of the
      allowed capacity, with
      {{ numeral(data.activeArgonotStakes).format("0,0") }} active Stakes. At
      that participation level, the modeled distribution becomes ₳{{
        numeral(activePayoutPerArgonotStakePerDay).format("0,0.[0000]")
      }}
      per Stake each day, producing
      <strong
        >{{ numeral(activeArgonotStakeAPY).format("0,0.[00]") }}% APY</strong
      >.
    </p>

    <h3>How Mining Can Support ARGNOT's Yield</h3>
    <p>
      A productive asset normally produces a lower percentage yield as its
      purchase price rises. Argonot Stakes introduce another force: ARGNOT is
      also part of the immutable value earned by mining seats.
    </p>

    <p>
      When ARGNOT becomes more valuable, the total value produced by each seat
      increases. Miners can therefore bid more ARGN while preserving the same
      expected mining return. Because 10% of those larger bids flows to Stakes,
      a higher ARGNOT price can increase both the value of the asset and the
      ARGN income it produces.
    </p>

    <p>
      If the current daily distribution remained unchanged, ARGNOT could rise
      from ₳{{ numeral(argonForArgonot).format("0,0.00") }} to approximately ₳{{
        numeral(argonotPriceAtBerkshireReturn).format("0,0.00")
      }}
      before the modeled active-Stake yield fell to Berkshire Hathaway's
      historical {{ averageBerkshireHathawayAPY }}% compound return. The
      distribution is not fixed, however, because mining bids can change with
      ARGNOT's value.
    </p>

    <h3>An Illustrative ₳1,000 ARGNOT Scenario</h3>
    <p>
      Consider a separate model in which one ARGNOT is worth ₳1,000. Under the
      assumptions used by this illustration, that price supports approximately:
    </p>

    <ul>
      <li>₳462,596 bid per mining seat</li>
      <li>₳0.6181 distributed to each active Stake per day</li>
      <li>25.30% compounded annual staking yield</li>
    </ul>

    <div
      class="my-10 overflow-x-auto rounded-lg border border-gray-400 p-4 font-['Latin_Modern_Math']"
    >
      <table
        class="mx-auto border-separate border-spacing-x-3 border-spacing-y-2 text-lg sm:text-xl"
      >
        <tbody>
          <tr>
            <td class="text-right whitespace-nowrap">
              ₳{{ numeral(argonForArgonot).format("0,0.00") }}
            </td>
            <td>→</td>
            <td class="text-right whitespace-nowrap">
              ₳{{
                numeral(activePayoutPerArgonotStakePerDay).format("0,0.[0000]")
              }}
              per day
            </td>
            <td>→</td>
            <td class="text-right font-medium whitespace-nowrap">
              {{ numeral(activeArgonotStakeAPY).format("0,0.[00]") }}% APY
            </td>
          </tr>
          <tr>
            <td class="text-right whitespace-nowrap">₳1,000</td>
            <td>→</td>
            <td class="text-right whitespace-nowrap">₳0.6181 per day</td>
            <td>→</td>
            <td class="text-right font-medium whitespace-nowrap">25.30% APY</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      This scenario does not predict that ARGNOT will trade at ₳1,000. It
      demonstrates why a higher ARGNOT price does not necessarily compress the
      modeled Stake yield toward zero: higher-value mining rewards can support
      larger ARGN bids, and larger bids increase the Stake revenue pool.
    </p>

    <h2>Vaulting Returns</h2>
    <p>
      Stabilization Vaults connect Bitcoin, ARGN capital, and the 70% vault
      allocation. A vault operator commits capital and infrastructure, supplies
      Bitcoin cosigning and insurance services, and attracts Argon Bonds to its
      Treasury pool.
    </p>

    <p>A vault can earn ARGN from two primary sources:</p>

    <ul>
      <li>
        <strong>Bitcoin service fees</strong> charged for the vault's insurance
        capital and cosigning work.
      </li>
      <li>
        <strong>Mining-bid revenue</strong> assigned to the vault according to
        its eligible Bitcoin-backed bond capital.
      </li>
    </ul>

    <p>
      More Bitcoin in a vault can support more eligible Argon Bonds. More Bonds
      can increase the vault's share of mining-bid revenue, while the percentage
      offered to bondholders determines how that revenue is divided between the
      operator and its capital providers.
    </p>

    <div
      class="mt-5 mb-10 min-h-200 rounded-lg border border-slate-900 bg-gray-900/90 px-2 text-white!"
    >
      <VaultingCalculator :argons-bid="argonsBid" :seat-count="seatCount" />
    </div>

    <p>
      The Vaulting Calculator carries forward the mining bid selected above. It
      then lets you explore four return drivers: initial Bitcoin capacity,
      Bitcoin utilization, the revenue share retained by the vault, and the
      portion of available Bonds purchased by capital providers.
    </p>

    <p>
      See
      <router-link to="/docs/assets-and-entities/vaulting-operations"
        >Vaulting Operations</router-link
      >
      for the operator's capital requirements, insurance rules, and ongoing
      responsibilities.
    </p>

    <h2>Argon Bond Returns</h2>
    <p>
      Argon Bonds let ARGN holders participate in vault revenue without
      operating a vault themselves. Each Bond commits one ARGN to a selected
      vault. The protocol holds the principal and pays the position the
      percentage of eligible vault revenue offered when it was created.
    </p>

    <p>
      Bond returns rise when mining-bid revenue grows, when the selected vault
      earns a larger share of the vault allocation, or when fewer eligible Bonds
      divide the offered revenue. A vault can offer bondholders a larger share
      to attract capital, but doing so leaves less revenue for the operator.
      This competition connects the return available to Bonds with the return
      available from vaulting.
    </p>

    <p>
      Read
      <router-link to="/docs/assets-and-entities/argon-bonds"
        >Argon Bonds</router-link
      >
      for position capacity, earnings, and release rules.
    </p>

    <h2>Bitcoin Liquid Locking Returns</h2>
    <p>
      Bitcoin Liquid Locking brings an asset from outside Argon into this return
      system. A Bitcoin holder can keep BTC in a native multisig Lock and create
      an optional Liquid to receive spendable ARGN against its value. The holder
      retains exposure to Bitcoin while gaining liquidity without selling it.
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
      <router-link to="/docs/assets-and-entities/bitcoin-locks"
        >Bitcoin Locks</router-link
      >
      and
      <router-link to="/docs/assets-and-entities/bitcoin-liquids"
        >Bitcoin Liquids</router-link
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
import * as Vue from "vue";
import BigNumber from "bignumber.js";
import numeral, { micronotToArgonotNm } from "@/lib/numeral";
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
import { micronotToArgonot } from "@/lib/currencyUtils";

const chainName = Vue.ref<NetworkName>(NetworkName.mainnet);
const data = Vue.ref<IBasicsRecord>(defaultBasicsRecord);
const isLoaded = Vue.ref(false);

const averageBerkshireHathawayAPY = 19.9;

const expectedMiningTDR = Vue.ref(0);
const expectedMiningAPY = Vue.ref(0);

const actualMiningTDR = Vue.ref(0);
const actualMiningAPY = Vue.ref(0);

const argonsBid = Vue.ref(0);
const seatCount = Vue.ref(0);

const maxArgonotStakes = Vue.computed(
  () => micronotToArgonot(data.value.micronotsInCirculation) * 0.4,
);

const payoutToArgonotStakesEveryTen = Vue.computed(
  () => argonsBid.value * seatCount.value * 0.1,
);

const payoutPerArgonotStakePerDay = Vue.computed(() => {
  if (maxArgonotStakes.value <= 0) return 0;
  return BigNumber(payoutToArgonotStakesEveryTen.value)
    .dividedBy(maxArgonotStakes.value)
    .dividedBy(10)
    .toNumber();
});

const argonForArgonot = Vue.computed(() => {
  if (data.value.usdForArgon <= 0) return 0;
  return data.value.usdForArgonot / data.value.usdForArgon;
});

const argonotStakeAPY = Vue.computed(() => {
  if (argonForArgonot.value <= 0) return 0;
  return (
    ((1 + payoutPerArgonotStakePerDay.value / argonForArgonot.value) ** 365 -
      1) *
    100
  );
});

const activePayoutPerArgonotStakePerDay = Vue.computed(() => {
  if (data.value.activeArgonotStakes <= 0) return 0;
  return BigNumber(payoutToArgonotStakesEveryTen.value)
    .dividedBy(data.value.activeArgonotStakes)
    .dividedBy(10)
    .toNumber();
});

const activeArgonotStakeAPY = Vue.computed(() => {
  if (argonForArgonot.value <= 0) return 0;
  return (
    ((1 + activePayoutPerArgonotStakePerDay.value / argonForArgonot.value) **
      365 -
      1) *
    100
  );
});

const activeStakeUtilizationPercent = Vue.computed(() => {
  if (maxArgonotStakes.value <= 0) return 0;
  return (data.value.activeArgonotStakes / maxArgonotStakes.value) * 100;
});

const argonotPriceAtBerkshireReturn = Vue.computed(() => {
  const dailyRate = (1 + averageBerkshireHathawayAPY / 100) ** (1 / 365) - 1;
  if (dailyRate <= 0) return 0;
  return activePayoutPerArgonotStakePerDay.value / dailyRate;
});

function miningCalculatorUpdated(results: {
  expectedMiningTDR: number;
  actualMiningTDR: number;
  argonsBid: number;
  seatCount: number;
}) {
  expectedMiningTDR.value = results.expectedMiningTDR;
  actualMiningTDR.value = results.actualMiningTDR;
  expectedMiningAPY.value =
    ((1 + results.expectedMiningTDR / 100) ** 36.5 - 1) * 100;
  actualMiningAPY.value =
    ((1 + results.actualMiningTDR / 100) ** 36.5 - 1) * 100;

  argonsBid.value = results.argonsBid;
  seatCount.value = results.seatCount;
}

async function loadData() {
  data.value = await Data.fetchBasics(chainName.value);
}

Vue.onMounted(async () => {
  await loadData();
  isLoaded.value = true;
});
</script>

<style scoped>
@import "../../../main.css";
</style>
