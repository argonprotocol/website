<template>
  <main class="relative flex flex-col items-center text-center min-h-screen pb-10 md:pb-32">

    <div class="pr-3 md:pr-5 w-full whitespace-nowrap text-sm mb-2 md:text-base text-white flex flex-row justify-end gap-2 md:gap-4 cursor-default">
      <div class="absolute left-3 top-2 md:left-5 md:top-4 hover:opacity-100 cursor-pointer flex flex-row gap-2" @click="$router.push('/')">
        <Logo class="w-5 md:w-9" />
        <span class="text-2xl font-bold text-white/80 ml-1 relative top-[1px]">Argon</span>
      </div>
      
      <ChainStatus />
    </div>
    
    <div class="LINE LINE2"></div>

    <h1 class="LOGO-TEXT text-white text-3xl md:text-6xl uppercase opacity-65 mt-12 mb-2">
      ACCESSING ARGON'S TESTNET
    </h1>

    <div class="w-10/12 text-white mt-10 mx-auto text-left font-extralight leading-9 flex flex-col gap-10">
      <div class="LINE LINE2"></div>      
      <div class="px-48">
        <p class="text-xl opacity-80 font-light">The Testnet is where new features are tested before they are released on Mainnet. Below is a list of documentation links for how to get started:</p>

        <div class="mt-8">
          <div class="text-xl font-bold pb-2">Run a Mining Rig</div>
          <div class="text-xl opacity-80 font-light">Earn block rewards of both argons and argonots by participate in the mining operations of the network.</div>
          <ul class="border-t border-dashed border-white/30 pt-3 mt-3">
            <li class="text-xl font-light border-b border-dashed border-white/30 pb-3">
              <span class="opacity-60 mr-2">-></span>
              <a href="https://github.com/argonprotocol/mainchain/blob/main/docs/run-a-miner.md" class="opacity-80 hover:opacity-100">Step-by-Step for how to become a miner</a>
            </li>
          </ul>
        </div>

        <div class="mt-8">
          <div class="text-xl font-bold pb-2">Manage a Stabilization Vault</div>
          <div class="text-xl opacity-80 font-light">Generate revenue by Liquid Locking Bitcoins and by creating and loaning Bonded Argons to miners.</div>
          <ul class="border-t border-dashed border-white/30 pt-3 mt-3">
            <li class="text-xl font-light border-b border-dashed border-white/30 pb-3">
              <span class="opacity-60 mr-2">-></span>
              <a href="https://github.com/argonprotocol/mainchain/blob/main/docs/running-a-vault.md" class="opacity-80 hover:opacity-100">How to create and manage a Vault using the Argon Bitcoin CLI</a>
            </li>
          </ul>
        </div>

        <div class="mt-8">
          <div class="text-xl font-bold pb-2">Send and Receive Payments</div>
          <div class="text-xl opacity-80 font-light">Argon uses a novel peer-to-peer architecture that makes settling global payments (and micropayments) incredibly fast and inexpensive.</div>
          <ul class="border-t border-dashed border-white/30 pt-3 mt-3">
            <li class="text-xl font-light border-b border-dashed border-white/30 pb-3">
              <span class="opacity-60 mr-2">-></span>
              <a href="https://github.com/argonprotocol/mainchain/blob/main/docs/account-setup.md" class="opacity-80 hover:opacity-100">How to set up an Account</a>
            </li>
            <li class="text-xl font-light border-b border-dashed border-white/30 pb-3">
              <span class="opacity-60 mr-2">-></span>
              <a href="https://github.com/argonprotocol/mainchain/blob/main/docs/localchain.md#command-line-interface" class="opacity-80 hover:opacity-100">How to use the Argon Localchain CLI</a>
            </li>
          </ul>
        </div>

        <div class="mt-8">
          <div class="text-xl font-bold pb-2">Trade Argons and Argonots</div>
          <div class="border-t border-b border-dashed border-white/30 py-3 text-xl font-light italic">
            <span class="opacity-60">Documentation and URLs for the Uniswap markets launching before January 25, 2025.</span>
          </div>
        </div>

      </div>
    </div>
  </main>
  <FooterBar />
</template>

<script setup lang="ts">
import FooterBar from '../components/FooterBar.vue';
import ChainStatus from '../components/ChainStatus.vue';
import Logo from '../assets/logo.svg';
</script>

<style scoped>
.LOGO-TEXT {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.LINE {
  position: relative;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0.3) 90%,  rgba(0, 0, 0, 0) 100%);
  &:after {
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -1px;
    left: 0;
    content: '';
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 10%, rgba(255, 255, 255, 0.2) 90%, rgba(255, 255, 255, 0) 100%);  }
}

.LINE1 {
  top: 0;
}
</style>