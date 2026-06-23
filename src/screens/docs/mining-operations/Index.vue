<template>
  <DocHeader>
    Overview of Mining Operations
  </DocHeader>
  <DocContent>
    <div v-if="isLoaded" ref="dialogPanelContent" class="flex flex-col grow relative w-full overflow-y-auto py-5">
      <p>
        The most basic thing to understand is that there is no third-party company, authority, or server helping to run
        this app. It simply exists as code on your computer. In fact, the entire Argon blockchain is fully
        decentralized and anonymous. It's operated by the community, by people like yourself. That's why this app has no
        signup screen or login screen -- you simply use it. Instead, a special auction bid system is used to
        create a rotating governance structure that is shared by everyone and open to all.
      </p>

      <p>Below is a brief overview of how it all works.</p>

      <ul>
        <li>
          <header>Mining Seats</header>
          New blocks are constantly being added to the Argon blockchain at a rate of one per minute. Whoever is lucky enough to mine the block gets to collect the
          block rewards (which can be quite substantial). However, unlike some proof-of-work (POW) blockchains, Argon does not allow just anyone to mine. Only
          those who can show proof of owning a "mining seat" are given this right.
        </li>
        <li>
          <header>Winning a Seat</header>
          The Argon network originally began with 100 mining seats. These seats were distributed at auction over a ten-day cycle (i.e., 10 seats per day).
          Each seat was given a term limit of ten days, after which they were released back into auction.
          As the network grows, the number of seats will slowly increase to a maximum of 10,000 seats, but the basic process will
          remain the same: they will be auctioned to the highest bidder, used for ten days, then released back into auctioned. Rinse and repeat. If you want to become a miner you must
          win a seat.

          <table class="text-slate-800/50">
            <thead>
            <tr>
              <th>Day</th>
              <th>Frame #</th>
              <th>Total Mining Seats</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="isLoaded">
              <td>Today</td>
              <td>{{ currentFrameId }}</td>
              <td>{{ miningSeats }}</td>
            </tr>
            <tr v-else>
              <td colspan="3">Loading...</td>
            </tr>
            </tbody>
          </table>
        </li>
        <li>
          <header>Bidding at Auction</header>
          Winning a mining seat require you to create a bid that contains two tokens:
          <ol>
            <li>
              <strong>Argonots</strong>. Argonots are a special governance token of the Argon network. They have several unique properties,
              but for the sake of this description, they show proof of ownership. Every bid must contain a preset quantity of Argonots in order to be valid.
              This amount required changes over time based on the network's demand for mining seats. The following table shows the
              current quantity of Argonots required per bid:
              <table class="text-slate-800/50">
                <thead>
                <tr>
                  <th class="w-1/5">Day</th>
                  <th class="w-1/5">Frame #</th>
                  <th class="w-3/5">Argonots Required</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="isLoaded">
                  <td>Today</td>
                  <td>{{ currentFrameId}}</td>
                  <td>{{ micronotToArgonotNm(micronotsForBid).format('0,0.[00000000]') }}</td>
                </tr>
                <tr v-else>
                  <td colspan="3">Loading...</td>
                </tr>
                </tbody>
              </table>
            </li>
            <li><strong>
              Argons</strong>: Each participant decides how many argons they want to include in their bid. Zero is a perfectly valid number. However, since
              winners are selected based on highest bids, you don't want to go too low. Winning amounts for the last ten days are as follows:
              <table class="text-slate-800/50">
                <thead>
                <tr>
                  <th class="w-1/5">Day</th>
                  <th class="w-1/5">Frame #</th>
                  <th class="w-1/5"># Seats</th>
                  <th class="w-1/5">Lowest Winning Bid</th>
                  <th class="w-1/5">Highest Winning Bid</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="isLoaded" v-for="bidSummary in seatSummaries">
                  <td>
                    <template v-if="bidSummary.biddingFrameId === currentFrameId - 1">
                      Yesterday
                    </template>
                    <template v-else>
                      {{ convertNumberToWord(currentFrameId - bidSummary.biddingFrameId) }} Days Ago
                    </template>
                  </td>
                  <td>{{ bidSummary.biddingFrameId }}</td>
                  <td>{{ bidSummary.seats }}</td>
                  <td>${{ microgonToArgonNm(bidSummary.lowestWinningBid).format('0,0.00') }}</td>
                  <td>${{ microgonToArgonNm(bidSummary.highestWinningBid).format('0,0.00') }}</td>
                </tr>
                </tbody>
              </table>
            </li>
          </ol>
        </li>
        <li>
          <header>Selection Process</header>
          Winners are selected solely based on their bid position at the close of the auction. The auction closes at a random
          unannounced time within the final thirty-minutes of the frame/day. This random closing time ensures no one can
          manipulate the results through auction-sniping. The following table shows today's active auction leaders:
          <table class="text-slate-800/50">
            <thead>
            <tr>
              <th>Day</th>
              <th>Seat Position</th>
              <th>Argonots Staked</th>
              <th>Argons Bid</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="isLoaded" v-for="winningBid in winningBids">
              <td>Today</td>
              <td>{{ winningBid.bidPosition === undefined ? 'N/A' : winningBid.bidPosition + 1 }}</td>
              <td>{{ micronotToArgonotNm(winningBid.micronotsStakedPerSeat || 0n).format('0,0.[00000000]') }}</td>
              <td>${{ microgonToArgonNm(winningBid.microgonsPerSeat || 0n).format('0,0.00') }}</td>
              <td>Won</td>
            </tr>
            <tr v-else>
              <td colspan="5">Loading...</td>
            </tr>
            </tbody>
          </table>
        </li>
        <li>
          <header>Acquiring Tokens</header>
          This app provides no ability to purchase argons or argonots. Instead, you must
          acquire tokens on your own, either by mining new blocks, negotiating a private transaction, and/or buying through decentralized
          exchanges such as Uniswap. Below are some links to the Uniswap markets for argons and argonots:

          <table>
            <tbody>
            <tr>
              <td class="hover:text-argon-600 cursor-pointer flex flex-row items-center justify-start space-x-2" @click="openUniswapMarket('https://app.uniswap.org/explore/tokens/ethereum/0x6b93a120829558c18f8cd54a96e8024ef973ce52')">
                <span>Uniswap Market for Argonots</span>
                <ArrowRightCircleIcon class="w-4 h-4" />
              </td>
            </tr>
            <tr>
              <td class="hover:text-argon-600 cursor-pointer flex flex-row items-center justify-start space-x-2" @click="openUniswapMarket('https://app.uniswap.org/explore/tokens/ethereum/0xf3d6b714dc93bc6c44bc766cc92f4a0d99344932')">
                <span>Uniswap Market for Argons</span>
                <ArrowRightCircleIcon class="w-4 h-4" />
              </td>
            </tr>
            </tbody>
          </table>

        </li>
        <li>
          <header>Block Rewards</header>
          New blocks deliver four types of rewards:
          <ol>
            <li><strong>Base Argons</strong>. The amount of base argons to be awarded per block is guaranteed at the start of each auction. It is written into the immutable blockchain and is unaffected by market demand. Regardless of what happens tomorrow, seats that win today's auction will receive this payout.</li>
            <li><strong>Base Argonots</strong>. This started at 0.5 argonots per block and continues to increase every 118 blocks until the 365th frame (on or around January 15th, 2026). On the 365th frame, argonot payout will hit a high of 5 argonots per block. It will then follow Bitcoin's halving formula.</li>
            <li><strong>Transaction Fees</strong>. All transaction fees in the block are rewarded to ther miner who closes the block.</li>
            <li><strong>Minted Argons</strong>. This is the big unknown variable. Whenever market demand for the Argon stablecoin increases beyond the current market supply, Argon's stabilization algorithm automatically mints more currency and awards them to the active miners.</li>
          </ol>
        </li>
        <li>
          <header>Block Distribution</header>
          Without getting into complicated mathematical algorithms, the right to mine new blocks is basically
          round-robined between all active mining seats. This means if the network has 100 active seats then each seat will mine an average of
          14.4 blocks per day (i.e, 1,440 blocks per day / 100 seats = 14.4 blocks per seat per day). Specialized ASIC mining hardware cannot affect this distribution.
        </li>
        <li>
          <header>Seat Continuation</header>
          As mentioned above, every seat has a ten day term limit. Once a seat's ten day mining period expires, it reverts back to the network
          where it is placed back into the auction pool. If you wish to continue mining, you must re-bid for a seat. This ensures an open and fair
          market for all participants.
        </li>
        <li>
          <strong>Automated Mining Bots</strong>. This app was built to serve as an automated mining bot to help handle the bidding processs,
          manage mining operations, and continually renew your seats every ten days. However, it doesn't dictate your strategy. It is up to you
          to decide the rules, such as starting bid, maximum bid, rebidding strategy, etc.
        </li>
      </ul>

      <div class="mt-4 pt-5 border-t border-slate-300 text-slate-800/50 space-y-2">
        <header class="text-lg">Basic Terminology</header>
        <div><strong>Frame</strong>: A 24 hour period. </div>
        <div><strong>Mining Seat</strong>: The right to participate in block mining for ten days. </div>
        <div><strong>Auction</strong>: An open bidding process to win mining seats.</div>
        <div><strong>Block</strong>: A unit of work completed by a miner and rewarded with argons and argonots. </div>
        <div><strong>Bid</strong>: A proposed amount of argons and argonots to stake for a mining seat. </div>
        <div><strong>Winning Bid</strong>: The bid that was accepted to become a miner. </div>
        <div><strong>Bid Position</strong>: The position in the auction that your bid was accepted at. </div>
        <div><strong>Argon</strong>: This can refer to the network or the native currency of the network. </div>
        <div><strong>Argonot</strong>: The governance token of the Argon network. </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </DocContent>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import numeral, { microgonToArgonNm, micronotToArgonotNm } from '@/lib/numeral';
