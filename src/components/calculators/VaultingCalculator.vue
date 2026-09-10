<template>
  <div v-if="!isLoaded">
    Loading...
  </div>
  <div v-else ref="runwayRef" class="calculator-runway text-white! mt-5 mb-10">
    <div
      class="calculator-shell bg-[color-mix(in_oklab,var(--color-gray-700)_35%,var(--color-gray-800))]"
      :style="{ paddingBottom: `${footerHeight}px`, '--calculator-header-height': `${headerHeight}px` }"
    >
      <header ref="headerRef" class="calculator-header relative z-20 mt-0">
        <div class="pointer-events-none absolute z-0 -top-5 left-0 bottom-1 w-full bg-[var(--bg-color)]"/>
        <div class="pointer-events-none absolute z-0 -top-5 -left-10 -bottom-5 w-10 bg-linear-to-t from-transparent to-[20px] to-[var(--bg-color)]"/>
        <div class="pointer-events-none absolute z-20 top-[calc(100%-4px)] left-0 h-4 w-full bg-linear-to-b from-gray-800 to-transparent"/>
        <div class="relative z-10 overflow-hidden pb-1">
          <h3 class="mt-0! mb-0! border-b border-gray-500/50 px-5 py-4 text-white! rounded-t-lg bg-gray-800" style="box-shadow: 0 1px 2px rgba(0,0,0,0.5)">
            Vaulting Calculator
          </h3>
        </div>
      </header>

      <footer ref="footerRef" aria-label="Vaulting return summary" class="relative z-10 w-full">
        <div class="pointer-events-none absolute z-0 -bottom-5 left-0 top-1 w-full bg-[var(--bg-color)]"/>
        <div class="pointer-events-none absolute z-0 -bottom-5 -left-10 -top-5 w-10 bg-linear-to-b from-transparent to-[20px] to-[var(--bg-color)]"/>
        <div class="pointer-events-none absolute z-20 bottom-[calc(100%-4px)] left-0 h-4 w-full bg-linear-to-t from-gray-800 to-transparent"/>

        <div class="relative z-10 overflow-hidden pt-1 w-full">
          <div class="grid w-full grid-cols-3! items-stretch gap-2 rounded-b-lg border-t border-gray-600 bg-gray-800 p-2 sm:gap-3 sm:p-3" style="box-shadow: 0 -1px 2px rgba(0,0,0,1)">
            <div class="min-w-0 rounded-md bg-white/5 px-2 py-2 sm:px-4 sm:py-3">
              <div class="mt-1 whitespace-nowrap text-2xl font-bold sm:text-4xl">
                ₳{{ usdToArgonNm(capitalInvestedInUsd).format('0,0') }}
              </div>
              <div class="mt-1 text-[13px] leading-tight text-white/60 uppercase">
                Initial Vault Capital
              </div>
            </div>

            <div class="min-w-0 rounded-md bg-gradient-to-br from-argon-500/20 to-argon-500/40 px-2 py-2 text-center sm:px-4 sm:py-3">
              <div class="mt-1 whitespace-nowrap text-2xl font-bold sm:text-4xl">
                {{ numeral(tenDayReturn).format('0,0.[00]') }}%
              </div>
              <div class="mt-1 text-[13px] leading-tight text-white/60 uppercase">
                Modeled Ten Day Return
              </div>
            </div>

            <div class="min-w-0 rounded-md bg-white/5 px-2 py-2 text-right sm:px-4 sm:py-3">
              <div class="mt-1 whitespace-nowrap text-2xl font-bold sm:text-4xl">
                {{ numeral(vaultAPY).format('0,0.[00]') }}%
              </div>
              <div class="mt-1 text-[13px] leading-tight text-white/60 uppercase">
                Modeled APY Return
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div class="calculator-middle">
        <div ref="trackRef" class="calculator-track">
          <section class="calculator-network-stats grid-cols-[max-content_minmax(0,1fr)_max-content_minmax(0,1fr)]! gap-x-4 gap-y-2 text-white/60 @max-sm:grid-cols-[minmax(0,1fr)_auto]!">
            <header class="col-span-full">Current Stats From Mainnet</header>
            <div>Current ARGN Price</div>
            <div class="text-left font-bold">₳{{ usdToArgonNm(data.usdForArgon).format('0.00') }}</div>
            <div>Current ARGNOT Price</div>
            <div class="text-left font-bold">₳{{ usdToArgonNm(data.usdForArgonot).format('0,0.00') }}</div>
            <div>Current BTC Price</div>
            <div class="text-left font-bold">₳{{ usdToArgonNm(data.usdForBtc).format('0,0.00') }}</div>
            <div>Active Vaults</div>
            <div class="text-left font-bold">{{ numeral(data.vaulting.count).format('0,0') }}</div>
            <div>Locked Bitcoins</div>
            <div class="text-left font-bold">{{ numeral(data.vaulting.bitcoinLocked).format('0,0.[00000000]') }} BTC</div>
            <div>Total Bitcoin Space</div>
            <div class="text-left font-bold">₳{{ microgonToArgonNm(data.microgonsInCirculation.fromMining).format('0,0.00') }}</div>
            <div>Average Vault APR</div>
            <div class="text-left font-bold">{{ numeral(data.vaultingAPR).format('0,0.[00]') }}%</div>
          </section>

          <section>
            <div class="calculator-grid-row">
              <header class="flex flex-col">
                <div Number><span class="relative -top-px -left-px">1</span></div>
                <span>Argonot</span>
                <span>Market Price</span>
              </header>
              <div>
                <SliderRoot
                  v-model="customArgonotPrice"
                  class="relative flex h-5 w-full touch-none items-center select-none"
                  :min="0.01"
                  :max="1000"
                  :step="0.01"
                >
                  <SliderTrack class="relative h-2.5 grow overflow-hidden rounded-full border border-neutral-900 bg-neutral-200/40 shadow-inner">
                    <SliderRange class="absolute h-full rounded-full bg-argon-200" />
                  </SliderTrack>
                  <SliderThumb
                    class="relative block h-6 w-6 rounded-full bg-white shadow-sm hover:bg-stone-50 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
                    aria-label="Argonot market price"
                  >
                    <span class="slider-value-indicator">₳{{ numeral(customArgonotPrice[0]).format('0,0.00') }}</span>
                  </SliderThumb>
                </SliderRoot>
                <div class="slider-endpoints">
                  <span>₳0.01</span>
                  <span>₳1,000</span>
                </div>
              </div>
              <div Output>
                <div class="text-4xl font-bold">₳{{ numeral(customArgonotPrice[0]).formatIfElse('< 1000', '0.[00]', '0,0') }}</div>
                <div>Market Price</div>
              </div>
            </div>
            <div class="calculator-grid-row mt-5 items-start!">
              <header />
              <div>
                <p>
                  The market price of Argonots affect the cost of mining bids, which in turn affects the yield generated by Vaults.
                </p>
              </div>
              <div class="text-right font-light">
                <button
                  type="button"
                  class="text-argon-100"
                  :class="{
                    'opacity-30':
                      customArgonotPrice[0] ===
                      (data.usdForArgon > 0 ? data.usdForArgonot / data.usdForArgon : 0),
                    'cursor-pointer':
                      customArgonotPrice[0] !==
                      (data.usdForArgon > 0 ? data.usdForArgonot / data.usdForArgon : 0),
                  }"
                  @click="resetCustomArgonotPrice"
                >
                  Reset to Mainnet
                </button>
              </div>
            </div>
          </section>

          <section>
            <div class="calculator-grid-row">
              <header class="flex flex-col">
                <div Number><span class="relative -top-px -left-px">2</span></div>
                <span>Growth In Argon</span>
                <span>Circulation</span>
              </header>
              <div>
                <SliderRoot
                  v-model="argonCirculationChange"
                  class="relative flex h-5 w-full touch-none items-center select-none"
                  :min="-100"
                  :max="100"
                  :step="0.1"
                >
                  <SliderTrack class="relative h-2.5 grow overflow-hidden rounded-full border border-neutral-900 bg-neutral-200/40 shadow-inner">
                    <div
                      aria-hidden="true"
                      class="absolute h-full rounded-full bg-argon-200"
                      :style="{
                        left: `${Math.min(50, 50 + argonCirculationChange[0] / 2)}%`,
                        width: `${Math.abs(argonCirculationChange[0]) / 2}%`,
                      }"
                    />
                  </SliderTrack>
                  <SliderThumb
                    class="relative block h-6 w-6 rounded-full bg-white shadow-sm hover:bg-stone-50 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
                    aria-label="Growth in Argon circulation"
                  >
                    <span class="slider-value-indicator">{{ argonCirculationChange[0] }}%</span>
                  </SliderThumb>
                </SliderRoot>
                <div class="slider-endpoints">
                  <span>-100%</span>
                  <span>100%</span>
                </div>
              </div>
              <div Output>
                <div class="text-2xl font-bold">+{{ numeral(plusArgonMinted).formatIfElse('< 1000', '0.[00]', '0,0') }}</div>
                <div>ARGN Per Seat</div>
              </div>
            </div>
            <div class="calculator-grid-row mt-5 items-start!">
              <header />
              <div>
                <p>
                  Whenever the market demand for Argons increase, miners are given the exclusive right to mint these new tokens.
                </p>
              </div>
              <div class="text-right font-light">
                <button
                  type="button"
                  class="text-argon-100"
                  :class="argonCirculationChange[0] === 0 ? 'opacity-30' : 'cursor-pointer'"
                  @click="resetArgonCirculationChange"
                >
                  Reset to Zero
                </button>
              </div>
            </div>
          </section>

          <section>
            <div class="calculator-grid-row">
              <header class="flex flex-col">
                <div Number><span class="relative -top-px -left-px">3</span></div>
                <span>Expected Return</span>
                <span>Per Mining Seat</span>
              </header>
              <div>
                <SliderRoot
                  :model-value="expectedTDR"
                  @update:model-value="updateExpectedTDR"
                  class="relative mt-2 flex h-5 w-full touch-none items-center select-none"
                  :min="0"
                  :max="MAX_EXPECTED_RETURN"
                  :step="0.1"
                >
                  <SliderTrack class="relative h-2.5 grow overflow-hidden rounded-full border border-neutral-900 bg-neutral-200/40 shadow-inner">
                    <SliderRange class="absolute h-full rounded-full bg-argon-200" />
                  </SliderTrack>
                  <SliderThumb
                    class="relative block h-6 w-6 rounded-full bg-white shadow-sm hover:bg-stone-50 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
                    aria-label="Expected return per mining seat"
                  >
                    <span class="slider-value-indicator flex flex-col">
                      <span>{{ expectedTDR[0] }}% Over Ten Days</span>
                      <span>₳{{ usdToArgonNm(valueOfBid).format('0,0.00') }} Per Seat</span>
                    </span>
                  </SliderThumb>
                </SliderRoot>
                <div class="slider-endpoints">
                  <span>0%</span>
                  <span>{{ MAX_EXPECTED_RETURN }}%</span>
                </div>
              </div>
              <div Output>
                <div class="text-4xl font-bold">{{ numeral(expectedTDR[0]).formatIfElse('< 1_000', '0.[0]', '0,0') }}%</div>
                <div>Over Ten Days</div>
              </div>
            </div>
            <div class="calculator-grid-row mt-10 items-start!">
              <header />
              <div>
                <p>
                  Changing this slider changes your Submitted Bid. The lower your return, the higher your bid.
                  The minimum takeaway is set in the blockchain and guaranteed for each mining seat.
                </p>
                <div class="mt-4 flex w-full flex-row gap-x-5 opacity-60 font-mono">
                  <div class="w-1/2">
                    <div class="py-1 font-bold uppercase">Submitted Bid</div>
                    <div class="border-t border-gray-500 py-1">{{ numeral(argonsBid).format('0,0.00') }} ARGN</div>
                    <div class="border-t border-gray-500 py-1">{{ numeral(argonotsBid).format('0,0.00') }} ARGNOT</div>
                    <div class="border-t-2 border-gray-400 py-1 font-bold">₳{{ usdToArgonNm(valueOfBid).format('0,0.00') }} Bid Cost</div>
                  </div>
                  <div class="w-1/2">
                    <div class="py-1 font-bold uppercase">
                      {{ argonCirculationChange[0] > 0 ? 'Final Takeaway' : 'Minimum Takeaway' }}
                    </div>
                    <div class="border-t border-gray-500 py-1">{{ numeral(baseArgonRewards + plusArgonMinted).format('0.[00]') }} ARGN</div>
                    <div class="border-t border-gray-500 py-1">{{ numeral(argonotsTotal).format('0.[00]') }} ARGNOT</div>
                    <div class="border-t-2 border-gray-400 py-1 font-bold">₳{{ usdToArgonNm(expectedValueOfSeat).format('0,0.00') }} Return Value</div>
                  </div>
                </div>
              </div>
              <div class="text-right font-light">
                <button
                  type="button"
                  class="text-argon-100"
                  :class="expectedTDR[0] === Math.floor(data.miningTDR * 10) / 10 ? 'opacity-30' : 'cursor-pointer'"
                  @click="resetExpectedTDR"
                >
                  Reset to Mainnet
                </button>
              </div>
            </div>
          </section>

          <section>
            <div class="calculator-grid-row">
              <header class="flex flex-col">
                <div Number><span class="relative -top-px -left-px">4</span></div>
                <span>Initial Argon</span>
                <span>Securitization</span>
              </header>
              <div>
                <SliderRoot
                  v-model="startingBtcSpace"
                  class="relative flex h-5 w-full touch-none items-center select-none"
                  :min="0.01"
                  :max="10"
                  :step="0.01"
                >
                  <SliderTrack class="relative h-2.5 grow overflow-hidden rounded-full border border-neutral-900 bg-neutral-200/40 shadow-inner">
                    <SliderRange class="absolute h-full rounded-full bg-argon-200" />
                  </SliderTrack>
                  <SliderThumb
                    class="relative block h-6 w-6 rounded-full bg-white shadow-sm hover:bg-stone-50 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
                    aria-label="Starting Bitcoin space in vault"
                  >
                    <span class="slider-value-indicator">{{ numeral(startingBtcSpace[0]).format('0,0.[00]') }} BTC</span>
                  </SliderThumb>
                </SliderRoot>
                <div class="slider-endpoints">
                  <span>₳{{ usdToArgonNm(0.1 * data.usdForBtc).format('0,0') }}</span>
                  <span>₳{{ usdToArgonNm(10 * data.usdForBtc).format('0,0') }}</span>
                </div>
              </div>
              <div Output>
                <div class="text-3xl font-bold">₳{{ usdToArgonNm(startingBtcSpaceInUsd).format('0,0') }}</div>
                <div>In BTC Space</div>
              </div>
            </div>
            <div class="calculator-grid-row mt-5 items-start!">
              <header />
              <div>
                <p>
                  Argon securitization is what allows Bitcoin to be locked in your vault. The more
                  you have, the more Bitcoin that can lock and the higher your earning potential.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div class="calculator-grid-row">
              <header class="flex flex-col">
                <div Number><span class="relative -top-px -left-px">5</span></div>
                <span>Initial Argonot</span>
                <span>Securitization</span>
              </header>
              <div>
                <SliderRoot
                  v-model="allowedArgonotsSecuritized"
                  class="relative flex h-5 w-full touch-none items-center select-none"
                  :min="0"
                  :max="100"
                  :step="0.1"
                >
                  <SliderTrack class="relative h-2.5 grow overflow-hidden rounded-full border border-neutral-900 bg-neutral-200/40 shadow-inner">
                    <SliderRange class="absolute h-full rounded-full bg-argon-200" />
                  </SliderTrack>
                  <SliderThumb
                    class="relative block h-6 w-6 rounded-full bg-white shadow-sm hover:bg-stone-50 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
                    aria-label="Percent of Argonots securitized"
                  >
                    <span class="slider-value-indicator">{{ numeral(allowedArgonotsSecuritized[0]).format('0,0.[0]') }}%</span>
                  </SliderThumb>
                </SliderRoot>
                <div class="slider-endpoints">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
              <div Output>
                <div class="text-3xl font-bold">₳{{ usdToArgonNm(argonotsSecuritizedMarketValueUsd).format('0,0') }}</div>
                <div>In Extra Security</div>
              </div>
            </div>
            <div class="calculator-grid-row mt-5 items-start!">
              <header />
              <div>
                <p>
                  Argonots increase your vault's ability to earn revenue. The more
                  you add (up to 2x Argon securitization), the higher your potential.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div class="calculator-grid-row">
              <header class="flex flex-col">
                <div Number><span class="relative -top-px -left-px">6</span></div>
                <span>Pct Of Bitcoin</span>
                <span>Space Locked</span>
              </header>
              <div>
                <SliderRoot
                  v-model="allowedBitcoinLocked"
                  class="relative flex h-5 w-full touch-none items-center select-none"
                  :min="0"
                  :max="100"
                  :step="0.1"
                >
                  <SliderTrack class="relative h-2.5 grow overflow-hidden rounded-full border border-neutral-900 bg-neutral-200/40 shadow-inner">
                    <SliderRange class="absolute h-full rounded-full bg-argon-200" />
                  </SliderTrack>
                  <SliderThumb
                    class="relative block h-6 w-6 rounded-full bg-white shadow-sm hover:bg-stone-50 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
                    aria-label="Percent of allowed Bitcoin locked"
                  >
                    <span class="slider-value-indicator">{{ numeral(allowedBitcoinLocked[0]).format('0,0.[0]') }}%</span>
                  </SliderThumb>
                </SliderRoot>
                <div class="slider-endpoints">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
              <div Output>
                <div class="text-3xl font-bold">₳{{ usdToArgonNm(bitcoinLockedInUsd).format('0,0') }}</div>
                <div>Of BTC Locked</div>
              </div>
            </div>
            <div class="calculator-grid-row mt-5 items-start!">
              <header />
              <div>
                <p>
                  The more BTC in your vault, the more you earn. The market value of your BTC cannot exceed
                  the market value of your Argon securitization.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div class="calculator-grid-row">
              <header class="flex flex-col">
                <div Number><span class="relative -top-px -left-px">7</span></div>
                <span>Pct Of Bond</span>
                <span>Space Bought</span>
              </header>
              <div>
                <SliderRoot
                    v-model="allowedBondsBought"
                    class="relative flex h-5 w-full touch-none items-center select-none"
                    :min="0"
                    :max="100"
                    :step="0.1"
                >
                  <SliderTrack class="relative h-2.5 grow overflow-hidden rounded-full border border-neutral-900 bg-neutral-200/40 shadow-inner">
                    <SliderRange class="absolute h-full rounded-full bg-argon-200" />
                  </SliderTrack>
                  <SliderThumb
                      class="relative block h-6 w-6 rounded-full bg-white shadow-sm hover:bg-stone-50 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
                      aria-label="Percent of allowed Bonds bought"
                  >
                    <span class="slider-value-indicator">{{ numeral(allowedBondsBought[0]).format('0,0.[0]') }}%</span>
                  </SliderThumb>
                </SliderRoot>
                <div class="slider-endpoints">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
              <div Output>
                <div class="text-3xl font-bold">₳{{ usdToArgonNm(bondsBoughtInUsd).format('0,0') }}</div>
                <div>Of Bonds Bought</div>
              </div>
            </div>
            <div class="calculator-grid-row mt-5 items-start!">
              <header />
              <div>
                <p>
                  Your Argon Securitization (see above) determines how many Bonds are allowed by your vault. The more Bonds
                  in your vault, the higher your earnings.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div class="calculator-grid-row">
              <header class="flex flex-col">
                <div Number><span class="relative -top-px -left-px">8</span></div>
                <span>Revenue Share</span>
                <span>With Bonds</span>
              </header>
              <div>
                <SliderRoot
                  :model-value="percentSharedWithBonds"
                  @update:model-value="updatePercentSharedWithBonds"
                  class="relative flex h-5 w-full touch-none items-center select-none"
                  :min="0"
                  :max="7"
                  :step="0.1"
                >
                  <SliderTrack class="relative h-2.5 grow overflow-hidden rounded-full border border-neutral-900 bg-neutral-200/40 shadow-inner">
                    <SliderRange class="absolute h-full rounded-full bg-argon-200" />
                  </SliderTrack>
                  <SliderThumb class="relative block h-6 w-6 rounded-full bg-white shadow-sm hover:bg-stone-50 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9">
                    <span class="slider-value-indicator">{{ numeral(percentSharedWithBonds[0]).format('0,0.[0]') }}%</span>
                  </SliderThumb>
                </SliderRoot>
                <div class="slider-endpoints">
                  <span>0%</span>
                  <span>7%</span>
                </div>
              </div>
              <div Output>
                <div class="text-3xl font-bold">{{ numeral(percentSharedWithBonds[0]).format('0,0.[0]') }}%</div>
                <div>Paid to Bonds</div>
              </div>
            </div>
            <div class="calculator-grid-row mt-5 items-start!">
              <header />
              <div>
                <p>
                  Argon Bonds earn 5% of eligible vaulting revenue by default, but your vault can increase
                  this to 7% to attract more capital.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div class="calculator-grid-row">
              <header class="flex flex-col">
                <div Number><span class="relative -top-px -left-px">9</span></div>
                <span>Revenue Share</span>
                <span>With Liquids</span>
              </header>
              <div>
                <SliderRoot
                  :model-value="percentSharedWithLiquids"
                  @update:model-value="updatePercentSharedWithLiquids"
                  class="relative flex h-5 w-full touch-none items-center select-none"
                  :min="0"
                  :max="5"
                  :step="0.1"
                >
                  <SliderTrack class="relative h-2.5 grow overflow-hidden rounded-full border border-neutral-900 bg-neutral-200/40 shadow-inner">
                    <SliderRange class="absolute h-full rounded-full bg-argon-200" />
                  </SliderTrack>
                  <SliderThumb
                    class="relative block h-6 w-6 rounded-full bg-white shadow-sm hover:bg-stone-50 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
                    aria-label="Percent shared with Liquids"
                  >
                    <span class="slider-value-indicator">{{ numeral(percentSharedWithLiquids[0]).format('0,0.[0]') }}%</span>
                  </SliderThumb>
                </SliderRoot>
                <div class="slider-endpoints">
                  <span>0%</span>
                  <span>5%</span>
                </div>
              </div>
              <div Output>
                <div class="text-3xl font-bold">{{ numeral(percentSharedWithLiquids[0]).format('0,0.[0]') }}%</div>
                <div>Paid to Liquids</div>
              </div>
            </div>
            <div class="calculator-grid-row mt-5 items-start!">
              <header />
              <div>
                <p>
                  Bitcoin Liquids earn yield in multiple ways, including 3% of mining revenue. Your vault can
                  increase this to 5% to attract more bitcoin users.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import BigNumber from 'bignumber.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import numeral, { microgonToArgonNm, usdToArgonNm } from '@/lib/numeral';
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui';
import type { IBasicsRecord } from '@/interfaces/IBasicsRecord';
import Data from '@/lib/Data';
import { microgonToArgon, micronotToArgonot } from '@/lib/currencyUtils';
import {
  ARGONOT_SECURITIZATION_CAPACITY_MULTIPLIER,
  calculateVaultReturns,
} from '@/lib/vaultCalculator';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_STARTING_BTC_SPACE = 1;
const DEFAULT_ALLOWED_ARGONOTS_SECURITIZED = 80;
const DEFAULT_ALLOWED_BITCOIN_LOCKED = 80;
const DEFAULT_PERCENT_SHARED_WITH_BONDS = 5;
const MAX_PERCENT_SHARED_WITH_BONDS = 7;
const DEFAULT_PERCENT_SHARED_WITH_LIQUIDS = 3;
const MAX_PERCENT_SHARED_WITH_LIQUIDS = 5;
const DEFAULT_ALLOWED_BONDS_BOUGHT = 80;
const MAX_EXPECTED_RETURN = 100;
const STICKY_VIEWPORT_INSET = 10;

