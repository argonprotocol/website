<template>
  <section class="my-8 overflow-hidden rounded-xl border border-slate-700 bg-slate-950 text-white shadow-xl shadow-argon-900/10" aria-labelledby="death-spiral-title">
    <div class="border-b border-white/10 px-5 py-5 sm:px-7">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div class="text-xs font-bold tracking-[0.16em] text-argon-300 uppercase">Death-spiral recovery console</div>
          <h3 id="death-spiral-title" class="!mt-1 !mb-0 text-5xl! font-sans! font-black !text-white">Collapse the Argon</h3>
        </div>
        <div class="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs" :class="hasStarted ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200' : 'border-slate-600 bg-slate-800/60 text-slate-400'">
          <span class="size-2 rounded-full" :class="hasStarted ? 'bg-emerald-400 shadow-[0_0_10px_theme(colors.emerald.400)]' : 'bg-slate-500'" aria-hidden="true"></span>
          <template v-if="hasStarted">Network Data · {{ dayjs(data.lastUpdatedAt).format('MMM D, YYYY') }}</template>
          <template v-else>Awaiting Network Data</template>
        </div>
      </div>
      <p class="mt-3 mb-0 text-sm text-slate-400">
        Load the network data, simulate a demand shock, and step through the simulated recovery.
      </p>
    </div>

    <div>
      <article class="px-5 py-5 sm:px-7">
        <div v-if="hasStarted" class="flex items-start justify-between gap-4">
          <div class="flex min-w-0 items-start gap-3">
            <span class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-sm font-bold text-emerald-300">
              <span v-if="isRunning && currentStep === 0" class="size-2.5 animate-pulse rounded-full bg-argon-300" aria-hidden="true"></span>
              <span v-else-if="hasStarted" aria-hidden="true">✓</span>
              <span v-else class="size-2 rounded-full border border-slate-500" aria-hidden="true"></span>
            </span>
            <div>
              <div class="text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase">01 · Initialize</div>
              <div class="mt-1 font-bold tracking-wide text-white">
                <template v-if="isRunning && currentStep === 0">Reading network state…</template>
                <template v-else>Baseline established</template>
              </div>
            </div>
          </div>
          <div v-if="hasStarted" class="flex shrink-0 gap-2">
            <button type="button" class="group relative flex size-8 items-center justify-center rounded-md border border-white/15 text-sm font-bold text-slate-300 transition-colors hover:border-argon-400 hover:text-argon-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-argon-300" aria-label="View baseline calculation">
              ƒx
              <span role="tooltip" class="pointer-events-none absolute top-full right-0 z-20 mt-2 hidden w-80 max-w-[calc(100vw-4rem)] rounded-lg border border-white/15 bg-slate-800 p-3 text-left font-mono text-xs leading-relaxed font-normal text-slate-300 shadow-2xl group-hover:block group-focus-visible:block">
                Vault value of ${{ data.vaulting.valueInVaults.toLocaleString() }} ÷ ${{ data.usdTargetForArgon.toFixed(3) }} ≈ {{ Math.round(bitcoinBurnCapacityAtTarget).toLocaleString() }} ARGN of burn capacity at the target price.
              </span>
            </button>
          </div>
        </div>

        <div class="mt-4 ml-10 grid gap-2 font-mono text-sm">
          <div v-if="revealedLines[0] >= 1" class="flex justify-between gap-4"><span class="text-slate-400">Target Price</span><span class="text-white">${{ data.usdTargetForArgon.toFixed(3) }}</span></div>
          <div v-if="revealedLines[0] >= 2" class="flex justify-between gap-4"><span class="text-slate-400">Market Price</span><span class="text-white">${{ data.usdTargetForArgon.toFixed(3) }}</span></div>
          <div v-if="revealedLines[0] >= 3" class="flex justify-between gap-4"><span class="text-slate-400">Circulation Supply</span><span class="text-white">{{ Math.round(initialCirculation).toLocaleString() }} ARGN</span></div>
          <div v-if="revealedLines[0] >= 4" class="flex justify-between gap-4"><span class="text-slate-400">Circulation Demand</span><span class="text-white">{{ Math.round(initialCirculation).toLocaleString() }} ARGN</span></div>
          <div v-if="revealedLines[0] >= 5" class="flex justify-between gap-4"><span class="text-slate-400">BTC Locked In Vaults</span><span class="text-amber-200">{{ data.vaulting.bitcoinLocked.toFixed(3) }} BTC</span></div>
          <div v-if="revealedLines[0] >= 6" class="flex justify-between gap-4"><span class="text-slate-400">Burn Capacity Of BTC</span><span class="text-argon-200">{{ Math.round(bitcoinBurnCapacityAtTarget).toLocaleString() }} ARGN</span></div>
        </div>

        <div v-if="panels[0] === 'chart' && isChartReady(0)" class="mt-4 ml-10 rounded-md border border-white/10 bg-black/25 p-3">
          <svg viewBox="0 0 600 170" class="block h-auto w-full" role="img" :aria-label="currentStep >= 1 ? 'Argon price collapsing from the target to one tenth of one cent' : 'Stable Argon price at the target'">
            <line x1="38" y1="156" x2="580" y2="156" class="stroke-slate-700" />
            <line x1="38" y1="55" x2="580" y2="55" class="stroke-slate-700" stroke-dasharray="5 6" />
            <text x="31" y="59" text-anchor="end" class="fill-slate-400 text-[11px]">${{ data.usdTargetForArgon.toFixed(3) }}</text>
            <text v-if="currentStep >= 1" x="31" y="155" text-anchor="end" class="fill-slate-500 text-[11px]">$0.001</text>
            <path :d="chartPath(currentStep >= 1 ? 1 : 0)" fill="none" class="stroke-argon-400" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
            <circle v-if="currentStep === 0 && !isRunning" cx="205" cy="55" r="7" class="fill-white stroke-argon-300 drop-shadow-[0_0_5px_rgba(217,70,239,0.9)]" stroke-width="2" />
            <circle v-if="currentStep >= 1" cx="205" cy="55" r="4" class="fill-slate-950 stroke-argon-300" stroke-width="1.5" />
            <circle v-if="isRunning && currentStep <= 1 && (currentStep === 0 || chartAnimationProgress < 1)" :cx="markerX" :cy="markerY" r="8" class="fill-white stroke-argon-400 drop-shadow-[0_0_5px_rgba(217,70,239,0.9)]" stroke-width="2" />
            <circle v-if="currentStep >= 1 && (currentStep > 1 || !isRunning || chartAnimationProgress >= 1)" cx="270" cy="150" r="7" class="fill-white stroke-argon-300 drop-shadow-[0_0_5px_rgba(217,70,239,0.9)]" stroke-width="2" />
          </svg>
        </div>

        <div v-if="currentStep === 0 && !isRunning && !hasStarted" class="ml-10 flex items-center justify-between gap-4 pb-2">
          <span class="font-mono text-sm text-slate-400 motion-safe:animate-pulse">Ready to load network data...</span>
          <button type="button" class="rounded-lg bg-argon-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-argon-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-argon-300" @click="loadNetworkData">
            Load Network Data
          </button>
        </div>

        <div v-if="hasStarted && ((!isRunning && currentStep === 0) || (currentStep === 1 && !demandDetailsVisible))" class="mt-5 ml-10 flex items-center justify-between gap-4 pt-2 pb-2">
          <span class="font-mono text-sm text-slate-400 motion-safe:animate-pulse">Network baseline ready...</span>
          <button type="button" class="rounded-lg bg-argon-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-argon-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-argon-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400" :disabled="currentStep !== 0 || isRunning" @click="advance">
            Simulate Demand Shock
          </button>
        </div>
      </article>

      <article v-if="demandDetailsVisible" class="px-5 py-5 sm:px-7">
        <div class="flex items-start justify-between gap-4">
          <div class="flex min-w-0 items-start gap-3">
            <span class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-rose-400/40 bg-rose-400/10 text-sm font-bold text-rose-300">
              <span aria-hidden="true">!</span>
            </span>
            <div>
              <div class="text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase">02 · Market event</div>
              <div class="mt-1 font-bold tracking-wide text-white" aria-live="polite">
                Demand Shock Detected
              </div>
            </div>
          </div>
          <div class="flex shrink-0 gap-2">
            <button type="button" class="group relative flex size-8 items-center justify-center rounded-md border border-white/15 text-sm font-bold text-slate-300 transition-colors hover:border-argon-400 hover:text-argon-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-argon-300" aria-label="View demand shock calculation">
              ƒx
              <span role="tooltip" class="pointer-events-none absolute top-full right-0 z-20 mt-2 hidden w-80 max-w-[calc(100vw-4rem)] rounded-lg border border-white/15 bg-slate-800 p-3 text-left font-mono text-xs leading-relaxed font-normal text-slate-300 shadow-2xl group-hover:block group-focus-visible:block">
                Demand-equivalent circulation = {{ Math.round(initialCirculation).toLocaleString() }} × $0.001 ÷ ${{ data.usdTargetForArgon.toFixed(3) }} = {{ Math.round(equilibriumCirculation).toLocaleString() }} ARGN<br />
                Required burn = {{ Math.round(initialCirculation).toLocaleString() }} − {{ Math.round(equilibriumCirculation).toLocaleString() }} = {{ Math.round(requiredBurn).toLocaleString() }} ARGN
              </span>
            </button>
          </div>
        </div>

        <div class="mt-4 ml-10 grid gap-2 font-mono text-sm">
          <div v-if="revealedLines[1] >= 1" class="flex justify-between gap-4"><span class="text-slate-400">Previous Market Price</span><span class="text-white">${{ data.usdTargetForArgon.toFixed(4) }}</span></div>
          <div v-if="revealedLines[1] >= 2" class="flex justify-between gap-4"><span class="text-slate-400">Collapsed Market Price</span><span class="text-rose-300">${{ currentPrice.toFixed(4) }}</span></div>
          <div v-if="revealedLines[1] >= 3" class="flex justify-between gap-4"><span class="text-slate-400">Circulation Supply</span><span class="text-white">{{ Math.round(initialCirculation).toLocaleString() }} ARGN</span></div>
          <div v-if="revealedLines[1] >= 4" class="flex justify-between gap-4"><span class="text-slate-400">Circulation Demand</span><span class="text-white">{{ Math.round(equilibriumCirculation).toLocaleString() }} ARGN</span></div>
          <div v-if="revealedLines[1] >= 5" class="flex justify-between gap-4"><span class="text-slate-400">Excess Circulation</span><span class="text-rose-300">{{ Math.round(requiredBurn).toLocaleString() }} ARGN</span></div>
          <div v-if="revealedLines[1] >= 6" class="mt-1 border-l-2 border-slate-700 pl-3 text-xs leading-relaxed text-slate-500">
            {{ Math.round(initialCirculation).toLocaleString() }} × $0.001 ÷ ${{ data.usdTargetForArgon.toFixed(3) }} ≈ {{ Math.round(equilibriumCirculation).toLocaleString() }} ARGN supported at target
          </div>
        </div>

        <div v-if="currentStep === 1 && !isRunning" class="mt-5 ml-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
          <span class="font-mono text-sm text-slate-400 motion-safe:animate-pulse">Demand shock simulation complete...</span>
          <button type="button" class="rounded-lg bg-argon-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-argon-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-argon-300" @click="advance">
            Check Recovery Capacity
          </button>
        </div>
      </article>

      <article v-if="currentStep >= 2" class="border-t border-white/10 px-5 py-5 sm:px-7">
        <div class="flex items-start justify-between gap-4">
          <div class="flex min-w-0 items-start gap-3">
            <span class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 text-sm font-bold text-amber-200">
              <span v-if="isRunning && currentStep === 2" class="size-2.5 animate-pulse rounded-full bg-amber-300" aria-hidden="true"></span>
              <span v-else aria-hidden="true">✓</span>
            </span>
            <div>
              <div class="text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase">03 · Stabilization check</div>
              <div class="mt-1 font-bold tracking-wide text-white" aria-live="polite">
                <template v-if="isRunning && currentStep === 2">Confirming Recovery Capacity…</template>
                <template v-else>Recovery Capacity Confirmed</template>
              </div>
            </div>
          </div>
          <div class="flex shrink-0 gap-2">
            <button type="button" class="group relative flex size-8 items-center justify-center rounded-md border border-white/15 text-sm font-bold text-slate-300 transition-colors hover:border-argon-400 hover:text-argon-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-argon-300" aria-label="View recovery capacity calculation">
              ƒx
              <span role="tooltip" class="pointer-events-none absolute top-full right-0 z-20 mt-2 hidden w-80 max-w-[calc(100vw-4rem)] rounded-lg border border-white/15 bg-slate-800 p-3 text-left font-mono text-xs leading-relaxed font-normal text-slate-300 shadow-2xl group-hover:block group-focus-visible:block">
                Bitcoin required = required burn ÷ total burn capacity × Bitcoin locked<br />
                {{ Math.round(requiredBurn).toLocaleString() }} ÷ {{ Math.round(data.vaulting.argonBurnCapacity).toLocaleString() }} × {{ data.vaulting.bitcoinLocked.toFixed(3) }} = {{ bitcoinRequired.toFixed(3) }} BTC
              </span>
            </button>
          </div>
        </div>

        <div class="mt-4 ml-10 grid gap-2 font-mono text-sm">
          <div v-if="revealedLines[2] >= 1" class="flex justify-between gap-4"><span class="text-slate-400">Bitcoin Locked In Vaults</span><span class="text-amber-200">{{ data.vaulting.bitcoinLocked.toFixed(3) }} BTC</span></div>
          <div v-if="revealedLines[2] >= 2" class="flex justify-between gap-4"><span class="text-slate-400">Burn Capacity Of BTC</span><span class="text-argon-200">{{ Math.round(data.vaulting.argonBurnCapacity).toLocaleString() }} ARGN</span></div>
          <div v-if="revealedLines[2] >= 3" class="flex justify-between gap-4"><span class="text-slate-400">Burn Capacity Needed</span><span class="text-white">{{ Math.round(requiredBurn).toLocaleString() }} ARGN</span></div>
          <div v-if="revealedLines[2] >= 4" class="flex justify-between gap-4"><span class="text-slate-400">BTC Required To Restabilize</span><span class="text-amber-200">{{ bitcoinRequired.toFixed(3) }} BTC ({{ reserveUsedPercent.toFixed(1) }}% Of Available)</span></div>
          <div v-if="revealedLines[2] >= 5" class="mt-1 border-l-2 border-slate-700 pl-3 text-xs leading-relaxed text-slate-500">
            {{ Math.round(requiredBurn).toLocaleString() }} ÷ {{ Math.round(data.vaulting.argonBurnCapacity).toLocaleString() }} × {{ data.vaulting.bitcoinLocked.toFixed(3) }} ≈ {{ bitcoinRequired.toFixed(3) }} BTC
          </div>
        </div>

        <div v-if="currentStep === 2 && !isRunning" class="mt-5 ml-10 flex items-center justify-between gap-4">
          <span class="font-mono text-sm text-slate-400 motion-safe:animate-pulse">Recovery capacity confirmed...</span>
          <button type="button" class="rounded-lg bg-argon-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-argon-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-argon-300" @click="advance">
            Unlock {{ bitcoinRequired.toFixed(3) }} BTC And Burn
          </button>
        </div>
      </article>

      <article v-if="currentStep >= 3" class="border-t border-white/10 px-5 py-5 sm:px-7">
        <div class="flex items-start justify-between gap-4">
          <div class="flex min-w-0 items-start gap-3">
            <span class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-sm font-bold text-emerald-300">
              <span v-if="isRunning && currentStep === 3" class="size-2.5 animate-pulse rounded-full bg-argon-300" aria-hidden="true"></span>
              <span v-else aria-hidden="true">✓</span>
            </span>
            <div>
              <div class="text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase">04 · Recovery</div>
              <div class="mt-1 font-bold tracking-wide text-white" aria-live="polite">
                <template v-if="isRunning && currentStep === 3">Excess ARGN Being Burned…</template>
                <template v-else>Burn Complete</template>
              </div>
            </div>
          </div>
          <div class="flex shrink-0 gap-2">
            <button type="button" class="group relative flex size-8 items-center justify-center rounded-md border border-white/15 text-sm font-bold text-slate-300 transition-colors hover:border-argon-400 hover:text-argon-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-argon-300" aria-label="View completed recovery calculation">
              ƒx
              <span role="tooltip" class="pointer-events-none absolute top-full right-0 z-20 mt-2 hidden w-80 max-w-[calc(100vw-4rem)] rounded-lg border border-white/15 bg-slate-800 p-3 text-left font-mono text-xs leading-relaxed font-normal text-slate-300 shadow-2xl group-hover:block group-focus-visible:block">
                Remaining circulation = initial circulation − burned Argons<br />
                {{ Math.round(initialCirculation).toLocaleString() }} − {{ Math.round(requiredBurn).toLocaleString() }} = {{ Math.round(equilibriumCirculation).toLocaleString() }} ARGN<br />
                Remaining Bitcoin = {{ data.vaulting.bitcoinLocked.toFixed(3) }} − {{ bitcoinRequired.toFixed(3) }} = {{ finalLockedBitcoin.toFixed(3) }} BTC
              </span>
            </button>
          </div>
        </div>

        <div class="mt-4 ml-10 grid gap-2 font-mono text-sm">
          <div v-if="revealedLines[3] >= 1" class="flex justify-between gap-4">
            <span class="text-slate-400">Simulated Time</span>
            <span class="text-white">{{ Math.floor(simulatedMinutes / 60) }}h {{ Math.floor(simulatedMinutes % 60).toString().padStart(2, '0') }}m</span>
          </div>
          <div v-if="revealedLines[3] >= 2" class="flex justify-between gap-4">
            <span class="text-slate-400">BTC Unlocked</span>
            <span class="text-amber-200">{{ currentUnlockedBitcoin.toFixed(3) }} BTC ({{ (reserveUsedPercent * recoveryProgress).toFixed(1) }}% Of Available)</span>
          </div>
          <div v-if="revealedLines[3] >= 3" class="flex justify-between gap-4"><span class="text-slate-400">Argons Burned</span><span class="text-argon-200">{{ Math.round(currentBurnedArgons).toLocaleString() }} ARGN</span></div>
          <div v-if="revealedLines[3] >= 4" class="flex justify-between gap-4"><span class="text-slate-400">Current Price</span><span class="text-emerald-300">${{ currentPrice < 0.01 ? currentPrice.toFixed(4) : currentPrice.toFixed(3) }}</span></div>
        </div>

        <div v-if="currentStep === 3 && isRunning" class="mt-4 ml-10 flex items-center justify-between gap-4">
          <span class="font-mono text-sm text-slate-400 motion-safe:animate-pulse">Recovery simulation running...</span>
          <button type="button" class="rounded-md border border-argon-400/60 px-3 py-1.5 text-xs font-bold text-argon-200 transition-colors hover:bg-argon-400/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-argon-300 disabled:cursor-default disabled:border-argon-400/20 disabled:text-argon-300/60" :disabled="speedMultiplier > 1" @click="speedUp">
            {{ speedMultiplier > 1 ? '4× Speed' : 'Speed Up' }}
          </button>
        </div>

        <div v-if="panels[3] === 'chart' && isChartReady(3)" class="mt-4 ml-10 rounded-md border border-white/10 bg-black/25 p-3">
          <svg viewBox="0 0 600 170" class="block h-auto w-full" role="img" aria-label="Argon price recovering from one tenth of one cent to its target">
            <line x1="38" y1="156" x2="580" y2="156" class="stroke-slate-700" />
            <line x1="38" y1="55" x2="580" y2="55" class="stroke-slate-700" stroke-dasharray="5 6" />
            <text x="31" y="59" text-anchor="end" class="fill-slate-400 text-[11px]">${{ data.usdTargetForArgon.toFixed(3) }}</text>
            <text x="31" y="155" text-anchor="end" class="fill-slate-500 text-[11px]">$0.001</text>
            <path :d="chartPath(3)" fill="none" class="stroke-argon-400" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="205" cy="55" r="4" class="fill-slate-950 stroke-argon-300" stroke-width="1.5" />
            <circle cx="270" cy="150" r="4" class="fill-slate-950 stroke-argon-300" stroke-width="1.5" />
            <circle v-if="!isRunning" cx="565" cy="55" r="7" class="fill-white stroke-argon-300 drop-shadow-[0_0_5px_rgba(217,70,239,0.9)]" stroke-width="2" />
            <circle v-if="isRunning" :cx="markerX" :cy="markerY" r="8" class="fill-white stroke-argon-400 drop-shadow-[0_0_5px_rgba(217,70,239,0.9)]" stroke-width="2" />
          </svg>
        </div>

        <div v-if="currentStep === 3 && !isRunning" class="mt-4 ml-10 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4">
          <div class="flex items-center gap-2 font-bold text-emerald-300"><span aria-hidden="true">✓</span> Target Restored</div>
          <div class="mt-3 grid gap-2 font-mono text-sm">
            <div class="flex justify-between gap-4"><span class="text-slate-300">Bitcoin Unlocked</span><span class="text-amber-200">{{ bitcoinRequired.toFixed(3) }} BTC ({{ reserveUsedPercent.toFixed(1) }}% Of Available)</span></div>
            <div class="flex justify-between gap-4"><span class="text-slate-300">Argons Burned</span><span class="text-argon-200">{{ Math.round(requiredBurn).toLocaleString() }} ARGN</span></div>
            <div class="flex justify-between gap-4"><span class="text-slate-300">Old Market Price</span><span class="text-rose-300">$0.001</span></div>
            <div class="flex justify-between gap-4"><span class="text-slate-300">New Market Price</span><span class="text-emerald-300">${{ data.usdTargetForArgon.toFixed(3) }}</span></div>
            <div class="flex justify-between gap-4"><span class="text-slate-300">Bitcoin Still Locked</span><span class="text-amber-200">{{ finalLockedBitcoin.toFixed(3) }} BTC</span></div>
          </div>
        </div>

        <div v-if="currentStep === 3 && !isRunning" class="mt-5 ml-10 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <span class="font-mono text-sm text-slate-400 motion-safe:animate-pulse">Scenario complete...</span>
          <button type="button" class="rounded-lg border border-argon-400 px-4 py-2.5 text-sm font-bold text-argon-200 transition-colors hover:bg-argon-400/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-argon-300" @click="reset">
            Reset Simulation
          </button>
        </div>
      </article>
    </div>

    <div class="border-t border-white/10 bg-slate-900/70 px-5 py-3 text-xs leading-relaxed text-slate-500 sm:px-7">
      Illustrative scenario: demand is held at the dollar value implied by a $0.001 market price. Actual recovery depends on liquidity and participant behavior.
    </div>
    <div ref="consoleEnd" class="h-px scroll-mb-5" aria-hidden="true"></div>
  </section>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import dayjs from 'dayjs';
