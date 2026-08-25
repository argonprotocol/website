<template>
  <DocHeader>
    Welcome to Argon
  </DocHeader>

  <DocContent>
    <p>
      Argon is a decentralized digital currency designed to preserve purchasing power over time. Instead of tracking a
      fiat currency such as the U.S. dollar, Argon follows a Consumer Price Index based on the cost of real goods. As
      those costs change, Argon’s target value changes with them.
    </p>
    <p>
      The network uses market incentives, mining, vaulting, and Bitcoin-backed stabilization mechanisms to give the
      currency a stable purchasing power. No company issues Argon or controls its supply; these functions are coordinated by the
      protocol and performed by independent participants.
    </p>

    <h2>Start Here</h2>
    <p>
      If you’re new to Argon, these three pages provide the best introduction:
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
      Argon Desktop does not use a centralized account system. You control your own keys and approve your own
      transactions, which also means responsibility for backups, security, and recovery remains with you. Before moving
      or locking funds, review the <router-link to="/docs/desktop-app/self-custody-risks">self-custody risks</router-link>.
    </p>

    <h2>Who Are You?</h2>
    <p>
      The documentation is organized around three common ways of participating in Argon. Choose the path that most
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
            <router-link to="/docs/desktop-app/treasury-extension">Treasury Extension</router-link>
          </li>
          <li class="mb-1!">
            <router-link to="/docs/desktop-app/treasury-certification">Treasury Certification</router-link>
          </li>
          <li class="mb-1!">
            <router-link to="/docs/assets-and-entities/bitcoin-locks">Bitcoin Locks</router-link>
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
            <router-link to="/docs/desktop-app/operations-extension">Operations Extension</router-link>
          </li>
          <li class="mb-1!">
            <router-link to="/docs/desktop-app/operations-certification">Operations Certification</router-link>
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
      in Treasury. Start with the role that matches your immediate goal and expand as you become familiar with the
      network.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
</script>
