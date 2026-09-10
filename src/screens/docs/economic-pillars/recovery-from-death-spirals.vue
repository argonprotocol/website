<template>
  <DocHeader>
    Recovering from Death Spirals
  </DocHeader>
  <DocContent>
    <div class="font-extralight italic text-3xl leading-10 my-6">
      A well-designed currency should function as a self-contained microcosm that
      maintains equilibrium regardless of external pressures or demands.
    </div>

    <p>
      A death spiral begins when a falling currency price weakens the mechanism meant to stabilize it, driving the price
      lower still. A resilient currency needs economic forces that counteract that decline. Gold offers a useful starting
      point for understanding how those forces can work.
    </p>

    <h3 class="text-2xl font-bold mt-10">
      Gold's Ability to Self-Stabilize
    </h3>

    <p>For thousands of years, gold was a store of value and medium of exchange. Instead of requiring a central authority
      like the Federal Reserve, gold uses the law of supply and demand to maintain value. When demand for gold increases, the price goes up. This increased price
      incentivizes extra mining, which increases the supply of gold over time. This increased supply of gold then puts downward pressure on the price, which in turn
      incentivizes less mining. It's a cycle that helps counterbalance changes in demand.<sup class="recovery-note-ref"><a href="#recovery-note-1" aria-label="See note 1 on gold supply">[1]</a></sup>
    </p>

    <div class="text-sm opacity-90 italic mb-2 mt-8">The Fluctuating Cycles of Supply and Demand Within the Gold Market (Illustration)<sup class="recovery-note-ref"><a href="#recovery-note-2" aria-label="See note 2 on the illustrative charts">[2]</a></sup></div>

    <StabilityChart :markers="['2030-01-24', '2030-03-10', '2030-06-14', '2030-09-17', '2030-12-17']" startingDate="2030-01-01" :maxYAxisValue="200" :series="[{ color: '#E18300FF', points: goldValues }]" class="mt-6 mb-5">
      <template #inset>
        <div
            class="absolute top-[2px] bottom-[27px] left-[2px] w-full opacity-30"
            style="
              background-color: var(--bg-color);
              background-image: url('/crown.svg');
              background-repeat: repeat;
              background-size: 30px;
            "
        />
      </template>
      <template #marker="props">
        <div
            class="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-700/30 hover:bg-amber-700/80 border border-amber-700/20 rounded-full cursor-default pointer-events-auto"
            :style="{ left: props.x + 'px', top: props.y + 'px' }"
        >
          <div
              class="absolute bottom-[0px] left-1/2 -translate-x-1/2 flex flex-col items-center"
              :style="`transform: translateY(${props.date === '2030-09-17' ? '-200%' : '-100%'})`"
          >
            <MinerIcon class="w-16" :class="{ 'opacity-30': props.date === '2030-09-17' }" />
            <div class="text-xs mt-1 text-center whitespace-nowrap" :class="{ 'opacity-30': props.date === '2030-09-17' }">
              <template v-if="props.date === '2030-03-10'">
                Extra Mining
              </template>
              <template v-else-if="props.date === '2030-09-17'">
                No Mining
              </template>
              <template v-else>
                Mining
              </template>
            </div>
            <div
                class="absolute left-1/2 -translate-x-1/2 -bottom-1 translate-y-full w-px bg-amber-700/20"
                :style="{ height: props.date === '2030-09-17' ? '160%' : '60%' }"
            >
              <div class="bg-gradient-to-r from-transparent to-[var(--bg-color)] h-full w-2 absolute top-0 right-full" />
              <div class="bg-gradient-to-l from-[var(--bg-color)] to-transparent h-full w-2 absolute top-0 left-full" />
            </div>
          </div>
        </div>
      </template>
    </StabilityChart>

    <p>The benefit of gold's stabilization is that it can outlast any single decision,
      decision maker, or entity. It self-regulates and self-corrects based on the never-ending human pursuit of greed and self-interest.</p>

    <h3 class="text-2xl font-bold mt-12">
      Fiat's Dependence on Policy Decisions
    </h3>

    <p>
      Fiat's counterbalances depend on policy decisions. Central banks can tighten monetary policy to restrain inflation,
      but governments can also face pressure to finance spending through monetary expansion. The response depends on
      institutional choices and the willingness to accept their economic costs.<sup class="recovery-note-ref"><a href="#recovery-note-3" aria-label="See note 3 on monetary policy and inflation">[3]</a></sup>
    </p>

    <div class="text-sm opacity-90 italic mb-2 mt-8">How Continued Monetary Expansion Can Reinforce Inflation (Illustration)<sup class="recovery-note-ref"><a href="#recovery-note-2" aria-label="See note 2 on the illustrative charts">[2]</a></sup></div>

    <StabilityChart :markers="['2030-01-24', '2030-03-10', '2030-06-01', '2030-08-22', '2030-11-15']" startingDate="2030-01-01" :maxYAxisValue="200" :series="[{ color: '#08A800FF', points: fiatValues }]" class="mt-6 mb-5">
      <template #inset>
        <div
            class="absolute top-[2px] bottom-[27px] left-[2px] w-full opacity-20 z-20"
            style="
              background-color: var(--bg-color);
              background-image: url('/military.svg');
              background-repeat: repeat;
              background-size: 35px;
            "
        />
      </template>
      <template #marker="props">
        <div
            class="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-lime-700/30 hover:bg-lime-700/80 border border-lime-700/20 rounded-full cursor-default pointer-events-auto"
            :style="{ left: props.x + 'px', top: props.y + 'px' }"
        >
          <div
              class="absolute bottom-[0px] left-1/2 -translate-x-1/2 flex flex-col items-center bg-[var(--bg-color)]"
              :style="`transform: translateY(${props.date === '2030-08-22' ? '-100%' : '-100%'})`"
          >
            <MintingIcon class="w-10 mx-2" />
            <div class="text-xs mt-1 text-center whitespace-nowrap">
              <template v-if="props.date === '2030-03-10' || props.date === '2030-08-22'">
                Extra Minting
              </template>
              <template v-else-if="props.date === '2030-11-15'">
                Hyper Minting
              </template>
              <template v-else>
                Minting
              </template>
            </div>
            <div
                class="absolute left-1/2 -translate-x-1/2 -bottom-1 translate-y-full w-px bg-amber-700/20"
                :style="{ height: props.date === '2030-08-22' ? '160%' : '60%' }"
            />
          </div>
        </div>
      </template>
    </StabilityChart>

    <p>
      Regardless of how well-intentioned the creators of fiat, the near-zero cost of minting additional currency can
      encourage over-minting. This over-minting can lead to hyperinflation and eventual collapse.<sup class="recovery-note-ref"><a href="#recovery-note-3" aria-label="See note 3 on monetary policy and inflation">[3]</a></sup>
    </p>

    <p>
      Fiat-pegged stablecoins inherit changes in the purchasing power of their reference currency. If that currency loses
      purchasing power, maintaining the peg passes that loss on to stablecoin holders.
    </p>

    <h3 class="text-2xl font-bold mt-12">
      Argon's Ability to Rapidly Self-Stabilize
    </h3>

    <p>
      Argon's stabilization mechanisms function more like gold than fiat. By combining exogenous
      assets with a closed-loop system of counterbalances, Argon is designed to keep its market price aligned
      with its purchasing-power target. Its novel incentives (vault shorts, treasury dispersals,
      mining bids) naturally counteract the destabilizing pressures of the market.
    </p>

    <p>
      Just like with gold, when demand for Argon increases, higher mining rewards increase supply, which keeps the price from
      rising too high. Similarly, as demand for Argon decreases, mining rewards are reduced. However, Argon is able to take
      this curtailment even further than gold; it is able to burn excess supply entirely out of existence. Argon can
      therefore reduce existing supply as well as slow the creation of new currency.<sup class="recovery-note-ref"><a href="#recovery-note-4" aria-label="See note 4 on Argon's stabilization mechanisms">[4]</a></sup>
    </p>

    <div class="text-sm opacity-90 italic mb-2 mt-8">The Continuous Minting and Burning of Argon Supply (Illustration)<sup class="recovery-note-ref"><a href="#recovery-note-2" aria-label="See note 2 on the illustrative charts">[2]</a></sup></div>

    <StabilityChart :markers="['2030-01-24', '2030-03-10', '2030-06-14', '2030-09-17', '2030-12-17']" startingDate="2030-01-01" :maxYAxisValue="200" :series="[{ color: '#AE00D1FF', points: argonValues }]" class="mb-5">
      <template #inset>
        <div
            class="absolute top-[2px] bottom-[27px] left-[2px] w-full opacity-20"
            style="
              background-color: var(--bg-color);
              background-image: url('/bitcoin.svg');
              background-repeat: repeat;
              background-size: 30px;
            "
        />
      </template>
      <template #marker="props">
        <div
            @mouseover="handleMouseOver($event, props)"
            @mouseleave="handleMouseLeave($event, props)"
            class="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-argon-700/30 hover:bg-argon-700/80 border border-argon-700/20 rounded-full cursor-default pointer-events-auto"
            :style="{ left: props.x + 'px', top: props.y + 'px' }"
        >
          <div
              class="absolute bottom-[0px] left-1/2 -translate-x-1/2 flex flex-col items-center bg-[var(--bg-color)]"
              :style="`transform: translateY(${props.date === '2030-09-17' ? '-50%' : '-100%'})`"
          >
            <BurningIcon v-if="props.date === '2030-09-17'" class="h-16 mx-2" />
            <MinerIcon v-else class="w-16" />
            <div class="text-xs mt-1 text-center whitespace-nowrap">
              <template v-if="props.date === '2030-03-10'">
                Extra Mining/Minting
              </template>
              <template v-else-if="props.date === '2030-09-17'">
                Burning
              </template>
              <template v-else>
                Mining/Minting
              </template>
            </div>
            <div
                class="absolute left-1/2 -translate-x-1/2 -bottom-1 translate-y-full w-px bg-amber-700/20"
                :style="{ height: props.date === '2030-09-17' ? '30%' : '60%' }"
            />
          </div>
        </div>
      </template>
    </StabilityChart>

    <p>
      Argon's burning mechanism ties supply reduction to the opportunity to recover Bitcoin. When Argon falls below
      target, its redemption rules make buying and burning Argons more attractive to Bitcoin holders. This creates a
      reason to remove excess supply even when confidence in Argon itself is weak.
    </p>

    <h3 class="text-2xl font-bold mt-12">
      Bitcoin's Unique Role As a Store of Value
    </h3>

    <p>
      Argon’s novel stabilization mechanism allows Bitcoin holders to hedge against declines in Bitcoin’s
      price while also creating profit opportunities whenever Argon falls below target.
    </p>
    <p>
      When a stablecoin relies on an endogenous token — one whose value depends on the same ecosystem — a
      decline in confidence can undermine both the currency and its stabilization asset. Falling prices
      weaken the mechanism meant to restore them, creating a self-reinforcing death spiral.<sup class="recovery-note-ref"><a href="#recovery-note-5" aria-label="See note 5 on TerraUSD and Luna">[5]</a></sup>
    </p>
    <p>
      Argon uses Bitcoin as an exogenous profit incentive: an asset with its own market and demand outside
      the Argon network. By locking their bitcoin, holders can receive the full market value of their
      Bitcoin as Argon stablecoins, taking value off the table while retaining the ability to recover their
      bitcoin later.
    </p>

    <div class="text-sm opacity-90 italic mb-2 mt-8">The Volatile Price Swings of Bitcoin<sup class="recovery-note-ref"><a href="#recovery-note-6" aria-label="See note 6 on the Bitcoin price data">[6]</a></sup></div>

    <BitcoinPriceHistoryChart :markers="bitcoinMarkers" startingDate="2025-05-23" :minYAxisValue="98_000" :maxYAxisValue="125_000" :fmtYAxisLabel="(value) => `$${value/1_000}k`" :series="[{ color: '#968200FF', points: bitcoinValues }]" class="mb-5">
      <template #marker="props">
        <div
            @mouseover="handleMouseOver($event, props)"
            @mouseleave="handleMouseLeave($event, props)"
            class="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-700/30 hover:bg-yellow-700/80 border border-yellow-700/20 rounded-full cursor-default pointer-events-auto"
            :style="{ left: props.x + 'px', top: props.y + 'px' }"
        >
        </div>
      </template>
    </BitcoinPriceHistoryChart>

    <p>
      Bitcoin’s volatility creates opportunities. When Bitcoin’s price falls, holders can recover their bitcoin by
      returning fewer Argons than they originally received, keeping the difference. The returned Argons are burned,
      turning the holder’s hedge into a reduction in circulating supply.
    </p>
    <p>
      A second profit opportunity emerges when Argon itself falls below target. Bitcoin holders can buy discounted Argons and use them to unlock their bitcoin. As Argon falls further below target, the redemption rules strengthen this incentive: recovering the bitcoin can become cheaper in market terms while requiring a larger number of Argons to be burned.<sup class="recovery-note-ref"><a href="#recovery-note-4" aria-label="See note 4 on Argon's stabilization mechanisms">[4]</a></sup>
    </p>
    <p>
      What creates a profit for the Bitcoin holder also removes excess currency from circulation. Participants have a financial reason to buy Argons even while others are selling, because doing so allows them to recover an asset with value outside the Argon network.
    </p>
    <p>
      This gives falling prices a counteracting force. A decline in Argon’s price strengthens the incentive to buy and burn it, drawing on Bitcoin’s external value to support recovery.
    </p>
    <p>
      Do a deeper dive by reading our whitepaper,
      <DocLink to="/docs/whitepapers/fundamentals">The Fundamentals for Creating a Stable Crypto Asset</DocLink>.
    </p>

    <section class="recovery-notes mt-12 border-t border-black/15 pt-6" aria-labelledby="recovery-notes-heading">
      <h3 id="recovery-notes-heading">Sources and Notes</h3>
      <ol class="list-decimal">
        <li id="recovery-note-1">
          <strong>Gold's supply response.</strong>
          The <a href="https://www.gold.org/gold-supply">World Gold Council's overview of gold supply</a> explains that
          new mines take years to develop, while recycling responds more quickly to changes in price. The mining cycle
          described here simplifies those supply responses; gold does not have a fixed price target.
        </li>
        <li id="recovery-note-2">
          <strong>The illustrative charts.</strong>
          The gold, fiat, and Argon supply-response charts use constructed curves to illustrate the mechanisms described
          in the text. Their dates, values, and event markers are illustrative rather than historical observations or forecasts.
        </li>
        <li id="recovery-note-3">
          <strong>Monetary policy and inflation.</strong>
          The IMF explains how <a href="https://www.imf.org/en/about/factsheets/sheets/2023/monetary-policy-and-central-banking">central banks use interest rates and monetary policy</a>
          to pursue price stability. Its staff analysis, <a href="https://www.imf.org/en/Blogs/Articles/2022/02/22/should-monetary-finance-remain-taboo">Should Monetary Finance Remain Taboo?</a>,
          examines how financing government spending through money creation can lead to hyperinflation when fiscal
          pressures undermine central bank independence and confidence in price stability.
        </li>
        <li id="recovery-note-4">
          <strong>Argon's minting, burning, and Bitcoin redemption.</strong>
          The <DocLink to="/docs/system-design/stabilization-algorithms">Stabilization Algorithms</DocLink> page explains
          how issuance responds to Argon's price and how the Bitcoin redemption curve determines the Argons required for
          unlocking. The <DocLink to="/docs/whitepapers/fundamentals">stability fundamentals whitepaper</DocLink> develops
          the economic rationale, including Bitcoin locking and unlocking, minting, and supply contraction.
        </li>
        <li id="recovery-note-5">
          <strong>Endogenous tokens and the TerraUSD collapse.</strong>
          The Bank for International Settlements describes the May 2022 collapse in
          <a href="https://www.bis.org/publications/aer-2022/future-monetary-system">its 2022 Annual Economic Report, Box A</a>.
          Redeeming TerraUSD created new Luna tokens; as holders tried to sell them, falling confidence and insufficient
          demand for Luna undermined the mechanism intended to restore TerraUSD's peg.
        </li>
        <li id="recovery-note-6">
          <strong>Bitcoin chart data.</strong>
          The chart uses the <a href="/data/four-pillars/bitcoin-values.json">Bitcoin price series provided with this page</a>,
          covering May 23 through October 30, 2025, with prices displayed in U.S. dollars. The plotted values are available
          through that link for inspection.
        </li>
      </ol>
    </section>
  </DocContent>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import numeral from 'numeral';
