<template>
  <div class="py-3 pr-3 md:pt-5 md:pr-5 whitespace-nowrap text-sm md:text-base text-white flex flex-row justify-end gap-2 md:gap-4 cursor-default">
    <div class="opacity-80 hidden md:block">Live On</div>
    <a href="/testnet" class="flex flex-row items-center gap-2" v-tooltip="'This is where we test new features before they are released on Mainnet.'" align="right">
      <div class="rounded-full w-4 h-4 bg-[#8FFF23]/80 border border-black"></div>
      <span class="opacity-80">
        TESTNET
      </span>
    </a>
    <a href="/mainnet" class="flex flex-row items-center gap-2" v-tooltip="'Argon\'s Mainnet is live and operational. Click to view our Getting Started Guide.'" align="right">
      <div class="rounded-full w-4 h-4 bg-[#8FFF23] border border-black"></div>
      <span class="opacity-100">
        MAINNET
      </span>
    </a>
  </div>
</template>

<script setup lang="ts">
import vTooltip from '../directives/tooltip';
</script>
