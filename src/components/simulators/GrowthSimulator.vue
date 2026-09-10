<template>
  <section
    class="growth-simulator-preview @container w-full my-8"
    aria-label="Simulation Engine"
    :aria-busy="isLoading"
  >
    <div ref="engineRef" class="simulation-engine [--engine-background:color-mix(in_oklab,var(--color-gray-700)_35%,var(--color-gray-800))] [--engine-text:#d2c2d8] [--engine-rule:#62616a] relative pt-[75.58cqw] pb-[3cqw] rounded-[2.33cqw] bg-[var(--engine-background)] text-[var(--engine-text)] font-[Arial,Helvetica,sans-serif] leading-[1.2]">
      <div class="engine-header-slot absolute top-0 left-0 w-full h-[8.51cqw] z-20">
        <header
          ref="headerRef"
          class="engine-header relative z-20 m-0! w-full h-full px-[3.56%] flex items-center justify-between rounded-t-[2.33cqw] border-b border-gray-500/50 bg-gray-800 text-white shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
        >
          <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 -top-5 bottom-0 bg-[var(--bg-color)]" />
          <div aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-t-[inherit] bg-gray-800" />
          <div aria-hidden="true" class="pointer-events-none absolute z-20 top-[calc(100%+1px)] left-0 h-4 w-full bg-linear-to-b from-gray-800 to-transparent" />
          <h2 class="relative z-10 m-0! text-inherit! font-bold! leading-[1.2]! font-[Arial,Helvetica,sans-serif]!" style="font-size: 3.49cqw">Simulation Engine</h2>
          <div class="header-actions relative z-10 flex items-center gap-x-5 ml-auto">
            <span class="text-[2.47cqw] font-bold font-mono">Cycle #{{ (display?.completedCycles ?? 0) + 1 }}</span>
            <button
              type="button"
              class="
                reset-button bg-transparent text-inherit text-[clamp(14px,1.3cqw,18px)] px-3 py-2
                border border-white/50 rounded-lg cursor-pointer disabled:cursor-default disabled:opacity-60
                focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[#e492f5]
                focus-visible:outline-offset-4
              "
              :disabled="isLoading"
              @click="loadNetworkData"
            >Reset</button>
          </div>
        </header>
      </div>

      <div class="network-summary absolute top-[8.51cqw] right-[5.16%] left-[3.56%] h-[14.76cqw] grid grid-cols-3 before:content-[''] before:pointer-events-none before:absolute before:left-[calc(4px-3.56cqw)] before:w-[calc(100cqw-8px)] before:border-[var(--engine-rule)] before:bottom-0 before:border-b">
        <div class="summary-metric font-mono flex items-center flex-col pt-[3.3cqw] gap-[.13cqw]">
          <strong class="text-[4.2cqw] font-bold">₳{{ numeral((display?.networkValue ?? 0) / argonPriceUsd).format([1e3, 1e6, 1e9, 1e12].some(unit => Math.abs((display?.networkValue ?? 0) / argonPriceUsd) >= unit && Math.abs((display?.networkValue ?? 0) / argonPriceUsd) < 10 * unit) ? '0.00a' : [1e3, 1e6, 1e9, 1e12].some(unit => Math.abs((display?.networkValue ?? 0) / argonPriceUsd) >= 10 * unit && Math.abs((display?.networkValue ?? 0) / argonPriceUsd) < 100 * unit) ? '0.0a' : '0a').toUpperCase() }}</strong>
          <span class="text-[1.65cqw]">Current Network Value</span>
        </div>
        <div class="summary-metric font-mono operator-metric flex items-center flex-col pt-[3.3cqw] gap-[.13cqw]">
          <TooltipProvider :delay-duration="250" disable-hoverable-content>
            <TooltipRoot>
              <TooltipTrigger as-child @pointermove="trackTooltipPointer" @focus="tooltipReference = undefined">
                <button type="button" aria-label="Operator account details" class="flex flex-col items-center gap-1 text-inherit cursor-help rounded focus-visible:outline-2 focus-visible:outline-[#e492f5]">
                  <strong class="text-[4.2cqw] font-bold">₳{{ numeral(display?.operatorValue ?? 10000).format([1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(display?.operatorValue ?? 10000) >= unit && Math.abs(display?.operatorValue ?? 10000) < 10 * unit) ? '0.00a' : [1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(display?.operatorValue ?? 10000) >= 10 * unit && Math.abs(display?.operatorValue ?? 10000) < 100 * unit) ? '0.0a' : '0a').toUpperCase() }}</strong>
                  <span class="text-[1.65cqw]">₳10K Operator Account</span>
                </button>
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent class="z-100 max-w-[min(340px,calc(100vw-24px))] rounded-lg border border-[#e7dfea] bg-[#faf7fc] px-3 py-2 font-[Arial,Helvetica,sans-serif] text-sm leading-[1.4] font-normal text-[#252132] shadow-[0_4px_16px_rgb(0_0_0/25%)]" side="bottom" :side-offset="27" :collision-padding="12" :reference="tooltipReference">
                  <template v-if="frame">
                    <div class="font-semibold">Started with ₳10K</div>
                    <div class="mt-1">{{ numeral(frame.operatorAccount.miningAllocation).format('0.[0]%') }} mining / {{ numeral(1 - frame.operatorAccount.miningAllocation).format('0.[0]%') }} vaulting. Reset randomizes this split.</div>
                    <div class="mt-2">Owns {{ frame.operatorAccount.miningPositions.reduce((total, position) => total + position.seats, 0) }} active mining seats and ₳{{ numeral(frame.operatorAccount.vaultArgons + frame.operatorAccount.vaultArgonots * frame.state.argonotPriceUsd / frame.state.argonPriceUsd).format('0.[00]a').toUpperCase() }} of vault collateral.</div>
                    <div class="mt-2">The network has {{ numeral(frame.state.seatCount).format('0,0') }} active seats and offers {{ numeral(frame.state.dailySeatCount).format('0,0') }} new seats per day. Each seat requires up to ₳50K in bids plus ARGNOT worth twice its bid (up to ₳100K).</div>
                    <div class="mt-2">Account value includes cash, owned ARGNOT, vault collateral, and the remaining prepaid cost of mining seats. Recruited Bitcoin, bonds, and stakes belong to their providers and are excluded.</div>
                    <div class="mt-2">Liquid proceeds are reinvested using the starting split. New seats use current competitive bids, not historical auction prices; unaffordable bids stay as cash. Assumes successful recruitment, daily pro-rata mining rewards, and ARGNOT trades at simulated prices without fees or slippage.</div>
                  </template>
                  <TooltipArrow class="fill-[#faf7fc]" />
                </TooltipContent>
              </TooltipPortal>
            </TooltipRoot>
          </TooltipProvider>
        </div>
        <div class="summary-metric font-mono flex items-center flex-col pt-[3.3cqw] gap-[.13cqw]">
          <strong class="text-[4.2cqw] font-bold">{{ numeral((display?.operatorValue ?? 10000) / (display?.operatorAccount.initialCapital ?? 10000)).format(Math.abs((display?.operatorValue ?? 10000) / (display?.operatorAccount.initialCapital ?? 10000)) >= 1000 ? '0,0' : '0,0.[00]') }}x</strong>
          <span class="text-[1.65cqw]">Operator Growth Factor</span>
        </div>
      </div>

      <TooltipProvider :delay-duration="250" disable-hoverable-content>
        <div
          class="growth-loop absolute top-[23.25cqw] w-full h-[52.33cqw]"
          :data-step="frame?.step"
          :data-running="isRunning"
          role="group"
          aria-label="Six-step growth cycle"
        >
          <svg class="transfer-paths absolute size-full fill-[#575863]" viewBox="0 0 1376 720" aria-hidden="true">
            <path
              class="fill-none stroke-[#575863] stroke-[10] [stroke-dasharray:26_7]"
              ref="upperPath"
              d="M322 167 V134 Q322 100 356 100 H934 Q969 100 969 135"
            />
            <path
              class="fill-none stroke-[#575863] stroke-[10] [stroke-dasharray:26_7]"
              ref="lowerPath"
              d="M969 571 V610 Q969 645 934 645 H356 Q322 645 322 610 V597"
            />
            <polygon points="954,139 984,139 969,168" />
            <polygon points="307,597 337,597 322,566" />
            <circle
              v-for="(particle, index) in particles"
              :key="index"
              :cx.attr="particle.x"
              :cy.attr="particle.y"
              :opacity="particle.opacity"
              r="7"
              class="transfer-particle fill-[#e492f5]"
            />
          </svg>

          <TooltipRoot :disabled="miningFormulaHovered || miningFormulaFocused">
            <TooltipTrigger as-child :class="stepClasses(0)" @pointermove="trackTooltipPointer" @focus="tooltipReference = undefined">
              <button
                type="button"
                class="
                  apy-box mining-apy flex items-center justify-center gap-[1.82cqw] top-[35.42%] left-[7.27%]
                  w-[41.72%] h-[31.53%] rounded-[1.24cqw] absolute m-0 p-0 leading-[1.2] opacity-100
                  enabled:cursor-pointer disabled:cursor-default focus-visible:outline-3
                  focus-visible:outline-solid focus-visible:outline-[#e492f5] focus-visible:outline-offset-4
                  border
                "
                :disabled="!canRun(0)"
                @click="runStep"
              >
                <span class="apy-metric font-mono flex flex-col items-center gap-[.44cqw]" :class="canRun(0) || stepClasses(0).running ? 'animate-[selected-text-scale_1.5s_ease-in-out_infinite] motion-reduce:animate-none' : ''">
                  <strong class="text-[3.78cqw] font-bold whitespace-nowrap">{{ (display?.miningApy ?? 0) >= 1e12 ? '≥1T' : numeral(display?.miningApy ?? 0).format([1e3, 1e6, 1e9].some(unit => Math.abs(display?.miningApy ?? 0) >= 10 * unit && Math.abs(display?.miningApy ?? 0) < 100 * unit) ? '0.0a' : ((Math.abs(display?.miningApy ?? 0) < 10000 || (Math.abs(display?.miningApy ?? 0) >= 1e6 && Math.abs(display?.miningApy ?? 0) < 1e7) || (Math.abs(display?.miningApy ?? 0) >= 1e9 && Math.abs(display?.miningApy ?? 0) < 1e10)) ? '0.[00]a' : '0a')).toUpperCase() }}%</strong>
                  <span class="text-[1.89cqw]">Mining APY</span>
                </span>
                <span class="text-[3.78cqw] font-bold">=</span>
                <span
                  class="
                    formula flex flex-col items-stretch mt-[1.16cqw] font-['Times_New_Roman',serif] text-[2.76cqw]
                    text-center
                  "
                  :class="canRun(0) || stepClasses(0).running ? 'animate-[selected-text-scale_1.5s_ease-in-out_infinite] motion-reduce:animate-none' : ''"
                  @pointerenter="miningFormulaHovered = true"
                  @pointerleave="miningFormulaHovered = false"
                  @focusin="miningFormulaFocused = true"
                  @focusout="miningFormulaFocused = false"
                >
                  <span class="px-[.73cqw] pb-[.44cqw] border-b border-[var(--engine-rule)]">
                    <TooltipRoot>
                      <TooltipTrigger as-child @pointermove.stop="trackTooltipPointer" @focus="tooltipReference = undefined">
                        <span tabindex="0" class="cursor-inherit rounded-sm focus-visible:outline-2 focus-visible:outline-current">M<sup class="text-[65%]">f</sup></span>
                      </TooltipTrigger>
                      <TooltipPortal>
                        <TooltipContent
                          class="z-100 max-w-[min(260px,calc(100vw-24px))] rounded-lg border border-[#e7dfea] bg-[#faf7fc] px-3 py-2 text-center font-[Arial,Helvetica,sans-serif] text-sm leading-[1.4] font-normal text-[#252132] shadow-[0_4px_16px_rgb(0_0_0/25%)]"
                          side="bottom"
                          :side-offset="27"
                          :collision-padding="12"
                          :reference="tooltipReference"
                        >
                          Total value returned to miners: ₳{{ numeral(miningTotals.totalReceived).format(miningTotals.totalReceived >= 1000 ? '0,0' : '0,0.[00]') }}
                          <TooltipArrow class="fill-[#faf7fc]" />
                        </TooltipContent>
                      </TooltipPortal>
                    </TooltipRoot>
                    −
                    <TooltipRoot>
                      <TooltipTrigger as-child @pointermove.stop="trackTooltipPointer" @focus="tooltipReference = undefined">
                        <span tabindex="0" class="cursor-inherit rounded-sm focus-visible:outline-2 focus-visible:outline-current">M<sup class="text-[65%]">i</sup></span>
                      </TooltipTrigger>
                      <TooltipPortal>
                        <TooltipContent
                          class="z-100 max-w-[min(260px,calc(100vw-24px))] rounded-lg border border-[#e7dfea] bg-[#faf7fc] px-3 py-2 text-center font-[Arial,Helvetica,sans-serif] text-sm leading-[1.4] font-normal text-[#252132] shadow-[0_4px_16px_rgb(0_0_0/25%)]"
                          side="bottom"
                          :side-offset="27"
                          :collision-padding="12"
                          :reference="tooltipReference"
                        >
                          Current total mining bids:<br />
                          ₳{{ numeral(miningTotals.bids).format(miningTotals.bids >= 1000 ? '0,0' : '0,0.[00]') }}
                          <TooltipArrow class="fill-[#faf7fc]" />
                        </TooltipContent>
                      </TooltipPortal>
                    </TooltipRoot>
                  </span>
                  <span class="pt-[.87cqw]">
                    <TooltipRoot>
                      <TooltipTrigger as-child @pointermove.stop="trackTooltipPointer" @focus="tooltipReference = undefined">
                        <span tabindex="0" class="cursor-inherit rounded-sm focus-visible:outline-2 focus-visible:outline-current">M<sup class="text-[65%]">i</sup></span>
                      </TooltipTrigger>
                      <TooltipPortal>
                        <TooltipContent
                          class="z-100 max-w-[min(260px,calc(100vw-24px))] rounded-lg border border-[#e7dfea] bg-[#faf7fc] px-3 py-2 text-center font-[Arial,Helvetica,sans-serif] text-sm leading-[1.4] font-normal text-[#252132] shadow-[0_4px_16px_rgb(0_0_0/25%)]"
                          side="bottom"
                          :side-offset="27"
                          :collision-padding="12"
                          :reference="tooltipReference"
                        >
                          Current total mining bids:<br />
                          ₳{{ numeral(miningTotals.bids).format(miningTotals.bids >= 1000 ? '0,0' : '0,0.[00]') }}
                          <TooltipArrow class="fill-[#faf7fc]" />
                        </TooltipContent>
                      </TooltipPortal>
                    </TooltipRoot>
                  </span>
                </span>
              </button>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                v-if="!miningFormulaHovered && !miningFormulaFocused"
                class="
                  z-100 max-w-[min(260px,calc(100vw-24px))] rounded-lg border border-[#e7dfea] bg-[#faf7fc] px-3
                  py-2 text-center font-[Arial,Helvetica,sans-serif] text-sm leading-[1.4] font-normal
                  text-[#252132] shadow-[0_4px_16px_rgb(0_0_0/25%)]
                "
                side="bottom"
                :side-offset="27"
                :collision-padding="12"
                :reference="tooltipReference"
              >
                Mining returns are high because the chain-guaranteed base rewards substantially exceed the bid per seat. With rewards fixed, higher bids are required to bring returns down.
                <TooltipArrow class="fill-[#faf7fc]" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
          <TooltipRoot>
            <TooltipTrigger as-child :class="stepClasses(1)" @pointermove="trackTooltipPointer" @focus="tooltipReference = undefined">
              <button
                type="button"
                class="
                  flow-box font-mono bid-costs h-[14%] rounded-[.95cqw] text-[calc(2.3cqw-1pt)] font-bold [overflow-wrap:anywhere]
                  top-[24.33%] left-[9.96%] w-[36.34%] absolute m-0 p-0 leading-[1.2]
                  enabled:cursor-pointer disabled:cursor-default focus-visible:outline-3
                  focus-visible:outline-solid focus-visible:outline-[#e492f5] focus-visible:outline-offset-4
                  border
                "
                :disabled="!canRun(1)"
                @click="runStep"
              >
                <span
                  class="inline-block"
                  :class="[
                    canRun(1) || stepClasses(1).running ? 'animate-[selected-text-scale_1.5s_ease-in-out_infinite] motion-reduce:animate-none' : '',
                    stepClasses(1).behind ? '@min-[761px]:-translate-y-[3px]' : '',
                  ]"
                >
                  <template v-for="(result, index) in [resultRows[0]]" :key="index">
                    <template v-if="!result">Calibrate Bid Expenses</template>
                    <template v-else>
                      Added ₳{{ numeral(Math.abs(result.output)).format([1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(result.output) >= 10 * unit && Math.abs(result.output) < 100 * unit) ? '0.0a' : [1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(result.output) >= 100 * unit && Math.abs(result.output) < 1000 * unit) ? '0a' : '0.[00]a').toUpperCase() }} Bid Expenses
                    </template>
                  </template>
                </span>
              </button>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                class="
                  z-100 max-w-[min(260px,calc(100vw-24px))] rounded-lg border border-[#e7dfea] bg-[#faf7fc] px-3
                  py-2 text-center font-[Arial,Helvetica,sans-serif] text-sm leading-[1.4] font-normal
                  text-[#252132] shadow-[0_4px_16px_rgb(0_0_0/25%)]
                "
                side="bottom"
                :side-offset="27"
                :collision-padding="12"
                :reference="tooltipReference"
              >
                <template v-if="bidImpact">
                  Added ₳{{ numeral(bidImpact.amount).format(Math.abs(bidImpact.amount) >= 1000 ? '0,0' : '0,0.[00]') }}
                  to bid costs which dropped returns from {{ bidImpact.beforeApy >= 1e12 ? '≥1T' : numeralbidImpact.beforeApy.format([1e3, 1e6, 1e9].some(unit => Math.absbidImpact.beforeApy >= 10 * unit && Math.absbidImpact.beforeApy < 100 * unit) ? '0.0a' : ((Math.absbidImpact.beforeApy < 10000 || (Math.absbidImpact.beforeApy >= 1e6 && Math.absbidImpact.beforeApy < 1e7) || (Math.absbidImpact.beforeApy >= 1e9 && Math.absbidImpact.beforeApy < 1e10)) ? '0.[00]a' : '0a')).toUpperCase() }}%
                  down to {{ bidImpact.afterApy >= 1e12 ? '≥1T' : numeralbidImpact.afterApy.format([1e3, 1e6, 1e9].some(unit => Math.absbidImpact.afterApy >= 10 * unit && Math.absbidImpact.afterApy < 100 * unit) ? '0.0a' : ((Math.absbidImpact.afterApy < 10000 || (Math.absbidImpact.afterApy >= 1e6 && Math.absbidImpact.afterApy < 1e7) || (Math.absbidImpact.afterApy >= 1e9 && Math.absbidImpact.afterApy < 1e10)) ? '0.[00]a' : '0a')).toUpperCase() }}%.
                </template>
                <template v-else>Increasing the cost of bids lowers mining returns.</template>
                <TooltipArrow class="fill-[#faf7fc]" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
          <TooltipRoot>
            <TooltipTrigger as-child :class="stepClasses(2)" @pointermove="trackTooltipPointer" @focus="tooltipReference = undefined">
              <button
                type="button"
                class="
                  flow-box font-mono revenue h-[14%] rounded-[.95cqw] text-[calc(2.3cqw-1pt)] font-bold [overflow-wrap:anywhere]
                  top-[24.33%] left-[53.67%] w-[36.34%] absolute m-0 p-0 leading-[1.2]
                  enabled:cursor-pointer disabled:cursor-default focus-visible:outline-3
                  focus-visible:outline-solid focus-visible:outline-[#e492f5] focus-visible:outline-offset-4
                  border
                "
                :disabled="!canRun(2)"
                @click="runStep"
              >
                <span
                  class="inline-block"
                  :class="[
                    canRun(2) || stepClasses(2).running ? 'animate-[selected-text-scale_1.5s_ease-in-out_infinite] motion-reduce:animate-none' : '',
                    stepClasses(2).behind ? '@min-[761px]:-translate-y-[3px]' : '',
                  ]"
                >
                  <template v-for="(result, index) in [resultRows[1]]" :key="index">
                    <template v-if="!result">Calibrate Vault Revenue</template>
                    <template v-else>
                      Added ₳{{ numeral(Math.abs(result.output)).format([1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(result.output) >= 10 * unit && Math.abs(result.output) < 100 * unit) ? '0.0a' : [1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(result.output) >= 100 * unit && Math.abs(result.output) < 1000 * unit) ? '0a' : '0.[00]a').toUpperCase() }} Vault Revenue
                    </template>
                  </template>
                </span>
              </button>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                class="
                  z-100 max-w-[min(260px,calc(100vw-24px))] rounded-lg border border-[#e7dfea] bg-[#faf7fc] px-3
                  py-2 text-center font-[Arial,Helvetica,sans-serif] text-sm leading-[1.4] font-normal
                  text-[#252132] shadow-[0_4px_16px_rgb(0_0_0/25%)]
                "
                side="bottom"
                :side-offset="27"
                :collision-padding="12"
                :reference="tooltipReference"
              >
                <template v-if="revenueBreakdown">
                  Vaults received {{ numeral(revenueBreakdown.share * 100).format('0.[00]') }}% of these auction bids:
                  <span class="mt-1 block font-semibold">
                    ₳{{ numeral(revenueBreakdown.bids).format(revenueBreakdown.bids >= 1000 ? '0,0' : '0,0.[00]') }}
                    × {{ numeral(revenueBreakdown.share * 100).format('0.[00]') }}%
                    ≈ ₳{{ numeral(revenueBreakdown.revenue).format(revenueBreakdown.revenue >= 1000 ? '0,0' : '0,0.[00]') }}
                  </span>
                  <span class="mt-1 block">Their share depends on vault coverage and utilization, up to a maximum of 57%.</span>
                </template>
                <template v-else>The higher the revenue, the higher the vault's returns.</template>
                <TooltipArrow class="fill-[#faf7fc]" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>

          <button
            type="button"
            class="
              autoplay-control z-4 top-[41.25%] left-[45.28%] w-[9.59%] aspect-square rounded-full
              bg-[var(--engine-background)] before:content-[''] before:absolute before:inset-0 before:border
              before:border-[#74727e] before:rounded-full
              before:[mask-image:linear-gradient(to_right,#000_38.7%,transparent_38.7%_59.9%,#000_59.9%)]
              before:pointer-events-none absolute m-0 p-0 leading-[1.2] opacity-100 enabled:cursor-pointer
              disabled:cursor-default focus-visible:outline-3 focus-visible:outline-solid
              focus-visible:outline-[#e492f5] focus-visible:outline-offset-4 border-0
            "
            :aria-label="isRunning || isPlaying ? 'Pause simulation' : 'Run current cycle automatically'"
            :aria-pressed="isPlaying || isRunning"
            :disabled="!frame || isLoading || isBlocked || isComplete"
            @click="togglePlayback"
          >
            <svg class="block w-[83%] m-auto text-[#848891]" v-if="isRunning || isPlaying" viewBox="0 0 110 105" aria-hidden="true"><path fill="currentColor" d="M28 20 H45 V85 H28 Z M65 20 H82 V85 H65 Z" /></svg>
            <svg class="block w-[83%] m-auto text-[#848891]" v-else viewBox="0 0 110 105" aria-hidden="true"><path fill="currentColor" d="M36 20 L86 52.5 L36 85 Z" /></svg>
          </button>
          <TooltipRoot>
            <TooltipTrigger as-child :class="stepClasses(3)" @pointermove="trackTooltipPointer" @focus="tooltipReference = undefined">
              <button
                type="button"
                class="
                  apy-box vaulting-apy flex items-center justify-center gap-[1.82cqw] top-[35.42%] left-[51.02%]
                  w-[41.64%] h-[31.53%] rounded-[1.24cqw] absolute m-0 p-0 leading-[1.2] opacity-100
                  enabled:cursor-pointer disabled:cursor-default focus-visible:outline-3
                  focus-visible:outline-solid focus-visible:outline-[#e492f5] focus-visible:outline-offset-4
                  border
                "
                :disabled="!canRun(3)"
                @click="runStep"
              >
                <span class="apy-metric font-mono flex flex-col items-center gap-[.44cqw]" :class="canRun(3) || stepClasses(3).running ? 'animate-[selected-text-scale_1.5s_ease-in-out_infinite] motion-reduce:animate-none' : ''">
                  <strong class="text-[3.78cqw] font-bold whitespace-nowrap">{{ (display?.vaultingApy ?? 0) >= 1e12 ? '≥1T' : numeral(display?.vaultingApy ?? 0).format([1e3, 1e6, 1e9].some(unit => Math.abs(display?.vaultingApy ?? 0) >= 10 * unit && Math.abs(display?.vaultingApy ?? 0) < 100 * unit) ? '0.0a' : ((Math.abs(display?.vaultingApy ?? 0) < 10000 || (Math.abs(display?.vaultingApy ?? 0) >= 1e6 && Math.abs(display?.vaultingApy ?? 0) < 1e7) || (Math.abs(display?.vaultingApy ?? 0) >= 1e9 && Math.abs(display?.vaultingApy ?? 0) < 1e10)) ? '0.[00]a' : '0a')).toUpperCase() }}%</strong>
                  <span class="text-[1.89cqw]">Vaulting APY</span>
                </span>
                <span class="text-[3.78cqw] font-bold">=</span>
                <span
                  class="
                    formula flex flex-col items-stretch mt-[1.16cqw] font-['Times_New_Roman',serif] text-[2.76cqw]
                    text-center
                  "
                  :class="canRun(3) || stepClasses(3).running ? 'animate-[selected-text-scale_1.5s_ease-in-out_infinite] motion-reduce:animate-none' : ''"
                  aria-hidden="true"
                >
                  <span class="px-[.73cqw] pb-[.44cqw] border-b border-[var(--engine-rule)]">V<sup class="text-[65%]">f</sup> - V<sup class="text-[65%]">i</sup></span>
                  <span class="pt-[.87cqw]">V<sup class="text-[65%]">i</sup></span>
                </span>
              </button>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                class="
                  z-100 max-w-[min(260px,calc(100vw-24px))] rounded-lg border border-[#e7dfea] bg-[#faf7fc] px-3
                  py-2 text-center font-[Arial,Helvetica,sans-serif] text-sm leading-[1.4] font-normal
                  text-[#252132] shadow-[0_4px_16px_rgb(0_0_0/25%)]
                "
                side="bottom"
                :side-offset="27"
                :collision-padding="12"
                :reference="tooltipReference"
              >
                Vault growth enables new ARGN issuance.
                <TooltipArrow class="fill-[#faf7fc]" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
          <TooltipRoot>
            <TooltipTrigger as-child :class="stepClasses(4)" @pointermove="trackTooltipPointer" @focus="tooltipReference = undefined">
              <button
                type="button"
                class="
                  flow-box font-mono new-argon h-[14%] rounded-[.95cqw] text-[calc(2.3cqw-1pt)] font-bold [overflow-wrap:anywhere]
                  top-[63.61%] left-[53.67%] w-[36.34%] absolute m-0 p-0 leading-[1.2]
                  enabled:cursor-pointer disabled:cursor-default focus-visible:outline-3
                  focus-visible:outline-solid focus-visible:outline-[#e492f5] focus-visible:outline-offset-4
                  border
                "
                :disabled="!canRun(4)"
                @click="runStep"
              >
                <span
                  class="inline-block"
                  :class="[
                    canRun(4) || stepClasses(4).running ? 'animate-[selected-text-scale_1.5s_ease-in-out_infinite] motion-reduce:animate-none' : '',
                    stepClasses(4).behind ? '@min-[761px]:translate-y-[3px]' : '',
                  ]"
                >
                  <template v-for="(result, index) in [resultRows[3]]" :key="index">
                    <template v-if="!result">Determine Demand</template>
                    <template v-else>
                      {{ result.output < 0 ? 'Decreased' : 'Increased' }} ₳{{ numeral(Math.abs(result.output)).format([1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(result.output) >= 10 * unit && Math.abs(result.output) < 100 * unit) ? '0.0a' : [1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(result.output) >= 100 * unit && Math.abs(result.output) < 1000 * unit) ? '0a' : '0.[00]a').toUpperCase() }} in Demand
                    </template>
                  </template>
                </span>
              </button>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                class="
                  z-100 max-w-[min(260px,calc(100vw-24px))] rounded-lg border border-[#e7dfea] bg-[#faf7fc] px-3
                  py-2 text-center font-[Arial,Helvetica,sans-serif] text-sm leading-[1.4] font-normal
                  text-[#252132] shadow-[0_4px_16px_rgb(0_0_0/25%)]
                "
                side="bottom"
                :side-offset="27"
                :collision-padding="12"
                :reference="tooltipReference"
              >
                New ARGN funds mining rewards.
                <TooltipArrow class="fill-[#faf7fc]" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
          <TooltipRoot>
            <TooltipTrigger as-child :class="stepClasses(5)" @pointermove="trackTooltipPointer" @focus="tooltipReference = undefined">
              <button
                type="button"
                class="
                  flow-box font-mono mining-rewards h-[14%] rounded-[.95cqw] text-[calc(2.3cqw-1pt)] font-bold
                  [overflow-wrap:anywhere] top-[63.61%] left-[9.96%] w-[36.34%] absolute m-0 p-0 leading-[1.2]
                  enabled:cursor-pointer disabled:cursor-default focus-visible:outline-3
                  focus-visible:outline-solid focus-visible:outline-[#e492f5] focus-visible:outline-offset-4
                  border
                "
                :disabled="!canRun(5)"
                @click="runStep"
              >
                <span
                  class="inline-block"
                  :class="[
                    canRun(5) || stepClasses(5).running ? 'animate-[selected-text-scale_1.5s_ease-in-out_infinite] motion-reduce:animate-none' : '',
                    stepClasses(5).behind ? '@min-[761px]:translate-y-[3px]' : '',
                  ]"
                >
                  <template v-for="(result, index) in [resultRows[4]]" :key="index">
                    <template v-if="!result">Determine Base Rewards</template>
                    <template v-else>
                      Added ₳{{ numeral(Math.abs(result.output)).format([1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(result.output) >= 10 * unit && Math.abs(result.output) < 100 * unit) ? '0.0a' : [1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(result.output) >= 100 * unit && Math.abs(result.output) < 1000 * unit) ? '0a' : '0.[00]a').toUpperCase() }} Mining Rewards
                    </template>
                  </template>
                </span>
              </button>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                class="
                  z-100 max-w-[min(260px,calc(100vw-24px))] rounded-lg border border-[#e7dfea] bg-[#faf7fc] px-3
                  py-2 text-center font-[Arial,Helvetica,sans-serif] text-sm leading-[1.4] font-normal
                  text-[#252132] shadow-[0_4px_16px_rgb(0_0_0/25%)]
                "
                side="bottom"
                :side-offset="27"
                :collision-padding="12"
                :reference="tooltipReference"
              >
                Rewards increase mining returns.
                <TooltipArrow class="fill-[#faf7fc]" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </div>
      </TooltipProvider>

      <div class="cycle-results relative mx-[3.56%] my-4 rounded-xl bg-white/5 text-sm font-mono">
        <div v-for="cycle in cycleResults" :key="cycle.number" class="border-b border-white/10 last:border-b-0">
          <button
            type="button"
            class="grid w-full grid-cols-[1fr_auto_auto] items-center gap-x-2 px-3 py-4 text-left text-inherit cursor-pointer rounded-xl hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-argon-300 @min-[600px]:gap-x-10"
            :aria-expanded="expandedCycle === cycle.number"
            :aria-label="`Cycle ${cycle.number} details`"
            @click="expandedCycle = expandedCycle === cycle.number ? null : cycle.number"
          >
            <span class="flex items-center gap-1 whitespace-nowrap text-xs font-semibold @min-[600px]:gap-2 @min-[600px]:text-base">
              <svg class="h-4 w-4 shrink-0 opacity-60 transition-transform duration-200" :class="expandedCycle === cycle.number ? 'rotate-90' : ''" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="m6 3 5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Cycle #{{ cycle.number }}
            </span>
            <span class="flex items-baseline justify-end gap-1 whitespace-nowrap @min-[600px]:gap-2">
              <span class="text-xs font-semibold tabular-nums leading-tight @min-[600px]:text-xl">
                <template v-if="cycle.networkValue !== null">₳{{ numeral(cycle.networkValue).format([1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(cycle.networkValue!) >= 10 * unit && Math.abs(cycle.networkValue!) < 100 * unit) ? '0.0a' : [1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(cycle.networkValue!) >= 100 * unit && Math.abs(cycle.networkValue!) < 1000 * unit) ? '0a' : '0.[00]a').toUpperCase() }}</template>
                  <template v-else>—</template>
              </span>
              <span class="text-[10px] opacity-60 @min-[600px]:text-xs">Value</span>
            </span>
            <span class="flex items-baseline justify-end gap-1 whitespace-nowrap @min-[600px]:gap-2">
              <span class="text-xs font-semibold tabular-nums leading-tight @min-[600px]:text-xl">
                <template v-if="cycle.growth !== null">{{ cycle.growth > 0 ? '+' : '' }}{{ numeral(cycle.growth).format('0.[0]%') }}</template>
                <template v-else>—</template>
              </span>
              <span class="text-[10px] opacity-60 @min-[600px]:text-xs">Growth</span>
            </span>
          </button>
          <div v-if="expandedCycle === cycle.number" class="grid grid-cols-1 gap-x-8 px-3 pb-5 @min-[600px]:grid-cols-2">
            <div
              v-for="(result, step) in cycle.steps"
              :key="step"
              class="min-w-0 border-t border-white/10 py-4 pl-3 break-words border-l-2"
              :class="cycle.number === resultsCycle && stepStarts[step] && !stepOutputs[step] ? 'border-l-argon-400 bg-argon-500/10 text-white' : 'border-l-transparent'"
            >
              <div class="text-base font-semibold leading-snug">
                <span class="mr-1 tabular-nums opacity-50">{{ step + 1 }}.</span>
                <template v-if="!result">{{ ['Calibrate Bid Expenses', 'Calibrate Vault Revenue', 'Distribute Payout to Vaults', 'Determine Demand', 'Determine Base Rewards', 'Distribute Payout to Miners'][step] }}</template>
                <template v-else>
                  {{ step === 2 || step === 5 ? 'Distributed' : step === 3 ? (result.output < 0 ? 'Decreased' : 'Increased') : 'Added' }}
                  <span class="tabular-nums">₳{{ numeral(Math.abs(result.output)).format([1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(Math.abs(result.output)) >= 10 * unit && Math.abs(Math.abs(result.output)) < 100 * unit) ? '0.0a' : [1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(Math.abs(result.output)) >= 100 * unit && Math.abs(Math.abs(result.output)) < 1000 * unit) ? '0a' : '0.[00]a').toUpperCase() }}</span>
                  {{ ['Bid Expenses', 'Vault Revenue', 'to Vaults', 'in Demand', 'Mining Rewards', 'to Miners'][step] }}
                </template>
              </div>
              <div v-if="result" class="mt-2 text-xs leading-relaxed opacity-70">
                <template v-if="step === 1">
                  Vault Revenue is ₳{{ numeral(result.totalRevenue).format([1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(result.totalRevenue) >= 10 * unit && Math.abs(result.totalRevenue) < 100 * unit) ? '0.0a' : [1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(result.totalRevenue) >= 100 * unit && Math.abs(result.totalRevenue) < 1000 * unit) ? '0a' : '0.[00]a').toUpperCase() }} ({{ numeral(result.share).format('0.[0]%') }} of Bids)
                </template>
                <template v-else-if="step === 4">
                  {{ numeral(result.miningArgon).format([1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(result.miningArgon) >= 10 * unit && Math.abs(result.miningArgon) < 100 * unit) ? '0.0a' : [1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(result.miningArgon) >= 100 * unit && Math.abs(result.miningArgon) < 1000 * unit) ? '0a' : '0.[00]a').toUpperCase() }} New Argons ({{ numeral(result.miningShare).format('0.[0]%') }})
                  + ₳{{ numeral(result.argonotRewardValue).format([1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(result.argonotRewardValue) >= 10 * unit && Math.abs(result.argonotRewardValue) < 100 * unit) ? '0.0a' : [1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(result.argonotRewardValue) >= 100 * unit && Math.abs(result.argonotRewardValue) < 1000 * unit) ? '0a' : '0.[00]a').toUpperCase() }} Argonot<template v-if="cycle.argonotRewardChange !== null"> ({{ cycle.argonotRewardChange > 0 ? '+' : '' }}{{ numeral(cycle.argonotRewardChange).format('0.[0]%') }})</template>
                </template>
                <template v-else>
                  {{ result.afterApy < result.beforeApy ? 'Dropped' : result.afterApy > result.beforeApy ? 'Increased' : 'Maintained' }}
                  {{ step === 0 || step === 5 ? 'Mining APY' : 'Vaulting APY' }}
                  <template v-for="(apy, index) in [result.beforeApy, result.afterApy]" :key="index">
                    {{ index ? 'to' : 'from' }} {{ numeral(apy).format([1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(apy) >= 10 * unit && Math.abs(apy) < 100 * unit) ? '0.0a' : [1e3, 1e6, 1e9, 1e12].some(unit => Math.abs(apy) >= 100 * unit && Math.abs(apy) < 1000 * unit) ? '0a' : '0.[00]a').toUpperCase() }}%
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref="chartRef" class="network-chart relative mr-[5.16%] ml-[3.56%] before:content-[''] before:pointer-events-none before:absolute before:left-[calc(4px-3.56cqw)] before:w-[calc(100cqw-8px)] before:border-[var(--engine-rule)] before:top-0 before:border-t">
        <h3
          class="text-inherit! font-bold! leading-[1.2]! pt-5 font-[Arial,Helvetica,sans-serif]!"
          style="font-size: 2.91cqw; margin: 4.51cqw 0 2.76cqw 1.27cqw"
        >Network Value Over Time</h3>
        <div class="chart-plot relative w-[101.83%] isolate">
          <svg
            class="w-full overflow-visible text-[22px]"
            v-for="chart in charts"
            :key="chart.mobile ? 'mobile' : 'desktop'"
            :class="chart.mobile ? 'mobile-chart hidden' : 'desktop-chart block'"
            :viewBox.attr="`0 0 ${chart.width} ${chart.height}`"
            role="img"
            aria-label="Network value by completed cycle"
          >
            <g class="chart-axis-labels fill-[#80788c]" text-anchor="end">
              <text
                v-for="fraction in chart.ticks"
                :key="fraction"
                :x.attr="chart.left - 8"
                :y.attr="chart.bottom - fraction * (chart.bottom - chart.top) + 5"
              >₳{{ numeral(chartMaximum * fraction / argonPriceUsd).format([1e3, 1e6, 1e9].some(unit => Math.abs(chartMaximum * fraction / argonPriceUsd) >= 10 * unit && Math.abs(chartMaximum * fraction / argonPriceUsd) < 100 * unit) ? '0.0a' : Math.abs(chartMaximum * fraction / argonPriceUsd) >= 1000 ? '0a' : '0.[0]a').toUpperCase() }}</text>
            </g>
            <path
              class="chart-axes fill-none stroke-[#8a8692] stroke-[1]"
              :d.attr="`M${chart.left} ${chart.top} V${chart.bottom} H${chart.right}`"
            />
            <polyline
              class="chart-line fill-none stroke-[#a1a3a3] stroke-[9] [stroke-linecap:butt]"
              :points.attr="chartValues.map((value, index) => `${chart.left + Math.min(index / chartLastCycle, 1) * (chart.right - chart.left)},${chart.bottom - Math.min(value / chartMaximum, 1) * (chart.bottom - chart.top)}`).join(' ')"
            />
            <g
              :transform.attr="`translate(${chart.left + Math.min((chartValues.length - 1) / chartLastCycle, 1) * (chart.right - chart.left)}, ${chart.bottom - Math.min(chartValues[chartValues.length - 1] / chartMaximum, 1) * (chart.bottom - chart.top)})`"
              aria-hidden="true"
            >
              <circle
                class="chart-end-pulse fill-[#a1a3a3] origin-top-left animate-[chart-end-pulse_1.8s_ease-out_infinite]"
                :r.attr="chart.mobile ? 6 : 10.5"
              />
              <circle class="chart-end fill-[#a1a3a3]" :r.attr="chart.mobile ? 4.5 : 7.5" />
            </g>
            <g class="chart-cycle-labels fill-[#80788c]" text-anchor="middle">
              <text
                v-for="cycle in chart.mobile ? mobileCycles : desktopCycles"
                :key="cycle"
                :x.attr="chart.left + cycle / chartLastCycle * (chart.right - chart.left)"
                :y.attr="chart.labelY"
                :text-anchor="cycle === 0 ? 'start' : cycle === chartLastCycle ? 'end' : 'middle'"
              >{{ cycle === 0 ? 'Start' : cycle }}</text>
            </g>
          </svg>
          <div
            v-if="isResizing"
            class="
              chart-resize-overlay absolute inset-0 z-1 grid place-items-center bg-gray-700/78
              text-[#d2c2d8] text-[clamp(18px,2.76cqw,38px)] font-bold tracking-[2px] transition-opacity
              duration-400 ease-[ease]
            "
            :class="resizeSettling ? 'opacity-0' : 'opacity-100'"
            role="status"
            aria-live="polite"
          >RESIZING</div>
        </div>
      </div>
    </div>
    <div
      v-if="loadError || isBlocked || frame?.stopReason === 'bitcoin-capacity' || isComplete"
      class="simulation-controls flex flex-wrap items-center gap-3 pt-3 text-sm"
    >
      <span v-if="loadError" role="alert">Network data could not be loaded. Please try again.</span>
      <span v-else-if="isBlocked" role="alert">{{ frame?.stopReason === 'no-progress' ? 'Simulation stopped: no further growth is possible.' : 'Simulation stopped at a calculation limit.' }} Reset to start again.</span>
      <span v-else-if="frame?.stopReason === 'bitcoin-capacity'" role="status">BTC capacity reached. Autoplay paused.</span>
      <span v-else-if="isComplete" role="status">Growth loop complete.</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import * as Vue from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from "reka-ui";
import numeral from "@/lib/numeral";
import Data from "@/lib/Data";
import { calculateAverageMiningBaseRewards, calculateVaultRevenueShare, createGrowthCycle } from "@/lib/exponentialTriggers";
import { createPlayback, iteratePlaybackStep, type PlaybackFrame, type PlaybackStep } from "@/lib/growthSimulatorPlayback";

gsap.registerPlugin(ScrollTrigger);

const engineRef = Vue.ref<HTMLElement | null>(null);
const chartRef = Vue.ref<HTMLElement | null>(null);
const headerRef = Vue.ref<HTMLElement | null>(null);
let headerContext: gsap.Context | undefined;
let layoutObserver: ResizeObserver | undefined;

const miningFormulaHovered = Vue.ref(false);
const miningFormulaFocused = Vue.ref(false);
const tooltipReference = Vue.shallowRef<{ getBoundingClientRect: () => DOMRect }>();

function trackTooltipPointer(event: PointerEvent) {
  if (event.pointerType === "touch") return;
  const { clientX, clientY } = event;
  tooltipReference.value = {
    getBoundingClientRect: () => new DOMRect(clientX, clientY, 0, 0),
  };
}

const frame = Vue.shallowRef<PlaybackFrame | null>(null);
const animation = Vue.shallowRef<{ from: PlaybackFrame; to: PlaybackFrame } | null>(null);
const progress = Vue.ref(0);
const miningStepStart = Vue.shallowRef<{ apy: number; bidCosts: number } | null>(null);
const completedBidImpact = Vue.shallowRef<{ amount: number; beforeApy: number; afterApy: number } | null>(null);
const completedRevenueBreakdown = Vue.shallowRef<{ bids: number; revenue: number; share: number } | null>(null);
const sourceValues = Vue.shallowRef<Partial<Pick<PlaybackFrame, "bidCosts" | "revenue" | "newArgon" | "miningRewards">>>({});
const isLoading = Vue.ref(false);
const loadError = Vue.ref(false);
const isRunning = Vue.ref(false);
const isPlaying = Vue.ref(false);
const isResizing = Vue.ref(false);
const resizeSettling = Vue.ref(false);
const chartMaximum = Vue.ref(50_000_000);
const chartLastCycle = Vue.ref(10);
let resizeTimer: number | undefined;
let resizeEndTimer: number | undefined;
let resizeAnimationFrame: number | undefined;
const upperPath = Vue.ref<SVGPathElement | null>(null);
const lowerPath = Vue.ref<SVGPathElement | null>(null);
let iterator: ReturnType<typeof iteratePlaybackStep> | undefined;
let animationFrame: number | undefined;
let playbackTimer: number | undefined;
let generation = 0;
let pauseRequested = false;
let reducedMotion: MediaQueryList | undefined;
const numericFields = ["miningApy", "vaultingApy", "bidCosts", "revenue", "newArgon", "miningRewards", "networkValue", "operatorValue"] as const;
const display = Vue.computed(() => {
  if (!animation.value) return frame.value;
  const { from, to } = animation.value;
  const value = { ...from, cycleDays: to.cycleDays };
  const fraction = 1 - (1 - progress.value) ** 3;
  for (const key of numericFields) value[key] = from[key] + (to[key] - from[key]) * fraction;
  return value;
});
const stepStarts = Vue.shallowRef<Partial<Record<PlaybackStep, PlaybackFrame>>>({});
const stepOutputs = Vue.shallowRef<Partial<Record<PlaybackStep, PlaybackFrame>>>({});
const resultsCycle = Vue.ref(1);
const resultRows = Vue.computed(() => Array.from({ length: 6 }, (_, index) => {
  const step = index as PlaybackStep;
  const before = stepStarts.value[step];
  const after = stepOutputs.value[step] ?? (frame.value?.step === step ? display.value : null);
  if (!before || !after) return null;
  const price = after.state.argonPriceUsd || 1;
  const argonotRewardValue = after.demandArgonot * after.state.argonotPriceUsd / price;
  const totalRewards = after.demandMiningArgon + argonotRewardValue;
  const totalNewArgon = after.demandMiningArgon + after.demandBitcoinArgon;
  const demand = totalNewArgon + after.demandArgonotValueChange;
  const share = calculateVaultRevenueShare(after.state);
  const output = [after.bidCosts / price, after.revenue / price, before.revenue / price, demand, totalRewards, totalRewards][step];
  return {
    output,
    totalRevenue: after.state.miningAuctionRevenue * share,
    share,
    miningArgon: after.demandMiningArgon,
    miningShare: totalNewArgon > 0 ? after.demandMiningArgon / totalNewArgon : 0,
    argonotRewardValue,
    beforeApy: step === 0 || step === 5 ? before.miningApy : before.vaultingApy,
    afterApy: step === 0 || step === 5 ? after.miningApy : after.vaultingApy,
  };
}));
const previousCycleResults = Vue.shallowRef<Array<{ number: number; networkValue: number | null; steps: typeof resultRows.value }>>([]);
const expandedCycle = Vue.ref<number | null>(null);
const startingNetworkValue = Vue.ref<number | null>(null);
const cycleResults = Vue.computed(() => [
  ...previousCycleResults.value,
  { number: resultsCycle.value, steps: resultRows.value, networkValue: display.value ? display.value.networkValue / (display.value.state.argonPriceUsd || 1) : null },
].map((cycle, index, cycles) => {
  const previousValue = index > 0 ? cycles[index - 1].networkValue : startingNetworkValue.value;
  return {
    ...cycle,
    argonotRewardChange: index > 0 && cycles[index - 1].steps[4]?.argonotRewardValue && cycle.steps[4]
      ? cycle.steps[4].argonotRewardValue / cycles[index - 1].steps[4]!.argonotRewardValue - 1
      : null,
    growth: previousValue && cycle.networkValue !== null ? cycle.networkValue / previousValue - 1 : null,
  };
}));
const argonPriceUsd = Vue.computed(() => display.value?.state.argonPriceUsd || 1);
const revenueBreakdown = Vue.computed(() => {
  const transferringBids = animation.value?.from.step === 1;
  const transfer = transferringBids ? animation.value?.to : frame.value;
  if (!transfer || transfer.bidCosts <= 0 || (!transferringBids && transfer.step < 2)) return completedRevenueBreakdown.value;
  return {
    bids: transfer.bidCosts / argonPriceUsd.value,
    revenue: transfer.revenue / argonPriceUsd.value,
    share: transfer.revenue / transfer.bidCosts,
  };
});
const rewardDenominations = Vue.computed(() => ({
  newArgon: [1e12, 1e9, 1e6, 1e3].find(unit => Math.abs(sourceValues.value.newArgon ?? display.value?.newArgon ?? 0) >= unit) ?? 1,
  miningRewards: [1e12, 1e9, 1e6, 1e3].find(unit => Math.abs((sourceValues.value.miningRewards ?? display.value?.miningRewards ?? 0) / argonPriceUsd.value) >= unit) ?? 1,
}));
const bidImpact = Vue.computed(() => {
  if (!miningStepStart.value || frame.value?.step !== 0) return completedBidImpact.value;
  return {
    amount: ((display.value?.bidCosts ?? 0) - miningStepStart.value.bidCosts) / argonPriceUsd.value,
    beforeApy: miningStepStart.value.apy,
    afterApy: display.value?.miningApy ?? miningStepStart.value.apy,
  };
});
const miningTotals = Vue.computed(() => {
  const state = display.value?.state;
  if (!state || state.argonPriceUsd <= 0) return { totalReceived: 0, bids: 0 };
  const issuedRewards = state.miningCohortMintedArgons.reduce((total, amount) => total + amount, 0);
  const argonRewards = calculateAverageMiningBaseRewards(state) + issuedRewards + state.pendingMiningMint;
  const argonotPriceInArgons = state.argonotPriceUsd / state.argonPriceUsd;
  const returnedBidCapital = state.argonotsBidPerSeat * state.seatCount * argonotPriceInArgons;
  return {
    totalReceived: argonRewards + state.baseArgonotRewards * argonotPriceInArgons + returnedBidCapital,
    bids: state.miningAuctionRevenue + returnedBidCapital,
  };
});
const history = Vue.computed(() => frame.value?.history ?? [0]);
const chartValues = Vue.computed(() => [history.value[0], ...history.value]);
const baseValue = Vue.computed(() => history.value[0]);
const isBlocked = Vue.computed(() => frame.value?.stopReason === "no-progress" || frame.value?.stopReason === "invalid-state");
const isComplete = Vue.computed(() => frame.value?.step === 0 && frame.value.state.status === "returns-normalized");
const charts = [
  { mobile: false, width: 1278, height: 610, left: 107, right: 1269, top: 16, bottom: 512, labelY: 559, ticks: [0, .2, .4, .6, .8, 1] },
  { mobile: true, width: 320, height: 230, left: 60, right: 308, top: 16, bottom: 188, labelY: 214, ticks: [0, .5, 1] },
];
const desktopCycles = Vue.computed(() => cycleTicks(10));
const mobileCycles = Vue.computed(() => cycleTicks(5));
const particles = Vue.computed(() => {
  const path = frame.value?.step === 1 ? upperPath.value : frame.value?.step === 4 ? lowerPath.value : null;
  if (!isRunning.value || !path || reducedMotion?.matches) return [];
  return [0, 1, 2].map(index => {
    const fraction = Math.max(0, Math.min(1, progress.value * 1.4 - index * .2));
    const point = path.getPointAtLength(path.getTotalLength() * fraction);
    return { x: point.x, y: point.y, opacity: fraction > 0 && fraction < 1 ? 1 : 0 };
  });
});

function cycleTicks(intervals: number) {
  const last = chartLastCycle.value;
  return [...new Set(Array.from({ length: Math.min(last, intervals) + 1 }, (_, index) => Math.round(index * last / Math.max(1, Math.min(last, intervals)))))];
}

function canRun(step: PlaybackStep) {
  return !!frame.value && frame.value.step === step && !isRunning.value && !isPlaying.value && !isLoading.value && !isBlocked.value && !isComplete.value;
}

function stepClasses(step: PlaybackStep) {
  const ready = frame.value?.step === step && !isBlocked.value && !isComplete.value;
  const running = frame.value?.step === step && isRunning.value;
  const receiving = isRunning.value && frame.value?.step === (step + 5) % 6;
  const clickable = canRun(step);
  const selected = clickable || running;
  const transferring = running || receiving;
  const inFront = clickable || running || receiving;
  const isApy = step === 0 || step === 3;

  return {
    ready,
    running,
    receiving,
    // Selected senders have a colored background and a black border.
    'bg-[#ae10b4] border-black': selected,
    'bg-[var(--engine-background)]': !selected,
    'border-[#e492f5]': !selected && (ready || receiving),
    'border-[#74727e]': !selected && !ready && !receiving,
    // Selected text is white; receiving text stays highlighted.
    'text-white!': selected,
    'text-[#e492f5]!': receiving && !selected,
    'text-[var(--engine-text)]!': !transferring && !selected && isApy,
    'text-[#a39aaa]!': !transferring && !clickable && !isApy,
    // Keep active boxes above their neighbors in both layouts.
    'z-3!': inFront && isApy,
    'z-5!': inFront && !isApy,
    'z-2': !inFront && isApy,
    'z-1! opacity-50': !inFront && !isApy,
    'opacity-100': inFront && !isApy,
    behind: !inFront && !isApy,
  };
}

function stopPlayback() {
  isPlaying.value = false;
  pauseRequested = true;
  window.clearTimeout(playbackTimer);
}

async function loadNetworkData() {
  isLoading.value = true;
  stopPlayback();
  cancelChartResize();
  window.cancelAnimationFrame(animationFrame ?? 0);
  iterator = undefined;
  sourceValues.value = {};
  miningStepStart.value = null;
  completedBidImpact.value = null;
  completedRevenueBreakdown.value = null;
  stepStarts.value = {};
  stepOutputs.value = {};
  resultsCycle.value = 1;
  previousCycleResults.value = [];
  expandedCycle.value = null;
  startingNetworkValue.value = null;
  animation.value = null;
  isRunning.value = false;
  loadError.value = false;
  const currentGeneration = ++generation;
  try {
    const data = await Data.fetchBasics();
    if (currentGeneration !== generation) return;
    const initial = createPlayback(createGrowthCycle(data));
    chartLastCycle.value = 10;
    chartMaximum.value = Math.max(50_000_000, Math.round(initial.networkValue * 5 / 50_000_000) * 50_000_000);
    startingNetworkValue.value = initial.networkValue / (initial.state.argonPriceUsd || 1);
    frame.value = initial;
  } catch {
    if (currentGeneration === generation) loadError.value = true;
  } finally {
    if (currentGeneration === generation) isLoading.value = false;
  }
}

function runStep() {
  if (!frame.value || isRunning.value || isLoading.value || isBlocked.value || isComplete.value) return;
  pauseRequested = false;
  isRunning.value = true;
  if (!iterator) {
    if (frame.value.step === 0) {
      if (resultsCycle.value <= frame.value.completedCycles) {
        previousCycleResults.value = [...previousCycleResults.value, {
          number: resultsCycle.value,
          networkValue: frame.value.networkValue / (frame.value.state.argonPriceUsd || 1),
          steps: resultRows.value,
        }];
      }
      stepStarts.value = {};
      stepOutputs.value = {};
      resultsCycle.value = frame.value.completedCycles + 1;
      expandedCycle.value = resultsCycle.value;
      frame.value = { ...frame.value, bidCosts: 0 };
      miningStepStart.value = { apy: frame.value.miningApy, bidCosts: 0 };
    }
    sourceValues.value = frame.value.step === 1 ? { bidCosts: frame.value.bidCosts }
      : frame.value.step === 2 ? { revenue: frame.value.revenue }
      : frame.value.step === 4 ? { newArgon: frame.value.newArgon }
      : frame.value.step === 5 ? { miningRewards: frame.value.miningRewards } : {};
    stepStarts.value = { ...stepStarts.value, [frame.value.step]: frame.value };
    iterator = iteratePlaybackStep(frame.value);
  }
  advanceFrame();
}

function advanceFrame() {
  if (!iterator || !frame.value) return;
  try {
    const next = iterator.next();
    if (next.done) {
      stepOutputs.value = { ...stepOutputs.value, [frame.value.step]: next.value };
      if (frame.value.step === 0 && miningStepStart.value) {
        completedBidImpact.value = {
          amount: (next.value.bidCosts - miningStepStart.value.bidCosts) / argonPriceUsd.value,
          beforeApy: miningStepStart.value.apy,
          afterApy: next.value.miningApy,
        };
      }
      if (frame.value.step === 1 && next.value.bidCosts > 0) {
        completedRevenueBreakdown.value = {
          bids: next.value.bidCosts / argonPriceUsd.value,
          revenue: next.value.revenue / argonPriceUsd.value,
          share: next.value.revenue / next.value.bidCosts,
        };
      }
      const cycleCompleted = next.value.completedCycles > frame.value.completedCycles;
      if (cycleCompleted) miningStepStart.value = null;
      frame.value = next.value;
      iterator = undefined;
      isRunning.value = false;
      if (cycleCompleted || isBlocked.value || isComplete.value || frame.value.stopReason) stopPlayback();
      if (isPlaying.value) playbackTimer = window.setTimeout(runStep, 0);
      return;
    }
    animation.value = { from: frame.value, to: next.value };
    progress.value = 0;
    const duration = reducedMotion?.matches ? 0 : frame.value.step === 0 || frame.value.step === 3 ? 220 : 1400;
    const startedAt = performance.now();

    const tick = (now: number) => {
      progress.value = duration === 0 ? 1 : Math.min(1, (now - startedAt) / duration);
      if (progress.value < 1) {
        animationFrame = window.requestAnimationFrame(tick);
        return;
      }
      frame.value = next.value;
      animation.value = null;
      if (pauseRequested && (frame.value.step === 0 || frame.value.step === 3)) {
        isRunning.value = false;
      } else {
        animationFrame = window.requestAnimationFrame(advanceFrame);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);
  } catch {
    frame.value = { ...frame.value, stopReason: "invalid-state" };
    animation.value = null;
    iterator = undefined;
    isRunning.value = false;
    stopPlayback();
  }
}

function togglePlayback() {
  if (isRunning.value || isPlaying.value) {
    stopPlayback();
    return;
  }
  if (!frame.value || isLoading.value || isBlocked.value || isComplete.value) return;
  isPlaying.value = true;
  runStep();
}

function cancelChartResize() {
  window.cancelAnimationFrame(resizeAnimationFrame ?? 0);
  window.clearTimeout(resizeTimer);
  window.clearTimeout(resizeEndTimer);
  isResizing.value = false;
  resizeSettling.value = false;
}

function resizeChart() {
  if (isLoading.value || isResizing.value) return;
  const lastCycle = chartValues.value.length - 1;
  const peak = Math.max(...history.value);
  let nextX = chartLastCycle.value;
  let nextY = chartMaximum.value;
  while (lastCycle >= nextX) nextX *= 2;
  while (peak >= nextY) nextY *= 3;
  if (nextX === chartLastCycle.value && nextY === chartMaximum.value) return;
  const resizeGeneration = generation;
  isResizing.value = true;
  resizeSettling.value = false;
  resizeTimer = window.setTimeout(() => {
    if (resizeGeneration !== generation) return;
    const startX = chartLastCycle.value;
    const startY = chartMaximum.value;
    const startedAt = performance.now();

    const tick = (now: number) => {
      if (resizeGeneration !== generation) return;
      const elapsed = Math.min(1, (now - startedAt) / 2400);
      const fraction = reducedMotion?.matches ? 1 : elapsed * elapsed * (3 - 2 * elapsed);
      chartLastCycle.value = startX + (nextX - startX) * fraction;
      chartMaximum.value = startY + (nextY - startY) * fraction;
      if (elapsed < 1) {
        resizeAnimationFrame = window.requestAnimationFrame(tick);
        return;
      }
      resizeSettling.value = true;
      resizeEndTimer = window.setTimeout(() => {
        if (resizeGeneration !== generation) return;
        isResizing.value = false;
        resizeSettling.value = false;
        resizeChart();
      }, 400);
    };

    resizeAnimationFrame = window.requestAnimationFrame(tick);
  }, 400);
}

Vue.watch(history, resizeChart, { flush: "sync" });

function handleVisibilityChange() {
  if (document.hidden) stopPlayback();
}

Vue.onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.addEventListener("visibilitychange", handleVisibilityChange);
  loadNetworkData();
  headerContext = gsap.context(() => {
    ScrollTrigger.create({
      trigger: headerRef.value,
      start: "top 10px",
      endTrigger: chartRef.value,
      end: () => `top top+=${headerRef.value!.offsetHeight + 10}px`,
      pin: headerRef.value,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });
  }, engineRef.value!);
  layoutObserver = new ResizeObserver(() => ScrollTrigger.refresh());
  layoutObserver.observe(engineRef.value!);
});

Vue.onBeforeUnmount(() => {
  layoutObserver?.disconnect();
  headerContext?.revert();
  ++generation;
  stopPlayback();
  cancelChartResize();
  window.cancelAnimationFrame(animationFrame ?? 0);
  iterator = undefined;
  document.removeEventListener("visibilitychange", handleVisibilityChange);
});
</script>

<style scoped>
@container (max-width: 760px) {
  .simulation-engine {
    aspect-ratio: auto;
    overflow: visible;
    padding: 0 clamp(12px, 4cqw, 28px) 20px;
    border-radius: 20px;
  }

  .engine-header-slot,
  .network-summary,
  .growth-loop,
  .network-chart {
    position: relative;
    inset: auto;
    width: auto;
    height: auto;
  }

  .engine-header-slot {
    margin-inline: calc(-1 * clamp(12px, 4cqw, 28px));
  }

  .engine-header {
    height: auto;
    flex-wrap: wrap;
    gap: 8px 16px;
    padding: 18px clamp(12px, 4cqw, 28px);
    border-radius: 20px 20px 0 0;
  }

  .engine-header h2 {
    font-size: clamp(22px, 4.5cqw, 30px) !important;
  }

  .header-actions > span {
    padding: 0;
    font-size: 14px;
  }

  .cycle-results,
  .network-chart {
    margin-inline: 0;
  }

  .network-summary::before,
  .network-chart::before {
    left: calc(4px - clamp(12px, 4cqw, 28px));
  }

  .network-summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px 12px;
    padding: 24px 0;
  }

  .network-summary > .summary-metric:first-child {
    grid-column: 1 / -1;
  }

  .operator-metric button > span {
    font-size: 14px;
  }

  .summary-metric {
    min-width: 0;
    padding: 0;
    gap: 8px;
    text-align: center;
  }

  .summary-metric strong {
    font-size: clamp(24px, 5.3cqw, 36px);
    overflow-wrap: anywhere;
  }

  .summary-metric > span {
    max-width: 180px;
    font-size: 14px;
    line-height: 1.4;
  }

  .growth-loop {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
    max-width: 460px;
    margin: 32px auto;
    padding: 0 0 0 24px;
  }

  .transfer-paths {
    display: none;
  }

  .growth-loop::before {
    content: '';
    position: absolute;
    inset: 56px 50% 26px auto;
    margin-right: -12px;
    border-left: 3px dashed #777681;
  }

  .growth-loop::after {
    content: '';
    position: absolute;
    inset: 56px 50% 26px 0;
    border: 3px dashed #777681;
    border-right: 0;
    border-radius: 16px 0 0 16px;
  }

  .growth-loop button {
    position: relative;
    inset: auto;
    width: 100%;
    height: auto;
    min-height: 52px;
    border-radius: 12px;
  }

  .flow-box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 8px !important;
    font-size: calc(clamp(15px, 3.35cqw, 19px) - 1pt);
    color: #a39aaa;
    z-index: 2;
  }

  .bid-costs {
    grid-row: 2;
    color: #e492f5;
  }

  .revenue {
    grid-row: 3;
  }

  .new-argon {
    grid-row: 6;
  }

  .mining-rewards {
    grid-row: 7;
  }

  .apy-box {
    min-height: 112px !important;
    padding: 16px 8px !important;
    gap: clamp(8px, 3cqw, 20px);
  }

  .mining-apy {
    grid-row: 1;
  }

  .vaulting-apy {
    grid-row: 5;
  }

  .apy-metric {
    gap: 8px;
  }

  .apy-metric strong {
    font-size: clamp(23px, 5.5cqw, 34px);
  }

  .apy-metric > span,
  .vaulting-apy .apy-metric > span {
    padding: 0;
    font-size: 14px;
  }

  .formula {
    margin: 0;
    font-size: clamp(20px, 4.5cqw, 28px);
    flex-shrink: 0;
  }

  .formula > span:first-child {
    padding: 0 4px 4px;
    white-space: nowrap;
  }

  .formula > span:last-child {
    padding-top: 4px;
  }

  .growth-loop .autoplay-control {
    inset: auto;
    grid-row: 4;
    justify-self: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  .autoplay-control::before {
    display: none;
  }

  .apy-box::after,
  .flow-box:not(.mining-rewards)::after {
    content: '';
    position: absolute;
    bottom: -22px;
    left: calc(50% - 6px);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #777681;
  }

  .mining-apy::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 49px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 8px solid #777681;
  }

  .network-chart {
    padding-top: 24px;
  }

  .network-chart h3 {
    margin: 0 0 20px !important;
    font-size: clamp(20px, 4cqw, 26px) !important;
  }

  .network-chart .desktop-chart {
    display: none;
  }

  .chart-plot {
    width: 100%;
  }

  .network-chart .mobile-chart {
    display: block;
    width: 100%;
    max-width: 460px;
    margin: auto;
    font-size: 14px;
  }

  .mobile-chart .chart-line {
    stroke-width: 3;
  }
}

@container (max-width: 340px) {
  .network-summary {
    grid-template-columns: 1fr;
  }

  .summary-metric strong {
    font-size: 30px;
  }

  .apy-box {
    flex-wrap: wrap;
  }
}

@media (hover: hover) {
  .autoplay-control:enabled:hover svg {
    color: #e492f5;
  }

  .growth-loop .ready:enabled:hover {
    background: #bd28c2;
  }
}

@container (max-width: 760px) {
  .growth-loop[data-step="1"] .bid-costs.running::before,
  .growth-loop[data-step="4"] .new-argon.running::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    left: calc(50% - 4px);
    bottom: -8px;
    border-radius: 50%;
    background: #e492f5;
    animation: mobile-flow .45s linear infinite;
  }
}

@keyframes mobile-flow {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(20px);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .chart-resize-overlay {
    transition: none;
  }

  .chart-end-pulse {
    animation: none;
    display: none;
  }

  .growth-loop .flow-box.running::before {
    animation: none;
    display: none;
  }
}
</style>

<!-- Tailwind animation utilities reference these global keyframe names. -->
<style>
@keyframes selected-text-scale {
  0%, 100% {
    scale: 1;
  }
  50% {
    scale: 1.04;
  }
}

@keyframes chart-end-pulse {
  from {
    transform: scale(1);
    opacity: .6;
  }
  to {
    transform: scale(2.4);
    opacity: 0;
  }
}
</style>
