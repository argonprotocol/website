<template>
  <article>
    <DocHeader>
      The Fundamentals for
      Creating a Stable Crypto Asset
    </DocHeader>

    <div>
      By Caleb Clark & Blake Byrnes
    </div>

    <div class="mt-5">
      <p>
        <strong>Abstract.</strong> Stablecoins are cryptocurrencies designed to solve the volatility of Bitcoin by pegging
        to a reference asset, most commonly the dollar. However, the current crop of stablecoins are
        fundamentally broken. By pegging to fiat they absorb all the same inflationary debasement issues
        that are undermining fiat currencies around the world.
      </p>
      <p>
        Worse still, many stablecoins have depegged, death-spiraling into catastrophic failure. The ones
        that haven’t are at constant risk of doing so. Their solution for providing price stability has created
        a brittleness, a ticking time bomb of instability.
      </p>
      <p>
        This paper introduces a novel approach for using unrestrained profit incentives to create a fully
        decentralized stablecoin, one that doesn’t rely on centralized assets or fiat pegging. More
        importantly, it is the first stablecoin immune to death spirals. Even if Argon loses 99.9999% of its
        value, it will bounce back to its target price within days.
      </p>
      <p>
        Within the Argon is a secondary mechanism called Dual Signature Time Lock (DSTL) that
        facilitates trustless and efficient cross-chain asset locking between Bitcoin and another
        heterogeneous blockchain like Argon. DSTL is not only faster but significantly cheaper and more
        secure than existing cross-chain mechanisms such as HTLC, XCLAIM, XCC or Babylon.
      </p>
    </div>

    <h2>Table of Contents</h2>
    <div class="whitepaper-toc">
      <div class="toc-row">
        <span>Introduction</span>
        <span>5</span>
      </div>
      <div class="toc-row">
        <span>The History of Currency</span>
        <span>5</span>
      </div>
      <div class="toc-row toc-section">
        <span>A. BASIC PRINCIPLES</span>
        <span>6</span>
      </div>
      <div class="toc-row">
        <span>A.1 - Bad Currencies Don’t Make Good</span>
        <span>6</span>
      </div>
      <div class="toc-row">
        <span>A.2 - Central Points of Failure Ensure Failure</span>
        <span>7</span>
      </div>
      <div class="toc-row">
        <span>A.3 - Great Currencies Operate As Rubber Bands</span>
        <span>7</span>
      </div>
      <div class="toc-row">
        <span>A.4 - The Best Currencies Are Served Hard</span>
        <span>7</span>
      </div>
      <div class="toc-row toc-section">
        <span>B - BASIC ARCHITECTURE</span>
        <span>8</span>
      </div>
      <div class="toc-row">
        <span>B.1 - Two Blockchains</span>
        <span>8</span>
      </div>
      <div class="toc-row">
        <span>B.2 - Three Crypto Tokens</span>
        <span>8</span>
      </div>
      <div class="toc-row">
        <span>B.3 - Four Stabilization Mechanisms</span>
        <span>9</span>
      </div>
      <div class="toc-row toc-section">
        <span>C. EMBRACING THE LAW OF SUPPLY & DEMAND</span>
        <span>10</span>
      </div>
      <div class="toc-row">
        <span>C.1 - Fluctuations Are Inevitable</span>
        <span>10</span>
      </div>
      <div class="toc-row">
        <span>C.2 - Four Ways to Stop a Death Spiral</span>
        <span>11</span>
      </div>
      <div class="toc-row">
        <span>C.3 - Oppositional Market Forces</span>
        <span>12</span>
      </div>
      <div class="toc-row toc-section">
        <span>D. BITCOIN ENDOSYMBIOSIS (FISSION + FUSION MECHANISMS)</span>
        <span>14</span>
      </div>
      <div class="toc-row">
        <span>D.1 - Liquid Locking</span>
        <span>14</span>
      </div>
      <div class="toc-row">
        <span>D.2 - Mechanism Triggering</span>
        <span>14</span>
      </div>
      <div class="toc-row">
        <span>D.3 - A High-Level Flow</span>
        <span>14</span>
      </div>
      <div class="toc-row">
        <span>D.4 - The Details of Locking a Bitcoin</span>
        <span>16</span>
      </div>
      <div class="toc-row">
        <span>D.5 - The Details of Unlocking a Bitcoin</span>
        <span>17</span>
      </div>
      <div class="toc-row">
        <span>D.6 - Dual Signature Time Locks</span>
        <span>21</span>
      </div>
      <div class="toc-row">
        <span>D.7 - Ratcheting a Locked Bitcoin</span>
        <span>24</span>
      </div>
      <div class="toc-row">
        <span>D.8 - Understanding Vault Security</span>
        <span>25</span>
      </div>
      <div class="toc-row">
        <span>D.9 - Understanding Vault Economics</span>
        <span>28</span>
      </div>
      <div class="toc-row">
        <span>D.10 - Understanding Bitcoin Economics</span>
        <span>28</span>
      </div>
      <div class="toc-row">
        <span>D.11 - Let’s Talk About the Losers</span>
        <span>30</span>
      </div>
      <div class="toc-row">
        <span>D.12 - But They’re Not Shorts</span>
        <span>31</span>
      </div>
      <div class="toc-row">
        <span>D.13 - Acknowledging the Black Swan</span>
        <span>31</span>
      </div>
      <div class="toc-row toc-section">
        <span>E. SEIGNIORAGE PRIVILEGES (MINTING MECHANISM)</span>
        <span>31</span>
      </div>
      <div class="toc-row">
        <span>E.1 - The Formula for Minting</span>
        <span>31</span>
      </div>
      <div class="toc-row">
        <span>E.2 - Limit Bitcoins to 50% Minting</span>
        <span>32</span>
      </div>
      <div class="toc-row">
        <span>E.3 - The Minting Queue</span>
        <span>32</span>
      </div>
      <div class="toc-row">
        <span>E.4 - Wealth Transfer Through Seigniorage</span>
        <span>32</span>
      </div>
      <div class="toc-row toc-section">
        <span>F. CONSTANT DEFLATIONARY PRESSURE (TAXATION MECHANISM)</span>
        <span>32</span>
      </div>
      <div class="toc-row">
        <span>F.1 - A Simple Tax Code</span>
        <span>33</span>
      </div>
      <div class="toc-row">
        <span>F.2 - Taxes Must Burn</span>
        <span>33</span>
      </div>
      <div class="toc-row">
        <span>F.3 - Ensuring Effective Burn</span>
        <span>33</span>
      </div>
      <div class="toc-row">
        <span>F.4 - Protecting the Wage</span>
        <span>34</span>
      </div>
      <div class="toc-row">
        <span>F.5 - Acknowledging Another Black Swan</span>
        <span>36</span>
      </div>
      <div class="toc-row toc-section">
        <span>G. LAYERING THE MECHANISMS</span>
        <span>36</span>
      </div>
      <div class="toc-row">
        <span>G.1 - A Nightmare Scenario</span>
        <span>36</span>
      </div>
      <div class="toc-row">
        <span>G.2 - Keep Calm and Burn On</span>
        <span>37</span>
      </div>
      <div class="toc-row">
        <span>G.3 - Nothing Is Certain Except Death</span>
        <span>38</span>
      </div>
      <div class="toc-row toc-section">
        <span>IN CLOSING</span>
        <span>38</span>
      </div>
      <div class="toc-row">
        <span>Next Steps</span>
        <span>38</span>
      </div>
      <div class="toc-row">
        <span>Acknowledgments</span>
        <span>39</span>
      </div>
    </div>

    <div>
      <router-link to="/the-fundamentals-for-creating-a-stable-crypto-asset.pdf" class="block py-5 w-full border border-argon-600 text-center text-2xl text-argon-600 cursor-pointer rounded-lg hover:bg-argon-100/20">Download Full Whitepaper</router-link>
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
