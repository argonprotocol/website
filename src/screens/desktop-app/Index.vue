<template>
  <MainLayout>
    <div class="mt-12 md:mt-22 max-w-220 mx-auto text-slate-800 px-4">
      <h1 class="text-2xl md:text-[3.5rem] md:leading-20 font-semibold text-slate-700">
        Download Our Desktop App
      </h1>
      <div class="text-xl md:text-4xl font-light border-y border-gray-300 py-4 mt-2">
        It’s the Easiest Way to Start Mining and Vaulting
      </div>

      <section class="flex flex-col gap-5 mx-auto text-lg mt-6 md:mt-12 font-light">
        <p>
          There are many ways to get involved in the Argon project. You can <a href="https://discord.gg/xDwwDgCYr9">join
          our Discord community</a>, help us
          <a target="_blank" href="https://github.com/argonprotocol">write code</a>, or <a target="_blank" href="https://app.uniswap.org/explore/pools/ethereum/0x97d8B7A635D31536b452bE3C5b0082844C41Ae8a">fund Uniswap liquidity pools</a>. However,
          the easiest, and possibly the most lucrative, is to become a founding miner and/or vaulter in the network.
        </p>

        <p>
          We built a simple desktop that runs Argon on a basic laptop computer. Use it to start mining Argons
          and manage vaults with little to no technical knowledge.
        </p>

        <img src="/commander.png" alt="Argon Commander" class="relative md:left-[-10%] w-full md:min-w-[120%] my-5" />

        <div class="flex flex-col items-center md:-mt-10">
          <a :href="download.currentUrl" class="flex flex-row items-center justify-center gap-3 bg-argon-button border border-argon-800 text-white rounded-md md:text-2xl w-full px-2 md:px-40 py-2 md:py-5 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);">
            <MacIcon v-if="osName === OsName.mac" class="w-7 h-7 relative -top-0.5 inline-block" />
            <WindowsIcon v-if="osName === OsName.windows" class="w-7 h-7 relative inline-block" />
            <span>Download <span class="hidden md:inline">Argon</span> Investor Console</span>
          </a>
          <div class="text-gray-500/80 text-sm md:text-base mt-2">
            Lastest version: {{ download.stableVersion }}, stable for mainnet
          </div>
        </div>

        <p class="mt-5">Other than its beautiful interface and easy-to-use features, one of the best things about Argon's investor app
          is its security. It runs 100% on your hardware, meaning, there are no centralized servers, databases or login
          accounts that can be compromised. There is no tracking or telemetry integrations. The entire code-base is
          open-source, decentralized, and designed to keep you fully anonymous.
        </p>

        <h3 class="font-bold mt-5 mb-0">Basic System Requirements</h3>
        <p class="-mt-3">The computing needs for Argon is minimal. Any modern laptop running a major OS should suffice.</p>
        <ul class="grid grid-cols-3 w-full space-x-5">
          <li class="border-t border-gray-300 py-5">
            4GB RAM minimum
          </li>
          <li class="border-t border-gray-300 py-5">
            2GB disk space
          </li>
          <li class="border-t border-gray-300 py-5">
            Internet connection
          </li>
          <li class="border-y border-gray-300 py-5">
            MacOS 12+
          </li>
          <li class="border-y border-gray-300 py-5">
            Windows 10+
          </li>
          <li class="border-y border-gray-300 py-5">
            Ubuntu 20.04+
          </li>
        </ul>

        <h3 class="font-bold mt-7">Stable Releases (v{{ download.stableVersion }})</h3>
        <p class="-mt-3">These are the actively supported installers.</p>
        <ul>
          <li class="flex flex-row items-center w-full border-t border-gray-300 py-5">
            <WindowsIcon class="w-6 h-6 relative -top-0.5 inline-block mr-3 text-slate-700/30" />
            <div class="grow">Stable v{{ download.stableVersion }} for Windows</div>
            <a
              :href="download.urlFor(OsName.windows, false)"
              class="bg-argon-button border border-argon-800 text-white rounded-md px-2 py-1 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);"
            >
              Download
            </a>
          </li>
          <li class="flex flex-row items-center w-full border-t border-gray-300 py-5">
            <MacIcon class="w-7 h-7 relative -top-0.5 inline-block mr-2 text-slate-700/30" />
            <div class="grow">Stable v{{ download.stableVersion }} for MacOS</div>
            <a
              :href="download.urlFor(OsName.mac, false)"
              class="bg-argon-button border border-argon-800 text-white rounded-md px-2 py-1 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);"
            >
              Download
            </a>
          </li>
          <li class="flex flex-row items-center w-full border-y border-gray-300 py-5">
            <LinuxIcon class="w-7 h-7 relative -top-0.5 inline-block mr-2 text-slate-700/30" />
            <div class="grow">Stable v{{ download.stableVersion }} for Linux</div>
            <a
                :href="download.urlFor(OsName.linux, false)"
                class="bg-argon-button border border-argon-800 text-white rounded-md px-2 py-1 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);"
            >
              Download
            </a>
          </li>
        </ul>

        <h3 class="font-bold mt-7">Experimental Releases (v{{ download.experimentalVersion }})</h3>
        <p class="-mt-3">These are primarily for the purpose of trying out new features .</p>
        <ul>
          <li class="flex flex-row items-center w-full border-t border-gray-300 py-5">
            <WindowsIcon class="w-6 h-6 relative -top-0.5 inline-block mr-3 text-slate-700/30" />
            <div class="grow">Experimental v{{ download.experimentalVersion }} for Windows</div>
            <a
              :href="download.urlFor(OsName.windows, true)"
              class="bg-argon-button border border-argon-800 text-white rounded-md px-2 py-1 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);"
            >
              Download
            </a>
          </li>
          <li class="flex flex-row items-center w-full border-t border-gray-300 py-5">
            <MacIcon class="w-7 h-7 relative -top-0.5 inline-block mr-2 text-slate-700/30" />
            <div class="grow">Experimental v{{ download.experimentalVersion }} for MacOS</div>
            <a
              :href="download.urlFor(OsName.mac, true)"
              class="bg-argon-button border border-argon-800 text-white rounded-md px-2 py-1 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);"
            >
              Download
            </a>
          </li>
          <li class="flex flex-row items-center w-full border-y border-gray-300 py-5">
            <LinuxIcon class="w-7 h-7 relative -top-0.5 inline-block mr-2 text-slate-700/30" />
            <div class="grow">Experimental v{{ download.experimentalVersion }} for Linux</div>
            <a
                :href="download.urlFor(OsName.linux, true)"
                class="bg-argon-button border border-argon-800 text-white rounded-md px-2 py-1 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);"
            >
              Download
            </a>
          </li>
        </ul>
      </section>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import MainLayout from "@/navigation/MainLayout.vue";
import MacIcon from '../../assets/os/mac.svg?component';
import LinuxIcon from '../../assets/os/linux.svg?component';
import WindowsIcon from '../../assets/os/windows.svg?component';
import { Download, OsName } from "@/lib/Download";

const download = new Download();
const osName = Vue.ref(download.currentOsName);
</script>

<style scoped>
@import "../../main.css";

p {
  @apply text-justify font-light;
  text-shadow: 1px 1px 0 white;
}
</style>