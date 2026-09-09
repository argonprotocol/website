<template>
  <DocHeader> Self-Custody Risks </DocHeader>
  <DocContent>
    <p>
      Argon Desktop is a self-custody application. This means it does not use a centralized
      account system or hold recovery credentials for you. You control your keys
      and approve every transaction and protocol action.
    </p>
    <p>
      Self-custody gives you direct control, but it also means there is no Argon team that
      reset your credentials if you lose them, reverse an action if you make a mistake,
      or help you restore a wallet without your mnemonic.
    </p>

    <h2>Protect Your Wallet</h2>
    <p>
      Keep your device, passwords, private keys, recovery phrase, and backups
      secure.
    </p>
    <ul class="ml-6 list-disc">
      <li>
        Anyone with your private key or recovery phrase may be able to control
        your wallet and its funds.
      </li>
      <li>
        Store recovery information somewhere safe and separate from the device
        running Argon Desktop.
      </li>
      <li>
        Confirm that your backup is complete and accessible before moving
        significant funds.
      </li>
      <li>
        Never share a private key or recovery phrase with someone offering
        support.
      </li>
    </ul>

    <h2>Review Your Actions Carefully</h2>
    <p>
      Blockchain transactions generally cannot be canceled or reversed after
      confirmation. Some Argon actions may also lock funds or create obligations
      for a defined period.
    </p>
    <p>
      Before confirming an action, verify the account, network, asset, amount,
      recipient address, fees, and any applicable lock period or other terms. Do
      not proceed if the information appears incomplete, stale, or unexpected.
    </p>

    <h2>Community Support and Diagnostic Data</h2>
    <p>
      Argon Desktop does not have a dedicated support team. Community
      contributors may offer assistance through the Discord and GitHub links in
      the app, but that assistance is voluntary and is not guaranteed.
    </p>
    <p>
      A troubleshooting package is created only when you choose to download one.
      It may contain local app data and logs, so review it before sharing it.
      Wallet mnemonic files are excluded by default unless you deliberately
      include them. Treat any package containing recovery information as
      sensitive wallet access data, and never post it publicly.
    </p>

    <h2>External Services</h2>
    <p>
      Argon Desktop is open-source software and may contain bugs. Some features
      also depend on blockchains, RPC providers, indexers, cross-chain transfer
      systems, and third-party services. These systems may be delayed, return
      incomplete information, change, or become unavailable.
    </p>
    <p>
      Before moving or locking funds, confirm that Argon Desktop is connected to
      the intended network and displaying current information. Consider
      independently verifying high-value actions with a block explorer or
      another trusted source.
    </p>

    <h2>Software License</h2>
    <p>
      Argon Desktop is distributed under the MIT License and is provided “as
      is,” without warranties. The complete license follows.
    </p>

    <h3>MIT License</h3>
    <p>Copyright (c) 2026 various contributors</p>

    <h3>Permission</h3>
    <p>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the "Software"),
      to deal in the Software without restriction, including without limitation
      the rights to use, copy, modify, merge, publish, distribute, sublicense,
      and/or sell copies of the Software, and to permit persons to whom the
      Software is furnished to do so, subject to the following conditions:
    </p>

    <h3>Conditions</h3>
    <p>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </p>

    <h3>Warranty and Liability</h3>
    <p>
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
      THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
      DEALINGS IN THE SOFTWARE.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
