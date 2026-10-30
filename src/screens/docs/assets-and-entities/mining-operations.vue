<template>
  <DocHeader>Mining Operations</DocHeader>

  <DocContent>
    <p>
      A mining operation is an operator-run system that competes for and manages
      time-limited <strong>mining seats</strong>. An active seat allows its
      operator to help produce and finalize blocks, earning the miner's share of
      block rewards and the transaction fees from blocks it produces.
    </p>

    <p>
      Mining in the Argon Network is not a pure computing-power race.
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
      the beginning of every frame, the latest auctioned cohort starts mining. The
      cohort that began ten frames earlier retires at the same time. A winning seat
      therefore remains active for ten frames, which is approximately ten
      days in the Argon world.
    </p>

    <h2>How a Seat Auction Works</h2>
    <p>
      Each incoming cohort has a set number of seats. An eligible operator
      enters the auction by providing mining authority keys, an
      <DocLink to="/docs/assets-and-entities/argon-stablecoins"
        >ARGN</DocLink
      >
      bid, and the required ARGNOT collateral. Bids are queued in batches based
      on the block in which they are submitted. Each batch settles five blocks
      later and updates the winning list for that cohort.
    </p>

    <h3>Fixed and Automatic Bids</h3>
    <p>
      Operators can choose a fixed price or authorize the protocol to bid
      automatically within a range. Public bids and maxima use increments of
      0.01 ARGN, and a maximum must be at least as large as its public bid.
    </p>

    <section class="my-8 grid gap-3 md:grid-cols-2">
      <div class="rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="text-lg font-bold text-slate-800">Fixed Bid</div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          Submit a public bid without a maximum commitment. If accepted into the
          winning list, the miner pays exactly that amount. It is also the
          miner's maximum for competing with other bids.
        </p>
      </div>
      <div class="rounded-lg border border-argon-200 bg-argon-50/40 p-5">
        <div class="text-lg font-bold text-argon-700">Automatic Bid</div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          Submit a public bid and a cryptographic commitment to a chosen
          maximum. After that maximum is disclosed, the protocol can increase
          the winning price as competition requires, up to the funded maximum.
        </p>
      </div>
    </section>

    <h3>From Submission to Settlement</h3>
    <p>
      Automatic bidding uses two calls: <code>bid</code> submits the public bid
      and commitment, and <code>bid_max</code> discloses the maximum. If the
      initial bid is included in block B, the sequence is:
    </p>

    <ol class="my-8 ml-0! grid list-none gap-3 p-0 md:grid-cols-3">
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">Block B</div>
        <div class="mt-2 text-lg font-bold text-slate-800">Submit</div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          The public bid enters a pending batch. For an automatic bid, include
          the maximum's hash and keep the maximum and its random salt private
          until this transaction is included.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">Blocks B+1–B+5</div>
        <div class="mt-2 text-lg font-bold text-slate-800">Disclose</div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          The funding account submits the maximum and salt for the same mining
          account. They must match the original commitment. The fifth block is
          included in the disclosure window.
        </p>
      </li>
      <li class="m-0 rounded-lg border border-slate-300 bg-white/40 p-5">
        <div class="text-sm font-bold tracking-wide text-argon-700 uppercase">End of B+5</div>
        <div class="mt-2 text-lg font-bold text-slate-800">Settle</div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          All bids submitted in B settle together, including fixed bids and
          bids whose maxima were never disclosed. The protocol selects winners
          and collects their winning prices.
        </p>
      </li>
    </ol>

    <p>
      A successful submission confirms that a bid was queued. The
      <code>SlotBidderAdded</code> event confirms its acceptance into the winning
      list after settlement.
    </p>

    <h3>How Bids Compete</h3>
    <p>
      While seats remain available, a public bid can be zero. Once the winning
      list is full, a new public bid must have a starting price that exceeds the
      lowest funded maximum among current winners. Exceeding an existing bid's lowest
      price without exceeding the existing bid's maximum is insufficient and will
      result in a discarded bid.
    </p>
    <p>
      This entry requirement is checked at submission and again at settlement.
      All bids submitted in the same block face the same settlement cutoff.
      Earlier submission blocks settle first and can raise the cutoff for later
      batches, so a queued bid can become ineligible before it settles.
    </p>
    <p>
      Among eligible bids, the highest funded maxima take the available seats.
      At equal maxima, fixed bids take priority over automatic bids; remaining
      ties follow original submission order. The order in which maxima are
      disclosed does not change that priority.
    </p>

    <h3>What an Automatic Bid Pays</h3>
    <p>
      When eligible bids outnumber seats, an automatic winner pays one increment
      above the highest losing funded maximum, capped at its own maximum and
      never below its public bid or previously accepted price. If all eligible
      bids fit, it pays its public bid or previously accepted price, whichever
      is higher. Fixed winners pay their stated bids.
    </p>
    <p>
      An accepted automatic bid stays in competition as later batches settle.
      Its price can rise without another transaction from the operator, provided
      the funding account still covers the increase. Accepted prices cannot
      decrease. Raising an existing offer requires a maximum above its previous
      maximum.
    </p>

    <section class="my-8 overflow-hidden rounded-lg border border-argon-200 bg-argon-50/40">
      <div class="px-5 pt-5">
        <div class="text-lg font-bold text-argon-700">Example: Winning Below the Maximum</div>
        <p class="mt-2 text-sm text-slate-600">
          A cohort has 10 available seats. In one block, nine miners submit fixed
          bids of 2,000 ARGN, and two more submit the automatic bids below. All
          bids remain funded and both maxima are disclosed on time.
        </p>
      </div>
      <div class="overflow-x-auto px-5">
        <table class="w-full text-left text-sm">
          <caption class="pb-2 text-left text-slate-600">Bid amounts and winning prices in ARGN</caption>
          <thead>
            <tr>
              <th scope="col">Miner</th>
              <th scope="col">Public bid</th>
              <th scope="col">Maximum</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="border-y border-slate-300">A</th>
              <td>1,000</td>
              <td>1,500</td>
              <td>Wins at 1,400.01</td>
            </tr>
            <tr>
              <th scope="row" class="border-y border-slate-300">B</th>
              <td>1,000</td>
              <td>1,400</td>
              <td>No seat; no bid payment</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="m-0! px-5 pb-5 text-sm text-slate-600">
        The nine fixed bidders take nine seats at 2,000 ARGN each. Miner A takes
        the tenth by paying 0.01 ARGN above Miner B's maximum. Its remaining
        99.99 ARGN of bidding capacity stays in the funding account and can
        support later price increases during this auction.
      </p>
    </section>

    <h3>Closing the Auction</h3>
    <p>
      New submissions close randomly during the protocol-defined
      closing window. They also close early enough to allow pending batches to
      settle before cohort activation. Bids already queued retain their full
      five-block disclosure window even after submissions close.
    </p>
    <p>
      The cohort activates only after pending batches have settled and the
      protocol's settlement buffer has elapsed. The remaining winners then
      begin their ten-frame mining term at the frame boundary.
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
          Paid when accepted
        </div>
        <p class="mt-2 mb-0 text-sm text-slate-600">
          The accepted winning price is transferred to the mining-bid pool at
          settlement. Later price increases collect the difference. If the bid
          is displaced, the amount paid is returned to its funding account.
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
          <DocLink to="/docs/assets-and-entities/argonot-tokens"
            >ARGNOT</DocLink
          >
          is held by the protocol. It remains the funding account's property and
          becomes spendable again when it no longer supports a bid or seat.
        </p>
      </div>
    </section>

    <h3>Keeping the Maximum Funded</h3>
    <p>
      The funding account must cover the public bid at submission and the full
      maximum when disclosing it. Funding is checked again at settlement, and
      an existing paid bid counts toward the funds needed to replace it.
    </p>
    <p>
      The full ARGN maximum is not placed on hold. Only the accepted price is
      collected, so the operator must keep enough spendable ARGN available for
      automatic increases. Spending that balance reduces an accepted bid's
      ability to compete up to its stated maximum. Several miners funded by the
      same account share its available balance.
    </p>
    <p>
      A missing, invalid, late, or unfunded maximum does not automatically cancel
      the public bid. It still competes at its public amount if funded and
      eligible. A losing submission releases any extra ARGNOT held for that
      submission; collateral still supporting an active seat or accepted bid
      remains held.
    </p>

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
      because the ARGN value of ARGNOT also changes.
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
      <DocLink to="/docs/system-design/argon-tokenomics"
        >Argon Tokenomics</DocLink
      >
      and
      <DocLink to="/docs/system-design/argonot-tokenomics"
        >Argonot Tokenomics</DocLink
      >
      for those rules.
    </p>
    <p>
      Winning bids flow into the mining-bid pool rather than directly to block
      producers. The protocol distributes that revenue among
      <DocLink to="/docs/assets-and-entities/argonot-stakes"
        >Argonot Stakes</DocLink
      >,
      <DocLink to="/docs/assets-and-entities/certification-rewards">Certification Rewards</DocLink>,
      and stabilization capital supplied through vaults and
      <DocLink to="/docs/assets-and-entities/argon-bonds"
        >Argon Bonds</DocLink
      >.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