const runwayRef = Vue.ref<HTMLElement | null>(null);
const headerRef = Vue.ref<HTMLElement | null>(null);
const trackRef = Vue.ref<HTMLElement | null>(null);
const footerRef = Vue.ref<HTMLElement | null>(null);
const headerHeight = Vue.ref(76);
const footerHeight = Vue.ref(0);
let gsapContext: gsap.Context | undefined;
let layoutResizeObserver: ResizeObserver | undefined;

const data = Vue.ref<IBasicsRecord>(Data.basics);
const isLoaded = Vue.ref(false);

const seatCount = Vue.computed(() => data.value.mining.nextEpochSeatCount);
const argonotsBid = Vue.computed(() => micronotToArgonot(data.value.mining.currentMicronotsForBid));
const expectedTDR = Vue.ref([
  Math.min(MAX_EXPECTED_RETURN, Math.floor(data.value.miningTDR * 10) / 10),
]);
const customArgonotPrice = Vue.ref([
  data.value.usdForArgon > 0 ? data.value.usdForArgonot / data.value.usdForArgon : 0,
]);
const argonCirculationChange = Vue.ref([0]);
const customArgonotPriceUsd = Vue.computed(() => (
  customArgonotPrice.value[0] * data.value.usdForArgon
));

const startingBtcSpace = Vue.ref([DEFAULT_STARTING_BTC_SPACE]);
const allowedArgonotsSecuritized = Vue.ref([DEFAULT_ALLOWED_ARGONOTS_SECURITIZED]);
const allowedBitcoinLocked = Vue.ref([DEFAULT_ALLOWED_BITCOIN_LOCKED]);
const percentSharedWithBonds = Vue.ref([DEFAULT_PERCENT_SHARED_WITH_BONDS]);
const percentSharedWithLiquids = Vue.ref([DEFAULT_PERCENT_SHARED_WITH_LIQUIDS]);
const allowedBondsBought = Vue.ref([DEFAULT_ALLOWED_BONDS_BOUGHT]);

