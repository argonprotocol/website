<template>
  <DocHeader>Remote Wallet Connectors</DocHeader>

  <DocContent>
    <p>
      A Remote Wallet Connector brings an Ethereum wallet into Argon Desktop so
      you can view its ARGN and ARGNOT balances and transfer either token between
      Ethereum and Argon. Each connected wallet appears beside your
      <DocLink to="/docs/desktop-app/internal-wallet">Internal App Wallet</DocLink>.
    </p>

    <p>
      Each wallet keeps its own address and balance. Connecting an Ethereum
      wallet does not move its funds into Argon. To use those tokens on the Argon
      network, you must transfer them into your Internal App Wallet.
    </p>

    <h2>Connect an Ethereum Wallet</h2>
    <p>
      From Account Overview, select <strong>Connect Ethereum Wallet</strong>.
      Argon Desktop connects to an account by importing its private key or
      recovery phrase. Choose the import method that matches your wallet:
    </p>

    <ul>
      <li>
        <DocLink to="/docs/bridgeless-transfers/connect-metamask-wallet">Connect a MetaMask Wallet</DocLink>
        explains how to import an individual account using its private key.
      </li>
      <li>
        <DocLink to="/docs/bridgeless-transfers/connect-uniswap-wallet">Connect a Uniswap Wallet</DocLink>
        explains how to load accounts from a recovery phrase.
      </li>
    </ul>

    <aside class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4">
      <strong class="mb-1 block">WARNING: Protect Your Wallet Access</strong>
      <p class="m-0">
        Anyone with your private key or recovery phrase can control the wallet
        and its funds. Only enter it directly into Argon Desktop on a device
        you trust. Never share it with another person, website, or support
        representative. Read
        <DocLink to="/docs/desktop-app/self-custody-risks">Self-Custody Risks</DocLink>
        for more.
      </p>
    </aside>

    <h2>Fund Your Ethereum Wallet</h2>
    <p>
      You can fund a connected Ethereum wallet by buying tokens on Uniswap or
      transferring them from another wallet or exchange. Use the Ethereum
      network and keep enough ETH in the account to pay network fees. The table
      below shows how each token is used in Argon Desktop.
    </p>

    <table>
      <thead>
        <tr>
          <th>Token</th>
          <th class="px-3 text-left!">Used For</th>
          <th>Uniswap</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><DocLink to="/docs/asset-rules/argons">ARGN</DocLink></td>
          <td class="px-3 text-left!">
            Payments, network fees,
            <DocLink to="/docs/asset-rules/argon-bonds">Argon Bonds</DocLink>,
            <DocLink to="/docs/network-rules/mining-operations">mining</DocLink>, and
            <DocLink to="/docs/network-rules/vaulting-operations">vaulting</DocLink>.
          </td>
          <td><a href="https://app.uniswap.org/explore/tokens/ethereum/0xf3d6b714dc93bc6c44bc766cc92f4a0d99344932" target="_blank" rel="noopener noreferrer" class="inline-flex align-middle" aria-label="Buy ARGN on Uniswap" title="Buy ARGN on Uniswap">
            <ArrowTopRightOnSquareIcon class="size-4" aria-hidden="true" />
          </a></td>
        </tr>
        <tr>
          <td><DocLink to="/docs/asset-rules/argonots">ARGNOT</DocLink></td>
          <td class="px-3 text-left!">
            <DocLink to="/docs/network-rules/mining-operations">Mining</DocLink>,
            <DocLink to="/docs/network-rules/vaulting-operations">vaulting</DocLink>, and
            <DocLink to="/docs/asset-rules/argonot-stakes">Argonot Stakes</DocLink>.
          </td>
          <td><a href="https://app.uniswap.org/explore/tokens/ethereum/0x6b93a120829558c18f8cd54a96e8024ef973ce52" target="_blank" rel="noopener noreferrer" class="inline-flex align-middle" aria-label="Buy ARGNOT on Uniswap" title="Buy ARGNOT on Uniswap">
            <ArrowTopRightOnSquareIcon class="size-4" aria-hidden="true" />
          </a></td>
        </tr>
        <tr>
          <td>USDC</td>
          <td class="px-3 text-left!">
            Paying for <DocLink to="/docs/network-rules/market-stabilizers#stabilizer-buys">Stabilizer Buys</DocLink>.
          </td>
          <td><a href="https://app.uniswap.org/explore/tokens/ethereum/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" target="_blank" rel="noopener noreferrer" class="inline-flex align-middle" aria-label="Buy USDC on Uniswap" title="Buy USDC on Uniswap">
            <ArrowTopRightOnSquareIcon class="size-4" aria-hidden="true" />
          </a></td>
        </tr>
        <tr>
          <td>ETH</td>
          <td class="px-3 text-left!">Ethereum network fees.</td>
          <td><a href="https://support.uniswap.org/hc/en-us/articles/25655102348813-How-to-buy-crypto-in-the-Uniswap-Wallet" target="_blank" rel="noopener noreferrer" class="inline-flex align-middle" aria-label="Buy ETH on Uniswap" title="Buy ETH on Uniswap">
            <ArrowTopRightOnSquareIcon class="size-4" aria-hidden="true" />
          </a></td>
        </tr>
      </tbody>
    </table>

    <p>
      Uniswap's
      <a href="https://support.uniswap.org/hc/en-us/articles/8370549680909-How-to-swap-tokens-with-the-Uniswap-web-app" target="_blank" rel="noopener noreferrer">guide to swapping tokens</a>
      explains how to buy the tokens listed above. If you already hold them
      elsewhere, follow MetaMask's
      <a href="https://support.metamask.io/manage-crypto/move-crypto/transfer/direct-deposit-receive-tokens-to-your-metamask-wallet/" target="_blank" rel="noopener noreferrer">instructions for receiving ETH and tokens</a>
      to add them to your connected wallet.
    </p>

    <h2>Note: Bitcoin Is a Completely Different Process</h2>
    <p>
      Bitcoin also appears as a connector in the wallet interface, but it follows a
      completely different transfer mechanism. It uses channels and locks
      to securely transfer BTC into your wallet.
    </p>
    <p>
      Learn more about <DocLink to="/docs/asset-rules/bitcoin-locks">Bitcoin Locks</DocLink>.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocLink from "@/screens/docs/DocLink.vue";
</script>
