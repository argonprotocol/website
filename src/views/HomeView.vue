<script setup lang="ts">
import Logo from '@/components/icons/Logo.vue'
import GithubIcon from '@/components/icons/Github.vue'
import LaunchingBanner from '@/components/icons/Launching.vue'
</script>

<template>
  <main class=" flex flex-col items-center text-center min-h-screen pb-32">
    <LaunchingBanner class="w-[150px] md:w-[250px] absolute -top-5 -left-5 md:-top-8 md:-left-8" />
    <Logo class="mt-20 w-[80px] md:w-[100px]" />

    <h1 class="LOGO-TEXT text-white font-black text-5xl md:text-8xl uppercase opacity-65 my-5">Argon</h1>

    <header class="relative w-full md:w-10/12 py-10 md:py-14 mt-6 md:mt-9">
      <div class="LINE LINE1"></div>
      <div class="text-white">
        <div class="text-3xl md:text-4xl lg:text-6xl px-10 font-black md:leading-[3rem] lg:leading-[4.5rem] opacity-80">
          A Stablecoin Powered By Bitcoin
        </div>
        <div class="px-10 text-xl mt-4 md:mt-0 md:text-3xl lg:text-5xl font-light md:leading-[3rem] lg:leading-[4.5rem] opacity-80">
          <div class="inline md:block">It's protected from inflation, impossible to</div>
          death spiral, and as easy as cash.
        </div>
      </div>
      <div class="LINE LINE2"></div>
    </header>

    <div class="WHITEPAPER border-1 border-[#B95EC5] rounded text-white text-center block border px-6  md:px-8 pb-7 mt-16 md:mt-24 w-10/12 md:w-7/12">
      <span class="relative -top-3 whitespace-nowrap px-3 bg-[#9721A6] text-[#C98BD1] text-lg">OUR WHITEPAPERS</span>
      <a class="block pb-3" href="/on-the-stabilization-of-stablecoins.pdf">
        <div class="text-lg md:text-3xl font-black pt-2 leading-snug mb-2 md:mb-0">On the Stabilization of Stablecoins</div>
        <div class="opacity-80 italic md:text-xl mt-1">By Caleb Clark and Blake Byrnes</div>
      </a>
      <div class="DIVIDER h-[1px] w-11/12 mt-3 mb-5 mx-auto"></div>
      <div class="opacity-30">
        <div class="text-lg md:text-3xl font-black pt-2 leading-snug mb-2 md:mb-0">Designing a Stabler Stablecoin</div>
        <div class="opacity-80 italic md:text-xl mt-1">In Progress, Coming Soon</div>
      </div>
      <div class="DIVIDER h-[1px] w-11/12 my-5 mx-auto"></div>
      <div class="opacity-30">
        <div class="text-lg md:text-3xl font-black pt-2 leading-snug mb-2 md:mb-0">Bootstrapping a Currency From Zero to Global</div>
        <div class="opacity-80 italic md:text-xl mt-1">In Progress, Coming Soon</div>
      </div>
    </div>
  </main>

  <footer class="bg-[#9422A2] border-t border-[#C362CE] w-full">
    <div class="text-white py-3 flex flex-row opacity-60 px-5 md:px-10 whitespace-nowrap">
      <p class="text-sm w-full text-left">
        <span class="hidden md:inline">An open source project for the world.</span>
        <span class="inline md:hidden">Open source.</span>
        Zero rights reserved.
      </p>
      <div>
        <GithubIcon class="w-6 h-6 text-white mx-auto" />
      </div>
    </div>
  </footer>
</template>

<style scoped>

.LOGO-TEXT {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.WHITEPAPER {
  background: rgba(131, 26, 143, 0.23);
  a:hover {
    background: linear-gradient(to right, rgba(131, 26, 143, 0) 0%, rgba(131, 26, 143, 0.6) 10%, rgba(131, 26, 143, 0.6) 90%, rgba(131, 26, 143, 0) 100%);
  }
  span {
    background: linear-gradient(to bottom, rgba(154, 34, 168, 0) 0%, rgba(154, 34, 168, 1) 40%, rgba(154, 34, 168, 0) 60%, rgba(131, 26, 143, 0) 100%);
  }
}

.DIVIDER {
  background: linear-gradient(to right, rgba(185, 94, 197, 0) 0%, rgba(185, 94, 197, 1) 10%, rgba(185, 94, 197, 1) 90%, rgba(185, 94, 197, 0) 100%);
}

.LINE {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0.3) 90%,  rgba(0, 0, 0, 0) 100%);
  &:after {
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -1px;
    left: 0;
    content: '';
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 10%, rgba(255, 255, 255, 0.2) 90%, rgba(255, 255, 255, 0) 100%);  }
}

.LINE1 {
  top: 0;
}

.LINE2 {
  bottom: 0;
}


</style>