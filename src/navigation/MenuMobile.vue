<template>
  <div class="flex flex-row items-center justify-end gap-x-1">
    <a Button href="https://discord.gg/xDwwDgCYr9" target="_blank">
      <DiscordIcon class="w-6 h-6" />
    </a>
    <a Button href="https://github.com/argonprotocol/mainchain" target="_blank">
      <GithubIcon class="w-6 h-6" />
    </a>
    <div>
      <Bars3Icon @click="toggleMenu" class="w-6 h-6" />
    </div>
    <Teleport to="body">
      <div v-if="isOpen" class="absolute top-0 left-0 w-full bg-white border-b border-gray-200 rounded-b-md shadow-lg py-1 z-100">
        <div BarWrapper class="flex flex-row items-center pt-4 pb-3 px-5 w-full whitespace-nowrap text-base gap-x-5 cursor-default">
          <RouterLink LogoWrapper class="flex flex-row items-center cursor-pointer gap-x-4 text-base" to="/">
            <div class="w-14 relative">
              <div LogoBgBlock class="absolute top-8 -translate-y-0.5 left-0 w-full h-[2px]"></div>
              <Logo class="absolute -top-5 left-0 w-14" />
            </div>
            <span class="text-2xl font-black">
              Argon
            </span>
          </RouterLink>
          <div class="grow" />
          <div class="flex flex-row items-center justify-end gap-x-1">
            <div>
              <Bars3Icon @click="toggleMenu" class="w-6 h-6" />
            </div>
          </div>
        </div>
        <div class="flex flex-col items-stretch text-right px-5 space-y-2 divide-y divide-gray-200">
          <RouterLink
              Button
              to="/desktop-app"
              class="text-base"
              :Selected="router.currentRoute.value.path.startsWith('/desktop-app') || undefined"
          >
            Desktop App
          </RouterLink>
          <RouterLink
              Button
              to="/secret-plan"
              class="text-base"
              :Selected="router.currentRoute.value.path.startsWith('/secret-plan') || undefined"
          >
            Launch Plan
          </RouterLink>
          <RouterLink
              Button
              to="/documentation"
              class="text-base"
              :Selected="router.currentRoute.value.path.startsWith('/documentation') || undefined"
          >
            Learn More
          </RouterLink>
          <RouterLink
              Button
              to="/testnet"
              class="flex flex-row justify-end text-base items-center gap-2"
          >
            <div class="rounded-full w-4 h-4 bg-[#8FFF23]/80 border border-black"></div>
            <span class="opacity-80">
              TESTNET
            </span>
          </RouterLink>
          <RouterLink
              Button
              to="/mainnet"
              class="flex flex-row justify-end text-base items-center gap-2"
          >
            <div class="LoadingPulse rounded-full w-4 h-4 bg-[#8FFF23] border border-black"></div>
            <span class="opacity-100">
              MAINNET
            </span>
          </RouterLink>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import * as Vue from "vue";
import { Bars3Icon } from "@heroicons/vue/24/solid";
import router from "@/router";
import DiscordIcon from "@/assets/discord.svg";
import GithubIcon from "@/assets/github.svg";
import Logo from "@/assets/logo.svg";

const isOpen = Vue.ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}
</script>

<style scoped>
@import "../main.css";


</style>