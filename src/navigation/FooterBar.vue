<template>
  <footer class="w-full relative">

    <div Colony class="relative">
      <div class="relative flex min-h-72 w-full justify-end overflow-hidden md:min-h-80 xl:min-h-0">
        <div class="relative z-10 flex w-full flex-col justify-center px-5 py-10 md:px-10 xl:absolute xl:left-20 xl:top-2/12 xl:w-auto xl:px-0 xl:py-0">
          <router-link to="/" class="w-fit">
            <div>
              <ArgonOutline class="mb-4 w-32 md:w-44 xl:mb-6 xl:w-[50%]" />
            </div>
            <div class="flex flex-col font-serif text-3xl leading-tight md:text-5xl xl:text-6xl">
              <span>The Stablecoin</span>
              <span>Built to Last for a</span>
              <span>Thousand Years.</span>
            </div>
          </router-link>
        </div>
        <img src="/cityscape-clean.png" class="absolute inset-y-0 right-0 h-full w-full object-cover object-right pointer-events-none xl:relative xl:h-auto xl:w-[80%]" :class="[props.mode === 'light' ? 'ConvertToArgonColor opacity-20' : 'opacity-20']">
      </div>
    </div>

    <div NavigationLinks class="grid grid-cols-1 gap-x-8 gap-y-8 px-5 py-10 text-base md:grid-cols-2 md:px-10 md:text-lg lg:flex lg:flex-row lg:px-20">
      <div class="flex flex-col gap-y-2 lg:grow">
        <div class="font-bold">The Desktop Apps</div>
        <div>
          <router-link to="/apps/treasury">Argon Treasury</router-link>
        </div>
        <div>
          <router-link to="/apps/operations">Argon Operations</router-link>
        </div>
      </div>
      <div class="flex flex-col gap-y-2 lg:grow">
        <div class="font-bold">The Basic Details</div>
        <div>
          <router-link to="/why-its-better">Why It's Better</router-link>
        </div>
        <div>
          <router-link to="/launch-plan">Launch Plan</router-link>
        </div>
        <div>
          <router-link to="/docs">Documentation</router-link>
        </div>
      </div>
      <div class="flex flex-col gap-y-2 lg:grow">
        <div class="font-bold">The Whitepapers</div>
        <div>
          <router-link to="/docs/whitepapers/state">State of Stablecoins</router-link>
        </div>
        <div>
          <router-link to="/docs/whitepapers/fundamentals">Stability Fundamentals</router-link>
        </div>
      </div>
      <div class="flex max-w-sm flex-col justify-center text-left text-base font-light md:text-lg lg:max-w-72 lg:grow lg:text-right xl:max-w-none">
        <div class="opacity-80 leading-normal xl:flex xl:flex-col">
          <span>Join Us In Creating the World’s </span>
          <span>First Transactional Currency </span>
          <span>That Remains Stable Over Time</span>
        </div>
        <router-link to="/apps" class="font-bold mt-2">Get Started -></router-link>
      </div>
    </div>

    <div BottomBar class="py-3 flex flex-row px-5 md:px-5 whitespace-nowrap">
      <p class="text-sm w-full text-left text-white/60">
        <span class="hidden lg:inline">An open source project for the world.</span>
        <span class="hidden md:inline lg:hidden">Open source.</span>
        Zero rights reserved.
      </p>
      <div class="flex flex-row gap-x-3">
        <a href="https://clarkbyrnes.substack.com/"target="_blank"><SubstackIcon class="w-[21px] hover:text-white mx-auto mr-1 relative top-[2px]" /></a>
        <a href="https://discord.gg/xDwwDgCYr9" target="_blank"><DiscordIcon class="relative top-[1px] w-6 h-6 hover:text-white mx-auto" /></a>
        <a href="https://github.com/argonprotocol/mainchain"target="_blank"><GithubIcon class="relative top-[1px] w-6 h-6 hover:text-white mx-auto" /></a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import GithubIcon from '../assets/github.svg';
import DiscordIcon from '../assets/discord.svg';
import SubstackIcon from '../assets/substack.svg';
import ArgonOutline from '../assets/argon-outline.svg';

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
    bgDark: '#780F85',
    bgDarker: '#63086E',
    bgDarkest: '#5E0669',
    text: 'rgba(255, 255, 255, 0.8)',
    textHover: 'rgba(255, 255, 255, 1)',
    line: 'rgba(0,0,0,0.5)',
    lineShadow: 'rgba(255,255,255,0.15)',
  },
  charcoal: {
    bgDark: bgCharcoal,
    bgDarker: bgCharcoal,
    bgDarkest: '#201D27',
    text: 'rgba(255, 255, 255, 0.6)',
    textHover: 'rgba(255, 255, 255, 1)',
    line: 'rgba(0,0,0,0.7)',
    lineShadow: 'rgba(255,255,255,0.1)',
  },
  light: {
    bgDark: 'rgb(249, 242, 250)',
    bgDarker: 'rgb(249, 242, 250)',
    bgDarkest: '#F6ECF7',
    text: '#93379f',
    textHover: '#53085d',
    line: 'rgba(0,0,0,0.15)',
    lineShadow: 'rgba(255,255,255,1)',
  }
}[props.mode];
</script>

<style scoped>
@import "../main.css";

footer {
  @apply text-[v-bind(color.text)];
}

[Colony] {
  @apply bg-linear-to-b from-[v-bind(color.bgDark)] to-[v-bind(color.bgDarker)];
}

[BetterBox] {
  @apply w-1/3 flex flex-col justify-center text-center font-bold cursor-pointer border border-[v-bind(color.line)] rounded py-8 px-3 bg-[v-bind(color.bgDarker)] hover:bg-[v-bind(color.bgDarkest)];
  box-shadow: inset 1px 1px 0 v-bind(color.lineShadow), 1px 1px 0 v-bind(color.lineShadow);
}

[NavigationLinks] {
  @apply bg-[v-bind(color.bgDarker)] border-t border-[v-bind(color.line)] relative;
  &::before {
    content: "";
    @apply absolute top-0 left-0 w-full h-px bg-[v-bind(color.lineShadow)];
  }
}

[BottomBar] {
  @apply bg-[v-bind(color.bgDarker)] border-t border-[v-bind(color.line)] relative;
  &::before {
    content: "";
    @apply absolute top-0 left-0 w-full h-px bg-[v-bind(color.lineShadow)];
  }
  p, a {
    @apply text-[v-bind(color.text)];
  }
}

img.ConvertToArgonColor {
  filter: brightness(0) saturate(100%)
  invert(27%) sepia(87%) saturate(1516%) hue-rotate(264deg) brightness(84%) contrast(92%);
}

footer a {
  @apply text-[v-bind(color.text)]! no-underline! hover:text-[v-bind(color.textHover)]!;
}
</style>
