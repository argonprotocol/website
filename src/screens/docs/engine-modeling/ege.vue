<template>
  <DocHeader>Exponential Growth Engine</DocHeader>

  <DocContent>
    <p>
      Exponential Growth Engine (EGE) is an interactive model of how Argon's mining
      and vaulting incentives drive network growth. It uses current network
      state then allows you to interactively explore how the network responds.
    </p>

    <a
      class="my-8 flex items-center justify-between gap-5 rounded-lg border border-argon-400 bg-argon-50/60 px-5 py-5 text-slate-900 no-underline transition-colors hover:border-argon-600 hover:bg-argon-100/60"
      href="https://sam.argon.network/"
      target="_blank"
      rel="noreferrer"
    >
      <strong class="block text-xl text-argon-700">Open the EGE Model</strong>
      <span class="shrink-0 text-2xl text-argon-600" aria-hidden="true">→</span>
    </a>

    <p>
      Note: this model illustrates simplified scenarios; its results are not forecasts.
    </p>

    <p>
      Explore
      <DocLink to="/docs/engine-modeling/uds">Ultimate Death Spiraling</DocLink>
      or read about Argon's
      <DocLink to="/docs/system-design/economic-drivers">Economic Drivers</DocLink>.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
