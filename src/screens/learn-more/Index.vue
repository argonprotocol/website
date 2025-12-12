<template>
  <MainLayout>
    <div class="mt-12 md:mt-22 max-w-220 mx-auto text-slate-800 px-4">
      <h2 class="text-2xl md:text-[3.5rem] pb-2 md:leading-20 font-semibold whitespace-nowrap border-b border-gray-300">
        Academic Whitepapers
      </h2>

      <div class="text-left block mt-1">
        <a Whitepaper class="block py-5 text-lg text-argon-600" href="/on-the-stabilization-of-collateral-backed-stablecoins.pdf">
          <div class="text-lg md:text-2xl font-black pt-2 leading-snug mb-2 md:mb-0">On the Stabilization of Collateral-Backed Stablecoins</div>
          <div class="opacity-80 italic md:text-xl mt-1">By Caleb Clark and Blake Byrnes</div>
        </a>
        <div class="DIVIDER h-[1px] w-full my-1 mx-auto"></div>
        <a Whitepaper class="block py-5 text-lg text-argon-600" href="/the-fundamentals-for-creating-a-stable-crypto-asset.pdf">
          <div class="text-lg md:text-2xl font-black pt-2 leading-snug mb-2 md:mb-0">The Fundamentals for Creating a Stable Crypto Asset</div>
          <div class="opacity-80 italic md:text-xl mt-1">By Caleb Clark and Blake Byrnes</div>
        </a>
        <div class="DIVIDER h-[1px] w-full my-1 mx-auto"></div>
        <div Whitepaper class="text-slate-700/30 py-5">
          <div class="text-lg md:text-2xl font-black pt-2 leading-snug mb-2 md:mb-0">Bootstrapping a Currency From Zero to Global</div>
          <div class="opacity-80 italic md:text-xl mt-1">In Progress, Coming Soon</div>
        </div>
      </div>

      <h2 class="text-2xl md:text-[3.5rem] mt-4 md:mt-10 pb-2 md:leading-20 font-semibold whitespace-nowrap border-b border-gray-300">
        Explanation Videos
      </h2>
      <div class="relative mt-7" style="padding-bottom: 62.42774566473989%; height: 0;">
        <iframe src="https://www.loom.com/embed/2dad4c39089347ceb3b4fe23ebafb1b6" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
      </div>

      <h2 class="text-2xl md:text-[3.5rem] mt-8 md:mt-10 pb-2 md:leading-20 font-semibold whitespace-nowrap border-b border-gray-300">
        Documentation
      </h2>
      <p class="font-light my-7">
        Documentation for using command-line tools for connecting and using Argon's network can be <a href="https://github.com/argonprotocol/mainchain">found on our Github repo</a>.
      </p>

      <p>

      </p>
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

a[Whitepaper]:hover {
  background: linear-gradient(to right, rgba(131, 26, 143, 0) 0%, rgba(131, 26, 143, 0.1) 10%, rgba(131, 26, 143, 0.1) 90%, rgba(131, 26, 143, 0) 100%);
}

.DIVIDER {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 90%, rgba(0, 0, 0, 0) 100%);
}

</style>