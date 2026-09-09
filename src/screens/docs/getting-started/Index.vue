<template>
  <DocHeader>
    Welcome to Argon
  </DocHeader>

  <DocContent>
    <p>
      Argon is a decentralized digital currency designed to preserve purchasing power over time. Instead of pegging to
      fiat currency such as the U.S. dollar, Argon follows a Consumer Price Index that tracks the cost of real goods. As
      those costs change, Argon’s target value changes with them.
    </p>
    <p>
      The network uses market incentives, mining, vaulting, and Bitcoin-backed stabilization mechanisms to give the
      currency a stable purchasing power. No company issues the Argon stablecoin or controls its supply; these functions
      are coordinated by the protocol and executed by independent participants.
    </p>

    <h2>Start Here</h2>
    <p>
      If you’re new to Argon, the following pages provide a great introduction:
    </p>
    <ol>
      <li>
        Begin with an <router-link to="/docs/getting-started/how-it-works">Overview of the System Design</router-link>
        for an understanding of the network’s major components and the roles they play.
      </li>
      <li>
        Read <router-link to="/docs/getting-started/economic-model">Economic Drivers</router-link> to understand how
        value and incentives move between stablecoin users, custodians, miners, and vault operators.
      </li>
      <li>
        Visit the <router-link to="/docs/desktop-app">Argon Desktop overview</router-link> to learn how users interact
        with the network from their own computers.
      </li>
    </ol>

    <h2>Before You Begin</h2>
    <p>
      Argon Desktop does not rely on a centralized company or database. It's a self-custodial system where you control
      your own keys and approve your own transactions. This also means you're responsibility for backups, security, and
      recovery. Before moving or managing funds, please
      <router-link to="/docs/desktop-app/self-custody-risks">review the risks</router-link>.
    </p>

    <h2>Who Are You?</h2>
    <p>
      This documentation is organized around three common ways of participating in Argon. Choose the path that most
      closely matches what you want to do:
    </p>
    <ul>
      <li>
        <strong>Stablecoin User.</strong> You want to hold, send, receive, or exchange a digital currency designed to
        preserve its purchasing power over time.
        <ul class="ml-4">
          <li class="mb-1!">
            <router-link to="/docs/desktop-app">Argon Desktop overview</router-link>
          </li>
          <li class="mb-1!">
            <router-link to="/docs/bridgeless-transfers/open-a-transfer-portal">Open a Transfer Portal</router-link>
          </li>
          <li class="mb-1!">
            <router-link to="/docs/desktop-app/self-custody-risks">Self-Custody Risks</router-link>
          </li>
          <li class="mb-1!">
            <router-link to="/docs/assets-and-entities/stable-swaps">Stable Swaps</router-link>
          </li>
        </ul>
      </li>
      <li>
        <strong>Active Custodian.</strong> You want to supply capital through Treasury’s yield-bearing assets, which
        help finance the network’s mining and vaulting activity.
        <ul class="ml-4">
          <li class="mb-1!">
            <router-link to="/docs/desktop-app/treasury">Treasury</router-link>
          </li>
          <li class="mb-1!">
            <router-link to="/docs/assets-and-entities/bitcoin-liquids">Bitcoin Liquids</router-link>
          </li>
          <li class="mb-1!">
            <router-link to="/docs/assets-and-entities/argon-bonds">Argon Bonds</router-link>
          </li>
          <li class="mb-1!">
            <router-link to="/docs/assets-and-entities/argonot-stakes">Argonot Stakes</router-link>
          </li>
        </ul>
      </li>
      <li>
        <strong>Network Operator.</strong> You want to help run the network by mining blocks, operating vaults, or
        participating in bridgeless issuance.
        <ul class="ml-4">
          <li class="mb-1!">
            <router-link to="/docs/desktop-app/operations">Operations</router-link>
          </li>
          <li class="mb-1!">
            <router-link to="/docs/assets-and-entities/mining-operations">Mining Operations</router-link>
          </li>
          <li class="mb-1!">
            <router-link to="/docs/assets-and-entities/vaulting-operations">Vaulting Operations</router-link>
          </li>
          <li class="mb-1!">
            <router-link to="/docs/bridgeless-transfers/global-issuance-council">
              Global Issuance Council
            </router-link>
          </li>
          <li class="mb-1!">
            <router-link to="/docs/bridgeless-transfers/minting-authorities">Minting Authorities</router-link>
          </li>
        </ul>
      </li>
    </ul>
    <p>
      These paths are not exclusive. A stablecoin user can later become a custodian, and many operators also participate
      in Treasury.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
</script>
