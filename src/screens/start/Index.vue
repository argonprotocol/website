<template>
  <MainLayout>
    <div class="mt-14 w-8/12 mx-auto">
      <h1 class="uppercase my-10 leading-20 border-b border-gray-300 pb-6 text-center font-bold text-slate-700">
        <div class="text-[3.4rem]">Our Desktop App Is</div>
        <div class="text-[4.2rem]">The Easiest Way to Start</div>
        <div class="text-[6rem] mt-4">Mining AND Vaulting</div>
      </h1>

      <section class="flex flex-col gap-y-5 text-lg font-light">
        <p>
          There are many ways to get involved in the Argon project, such as <a href="https://discord.gg/xDwwDgCYr9">joining
          our Discord community</a>, helping us write the
          <a target="_blank" href="https://github.com/argonprotocol">core protocol code</a>, or funding Uniswap liquidity pools. However,
          the easiest, and probably the most lucrative, is to become a miner and/or vaulter.
        </p>

        <p>
          We built a simple desktop that you can download and run on a basic laptop computer. It makes it easy 
          to start mining Argons/Argonots and managing vaults with little to no technical knowledge.
        </p>

        <ul>
          <li>
            macOS 12+ (Intel & Apple Silicon)
          </li>
          <li>
            Windows 10+
          </li>
          <li>
            Ubuntu 20.04+
          </li>
          <li>
            4GB RAM minimum
          </li>
          <li>
            2GB disk space
          </li>
          <li>
            Internet connection
          </li>
        </ul>

        <button class="flex flex-row items-center justify-center gap-3 bg-argon-button border border-argon-800 text-white rounded-md md:text-2xl w-full md:w-10/12 px-2 md:px-40 py-2 md:py-5 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);">
          <MacIcon class="w-7 h-7 relative -top-0.5 inline-block" />
          <span>Download <span class="hidden md:inline">Argon</span> Investor Console</span>
        </button>

        <img src="/commander.png" alt="Argon Commander" class="w-10/12 mx-auto mt-12 -mb-20 object-cover object-top" />

      </section>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "@/navigation/MainLayout.vue";
</script>

<style scoped>

p {
  text-shadow: 1px 1px 0 white;
}
</style>