import {type IWinningBid, Mining} from "../../../../../apps/core";
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";

const isLoaded = Vue.ref(false);

const miningSeats = Vue.ref(0);
const micronotsForBid = Vue.ref(0n);
const currentFrameId = Vue.ref(0);
const seatSummaries = Vue.ref<
    { biddingFrameId: number; seats: number; lowestWinningBid: bigint; highestWinningBid: bigint }[]
>([]);
const winningBids = Vue.ref<(IWinningBid & { micronotsStakedPerSeat: bigint })[]>([]);

// async function load() {
//   mining.fetchActiveMinersCount().then(x => (miningSeats.value = x));
//   mining.fetchCurrentMicronotsForBid().then(x => (micronotsForBid.value = x));
//   mining.fetchNextFrameId().then(x => (currentFrameId.value = x - 1));
//   mining.getRecentSeatSummaries().then(x => (seatSummaries.value = x));
//
//   getMainchainClient(false)
//       .then(client => Mining.fetchWinningBids(client))
//       .then(x => (winningBids.value = x));
// }

function convertNumberToWord(number: number) {
  if (number === 1) return 'One';
  if (number === 2) return 'Two';
  if (number === 3) return 'Three';
  if (number === 4) return 'Four';
  if (number === 5) return 'Five';
  if (number === 6) return 'Six';
  if (number === 7) return 'Seven';
  if (number === 8) return 'Eight';
  if (number === 9) return 'Nine';
  if (number === 10) return 'Ten';
  return `Unknown`;
}

Vue.onMounted(async () => {
  isLoaded.value = true;
});
</script>