const startingBtcSpaceInUsd = Vue.computed(() => (
  startingBtcSpace.value[0] * data.value.usdForBtc
));

const startingArgonSecuritization = Vue.computed(() => {
  if (data.value.usdForArgon <= 0) return 0;
  return startingBtcSpaceInUsd.value / data.value.usdForArgon;
});

const bitcoinLockedInArgons = Vue.computed(() => (
  startingArgonSecuritization.value * (allowedBitcoinLocked.value[0] / 100)
));

const bitcoinLockedInUsd = Vue.computed(() => (
  bitcoinLockedInArgons.value * data.value.usdForArgon
));

const bondsBoughtInArgons = Vue.computed(() => (
  startingArgonSecuritization.value * (allowedBondsBought.value[0] / 100)
));

const bondsBoughtInUsd = Vue.computed(() => (
  bondsBoughtInArgons.value * data.value.usdForArgon
));

const argonotsSecuritizedMarketValueInArgons = Vue.computed(() => (
  startingArgonSecuritization.value
  * ARGONOT_SECURITIZATION_CAPACITY_MULTIPLIER
  * (allowedArgonotsSecuritized.value[0] / 100)
));

const argonotsSecuritizedMarketValueUsd = Vue.computed(() => (
  argonotsSecuritizedMarketValueInArgons.value * data.value.usdForArgon
));

