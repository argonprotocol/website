<template>
  <DocHeader>Bitcoin</DocHeader>

  <DocContent>
    <p>
      Bitcoin (BTC) provides external value and stabilization capital for Argon.
      It works alongside
      <DocLink to="/docs/asset-rules/argons">Argon stablecoins</DocLink>
      and <DocLink to="/docs/asset-rules/argonots">Argonot ownership tokens</DocLink>,
      but it remains native to the Bitcoin network. None of the BTC is
      wrapped, bridged to another blockchain, or replaced with a separate token. The BTC remains in
      a Bitcoin UTXO and continues to be verified by the Bitcoin network.
    </p>

    <p>
      Bitcoin connects into the Argon Network through a
      <DocLink to="/docs/asset-rules/bitcoin-locks"
        >Bitcoin Lock</DocLink
      >, a multisig custody arrangement between its owner and a vault cosigner.
    </p>

    <section class="my-8 grid gap-3 md:grid-cols-3">
      <div class="rounded-lg border border-orange-300 bg-orange-50/50 p-5">
        <div class="text-sm font-bold tracking-wide text-orange-800 uppercase">
          The Asset
        </div>
        <div class="mt-2 text-xl font-bold text-slate-800">Bitcoin</div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          Native BTC recorded in a Bitcoin UTXO.
        </p>
      </div>
      <div class="rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="text-sm font-bold tracking-wide text-slate-500 uppercase">
          The Custody
        </div>
        <div class="mt-2 text-xl font-bold text-slate-800">
          <DocLink to="/docs/asset-rules/bitcoin-locks"
            >Bitcoin Lock</DocLink
          >
        </div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          The multisig arrangement that holds the BTC.
        </p>
      </div>
      <div class="rounded-lg border border-argon-300 bg-argon-50/50 p-5">
        <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
          The Position
        </div>
        <div class="mt-2 text-xl font-bold text-slate-800">
          <DocLink to="/docs/asset-rules/bitcoin-liquids"
            >Bitcoin Liquid</DocLink
          >
        </div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          A separate position that makes the BTC's value
          available as ARGN.
        </p>
      </div>
    </section>

    <h2>Bitcoin Custody</h2>
    <p>
      A Bitcoin Lock combines an owner-controlled Bitcoin key with a cosigning
      key supplied by a
      <DocLink to="/docs/network-rules/vaulting-operations">Stabilization Vault</DocLink>.
      During the normal Lock term, neither side can independently move the Bitcoin.
    </p>

    <h2>Locking and Liquidity Are Separate</h2>
    <p>
      A Bitcoin Lock can exist without a Bitcoin Liquid. Create a Bitcoin Lock only establishes
      its multisig custody arrangement. To receive a Bitcoin's market value in the form of
      <DocLink to="/docs/asset-rules/argons"
      >Argon stablecoins</DocLink
      >, the owner must separately create a Bitcoin Liquid against the eligible
      Lock.
    </p>

    <p>
      See
      <DocLink to="/docs/asset-rules/bitcoin-locks"
        >Bitcoin Locks</DocLink
      >
      for custody, insurance, and release rules, or
      <DocLink to="/docs/asset-rules/bitcoin-liquids"
        >Bitcoin Liquids</DocLink
      >
      for the process of receiving ARGN against locked Bitcoin.
    </p>
    <p>
      See <DocLink to="/docs/desktop-app/internal-wallet">Internal Wallet</DocLink>
      for Bitcoin deposit and withdrawal instructions in Argon Desktop.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
