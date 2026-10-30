<template>
  <DocHeader>Market Stabilizers</DocHeader>

  <DocContent>
    <p>
      Market Stabilizers reward participants for supplying liquidity near
      Argon's target price and buying ARGN when it trades below target. They
      give users two ways to support the market: Stabilizer Pools
      and Stabilizer Buys.
    </p>

    <p>
      Stabilizer Pools combine Uniswap trading fees with a share of daily
      mining revenue. Stabilizer Buys offer competitive bonuses for
      below-target purchases that are moved to Argon and locked. Both use
      Argon's current target price, which adjusts with inflation rather than
      remaining fixed at one U.S. dollar. See
      <DocLink to="/docs/system-design/stabilization-algorithms">Stabilization Algorithms</DocLink>
      for how the target is calculated.
    </p>

    <h2>Stabilizer Pools</h2>
    <p>
      A Stabilizer Pool position is a Uniswap liquidity position in an
      official ARGN/USDC pool. Its liquidity is meant to sit within
      the 10% band below Argon's target price: between 90% and 100% of the
      target. This places liquidity where it can support purchases as ARGN
      trades at or below target.
    </p>

    <h3>Trading Fees</h3>
    <p>
      The official pools charge different fees for buying and selling ARGN.
      Liquidity providers earn Uniswap fees from trading activity in the pool.
    </p>

    <section class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40">
      <header class="border-b border-slate-300 bg-slate-100/70 px-5 py-3 text-sm font-bold tracking-wide text-slate-600 uppercase">
        Pool Trading Fees
      </header>
      <div class="grid sm:grid-cols-2">
        <div class="border-b border-slate-300 p-5 sm:border-r sm:border-b-0">
          <div class="text-2xl font-bold text-argon-600">0.5%</div>
          <div class="mt-1 text-sm text-slate-600">Fee for buying ARGN</div>
        </div>
        <div class="p-5">
          <div class="text-2xl font-bold text-argon-600">10%</div>
          <div class="mt-1 text-sm text-slate-600">Fee for selling ARGN</div>
        </div>
      </div>
    </section>

    <h3>Daily Mining Revenue</h3>
    <p>
      In addition to Uniswap fees, Stabilizer Pool participants receive a share
      of each day's mining revenue. The allocation is based on the amount of
      <strong>USDC in their position at the start of the day</strong>.
    </p>
    <p>
      Each day's mining earnings enter a <strong>30-day lock</strong> before
      becoming available. This lock applies to the mining-revenue payments
      earned by the position.
    </p>

    <h2>Stabilizer Buys</h2>
    <p>
      When ARGN trades below its target price, users can place Stabilizer Buy
      orders through a special Ethereum contract. Successful
      purchases are automatically moved to Argon and placed into a lock.
      The mechanism rewards participants for buying discounted ARGN and
      committing it to a locked position.
    </p>

    <h3>A Bonus Based on the Discount</h3>
    <p>
      The starting bonus is <strong>100% of the purchase's discount</strong>
      from target. Users can bid a lower bonus percentage to give their orders
      priority. A bid of 80%, for example, asks for a bonus equal to 80% of
      the discount instead of the full discount.
    </p>

    <h3>How Bonus Bids Compete</h3>
    <ol>
      <li>
        <strong>Choose a bonus bid.</strong> Specify the bonus percentage you
        are willing to accept for a below-target buy.
      </li>
      <li>
        <strong>Lower bids take priority.</strong> Buys are ordered by their
        requested bonus percentage, with users accepting less ranked ahead
        of users asking for more.
      </li>
      <li>
        <strong>Only 90% receive a bonus.</strong> Only 90% of below-target
        buys receive the bonus payment, so completing a purchase does not
        guarantee that it earns a bonus.
      </li>
    </ol>

    <p>
      The limited bonus coverage creates competition between buyers. Accepting
      a smaller share of the discount improves a buy's ranking, encouraging
      bids below the starting bonus of 100%. Successful purchases are moved
      to Argon and locked whether or not they receive a bonus.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