const capitalInvestedInArgons = Vue.computed(() => (
  startingArgonSecuritization.value + argonotsSecuritizedMarketValueInArgons.value
));

const capitalInvestedInUsd = Vue.computed(() => (
  capitalInvestedInArgons.value * data.value.usdForArgon
));

const baseArgonotRewards = Vue.computed(() => {
  if (seatCount.value <= 0) return 0;
  return BigNumber(data.value.mining.baseMicronotRewardsPerBlock)
    .dividedBy(1_000_000)
    .multipliedBy(14_400)
    .dividedBy(seatCount.value)
    .toNumber();
});

const baseArgonRewards = Vue.computed(() => {
  if (seatCount.value <= 0) return 0;
  return BigNumber(data.value.mining.baseMicrogonRewardsPerBlock)
    .dividedBy(1_000_000)
    .multipliedBy(14_400)
    .dividedBy(seatCount.value)
    .toNumber();
});

const plusArgonMinted = Vue.computed(() => {
  if (seatCount.value <= 0) return 0;
  const totalMinted = microgonToArgon(data.value.microgonsInCirculation.total) * (argonCirculationChange.value[0] / 100);
  return Math.max(0, totalMinted / seatCount.value);
});

const argonotsTotal = Vue.computed(() => argonotsBid.value + baseArgonotRewards.value);

