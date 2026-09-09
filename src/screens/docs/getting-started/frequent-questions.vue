<template>
  <DocHeader> Frequent Questions </DocHeader>
  <DocContent>
    <p>
      These answers cover the questions most people have when they first
      encounter Argon or open Argon Desktop. For definitions of individual
      concepts, see
      <router-link to="/docs/getting-started/common-terminology"
        >Common Terminology</router-link
      >.
    </p>

    <h2>Argons and Argonots</h2>
    <article>
      <header>How Is Argon Different From a Dollar-Pegged Stablecoin?</header>
      <p>
        A dollar-pegged stablecoin aims to mirror the value of U.S. dollars.
        Argon instead creates stable purchasing power using a Consumer Price
        Index based on the cost of real goods. As those costs change, Argon’s
        target value changes with them. Learn more about
        <router-link to="/docs/assets-and-entities/argons"
          >Argons</router-link
        >
        and
        <router-link to="/docs/system-design/argon-tokenomics"
          >Argon tokenomics</router-link
        >.
      </p>
    </article>

    <article>
      <header>Is an Argon Expected to Increase in Value?</header>
      <p>
        No. Argon (ARGN) is designed to preserve purchasing power, not behave like a
        speculative asset. However, its market price can still move above or below its
        target, and the protocol’s stabilization mechanisms do not guarantee a
        particular future price. Holding Argons should not be treated as a
        promise of investment gains.
      </p>
    </article>

    <article>
      <header>How Is an Argonot Different From an Argon?</header>
      <p>
        Argonot (ARGNOT) is a separate
        token from the Argon. It is used in mining, vault securitization, and Argonot Stakes. Argonots
        do not represent company shares or a claim on a company. Their market
        value is determined by supply and demand rather than a stable
        purchasing-power target.
        <router-link to="/docs/assets-and-entities/argonots"
          >Learn more about Argonots</router-link
        >
        and
        <router-link to="/docs/system-design/argonot-tokenomics"
          >Argonot tokenomics</router-link
        >.
      </p>
    </article>

    <article>
      <header>Where Can I Acquire Argons or Argonots?</header>
      <p>
        There is no official market. The tokens can theoretically trade on any
        decentralized market. Uniswap is currently the most popular option, but
        anyone can set up trading pairs on any market. Argon Desktop currently
        supports moving compatible assets between your Ethereum and Argon
        wallets, but the system does not care how you acquired them. Always
        confirm the token, network, contract, price, and fees before approving a
        trade or transfer.
      </p>
    </article>

    <h2>Argon Desktop and Access</h2>
    <article>
      <header>Do I Need an Invite or Access Code to Use Argon Desktop?</header>
      <p>
        No. You can create or import a self-custodial account and use the basic
        wallet features without an invite. However, an access code is required to
        activate the Treasury level.
        <router-link to="/docs/desktop-app/access-codes"
          >Learn more about access and upgrades.</router-link
        >
      </p>
    </article>

    <article>
      <header>What Is the Difference Between Treasury and Operations?</header>
      <p>
        <router-link to="/docs/desktop-app/treasury">Treasury</router-link> is
        where members deploy assets through features such as Bitcoin Locks,
        Argon Bonds, and Argonot Stakes. Stable Swaps remain available as
        <router-link to="/docs/desktop-app/basic-functionality">Basic Functionality</router-link>.
        <router-link to="/docs/desktop-app/operations">Becoming an Operator</router-link>
        requires much deeper involvement. Operators are responsible for running
        network infrastructure, including mining and Stabilization Vaults.
      </p>
    </article>

    <article>
      <header>Why Are Certification and Operator Sponsorship Required?</header>
      <p>
        Treasury and Operations involve self-custodial assets and, for
        operators, live network infrastructure. Certification introduces the
        required concepts through practical activities. In addition, getting
        sponsored connects a new member with an experienced operator who can
        guide the process and assist in the journey.
      </p>
    </article>

    <article>
      <header>Who Controls My Account and Assets?</header>
      <p>
        You do. Argon Desktop is self-custodial software: it creates or imports
        keys on your device and uses them to approve transactions. Argon does
        not keep a password or recovery copy that can restore your wallet.
        <router-link to="/docs/desktop-app/self-custody-risks"
          >Review the self-custody risks.</router-link
        >
      </p>
    </article>

    <article>
      <header>How Do I Recover My Account?</header>
      <p>
        First, make sure you save your 12-word recovery phrase. Record the words
        in the exact order, keep them private, and store them offline if
        possible. Anyone who obtains the phrase can restore the wallet and
        control its assets. You can import your account into any computer by
        entering these 12-words into the recovery screen of Argon Desktop.
      </p>
    </article>

    <h2>Participating in the Network</h2>
    <article>
      <header>Do I Need a Cloud Machine?</header>
      <p>
        Not for basic wallet or Treasury activities. A continuously available
        machine is needed when you run mining, vaulting, or member-onboarding
        services. Argon Desktop can configure a supported cloud provider,
        connect a compatible custom server, or use a suitable local computer.
      </p>
    </article>

    <article>
      <header>Does Mining Require Specialized Hardware?</header>
      <p>
        No. Argon is designed so specialized mining hardware provides no
        advantage. The desktop setup is built around affordable general-purpose
        machines, while mining seats are allocated through recurring auctions.
        Operators are still responsible for reliable compute, storage,
        networking, and uptime.
        <router-link to="/docs/assets-and-entities/mining-operations"
          >Learn more about mining.</router-link
        >
      </p>
    </article>

    <article>
      <header>Are the Financial Numbers in Argon Desktop Guaranteed?</header>
      <p>
        No. APR, APY, projected earnings, mining rewards, utilization, auction
        costs, token prices, and network fees can all change. Numbers shown in
        the app are estimates based on current or recent network conditions, not
        promises of future returns. Review the terms and risks of an activity
        before committing funds.
      </p>
    </article>

    <article>
      <header>
        Do the Returns Estimates Show How Many Dollars I Will Earn?
      </header>
      <p>
        No. The return percentages in Argon Desktop and throughout this website
        measure Argon-denominated yield: they estimate
        how many additional Argons an amount of Argons may earn. Argon is not
        pegged to the U.S. dollar, and its return calculations do not assume a
        future dollar price. Any USD equivalent value is a
        temporary and likely inaccurate conversion, not part of the return
        itself. The percentage says how much an Argon position may grow in
        Argons; it does not establish whether those Argons will have any
        particular real-world or dollar value when they are earned.
      </p>
    </article>

    <article>
      <header>Can I Participate in More Than One Role?</header>
      <p>
        Yes. The roles are not exclusive. A wallet user can join Treasury,
        a Treasury member can become an Operator, and an Operator may mine, run
        a vault, onboard members, or deploy personal capital. Each activity has
        its own requirements and risks. The system is designed to encourage
        starting with a small role and expanding over time.
      </p>
    </article>
  </DocContent>
</template>

<script setup lang="ts">
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
</script>

<style scoped>
@import "../../../main.css";

h2 {
  @apply mb-6;
}
header {
  @apply text-xl font-semibold mb-1;
}
article {
  @apply mb-6;
}
</style>
