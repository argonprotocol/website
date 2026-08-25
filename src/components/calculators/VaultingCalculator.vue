<template>
  <div v-if="!isLoaded">
    Loading...
  </div>
  <div v-else>
    <h2 class="border-b border-gray-500/50 text-white! pb-4 px-5">Vaulting Calculator</h2>
    <section>
      <header class="flex flex-col">
        <span>Starting</span>
        <span>Configuration</span>
      </header>
      <div Output class="col-span-2 text-right">
        <div>
          Current Bitcoin In Network =
          {{ numeral(data.vaulting.bitcoinLocked).format('0,0.00') }} BTC (${{ numeral(data.vaulting.bitcoinLocked * data.usdForBtc).format('0,0') }})
        </div>
        <div>
          Current Auction Revenue Every Ten Days =
          ₳{{ numeral(startingAuctionRevenue).format('0,0') }}
        </div>
        <div>
          Maximum Mining Return Over Ten Days =
          {{ data.miningTDR }}%
        </div>
      </div>
    </section>

    <section>
      <header class="flex flex-col">
        <div Number><span class="relative -top-px -left-px">1</span></div>
        <span>Starting Bitcoin</span>
        <span>Space In Vault</span>
      </header>
      <div>
        <p>
          This is the amount of Argons you're putting into your vault's securitization at the start. The more you put in, the more
          BTC others are able to lock into your vault.
        </p>
        <SliderRoot
            v-model="startingBtcSpace"
            class="relative flex items-center select-none touch-none w-full h-5"
            :min="0.1"
            :max="10"
            :step="0.1"
        >
          <SliderTrack class="bg-argon-200/70 relative grow rounded-full h-2 shadow-inner" />
          <SliderThumb
              class="relative block w-6 h-6 bg-white rounded-full hover:bg-stone-50 shadow-sm focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
              aria-label="Volume"
          >
            <span class="slider-value-indicator">{{ startingBtcSpace[0] }} BTC</span>
          </SliderThumb>
        </SliderRoot>
        <div class="slider-endpoints">
          <span>${{ numeral(0.1 * data.usdForBtc).format('0,0') }}</span>
          <span>${{ numeral(10 * data.usdForBtc).format('0,0') }}</span>
        </div>
      </div>
      <div Output>
        <div class="text-3xl font-bold">${{ numeral(startingBtcSpaceInUsd).format('0,0') }}</div>
        <div>BTC Securitization</div>
      </div>
    </section>

    <section>
      <header class="flex flex-col">
        <div Number><span class="relative -top-px -left-px">2</span></div>
        <span>Pct of Allowed</span>
        <span>Bitcoin Locked</span>
      </header>
      <div>
        <p>
          The Bitcoin space in your vault (see previous section) must now be filled by those who have Bitcoins.
          The more it's filled, the more you maximize your returns.
        </p>
        <SliderRoot
            v-model="allowedBitcoinLocked"
            class="relative flex items-center select-none touch-none w-full h-5"
            :min="0"
            :max="100"
            :step="0.1"
        >
          <SliderTrack class="bg-argon-200/70 relative grow rounded-full h-2 shadow-inner" />
          <SliderThumb
              class="relative block w-6 h-6 bg-white rounded-full hover:bg-stone-50 shadow-sm focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
              aria-label="Volume"
          >
            <span class="slider-value-indicator">{{ allowedBitcoinLocked[0] }}%</span>
          </SliderThumb>
        </SliderRoot>
        <div class="slider-endpoints">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
      <div Output>
        <div class="text-3xl font-bold">{{ numeral(allowedBitcoinLocked[0]).format('0,0.[0]') }}%</div>
        <div>Of Allowed</div>
      </div>
    </section>

    <section>
      <header class="flex flex-col">
        <div Number><span class="relative -top-px -left-0">3</span></div>
        <span>Profit Share</span>
        <span>Retained by Vault</span>
      </header>
      <div>
        <p>
          You need to entice capital to invest in your vault's Argon Bonds. The more profit percentage you share, the
          more enticing it becomes for capital to move in.
        </p>
        <SliderRoot
            v-model="profitShare"
            class="relative flex items-center select-none touch-none w-full h-5"
            :min="0"
            :max="100"
            :step="1"
        >
          <SliderTrack class="bg-argon-200/70 relative grow rounded-full h-2 shadow-inner" />
          <SliderThumb
              class="relative block w-6 h-6 bg-white rounded-full hover:bg-stone-50 shadow-sm focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
              aria-label="Volume"
          >
            <span class="slider-value-indicator">{{ profitShare[0] }}/{{ 100 - profitShare[0] }}</span>
          </SliderThumb>
        </SliderRoot>
        <div class="slider-endpoints">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
      <div Output>
        <div class="text-3xl font-bold">{{ profitShare[0] }}/{{ 100 - profitShare[0] }}</div>
        <div>You vs Bonds</div>
      </div>
    </section>

    <section>
      <header class="flex flex-col">
        <div Number><span class="relative -top-px -left-0">4</span></div>
        <span>Pct of Allowed</span>
        <span>Bonds Bought</span>
      </header>
      <div>
        <p class="pb-3">
          Choose how many of your vault's Argon Bonds are actually held by the network. The higher the percentage, the
          higher your vault's returns.
        </p>
        <SliderRoot
            v-model="allowedBondsBought"
            class="relative flex items-center select-none touch-none w-full h-5"
            :min="0"
            :max="100"
            :step="0.1"
        >
          <SliderTrack class="bg-argon-200/70 relative grow rounded-full h-2 shadow-inner" />
          <SliderThumb
              class="relative block w-6 h-6 bg-white rounded-full hover:bg-stone-50 shadow-sm focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
              aria-label="Volume"
          >
            <span class="slider-value-indicator">{{ numeral(allowedBondsBought[0]).format('0.[0]') }}%</span>
          </SliderThumb>
        </SliderRoot>
        <div class="slider-endpoints">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
      <div Output>
        <div class="text-3xl font-bold">{{ allowedBondsBought[0] }}%</div>
        <div>Of Allowed</div>
      </div>
    </section>

    <section>
      <header class="flex flex-col">
        <span>Ending</span>
        <span>Configuration</span>
      </header>
      <div Output class="col-span-2 text-right">
        <div>
          Value of Vault at Start ≈
          ₳{{ numeral(startingBtcSpaceInUsd / data.usdForArgon).formatIfElse('< 1000', '0,0.[00]', '0,0') }}
        </div>
        <div>
          Value of Vault After One Year ≈
          ₳{{ numeral(endingBtcSpaceInUsd / data.usdForArgon).formatIfElse('< 1000', '0,0.[00]', '0,0') }}
        </div>
        <div>
          Bitcoin In Vault After One Year ≈
          {{ numeral(endingBtc).formatIfElse('< 1', '0,0.[000000]', '0,0') }} BTC (${{ numeral(endingBtcInUsd).format('0,0') }})
        </div>
        <div>
          Bitcoin In Network After One Year ≈
          {{ numeral(totalNetworkBtc).formatIfElse('< 1', '0,0.[000000]', '0,0') }} BTC (${{ numeral(totalNetworkBtc * data.usdForBtc).format('0,0') }})
        </div>
      </div>
    </section>

    <section>
      <header class="flex flex-col">
        <span>Bonds' Take</span>
        <span>Home Returns</span>
      </header>
      <p>
        This is the annual returns each of your vault's Argon Bond holders are expected to earn.
      </p>
      <div Output>
        <div class="text-3xl font-bold">{{ numeral(bondsAPY).format('0,0') }}%</div>
        <div>APY</div>
      </div>
    </section>

    <section>
      <header class="flex flex-col">
        <span>Vault's Take</span>
        <span>Home Returns</span>
      </header>
      <p>
        This is your vault's expected annual return after sharing its profits with the Argon Bond holders.
      </p>
      <div Output>
        <div class="text-3xl font-bold">{{ numeral(vaultAPY).format('0,0') }}%</div>
        <div>APY</div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import * as Vue from 'vue';
