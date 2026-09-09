<template>
  <DocHeader>Growth Simulator</DocHeader>

  <DocContent>
    <aside class="mb-4 rounded-lg border border-amber-300 px-4 py-2 text-amber-950 font-bold">
      NOTE: This page documents the upcoming release of Argon Mainnet v1.5.
    </aside>
    <p>
      Argon Network's growth algorithms link mining and vaulting into an exponential feedback loop, at least, early on.
      This growth can only last until the network's value exceeds 2x Bitcoin’s market capitalization, then it
      dramatically slows down.
    </p>

    <p>
      When Argon's mining returns are high, the only way to reduce them is to increase competitive bidding
      which increases bid costs. This generates additional revenue for the vaults, which in turn
      attracts more vault capital and BTC locking. This drives more minting of Argons, which increases mining
      returns, and so the cycle repeats.
    </p>

    <aside class="mb-8 rounded-lg border border-amber-300 bg-amber-50 px-5 pt-4 text-amber-950">
      <strong class="mb-1 block">Academic Illustrations Only</strong>
      <p class="m-0">
        This page uses current network data and adjustable models to illustrate
        how value moves through Argon's economy. It does not predict future
        market prices or imply any specific return.
      </p>
    </aside>

    <p>
      Argon's Mining APY is currently running at
      {{ miningApy >= 1e12 ? '≥1T' : numeral(miningApy).format([1e3, 1e6, 1e9].some(unit => Math.abs(miningApy) >= 10 * unit && Math.abs(miningApy) < 100 * unit) ? '0.0a' : ((Math.abs(miningApy) < 10000 || (Math.abs(miningApy) >= 1e6 && Math.abs(miningApy) < 1e7) || (Math.abs(miningApy) >= 1e9 && Math.abs(miningApy) < 1e10)) ? '0.[00]a' : '0a')).toUpperCase() }}%
      (as of {{ dayjs(Data.basics.lastUpdatedAt).format('MMMM D, YYYY') }}). The S&amp;P 500's
      best calendar year ever was in <a href="https://www.slickcharts.com/sp500/returns/details">1933, when
      it returned 53.99%, including reinvested dividends</a>. Click on the Mining APY box in the simulator
      below to start. It will begin by reducing the Mining APY to 53.99%. Press the center control to play or pause,
      or follow the highlighted boxes to continue stepping through the cycle.
    </p>

    <GrowthSimulator />

    <p>
      The above engine uses several throttles to incorporate realistic constraints on the returns.
      For example, the growth per cycle is capped at 50% for mining-bid revenue and vault capital, and it
      caps locked Bitcoin at 100%. Argonot price fluctuations are limited to 50% per day, with usable Bitcoin
      capped at 17.5 million BTC (instead of the 21 million BTC on-chain).
    </p>

    <p>
      Each cycle contains six steps. Pausing lets the current step finish; press play again to continue.
      Select Reset to reload network data and start over.
    </p>

    <p>
      Ultimately the network's growth depends on how participants respond to the opportunities created by Argon’s algorithms.
      The model begins with the current data from mainnet and assumes competition will be attracted to high returns.
      It also assumes participants will find value in liquid locking Bitcoins, and more generally, in the concept
      of a truly stable stablecoin. These are assumptions about market behavior, separate from mainchain’s rules.
    </p>

    <p>
      Obviously, slower demand can change the outcome, and network value can decline.
    </p>

    <p>
      As available Bitcoin capacity runs out, the model anticipates weaker growth and adjusts expected returns.
      If a calculation limit is reached, the simulation stops and keeps its last valid state.
    </p>

    <p>
      See <router-link to="/docs/system-design/economic-drivers">Economic Drivers</router-link> for the individual
      returns and <router-link to="/docs/system-design/stabilization-algorithms">Stabilization Algorithms</router-link>
      for supply rules.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import GrowthSimulator from "@/components/simulators/GrowthSimulator.vue";
import Data from "@/lib/Data";
import numeral from "@/lib/numeral";
import dayjs from "dayjs";

const miningApy = ((1 + Data.basics.miningTDR / 100) ** (365 / 10) - 1) * 100;
</script>
