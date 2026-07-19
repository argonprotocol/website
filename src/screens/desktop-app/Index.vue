<template>
  <MainLayout class="pb-0">
    <div class="flex flex-col pt-12 md:pt-22 min-h-[calc(100vh-69px)] text-slate-800 relative">
      <div class="flex flex-col w-11/12 max-w-260 mx-auto pb-52 md:pb-92 xl:pb-120 text-center">
        <h1 class="text-argon-600/50 font-bold text-xl md:text-2xl tracking-widest uppercase font-serif">
          Desktop App
        </h1>
        <header class="text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-light font-serif mt-2 md:flex flex-col">
          <span>It's The Easiest Way to</span>
          <span>Participate In Argon's Growth</span>
        </header>

        <p class="text-base md:text-lg px-0 md:px-10 mt-5">
          Argon Desktop runs on Mac, Windows, and Linux laptops. It gives you direct access to mining, vaulting, network bonds, bitcoin locks, and stable
          swaps of the network. The app runs entirely on your hardware, with no centralized servers, login accounts,
          telemetry, or tracking. Download to get started.
        </p>

        <div class="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 mt-10 md:mt-14">
          <a :href="downloadUrl" class="flex flex-row items-center justify-center gap-3 bg-argon-button border border-argon-800 text-white rounded-md md:text-xl xl:text-2xl w-full md:w-7/12 px-2 py-2 md:py-3 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);">
            <MacIcon v-if="osName === OsName.mac" class="w-7 h-7 relative -top-0.5 inline-block" />
            <WindowsIcon v-else-if="osName === OsName.windows" class="w-7 h-7 relative inline-block" />
            <span>Download for MacOS</span>
          </a>
          <a href="#all-downloads" class="flex flex-row items-center justify-center gap-3  border border-argon-800 text-argon-600 rounded-md md:text-xl xl:text-2xl w-full md:w-5/12 px-2 py-2 md:py-3 font-bold cursor-pointer whitespace-nowrap hover:bg-argon-300/15" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);">
            <span>Other Platforms</span>
            <ArrowDownIcon class="w-5" />
          </a>
        </div>
      </div>
      <img src="/app-desktop.png" alt="Argon Operations App" class="absolute top-full -translate-y-40 md:-translate-y-70 xl:-translate-y-96 w-11/12 md:w-8/12 max-w-300 left-1/2 -translate-x-1/2" />
    </div>

    <div class="w-full  bg-linear-to-b from-white to-[var(--bg-color)] border-t border-gray-600/50 relative z-10" style="box-shadow: 0 -5px 5px rgba(0, 0, 0, 0.1);">
      <div class="w-11/12 max-w-220 mx-auto pt-6 md:pt-12">
        <h3 class="font-bold mt-3 font-serif text-2xl">Basic System Requirements</h3>
        <p class="mt-3 mb-3">The computing needs for Argon is minimal. Any modern laptop running a major OS should suffice.</p>
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full md:gap-x-5">
          <li class="border-t border-gray-300 py-4 md:py-5">
            4GB RAM minimum
          </li>
          <li class="border-t border-gray-300 py-4 md:py-5">
            2GB disk space
          </li>
          <li class="border-t border-gray-300 py-4 md:py-5">
            Internet connection
          </li>
          <li class="border-t md:border-y border-gray-300 py-4 md:py-5">
            MacOS 12+
          </li>
          <li class="border-t md:border-y border-gray-300 py-4 md:py-5">
            Windows 10+
          </li>
          <li class="border-y border-gray-300 py-4 md:py-5">
            Ubuntu 20.04+
          </li>
        </ul>

        <h3 id="all-downloads" class="font-bold mt-10 font-serif text-2xl scroll-mt-10">All Downloads</h3>
        <ul class="my-3">
          <li class="flex flex-row items-center w-full border-t border-gray-300 py-5">
            <WindowsIcon class="w-6 h-6 relative -top-0.5 inline-block mr-3 text-slate-700/30" />
            <div class="grow">Stable v{{ currentVersion }} for Windows</div>
            <a
                :href="urls.stable.windows"
                class="bg-argon-button border border-argon-800 text-white rounded-md px-2 py-1 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);"
            >
              Download
            </a>
          </li>
          <li class="flex flex-row items-center w-full border-t border-gray-300 py-5">
            <MacIcon class="w-7 h-7 relative -top-0.5 inline-block mr-2 text-slate-700/30" />
            <div class="grow">Stable v{{ currentVersion }} for MacOS</div>
            <a
                :href="urls.stable.mac"
                class="bg-argon-button border border-argon-800 text-white rounded-md px-2 py-1 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);"
            >
              Download
            </a>
          </li>
          <li class="flex flex-row items-center w-full border-t border-gray-300 py-5">
            <LinuxIcon class="w-7 h-7 relative -top-0.5 inline-block mr-2 text-slate-700/30" />
            <div class="grow">Stable v{{ currentVersion }} for Linux</div>
            <a
                :href="urls.stable.linux"
                class="bg-argon-button border border-argon-800 text-white rounded-md px-2 py-1 font-bold cursor-pointer hover:bg-argon-button-hover whitespace-nowrap" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);"
            >
              Download
            </a>
          </li>
        </ul>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import MainLayout from "@/navigation/MainLayout.vue";
import MacIcon from '../../assets/os/mac.svg?component';
import LinuxIcon from '../../assets/os/linux.svg?component';
import WindowsIcon from '../../assets/os/windows.svg?component';
import {ArrowDownIcon} from "@heroicons/vue/24/solid";
import {AppName, Download, OsName} from "@/lib/Download";

const download = new Download();
const osName = Vue.ref(download.currentOsName);

const downloadUrl = Vue.ref('');
const currentVersion = Vue.ref('');

const urls = Vue.ref({
  stable: {
    windows: '',
    mac: '',
    linux: '',
  }
});

Vue.onMounted(async () => {
  await download.load();
  currentVersion.value = download.stableVersion;
  downloadUrl.value = download.downloadUrl;
  urls.value = {
    stable: {
      windows: download.urlFor(AppName.Desktop, OsName.windows, false),
      mac: download.urlFor(AppName.Desktop, OsName.mac, false),
      linux: download.urlFor(AppName.Desktop, OsName.linux, false),
    }
  };
});
</script>

<style scoped>
@import "../../main.css";

p {
  @apply font-serif font-light;
  text-shadow: 1px 1px 0 white;
}
</style>