import StabilityChart from '../../../components/StabilityChart.vue';
import BitcoinPriceHistoryChart from '../../../components/BitcoinPriceHistoryChart.vue';
import goldValues from '../../../../public/data/four-pillars/gold-values.json';
import fiatValues from '../../../../public/data/four-pillars/fiat-values.json';
import argonValues from '../../../../public/data/four-pillars/argon-values.json';
import bitcoinValues from '../../../../public/data/four-pillars/bitcoin-values.json';
import MinerIcon from '../../../assets/apocalyptic/miner.svg?component';
import MintingIcon from '../../../assets/four-pillars/minting.svg?component';
import BurningIcon from '../../../assets/four-pillars/burning.svg?component';
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocLink from "@/screens/docs/DocLink.vue";

dayjs.extend(utc);

const bitcoinMarkers: string[] = [];

let lastBitcoinValue = bitcoinValues[0].y;
for (const value of bitcoinValues) {
  const diff = Math.abs(value.y - lastBitcoinValue);
  if (diff > 5_000) {
    bitcoinMarkers.push(value.x);
    lastBitcoinValue = value.y;
  }
}

const handleMouseOver = ($event: MouseEvent, props: any) => {
  $event.stopPropagation();
  console.log('mouseover', props);
};

const handleMouseLeave = ($event: MouseEvent, props: any) => {
  $event.stopPropagation();
  console.log('mouseleave', props);
};
</script>

<style scoped>
.recovery-note-ref {
  margin-left: 0.15em;
  font-family: var(--font-sans);
  font-size: 0.7em;
  font-weight: 400;
}

.recovery-notes ol > li {
  color: rgb(0 0 0 / 65%);
  font-size: 0.875rem;
  line-height: 1.6;
  scroll-margin-top: 6rem;
}
</style>
