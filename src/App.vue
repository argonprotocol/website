<script setup lang="ts">
import SubstackIcon from './assets/substack.svg';
</script>

<template>
  <div>
    <div Banner class="pt-[13px] pb-[12px] bg-[#630B6E] z-50 relative text-center">
      <a href="https://clarkbyrnes.substack.com/p/an-introduction-to-argon-mining" class="text-white/60 hover:text-white px-2">
        <SubstackIcon class="inline-block h-5 mr-2 relative top-[-1px]" />
        NEW: Read Our Introduction to Argon Mining ->
      </a>
    </div>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
[Banner] {
  display: block;
  box-shadow: inset 0 -1px 2px rgba(0,0,0,0.2);
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