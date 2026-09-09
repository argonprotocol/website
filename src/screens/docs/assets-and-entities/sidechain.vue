<template>
  <DocHeader>
    Sidechain
  </DocHeader>

  <DocContent>
    <p>
      The Argon Sidechain is a high-throughput payments layer built from personal Localchains.
      Users maintain signed account histories locally, while registered Notaries validate and
      batch balance changes into Notebooks that are audited and anchored by the Argon Mainchain.
    </p>
    <p>
      Unlike conventional sidechains, the Argon Sidechain does not operate a separate block-producing
      consensus network; its validity and settlement are secured through audited Notebooks on the Mainchain.
    </p>
  </DocContent>
</template>
<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>