const combinedRewardsValue = Vue.computed(() => (
  (baseArgonRewards.value + plusArgonMinted.value) * data.value.usdForArgon
  + baseArgonotRewards.value * customArgonotPriceUsd.value
));

const argonotBidValue = Vue.computed(() => argonotsBid.value * customArgonotPriceUsd.value);
const maxAllowedExpectedReturn = Vue.computed(() => {
  if (argonotBidValue.value <= 0) return MAX_EXPECTED_RETURN;
  const zeroArgonBidReturn = (combinedRewardsValue.value / argonotBidValue.value) * 100;
  return Math.max(0, Math.min(MAX_EXPECTED_RETURN, Math.ceil(zeroArgonBidReturn * 10) / 10));
});

const argonsBid = Vue.computed(() => {
  if (data.value.usdForArgon <= 0) return 0;
  const endingValue = combinedRewardsValue.value + argonotBidValue.value;
  const targetBidValue = endingValue / (1 + expectedTDR.value[0] / 100);
  return Math.max(0, (targetBidValue - argonotBidValue.value) / data.value.usdForArgon);
});

const valueOfBid = Vue.computed(() => (
  argonsBid.value * data.value.usdForArgon
  + argonotsBid.value * customArgonotPriceUsd.value
));

const expectedValueOfSeat = Vue.computed(() => (
  combinedRewardsValue.value + argonotBidValue.value
));

