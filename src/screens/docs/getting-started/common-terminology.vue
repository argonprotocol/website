<template>
  <DocHeader> Common Terminology </DocHeader>
  <DocContent>
    <p>
      These are the terms you’ll encounter most often in Argon Desktop and
      throughout this website.
    </p>

    <h2>Money and Assets</h2>
    <ul>
      <li>
        <strong>Argon (ARGN).</strong> The network’s inflation-resistant
        stablecoin. Its target value follows the cost of real goods rather than
        a fixed amount of a fiat currency. “Argon” can also refer to the network
        itself.
        <router-link to="/docs/assets-and-entities/argons"
          >Learn more about Argons.</router-link
        >
      </li>
      <li>
        <strong>Argonot (ARGNOT).</strong> A separate token used to operate and
        capitalize parts of the network. Miners commit Argonots when bidding for
        mining seats, and vault operators use them as part of vault
        securitization. Argonots can also be placed into yield-bearing stakes.
        <router-link to="/docs/assets-and-entities/argonots"
          >Learn more about Argonots.</router-link
        >
      </li>
      <li>
        <strong>Bitcoin Lock or Liquid Lock.</strong> A Bitcoin position held
        through an onchain vault arrangement. The owner receives the Bitcoin’s
        market value in liquid Argons while retaining a defined path to release
        the Bitcoin.
        <router-link to="/docs/assets-and-entities/bitcoin-locks"
          >Learn more about Bitcoin Locks.</router-link
        >
      </li>
      <li>
        <strong>Argon Bond.</strong> A yield-bearing position that supplies
        Argons to a vault. Bondholders receive a share of the vault’s
        stabilization revenue, subject to the bond’s onchain terms.
        <router-link to="/docs/assets-and-entities/argon-bonds"
          >Learn more about Argon Bonds.</router-link
        >
      </li>
      <li>
        <strong>Argonot Stake.</strong> A yield-bearing position that supplies
        Argonots to a miner. Stakeholders receive a share of mining-auction
        revenue, subject to the stake’s onchain terms.
        <router-link to="/docs/assets-and-entities/argonot-stakes"
          >Learn more about Argonot Stakes.</router-link
        >
      </li>
    </ul>

    <h2>Network and Mining</h2>
    <ul>
      <li>
        <strong>Block.</strong> A group of transactions added to the Argon
        blockchain by a miner. The miner that completes a block receives the
        rewards assigned to it.
      </li>
      <li>
        <strong>Frame.</strong> The network’s roughly 24-hour operating period.
        Mining auctions, seat terms, and Treasury activity are organized around
        numbered frames.
      </li>
      <li>
        <strong>Mining Seat.</strong> The right to participate in block mining
        for a fixed term. Seats are awarded through recurring mining auctions.
      </li>
      <li>
        <strong>Mining Auction.</strong> The open bidding process that selects
        the miners for an upcoming seat term.
        <router-link to="/docs/assets-and-entities/mining-operations"
          >Learn more about mining.</router-link
        >
      </li>
      <li>
        <strong>Bid.</strong> An offer to commit Argons and the required
        Argonots in exchange for a mining seat. Winning bids become active seats
        when their term begins.
      </li>
      <li>
        <strong>Bidding Bot.</strong> The automated service in Argon Desktop
        that submits and adjusts mining bids using rules set by the operator.
      </li>
    </ul>

    <h2>Vaulting and Treasury</h2>
    <ul>
      <li>
        <strong>Stabilization Vault.</strong> An onchain operation that supports
        Bitcoin Locks and deploys capital into Treasury. A vault operator sets
        its available capacity, fees, and capital-allocation rules.
        <router-link to="/docs/assets-and-entities/vaulting-operations"
          >Learn more about vaulting.</router-link
        >
      </li>
      <li>
        <strong>Vault Operator.</strong> The participant responsible for running
        a vault, maintaining its server and keys, setting its rules, and
        cosigning Bitcoin releases when required.
      </li>
      <li>
        <strong>Securitization.</strong> The Argons and Argonots committed to
        support a vault’s obligations and create capacity for its stabilization
        activities.
      </li>
      <li>
        <strong>Treasury.</strong> The network system that puts mining-auction
        revenue and contributed capital to work in stabilization activities.
        Argon Desktop’s Treasury features include Bitcoin Locks, Argon Bonds,
        and Argonot Stakes. Stable Swaps are part of Basic Functionality.
      </li>
      <li>
        <strong>Cosigning.</strong> A vault operator’s approval of a valid
        Bitcoin release transaction. Cosigning is one of the ongoing
        responsibilities of operating a vault.
      </li>
    </ul>

    <h2>Accounts and Participation</h2>
    <ul>
      <li>
        <strong>Wallet.</strong> The keys and addresses used to hold assets and
        approve transactions. Argon Desktop is self-custodial: the network does
        not keep a password or recovery copy of your keys.
        <router-link to="/docs/desktop-app/self-custody-risks"
          >Review the self-custody risks.</router-link
        >
      </li>
      <li>
        <strong>Operator.</strong> A participant who runs network
        infrastructure, such as a mining node or Stabilization Vault, rather
        than only holding or deploying assets.
      </li>
      <li>
        <strong>Certification.</strong> The guided learning process used to
        prepare members for Treasury or Operations access. It introduces the
        required concepts and records completed activities.
      </li>
      <li>
        <strong>Member Onboarding.</strong> The process through which an
        established operator invites and guides a new member. The inviting
        operator can help the member complete certification and begin
        participating in the network.
      </li>
    </ul>
  </DocContent>
</template>
<script setup lang="ts">
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
</script>