import type { IBasicsRecord } from '@/interfaces/IBasicsRecord';

type Panel = 'chart' | null;
type Point = { x: number; y: number };

const props = defineProps<{
  data: IBasicsRecord;
}>();

const COLLAPSE_PRICE = 0.001;
const STABLE_POINT: Point = { x: 205, y: 55 };
const COLLAPSED_POINT: Point = { x: 270, y: 150 };
const FINISHED_POINT: Point = { x: 565, y: 55 };
const RECOVERY_CONTROL_ONE: Point = { x: 385, y: 150 };
const RECOVERY_CONTROL_TWO: Point = { x: 430, y: 55 };
const STANDARD_STEP_DURATION = 3_000;
const RECOVERY_DURATION = 10_000;
const SIMULATED_RECOVERY_MINUTES = 36 * 60;
const FAST_SPEED = 4;
const STANDARD_TEXT_PHASE_END = 0.55;
const RECOVERY_TEXT_PHASE_END = 0.2;
const DEMAND_CHART_PHASE_END = 0.35;
const COLLAPSE_LINE_SPLIT = 0.53;
const LINES_PER_STEP = [6, 6, 5, 4];

const currentStep = Vue.ref(0);
const isRunning = Vue.ref(false);
const hasStarted = Vue.ref(false);
const animationProgress = Vue.ref(0);
const speedMultiplier = Vue.ref(1);
const prefersReducedMotion = Vue.ref(false);
const revealedLines = Vue.reactive([0, 0, 0, 0]);
const panels = Vue.reactive<Panel[]>([null, null, null, null]);
const consoleEnd = Vue.ref<HTMLElement>();
let animationFrame: number | undefined;
let reducedMotionQuery: MediaQueryList | undefined;