const startingAuctionRevenue = Vue.computed(() => argonsBid.value * seatCount.value);

const vaultCalculation = Vue.computed(() => calculateVaultReturns({
  auctionRevenue: startingAuctionRevenue.value,
  argonSecuritization: startingArgonSecuritization.value,
  argonotSecuritizationValue: argonotsSecuritizedMarketValueInArgons.value,
  bitcoinLockedValue: bitcoinLockedInArgons.value,
  bondCapital: bondsBoughtInArgons.value,
  minedArgons: microgonToArgon(data.value.microgonsInCirculation.fromMining),
  bitcoinArgons: microgonToArgon(data.value.microgonsInCirculation.fromBitcoin),
  bondRevenueShare: percentSharedWithBonds.value[0] / 100,
  liquidRevenueShare: percentSharedWithLiquids.value[0] / 100,
}));

const tenDayReturn = Vue.computed(() => vaultCalculation.value.tenDayReturn);
const vaultAPY = Vue.computed(() => vaultCalculation.value.apy);

Vue.watchEffect(() => {
  if (expectedTDR.value[0] > maxAllowedExpectedReturn.value) {
    expectedTDR.value = [maxAllowedExpectedReturn.value];
  }
});

function resetExpectedTDR() {
  expectedTDR.value = [Math.min(MAX_EXPECTED_RETURN, Math.floor(data.value.miningTDR * 10) / 10)];
}

