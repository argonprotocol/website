<template>
  <div class="py-2 pr-1 md:pt-5 md:pr-5 whitespace-nowrap text-sm md:text-base text-white flex flex-row justify-end gap-0 md:gap-2 cursor-default">
    <div class="opacity-80 hidden py-1 md:block">Live On</div>
    <a Button href="/testnet" class="flex flex-row items-center gap-2"><!-- v-tooltip="'This is where we test new features before they are released on Mainnet.'" align="right">-->
      <div class="rounded-full w-4 h-4 bg-[#8FFF23]/80 border border-black"></div>
      <span class="opacity-80">
        TESTNET
      </span>
    </a>
    <a Button href="/mainnet" class="flex flex-row items-center gap-2"><!-- v-tooltip="'Argon\'s Mainnet is live and operational. Click to view our Getting Started Guide.'" align="right">-->
      <div class="LoadingPulse rounded-full w-4 h-4 bg-[#8FFF23] border border-black"></div>
      <span class="opacity-100">
        MAINNET
      </span>
    </a>
  </div>
</template>

<script setup lang="ts">
import vTooltip from '../directives/tooltip';
</script>

<style lang="scss" scoped>
.LoadingPulse {
  opacity: 1;
  animation: fadeInOut 1s linear infinite;
}

a[Button] {
  @apply  hover:bg-[#670C73] px-2 py-1 rounded;
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
</style>