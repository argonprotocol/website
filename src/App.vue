<script setup lang="ts">
import SubstackIcon from './assets/substack.svg';
</script>

<template>
  <div>
    <div Banner class="pt-[13px] pb-[12px] relative text-center">
      <a href="https://clarkbyrnes.substack.com/p/argon-is-live" class="text-white/80 hover:text-white px-2">
        <SubstackIcon class="inline-block h-5 mr-2 relative top-[-1px]" />
        NEW: Argon Is Now Live On the Mainnet ->
      </a>
    </div>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
[Banner] {
  display: block;
  box-shadow: inset 0 -1px 0px rgba(0,0,0,0.2);
  background: #6c0e79;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }
}
</style>