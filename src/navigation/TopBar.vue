<template>
  <nav class="TopBar Component">
    <div BarWrapper class="flex flex-row items-center pt-4 pb-3 px-5 w-full whitespace-nowrap text-base gap-x-5 cursor-default">
      <div LogoWrapper class="flex flex-row items-center cursor-pointer gap-x-4" @click="router.push('/')">
        <Logo class="w-10" />
        <span class="text-xl font-black uppercase tracking-widest">
          Argon
        </span>
      </div>
      <ul class="hidden lg:flex flex-row items-center gap-x-4 relative top-[0.5px]">
        <RouterLink
          Button
          as="li"
          to="/apps/operations"
          class="text-lg"
          :Selected="router.currentRoute.value.path.startsWith('/apps/operations') || undefined"
        >
          Operations
        </RouterLink>
        <RouterLink
            Button
            as="li"
            to="/apps/treasury"
            class="text-lg"
            :Selected="router.currentRoute.value.path.startsWith('/apps/treasury') || undefined"
        >
          Treasury
        </RouterLink>
        <RouterLink
            Button
            to="/why-its-better"
            class="text-lg"
            :Selected="router.currentRoute.value.path.startsWith('/why-its-better') || undefined"
        >
          Why It's Better
        </RouterLink>
        <RouterLink
            Button
            to="/launch-plan"
            class="text-lg"
            :Selected="router.currentRoute.value.path.startsWith('/launch-plan') || undefined"
        >
          Launch Plan
        </RouterLink>
        <RouterLink
          Button
          to="/docs"
          class="text-lg"
          :Selected="router.currentRoute.value.path.startsWith('/docs') || undefined"
        >
          Documentation
        </RouterLink>
      </ul>
      <div class="grow relative"></div>
      <MenuMobile class="lg:hidden" :mode="props.mode" :color="color" />
      <ul class="hidden lg:flex flex-row items-center">
        <li class="whitespace-nowrap text-sm md:text-base flex flex-row justify-end gap-0 md:gap-2 cursor-default">
          <div class="opacity-80 hidden py-1 xl:block">Live On</div>
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

const props = withDefaults(
  defineProps<{
    mode?: 'argon' | 'charcoal' | 'light';
  }>(),
  {
    mode: 'light',
  },
);

const bgCharcoal = '#27232F';
const color = {
  argon: {
    bgTransparent: 'rgba(120, 15, 133, 0)',
    bgHover: '#53085d',
    bg: '#780F85',
    text: 'rgba(255, 255, 255, 0.8)',
    textHover: 'rgba(255, 255, 255, 1)',
    line: 'rgba(0, 0, 0, 0.5)',
    lineShadow: 'rgba(255,255,255,0.2)',
    statusLightest: `rgba(255, 255, 255, 0.3)`,
    statusDarkest: `rgba(255, 255, 255, 0.5)`,
    statusRipples: `rgba(255, 255, 255, 0.7)`,
  },
  charcoal: {
    bgTransparent: 'rgba(120, 15, 133, 0)',
    bgHover: '#40384F',
    bg: bgCharcoal,
    text: 'rgba(255, 255, 255, 0.8)',
    textHover: 'rgba(255, 255, 255, 1)',
    line: 'rgba(0, 0, 0, 1)',
    lineShadow: 'rgba(255,255,255,0.1)',
    statusLightest: `rgba(255, 255, 255, 0.3)`,
    statusDarkest: `rgba(255, 255, 255, 0.5)`,
    statusRipples: `rgba(255, 255, 255, 0.7)`,
  },
  light: {
    bgTransparent: 'rgba(249, 242, 250, 0)',
    bgHover: '#e9e2ea',
    bg: 'rgb(249, 242, 250)',
    text: '#780F85',
    textHover: '#53085d',
    line: 'rgba(0, 0, 0, 0.15)',
    lineShadow: 'rgba(255, 255, 255, 1)',
    statusLightest: 'oklch(0.41 0.2 320)',
    statusDarkest: 'oklch(0.55 0.28 320)',
    statusRipples: 'oklch(0.48 0.24 320)',
  },
}[props.mode];
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
