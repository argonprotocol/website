<template>
  <DocHeader>Bitcoin Liquids</DocHeader>

  <DocContent>
    <p>
      A Bitcoin Liquid is an onchain financial position that lets the owner of a
      <DocLink to="/docs/assets-and-entities/bitcoin-locks"
        >Bitcoin Lock</DocLink
      >
      receive Argon stablecoins against part of the locked Bitcoin's value. The
      Liquid does not move the Bitcoin, replace it with a wrapped token, or
      create another Bitcoin Lock.
    </p>

    <p>
      Locking Bitcoin and creating a Liquid are separate actions. A funded Lock
      can remain in the App Wallet without producing any ARGN. The owner must
      choose to create a Liquid before the protocol records an ARGN position and
      begins distributing stablecoins.
    </p>

    <section
      class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40"
    >
      <header
        class="border-b border-slate-300 bg-slate-100/70 px-5 py-3 text-sm font-bold tracking-wide text-slate-600 uppercase"
      >
        Liquid Requirements
      </header>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4">
        <div class="border-b border-slate-300 p-5 sm:border-r lg:border-b-0">
          <div class="text-2xl font-bold text-argon-600">Funded Lock</div>
          <div class="mt-1 text-sm text-slate-600">
            The underlying BTC is confirmed
          </div>
        </div>
        <div class="border-b border-slate-300 p-5 lg:border-r lg:border-b-0">
          <div class="text-2xl font-bold text-argon-600">Insurance</div>
          <div class="mt-1 text-sm text-slate-600">
            Vault capital supports the position
          </div>
        </div>
        <div class="border-b border-slate-300 p-5 sm:border-r sm:border-b-0">
          <div class="text-2xl font-bold text-argon-600">ARGN</div>
          <div class="mt-1 text-sm text-slate-600">
            The asset distributed to the owner
          </div>
        </div>
        <div class="p-5">
          <div class="text-2xl font-bold text-argon-600">BTC stays locked</div>
          <div class="mt-1 text-sm text-slate-600">
            The multisig UTXO does not move
          </div>
        </div>
      </div>
    </section>

    <h2>How Much ARGN a Liquid Can Create</h2>
    <p>
      A Liquid can use only the portion of a Lock's value supported by unused
      insurance. Its maximum size is limited by both the eligible value of the
      locked Bitcoin and the amount of insurance available to the position.
    </p>

    <section
      class="my-8 rounded-lg border border-argon-300 bg-argon-50/50 px-5 py-5"
    >
      <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
        Liquid Capacity
      </div>
      <div
        class="my-4 overflow-x-auto rounded-md border border-argon-200 bg-white/60 px-4 py-5 text-center font-['Latin_Modern_Math'] text-xl text-slate-800 sm:text-2xl"
      >
        Liquid amount ≤ eligible BTC value and available insurance
      </div>
      <p class="m-0 text-sm text-slate-600">
        A Lock with zero insurance has no Liquid capacity. Insurance can be
        added before a Liquid is created, subject to vault availability and
        fees.
      </p>
    </section>

    <p>
      The protocol values the Bitcoin in ARGN using its current Bitcoin pricing
      data and Argon's purchasing-power target. The owner chooses an amount
      within the available capacity rather than being required to create a
      Liquid for the full value of the Lock.
    </p>

    <h2>Where the Argons Come From</h2>
    <p>
      Creating a Liquid records the amount of
      <DocLink to="/docs/assets-and-entities/argon-stablecoins"
        >ARGN</DocLink
      >
      the position is eligible to receive. Available Treasury capital can supply
      this liquidity, including capital contributed through
      <DocLink to="/docs/assets-and-entities/argon-bonds"
        >Argon Bonds</DocLink
      >. Any remaining amount follows the protocol's controlled issuance rules.
    </p>

    <p>
      This means a Liquid is not permission to mint an unlimited number of
      Argons. Distribution remains constrained by the Lock's Bitcoin value,
      insurance, Treasury liquidity, and the network's issuance limits. See
      <DocLink to="/docs/system-design/stability-algorithms"
        >Stability Algorithms</DocLink
      >
      for the system-wide issuance controls.
    </p>

    <h2>The Liquid Position</h2>
    <p>
      A Liquid makes ARGN spendable while its underlying BTC remains in the
      multisig Lock. In exchange, the position records an ARGN closing
      obligation. The Liquid must be closed before the supporting Bitcoin can be
      released.
    </p>

    <p>
      The closing amount is calculated under the position's protocol-defined
      pricing rules. It does not rise above the amount established by the
      Liquid, so an increase in Bitcoin's value does not increase that ceiling.
      If the eligible value of the Bitcoin falls, the required closing amount
      can fall with it.
    </p>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="block mb-1">A Liquid is a position, not a token</strong>
      <p class="m-0">
        The owner receives ordinary ARGN. “Bitcoin Liquid” refers to the
        recorded relationship between that ARGN and a Bitcoin Lock; it is not a
        separate currency that can be transferred independently.
      </p>
    </aside>

    <h2>The Life of a Bitcoin Liquid</h2>

    <ol class="my-8 ml-0! grid list-none gap-3 p-0 md:grid-cols-2">
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >1</span
          >
          <strong class="text-lg">Prepare the Lock</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Start with confirmed BTC in a Bitcoin Lock and enough unused insurance
          for the desired Liquid amount.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >2</span
          >
          <strong class="text-lg">Create</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Choose an amount within the Lock's capacity and submit the Liquid. The
          position records its ARGN amount and closing terms.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >3</span
          >
          <strong class="text-lg">Use the Argons</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          ARGN distributed from the Liquid is ordinary spendable currency. The
          BTC remains inside its Lock while the position is open.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="flex items-center gap-3">
          <span
            class="flex size-8 items-center justify-center rounded-full bg-argon-100 text-sm font-bold text-argon-700"
            >4</span
          >
          <strong class="text-lg">Close</strong>
        </div>
        <p class="mt-3 mb-0 text-sm text-slate-600">
          Acquire and burn the required ARGN to close the Liquid. Its Bitcoin
          remains locked until the owner separately requests release.
        </p>
      </li>
    </ol>

    <h2>Closing Is Not Releasing</h2>
    <p>
      Closing a Liquid settles its ARGN obligation and frees the insurance
      capacity used by the position. It does not spend the Bitcoin UTXO. The
      owner may leave the BTC in the App Wallet or begin the separate Bitcoin
      Lock release process.
    </p>

    <p>
      Likewise, releasing a Bitcoin Lock cannot bypass an open Liquid. The App
      Wallet must close the position before it can construct and submit the
      Bitcoin release transaction.
    </p>

    <h2>Using Argon Desktop</h2>
    <p>
      Open a funded Bitcoin Lock and choose <strong>Create Liquid</strong>.
      Review its available insurance, ARGN capacity, fees, and closing terms;
      then choose the amount and submit the position. The wallet tracks the ARGN
      distributed, the closing requirement, and the insurance assigned to the
      Liquid.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
