<template>
  <DocHeader>
    Frequent Questions
  </DocHeader>
  <DocContent>
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
  </DocContent>
</template>
<script setup lang="ts">
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
</script>