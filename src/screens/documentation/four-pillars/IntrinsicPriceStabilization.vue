<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
      <RouterLink to="/learn/four-pillars">The Four Pillars of Argon</RouterLink>
    </Breadcrumbs>
    <SubTitle>Intrinsic Price Stabilization</SubTitle>

    <SubContent class="space-y-4">
      <div class="font-extralight italic text-4xl leading-12 my-10 mr-10">
        A well-designed currency should function as a self-contained microcosm that 
        maintains equilibrium regardless of external pressures or demands. 
      </div>

      <p>
        Only supercentenarians can remember a world when the Federal Reserve didn't control the almighty dollar. Even during
        the so-called, Gold Standard era, the dollar was subjected to the whims of those who pulled its levers. Many books have
        been written about the Federal Reserve's global influence. It's a fascinating intrique. The dollar underpins 88% of the
        world's transactions. The dollar has no intrinsic value beyond the paper it's printed on, yet it dictates the world's
        banking system. For most of us, a centrally controlled, fiat currency seems normal. We're too young to know any thing else.
      </p>
       
      <h3 class="text-2xl font-bold mt-10">
        Gold's Ability to Self-Stabilize
      </h3>

      <p>For thousands of years, gold was the primary store-of-value and medium-of-exchange. Instead of requiring a central authority
        like the Federal Reserve, gold uses the law of supply and demand to maintain value. When demand for gold increases, the price goes up. This increased price
        incentivizes extra mining, which increases the supply of gold. This increased supply of gold then drives the price back down, which in turn
        incentivizes less mining. It's a cycle that mostly removes inflation from its currency.
      </p>

      <div class="text-sm opacity-90 italic mb-2 mt-8">The Fluctuating Cycles of Supply and Demand Within the Gold Market</div>

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
        Fiat's Lack of a Counterbalance
      </h3>

      <p>
        Unlike gold, fiat has no countervailing force to de-incentivize the minting of more currency. When the currency goes up in value,
        the central bank is incentivized to mint more currency in order to bring it back down. Similary, when the currency drops in value, 
        the government is incentivized to mint more currency in order to support increased demand for economic programs. It's a self-reinforcing
        cycle of escalating inflation.
      </p>

      <div class="text-sm opacity-90 italic mb-2 mt-8">The Ever-Increasing Pressure to Continue Printing Fiat</div>

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
        Over the last thousand years, this same story has repeated itself time and time again. Regardless of how well-intentioned the creators
        of fiat, the near-zero cost of minting additional currency eventually encourages over-minting. This over-minting ultimately leads to 
        hyperinflation and eventual collapse. No fiat currency has ever escaped this fateful cycle.
      </p>

      <p>
        Nearly all crypto stablecoins share the same fate as fiat because they're pegged to fiat. dependent on the continued existence of the asset 
        they're backed by. If the asset goes down, the stablecoin goes down. If the asset goes up, the stablecoin goes up.
      </p>

      <h3 class="text-2xl font-bold mt-12">
        Argon's Ability to Rapidly Self-Stabilize
      </h3>

      <p>
        Argon's stabilization mechanisms function more like gold than fiat. By combining exogenous
        assets with a closed-loop system of counterbalances, Argon is able to maintain an internal 
        equilibrium of neither deflation nor inflation. Its novel incentives (vault shorts, treasury dispersals,
        mining bids) naturally counteract the destabilizing pressures of the market.
      </p>

      <p>
        Just like with gold, when demand for Argon increases, extra mining increases supply, which keeps the price from
        rising too high. Similarly, as demand for Argon decreases, mining is curtailed. However, Argon is able to take
        this curtailment even further than gold; it is able to burn all excess supply entirely out of existance. This
        gives the Argon a much faster re-stabilization capability than gold.
      </p>

      <div class="text-sm opacity-90 italic mb-2 mt-8">The Continuous Minting and Burning of Argon Supply</div>

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
        To be clear, Argon's burning mechanism is very different from the basic burning of other stablecoins. 
        Other stablecoins use burning simply to allow users to redeem stablecoins for the backing asset. Argon 
        uses it to convert Bitcoin's price volatility into a massive short position against the Argon. Whenever 
        the price of Argon drops below target, these short positions are used to burn Argon's excess supply 
        from existance, regardless of the market's desire to redeem.
      </p>

      <h3 class="text-2xl font-bold mt-12">
        Bitcoin's Unique Role As a Store of Value
      </h3>

      <p>
        Argon's novel stabilizing mechanism allows Bitcoin holders to hedge bitcoin pricing risk while also
        opening up profit opportuntities whenever Argon drops below target. 
        
        This completely burns the excess stablecoins from existence, and in doing so, the death-spiral inducing loops of Basis and Terra becomes a death-spiral impossibility in Argon.
        Instead of using an endogenous token as its stabilization asset, Argon incorporates a novel approach by using Bitcoin as an exogenous profit incentive.
        solves this problem by using Bitcoin as an exogenous profit incentive. Bitcoiners take profits off the table
      </p>

      <div class="text-sm opacity-90 italic mb-2 mt-8">The Volatile Price Swings of Bitcoin</div>

      <BitcoinVolatilityChart :markers="bitcoinMarkers" startingDate="2025-05-23" :minYAxisValue="98_000" :maxYAxisValue="125_000" :fmtYAxisLabel="(value) => `$${value/1_000}k`" :series="[{ color: '#968200FF', points: bitcoinValues }]" class="mb-5">
        <template #marker="props">
          <div
            @mouseover="handleMouseOver($event, props)"
            @mouseleave="handleMouseLeave($event, props)"
            class="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-700/30 hover:bg-yellow-700/80 border border-yellow-700/20 rounded-full cursor-default pointer-events-auto"
            :style="{ left: props.x + 'px', top: props.y + 'px' }"
          >
          </div>
        </template>
      </BitcoinVolatilityChart>

      <p>We use Bitcoin as a fully exogenous profit incentive.</p>

      <p>Miners take profits off the table when the price goes up.</p>

      <p>Bitcoiners take profits off the table when the price goes down.</p>

      <p>
        Do a deeper dive by reading our The Fundamentals for Creating a Stable Crypto Asset whitepaper.
      </p>

      <h3 class="text-2xl font-bold mt-14">
        Learn More About the Argon
      </h3>

      <p>
        Argon has similar properties to gold in that both can hold a stable value over thousands of years. The big 
        difference is that gold is heavy to move, hard to divide, and impossible to transmit digitally. Argon 
        retains long-term durability while being portable, divisible, and natively digital. For more information, check
        out Argon's other core properties:
      </p>

      <ul class="list-disc list-outside space-y-4 pl-6">
        <li class="pl-2">
          <RouterLink to="/learn/four-pillars/indifferent-to-catastrophe" class="font-bold">Indifferent to Catastrophe</RouterLink>
          <div class="mt-1">
            Argon works regardless of banking collapses or government bond failures.
          </div>
        </li>
        <li class="pl-2">
          <RouterLink to="/learn/four-pillars/resistant-to-inflation" class="font-bold">Resistant to Inflation</RouterLink>
          <div class="mt-1">
            Argon allows you to build wealth without worrying about the cost of time eroding it
          </div>
        </li>
        <li class="pl-2">
          <RouterLink to="/learn/four-pillars/immune-from-death-spirals" class="font-bold">Immune from Death Spirals</RouterLink>
          <div class="mt-1">
            Argon solves the core problem inherent in previous algorithmic stablecoins.
          </div>
        </li>
      </ul>

    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import numeral from 'numeral';
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '../../../navigation/SubLayout.vue';
import StabilityChart from '../../../components/StabilityChart.vue';
import BitcoinVolatilityChart from '../../../components/BitcoinVolatilityChart.vue';
import goldValues from '../../../../public/data/four-pillars/gold-values.json';
import fiatValues from '../../../../public/data/four-pillars/fiat-values.json';
import argonValues from '../../../../public/data/four-pillars/argon-values.json';
import bitcoinValues from '../../../../public/data/four-pillars/bitcoin-values.json';
import MinerIcon from '../../../assets/apocalyptic/miner.svg?component';
import MintingIcon from '../../../assets/four-pillars/minting.svg?component';
import BurningIcon from '../../../assets/four-pillars/burning.svg?component';

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
@import "../../../main.css";

</style>