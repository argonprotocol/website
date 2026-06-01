<template>
  <MainLayout mode="charcoal" class="bg-[#27232F] text-white">

    <div class="flex flex-col pt-12 md:pt-22 min-h-[calc(100vh-69px)] text-slate-100 relative items-center justify-center">
      <div class="flex flex-col max-w-260 mx-auto pb-40 text-center">
        <h1 class="text-argon-100/50 font-bold text-2xl tracking-widest uppercase font-serif">
          The Better Stablecoin
        </h1>
        <header class="text-xl md:text-7xl leading-tight font-light font-serif mt-4">
          Argon Solves the Biggest Weakness of Fiat Money and Traditional Stablecoins
        </header>
      </div>

      <div class="absolute bottom-0 left-0 right-0 mb-14">
        <div class="text-center text-sm font-light opacity-50 absolute -bottom-4 left-0 right-0 mx-auto">
          Scroll Down to Learn More
        </div>
        <ChevronDoubleDownIcon class="w-10 h-10 animate-bounce mx-auto" />
      </div>
    </div>

<!--    <div>-->
<!--      <p>Argon has a number of innovative features. Here are the four that we view as fundamental to its success.</p>-->

<!--      <ul class="grid grid-cols-2 gap-y-10 gap-x-14 mt-10">-->
<!--        <li>-->
<!--          <RouterLink to="/the-better-stablecoin/resistant-to-inflation">-->
<!--            <header class="text-xl font-bold">Resistant to Inflation</header>-->
<!--          </RouterLink>-->
<!--          <p>-->
<!--            A well-designed currency should preserve value across generations, free from inflation-->
<!--            and unchecked over-printing that has destroyed every form of fiat money throughout history. -->
<!--          </p>-->
<!--        </li>-->
<!--        <li>-->
<!--          <RouterLink to="/the-better-stablecoin/indifferent-to-catastrophe">-->
<!--            <header class="text-xl font-bold">Indifferent to Catastrophe</header>-->
<!--          </RouterLink>-->
<!--          <p>-->
<!--            A well-designed currency should function independently of worldly affairs, fully decoupled from-->
<!--            any single nation state, banking institution, or other fallible entity.-->
<!--          </p>-->
<!--        </li>-->
<!--        <li>-->
<!--          <RouterLink to="/the-better-stablecoin/intrinsic-price-stabilization">-->
<!--            <header class="text-xl font-bold">Intrinsic Price Stabilization</header>-->
<!--          </RouterLink>-->
<!--          <p>-->
<!--            A well-designed currency should function as a self-contained microcosm, -->
<!--            maintaining stable purchasing power regardless of external factors or pressures.-->
<!--          </p>-->
<!--        </li>-->
<!--        <li>-->
<!--          <RouterLink to="/the-better-stablecoin/immune-from-death-spirals">-->
<!--            <header class="text-xl font-bold">Immune from Death Spirals</header>-->
<!--          </RouterLink>-->
<!--          <p>-->
<!--            A well-designed currency should never be at risk of collapsing to worthless;-->
<!--            it must contain properties that are eternally desirous regardless of its usage as money.-->
<!--          </p>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '../../navigation/MainLayout.vue';
import { ChevronDoubleDownIcon } from '@heroicons/vue/20/solid';
</script>


<style scoped>
@import "../../main.css";

</style>