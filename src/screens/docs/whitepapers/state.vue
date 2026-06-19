<template>
  <article>
    <DocHeader>
      On the Stabilization of
      Collateral-Backed Stablecoins
    </DocHeader>

    <div>
      By Caleb Clark & Blake Byrnes
    </div>

    <div class="mt-5">
      <p>
        <strong>Abstract.</strong> Stablecoins are cryptocurrencies designed to solve the volatility of Bitcoin by pegging
        to a reference asset, most commonly the dollar. Success has been mixed. Some stablecoins have
        gone into death-spirals, ultimately falling to worthless. Others have managed to survive, although
        all have de-pegged at various points in their history.
      </p>
      <p>
        This paper surfaces two critical issues inherent in every stablecoin known to-date.
        The first is that, regardless of whether a stablecoin has so-far managed to avoid death-spiraling,
        every stablecoin is at a constant risk of death-spiraling due to their collateralized-asset designs.
        The second issue is that the collateralized-assets underlying these stablecoins create an
        unavoidable systemic dichotomy: the greater their move towards risk reduction, the less
        decentralized their currency.
      </p>
      <p>
        This paper argues a contrarian view within the crypto space, which is that collateralization is not
        only unneeded, it is harmful. A truly stable stablecoin should have zero collateral. We show that in
        the world of currency, collateralized assets create more negatives than benefits.
      </p>
      <p>
        This paper also introduces a novel stabilization approach, a new type of algorithmic stablecoin that
        uses unrestrained profit incentives to remove the possibility of death-spirals. It’s a self-regulating,
        decentralized structure that works regardless of the market’s confidence in the stablecoin.
      </p>
    </div>

    <h2>Table of Contents</h2>
    <div class="whitepaper-toc">
      <div class="toc-row">
        <span>Introduction</span>
        <span>4</span>
      </div>
      <div class="toc-row">
        <span>The Need for Digital Currency</span>
        <span>4</span>
      </div>
      <div class="toc-row">
        <span>The Need for Stablecoins</span>
        <span>5</span>
      </div>
      <div class="toc-row">
        <span>Bitcoin’s Volatility</span>
        <span>6</span>
      </div>
      <div class="toc-row">
        <span>Ensuring Price Stability</span>
        <span>7</span>
      </div>
      <div class="toc-row">
        <span>Current Stablecoin Usage</span>
        <span>7</span>
      </div>
      <div class="toc-row">
        <span>The Reality of Death-Spirals</span>
        <span>8</span>
      </div>
      <div class="toc-row">
        <span>The Importance of Collateral Quality</span>
        <span>8</span>
      </div>
      <div class="toc-row">
        <span>Collateral-Backed Stablecoins Have a Failure Point</span>
        <span>9</span>
      </div>
      <div class="toc-row">
        <span>Stablecoin Issuers Are Essentially Unregulated Banks</span>
        <span>10</span>
      </div>
      <div class="toc-row">
        <span>Regulatory Benefits</span>
        <span>11</span>
      </div>
      <div class="toc-row">
        <span>Stablecoin Issuers Function As Nineteenth-Century Banks</span>
        <span>11</span>
      </div>
      <div class="toc-row">
        <span>The Problem with Stablecoin Collateral Is Their Absence of Collateral</span>
        <span>13</span>
      </div>
      <div class="toc-row">
        <span>A Somewhat Caveat</span>
        <span>15</span>
      </div>
      <div class="toc-row">
        <span>Risk On Top of Risk</span>
        <span>15</span>
      </div>
      <div class="toc-row">
        <span>The Hidden Cost of “Collateral-Backed”</span>
        <span>16</span>
      </div>
      <div class="toc-row">
        <span>Doing Basic Math</span>
        <span>17</span>
      </div>
      <div class="toc-row">
        <span>When the Piper Comes Calling</span>
        <span>17</span>
      </div>
      <div class="toc-row">
        <span>The Three Stablecoin Models</span>
        <span>18</span>
      </div>
      <div class="toc-row">
        <span>Moving Towards a Nationalized Stablecoin</span>
        <span>18</span>
      </div>
      <div class="toc-row">
        <span>Nixon’s Nationalization of the Dollar</span>
        <span>19</span>
      </div>
      <div class="toc-row">
        <span>Contagion Risks, Bailouts, and CBDC Assimilation</span>
        <span>20</span>
      </div>
      <div class="toc-row">
        <span>The Benefits</span>
        <span>20</span>
      </div>
      <div class="toc-row">
        <span>Absolute Power Corrupts Absolutely</span>
        <span>21</span>
      </div>
      <div class="toc-row">
        <span>The Question of Bank Versus Central Bank</span>
        <span>22</span>
      </div>
      <div class="toc-row">
        <span>Establishing an Independent Stablecoin</span>
        <span>22</span>
      </div>
      <div class="toc-row">
        <span>A Rollercoaster of Progress</span>
        <span>23</span>
      </div>
      <div class="toc-row">
        <span>Two Essential Attributes</span>
        <span>24</span>
      </div>
      <div class="toc-row">
        <span>Unrestrained Profit Incentives</span>
        <span>24</span>
      </div>
      <div class="toc-row">
        <span>Next Steps</span>
        <span>25</span>
      </div>
      <div class="toc-row">
        <span>Acknowledgments</span>
        <span>26</span>
      </div>
    </div>

    <div>
      <router-link to="/on-the-stabilization-of-collateral-backed-stablecoins.pdf" class="block py-5 w-full border border-argon-600 text-center text-2xl text-argon-600 cursor-pointer rounded-lg hover:bg-argon-100/20">Download Full Whitepaper</router-link>
    </div>
  </article>

</template>

<script setup lang="ts">
import DocHeader from '@/screens/docs/DocHeader.vue';

</script>

<style scoped>
@import "../../../main.css";

.whitepaper-toc {
  @apply mt-6 mb-12 font-serif text-black;
}

.toc-row {
  @apply grid grid-cols-[minmax(0,1fr)_2.5rem] items-baseline gap-x-6 border-t border-slate-300 py-2 leading-snug md:grid-cols-[minmax(0,1fr)_3rem];
}

.toc-row:last-child {
  @apply border-b;
}

.toc-row span:first-child {
  @apply min-w-0;
}

.toc-row span:last-child {
  @apply text-right;
}

.toc-section {
  @apply mt-8 text-slate-400;
}

.toc-section span {
  @apply font-semibold uppercase;
}
</style>
