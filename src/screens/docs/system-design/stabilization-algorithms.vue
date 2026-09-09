<template>
  <DocHeader>Stabilization Algorithms</DocHeader>
  <DocContent>
    <aside class="mb-4 rounded-lg border border-amber-300 px-4 py-2 text-amber-950 font-bold">
      NOTE: This page documents the upcoming release of Argon Mainnet v1.5.
    </aside>

    <p>
      Argon does not promise redemption for dollars or require an organization
      to defend its peg. Instead, the network monitors the difference between
      target price and market price, then offers economic incentives on both sides
      of the line.
    </p>

    <p>
      These algorithms do not place trades or force anyone to mint or
      burn Argons. They simply enforce the rules under which voluntary
      actions can expand or contract supply.
    </p>

    <h2>Three Core Properties</h2>
    <p>
      Argon's stabilization loop begins with three primary values that are
      maintained on-chain:
    </p>
    <ol>
      <li>
        <strong>Target Price.</strong> Argon started at an exchange rate of 1 ARGN for 1
        USD on January 15, 2025. Since then, its target price has algorithmically
        adjusted to counteract fluctuations USD inflation.
      </li>
      <li>
        <strong>Market Price.</strong> Argon's oracle observes the Argon/USDC market
        on Uniswap, adjusts for the market price of USDC in dollars, and submits
        the resulting Argon CPI to its mainchain.
      </li>
      <li>
        <strong>Circulation.</strong> The mainchain uses the total number
        of issued Argons to translate the price difference into a desired
        supply change.
      </li>
    </ol>

    <h2>Calculating Target Price</h2>
    <p>
      Argon's target price begins with the U.S. Consumer Price Index and moves
      gradually as new CPI readings are released. Its calculation is:
    </p>

    <div class="my-8 w-full max-w-full overflow-hidden rounded-lg border border-gray-400 bg-white/30 px-5 pt-6">
      <math
        display="block"
        class="mx-auto text-lg sm:text-xl"
      >
        <mtable rowspacing="1.25em" columnalign="right center left">
          <mtr>
            <mtd><mi>ΔC</mi></mtd>
            <mtd><mo>=</mo></mtd>
            <mtd>
              <mi>clamp</mi>
              <mo>(</mo>
              <msub><mi>C</mi><mi>new</mi></msub>
              <mo>−</mo>
              <msub><mi>C</mi><mi>previous</mi></msub>
              <mo>,</mo>
              <mn>−0.7092</mn>
              <mo>,</mo>
              <mn>1.2429</mn>
              <mo>)</mo>
            </mtd>
          </mtr>

          <mtr>
            <mtd>
              <msub><mi>C</mi><mi>smooth</mi></msub>
            </mtd>
            <mtd><mo>=</mo></mtd>
            <mtd>
              <msub><mi>C</mi><mi>previous</mi></msub>
              <mo>+</mo>
              <mfrac>
                <mrow><mi>min</mi><mo>(</mo><mi>e</mi><mo>,</mo><mi>D</mi><mo>)</mo></mrow>
                <mi>D</mi>
              </mfrac>
              <mo>×</mo>
              <mi>ΔC</mi>
            </mtd>
          </mtr>

          <mtr>
            <mtd><msup><mi>T</mi><mo>*</mo></msup></mtd>
            <mtd><mo>=</mo></mtd>
            <mtd>
              <mtext>$1.00</mtext>
              <mo>×</mo>
              <mfrac>
                <msub><mi>C</mi><mi>smooth</mi></msub>
                <mn>315.605</mn>
              </mfrac>
            </mtd>
          </mtr>

          <mtr>
            <mtd><mi>T</mi></mtd>
            <mtd><mo>=</mo></mtd>
            <mtd>
              <msub><mi>truncate</mi><mn>3 decimals</mn></msub>
              <mo>(</mo>
              <mi>rate-limit</mi>
              <mo>(</mo>
              <msup><mi>T</mi><mo>*</mo></msup>
              <mo>)</mo>
              <mo>)</mo>
            </mtd>
          </mtr>

        </mtable>
      </math>

      <p class="mt-6 mb-0 text-sm text-slate-600">
        C is the U.S. Consumer Price Index, ΔC is its bounded monthly change,
        e is the number of elapsed ticks, D is the number of ticks between CPI
        releases, and T is Argon’s target price.
      </p>
    </div>

    <h2>Calculating the Argon CPI</h2>
    <p>
      Argon's CPI is distinct from the U.S. Consumer Price Index, which is used
      above to calculate Argon's target price:
    </p>

    <div class="my-8 w-full max-w-full overflow-hidden rounded-lg border border-gray-400 bg-white/30 px-5 pt-6">
      <math display="block" class="mx-auto text-lg sm:text-xl">
        <mtable columnalign="right center left">
          <mtr>
            <mtd><mtext>Argon CPI</mtext></mtd>
            <mtd><mo>=</mo></mtd>
            <mtd>
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" columnspacing="1em">
                  <mtr>
                    <mtd><mn>0</mn></mtd>
                    <mtd>
                      <mtext>if </mtext>
                      <mo>|</mo><mi>M</mi><mo>−</mo><mi>T</mi><mo>|</mo>
                      <mo>&lt;</mo>
                      <mtext>$0.001</mtext>
                    </mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mfrac><mi>T</mi><mi>M</mi></mfrac>
                      <mo>−</mo>
                      <mn>1</mn>
                    </mtd>
                    <mtd><mtext>otherwise</mtext></mtd>
                  </mtr>
                </mtable>
              </mrow>
            </mtd>
          </mtr>
        </mtable>
      </math>

      <p class="mt-6 mb-0 text-sm text-slate-600">
        T is Argon’s target price, and M is Argon’s market price.
      </p>
    </div>

    <p>
      The output may seem backward at first, but it tells the runtime which supply
      response is needed:
    </p>

    <ul>
      <li>
        <strong>Negative signal = Market is above target</strong>; more circulating
        supply is needed.
      </li>
      <li>
        <strong>Zero signal = Market is near target:</strong>; no price-driven supply
        adjustment is needed.
      </li>
      <li>
        <strong>Positive signal = Market is below target:</strong>; less circulating
        supply is needed.
      </li>
    </ul>

    <p>
      The desired circulation change is therefore the opposite of the Argon CPI
      multiplied by the current circulating supply. A larger price gap or a larger
      circulation therefore produces a larger requested response. Very small price differences are
      treated as ordinary market noise and produce a zero signal.
    </p>

    <h2>Expand Supply When Price Is Above Target</h2>
    <p>
      A market price that is above target indicates that buyers are demanding more
      Argons than sellers are making available. The mainchain expands circulation
      through mining and, under constrained conditions, through Bitcoin Locks.
    </p>

    <h3>Mining Issuance</h3>
    <p>
      At the beginning of a new mining frame, the runtime reviews the recent
      average price signal and the current signal. When expansion is
      needed, it calculates the requested increase from current circulation and
      distributes newly issued Argons across eligible active miners.
    </p>

    <p>
      Block rewards provide a second, slower mining response. The reward rate
      assigned to a future mining cohort is adjusted toward the requested
      supply change, spread across an epoch and dampened by a runtime parameter.
      The adaptive portion can rise when Argon is above target and retreat when
      the price falls, but rewards cannot be reduced below the protocol's base
      schedule.
    </p>

    <p>
      Learn more about
      <DocLink to="/docs/assets-and-entities/mining-operations"
        >Mining Operations</DocLink
      >.
    </p>

    <h3>Bitcoin Liquid Locking</h3>
    <p>
      Funding a Bitcoin Liquid creates a queued right to receive Argons based on
      the underlying Bitcoin value. That queue is not an unrestricted source of new
      currency. Its minting pallet pays only when Argon's market price is at or above
      target, and the cumulative amount minted for Bitcoin Locks cannot exceed the
      amount minted through mining.
    </p>

    <p>
      Each queued lock is also limited to a portion of its remaining amount per
      frame. These constraints pace new liquidity and connect it to the mining
      side of the system. In exchange, every funded lock establishes a future
      obligation to burn Argons before its Bitcoin can be released.
    </p>

    <p>
      Vault collateral and Treasury capital make these locks operational, but
      Treasury does not choose the direction of the supply response. The price
      index, minting, block-reward, and Bitcoin Lock rules enforce that response
      on-chain.
    </p>

    <h2>Contract Supply When Price Is Below Target</h2>
    <p>
      A market price that is below target indicates that more Argons are available than
      buyers want. The first response is to stop adding price-triggered supply: minting
      from queued Bitcoin Liquids pause, and mining block rewards move back toward their
      base minimum.
    </p>

    <p>
      Stopping new issuance does not remove Argons that already exist in circulation. Actual
      contraction only occurs when Argons are burned. Bitcoin unlocking provides the
      needed burn mechanism.
    </p>

    <h3>The Bitcoin Redemption Curve</h3>
    <p>
      To release a Bitcoin, its owner must insert the required number into the network
      vaults. Once the Bitcoin is release, the mainchain burns those Argons. The number
      of Argons required is based on the following formula:
    </p>

    <div
      class="my-8 w-full max-w-full overflow-hidden rounded-lg border border-gray-400 bg-white/30 px-3 pt-6 sm:px-5"
    >
      <math
        display="block"
        class="mx-auto text-[10px] sm:text-lg"
        aria-label="Complete Bitcoin unlocking formula"
      >
        <mtable rowspacing="1em" columnalign="right center left">
          <mtr>
            <mtd><mi>r</mi></mtd>
            <mtd><mo>=</mo></mtd>
            <mtd>
              <mfrac>
                <msub><mi>A</mi><mi>c</mi></msub>
                <msub><mi>A</mi><mi>t</mi></msub>
              </mfrac>
            </mtd>
          </mtr>
          <mtr>
            <mtd><mi>b</mi></mtd>
            <mtd><mo>=</mo></mtd>
            <mtd>
              <mi>min</mi>
              <mo>(</mo>
              <msub><mi>B</mi><mi>c</mi></msub>
              <mo>,</mo>
              <msub><mi>B</mi><mi>v</mi></msub>
              <mo>)</mo>
            </mtd>
          </mtr>
          <mtr>
            <mtd><mi>U</mi><mo>(</mo><mi>r</mi><mo>,</mo><mi>b</mi><mo>)</mo></mtd>
            <mtd><mo>=</mo></mtd>
            <mtd>
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" columnspacing="1em" rowspacing="0.65em">
                  <mtr>
                    <mtd><mi>b</mi></mtd>
                    <mtd><mtext>if </mtext><mi>r</mi><mo>≥</mo><mn>1</mn></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mi>b</mi>
                      <mo>(</mo>
                      <mn>20</mn><msup><mi>r</mi><mn>2</mn></msup>
                      <mo>−</mo><mn>38</mn><mi>r</mi>
                      <mo>+</mo><mn>19</mn>
                      <mo>)</mo>
                    </mtd>
                    <mtd>
                      <mtext>if </mtext><mn>0.90</mn><mo>≤</mo><mi>r</mi><mo>&lt;</mo><mn>1</mn>
                    </mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mi>b</mi>
                      <mo>(</mo>
                      <mfrac>
                        <mrow><mn>0.5618</mn><mi>r</mi><mo>+</mo><mn>0.3944</mn></mrow>
                        <mi>r</mi>
                      </mfrac>
                      <mo>)</mo>
                    </mtd>
                    <mtd>
                      <mtext>if </mtext><mn>0.01</mn><mo>≤</mo><mi>r</mi><mo>&lt;</mo><mn>0.90</mn>
                    </mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mfrac><mi>b</mi><mi>r</mi></mfrac>
                      <mo>(</mo><mn>0.576</mn><mi>r</mi><mo>+</mo><mn>0.4</mn><mo>)</mo>
                    </mtd>
                    <mtd><mtext>if </mtext><mi>r</mi><mo>&lt;</mo><mn>0.01</mn></mtd>
                  </mtr>
                </mtable>
              </mrow>
            </mtd>
          </mtr>
        </mtable>
      </math>

      <p class="mt-6 mb-0 text-sm text-slate-600">
        U is the number of Argons required to unlock the Bitcoin. A<sub>c</sub>
        is Argon’s current market price, A<sub>t</sub> is Argon’s target price,
        B<sub>c</sub> is Bitcoin’s current market price, and B<sub>v</sub> is
        Bitcoin’s market price when it was locked.
      </p>
    </div>

    <ul>
      <li>
        When Argon is at or above target, the multiplier is one, and the lock uses its normal
        target-denominated redemption amount.
      </li>
      <li>
        When Argon is slightly below target, a smooth quadratic section discounts the cost of
        unlocking without introducing a sudden cliff at the target boundary.
      </li>
      <li>
        As Argon falls farther below target, the curve becomes increasingly aggressive. The
        Bitcoin can be cheaper to unlock in market-value terms even as the
        number of Argons burned grows dramatically higher.
      </li>
      <li>
        At extreme deviations, the curve approaches a cost near forty percent
        of the Bitcoin's target-denominated value while requiring an
        increasingly large quantity of discounted Argons to be removed.
      </li>
    </ul>

    <p>
      This combination formula ensures Bitcoin holders profit by
      buying discounted Argons to recover their Bitcoin, while the system gets
      the contraction it needs. The amount of active locked
      Bitcoin therefore determines how much potential burn capacity is
      available. Read more about
      <DocLink to="/docs/assets-and-entities/bitcoin-locks">Bitcoin Locks</DocLink>
      and <DocLink to="/docs/assets-and-entities/bitcoin-locks">Liquids</DocLink>.
    </p>

    <h3>The Purpose of Stable Swaps</h3>
    <p>
      Bitcoin Liquid Locking ensures that Argon is guaranteed to eventually return to target,
      however there is no guarantee on timeframe. Latency will naturally occur between price
      deviation, Bitcoin unlocking, and circulation reduction. This is where Stable Swaps comes
      into play. Argon Desktop provides simple Uniswap monitoring tools to create market alerts
      and present rapid arbitrage opportunities between chains. This allows small deviations to
      rapidly correct without waiting on the Bitcoin unlock process to reduce circulation. Learn
      more about
      <DocLink to="/docs/assets-and-entities/stable-swaps"
        >Stable Swaps</DocLink
      >.
    </p>

    <h3>Targeted Burning of Mining Auction Revenue</h3>
    <p>
      Mining-auction revenue is distributed according to the network’s need for Bitcoin capacity.
      When locked Bitcoin is below the Desired Bitcoin Space, the unused portion of the vaulting
      allocation is burned rather than redistributed. Based on network data last updated
      {{ dayjs(data.lastUpdatedAt).format('MMMM D, YYYY') }}, approximately
      {{ Math.round(bitcoinCapacityFilledPercent) }}% of the desired BTC amount is locked, resulting
      in roughly {{ Math.round(targetedBurnPercent) }}% of total auction revenue being targeted for
      burning. If the 20% Expansion Rewards allocation also goes unused, approximately
      {{ Math.round(totalPotentialBurnPercent) }}% of the auction pool would be removed from
      circulation every ten days. Of course, the amount burned fluctuates with demand for mining seats.
      Stronger competition produces larger winning bids and a larger burn, while weaker competition
      produces a smaller auction pool and less burning.
    </p>

    <h3>The Continuous Burn of the Sidechain</h3>
    <p>
      Bitcoin unlocking is not the only way Argons leave circulation.
      Argon's <DocLink to="/docs/assets-and-entities/sidechain">Sidechain</DocLink>
      operates as a fast, inexpensive micro-payment
      settlement layer. Payments on this Sidechain create transaction
      taxes, and these taxes are burned when the transaction settles on
      the mainchain. This provides a continuing supply sink as the payment
      network is used.
    </p>

    <h2>Guardrails and Timing</h2>
    <p>
      Several protections keep Argon's stabilization algorithms from causing an abrupt
      supply shock:
    </p>
    <ul class="list-disc ml-10">
      <li>
        CPI changes are bounded against historical ranges and smoothed between
        releases.
      </li>
      <li>
        Oracle and mainchain rules limit how quickly accepted prices and the
        target may move, particularly when moving away from target.
      </li>
      <li>
        A small dead zone prevents ordinary price noise from activating a
        response.
      </li>
      <li>
        Mining decisions use frame boundaries, recent averages, delayed
        cohorts, and dampened reward adjustments.
      </li>
      <li>
        Bitcoin Liquid payouts are queued, released gradually, and limited by prior
        mining issuance.
      </li>
      <li>
        Sidechains burns require finalized taxable activity, while ordinary
        Bitcoin redemption burns require the release to complete.
      </li>
    </ul>

    <h2>A Rubber Band, Not a Brittle Peg</h2>
    <p>
      Imagine a rubber band stretched between two poles, with its resting line at
      Argon's target price. Market forces can pull the middle of the band up or
      down. When it rebounds, it can overshoot and whiplash back and forth across
      that line. The movement can be sharp, but the tension keeps pulling it back
      toward target.
    </p>
    <p>
      Argon's economic incentives provide that restoring tension. Above target,
      the algorithms create opportunities to expand supply. Below target, they
      encourage supply to contract. Participants act on those opportunities,
      changing supply and feeding a new price signal back into the loop.
    </p>
    <p>
      The goal is for Argon to bounce back toward target as these responses play
      out. That does not mean it stays perfectly still or returns on a fixed
      schedule: the response depends on market conditions and participation.
      Stability comes from the continuing pull toward target, even as the market
      moves around it.
    </p>

    <p>
      For the wider context, see
      <DocLink to="/docs/system-design/how-it-works"
        >How Argon Works</DocLink
      > and
      <DocLink to="/docs/economic-pillars/recovery-from-death-spirals"
        >Recovery from Death Spirals</DocLink
      >.
    </p>

  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import * as Vue from "vue";
