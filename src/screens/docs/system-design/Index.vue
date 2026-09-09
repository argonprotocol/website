<template>
  <DocHeader>Architectural Basics</DocHeader>
  <DocContent>
    <p>
      Argon is a decentralized stablecoin designed to preserve purchasing power
      over time. Its target value follows the cost of real goods, while its
      market price is set by people trading Argons. When those two prices move
      apart, the protocol creates incentives for independent participants to
      bring it back to target.
    </p>

    <img
      class="my-14 min-w-[110%]"
      src="../getting-started/images/how-it-works.png"
      alt="Diagram of Treasury, stabilization, operations, the CPI target, Bitcoin Locks, external networks, issuance governance, and trading markets in the Argon system"
    />

    <p>
      The numbered areas above are components of one system, not a chronological
      sequence. Items 1–6 describe the core economic loop. Items 7–9 show how
      Argon reaches other networks and how market activity feeds a price signal
      back into that loop.
    </p>

    <h2>The System at a Glance</h2>
    <p>Argon's basic feedback loop works like this:</p>
    <ol class="list-disc">
      <li>
        Trading markets reveal what buyers and sellers currently think an Argon
        is worth.
      </li>
      <li>
        The network compares that market price with its Consumer Price Index
        target.
      </li>
      <li>
        When Argon trades above target, miners can earn additional Argons by
        expanding the supply.
      </li>
      <li>
        When Argon trades below target, Bitcoin unlocking becomes more
        attractive and creates demand to buy and burn Argons.
      </li>
      <li>
        Treasury and mining-auction revenue fund the miners, vault operators,
        and capital providers that make these responses possible.
      </li>
    </ol>
    <p>
      No single participant sets the price or decides how many Argons should
      exist. Market prices, protocol rules, and voluntary economic activity work
      together to balance supply and demand.
    </p>

    <h2>1. Treasury</h2>
    <p>
      Treasury is the network’s capital and revenue-distribution system. It
      connects capital providers with the mining and vaulting activities needed to
      create and stabilize the Argon. In return, participants can access Bitcoin
      Locks, Argon Bonds, and Argonot Stakes.
    </p>
    <p>
      Argon's Desktop app helps users participate in these yield-bearing instruments
      while the mainchain enforces the underlying asset rules and distributions. Explore
      <DocLink to="/docs/assets-and-entities/bitcoin-locks"
        >Bitcoin Locks</DocLink
      >,
      <DocLink to="/docs/assets-and-entities/argon-bonds"
        >Argon Bonds</DocLink
      >,
      <DocLink to="/docs/assets-and-entities/argonot-stakes"
        >Argonot Stakes</DocLink
      >.
    </p>

    <h2>2. Stabilization Algorithms</h2>
    <p>
      Argon's stabilization algorithms compare the stablecoin's market price with its target
      price and adjusts the monetary rewards as needed to maintain balance. The system does not
      require anyone to buy, sell, mint, or burn. It simply creates an economically
      attractive environment for the market to help close the price gap.
    </p>

    <p>The system is always in one of three positions:</p>
    <ul>
      <li>
        <strong>Above target:</strong> when demand is outpacing the available supply,
        miners receive additional newly issued Argons, thereby increasing the amount
        available to the market.
      </li>
      <li>
        <strong>Below target:</strong> when supply is outpacing demand, the economics
        of releasing Bitcoin Locks encourage holders to acquire and burn Argons,
        thereby removing them from circulation.
      </li>
      <li>
        <strong>At Target: </strong> when supply and demand are in equilibrium. Nothing
        needs to change. The market is as it should be.
      </li>
    </ul>
    <p>
      The goal is to let supply respond in either direction without relying on a
      company or central issuer. Read more about
      <DocLink to="/docs/economic-pillars/recovery-from-death-spirals"
        >Argon’s recovery mechanisms</DocLink
      >
      or the
      <DocLink to="/docs/whitepapers/fundamentals"
        >stability fundamentals whitepaper</DocLink
      >.
    </p>

    <h2>3. Operations</h2>
    <p>
      Operations is the work performed by miners and vault operators. Miners
      process transactions, produce blocks, and expand the supply when the
      protocol allows additional issuance. Vault operators maintain the
      infrastructure and security keys that support Bitcoin Locks. They also participate in
      Treasury and help create the conditions for excess Argons to be burned.
    </p>
    <p>
      These roles are performed by independent operators who commit their own
      capital and infrastructure. The operators are compensated through protocol rewards,
      auction distributions, and service fees rather than by a central company.
      Explore
      <DocLink to="/docs/assets-and-entities/mining-operations"
        >mining operations</DocLink
      >
      and
      <DocLink to="/docs/assets-and-entities/vaulting-operations"
        >vaulting operations</DocLink
      >.
    </p>

    <h2>4. Consumer Price Index Target</h2>
    <p>
      Argon's Consumer Price Index provides the reference point for stabilization.
      Instead of targeting a permanent exchange rate with the U.S. dollar, Argon
      tracks the fluctuation in the measured cost of real goods. If those costs rise,
      Argon’s target price adjusts with it.
    </p>

    <h2>5. Stabilized Currency</h2>
    <p>
      Argon is a stablecoin where “stable” refers to stable purchasing power
      over time not simply a fixed amount of dollars. Learn why this distinction
      matters in <DocLink to="/docs/economic-pillars/protection-from-inflation"
      >Protection from Inflation</DocLink
      >.
    </p>
    <p>
      It's important to remember that stabilization is a protocol objective, not a
      guarantee that every market will always trade at target. Prices can diverge,
      responses take time, and participation depends on real people finding the
      available incentives worthwhile. Learn more in
      <DocLink to="/docs/economic-pillars/protection-from-inflation"
        >Protection from Inflation</DocLink
      >
      and
      <DocLink to="/docs/economic-pillars/insulation-from-fiat-money"
        >Insulation from Fiat Money</DocLink
      >.
    </p>

    <h2>6. The Massive Short</h2>
    <p>
      Bitcoin holders can place their Bitcoin into Liquid Lock positions and receive
      full market value in the form of Argon stablecoins. Releasing this same Bitcoin requires
      Argons to be burned. The exact amount is detailed in the lock’s on-chain terms. Each lock
      therefore creates a potential future source of demand for Argons.
    </p>
    <p>
      The “Massive Short” is the collective effect of many individual Bitcoin Locks. Each lock
      behaves like a short position against Argon. When the Argon trades below target, Bitcoins
      become cheaper to unlock. At the same time, the unlocking formula increases the number
      of Argons that must be burned in the unlock. Bitcoin holders can therefore unlock at a discount while
      substantially increasing the number of Argons that would normally be removed from circulation.
      This helps bring supply and demand back toward balance.
    </p>
    <p>
     Learn more about
      <DocLink to="/docs/assets-and-entities/bitcoin-locks"
        >Bitcoin Locks</DocLink
      >
      and
      <DocLink to="/docs/economic-pillars/recovery-from-death-spirals"
        >recovery from death spirals</DocLink
      >.
    </p>

    <h2>7. External Networks</h2>
    <p>
      Argons and Argonots can seamlessly move between the Argon Network and any supported external
      network without requiring a traditional cross-chain bridge. Instead of requiring a centralized
      party or a complicated dance between chains, Argon's bridgeless innovation allows transfers to
      be <DocLink to="/docs/bridgeless-transfers/from-argon-to-remote">directly executed by the
      requesting user</DocLink>.
    </p>

    <h2>8. The Global Issuance Council</h2>
    <p>
      The Global Issuance Council coordinates the governance side of cross-chain
      transfers. Council members approve changes that external gateways must
      recognize, including changes involving the authority set and council
      membership. Those approvals keep the Argon mainchain and supported
      external networks aligned.
    </p>
    <p>
      The council coordinates a narrowly defined cross-chain function; it does
      not set Argon’s market price or discretionary monetary policy. Learn more
      about the
      <DocLink to="/docs/bridgeless-transfers/global-issuance-council"
        >Global Issuance Council</DocLink
      >.
    </p>

    <h2>9. Trading Markets</h2>
    <p>
      The world is filled with trading exchanges, both centralized and decentralized.
      The prices produced by those markets provide the observable signals the
      stabilization system responds to. Markets do not decide the response; they
      simply reveal the imbalance that makes one stabilization response more
      profitable than another.
    </p>
    <p>
      If the market price is above the target price, expansion becomes relevant.
      If it is below the target, contraction becomes relevant. The protocol’s
      job is to expose incentives, while participants decide whether and when to
      act on them.
    </p>

    <h2>Putting the Pieces Together</h2>
    <p>
      Argon begins with a target price and a market price. Any gap
      between them activates economic opportunities for miners, Bitcoin holders,
      vault operators, and Treasury participants. Their actions alter the
      circulating supply, which changes market conditions and feeds a new price
      signal back into the system. External networks widen the markets where
      Argon can be used, while Minting Authorities and the Global Issuance
      Council keep that external issuance coordinated with the mainchain.
    </p>
    <p>
      The system is decentralized because these responsibilities are divided
      among markets, protocol rules, capital providers, and independent
      operators. No one component can create stability alone; stability is the
      intended result of the complete feedback loop.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
</script>
