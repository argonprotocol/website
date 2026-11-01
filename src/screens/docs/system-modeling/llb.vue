<template>
  <DocHeader>Liquid Locking for Bitcoin</DocHeader>

  <DocContent>
    <p>
      Liquid Locking for Bitcoin (LLB) is an interactive model of how Bitcoin
      holders participate in Argon's stability mechanism. It uses historical
      BTC prices to compare Bitcoin Liquids with simply holding Bitcoin. You can adjust
      dates, ratchet thresholds, and hypothetical ARGN price drops to explore
      different scenarios.
    </p>

    <a
      class="my-8 flex items-center justify-between gap-5 rounded-lg border border-argon-400 bg-argon-50/60 px-5 py-5 text-slate-900 no-underline transition-colors hover:border-argon-600 hover:bg-argon-100/60"
      href="https://llb.argon.network/"
      target="_blank"
      rel="noreferrer"
    >
      <strong class="block text-xl text-argon-700">Open the LLB Model</strong>
      <span class="shrink-0 text-2xl text-argon-600" aria-hidden="true">→</span>
    </a>

    <p>
      Here's a short overview video of Liquid Locking and the LLB model.
    </p>
    <iframe
      class="my-6 aspect-video w-full rounded-lg border-0"
      src="https://fast.wistia.net/embed/iframe/1k1jdinjxd?autoPlay=false"
      title="Original Liquid Locking for Bitcoin introduction"
      allow="fullscreen; picture-in-picture"
      allowfullscreen
    ></iframe>

    <p>
      Note: this model illustrates historical scenarios; its results are not forecasts.
    </p>

    <p>
      Explore Argon's
      <DocLink to="/docs/system-modeling/ege">Exponential Growth Engine</DocLink>
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
