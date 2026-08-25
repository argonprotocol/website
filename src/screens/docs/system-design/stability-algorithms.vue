<template>
  <DocHeader>Stability Algorithms</DocHeader>
  <DocContent>
    <p>
      Argon does not stabilize its market price by promising redemption for a
      dollar or by asking one organization to defend a peg. Instead, the
      network measures the difference between a moving target price and the
      price found in an open market. That difference changes the economic
      opportunities available to miners and Bitcoin holders.
    </p>

    <p>
      These algorithms do not directly place trades or force anyone to mint or
      burn Argons. They change incentives and enforce the rules under which
      voluntary actions can expand or contract the supply.
    </p>

    <h2>Three Values Drive the System</h2>
    <p>
      The stabilization loop begins with three values maintained by the
      mainchain:
    </p>
    <ol>
      <li>
        <strong>Target price.</strong> Argon's starting reference price is
        adjusted as the U.S. Consumer Price Index changes. The oracle smooths
        each new CPI reading across the period before the next release, so the
        target moves gradually instead of jumping once a month.
      </li>
      <li>
        <strong>Market price.</strong> The oracle observes the Argon/USDC market
        on Uniswap, adjusts for the market price of USDC in dollars, and submits
        the resulting Argon price to the mainchain.
      </li>
      <li>
        <strong>Circulating supply.</strong> The mainchain uses the total number
        of issued Argons to translate the price difference into a desired
        supply change.
      </li>
    </ol>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="block mb-1">A target is not a redemption promise</strong>
      <p class="m-0">
        The dollar is used as a measurement unit for the price index. Argon is
        not redeemable for a dollar, and the protocol does not guarantee that
        its market price will equal its target at every moment. The target is a
        purchasing-power reference used by the algorithms.
      </p>
    </aside>

    <h2>Calculating the Price Signal</h2>
    <p>
      The runtime calls its price-deviation signal the <strong>Argon CPI</strong>.
      This is distinct from the U.S. Consumer Price Index used to move the
      target. Its core calculation is:
    </p>

    <div
      class="my-8 overflow-x-auto rounded-lg border border-gray-400 bg-white/30 px-5 py-6 text-center font-['Latin_Modern_Math'] text-xl sm:text-2xl"
    >
      Argon CPI = (target price ÷ market price) − 1
    </div>

    <p>
      The sign may seem backward at first, but it tells the runtime which supply
      response is needed:
    </p>

    <div class="my-8 grid gap-3 sm:grid-cols-3">
      <div class="rounded-lg border border-slate-300 bg-white/40 p-4">
        <strong class="block mb-2">Market above target</strong>
        <div class="mb-2 text-sm font-semibold text-slate-600">
          Negative signal
        </div>
        <p class="m-0">More circulating supply is desired.</p>
      </div>
      <div class="rounded-lg border border-slate-300 bg-white/40 p-4">
        <strong class="block mb-2">Market near target</strong>
        <div class="mb-2 text-sm font-semibold text-slate-600">
          Zero signal
        </div>
        <p class="m-0">No price-driven supply adjustment is requested.</p>
      </div>
      <div class="rounded-lg border border-slate-300 bg-white/40 p-4">
        <strong class="block mb-2">Market below target</strong>
        <div class="mb-2 text-sm font-semibold text-slate-600">
          Positive signal
        </div>
        <p class="m-0">Less circulating supply is desired.</p>
      </div>
    </div>

    <p>
      The desired change is the opposite of this signal multiplied by the
      circulating supply. A larger price gap or a larger circulation therefore
      produces a larger requested response. Very small price differences are
      treated as ordinary market noise and produce a zero signal.
    </p>

    <h2>Expansion When Argon Is Above Target</h2>
    <p>
      A market price above target indicates that buyers are demanding more
      Argons than sellers are currently making available. The mainchain can
      expand supply through mining and, under constrained conditions, through
      Bitcoin Locks.
    </p>

    <h3>Mining Issuance</h3>
    <p>
      At the beginning of a new mining frame, the runtime reviews the recent
      average price signal and the current signal. When expansion is still
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
      This delay matters. A market observation does not instantly rebase every
      wallet. It changes issuance delivered through independent miners over
      time. Learn more about
      <router-link to="/docs/assets-and-entities/mining-operations"
        >Mining Operations</router-link
      >.
    </p>

    <h3>Bitcoin Lock Liquidity</h3>
    <p>
      Funding a Bitcoin Lock creates a queued right to receive Argons based on
      the lock's Bitcoin value and onchain terms. That queue is not an
      unrestricted source of new currency. The minting pallet pays Bitcoin Lock
      liquidity only while Argon's market price is at or above its target, and
      the cumulative amount minted for Bitcoin Locks cannot exceed the tracked
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
      onchain.
    </p>

    <h2>Contraction When Argon Is Below Target</h2>
    <p>
      A market price below target indicates that more Argons are available than
      buyers currently want. The first response is to stop adding
      price-triggered supply: frame-level mining issuance stops, queued Bitcoin
      Lock mints pause, and adaptive block rewards move back toward their base
      minimum.
    </p>

    <p>
      Stopping new issuance does not remove Argons that already exist. Actual
      contraction occurs when Argons are burned. Bitcoin unlocking supplies the
      price-responsive burn mechanism.
    </p>

    <h3>The Bitcoin Redemption Curve</h3>
    <p>
      To release funded Bitcoin, its owner must first place the required number
      of Argons on hold. Once the release is completed on Bitcoin, the mainchain
      burns those Argons. The required quantity is calculated from the Bitcoin's
      target-denominated value, capped by the lock's recorded target value, and
      a multiplier based on this ratio:
    </p>

    <div
      class="my-8 overflow-x-auto rounded-lg border border-gray-400 bg-white/30 px-5 py-6 text-center font-['Latin_Modern_Math'] text-xl sm:text-2xl"
    >
      r = market price ÷ target price
    </div>

    <ul>
      <li>
        At or above target, the multiplier is one. The lock uses its normal
        target-denominated redemption amount.
      </li>
      <li>
        Just below target, a smooth quadratic section discounts the cost of
        unlocking without introducing a sudden cliff at the target boundary.
      </li>
      <li>
        Farther below target, the curve becomes increasingly aggressive. The
        Bitcoin can be cheaper to unlock in market-value terms even as the
        number of Argons burned grows dramatically.
      </li>
      <li>
        At extreme deviations, the curve approaches a cost near forty percent
        of the Bitcoin's target-denominated value while requiring an
        increasingly large quantity of discounted Argons to be removed.
      </li>
    </ul>

    <p>
      This combination is the key incentive. A Bitcoin holder may profit by
      buying discounted Argons to recover their Bitcoin, while the system gets
      the contraction it needs. An ordinary redemption burn occurs only when a
      holder chooses to complete an unlock. Other terminal outcomes, including
      an early Bitcoin spend or expiration, can instead require the vault to
      supply the burn under the lock's onchain rules. The amount of active locked
      Bitcoin therefore determines how much potential burn capacity is
      available. Read more about
      <router-link to="/docs/assets-and-entities/bitcoin-locks"
        >Bitcoin Locks</router-link
      >.
    </p>

    <h3>Where Stable Swaps Fit</h3>
    <p>
      Argon Desktop can identify discounted Argons in the Uniswap market and
      estimate a purchase that would move the pool back toward target. Buying
      those Argons creates direct market demand and can change the next price
      observation, but it is not another mainchain mint-or-burn rule. Purchased
      Argons remain in circulation unless they are later used in a burn. Learn
      more about
      <router-link to="/docs/assets-and-entities/stable-swaps"
        >Stable Swaps</router-link
      >.
    </p>

    <h2>The Continuous Localchain Burn</h2>
    <p>
      Bitcoin unlocking is not the only way Argons leave circulation.
      Localchain payments create transaction taxes, and the finalized tax total
      is burned when its notebook is processed by the mainchain. This provides
      a continuing supply sink as the payment network is used.
    </p>

    <p>
      The current Localchain tax rule does not read the Argon price signal, so
      it should not be confused with the responsive Bitcoin redemption curve.
      It is a baseline counterpressure that operates alongside the primary
      expansion and contraction algorithms.
    </p>

    <h2>Guardrails and Timing</h2>
    <p>
      Several protections keep a single observation from causing an abrupt
      supply shock:
    </p>
    <ul>
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
        Bitcoin Lock liquidity is queued, paid gradually, and limited by prior
        mining issuance.
      </li>
      <li>
        Localchain burns require finalized taxable activity, while ordinary
        Bitcoin redemption burns require the release to complete.
      </li>
    </ul>

    <h2>A Feedback Loop, Not an Automatic Peg</h2>
    <p>
      Market trading produces the price signal. The mainchain translates that
      signal into bounded opportunities to issue or burn Argons. Participants
      decide whether those opportunities are worthwhile, their actions change
      the supply, and the market produces the next signal.
    </p>

    <p>
      The algorithms are therefore designed to move supply toward demand, not
      to guarantee an exact price at every instant. Response time depends on
      market liquidity, active miners, available Bitcoin burn capacity, and
      voluntary participation. For the wider context, see
      <router-link to="/docs/system-design/how-it-works"
        >How Argon Works</router-link
      > and
      <router-link to="/docs/economic-pillars/recovery-from-death-spirals"
        >Recovery from Death Spirals</router-link
      >.
    </p>

  </DocContent>
</template>

<script setup lang="ts">
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
</script>