import dayjs from "dayjs";
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import Data from "@/lib/Data";
import { microgonToArgon } from "@/lib/currencyUtils";

const BITCOIN_CAPACITY_RATE = 0.15;
const VAULTING_ALLOCATION_PERCENT = 65;
const EXPANSION_REWARDS_ALLOCATION_PERCENT = 20;

const data = Vue.ref(Data.basics);

const desiredBitcoinSpaceInArgons = Vue.computed(() => Math.max(
  microgonToArgon(data.value.microgonsInCirculation.fromBitcoin),
  microgonToArgon(data.value.microgonsInCirculation.fromMining) * BITCOIN_CAPACITY_RATE,
));

const lockedBitcoinValueInArgons = Vue.computed(() => (
  data.value.vaulting.bitcoinLocked * data.value.usdForBtc / data.value.usdForArgon
));

const bitcoinCapacityFilledPercent = Vue.computed(() => (
  Math.min(1, lockedBitcoinValueInArgons.value / desiredBitcoinSpaceInArgons.value) * 100
));

const targetedBurnPercent = Vue.computed(() => (
  VAULTING_ALLOCATION_PERCENT * (1 - bitcoinCapacityFilledPercent.value / 100)
));

const totalPotentialBurnPercent = Vue.computed(() => (
  targetedBurnPercent.value + EXPANSION_REWARDS_ALLOCATION_PERCENT
));
</script>