import BigNumber from 'bignumber.js';
import numeral from '@/lib/numeral';
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { defaultBasicsRecord, type IBasicsRecord } from "@/interfaces/IBasicsRecord";
import Data, {NetworkName} from "@/lib/Data";
import {microgonToArgon, micronotToArgonot} from "@/lib/currencyUtils";

const props = defineProps<{
  argonsBid: number;
  seatCount: number;
}>();

const emit = defineEmits<{
  (e: 'updated', results: { expectedMiningTDR: number; actualMiningTDR: number, argonsBid: number, seatCount: number }): void;
}>();

const chainName = Vue.ref<NetworkName>(NetworkName.mainnet);
const data = Vue.ref<IBasicsRecord>(defaultBasicsRecord);
const isLoaded = Vue.ref(false);

const startingAuctionRevenue = Vue.ref(0);
const currentAuctionRevenue = Vue.ref(0);
const totalNetworkBtc = Vue.ref(0);

const startingBtcSpace = Vue.ref([1]);
const startingBtcSpaceInUsd = Vue.ref(0);
const endingBtcSpaceInUsd = Vue.ref(0);

const profitShare = Vue.ref([90]);

const allowedBitcoinLocked = Vue.ref([80]);
const allowedBondsBought = Vue.ref([80]);