function updateExpectedTDR(values: number[] | undefined) {
  expectedTDR.value = [Math.max(
    0,
    Math.min(maxAllowedExpectedReturn.value, values?.[0] ?? expectedTDR.value[0]),
  )];
}

function resetCustomArgonotPrice() {
  customArgonotPrice.value = [
    data.value.usdForArgon > 0 ? data.value.usdForArgonot / data.value.usdForArgon : 0,
  ];
}

function resetArgonCirculationChange() {
  argonCirculationChange.value = [0];
}

function updatePercentSharedWithBonds(values: number[] | undefined) {
  percentSharedWithBonds.value = [Math.min(
    MAX_PERCENT_SHARED_WITH_BONDS,
    Math.max(DEFAULT_PERCENT_SHARED_WITH_BONDS, values?.[0] ?? DEFAULT_PERCENT_SHARED_WITH_BONDS),
  )];
}

function updatePercentSharedWithLiquids(values: number[] | undefined) {
  percentSharedWithLiquids.value = [Math.min(
    MAX_PERCENT_SHARED_WITH_LIQUIDS,
    Math.max(DEFAULT_PERCENT_SHARED_WITH_LIQUIDS, values?.[0] ?? DEFAULT_PERCENT_SHARED_WITH_LIQUIDS),
  )];
}

