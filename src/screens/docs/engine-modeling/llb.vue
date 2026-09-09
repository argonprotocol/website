<template>
  <DocHeader>Liquid Locking for Bitcoin Model</DocHeader>

  <DocContent>
    <p>
      The Liquid Locking for Bitcoin model—LLB—is an interactive way to explore
      how Bitcoin could contribute to Argon's stability while remaining a
      productive asset for its owner. It replays historical Bitcoin prices and
      lets you see how a modeled position would have changed as the market
      moved.
    </p>

    <p>
      Choose an amount of Bitcoin, a historical period, and a price threshold
      for adjusting the position. You can then introduce hypothetical drops in
      the price of ARGN and compare the modeled result with simply holding the
      Bitcoin over the same period.
    </p>

    <a
      class="my-8 flex items-center justify-between gap-5 rounded-lg border border-argon-400 bg-argon-50/60 px-5 py-5 text-slate-900 no-underline transition-colors hover:border-argon-600 hover:bg-argon-100/60"
      href="https://llb.argonprotocol.org/"
      target="_blank"
      rel="noreferrer"
    >
      <span>
        <strong class="block text-xl text-argon-700">Open the LLB Model</strong>
        <span class="mt-1 block text-sm text-slate-600">
          Build a historical scenario and follow it across the Bitcoin price
          chart.
        </span>
      </span>
      <span class="shrink-0 text-2xl text-argon-600" aria-hidden="true">→</span>
    </a>

    <aside
      class="my-8 rounded-lg border border-amber-300 bg-amber-50/60 px-5 py-4"
    >
      <strong class="mb-1 block text-amber-900"
        >The model uses earlier terminology</strong
      >
      <p class="m-0 text-amber-900/80">
        LLB was created when locking Bitcoin and receiving ARGN were described
        together as “Liquid Locking.” Argon now treats these as separate
        actions: a
        <DocLink to="/docs/assets-and-entities/bitcoin-locks"
          >Bitcoin Lock</DocLink
        >
        secures the BTC, while an optional
        <DocLink to="/docs/assets-and-entities/bitcoin-liquids"
          >Bitcoin Liquid</DocLink
        >
        creates the ARGN position.
      </p>
    </aside>

    <h2>What You Can Explore</h2>
    <p>
      LLB turns a few economic ideas into a scenario you can inspect day by day.
      As the historical Bitcoin price changes, the model records when the
      position would adjust, how much cash it would have produced, and what it
      would cost to close.
    </p>

    <ul>
      <li>
        <strong>Historical price paths.</strong> Start and end the simulation on
        different dates to see how the same strategy behaves in rising, falling,
        and volatile Bitcoin markets.
      </li>
      <li>
        <strong>Ratchet thresholds.</strong> Change how far Bitcoin must move
        before the modeled position adjusts to its new value.
      </li>
      <li>
        <strong>ARGN price shocks.</strong> Add hypothetical price drops to see
        how discounted Argons could affect the cost of recovering the Bitcoin.
      </li>
      <li>
        <strong>Strategy comparison.</strong> Compare the modeled cash flow and
        final value with the result of holding the same Bitcoin for the entire
        period.
      </li>
    </ul>

    <p>
      The chart and action history make each change visible rather than reducing
      the run to a single return percentage. The underlying data can also be
      downloaded for closer inspection.
    </p>

    <h2>How to Read the Results</h2>
    <p>
      LLB is a retrospective thought experiment, not a forecast or a return
      calculator for a current Bitcoin Liquid. It follows historical Bitcoin
      prices, combines them with assumptions selected inside the model, and
      applies the rules encoded when the tool was built. Market liquidity,
      execution, current fees, insurance, and later protocol changes can all
      produce different real-world outcomes.
    </p>

    <p>
      Use the model to develop intuition about the relationship between Bitcoin
      volatility, ARGN price movements, and supply contraction. For the broader
      system-level stress test, continue to the
      <DocLink to="/docs/engine-modeling/sam"
        >Stabilization Analysis Model</DocLink
      >. You can also
      <a
        href="https://github.com/argonprotocol/llb"
        target="_blank"
        rel="noreferrer"
        >inspect the LLB source code</a
      >.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