const endingBtc = Vue.ref(startingBtcSpace.value[0]);
const endingBtcInUsd = Vue.ref(0);

const bondsAPY = Vue.ref(0);
const vaultAPY = Vue.ref(0);

async function loadData() {
  data.value = await Data.fetchBasics(chainName.value);
  totalNetworkBtc.value = data.value.vaulting.bitcoinLocked;
  startingBtcSpaceInUsd.value = startingBtcSpace.value[0] * data.value.usdForBtc;

  endingBtc.value = startingBtcSpace.value[0] * (allowedBitcoinLocked.value[0] / 100);
  endingBtcInUsd.value = endingBtc.value * data.value.usdForBtc;
  startingAuctionRevenue.value = calculateAuctionRevenue(0);
}

function calculateAuctionRevenue(extraArgonsToMint: number): number {
  const seatCount = data.value.mining.nextEpochSeatCount;
  const currentArgonotPrice = data.value.usdForArgonot / data.value.usdForArgon;
  const argonotsNeededForBid = micronotToArgonot(data.value.mining.currentMicronotsForBid);
  const argonotsNeededForBidValue = argonotsNeededForBid * currentArgonotPrice;
  const extraArgonsPerSeat = extraArgonsToMint / seatCount;

  const baseArgonRewards = calculateBaseArgonRewards() / seatCount;

  const baseArgonotRewards = BigNumber(data.value.mining.baseMicronotRewardsPerBlock)
    .dividedBy(1_000_000)
    .multipliedBy(14_400)
    .dividedBy(seatCount)
    .toNumber();

  const baseRewardsValue = baseArgonRewards + (baseArgonotRewards * currentArgonotPrice);
  const totalRewardsValue = baseRewardsValue + extraArgonsPerSeat;
  const endingValue = totalRewardsValue + argonotsNeededForBidValue;

  const targetBidValue = endingValue / (1 + data.value.miningTDR / 100);
  const argonsPerBid = Math.max(0, (targetBidValue - argonotsNeededForBidValue));

  return argonsPerBid * props.seatCount;
}

function calculateBaseArgonRewards(): number {
  return BigNumber(data.value.mining.baseMicrogonRewardsPerBlock)
    .dividedBy(1_000_000)
    .multipliedBy(14_400)
    .toNumber();
}

function convertArgonToBtc(value: number) {
  return (value * data.value.usdForArgon) / data.value.usdForBtc;
}

function convertBtcToArgon(value: number) {
  return (value * data.value.usdForBtc) / data.value.usdForArgon;
}

function calculateExtraArgonsToMint(networkGrowthInArgons: number, argonsInCirculation: number) {
  if (networkGrowthInArgons <= 0 || argonsInCirculation <= 0) {
    console.log('RETURNING EARLY: ', {
      networkGrowthInArgons,
      argonsInCirculation
    })
    return 0;
  }

  const networkGrowthPct = networkGrowthInArgons / argonsInCirculation;
  const extraMintPct = Math.max(0, Math.min(1, (networkGrowthPct - 0.2) / (0.5 - 0.2)));
  console.log({
    networkGrowthInArgons,
    argonsInCirculation,
    networkGrowthPct,
    extraMintPct,
    extraArgonsToMint: networkGrowthInArgons * extraMintPct,
  })
  return networkGrowthInArgons * extraMintPct;
}

