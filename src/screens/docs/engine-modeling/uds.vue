<template>
  <DocHeader>Ultimate Death Spiraling</DocHeader>

  <DocContent>
    <p>
      Ultimate Death Spiraling (UDS) is an interactive stress test of Argon's
      stability mechanisms. It uses current network data to model a collapse in Argon’s price to
      $0.001. After the simulated collapse, it models Bitcoin Liquid releases
      as BTC leaves the network.
    </p>

    <a
      class="my-8 flex items-center justify-between gap-5 rounded-lg border border-argon-400 bg-argon-50/60 px-5 py-5 text-slate-900 no-underline transition-colors hover:border-argon-600 hover:bg-argon-100/60"
      href="https://uds.argon.network/"
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
      <DocLink to="/docs/system-design/stabilization-algorithms">Stabilization Algorithms</DocLink>.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
