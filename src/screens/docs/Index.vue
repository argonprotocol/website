<template>
  <DocHeader>
    Welcome to Argon Documentation
  </DocHeader>

  <DocContent>
    <h2>Platform Overview</h2>
    <p>
      Argon is a decentralized stable-asset network with two primary operational domains: mining and vaulting.
      Mining governs block production and issuance dynamics. Vaulting provides stabilization services through Bitcoin
      liquid locks and treasury participation. These docs describe how to run the current system as it exists today.
    </p>
    <p>
      The desktop apps are operator tools for running workflows locally. There is no account signup flow in the app
      layer; responsibility for key custody, operational settings, and execution remains with the user.
    </p>

    <h2>Audience and Roles</h2>
    <p>
      This documentation is written for two audiences:
    </p>
    <ul>
      <li><strong>Operations users</strong> running mining and vaulting workflows, including Ambassador Program tasks.</li>
      <li><strong>Capital users</strong> managing allocations, participation strategies, and performance monitoring.</li>
    </ul>
    <p>
      If you are new to Argon, start with Desktop Apps and then continue to the operations and Ambassador Program sections.
      If you already understand operations, jump directly to capital management and modeling.
    </p>

    <p>
      Key terms used throughout:
    </p>
    <ul>
      <li><strong>Frame</strong>: the network’s daily operating window used in auction and treasury contexts.</li>
      <li><strong>Mining Seat</strong>: the right to mine for a fixed term after winning an auction.</li>
      <li><strong>Vault</strong>: an operator service unit for Bitcoin liquid locks and treasury participation.</li>
      <li><strong>Argon / Argonot</strong>: the network currency and governance-aligned token used in operations.</li>
      <li><strong>Liquid Lock</strong>: a Bitcoin lock workflow that interacts with vault and stabilization flows.</li>
    </ul>
  </DocContent>
</template>
<script setup lang="ts">
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
</script>