<template>
  <footer class="w-full">
    <ul DepressedBlock class="flex flex-col md:flex-row px-2.5 pb-px space-y-2 md:space-y-0 md:space-x-3 text-white text-xl">
<!--      <li class="flex flex-col cursor-pointer items-center justify-center rounded-sm w-full md:w-1/3 h-40 md:h-60" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, .2), 1px 1px 2px rgba(0, 0, 0, .2);">-->
<!--        <RouterLink to="/misc/docs" class="flex flex-col items-center justify-center w-full h-full">-->
<!--          <WhitepapersIcon class="h-10 mb-2" />-->
<!--          Read the-->
<!--          <div class="font-bold">Whitepapers</div>-->
<!--        </RouterLink>-->
<!--      </li>-->
<!--      <li class="flex flex-col cursor-pointer items-center justify-center rounded-sm w-full md:w-1/3 h-40 md:h-60" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, .2), 1px 1px 2px rgba(0, 0, 0, .2);">-->
<!--        <RouterLink to="/misc/community/argonots" class="flex flex-col items-center justify-center w-full h-full">-->
<!--          <ArgonotsIcon class="h-10 mb-2" />-->
<!--          Follow the-->
<!--          <div class="font-bold">Argonots</div>-->
<!--        </RouterLink>-->
<!--      </li>-->
<!--      <li class="flex flex-col cursor-pointer items-center justify-center rounded-sm w-full md:w-1/3 h-40 md:h-60" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, .2), 1px 1px 2px rgba(0, 0, 0, .2);">-->
<!--        <RouterLink to="/misc/community" class="flex flex-col items-center justify-center w-full h-full">-->
<!--          <CommunityIcon class="h-10 mb-2" />-->
<!--          Join the-->
<!--          <div class="font-bold">Community</div>-->
<!--        </RouterLink>-->
<!--      </li>-->
    </ul>

    <div BottomBar class="py-3 flex flex-row px-5 md:px-5 whitespace-nowrap">
      <p class="text-sm w-full text-left text-white/60">
        <span class="hidden lg:inline">An open source project for the world.</span>
        <span class="hidden md:inline">Open source.</span>
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
import WhitepapersIcon from '../assets/footer/whitepapers.svg';
import ArgonotsIcon from '../assets/footer/argonots.svg';
import CommunityIcon from '../assets/footer/community.svg';

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
    bg: '#780F85',
    bgHover: '#6E0D7BFF',
    text: 'rgba(255, 255, 255, 0.8)',
    textHover: 'rgba(255, 255, 255, 1)',
    line: 'rgba(0,0,0,0.5)',
  },
  charcoal: {
    bg: '#27232F',
    bgHover: '#000000',
    text: 'rgba(255, 255, 255, 0.8)',
    textHover: 'rgba(255, 255, 255, 1)',
    line: 'rgba(0,0,0,0.7)',
    lineShadow: 'rgba(255,255,255,0.1)',
  },
  light: {
    bg: 'rgb(249, 242, 250)',
    bgHover: '#e9e2ea',

    text: '#93379f',
    textHover: '#53085d',
    line: 'rgba(0,0,0,0.3)',
  }
}[props.mode];
</script>

<style scoped>
@import "../main.css";

footer {
  @apply bg-[v-bind(color.bg)] text-[v-bind(color.text)] border-t border-[v-bind(color.line)];
}

ul[DepressedBlock] {
  @apply text-[v-bind(color.text)] border-t border-[v-bind(color.lineShadow)];
  li {
    @apply bg-[v-bind(color.bg)] cursor-pointer hover:bg-[v-bind(color.bgHover)];
  }
  a {
    @apply text-[v-bind(color.text)] hover:text-[v-bind(color.textHover)];
  }
}

[BottomBar] {
  p, a {
    @apply text-[v-bind(color.text)];
  }
}
</style>