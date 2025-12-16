<template>
  <MainLayout>
    <div class="flex flex-col mt-12 md:mt-22 max-w-220 mx-auto text-slate-800 px-4 font-light gap-y-3">
      <h1 class="text-2xl md:text-[3.5rem] md:leading-20 font-semibold text-slate-700">
        Moving from Uniswap to Argon
      </h1>

      <p>
        This document describes step-by-step instructions for acquiring argon/argonot tokens on Uniswap and moving them into
        your Argon Investor Console. There are a number of different tools for doing this, but to keep things simple, this page
        takes a very opinionated approach.
      </p>

      <p>
        Uniswap is a decentralized exchange, which means it has no direct connection to the banking system or other
        centralized entities. In order to use your existing capital, which is likely sitting in dollars, you'll need to start with a
        centralized exchange, such as Coinbase.
      </p>

      <section class="border-t border-gray-300 py-5 space-y-3">
        <h2 class="text-xl font-bold">Step 1: Purchase USDC and Eth on Coinbase</h2>
        <p>
          It doesn't matter which centralized exchange you use to purchase USDC and Eth. For the sake of this tutorial,
          we recommend Coinbase.
        </p>

        <ol type="a" class="list-[lower-alpha] list-inside pl-5 space-y-3">
          <li><a href="https://coinbase.com">Go to coinbase.com</a> and register for a new account or login to your existing.</li>
          <li>Ensure you've connected your bank account to Coinbase, or whatever payment method you intend to use.</li>
          <li>Use the rightmost column to purchase your USDC and Eth. We recommend
            purchasing at least $10 worth of Eth, and enough USDC to cover Uniswap's exchange rate for however much
            Argon and Argonots you intend to purchase.</li>
        </ol>
      </section>

      <section class="border-t border-gray-300 py-5 space-y-3">
        <h2 class="text-xl font-bold">Step 2: Move from Coinbase to Metamask Wallet</h2>
        <p>
          There are a plethora of crypto wallets you can use for moving tokens. We recommend Metamask, both because
          of its widespread adoption and its native integration into both Uniswap and Hyperbridge.
        </p>
        <ol type="a" class="list-[lower-alpha] list-inside pl-5 space-y-3">
          <li><a href="https://metamask.io/download">Download Metamask</a> for your browser.</li>
          <li>Open the Metamask browser extension and copy the wallet address listed for Ethereum (make sure don't use
            another address such as for Bitcoin, Solana, etc).</li>
          <li>Open your Coinbase portfolio and send your USDC and Eth to your Metamask ethereum address copied in the
            previous step (make sure you're sending both through the Ethereum network and not Base, etc).</li>
        </ol>
      </section>

      <section class="border-t border-gray-300 py-5 space-y-3">
        <h2 class="text-xl font-bold">Step 3: Purchase Argons and Argonots on Uniswap</h2>
        <p>
          Uniswap is widely considered the world's largest decentralized exchange, and it's a great place to buy Argons
          and Argonots.
        </p>
        <ol type="a" class="list-[lower-alpha] list-inside pl-5 space-y-3">
          <li><a href="https://app.uniswap.org">Go to app.uniswap.org</a>, and click the Connect button in the top right
            to add your Metamask wallet.</li>
          <li>Navigate to Uniswap's <a href="https://app.uniswap.org/swap">Swap page</a> to buy your Argons. Select USDC as your
          Sell token and type your desired amount. Select Argon as your Buy token, however you want find it in the official
          list as its still too early in the launch. You'll need to put Argon's official Ethereum address to find it:
            0x6A9143639D8b70D50b031fFaD55d4CC65EA55155</li>
          <li>Use the same swap process for buying your Argonots. The only difference is the Ethereum address:
            0x64cbd3aa07d427e385cb55330406508718e55f01</li>
        </ol>
      </section>

      <section class="border-t border-gray-300 py-5 space-y-3">
        <h2 class="text-xl font-bold">Step 4: Use Hyperbridge to Bridge from Ethereum to Argon</h2>
        <p>
          At this point in the process, your Metamask wallet should contain all the Argons and Argonots you need for
          mining and/or vaulting. However, these tokens are sitting on Ethereum's netwwork. Your final step is to move
          them (aka, bridging) to Argon's native network.
        </p>
        <ol type="a" class="list-[lower-alpha] list-inside pl-5 space-y-3">
          <li><a href="https://app.hyperbridge.network/">Go to https://app.hyperbridge.network/</a>, and click the
          Wallets button in the top right to connect Metamask.</li>
          <li>Navigate to Hyperbridge's <a href="https://app.hyperbridge.network/bridge">Bridge page</a>.</li>
          <li>Choose "Ethereum" in the From menu and "Argo" in the To menu.</li>
          <li>Input the number of Argons you want to move, then paste the wallet address shown in your Argon Investor Console app.</li>
          <li>Click Start Transfer. The tokens should appear in your app when the process completes.</li>
          <li>Repeat the steps listed above to also transfer your Argonots.</li>
        </ol>
      </section>

    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "@/navigation/MainLayout.vue";

</script>