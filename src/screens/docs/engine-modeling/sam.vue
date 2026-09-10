<template>
  <DocHeader>Stabilization Analysis Model</DocHeader>

  <DocContent>
    <p>
      The Stabilization Analysis Model—SAM—is an interactive stress test for
      Argon's economic design. It applies a collapse patterned after Terra's
      2022 failure to a simplified Argon economy, then visualizes how different
      stabilization mechanisms could respond.
    </p>

    <p>
      Rather than asking you to accept a claim about resilience, SAM lets you
      change the assumptions and watch the simulation unfold. The result is a
      time-based view of price, circulating supply, market capital, Bitcoin
      participation, and the forces removing or restoring demand.
    </p>

    <a
      class="my-8 flex items-center justify-between gap-5 rounded-lg border border-argon-400 bg-argon-50/60 px-5 py-5 text-slate-900 no-underline transition-colors hover:border-argon-600 hover:bg-argon-100/60"
      href="https://sam.argonprotocol.org/"
      target="_blank"
      rel="noreferrer"
    >
      <span>
        <strong class="block text-xl text-argon-700"
          >Open the SAM Simulation</strong
        >
        <span class="mt-1 block text-sm text-slate-600">
          Replay the collapse, change the mechanisms, and inspect the resulting
          recovery path.
        </span>
      </span>
      <span class="shrink-0 text-2xl text-argon-600" aria-hidden="true">→</span>
    </a>

    <h2>Three Ways to Run the Shock</h2>
    <p>
      SAM can replay the same loss of market capital under three different
      conditions. This makes the timing of the modeled stabilization mechanisms
      visible instead of burying it inside a single result.
    </p>

    <ol>
      <li>
        <strong>Always enabled.</strong> The modeled mechanisms are available
        before the collapse begins and can respond throughout it.
      </li>
      <li>
        <strong>Enabled after the collapse.</strong> The shock first runs
        without them, then the mechanisms are introduced to explore a recovery.
      </li>
      <li>
        <strong>Never enabled.</strong> The economy remains without the modeled
        Argon response, providing a comparison for the other runs.
      </li>
    </ol>

    <p>
      Once a scenario is running, you can change assumptions about economic
      activity, Bitcoin participation, response timing, and market behavior. The
      animated chart shows how those choices influence the simulated path.
    </p>

    <h2>What the Model Makes Visible</h2>
    <p>
      SAM treats price as the relationship between available market capital and
      circulating currency. A collapse removes capital faster than supply,
      creating an imbalance. The model then tracks which mechanisms might remove
      supply, introduce demand, or leave the imbalance unchanged.
    </p>

    <p>
      Its results can be explored as a complete timeline or inspected one
      interval at a time. Source breakdowns show how much of each change the
      simulation attributes to Bitcoin, transaction activity, market behavior,
      or the collapse itself. Scenario data is also available for download.
    </p>

    <aside
      class="my-8 rounded-lg border border-amber-300 bg-amber-50/60 px-5 py-4"
    >
      <strong class="mb-1 block text-amber-900"
        >SAM explores a model, not a prediction</strong
      >
      <p class="m-0 text-amber-900/80">
        The simulation deliberately simplifies markets and human behavior. It
        also preserves terminology and mechanisms from an earlier version of
        Argon's design. Its outputs demonstrate how its assumptions interact;
        they do not guarantee how ARGN, Bitcoin holders, or markets will behave.
      </p>
    </aside>

    <h2>Continue Exploring</h2>
    <p>
      SAM is most useful for asking “what if?” Change one assumption, rerun the
      shock, and compare the shape and source of the response. For a closer look
      at the historical Bitcoin-owner model, open
      <DocLink to="/docs/engine-modeling/llb"
        >Liquid Locking for Bitcoin</DocLink
      >. For the current conceptual explanation, read
      <DocLink to="/docs/system-design/stability-algorithms"
        >Stability Algorithms</DocLink
      >.
    </p>

    <p>
      The model is open source. You can
      <a
        href="https://github.com/argonprotocol/sam"
        target="_blank"
        rel="noreferrer"
        >inspect the SAM code and its scenario data on GitHub</a
      >.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
