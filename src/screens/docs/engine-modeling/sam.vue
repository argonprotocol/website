<template>
  <DocHeader>Stabilization Analysis Model</DocHeader>

  <DocContent>
    <p>
      The Stabilization Analysis Model (SAM) is an interactive stress test of
      Argon's economic design. It recreates a market collapse modeled after
      Terra's 2022 failure and compares what happens when Argon's stabilization
      mechanisms are always enabled, activated after the collapse, or never
      enabled. Adjust the assumptions to explore how they affect recovery.
    </p>

    <a
      class="my-8 flex items-center justify-between gap-5 rounded-lg border border-argon-400 bg-argon-50/60 px-5 py-5 text-slate-900 no-underline transition-colors hover:border-argon-600 hover:bg-argon-100/60"
      href="https://sam.argonprotocol.org/"
      target="_blank"
      rel="noreferrer"
    >
      <strong class="block text-xl text-argon-700">Open the SAM Simulation</strong>
      <span class="shrink-0 text-2xl text-argon-600" aria-hidden="true">→</span>
    </a>

    <p>
      Here's a short overview video of Argon's stabilization mechanisms and the
      SAM model.
    </p>
    <iframe
      class="my-6 aspect-video w-full rounded-lg border-0"
      src="https://fast.wistia.net/embed/iframe/o32bfzhcor?autoPlay=false"
      title="Stabilization Analysis Model overview"
      allow="fullscreen; picture-in-picture"
      allowfullscreen
    ></iframe>

    <p>
      The model illustrates simplified scenarios; its results are not forecasts.
    </p>

    <p>
      Explore the Bitcoin-focused model in
      <DocLink to="/docs/engine-modeling/llb">Liquid Locking for Bitcoin</DocLink>, read about
      <DocLink to="/docs/system-design/stability-algorithms">Stability Algorithms</DocLink>,
      or
      <a
        href="https://github.com/argonprotocol/sam"
        target="_blank"
        rel="noreferrer"
        >inspect SAM's source code</a
      >.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
