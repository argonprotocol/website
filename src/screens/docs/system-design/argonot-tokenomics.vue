<template>
  <DocHeader>Argonot Tokenomics</DocHeader>

  <DocContent>
    <p>
      Argonot (ARGNOT) is the network's ownership and operational token.
      Unlike Argon, it has no target price and its issuance does not
      fluctuate based on supply and demand.
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
          <td>No ARGNOT was issued in the genesis block</td>
        </tr>
        <tr>
          <td>First issuance</td>
          <td>January 15, 2025, through mining rewards</td>
        </tr>
        <tr>
          <td>Supply policy</td>
          <td>Declining issuance, capped at 21M</td>
        </tr>
      </tbody>
    </table>

    <h2>Issuance</h2>
    <p>
      The block rewards began at 0.5 ARGNOT on January 15, 2026, and they rise
      by 0.001 ARGNOT every 180 ticks until it reaches 5 ARGNOT per block. It then steps down every 2.1
      million ticks according to 5 ÷ (the number of completed eras + 1).
    </p>
    <p>
      Argonot's circulation is forever capped at 21 million.
    </p>

    <h2>Common Argonot Usage</h2>
    <p>
      There several ways Argonot are used within the network:
    </p>
    <ul>
      <li>
        <strong>Mining:</strong> bidders temporarily commit ARGNOT as collateral
        for mining seats.
      </li>
      <li>
        <strong>Vaulting:</strong> operators commit ARGNOT to
        securitize vaults.
      </li>
      <li>
        <strong>Cross-Chain Transfers:</strong> ARGNOT is used to back cross-chain Minting Authorities.
        Collateral can be slashed if an authority fails to follow protocol.
      </li>
      <li>
        <strong>Argonot Stakes:</strong> holders commit ARGNOT to receive a
        proportional share of Argons allocated from mining auctions.
      </li>
      <li>
        <strong>Store of Value:</strong> although not directly supported by official Argon tooling or the
        Argon Desktop app, many holders of ARGNOT simply hold the token and trade it on exchanges.
      </li>
    </ul>

    <h2>Valuation and Returns</h2>
    <p>
      ARGNOT's market value can rise or fall independently of Argon. Holding it
      does not guarantee income or control of the protocol. Any mining or
      staking return is denominated in network tokens—not dollars—and does not
      imply the token has real-world value.
    </p>

    <h2>Circulation Freezes</h2>
    <p>
      The network has several mechanisms that freeze the Argonot tokens on-chain, effectively removing them from
      trading circulation. Each of the mechanisms has different freeze durations:
    </p>
    <ul class="list-disc ml-10">
      <li>Mining (1 to 10 days) &ndash; up to 40% can be allocated.</li>
      <li>Stakes (10 days) &ndash; up to 60% can be allocated.</li>
      <li>Vault Securitization (10 days) &ndash; up to 40% can be allocated.</li>
      <li>Minting Authorities (10 days) &ndash; as much as the network needs.</li>
    </ul>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
