<template>
  <DocHeader>
    Self-Custody Risks
  </DocHeader>
  <DocContent>
    <p>Argon Desktop is open-source software made available under the MIT License. It is provided as-is, without warranties. You control your own keys and choose which transactions and protocol actions to make.</p>
    <p></p>
    
    <h2>Your Responsibilities</h2>
    <p>Keep your device, passwords, recovery phrase, private keys, and backups safe. No one can recover them for you if
      they are lost.</p>

    <p>Transactions may be irreversible, so verify the details before confirming an action.</p>

    <h2>Software and External Systems</h2>
    <p>Open-source software can contain bugs. The blockchains, public RPC providers, indexers, cross-chain transfer
      systems, and linked third-party services used by some features can also change or become unavailable.</p>

    <p>Check important information before acting, especially when moving or locking funds.</p>

    <h2>Troubleshooting</h2>
    <p>As an open-source project, Argon Desktop does not have a dedicated support team. Community contributors may offer
      help through the Discord and GitHub links in the app, but support is voluntary and not guaranteed.</p>

    <p>Troubleshooting packages are created only when you choose to download one. They contain local app data and logs;
      wallet mnemonic files are excluded unless you explicitly include them.</p>

    <h2>MIT License</h2>
    <p>Copyright (c) 2026 various contributors</p>

    <h2>Permission</h2>
    <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
      documentation files (the "Software"), to deal in the Software without restriction, including without limitation
      the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
      to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>

    <h2>Conditions</h2>
    <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of
      the Software.</p>

    <h2>Warranty and Liability</h2>
    <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
      THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
      CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
      IN THE SOFTWARE.</p>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>