function resetPercentSharedWithLiquids() {
  percentSharedWithLiquids.value = [DEFAULT_PERCENT_SHARED_WITH_LIQUIDS];
}

Vue.onMounted(async () => {
  isLoaded.value = true;
  await Vue.nextTick();

  if (!runwayRef.value) return;

  const pendingImages = Array.from(
    runwayRef.value.closest('.DocContent')?.querySelectorAll('img') ?? [],
  ).filter(image => !image.complete);

  await Promise.all(pendingImages.map(image => new Promise<void>(resolve => {
    image.addEventListener('load', () => resolve(), { once: true });
    image.addEventListener('error', () => resolve(), { once: true });
  })));

  if (!runwayRef.value || !headerRef.value || !trackRef.value || !footerRef.value) return;

  const syncLayoutMetrics = () => {
    if (!headerRef.value || !footerRef.value) return;

    const nextHeaderHeight = headerRef.value.offsetHeight;
    const nextFooterHeight = footerRef.value.offsetHeight;
    if (headerHeight.value === nextHeaderHeight && footerHeight.value === nextFooterHeight) return;

    headerHeight.value = nextHeaderHeight;
    footerHeight.value = nextFooterHeight;
    if (gsapContext) Vue.nextTick(() => ScrollTrigger.refresh());
  };

  syncLayoutMetrics();
  await Vue.nextTick();

  layoutResizeObserver = new ResizeObserver(syncLayoutMetrics);
  layoutResizeObserver.observe(headerRef.value);
  layoutResizeObserver.observe(footerRef.value);

  gsapContext = gsap.context(() => {
    ScrollTrigger.create({
      trigger: footerRef.value,
      refreshPriority: 2,
      start: `bottom bottom-=${STICKY_VIEWPORT_INSET}px`,
      endTrigger: trackRef.value,
      end: () => `bottom bottom-=${footerRef.value!.offsetHeight + STICKY_VIEWPORT_INSET}px`,
      pin: footerRef.value,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });

    ScrollTrigger.create({
      trigger: headerRef.value,
      refreshPriority: 2,
      start: `top ${STICKY_VIEWPORT_INSET}px`,
      endTrigger: trackRef.value,
      end: () => `bottom top+=${headerRef.value!.offsetHeight + STICKY_VIEWPORT_INSET}px`,
      pin: headerRef.value,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });
  }, runwayRef.value);

  ScrollTrigger.sort();
  ScrollTrigger.refresh();
});

Vue.onUnmounted(() => {
  layoutResizeObserver?.disconnect();
  gsapContext?.revert();
});
</script>

<style scoped>
@import "../../main.css";

footer .font-bold,
.calculator-network-stats > div.font-bold,
div[Output],
.slider-value-indicator,
.slider-endpoints {
  @apply font-mono;
}

.calculator-shell {
  @apply relative min-h-0 rounded-lg;
  container-type: inline-size;
}

.calculator-middle {
  @apply min-h-0;
}

section {
  @apply border-b border-gray-500/50 py-6;
}

footer {
  @apply absolute inset-x-0 z-10 mt-0;
  top: var(--calculator-header-height);
}

section {
  @apply grid grid-cols-[160px_minmax(0,1fr)_160px] items-center px-5;
}

.calculator-network-stats {
  @apply pt-4 pl-[180px];

  > div {
    @apply border-t border-gray-500/50 pt-1 text-sm;
  }
}

.calculator-grid-row {
  @apply col-span-full grid items-center;
  grid-template-columns: subgrid;
}

p {
  @apply mb-0 opacity-60;
}

.row-label,
section > header,
section > .calculator-grid-row > header {
  @apply relative font-bold;
  div[Number] {
    @apply absolute top-1/2 h-7 w-7 -translate-[150%] -translate-y-1/2 items-center justify-center rounded-full border border-argon-900 bg-argon-500 text-xl text-white shadow-sm shadow-white/50;
    display: flex;
  }
}

div[Output] {
  @apply flex flex-col justify-end pl-7 text-right;
}

.slider-value-indicator {
  @apply pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-stone-100! px-2 py-1 text-xs font-bold text-slate-800 shadow-sm;
}

.slider-value-indicator::after {
  content: '';
  @apply absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-stone-100;
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

@container (max-width: 639px) {
  section {
    @apply grid-cols-1 gap-3 px-4;
  }

  .calculator-network-stats {
    @apply pl-4;
  }

  div[Output] {
    @apply pl-0 text-left;
  }

  section > header div[Number],
  section > .calculator-grid-row > header div[Number] {
    @apply static mr-2 inline-flex translate-x-0 translate-y-0 align-middle;
  }
}
</style>
