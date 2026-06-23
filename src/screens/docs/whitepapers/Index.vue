<template>
  <DocHeader>
    Overview
  </DocHeader>
  <DocContent>
    <p>
      Argon has two whitepapers that explain the core principles of its design:
    </p>
    <ul>
      <li><router-link to="/docs/whitepapers/state">On the Stabilization of Collateral Backed Stablecoins</router-link></li>
      <li><router-link to="/docs/whitepapers/fundamentals">The Fundamentals for Creating a Stable Crypto Asset</router-link></li>
    </ul>
  </DocContent>
</template>
<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>