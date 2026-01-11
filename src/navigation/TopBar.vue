<template>
  <nav :class="{ 'dark': props.darkMode }" class="TopBar Component">
    <div BarWrapper class="flex flex-row items-center pt-4 pb-3 px-5 w-full whitespace-nowrap text-base gap-x-5 cursor-default">
      <div LogoWrapper class="flex flex-row items-center cursor-pointer gap-x-4" @click="router.push('/')">
        <div class="w-14 relative">
          <div LogoBgBlock class="absolute top-8 -translate-y-0.5 left-0 w-full h-[2px]"></div>
          <Logo class="absolute -top-5 left-0 w-14" />
        </div>
        <span class="text-2xl font-black">
          Argon
        </span>
      </div>
      <ul class="hidden md:flex flex-row items-center gap-x-5 relative top-0.5">
        <RouterLink
          Button
          as="li"
          to="/desktop-app"
          class="text-lg"
          :Selected="router.currentRoute.value.path.startsWith('/desktop-app') || undefined"
        >
          Desktop App
        </RouterLink>
        <RouterLink
          Button
          to="/secret-plan"
          class="text-lg"
          :Selected="router.currentRoute.value.path.startsWith('/secret-plan') || undefined"
        >
          Launch Plan
        </RouterLink>
        <RouterLink
          Button
          to="/documentation"
          class="text-lg"
          :Selected="router.currentRoute.value.path.startsWith('/documentation') || undefined"
        >
          Learn More
        </RouterLink>
      </ul>
      <div class="grow relative"></div>
      <MenuMobile class="md:hidden" />
      <ul class="hidden md:flex flex-row items-center">
        <li class="whitespace-nowrap text-sm md:text-base flex flex-row justify-end gap-0 md:gap-2 cursor-default">
          <div class="opacity-80 hidden py-1 md:block">Live On</div>
          <RouterLink
            Button
            to="/mainnet"
            class="flex flex-row items-center gap-2 text-base"
            :Selected="router.currentRoute.value.path.startsWith('/mainnet') || undefined"
          >
            <div NetworkStatusWrapper class="w-4 h-4">
              <div NetworkStatus />
            </div>
            <span class="opacity-100">
              MAINNET
            </span>
          </RouterLink>
          <RouterLink
              Button
              to="/testnet"
              class="flex flex-row items-center gap-2 text-base opacity-70"
              :Selected="router.currentRoute.value.path.startsWith('/testnet') || undefined"
          >
            <div NetworkStatusWrapper Testnet class="w-4 h-4">
              <div NetworkStatus />
            </div>
            <span class="opacity-80">
              TESTNET
            </span>
          </RouterLink>
        </li>
        <li Button>
          <a href="https://discord.gg/xDwwDgCYr9" target="_blank">
            <DiscordIcon class="w-6 h-6" />
          </a>
        </li>
        <li Button>
          <a href="https://github.com/argonprotocol/mainchain" target="_blank">
            <GithubIcon class="w-6 h-6" />
          </a>
        </li>
      </ul>
    </div>
  </nav>
  
</template>

<script setup lang="ts">
import router from '../router';
import Logo from '../assets/logo.svg';
import DiscordIcon from '../assets/discord.svg';
import GithubIcon from '../assets/github.svg';
import MenuMobile from "@/navigation/MenuMobile.vue";

const props = defineProps<{
  darkMode?: boolean;
}>();

const color = {
  bgTransparent: props.darkMode ? 'rgba(120, 15, 133, 0)' : 'rgba(249, 242, 250, 0)',
  bgHover: props.darkMode ? '#53085d' : '#e9e2ea',
  bg: props.darkMode ? '#780F85' : 'rgb(249, 242, 250)',
  text: props.darkMode ? 'rgba(255, 255, 255, 0.8)' : '#780F85',
  textHover: props.darkMode ? 'rgba(255, 255, 255, 1)' : '#53085d',
  line: props.darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.15)',
  lineShadow: props.darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(255, 255, 255, 1)',
  statusLightest: props.darkMode ? `rgba(255, 255, 255, 0.3)` : 'oklch(0.41 0.2 320)',
  statusDarkest: props.darkMode ? `rgba(255, 255, 255, 0.5)` : 'oklch(0.55 0.28 320)',
  statusRipples: props.darkMode ? `rgba(255, 255, 255, 0.7)` : 'oklch(0.48 0.24 320)',
}
</script>

<style>
@import "../main.css";

.TopBar {
  a svg {
    @apply text-[v-bind(color.text)];
  }

  [BarWrapper] {
    @apply bg-[v-bind(color.bg)] text-[v-bind(color.text)];
    border-bottom: 1px solid v-bind('color.line');
    box-shadow: 0 1px 0 0 v-bind('color.lineShadow');
  }


  [LogoWrapper] {
    @apply hover:text-[v-bind(color.textHover)];
    transition: color 0.2s ease;
  }

  [Button] {
    @apply text-[v-bind(color.text)] hover:bg-[v-bind(color.bgHover)] hover:text-[v-bind(color.textHover)] px-2 py-1 rounded-lg cursor-pointer;
    &[Selected] {
      @apply bg-[v-bind(color.bgHover)] text-[v-bind(color.textHover)];
    }
  }

  [LogoBgBlock] {
    @apply bg-[v-bind(color.bg)];
  }

  [MiddleBgBlock] {
    background: linear-gradient(to right, v-bind('color.bgTransparent') 0%, v-bind('color.bg') 30%, v-bind('color.bg') 70%, v-bind('color.bgTransparent') 100%);
  }

  [NetworkStatusWrapper] {
    @apply relative;
    [NetworkStatus] {
      @apply rounded-full border w-full h-full;
      background-color: v-bind('color.statusDarkest');
      border-color: rgba(0, 0, 0, 0.9);
      animation: pulse-network-status 1.5s ease-in-out infinite;
      transform-origin: center bottom;
      position: relative;

      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    &::after {
      @apply absolute w-full h-full;
      content: '';
      top: 50%;
      left: 50%;
      /* keep size fixed; center once */
      width: 100%;
      height: 100%;
      border: 2px solid v-bind('color.statusRipples');
      border-radius: 50%;

      /* animate scale instead of width/height */
      transform: translate(-50%, -50%) scale(1);
      transform-origin: center;

      animation: ripple-network-status 2s ease-in-out infinite;
      opacity: 0;

      /* force stable compositing on iOS Safari */
      will-change: transform, opacity;
      -webkit-transform: translate(-50%, -50%) translateZ(0) scale(1);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }
  }
}

@keyframes pulse-network-status {
  0%,
  100% {
    background: v-bind('color.statusDarkest');
  }
  50% {
    background: v-bind('color.statusLightest');
  }
}

@keyframes ripple-network-status {
  0%   { transform: translate3d(-50%, -50%, 0) scale(1);   opacity: 0.5; }
  100% { transform: translate3d(-50%, -50%, 0) scale(2.5); opacity: 0; }
}
</style>