const initialCirculation = Vue.computed(() => Number(props.data.microgonsInCirculation.total) / 1_000_000);
const bitcoinBurnCapacityAtTarget = Vue.computed(() => props.data.vaulting.valueInVaults / props.data.usdTargetForArgon);
const equilibriumCirculation = Vue.computed(() => initialCirculation.value * COLLAPSE_PRICE / props.data.usdTargetForArgon);
const requiredBurn = Vue.computed(() => initialCirculation.value - equilibriumCirculation.value);
const bitcoinRequired = Vue.computed(() => {
  if (props.data.vaulting.argonBurnCapacity <= 0) return 0;
  return props.data.vaulting.bitcoinLocked * requiredBurn.value / props.data.vaulting.argonBurnCapacity;
});
const reserveUsedPercent = Vue.computed(() => props.data.vaulting.bitcoinLocked > 0 ? bitcoinRequired.value / props.data.vaulting.bitcoinLocked * 100 : 0);
const finalLockedBitcoin = Vue.computed(() => props.data.vaulting.bitcoinLocked - bitcoinRequired.value);
const textPhaseEnd = Vue.computed(() => currentStep.value === 3 ? RECOVERY_TEXT_PHASE_END : STANDARD_TEXT_PHASE_END);
const chartAnimationProgress = Vue.computed(() => {
  if (!isRunning.value) return 1;
  if (currentStep.value === 1) return Math.min(1, animationProgress.value / DEMAND_CHART_PHASE_END);
  return Math.max(0, Math.min(1, (animationProgress.value - textPhaseEnd.value) / (1 - textPhaseEnd.value)));
});
const demandDetailsVisible = Vue.computed(() => currentStep.value > 1 || (currentStep.value === 1 && chartAnimationProgress.value >= 1));

