<template>
  <DocHeader> Self-Custody Risks </DocHeader>
  <DocContent>
    <p>
      Argon Desktop is a self-custodial app. You control your keys and authorize
      transactions from your accounts. Argon does not hold your recovery
      credentials.
    </p>
    <p>
      You are responsible for preserving access to your wallet. The Argon team
      cannot reset your recovery credentials, reverse confirmed transactions, or
      restore your wallet without the required recovery information.
    </p>

    <h2>Protect Your Wallet</h2>
    <p>
      Protect both your device and the information needed to recover your wallet.
    </p>
    <ul class="ml-6 list-disc">
      <li>
        Anyone with your private key or recovery phrase may be able to access
        your wallet and spend its funds.
      </li>
      <li>
        Store your recovery phrase and backups somewhere secure, separate from
        the device running Argon Desktop.
      </li>
      <li>
        Verify that your backup contains the recovery information you need and
        that you can access it before funding your wallet.
      </li>
      <li>
        Never share your private key or recovery phrase with anyone offering
        support.
      </li>
    </ul>

    <h2>Review Your Actions Carefully</h2>
    <p>
      Blockchain transactions generally cannot be canceled or reversed after
      confirmation. Some Argon actions also lock funds or require you to fulfill
      ongoing responsibilities.
    </p>
    <p>
      Before confirming, check the account, network, asset, amount, recipient
      address, fees, and any lock period or other terms. Stop if any information
      is missing, outdated, or unexpected.
    </p>

    <h2>Community Support</h2>
    <p>
      Argon Desktop has no dedicated support team. You can seek help from
      community contributors through the Discord and GitHub links in the app.
      Assistance is voluntary and may not be available.
    </p>

    <h2>Diagnostic Data</h2>
    <p>
      Argon Desktop creates a troubleshooting package only when you choose to
      download one. The package may contain local app data and logs. Review its
      contents before sharing it.
    </p>
    <p>
      Wallet mnemonic files are excluded by default, but you can choose to
      include them. A package containing a recovery phrase or private key can
      give others access to your wallet. Never share a package containing those
      credentials with community support or post it publicly.
    </p>

    <h2>Software and External Services</h2>
    <p>
      Argon Desktop is open-source software and may contain bugs. It also relies
      on blockchains and external services, including RPC providers, indexers,
      and cross-chain transfer systems. These dependencies may become
      unavailable or provide delayed or incomplete information.
    </p>
    <p>
      Before transferring or locking funds, check that the app is connected to
      the intended network and showing current information. For high-value
      transactions, consider checking the details independently through a block
      explorer or another trusted source.
    </p>

    <h2>Software License</h2>
    <p>
      Argon Desktop is distributed under the MIT License and provided “as is,”
      without warranties. The full license appears below.
    </p>

    <div class="my-6 rounded-lg border border-black/20 bg-black/5 p-5">
      <h3>MIT License</h3>
      <p>Copyright (c) 2026 various contributors</p>

      <p>
        Permission is hereby granted, free of charge, to any person obtaining a
        copy of this software and associated documentation files (the "Software"),
        to deal in the Software without restriction, including without limitation
        the rights to use, copy, modify, merge, publish, distribute, sublicense,
        and/or sell copies of the Software, and to permit persons to whom the
        Software is furnished to do so, subject to the following conditions:
      </p>

      <p>
        The above copyright notice and this permission notice shall be included in
        all copies or substantial portions of the Software.
      </p>

      <p>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
        THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
        DEALINGS IN THE SOFTWARE.
      </p>
    </div>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
