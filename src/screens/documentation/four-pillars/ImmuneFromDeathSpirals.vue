<template>
  <SubLayout>
    <Breadcrumbs>
      <RouterLink to="/learn">Learn</RouterLink>
      <RouterLink to="/learn/four-pillars">The Four Pillars of Argon</RouterLink>
    </Breadcrumbs>
    <SubTitle>Immune from Death Spirals</SubTitle>

    <SubContent class="space-y-4">
      
      <div class="font-extralight italic text-4xl leading-12 my-10 mr-28">
        A well-designed currency should never be at risk of collapsing to worthless;
        it must contain properties that are eternally desirous regardless of its usage as money.
      </div>

      <p>The further Argon falls, the faster it rebounds back to target.</p>

      <h3 class="text-2xl font-bold mt-10">Terra Collapse</h3>
      <TimeChart :series="[{ color: '#D66F00FF', points: [] }]" class="mt-7 mb-5" />

      <p>Show Christensen's prediction of collapse of TerraUSD.</p>

      <p>
        Algorithmic stablecoins hold the promise of being fully decentralized, however, in practice,
        none have worked. Much has been written about why they've failed. One of the best is
        <a class="underline decoration-dashed text-argon-600" href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3899499">On the Economic Design of Stablecoins</a>
        by Christian Catalini, a professor at MIT's Sloan School of Management. In it, he predicts the multi-billion dollar
        collapse of Terra nearly a year before it happened. He argues that an endogenous token, such as Terra's
        Luna, creates a the recipe for a collapse that exponentially accelerates the faster it falls.
      </p>

      <p>Until now, the only known endogenous mechanisms available to stablecoins has been the use of centralized fiat and/or the
        use of centralized derivative markets such as Ethena's USDe.
      </p>

      <h3 class="text-2xl font-bold mt-10">Argon's Ability to Recover</h3>
      <p>show chart of argon price curve... as if it were terra... then show it rebounding</p>
      <TimeChart :series="[{ color: '#D66F00FF', points: [] }]" class="mt-7 mb-5" />

      <p>
        The way it happened... argon created a bunch of shorts against the currency. These shorts are in the form of bitcoins.
        Massive wall of shorts against the Argon price.
      </p>

      <h3 class="text-2xl font-bold mt-10">Bitcoin As the 2.4 Trillion Exogenous Short</h3>

      <p>[on the left show a vault. On the right show a single bitcoin coming out... and it's return on]</p>

      <p>
        There are many ways to classify stablecoin designs, but the two broadest are
        asset-backed-stabilization versus algorithmic-stabilization. Asset-backed stablecoins include USDC, Tether,
        and the DAI. One of the primary challenges of asset-backed stablecoins is they're impossible to efficiently
        decentralize. In short, they're beholden to banks, governments, fiat currencies, and the other centralized entities
        used to stabilize them.
      </p>
      
      <h3 class="text-2xl font-bold mt-10">Every Asset-Backed Stablecoin Is a Time Bomb</h3>

      <p>
        Argon solves one of the core problems inherent in previous algorithmic stablecoins, which is 
        the spiral inducing risk of endogenous (internal) stabilization assets.
      </p>

      <p>
        Every asset-backed stablecoin is a time bomb. They're all dependent on the continued existence of the asset they're backed by.
        If the asset goes down, the stablecoin goes down. If the asset goes up, the stablecoin goes up.
      </p>
      
    </SubContent>
  </SubLayout>
</template>

<script setup lang="ts">
import SubLayout, { SubTitle, SubContent, Breadcrumbs } from '../../../navigation/SubLayout.vue';
import TimeChart from '../../../components/TimeChart.vue';

</script>


<style scoped>
@import "../../../main.css";

</style>