const collapseProgress = Vue.computed(() => {
  if (currentStep.value > 1 || (currentStep.value === 1 && !isRunning.value)) return 1;
  if (currentStep.value === 1 && isRunning.value) return chartAnimationProgress.value;
  return 0;
});

const recoveryProgress = Vue.computed(() => {
  if (currentStep.value === 3 && !isRunning.value) return 1;
  if (currentStep.value === 3 && isRunning.value) return animationProgress.value;
  return 0;
});

const currentBurnedArgons = Vue.computed(() => requiredBurn.value * recoveryProgress.value);
const currentUnlockedBitcoin = Vue.computed(() => bitcoinRequired.value * recoveryProgress.value);
const simulatedMinutes = Vue.computed(() => SIMULATED_RECOVERY_MINUTES * recoveryProgress.value);
const currentPrice = Vue.computed(() => {
  if (collapseProgress.value < 1) {
    return props.data.usdTargetForArgon + (COLLAPSE_PRICE - props.data.usdTargetForArgon) * collapseProgress.value;
  }
  if (recoveryProgress.value === 0) return COLLAPSE_PRICE;
  const collapsedMarketValue = initialCirculation.value * COLLAPSE_PRICE;
  const remainingCirculation = initialCirculation.value - currentBurnedArgons.value;
  return Math.min(props.data.usdTargetForArgon, collapsedMarketValue / remainingCirculation);
});