function updateReturns(forceRun = false) {
  if (!isLoaded.value && !forceRun) return;

  let currentVaultBtcSpace = startingBtcSpace.value[0];
  const pctOfAllowedBitcoinLocked = allowedBitcoinLocked.value[0] / 100;
  let currentVaultBtc = currentVaultBtcSpace * pctOfAllowedBitcoinLocked;
  let currentNetworkBtc = data.value.vaulting.bitcoinLocked + currentVaultBtc;
  const startingNetworkBtc = currentNetworkBtc;
  let argonsInCirculation = microgonToArgon(data.value.microgonsInCirculation);
  let extraArgonsToMint = 0;

  const vaultInvestment = (currentVaultBtcSpace * data.value.usdForBtc) / data.value.usdForArgon;
  const baseArgonRewards = calculateBaseArgonRewards();
  const tenDayPeriodsPerYear = 365 / 10;

  for (let i = 0; i < Math.ceil(tenDayPeriodsPerYear); i++) {
    const periodFraction = Math.min(1, tenDayPeriodsPerYear - i);
    currentAuctionRevenue.value = calculateAuctionRevenue(extraArgonsToMint) * 0.7;
    console.log('TOTAL AUCTION REVENUE: ', {
      i,
      argonsInCirculation,
      currentAuctionRevenue,
      extraArgonsToMint,
    })

    const vaultPctOfNetwork = currentVaultBtc / currentNetworkBtc;
    const pctOfVaultRevenueRetained = profitShare.value[0] / 100;
    const pctOfBondPower = allowedBondsBought.value[0] / 100;
    const vaultRevenue = (currentAuctionRevenue.value * periodFraction * vaultPctOfNetwork)
      * pctOfVaultRevenueRetained
      * pctOfBondPower;

    const previousVaultBtcSpace = currentVaultBtcSpace;
    currentVaultBtcSpace += convertArgonToBtc(vaultRevenue);

    const vaultBtcSpaceGrowth = previousVaultBtcSpace > 0
      ? currentVaultBtcSpace / previousVaultBtcSpace
      : 1;
    const vaultBtcGrowth = 1 + ((vaultBtcSpaceGrowth - 1) * pctOfAllowedBitcoinLocked);
    currentVaultBtc *= vaultBtcGrowth;
    currentNetworkBtc *= vaultBtcSpaceGrowth;

    argonsInCirculation += (baseArgonRewards + extraArgonsToMint) * periodFraction;
    const networkGrowthInArgons = convertBtcToArgon(currentNetworkBtc - startingNetworkBtc);
    extraArgonsToMint = calculateExtraArgonsToMint(networkGrowthInArgons, argonsInCirculation);
  }

  totalNetworkBtc.value = currentNetworkBtc;
  endingBtc.value = currentVaultBtc;
  endingBtcInUsd.value = endingBtc.value * data.value.usdForBtc;
  endingBtcSpaceInUsd.value = currentVaultBtcSpace * data.value.usdForBtc;

  const endingVaultValue = (currentVaultBtcSpace * data.value.usdForBtc) / data.value.usdForArgon;
  vaultAPY.value = ((endingVaultValue - vaultInvestment) / vaultInvestment) * 100;

  // const bondInvestment = 0;
  // const bondRevenue = (totalAuctionRevenue.value * vaultPctOfNetwork) * (1 - pctOfRevenueKept);
  // bondsAPY.value = (bondRevenue / bondInvestment) * 100;
}

Vue.watch([() => startingBtcSpace.value[0], () => data.value.usdForBtc], () => {
  if (!isLoaded.value) return;
  startingBtcSpaceInUsd.value = startingBtcSpace.value[0] * data.value.usdForBtc;
  updateReturns();
});

Vue.watch([
  () => profitShare.value[0],
  () => allowedBondsBought.value[0],
  () => allowedBitcoinLocked.value[0],
], () => {
  updateReturns();
});

Vue.onMounted(async () => {
  await loadData();
  updateReturns(true);
  isLoaded.value = true;
});
</script>

<style scoped>
@import "../../main.css";

section {
  @apply grid grid-cols-[160px_minmax(0,1fr)_160px] border-b border-gray-500/50 py-4 px-5 items-center;
}
p {
  @apply opacity-60 mb-0;
}
header {
  @apply relative font-bold;
  div[Number] {
    @apply absolute top-1/2 -translate-y-1/2 -translate-[150%] text-xl bg-argon-500 border border-argon-900 shadow-xl text-white rounded-full w-7 h-7 flex items-center justify-center;
  }
}
div[Output] {
  @apply flex flex-col justify-end text-right pl-7;
}

.slider-value-indicator {
  @apply pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-stone-100! px-2 py-1 text-xs font-bold text-slate-800 shadow-sm;
}
.slider-value-indicator::after {
  content: '';
  @apply absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-stone-100;
}
.slider-endpoints {
  @apply mt-0 flex justify-between text-xs text-stone-400;
}
.slider-endpoints span {
  @apply relative pt-1;
}
.slider-endpoints span::before {
  content: '';
  @apply absolute top-0 h-1.5 w-px bg-stone-400;
}
.slider-endpoints span:first-child::before {
  @apply left-0;
}
.slider-endpoints span:last-child::before {
  @apply right-0;
}
</style>
