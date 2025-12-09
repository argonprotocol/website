<template>
  <MainLayout>
    <div class="flex flex-row mt-20 w-10/12 mx-auto pb-20">
      <div class="w-9/12 pr-40">
        <LEARN />
        <h1 class="text-4xl font-light mt-10 mb-10 leading-12">
          A Growing Index of How-To Articles, Insights, and Technical Documentation for Argon.
        </h1>

        <ul>
          <li Header>Architectural Whitepapers</li>
          <li>
            <RouterLink to="/on-the-stabilization-of-collateral-backed-stablecoins.pdf">
              On the Stabilization of Collateral-Backed Stablecoins
              <div>by Caleb Clark and Blake Byrnes</div>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/the-fundamentals-for-creating-a-stable-crypto-asset.pdf">
              The Fundamentals for Creating a Stable Crypto Asset
              <div>by Caleb Clark and Blake Brynes</div>
            </RouterLink>
          </li>
          <li>
            <a>
              Bootstrapping a Currency From Zero to Global
              <div>In Progress, Coming Soon</div>
            </a>
          </li>
        </ul>

        <ul>
          <li Header>Technical How-Tos</li>
          <li>
            <a href="https://github.com/argonprotocol/mainchain/blob/main/docs/run-a-miner.md">
              Step-by-Step for how to become a miner
            </a>
          </li>
          <li>
            <a href="https://github.com/argonprotocol/mainchain/blob/main/docs/running-a-vault.md">
              How to create and manage a Vault using the Argon Bitcoin CLI
            </a>
          </li>
          <li>
            <a href="https://github.com/argonprotocol/mainchain/blob/main/docs/account-setup.md">
              How to set up an Account
            </a>
          </li>
          <li>
            <a href="https://github.com/argonprotocol/mainchain/blob/main/docs/localchain.md#command-line-interface">
              How to use the Argon Localchain CLI
            </a>
          </li>
        </ul>

        <ul>
          <li Header>Substack Announcements</li>
          <li>
            <a href="https://clarkbyrnes.substack.com/p/the-future-of-ulixee-is-argon">
              We Bid You Anew
            </a>
          </li>
          <li>
            <a href="https://clarkbyrnes.substack.com/p/argon-learnings-from-epoch-one">
              Argon Learnings from Epoch One
            </a>
          </li>
          <li>
            <a href="https://clarkbyrnes.substack.com/p/the-basics-of-argon-bidding">
              The Basics of Argon Bidding (Archived)
            </a>
          </li>
          <li>
            <a href="https://clarkbyrnes.substack.com/p/argon-is-live">
              Argon Is Live On the Mainnet
            </a>
          </li>
          <li>
            <a href="https://clarkbyrnes.substack.com/p/an-introduction-to-argon-mining">
              An Introduction to Argon Mining (Archived)
            </a>
          </li>
          <li>
            <a href="https://clarkbyrnes.substack.com/p/the-future-of-ulixee-is-argon">
              The Future of Ulixee Is Argon (Archived)
            </a>
          </li>
        </ul>

        <ul class="flex flex-row flex-wrap">
          <li class="w-full" Header>Using Chain Bridges</li>
          <li class="w-1/3">Optimism</li>
          <li class="w-1/3">Polygon</li>
          <li class="w-1/3">Base</li>
          <li class="w-1/3">Ethereum</li>
          <li class="w-1/3">Arbitrum</li>
          <li class="w-1/3">Cardano</li>
          <li class="w-1/3">Polkadot</li>
          <li class="w-1/3">Gnosis</li>
          <li class="w-1/3">BnbChain</li>
        </ul>
      </div>

      <div class="w-3/12">
        <ul>
          <li Header>The Four Pillars of Argon</li>
          <li>
            <RouterLink to="/learn/four-pillars/resistant-to-inflation">
              Inflation-Resistant Value
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/learn/four-pillars/indifferent-to-catastrophe">
              Indifference to Catastrophe
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/learn/four-pillars/intrinsic-price-stabilization">
              Intrinsic Price Stabilization
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/learn/four-pillars/immunity-from-death-spirals">
              Immune from Death Spirals
            </RouterLink>
          </li>
        </ul>

        <ul>
          <li Header>Argon Simulation Engines</li>
          <li><a href="https://llb.argonprotocol.org">Liquid Locking for Bitcoin</a></li>
          <li><a href="https://sam.argonprotocol.org">Stabilization Analysis Model</a></li>
        </ul>

        <ul>
          <li Header>Currency Metrics</li>
          <li>
            <RouterLink to="/learn/currency-metrics/argons-in-circulation">
              Argons In Circulation
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/learn/currency-metrics/argon-to-fiat-exchange-rate">
              Argon to Dollar Exchange Rate
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/learn/currency-metrics/bitcoin-to-argon-short-value">
              Bitcon-to-Argon Short Value
            </RouterLink>
          </li>
        </ul>

        <ul>
          <li Header>Mining Metrics</li>
          <li>
            <RouterLink to="/learn/mining-metrics/active-mining-seats">
              Active Mining Seats
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/learn/mining-metrics/current-mining-apy">
              Current Mining APY
            </RouterLink>
          </li>
        </ul>

        <ul>
          <li Header>Vaulting Metrics</li>
          <li>
            <RouterLink to="/learn/vaulting-metrics/active-vaults">
              Active Vaults
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/learn/vaulting-metrics/current-vaulting-apy">
              Current Vaulting APY
            </RouterLink>
          </li>
        </ul>

        <ul>
          <li Header>Community</li>
          <li>Discord</li>
          <li>Substack</li>
          <li>Github</li>
        </ul>
      </div>
    </div>

  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '../../navigation/MainLayout.vue';
import FooterBar from '../../navigation/FooterBar.vue';
import LEARN from '../../assets/LEARN.svg?component';
</script>

<style scoped>
@import "../../main.css";

ul {
  @apply mb-10;
  li {
    @apply text-xl font-light border-b border-dashed border-black/10 py-2;
  }
  li[Header] {
    @apply font-bold border-b-2 border-solid border-black/20;
  }
}
</style>