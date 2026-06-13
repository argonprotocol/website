<template>
  <MainLayout class="pb-0">
    <div class="flex flex-col pt-12 md:pt-22 min-h-[calc(100vh-69px)] text-slate-800 relative">
      <div class="flex flex-col w-11/12 max-w-240 mx-auto pb-20 md:pb-40 text-center">
        <h1 class="text-argon-600/50 font-bold text-xl md:text-2xl tracking-widest uppercase font-serif">
          Getting Started
        </h1>
        <header class="text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-serif mt-2">
          You'll Need An Access Code From Someone Already In the Network
        </header>

        <p class="text-base md:text-xl font-serif mt-7 md:mt-10 pt-7 md:pt-10 border-t border-gray-600/50 leading-relaxed">
          Argon's algorithm is designed to constrain growth in the early days. This is to ensure the network does not
          expand too quickly for its own good. Existing Operators are given a limited number of invite codes they
          can pass along to new users. Once you've secured an invite code, you can use it to activate one of two apps:
        </p>

        <ul class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-10 mt-10 md:mt-14 text-base md:text-xl font-serif leading-relaxed">
          <li>
            <router-link to="/apps/operations" class="flex flex-col items-center py-6 md:py-8 px-4 w-full h-full border border-argon-800 rounded-md hover:bg-argon-300/15">
              <ArgonotLogo class="w-10 h-10 relative inline-block text-argon-600" />
              <span class="font-bold mt-5">Argon Operations App</span>
              <div class="text-slate-600/90">The easiest way to start mining and vaulting in the network.</div>
            </router-link>

          </li>
          <li>
            <router-link to="/apps/treasury" class="flex flex-col items-center py-6 md:py-8 px-4 w-full h-full border border-argon-800 rounded-md hover:bg-argon-300/15 no-underline">
              <ArgonLogo class="w-10 h-10 relative inline-block text-argon-600" />
              <span class="font-bold mt-5">Argon Treasury App</span>
              <div class="text-slate-600/90">
                Gain access to the network's yield generating assets (in argons).
              </div>
            </router-link>
          </li>
        </ul>

        <div class="mt-10 md:mt-12 text-base md:text-xl font-serif leading-relaxed">
          <p>
            If you don't know someone who has an access code, try the
            <a href="https://discord.gg/xDwwDgCYr9" target="_blank">Argon Discord Community</a>. Many of the
            existing operators are members, and you might be able to find someone who can help. No guarantees!
          </p>
        </div>

        <div class="text-left mt-14 md:mt-20 text-base md:text-lg font-serif leading-relaxed">
          <h3 class="font-bold text-2xl md:text-3xl">Frequently Asked Questions</h3>

          <ul class="flex flex-col gap-y-5 mt-5">
            <li>
              <header>Who Creates These Access Codes?</header>
              <p>
                The blockchain algorithm allocates these access codes to existing operators based on their activity.
                It's fully decentralized and available for anyone to see in our open-source codebase. These operators
                are then free to give their access codes to whoever they want.
              </p>
            </li>

            <li>
              <header>Why Are Access Codes Required?</header>
              <p>
                Argon is a very novel blockchain, and we want to ensure operators who come into the network understand
                and appreciate how it works. We decided the best way to do this is to ensure new operators are being
                onboarded by existing operators. Access codes ensure this connection.
              </p>
            </li>

            <li>
              <header>How Much Are Argon Stablecoins Expected to Be Worth In a Year?</header>
              <p>
                The same as they are today. Argons are a stablecoin, meaning their value is designed to remain constant. They are designed to
                hold the same purchasing power today as they will 1,000 years from now. So buying Argons is unlikely
                to ever increase your net-worth.
              </p>
            </li>

            <li>
              <header>What Are Argonots?</header>
              <p>
                They are the ownership tokens of Argon.
              </p>
            </li>


            <li>
              <header>How Much Are Argonots Expected to Be Worth?</header>
              <p>
                No idea. Their only value is in running mining and vaulting. They are traded on decentralized exchanges, and their value is based on the demand of miners
                and vault operators.
              </p>
            </li>

            <li>
              <header>Can I Use Dollars to Buy Argons or Argonots?</header>
              <p>
                Not that we know of. At this point in the ecosystem growth, the Argon is only available on some decentralized
                exchanges, which means you can only acquire Argons by exchanging other crypto tokens such as Eth, USDC,
                etc.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </MainLayout>

</template>

<script setup lang="ts">
import MainLayout from "@/navigation/MainLayout.vue";
import ArgonotLogo from "@/assets/argonot.svg";
import ArgonLogo from "@/assets/logo.svg";
</script>

<style scoped>
@import "../../main.css";

ul header {
  @apply font-bold;
}
</style>
