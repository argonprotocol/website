<template>
  <footer class="bg-[#9422A2] border-t border-[#C362CE] w-full">
    <div class="py-3 flex flex-row px-5 md:px-10 whitespace-nowrap">
      <p class="text-sm w-full text-left text-white/60">
        <span class="hidden md:inline">An open source project for the world.</span>
        <span class="hidden md:inline">Open source.</span>
        Zero rights reserved.
      </p>
      <div class="flex flex-row gap-4">
        <a href="https://clarkbyrnes.substack.com/"><SubstackIcon class="w-[21px] text-white/60 hover:text-white mx-auto mr-1 relative top-[2px]" /></a>
        <a href="https://github.com/argonprotocol/mainchain"><GithubIcon class="relative top-[1px] w-6 h-6 text-white/60 hover:text-white mx-auto" /></a>
        <a href="https://discord.gg/xDwwDgCYr9"><DiscordIcon class="relative top-[1px] w-6 h-6 text-white/60 hover:text-white mx-auto" /></a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import GithubIcon from '../assets/github.svg';
import DiscordIcon from '../assets/discord.svg';
import SubstackIcon from '../assets/substack.svg';
</script>