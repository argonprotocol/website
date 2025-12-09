<template>
  <MainLayout>
    <div class="mt-10 w-8/12 mx-auto">
      <h1 class="uppercase mt-10 mb-10 leading-20 border-b border-gray-300 pb-6 text-center font-bold text-slate-700">
        <div class="text-[2.7rem]">WE'RE BOOTSTRAPPING ARGON</div>
        <div class="font-bold text-[4.4rem] -mt-2">INTO A TRILLION DOLLAR</div>
        <div class="font-bold text-[6rem] whitespace-nowrap mt-4">STABLECOIN PLATFORM</div>
      </h1>

      <div class="border-b border-gray-300 py-5">
        <ul ArrowsContainer class="grid grid-cols-7 h-16 font-bold text-2xl text-white">
          <li :Selected="selectedPhase === 1 || undefined" class="relative w-full h-full">
            <div @click="selectPhase(1)" Arrow Start class="w-[calc(100%+10px)] h-full rounded-l-md">
              1
            </div>
          </li>
          <li :Selected="selectedPhase === 2 || undefined" class="relative w-full h-full">
            <div @click="selectPhase(2)" Arrow class="w-[calc(100%+10px)] relative left-[-1.6667px] h-full">
              2
            </div>
          </li>
          <li :Selected="selectedPhase === 3 || undefined" class="relative w-full h-full">
            <div :class="[selectedPhase === 3 ? 'opacity-100' : 'opacity-50']" class="absolute -top-3 left-0 -translate-y-full -translate-x-1/2">
              <PhasesArrow />
              <span class="text-white/80 font-black absolute top-0 -left-3 -translate-x-full -translate-y-1/2 whitespace-nowrap">We're Here</span>
            </div>
            <div @click="selectPhase(3)" Arrow class="w-[calc(100%+10px)] relative left-[-3.3334px] h-full">
              3
            </div>
          </li>
          <li :Selected="selectedPhase === 4 || undefined" class="relative w-[calc(100%+10px)] left-[-5.0001px] h-full">
            <div @click="selectPhase(4)" Arrow class="w-full h-full">
              4
            </div>
          </li>
          <li :Selected="selectedPhase === 5 || undefined" class="relative w-full h-full">
            <div @click="selectPhase(5)" Arrow class="w-[calc(100%+10px)] relative left-[-6.6667px] h-full">
              5
            </div>
          </li>
          <li :Selected="selectedPhase === 6 || undefined" class="relative w-full h-full">
            <div @click="selectPhase(6)" Arrow class="w-[calc(100%+10px)] relative left-[-8.3333px] h-full">
              6
            </div>
          </li>
          <li :Selected="selectedPhase === 7 || undefined" class="relative w-full h-full">
            <div @click="selectPhase(7)" Arrow class="w-[calc(100%+10px)] relative left-[-10px] h-full rounded-r-md">
              7
            </div>
          </li>
        </ul>
      </div>

      <div class="flex flex-col gap-5 w-8/12 mx-auto text-xl mt-12 font-light">
        <p class="text-justify">
          The world needs an alternative to inflation-ridden fiat currencies. Every year, fiat quietly erodes the savings of hard-working families while governments continue to accumulate unsustainable debts that threaten to collapse the entire system.
        </p>

        <p class="text-justify">
          Argon is designed to break this cycle, and it's doing it on top of Bitcoin. Argon's economic model uses the
          process of endosymbiosis &ndash; the act of minting Argon from Bitcoin &ndash; to consume and convert Bitcoin's
          fixed 21M supply into a stable currency. Its math creates an exponential growth curve that will continue to grow
          until it establishes a stablecoin circulation worth twice Bitcoin's market value. At that scale, Argon will have
          achieved the critical mass required to stand as an independent, global currency.
        </p>

        <p class="text-justify">
          On January 15, 2025, Argon launched with zero rewards in its genesis block. Unlike most other crypto projects, Argon showed no favoritism
          to the founders or early adopters. Its goal of becoming the world's dominant currency
          requires a platform that can be fully trusted, fully open, and accessible to everyone. From day one.
        </p>

        <p class="text-justify">
          Argon's launch is unfolding across seven phases. The first two are now complete. The third is underway. You're invited to join us at
          any point along the journey.
        </p>
      </div>

      <div class="flex flex-col w-8/12 mx-auto gap-2 mt-10 pb-10">


        <div PhasesContainer class="flex flex-col gap-5 border border-black/60 border-t-0 rounded-md rounded-t-none px-12 py-10 mb-20" style="box-shadow: inset 1px 0 0 rgba(255, 255, 255, 0.2), 1px 1px 0 rgba(255, 255, 255, 0.2);">
          <div v-if="selectedPhase === 1">
            <h2>
              <div PhaseNumber>PHASE ONE</div>
              <div PhaseTitle>Initiate First Tokens Into Existence Through a Fair and Open Process</div>
            </h2>
            <div EstimatedTimeframe>Timeframe: ~2 months</div>

            <div PhasesContent>
              <p>
                Argon's launch was a contrarian approach from most crypto projects. Rather than seeding the
                network with tokens in its genesis block, Argon began with zero. To ensure a fair distribution,
                it introduced a two-step process that used two different consensus mechanisms, giving everyone an
                equal chance to earn early rewards.
              </p>

              <h3 class="font-bold mt-2">Proof-of-Compute-Work</h3>
              <p>
                Beginning January 15, 2025, anyone could connect their laptop, desktop, or even rented cloud servers
                to the Argon network and join the mining process. Argon employed a custom, ASIC-resistant
                proof-of-work algorithm designed to keep mining accessible and competitive. Thousands of machines
                contributed from around the world, bootstrapping the initial token supply. This effort resulted is around
                ~10,000 argons being minted into existence, providing enough circulation for the next phase to begin.
              </p>

              <h3 class="font-bold mt-2">Proof-of-Authorized-Work</h3>
              <p>
                On March 6, 2025, Argon transitioned into its second phase-one launch step. From this point forward, active
                miners were determined through auctions. Participants were required to bid argons for the right to secure a mining
                seat. Winners were selected based on highest bid. The mining seats were allowed to mine for a set duration.
                This system created a transparent, market-based method for allocating mining power.
              </p>

              <h3 class="font-bold mt-2">Why This Matters</h3>
              <p>
                The two-step launch solved a critical challenge: with no founder tokens in the genesis block, it
                would have been impossible to bid for mining seats on day one. There were no argons to bid with!
                Proof-of-Compute-Work allowed argons to be minted organically, paving the way for Proof-of-Authorized-Work to take over.
              </p>

              <p class="mt-2 font-bold">
                <span @click="selectPhase(2)" class="cursor-pointer hover:underline hover:text-argon-100">Next Step: Stabilize the Mining Seat Auctions with Transparency and Liquidity ⟫</span>
              </p>
            </div>
          </div>
          <div v-if="selectedPhase === 2">
            <h2>
              <div PhaseNumber>PHASE TWO</div>
              <div PhaseTitle>Stabilize the Mining Seat Auctions with Transparency and Liquidity</div>
            </h2>
            <div EstimatedTimeframe>Timeframe: ~6 months</div>

            <div PhasesContent>
              <p>
                Phase One of Argon's launch was successful in bootstrapping the network and proving that Argon's unique auction model
                would work. It also inspired new ideas for how we could make the protocol more transparent, more liquid,
                and more stable. For details, see our
                <a href="https://clarkbyrnes.substack.com/p/argon-learnings-from-epoch-one" class="opacity-80 hover:opacity-100 underline decoration-dashed decoration-argon-400">Learnings From Epoch One</a>
                blog post.
              </p>

              <p>
                Over the following six months, we designed, implemented, and rigorously tested an enhanced auction framework.
                The result is a more efficient, balanced, and open process that will provide a stronger foundation for the next stage
                of Argon's long-term growth.
              </p>

              <p class="mt-2 font-bold">
                <span @click="selectPhase(3)" class="cursor-pointer hover:underline hover:text-argon-100">Next Step: Grow Argon Into An Economically-Viable, Global Medium of Exchange ⟫</span>
              </p>
            </div>
          </div>
          <div v-if="selectedPhase === 3">
            <h2>
              <div PhaseNumber>PHASE THREE</div>
              <div PhaseTitle>Grow Argon Into An Economically-Viable, Global Medium of Exchange</div>
            </h2>
            <div EstimatedTimeframe>Estimated Timeframe: ~8 months</div>

            <div PhasesContent>
              <p>
                Phase Three marks a critical inflection point where we begin scaling Argon into a major stablecoin. It also
                coincides with the launch of Argon Commander, a desktop app for Windows, Linux, and macOS that makes mining
                and vaulting simple and accessible for all.
              </p>

              <p>
                The goal is to expand Argon's circulation to 200-300 million tokens. This would provide a threshold large
                enough to support meaningful market activity without unhealthy price volatility.
              </p>

              <h3 class="font-bold">What's Needed</h3>

              <ul>
                <li class="list-['-'] ml-3 pl-3"><strong>A robust community of miners</strong>. These miners will mint the 200M-300M argons required for a functioning economy, earning the value of those newly created tokens.</li>

                <li class="list-['-'] ml-3 pl-3 mt-5"><strong>A robust community of vaulters</strong>. These vaulters will securitize argons by locking bitcoin, stabilizing the system, and earning payouts from the treasury pools.</li>

                <li class="list-['-'] ml-3 pl-3 mt-5"><strong>Bitcoiners who liquid-lock</strong>. By locking their bitcoins, they help stabilize Argon while gaining the ability to unlock the full market value of their assets—hedging against downside volatility.</li>
              </ul>

              <p>
                Together, these participants form the foundation of Argon's economic engine.
              </p>

              <p class="mt-2 font-bold">
                <span @click="selectPhase(4)" class="cursor-pointer hover:underline hover:text-argon-100">Next Step: Activate the AI Payments Layer ⟫</span>
              </p>
            </div>
          </div>

          <div v-if="selectedPhase === 4">
            <h2>
              <div PhaseNumber>PHASE FOUR</div>
              <div PhaseTitle>Activate the AI Payments Layer</div>
            </h2>
            <div EstimatedTimeframe>Estimated Timeframe: ~6 months</div>

            <div PhasesContent>
              <p></p>

              <p class="mt-2 font-bold">
                <span @click="selectPhase(5)" class="cursor-pointer hover:underline hover:text-argon-100">Next Step: Launch the Larger Payments Layer ⟫</span>
              </p>
            </div>
          </div>

          <div v-if="selectedPhase === 5">
            <h2>
              <div PhaseNumber>PHASE FIVE</div>
              <div PhaseTitle>Launch the Larger Payments Layer</div>
            </h2>
            <div EstimatedTimeframe>Estimated Timeframe: ~12 months</div>

            <div PhasesContent>
              <p></p>

              <p class="mt-2 font-bold">
                <span @click="selectPhase(6)" class="cursor-pointer hover:underline hover:text-argon-100">Next Step: Split Mining Seats Into Fractional Ownership to Sustain Larger Growth ⟫</span>
              </p>
            </div>
          </div>

          <div v-if="selectedPhase === 6">
            <h2>
              <div PhaseNumber>PHASE SIX</div>
              <div PhaseTitle>Split Mining Seats Into Fractional Ownership to Sustain Larger Growth</div>
            </h2>
            <div EstimatedTimeframe>Estimated Timeframe: ~3 months</div>

            <div PhasesContent>
              <p></p>

              <p class="mt-2 font-bold">
                <span @click="selectPhase(7)" class="cursor-pointer hover:underline hover:text-argon-100">Next Step: Facilitate Sovereign SDK Integration⟫</span>
              </p>
            </div>
          </div>

          <div v-if="selectedPhase === 7">
            <h2>
              <div PhaseNumber>PHASE SEVEN</div>
              <div PhaseTitle>Facilitate Sovereign SDK Integration</div>
            </h2>
            <div EstimatedTimeframe>Estimated Timeframe: ~5 years</div>

            <div PhasesContent>
              <p></p>

            </div>
          </div>

        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import MainLayout from "@/navigation/MainLayout.vue";

const selectedPhase = Vue.ref(3);

function selectPhase(phase: number) {
  selectedPhase.value = phase;
}

</script>

<style scoped>
@import "../../main.css";

[ArrowsContainer] {
  [Arrow] {
    @apply flex flex-row items-center justify-center border border-argon-900 bg-argon-800 hover:bg-argon-900 cursor-pointer;

    clip-path: polygon(
        0% 0%,
        calc(100% - 30px) 0%,
        100% 50%,
        calc(100% - 30px) 100%,
        0% 100%,
        30px 50%
    );
  }
  [Arrow][Start] {
    clip-path: polygon(
        0% 0%,
        calc(100% - 30px) 0%,
        100% 50%,
        calc(100% - 30px) 100%,
        0% 100%
    );
  }
  [Arrow][End] {
    clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        0% 100%,
        30px 50%
    );
  }

  li[Selected] [Arrow] {
    @apply bg-argon-400 border border-argon-800 inner-button-shadow;
  }
}
</style>