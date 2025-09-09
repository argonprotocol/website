<template>
  <nav :class="{ 'dark': props.darkMode }" class="TopBar Component">
    <div BarWrapper class="flex flex-row items-center pt-4 pb-3 px-5 w-full whitespace-nowrap text-base gap-x-5 cursor-default">
      <div LogoWrapper class="flex flex-row items-center cursor-pointer gap-x-4" @click="router.push('/')">
        <div class="w-14 relative">
          <div LogoBgBlock class="absolute top-8 -translate-y-0.5 left-0 w-full h-[2px]"></div>
          <Logo class="absolute -top-5 left-0 w-7 md:w-14" />
        </div>
        <span class="text-2xl font-black">
          Argon
        </span>
      </div>
      <ul class="flex flex-row items-center gap-x-5 relative top-0.5 text-lg">
        <li
          Button
          :Selected="router.currentRoute.value.path.startsWith('/start') || undefined"
          @click="router.push('/start')"
        >
          Start
        </li>
        <li 
          Button 
          :Selected="router.currentRoute.value.path.startsWith('/learn') || undefined"
          @click="router.push('/learn')"
        >
          Learn
        </li>
      </ul>
      <div class="grow relative">
        <div v-if="props.darkMode" MiddleBgBlock class="absolute top-8 -translate-y-0.5 left-0 w-full h-[2px]"></div>
      </div>
      <ul class="flex flex-row items-center gap-x-">
        <li class="whitespace-nowrap text-sm md:text-base flex flex-row justify-end gap-0 md:gap-2 cursor-default">
          <div class="opacity-80 hidden py-1 md:block">Live On</div>
          <a Button href="/start/testnet" class="flex flex-row items-center gap-2">
            <div class="rounded-full w-4 h-4 bg-[#8FFF23]/80 border border-black"></div>
            <span class="opacity-80">
              TESTNET
            </span>
          </a>
          <a Button href="/start/mainnet" class="flex flex-row items-center gap-2">
            <div class="LoadingPulse rounded-full w-4 h-4 bg-[#8FFF23] border border-black"></div>
            <span class="opacity-100">
              MAINNET
            </span>
          </a>
        </li>
        <li Button @click="window.open('https://discord.gg/xDwwDgCYr9', '_blank')">
          <DiscordIcon class="w-6 h-6" />
        </li>
        <li Button @click="window.open('https://github.com/argonprotocol/mainchain', '_blank')">
          <GithubIcon class="w-6 h-6" />
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

const props = defineProps<{
  darkMode?: boolean;
}>();

const color = {
  bgTransparent: props.darkMode ? 'rgba(120, 15, 133, 0)' : 'rgba(249, 242, 250, 0)',
  bgHover: props.darkMode ? '#53085d' : '#e9e2ea',
  bg: props.darkMode ? '#780F85' : 'rgb(249, 242, 250)',
  text: props.darkMode ? 'rgba(255, 255, 255, 0.8)' : '#780F85',
  textHover: props.darkMode ? 'rgba(255, 255, 255, 1)' : '#53085d',
  line: props.darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)',
  lineShadow: props.darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(255, 255, 255, 1)',
}

console.log('TopBar darkMode prop:', props.darkMode);

</script>

<style>
@import "../main.css";

.TopBar {
  .LoadingPulse {
    opacity: 1;
    animation: fadeInOut 1s linear infinite;
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
    @apply hover:bg-[v-bind(color.bgHover)] hover:text-[v-bind(color.textHover)] px-2 py-1 rounded cursor-pointer;
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

  @keyframes fadeInOut {
    0% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.3;
    }
  }
}
</style>

