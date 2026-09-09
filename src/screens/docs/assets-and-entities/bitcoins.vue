<template>
  <DocHeader>Bitcoin</DocHeader>

  <DocContent>
    <p>
      Bitcoin (BTC) is a native asset of the Bitcoin network. Argon Desktop can
      hold and manage Bitcoin without wrapping it, bridging it to another
      blockchain, or replacing it with a separate token. The Bitcoin remains in
      a Bitcoin UTXO and continues to be verified by the Bitcoin network.
    </p>

    <p>
      Moving Bitcoin into your App Wallet places it into a
      <DocLink to="/docs/assets-and-entities/bitcoin-locks"
        >Bitcoin Lock</DocLink
      >. The Lock is a multisig custody arrangement between you and a vault
      cosigner. It secures the Bitcoin inside the wallet, but it does not by
      itself create or distribute Argon stablecoins.
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
          <DocLink to="/docs/assets-and-entities/bitcoin-locks"
            >Bitcoin Lock</DocLink
          >
        </div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          The multisig arrangement that holds the BTC in your App Wallet.
        </p>
      </div>
      <div class="rounded-lg border border-argon-300 bg-argon-50/50 p-5">
        <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
          The Position
        </div>
        <div class="mt-2 text-xl font-bold text-slate-800">
          <DocLink to="/docs/assets-and-entities/bitcoin-liquids"
            >Bitcoin Liquid</DocLink
          >
        </div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          A separate position that makes part of the locked Bitcoin's value
          available as ARGN.
        </p>
      </div>
    </section>

    <h2>Bitcoin in Argon Desktop</h2>
    <p>
      The App Wallet creates a Bitcoin deposit channel before you move BTC into
      it. The channel identifies a vault cosigner, derives the owner's Bitcoin
      key, and produces a multisig funding address. After the Bitcoin
      transaction is confirmed, the funded UTXO appears in the wallet as a
      Bitcoin Lock.
    </p>

    <p>
      Your recovery phrase controls the owner's side of the Lock. The selected
      <DocLink to="/docs/assets-and-entities/vaulting-operations"
        >Stabilization Vault</DocLink
      >
      supplies the second signing key. During the normal Lock term, neither side
      can independently spend the Bitcoin.
    </p>

    <h2>Locking and Liquidity Are Separate</h2>
    <p>
      A Bitcoin Lock can exist without a Bitcoin Liquid. This lets the App
      Wallet hold BTC in its multisig structure without automatically creating
      ARGN or opening a financial position.
    </p>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="block mb-1">Moving BTC does not create ARGN</strong>
      <p class="m-0">
        Funding a Bitcoin Lock only moves Bitcoin into the App Wallet's custody
        arrangement. To receive
        <DocLink to="/docs/assets-and-entities/argon-stablecoins"
          >Argon stablecoins</DocLink
        >, the owner must separately create a Bitcoin Liquid against an eligible
        Lock.
      </p>
    </aside>

    <h2>Insurance Is Optional</h2>
    <p>
      When creating a Bitcoin Lock, you can choose how much vault-backed
      <strong>insurance</strong> it carries. A Lock may have no insurance, or it
      may reserve any supported positive amount up to the vault's available
      capacity. Insurance protects against covered failures of the vault
      cosigner; it does not create ARGN and does not change ownership of the
      Bitcoin.
    </p>

    <p>
      A Bitcoin Liquid requires available insurance because the insurance
      capital supports the resulting ARGN position. An uninsured Lock can still
      hold Bitcoin, but it cannot support a Liquid until sufficient insurance is
      added.
    </p>

    <h2>Moving Bitcoin Out</h2>
    <p>
      To move BTC out of the App Wallet, the owner requests release to a Bitcoin
      address and supplies a Bitcoin network fee. Any open Liquid must first be
      closed. The owner and vault then sign the release transaction, and the App
      broadcasts it to the Bitcoin network.
    </p>

    <p>
      See
      <DocLink to="/docs/assets-and-entities/bitcoin-locks"
        >Bitcoin Locks</DocLink
      >
      for custody, insurance, and release rules, or
      <DocLink to="/docs/assets-and-entities/bitcoin-liquids"
        >Bitcoin Liquids</DocLink
      >
      for the process of receiving ARGN against locked Bitcoin.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
