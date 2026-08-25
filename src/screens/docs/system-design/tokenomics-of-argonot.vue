<template>
  <DocHeader>Tokenomics of Argonot</DocHeader>

  <DocContent>
    <p>
      Argonot (ARGNOT) is the network's ownership and operational collateral
      token. Unlike Argon, it has no target price and its issuance does not
      respond to demand for the stable currency.
    </p>

    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Symbol</td>
          <td>ARGNOT</td>
        </tr>
        <tr>
          <td>Smallest unit</td>
          <td>1 micronot = 0.000001 ARGNOT</td>
        </tr>
        <tr>
          <td>Genesis issuance</td>
          <td>None—no ARGNOT was issued in the genesis block</td>
        </tr>
        <tr>
          <td>First issuance</td>
          <td>January 15, 2025, through mining rewards</td>
        </tr>
        <tr>
          <td>Supply policy</td>
          <td>Declining issuance, with no enforced hard cap</td>
        </tr>
      </tbody>
    </table>

    <h2>Issuance</h2>
    <p>
      The scheduled block reward begins at 0.5 ARGNOT and rises by 0.001 ARGNOT
      every 180 ticks until it reaches 5 ARGNOT. It then steps down every 2.1
      million ticks according to 5 ÷ (the number of completed eras + 1).
    </p>
    <p>
      When both recipients are present, 75% of a block's reward goes to the
      miner and 25% to the block-vote creator. Missing notebook participation
      can reduce the amount issued.
    </p>

    <aside
      class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4"
    >
      <strong class="block mb-1">Declining issuance, not a hard cap</strong>
      <p class="m-0">
        The current runtime does not enforce a 21-million ARGNOT ceiling. Its
        schedule reduces issuance over time but does not set a fixed maximum
        supply.
      </p>
    </aside>

    <h2>What Argonots Are Used For</h2>
    <ul>
      <li>
        <strong>Mining:</strong> bidders temporarily commit ARGNOT as collateral
        for mining seats.
      </li>
      <li>
        <strong>Vaulting and transfers:</strong> operators commit ARGNOT to
        securitize vaults and back crosschain Minting Authorities. Encumbered
        collateral can be burned if an authority fails its obligation.
      </li>
      <li>
        <strong>Argonot Stakes:</strong> holders commit ARGNOT to receive a
        proportional share of the Argons allocated from mining auctions.
      </li>
    </ul>
    <p>
      Committed ARGNOT normally remains owned by its holder but cannot be spent
      until released. Moving ARGNOT to another supported network likewise
      changes its representation rather than creating an independent supply.
    </p>

    <h2>Value and Returns</h2>
    <p>
      ARGNOT's market value can rise or fall independently of Argon. Holding it
      alone does not guarantee income or control of the protocol. Any mining or
      staking return is denominated in network tokens—not dollars—and does not
      imply that either token has real-world value.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