function interpolate(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function cubicPoint(start: Point, controlOne: Point, controlTwo: Point, end: Point, progress: number): Point {
  const remaining = 1 - progress;
  return {
    x: remaining ** 3 * start.x + 3 * remaining ** 2 * progress * controlOne.x + 3 * remaining * progress ** 2 * controlTwo.x + progress ** 3 * end.x,
    y: remaining ** 3 * start.y + 3 * remaining ** 2 * progress * controlOne.y + 3 * remaining * progress ** 2 * controlTwo.y + progress ** 3 * end.y,
  };
}

function partialRecoveryPath(progress: number) {
  const first = {
    x: interpolate(COLLAPSED_POINT.x, RECOVERY_CONTROL_ONE.x, progress),
    y: interpolate(COLLAPSED_POINT.y, RECOVERY_CONTROL_ONE.y, progress),
  };
  const second = {
    x: interpolate(RECOVERY_CONTROL_ONE.x, RECOVERY_CONTROL_TWO.x, progress),
    y: interpolate(RECOVERY_CONTROL_ONE.y, RECOVERY_CONTROL_TWO.y, progress),
  };
  const third = {
    x: interpolate(RECOVERY_CONTROL_TWO.x, FINISHED_POINT.x, progress),
    y: interpolate(RECOVERY_CONTROL_TWO.y, FINISHED_POINT.y, progress),
  };
  const fourth = {
    x: interpolate(first.x, second.x, progress),
    y: interpolate(first.y, second.y, progress),
  };
  const fifth = {
    x: interpolate(second.x, third.x, progress),
    y: interpolate(second.y, third.y, progress),
  };
  const endpoint = {
    x: interpolate(fourth.x, fifth.x, progress),
    y: interpolate(fourth.y, fifth.y, progress),
  };
  return `C ${first.x} ${first.y}, ${fourth.x} ${fourth.y}, ${endpoint.x} ${endpoint.y}`;
}

const markerPosition = Vue.computed<Point>(() => {
  if (currentStep.value === 0) {
    return {
      x: interpolate(50, STABLE_POINT.x, chartAnimationProgress.value),
      y: STABLE_POINT.y,
    };
  }

  if (currentStep.value === 1) {
    return {
      x: interpolate(STABLE_POINT.x, COLLAPSED_POINT.x, chartAnimationProgress.value),
      y: interpolate(STABLE_POINT.y, COLLAPSED_POINT.y, chartAnimationProgress.value),
    };
  }

  if (currentStep.value === 2) {
    if (chartAnimationProgress.value <= COLLAPSE_LINE_SPLIT) {
      return {
        x: interpolate(50, STABLE_POINT.x, chartAnimationProgress.value / COLLAPSE_LINE_SPLIT),
        y: STABLE_POINT.y,
      };
    }
    const collapseLineProgress = (chartAnimationProgress.value - COLLAPSE_LINE_SPLIT) / (1 - COLLAPSE_LINE_SPLIT);
    return {
      x: interpolate(STABLE_POINT.x, COLLAPSED_POINT.x, collapseLineProgress),
      y: interpolate(STABLE_POINT.y, COLLAPSED_POINT.y, collapseLineProgress),
    };
  }

  return cubicPoint(COLLAPSED_POINT, RECOVERY_CONTROL_ONE, RECOVERY_CONTROL_TWO, FINISHED_POINT, chartAnimationProgress.value);
});

const markerX = Vue.computed(() => markerPosition.value.x);
const markerY = Vue.computed(() => markerPosition.value.y);

function chartPath(step: number) {
  let path = 'M 50 55';
  if (step === 0 && isRunning.value && currentStep.value === 0) return `${path} L ${markerX.value} ${markerY.value}`;
  path += ' L 205 55';
  if (step === 0) return path;

  if (step === 1 && isRunning.value && currentStep.value === 1) {
    return `${path} L ${markerX.value} ${markerY.value}`;
  }

  if (step === 2 && isRunning.value && currentStep.value === 2) {
    if (chartAnimationProgress.value <= COLLAPSE_LINE_SPLIT) return `M 50 55 L ${markerX.value} ${markerY.value}`;
    return `${path} L ${markerX.value} ${markerY.value}`;
  }
  path += ' L 270 150';
  if (step < 3) return path;

  if (isRunning.value && currentStep.value === 3) {
    return `${path} ${partialRecoveryPath(chartAnimationProgress.value)}`;
  }
  return `${path} C 385 150, 430 55, 565 55`;
}

function isChartReady(step: number) {
  if (step === 1) return true;
  return !isRunning.value || currentStep.value !== step || chartAnimationProgress.value > 0;
}

function clearTimers() {
  if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame);
  animationFrame = undefined;
}

