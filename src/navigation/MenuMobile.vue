<template>
  <div class="flex flex-row items-center justify-end">
    <RouterLink
      Button
      to="/mainnet"
      class="MobileMenuNetworkButton"
      :Selected="router.currentRoute.value.path.startsWith('/mainnet') || undefined"
    >
      <div class="LoadingPulse rounded-full w-4 h-4 border border-black"></div>
      <span class="opacity-100">
        MAINNET
      </span>
    </RouterLink>
    <div Button class="MobileMenuIconButton">
      <Bars3Icon @click="toggleMenu" class="w-6 h-6" />
    </div>
    <Teleport to="body">
      <div v-if="isOpen" class="absolute top-0 left-0 w-full bg-linear-to-b from-[var(--bg-color)] to-white border-b border-gray-200 rounded-b-md shadow-lg z-100">
        <div BarWrapper class="flex flex-row items-center pt-4 pb-3 px-5 w-full whitespace-nowrap text-base gap-x-5 cursor-default">
          <RouterLink LogoWrapper class="flex flex-row items-center cursor-pointer gap-x-4 no-underline!" to="/">
            <Logo class="w-10" />
            <span class="text-xl font-black uppercase tracking-widest">
              Argon
            </span>
          </RouterLink>
          <div class="grow" />
          <div class="flex flex-row items-center justify-end">
            <RouterLink
              Button
              to="/mainnet"
              class="MobileMenuNetworkButton"
              :Selected="router.currentRoute.value.path.startsWith('/mainnet') || undefined"
            >
              <div class="LoadingPulse rounded-full w-4 h-4 border border-black"></div>
              <span class="opacity-100">
                MAINNET
              </span>
            </RouterLink>
            <div Button class="MobileMenuIconButton">
              <XMarkIcon @click="toggleMenu" class="w-6 h-6" />
            </div>
          </div>
        </div>
        <div MenuLinks class="flex flex-col items-stretch text-left px-5 pb-1 mt-1">
          <RouterLink
            Button
            to="/"
            class="text-base py-2"
            :Selected="router.currentRoute.value.path === '/' || undefined"
          >
            Home
          </RouterLink>
          <div class="h-px bg-gray-200 my-1" />
          <RouterLink
            Button
            to="/apps/operations"
            class="text-base py-2"
            :Selected="router.currentRoute.value.path.startsWith('/apps/operations') || undefined"
          >
            Operations
          </RouterLink>
          <div class="h-px bg-gray-200 my-1" />
          <RouterLink
            Button
            to="/apps/treasury"
            class="text-base py-2"
            :Selected="router.currentRoute.value.path.startsWith('/apps/treasury') || undefined"
          >
            Treasury
          </RouterLink>
          <div class="h-px bg-gray-200 my-1" />
          <RouterLink
            Button
            to="/the-better-stablecoin"
            class="text-base py-2"
            :Selected="router.currentRoute.value.path.startsWith('/the-better-stablecoin') || undefined"
          >
            Why It's Better
          </RouterLink>
          <div class="h-px bg-gray-200 my-1" />
          <RouterLink
            Button
            to="/launch-plan"
            class="text-base py-2"
            :Selected="router.currentRoute.value.path.startsWith('/launch-plan') || undefined"
          >
            Launch Plan
          </RouterLink>
          <div class="h-px bg-gray-200 my-1" />
          <RouterLink
            Button
            to="/docs"
            class="text-base py-2"
            :Selected="router.currentRoute.value.path.startsWith('/docs') || undefined"
          >
            Docs
          </RouterLink>
          <div class="h-px bg-gray-400 my-1" />
          <a
            Button
            href="https://discord.gg/xDwwDgCYr9"
            target="_blank"
            class="flex flex-row justify-start text-base items-center gap-2 py-2"
          >
            <span>Community on Discord</span>
          </a>
          <div class="h-px bg-gray-200 my-1" />
          <a
            Button
            href="https://github.com/argonprotocol/mainchain"
            target="_blank"
            class="flex flex-row justify-start text-base items-center gap-2 py-2"
          >
            <span>Open Source Repository on GitHub</span>
          </a>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import * as Vue from "vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/solid";
import router from "@/router";
import DiscordIcon from "@/assets/discord.svg";
import GithubIcon from "@/assets/github.svg";
import Logo from "@/assets/logo.svg";

const props = withDefaults(
  defineProps<{
    mode?: 'argon' | 'charcoal' | 'light';
  }>(),
  {
    mode: 'light',
  },
);

const color = {
  argon: {
    bgHover: '#53085d',
    statusLightest: `rgba(255, 255, 255, 0.3)`,
    statusDarkest: `rgba(255, 255, 255, 0.5)`,
  },
  charcoal: {
    bgHover: '#40384F',
    statusLightest: `rgba(255, 255, 255, 0.3)`,
    statusDarkest: `rgba(255, 255, 255, 0.5)`,
  },
  light: {
    bgHover: '#e9e2ea',
    statusLightest: 'oklch(0.41 0.2 320)',
    statusDarkest: 'oklch(0.55 0.28 320)',
  },
}[props.mode];

const isOpen = Vue.ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}
</script>

<style scoped>
@import "../main.css";

[BarWrapper] {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 1);
}

[MenuLinks] [Button] {
  @apply no-underline! text-argon-800/80 hover:text-argon-700 px-3 rounded-md hover:bg-argon-50/80;
}

[MenuLinks] [Button][Selected] {
  @apply bg-argon-50/90 text-argon-800;
}

.MobileMenuIconButton {
  @apply flex h-10 w-10 items-center justify-center rounded-lg cursor-pointer;
}

.MobileMenuIconButton:hover {
  background-color: v-bind('color.bgHover');
}

.MobileMenuNetworkButton {
  @apply flex h-10 items-center justify-center gap-2 rounded-lg px-2 no-underline! cursor-pointer;
}

.MobileMenuNetworkButton:hover {
  background-color: v-bind('color.bgHover');
}

.LoadingPulse {
  background-color: v-bind('color.statusDarkest');
  animation: pulse-mobile-network-status 1.5s ease-in-out infinite;
  transform-origin: center bottom;
}

@keyframes pulse-mobile-network-status {
  0%,
  100% {
    background: v-bind('color.statusDarkest');
  }
  50% {
    background: v-bind('color.statusLightest');
  }
}
</style>
