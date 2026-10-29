<template>
  <DocHeader>Bitcoin Locks</DocHeader>

  <DocContent>
    <p>
      A Bitcoin Lock is a native Bitcoin UTXO held in a time-bound multisig
      arrangement between its owner and a Stabilization Vault. Argon Desktop
      creates the Lock when Bitcoin is moved into the App Wallet. The owner retains their key, while the vault supplies the cosigning key.
    </p>

    <p>
      The Lock is the custody and security layer for the Bitcoin. It is separate
      from a
      <DocLink to="/docs/assets-and-entities/bitcoin-liquids"
        >Bitcoin Liquid</DocLink
      >, which is the optional financial position used to receive ARGN against
      the locked BTC.
    </p>

    <aside
      class="my-8 rounded-lg border border-amber-300 bg-amber-50/60 px-5 py-4"
    >
      <strong class="block mb-1 text-amber-900"
        >A Lock does not issue stablecoins</strong
      >
      <p class="m-0 text-amber-900/80">
        Sending Bitcoin to a Lock only funds the multisig UTXO. The owner must
        take a separate action to create a Bitcoin Liquid before any ARGN can be
        distributed.
      </p>
    </aside>

    <h2>How the Multisig Works</h2>
    <p>
      Before Bitcoin is deposited, the App Wallet combines an owner key with a
      key supplied by a
      <DocLink to="/docs/assets-and-entities/vaulting-operations"
        >Stabilization Vault</DocLink
      >. These keys define the Bitcoin script and funding address for the Lock.
      The Bitcoin is sent directly to that address and never leaves the Bitcoin
      network.
    </p>

    <ul>
      <li>
        <strong>The owner key</strong> is derived and controlled by the App
        Wallet's recovery phrase.
      </li>
      <li>
        <strong>The vault key</strong> is controlled by the selected vault
        operator and is used to cosign valid release transactions.
      </li>
      <li>
        <strong>The timelock rules</strong> define the normal cosigning period
        and the recovery paths available after protocol-defined deadlines.
      </li>
    </ul>

    <p>
      During the normal Lock term, neither the owner nor the vault can move the
      Bitcoin alone. The multisig script and its timeouts—not possession of an
      account password—determine which signatures can spend the UTXO.
    </p>

    <h2>Cosigner Guarantee</h2>
    <p>
      A Lock can be created with a <strong>Cosigner Guarantee</strong> of any
      supported amount, including zero. The guarantee is ARGN capital that
      the vault commits to the Lock so the protocol has funds available for
      defined failures involving the vault or its cosigning responsibilities.
    </p>

    <section
      class="my-8 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-5"
    >
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
        Guarantee Amount
      </div>
      <div
        class="my-4 overflow-x-auto rounded-md border border-argon-200 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-xl text-slate-800 sm:text-2xl"
      >
        Cosigner Guarantee = ARGN capital committed by the vault
      </div>
      <p class="m-0 text-sm text-slate-600">
        The guarantee is denominated in ARGN value. It is not additional Bitcoin and
        is not paid to the Lock owner when the Lock is created.
      </p>
    </section>

    <p>
      The chosen amount cannot exceed the vault's available guarantee capacity.
      Vaults charge a fee for the capital and cosigning service they
      provide, so a larger guarantee can cost more than a Lock with a smaller
      guarantee or none.
    </p>

    <p>
      The guarantee covers defined vault risks. It does not protect against changes
      in Bitcoin's market price, guarantee the value of ARGN, or replace the
      owner's responsibility to protect the recovery phrase and approve the
      correct transactions.
    </p>

    <h2>The Life of a Bitcoin Lock</h2>

    <ol class="my-8 ml-0! grid list-none gap-3 p-0 md:grid-cols-2">
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >1</span
          >
          <strong class="text-lg">Create a Channel</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Choose a vault cosigner and a Cosigner Guarantee amount. The App Wallet
          creates the multisig funding address.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >2</span
          >
          <strong class="text-lg">Fund the Lock</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Send BTC to the funding address. The App Wallet detects the UTXO and
          waits for the required Bitcoin confirmations.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >3</span
          >
          <strong class="text-lg">Hold or Create a Liquid</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Leave the BTC locked without creating ARGN, or use the available guarantee
          to create a separate Bitcoin Liquid.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >4</span
          >
          <strong class="text-lg">Release</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Release any open Liquid, choose a destination and network fee, and
          complete the owner-and-vault release transaction.
        </p>
      </li>
    </ol>

    <h2>Releasing Locked Bitcoin</h2>
    <p>
      Releasing a Lock is a Bitcoin transaction. The owner chooses the
      destination address and Bitcoin network fee, signs the release, and asks
      the vault to cosign it. The protocol gives the vault a defined period to
      supply its signature before failure-handling rules apply.
    </p>

    <p>
      A Lock with an open Bitcoin Liquid cannot be released because its Bitcoin
      still supports an outstanding ARGN position. Releasing the Liquid settles that obligation; it does not itself move the Bitcoin. The owner can then
      keep the BTC in the Lock or request its release separately.
    </p>

  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