function keepCurrentContentVisible(immediate = false) {
  Vue.nextTick(() => {
    consoleEnd.value?.scrollIntoView({
      behavior: immediate || prefersReducedMotion.value ? ('instant' as ScrollBehavior) : 'smooth',
      block: 'nearest',
    });
  });
}

function runStep(step: number) {
  clearTimers();
  isRunning.value = true;
  animationProgress.value = 0;
  speedMultiplier.value = 1;
  revealedLines[step] = 0;
  keepCurrentContentVisible();

  if (prefersReducedMotion.value) {
    animationProgress.value = 1;
    revealedLines[step] = LINES_PER_STEP[step];
    isRunning.value = false;
    keepCurrentContentVisible();
    return;
  }

  const duration = step === 3 ? RECOVERY_DURATION : STANDARD_STEP_DURATION;
  let chartHasAppeared = false;
  let lastFrameAt = performance.now();
  const animate = (now: number) => {
    const elapsed = (now - lastFrameAt) * speedMultiplier.value;
    lastFrameAt = now;
    animationProgress.value = Math.min(1, animationProgress.value + elapsed / duration);
    const textProgress = step === 1
      ? Math.max(0, Math.min(1, (animationProgress.value - DEMAND_CHART_PHASE_END) / (1 - DEMAND_CHART_PHASE_END)))
      : Math.min(1, animationProgress.value / textPhaseEnd.value);
    const nextRevealedLines = Math.min(LINES_PER_STEP[step], Math.floor(textProgress * LINES_PER_STEP[step]));
    const contentExpanded = nextRevealedLines !== revealedLines[step] || (!chartHasAppeared && chartAnimationProgress.value > 0);
    revealedLines[step] = nextRevealedLines;
    chartHasAppeared ||= chartAnimationProgress.value > 0;
    if (contentExpanded) keepCurrentContentVisible();

    if (animationProgress.value < 1) {
      animationFrame = window.requestAnimationFrame(animate);
    } else {
      revealedLines[step] = LINES_PER_STEP[step];
      isRunning.value = false;
      animationFrame = undefined;
      keepCurrentContentVisible(true);
    }
  };
  animationFrame = window.requestAnimationFrame(animate);
}

