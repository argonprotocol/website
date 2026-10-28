<template>
  <DocHeader>Ultimate Death Spiraling</DocHeader>

  <DocContent>
    <p>
      Ultimate Death Spiraling (UDS) is an interactive stress test of Argon's
      stability mechanisms. It uses current network data and allows you to model
      price collapse down to $0.001. Once collapsed, the model uses Argon's Liquid Locking
      algorithm to simulate what happens as BTC pulls out of the network.
    </p>

    <a
      class="my-8 flex items-center justify-between gap-5 rounded-lg border border-argon-400 bg-argon-50/60 px-5 py-5 text-slate-900 no-underline transition-colors hover:border-argon-600 hover:bg-argon-100/60"
      href="https://sam.argon.network/"
      target="_blank"
      rel="noreferrer"
    >
      <strong class="block text-xl text-argon-700">Open the UDS Model</strong>
      <span class="shrink-0 text-2xl text-argon-600" aria-hidden="true">→</span>
    </a>

    <p>
      Note: this model illustrates simplified scenarios; its results are not forecasts.
    </p>

    <p>
      Explore
      <DocLink to="/docs/engine-modeling/llb">Liquid Locking for Bitcoin</DocLink>
      or read about Argon's
      <DocLink to="/docs/system-design/stability-algorithms">Stability Algorithms</DocLink>.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
