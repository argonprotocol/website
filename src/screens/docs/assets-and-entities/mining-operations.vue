<template>
  <DocHeader>Mining Operations</DocHeader>

  <DocContent>
    <p>
      A mining operation is an operator-run system that competes for
      time-limited <strong>mining seats</strong>. An active seat allows its
      operator to help produce and finalize blocks, earning the miner's share of
      block rewards and the transaction fees from blocks it produces.
    </p>

    <p>
      Mining seats separate participation from a pure computing-power race.
      Operators first compete economically for a place in the active miner set;
      the protocol then assigns block opportunities among the miners that hold
      seats.
    </p>

    <section
      class="my-8 grid overflow-hidden rounded-lg border border-slate-300 bg-white/40 sm:grid-cols-2"
    >
      <div class="border-b border-slate-300 p-5 sm:border-r">
        <div class="text-2xl font-bold text-argon-600">1 Frame</div>
        <div class="mt-1 text-sm text-slate-600">Approximately 24 hours</div>
      </div>
      <div class="border-b border-slate-300 p-5">
        <div class="text-2xl font-bold text-argon-600">10 Frames</div>
        <div class="mt-1 text-sm text-slate-600">One mining-seat term</div>
      </div>
      <div class="border-b border-slate-300 p-5 sm:border-r sm:border-b-0">
        <div class="text-2xl font-bold text-argon-600">10–144 Seats</div>
        <div class="mt-1 text-sm text-slate-600">Per incoming cohort</div>
      </div>
      <div class="p-5">
        <div class="text-2xl font-bold text-argon-600">ARGN + ARGNOT</div>
        <div class="mt-1 text-sm text-slate-600">Bid plus collateral</div>
      </div>
    </section>

    <h2>Rotating Mining Seats</h2>
    <p>
      The active miner set is made from overlapping <strong>cohorts</strong>. At
      the beginning of every frame, one newly selected cohort starts mining. The
      cohort that began ten frames earlier retires at the same time.
    </p>
    <p>
      A winning seat therefore remains active for ten frames—approximately ten
      days. A miner cannot register overlapping terms. It can bid for a
      continuation only when its current term is about to end, and that
      continuation must win like any other seat.
    </p>

    <h2>How a Seat Auction Works</h2>
    <p>
      Each incoming cohort has a set number of seats. An eligible operator
      enters the auction by providing mining authority keys, an
      <router-link to="/docs/assets-and-entities/argon-stablecoins"
        >ARGN</router-link
      >
      bid, and the required ARGNOT collateral. While bidding is open, the
      protocol maintains a ranked list containing the highest bids for the
      available seats.
    </p>
    <p>
      Once the list is full, a new bid is accepted only if it ranks above the
      current lowest bid. The displaced operator's ARGN is returned, and any
      ARGNOT that is not supporting an active seat is released. An operator can
      increase an accepted bid during the auction, but cannot reduce it.
    </p>
    <p>
      The auction closes unpredictably during its protocol-defined closing
      window. The bids in the ranked list at that moment win. Their cohort joins
      the active miner set at the next frame boundary, when its ten-frame term
      begins.
    </p>
    <p>
      <strong>Example:</strong> If the incoming cohort has 10 seats, the auction
      retains the 10 highest bids. A new bid that enters the top 10 displaces
      bid number 10.
    </p>

    <h2>ARGN Bids and ARGNOT Collateral</h2>
    <p>
      A mining bid uses two native assets for different purposes. Treating both
      as parts of the bid obscures the operator's actual cost and capital
      requirements.
    </p>

    <section class="my-8 grid gap-3 md:grid-cols-2">
      <div class="rounded-lg border border-argon-200 bg-argon-50/40 p-5">
        <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">
          ARGN Bid
        </div>
        <div class="mt-2 text-lg font-bold text-slate-800">
          Competitive and spendable
        </div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          The ARGN amount determines auction rank. It is returned if the bid is
          displaced, but paid into the mining-bid pool if the seat is won.
        </p>
      </div>
      <div class="rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="text-sm font-bold tracking-wide text-slate-600 uppercase">
          ARGNOT Collateral
        </div>
        <div class="mt-2 text-lg font-bold text-slate-800">
          Required and held
        </div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          The required
          <router-link to="/docs/assets-and-entities/argonot-tokens"
            >ARGNOT</router-link
          >
          is held by the protocol. It remains the funding account's property and
          becomes spendable again when it no longer supports a bid or seat.
        </p>
      </div>
    </section>

    <h3>How the Collateral Requirement Changes</h3>
    <p>
      The ARGNOT requirement is recalculated for each incoming cohort. The
      protocol takes the lower-median winning ARGN bid from the preceding
      auction, doubles its value, and converts that amount into ARGNOT using the
      previous frame's average ARGNOT price.
    </p>

    <section
      class="my-8 rounded-lg border border-slate-300 bg-white/40 px-5 py-5"
    >
      <div class="text-sm font-bold tracking-wide text-slate-600 uppercase">
        Collateral Calculation
      </div>
      <div
        class="my-4 overflow-x-auto rounded-md border border-slate-300 bg-slate-50/70 px-4 py-5 text-center font-['Latin_Modern_Math'] text-lg text-slate-800 sm:text-xl"
      >
        Required ARGNOT value = Lower-median winning bid × 2
      </div>
      <p class="m-0 text-sm text-slate-600">
        A protocol minimum applies if the calculated token quantity would be
        smaller than the minimum account balance.
      </p>
    </section>

    <p>
      The requirement can therefore change even when bids remain similar,
      because the ARGN value of ARGNOT also changes. In the planned
      <router-link to="/docs/assets-and-entities/argonot-stakes"
        >Argonot Stakes</router-link
      >
      model, holders will be able to supply this operating capital through a
      mining operation while the protocol retains control of the committed
      principal.
    </p>

    <h2>How the Network Adjusts Seat Capacity</h2>
    <p>
      The number of seats in a new cohort is not permanently fixed. The protocol
      compares the trailing average winning price with its target price of 1,000
      ARGN per seat. Persistent prices above the target cause a future cohort to
      grow; prices below the target cause it to shrink.
    </p>
    <p>
      Each adjustment is dampened to no more than 20%, remains inside the
      10-to-144-seat range, and is scheduled ten frames in advance. This gives
      the network a measured way to expand or contract participation without
      changing the size of the next cohort abruptly.
    </p>

    <h2>Producing Blocks</h2>
    <p>
      Winning an auction makes the mining operation part of the active authority
      set; it does not purchase a fixed number of blocks. For each eligible
      block, the protocol scores active miners using the block's seal proof,
      miner-specific values, and recent block-production history. The scoring
      includes a fairness adjustment so block opportunities do not simply
      accumulate with one operator.
    </p>
    <p>
      A mining operation must keep its node and authority keys available
      throughout the term. Its server validates network state, authors blocks
      when selected, and participates in finality with the other active
      authorities.
    </p>

    <h2>Mining Revenue</h2>
    <p>
      A miner can receive newly issued ARGN, newly issued ARGNOT, and the
      transaction fees paid in blocks it produces. When a block-vote creator is
      eligible for a share, the protocol assigns the miner 75% of the block's
      ARGN and ARGNOT issuance and assigns the remaining 25% to that voter.
    </p>
    <p>
      ARGN block issuance can change with the stablecoin's supply needs, while
      ARGNOT follows its own issuance schedule. See
      <router-link to="/docs/system-design/tokenomics-of-argon"
        >Tokenomics of Argon</router-link
      >
      and
      <router-link to="/docs/system-design/tokenomics-of-argonot"
        >Tokenomics of Argonot</router-link
      >
      for those rules.
    </p>
    <p>
      Winning bids flow into the mining-bid pool rather than directly to block
      producers. The protocol distributes that revenue among
      <router-link to="/docs/assets-and-entities/argonot-stakes"
        >Argonot Stakes</router-link
      >,
      <router-link to="/docs/assets-and-entities/operational-rewards-pool"
        >the Expansion Rewards Pool</router-link
      >, and stabilization capital supplied through vaults and
      <router-link to="/docs/assets-and-entities/argon-bonds"
        >Argon Bonds</router-link
      >.
    </p>

    <h2>Using Argon Desktop</h2>
    <p>
      Mining is managed from the
      <router-link to="/docs/desktop-app/operations"
        >Operations level</router-link
      >
      of Argon Desktop. The setup workflow connects a compatible local or cloud
      machine, installs the mining software, confirms the operator's bidding
      rules, and funds the mining wallet with ARGN and ARGNOT.
    </p>
    <p>
      The bidding bot applies the operator's capital commitment, starting bid,
      maximum bid, and rebidding rules. It can place and increase bids and seek
      continuation seats, but the operator remains responsible for its strategy,
      available capital, server health, and keys. The Mining dashboard then
      tracks auction position, active and upcoming seats, rewards, and return to
      date.
    </p>

    <aside
      class="my-8 rounded-lg border border-amber-300 bg-amber-50/60 px-5 py-4"
    >
      <strong class="block mb-2 text-lg text-amber-900"
        >Operating Responsibility</strong
      >
      <p class="m-0! text-amber-900/80">
        Automation does not make a mining return predictable. Auction prices,
        block assignments, token prices, network issuance, transaction volume,
        and machine availability can all change an operation's results. Review
        <router-link to="/docs/desktop-app/operations-certification"
          >Operator Certification</router-link
        >
        before committing operational capital.
      </p>
    </aside>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