function speedUp() {
  speedMultiplier.value = FAST_SPEED;
}

function advance() {
  if (isRunning.value || currentStep.value >= 3) return;
  if (currentStep.value === 0) {
    currentStep.value = 1;
    runStep(1);
    return;
  }
  panels[currentStep.value] = null;
  currentStep.value += 1;
  panels[currentStep.value] = 'chart';
  runStep(currentStep.value);
}

function loadNetworkData() {
  hasStarted.value = true;
  panels[0] = 'chart';
  runStep(0);
}

function reset() {
  clearTimers();
  currentStep.value = 0;
  revealedLines.splice(0, 4, 0, 0, 0, 0);
  panels.splice(0, 4, null, null, null, null);
  speedMultiplier.value = 1;
  animationProgress.value = 0;
  hasStarted.value = false;
}

function updateReducedMotion(event: MediaQueryListEvent) {
  prefersReducedMotion.value = event.matches;
  if (event.matches && isRunning.value) {
    clearTimers();
    animationProgress.value = 1;
    revealedLines[currentStep.value] = LINES_PER_STEP[currentStep.value];
    isRunning.value = false;
    keepCurrentContentVisible(true);
  }
}

Vue.onMounted(() => {
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  prefersReducedMotion.value = reducedMotionQuery.matches;
  reducedMotionQuery.addEventListener('change', updateReducedMotion);
});

Vue.onUnmounted(() => {
  clearTimers();
  reducedMotionQuery?.removeEventListener('change', updateReducedMotion);
});
</script>
