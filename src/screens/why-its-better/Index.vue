<template>
  <MainLayout mode="charcoal" class="bg-[var(--bg-charcoal)] text-white pb-0">
    <div ref="pageRef">

      <ScrollBasic ref="heroRef" v-slot="{ setMoveWhenLeavingRef, setFadeWhenLeavingRef }" class="flex flex-col pt-12 md:pt-22 min-h-[calc(100vh-69px)] text-slate-100 justify-center">
        <div class="grow flex flex-col w-11/12 max-w-260 mx-auto text-center pb-20 relative z-20 justify-center items-center">
          <h1 class="text-argon-100/50 font-bold text-xl md:text-2xl tracking-widest uppercase font-serif bg-[var(--bg-charcoal)]">
            The Better Stablecoin
          </h1>
          <header class="text-4xl md:text-6xl xl:text-7xl leading-tight font-light font-serif mt-4 bg-[var(--bg-charcoal)]">
            Argon Solves the Biggest Problems of Fiat Money and Digital
            Stablecoins
          </header>
          <div class="bg-linear-to-t from-transparent to-[var(--bg-charcoal)] h-10 w-10 relative z-20"/>
        </div>

        <div class="mb-8 relative whitespace-nowrap">
          <div :ref="setMoveWhenLeavingRef" data-y-speed="5" class="mx-auto w-10 h-10">
            <ChevronDoubleDownIcon class="w-10 h-10 animate-bounce" />
          </div>
          <div :ref="setFadeWhenLeavingRef" data-fade-speed="4" class="text-center text-sm font-light opacity-50">
            Scroll Down to Learn More
          </div>
        </div>
      </ScrollBasic>

      <ScrollBasic ref="introRef" v-slot="{ setFadeWhenLeavingRef, setTopWhileScrollingRef, setMoveToCenterRef }" class="z-10 flex flex-col items-center justify-center">
        <DottedLine :ref="setTopWhileScrollingRef" />
        <Circle :ref="setMoveToCenterRef" data-move-speed="0.45" />

        <div ref="introContentRef" class="relative flex flex-col items-center justify-center z-30 font-serif">
          <div class="absolute -top-10 bg-linear-to-b from-transparent to-[var(--bg-charcoal)] h-10 w-10 z-10" />
          <header class="relative z-20 bg-[var(--bg-charcoal)]">
            <div class="text-xl md:text-3xl text-center">
              FIRST THINGS FIRST
            </div>
            <div class="text-3xl md:text-5xl xl:text-6xl mx-auto text-center leading-tight md:leading-normal mt-1 px-4 md:flex flex-col">
              <span>Understanding Fiat Money </span>
              <span>and Digital Stablecoins</span>
            </div>
            <div
              :ref="setFadeWhenLeavingRef"
              data-fade-speed="5"
              data-delay="40"
              class="absolute top-full left-1/2 -translate-x-1/2 pb-10 opacity-0 invisible transition-opacity duration-50"
            >
              <div class="w-10 h-10 bg-[var(--bg-charcoal)]">
                <ChevronDoubleDownIcon class="h-full mx-auto opacity-50" />
              </div>
              <div class="absolute bottom-0 bg-linear-to-t from-transparent to-[var(--bg-charcoal)] h-10 w-10 z-0" />
            </div>
          </header>
          <div class="absolute -bottom-10 bg-linear-to-t from-transparent to-[var(--bg-charcoal)] h-10 w-10 z-10" />
        </div>
      </ScrollBasic>

      <div class="relative z-10 h-[25vh]"></div>

      <ScrollOverlay color="charcoal" ref="firstThingsFirstRef" class="z-40" gsap-is-at-or-above-top>
        <template #header>
          <div class="text-white text-center font-serif mx-auto pt-8 md:pt-16 pb-5 border-b border-gray-300/20 max-w-210">
            <div class="text-xl md:text-3xl uppercase text-argon-100/90">A Very Brief</div>
            <div class="text-4xl md:text-6xl xl:text-7xl mt-1 md:mt-2">History of Money</div>
          </div>
        </template>

        <div class="mt-6 md:mt-16 w-full max-w-210 flex flex-col mx-auto px-4 md:px-8 gap-y-8 md:gap-y-12 relative z-20">
          <div>
            <header class="font-serif text-xl md:text-2xl font-bold">
              Why Paper Money
            </header>
            <p class="mt-1 text-base md:text-xl leading-relaxed font-serif">
              Paper money was invented in the 7th century A.D. to solve gold's biggest weakness: large amounts are
              <span class="text-argon-100">heavy</span> to
              move, <span class="text-argon-100">slow</span> to transport and <span class="text-argon-100">hard to
              conceal</span> from thieves. The introduction of paper made it <span class="text-argon-100">easier to
              move value</span> across distances, but it brought a new challenge: how could anyone be certain the paper
              had <span class="text-argon-100">real gold behind it?</span> Governments eventually found the answer.
              They simply <span class="text-argon-100">decreed by fiat</span> that the paper had real value, and they
              demanded that no other currency could be used in the land. <span class="text-argon-100">The threat of force was used
              to make it so.</span>
            </p>
          </div>

          <div>
            <header class="font-serif text-xl md:text-2xl font-bold">
              The Transition to Infinite Fiat
            </header>
            <p class="mt-1 text-base md:text-xl leading-relaxed font-serif">
              Fiat is by definition "<em class="italic">an absolute command issued by decree.</em>"
              Fiat money has no intrinsic value; <span class="text-argon-100">it is money only because a government
            decrees it so</span>, and it contains a hidden superpower. Whoever controls the minting controls unlimited
              resources, at least for a while. The Yuan dynasty of 13th-century China was the first to harness this power,
              but not the last. <span class="text-argon-100">No longer constrained by gold's limited supply</span>, the leaders financed their
              military campaigns and government programs by simply printing more paper. Unfortunately, <span class="text-argon-100">Yuan's fiat
            currency imploded</span>, and every fiat currency since has eventually followed this same demise.
            </p>
          </div>
          <div :ref="setMoveWhenAtEndRef" data-pause="10" class="relative mx-auto w-10 h-10 transition-opacity duration-50">
            <ChevronDoubleDownIcon class="w-full h-full" />
          </div>
        </div>
      </ScrollOverlay>

      <div
        ref="firstThingsFirstRunwayRef"
        aria-hidden="true"
        class="relative z-40 pointer-events-none"
      />

      <ScrollOverlay color="charcoal" ref="firstThingsIntermissionRef" class="z-50" gsap-is-at-or-above-top>
        <div class="grow text-white text-center md:text-5xl font-serif relative z-20 flex flex-col justify-center">
          <div class="text-lg md:text-2xl w-11/12 max-w-200 mx-auto leading-relaxed font-bold">
            <MacOldIcon class="w-16 md:w-20 mx-auto mb-2 text-argon-100/90" />
            <div class="text-2xl md:text-3xl uppercase mt-3 mb-6 text-argon-100/90 font-light">{ <span class="relative top-1">Hello World</span> }</div>
            1989 was a pivotal moment in civilization. Tim Berners-Lee invented the Web, and its emergence heralded
            a new age where everything would soon become digital: retail, finance, photos, music, social...
          </div>
        </div>
      </ScrollOverlay>

      <ScrollOverlay color="charcoal" ref="firstThingsSecondRef" class="z-60" gsap-is-at-or-above-top>
        <template #header>
          <div class="text-white text-center mx-auto font-serif pt-8 md:pt-16 pb-5 border-b border-gray-300/20 max-w-210">
            <div class="text-xl md:text-3xl uppercase text-argon-100/90">The Failed Attempts To</div>
            <div class="text-4xl md:text-6xl xl:text-7xl mt-1 md:mt-2">Invent Digital Money</div>
          </div>
        </template>

        <template #default="{ setMoveWhenAtEndRef }">
          <div class="mt-8 md:mt-16 w-full max-w-210 mx-auto px-4 md:px-8 shrink-0 flex flex-col gap-y-10 md:gap-y-16 relative z-20">
            <div>
              <header class="font-serif text-xl md:text-2xl font-bold">
                The Need for Digitization
              </header>
              <p class="mt-1 text-base md:text-xl leading-relaxed font-serif">
                The Web transformed commerce on a global scale, and in the process, it became increasingly clear the
                <span class="text-argon-100">old monetary system of paper money</span> was no longer the future. Payment
                interfaces were forced to rapidly evolve, but the underlying rails of ACH, Wire, SWIFT, and Visa were
                <span class="text-argon-100">legacy hacks stacked on top of old fiat paper</span>; these evolutions
                didn't create a real digital currency, they just added digital plumbing. A new generation of builders soon
                realized a true digital-first currency could open a wealth of possibilities, such as
                <span class="text-argon-100">instant transfers</span>,
                <span class="text-argon-100">rich programmability</span>,
                <span class="text-argon-100">radical transparency</span>,
                and <span class="text-argon-100">personal autonomy</span>.
                Projects like DigiCash and E-gold tried in the 1990s, but each failed for similar reasons:
                <span class="text-argon-100">their currencies were simply IOUs promised by a company</span>, not money
                itself; and companies can fail, be shut down, or enact dystopian controls. It would take many more years
                before someone discovered how to create <span class="text-argon-100">a digital currency that held value
                independent of centralized institutions</span>.
              </p>
            </div>

            <div>
              <header class="font-serif text-xl md:text-2xl font-bold">
                The Launch of Bitcoin
              </header>
              <p class="mt-1 text-base md:text-xl leading-relaxed font-serif">
                Bitcoin was released in 2009, and <span class="text-argon-100">it changed everything</span>. It
                was the <span class="text-argon-100">first digital currency that worked</span> without a central power demanding it. No gold
                backed its value. No military power enforced its decree. It relied on no nation, bank or other
                centralized institution. <span class="text-argon-100">An algorithm</span> guaranteed its scarcity,
                security, and sovereignty. <span class="text-argon-100">No single power could control it, inflate it, or
                debase it</span>. It was nearly the perfect currency, except for one critical weakness: the protocol had
                <span class="text-argon-100">no price stabilization mechanism</span>.
              </p>
            </div>

            <div class="pb-10">
              <header class="font-serif text-xl md:text-2xl font-bold">
                The Dream of an Independent Stablecoin
              </header>
              <p class="mt-1 text-base md:text-xl leading-relaxed font-serif">
                <span class="text-argon-100">A stable currency is paramount for economies to flourish</span> &ndash;
                it's hard to sign a contract in a currency that could lose half its value by morning &ndash; which is
                why Bitcoin's lack of a price stabilizer inhibits it from becoming a primary medium of exchange.
                Multiple projects were launched in 2015 to solve this problem. They tried creating a new type of crypto
                (stablecoins) that <span class="text-argon-100">embodied Bitcoin's independence from fiat</span> yet
                maintained a <span class="text-argon-100">stable value</span>. Over the next several years,
                <span class="text-argon-100">every project failed</span> &ndash; the task was harder than it seemed.
                Ten years later, over <span class="text-argon-100">$320B is now sitting in stablecoins</span>,
                yet none are decentralized. They simply exist as digital IOUs for the fiat dollar. As a result,
                <span class="text-argon-100">these stablecoins inherit all the same risks as the dollar.</span>
              </p>
            </div>

            <div :ref="setMoveWhenAtEndRef" data-pause="10" class="relative mx-auto w-10 h-10 transition-opacity duration-50">
              <ChevronDoubleDownIcon class="w-full h-full" />
            </div>
          </div>
        </template>
      </ScrollOverlay>

      <div
        ref="firstThingsSecondRunwayRef"
        aria-hidden="true"
        class="relative z-60 pointer-events-none"
      />

      <ScrollGroup ref="group1Ref" v-slot="{ setTopWhileScrollingRef, setMoveToCenterRef }" class="relative z-70 bg-[var(--bg-charcoal)] -mt-1">
        <div ref="groupEffectsRef" class="absolute inset-0 z-10 pointer-events-none">
          <div :ref="setTopWhileScrollingRef" data-top-speed="1" data-top-max="-30%" class="absolute top-0 h-[200vh] w-full left-0 bg-linear-to-b from-transparent to-[var(--bg-charcoal)] to-40%" />
          <DottedLine :ref="setTopWhileScrollingRef" data-top-speed="1" data-top-max="-8%" class="-top-10 z-10" />
        </div>
        <Circle :ref="setMoveToCenterRef" data-move-speed="0.5" class="fixed z-20" />

        <ScrollBasic ref="stateOfMoneyRef" class="z-70 flex flex-col items-center justify-center">
          <div ref="stateOfMoneyContentRef" class="relative flex flex-col items-center justify-center z-30 font-serif">
            <div class="absolute -top-10 bg-linear-to-b from-transparent to-[var(--bg-charcoal)] h-10 w-10 z-10" />
            <div class="text-lg md:text-2xl w-11/12 max-w-210 mx-auto leading-relaxed font-bold text-center bg-[var(--bg-charcoal)]">
              <div class="text-2xl md:text-3xl font-light uppercase opacity-80 text-argon-100 mt-3 mb-4">The Current State of Money</div>
              The world has gone digital, but the dominant currencies still exist as fiat paper. Bank wire transfers and
              stablecoins sit atop this paper. A patchwork of bandaids makes it somewhat workable for now, but the global rise of
              government spending, increased debt, and inflation risk all point to an uncertain future.
            </div>
            <div class="absolute -bottom-10 bg-linear-to-t from-transparent to-[var(--bg-charcoal)] h-10 w-10 z-10" />
          </div>
        </ScrollBasic>

        <div
          ref="stateOfMoneyRunwayRef"
          aria-hidden="true"
          class="relative h-[25vh] z-[70]"
        />

        <div class="relative z-10 h-[30vh]" />

        <ScrollRisk :showBackground="false" ref="inflationRiskRef" header="Inflation" class="z-[70]">
          Inflation is one of the great hidden taxes on society, and the dollar
          has it in spades. Unfortunately, the risk is getting worse, and
          every stablecoin pegged to it inherits it.
          <template #stat1>
            <RiskStat title="The Dollar's Loss Due to Inflation" value="88%">
              This is the amount of wealth that has been erased from your wallet since 1971.
            </RiskStat>
          </template>
          <template #stat2>
            <RiskStat title="Stablecoins Pegged to the Dollar" value="99%">
              This is the percentage of stablecoins that have fully consumed all the same problems as the dollar.
            </RiskStat>
          </template>
          <template #stat3>
            <RiskStat title="Current U.S. Debt" value="$39.2T">
              The United States now owes more than the entire nation produces in a given year.
            </RiskStat>
          </template>
          <template #stat4>
            <RiskStat title="U.S. Debt Acceleration" value="+$1T">
              This is being added every 75 days. At this rate, US debt will surpass $100T by 2040.
            </RiskStat>
          </template>
        </ScrollRisk>
        <div ref="inflationRiskRunwayRef" aria-hidden="true" class="relative z-[70] pointer-events-none" />
      </ScrollGroup>

      <div class="relative z-10 h-[5vh]" />

      <ScrollOverlay ref="inflationOverlayRef" color="argon" class="z-[80] text-black" data-gsap-bg-from="#5E5968" gsap-is-at-or-above-top>
        <header class="w-11/12 max-w-300 mx-auto text-center mt-10 md:mt-20 font-serif uppercase">
          <div class="text-2xl md:text-5xl">Argon Is Fully</div>
          <div class="text-4xl md:text-7xl xl:text-8xl mt-2">Protected From Inflation</div>
        </header>
        <div class="flex flex-col w-full mt-8 md:mt-10 gap-y-10 mx-auto px-4 md:px-12 xl:px-20 max-w-300 text-base md:text-xl leading-normal font-serif">
          <p>
            Most currencies are pegged to the dollar, which means they inherit all of the dollar's inflation. Argon
            takes a different approach. Instead of pegging to a currency, it pegs to a consumer price index of real goods.
            One argon buys the same basket of groceries today as it will a thousand years from now.
          </p>
          <p>
            When Argon launched on January 15, 2025, one argon exchanged for exactly one dollar. Since then, the dollar
            has lost value to inflation, but Argon hasn't. Relative to the dollar, one argon is now worth $1.06, a 6%
            gap in eighteen months. We expect this gap to continue growing.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <div class="w-full sm:w-1/2 flex flex-col bg-white/50 border border-slate-500/50 rounded-lg p-4">
              <div class="flex flex-row items-center justify-center gap-x-3 md:gap-x-4 font-sans text-3xl md:text-5xl font-bold">
                <span>₳1.00</span>
                <SwapIcon class="w-6 md:w-8 shrink-0" />
                <span>$1.00</span>
              </div>
              <div class="font-bold text-center">
                January 15, 2025
              </div>
            </div>
            <div class="w-full sm:w-1/2 flex flex-col bg-white/50 border border-slate-500/50 rounded-lg p-4">
              <div class="flex flex-row items-center justify-center gap-x-3 md:gap-x-4 font-sans text-3xl md:text-5xl font-bold">
                <span>₳1.00</span>
                <SwapIcon class="w-6 md:w-8 shrink-0" />
                <span>$1.06</span>
              </div>
              <div class="font-bold text-center">
                June 16, 2026
              </div>
            </div>
          </div>

          <p>
            That 5.9% gain is just eighteen months of inflation. Small percentages don't feel threatening until you zoom
            out. If the dollar's inflation stays at a modest 3.5% average — no hyperinflation, no crisis, just business
            as usual — a banana that costs $1.00 today will cost $871 trillion in the year 3025. One argon will still
            buy the same banana (or, maybe, a different one).
          </p>

          <div class="relative">
            <BananaIcon class="hidden lg:block absolute top-0 right-full h-1/2 -translate-x-5" />
            <img class="w-full max-w-full" src="/fully-protected-from-inflation/illustration1.png" />
            <BananaIcon class="hidden lg:block absolute top-0 left-full h-1/2 -scale-x-100 origin-center translate-x-5" />
          </div>

          <header class="font-bold text-2xl">How It Works</header>
          <p>
            It starts with Argon Stabilization’s Vaults. Anyone can lock their bitcoin in an Argon Vault and instantly
            receive argon stablecoins equal to their bitcoin’s full market value. Doing so creates a massive short
            against Argon’s target price.
          </p>

          <div>
            <img class="w-full max-w-full" src="/fully-protected-from-inflation/illustration2.png" />
          </div>

          <p>
            The peg itself is set by the Argon Inflation Index, an on-chain tracker of real-goods prices that updates
            continuously. This index ensures one argon always holds the same purchasing power, regardless of what
            any government or central bank decides to do with their currency.
          </p>

          <div>
            <img class="w-full max-w-full" src="/fully-protected-from-inflation/illustration3.png" />
          </div>

          <p>
            If argon's price ever slips below its target peg, bitcoin holders call their shorts by unlocking their bitcoin.
            This automatically burns the excess argons, pushing the price back up to target. Conversely, if demand for
            argon pushes its price above the target peg, Argon miners are able to mint additional argons and profit
            from the upside.
          </p>

          <div>
            <img class="w-full max-w-full" src="/fully-protected-from-inflation/illustration4.png" />
          </div>

          <header class="font-bold text-2xl">Dive Deeper</header>
          <div class="flex flex-col gap-y-4">
            <div>
              <router-link to="/docs/whitepapers/fundamentals">
                <ArrowRightCircleIcon class="h-6 inline-block -mt-1" />
                Read our Whitepaper, The Fundamentals for Creating a Stable Crypto Asset
              </router-link>
            </div>
            <div>
              <router-link to="/docs/bitcoin-locking">
                <ArrowRightCircleIcon class="h-6 inline-block -mt-1" />
                Learn About Liquid Locking for Bitcoin
              </router-link>
            </div>
          </div>

        </div>
      </ScrollOverlay>

      <div ref="inflationOverlayRunwayRef" class="relative z-10 h-[15vh] bg-[var(--bg-charcoal)]" />

      <ScrollGroup ref="group2Ref" v-slot="{ setMoveToCenterRef }" class="relative z-70 bg-[var(--bg-charcoal)] -mt-1">
        <div class="relative h-[40vh] w-full z-[70] -mt-1" />
        <div class="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 border-r-2 border-dashed border-gray-300" />
        <div class="bg-linear-to-t from-transparent to-[var(--bg-charcoal)] h-10 w-full z-10 absolute top-0 left-0" />
        <Circle :ref="setMoveToCenterRef" data-move-speed="0.5" class="fixed z-20" />

        <ScrollRisk :showBackground="false" ref="fiatCollapseRiskRef" header="Fiat Collapse" class="z-[90]">
          Every fiat currency in history has eventually collapsed, starting with China's Yuan dynasty of 1260 A.D.
          The dollar has lasted longer than most, but at which point does the inevitable begin?
          <template #stat1>
            <RiskStat title="Years In Existence" value="766 Years">
              The number of years since fiat has existed as a government-run currency in one form or another.
            </RiskStat>
          </template>
          <template #stat2>
            <RiskStat title="Average Lifespan" value="39 Years">
              The average amount of time that any single fiat currency has remained solvent and usable.
            </RiskStat>
          </template>
          <template #stat3>
            <RiskStat title="Failure Rate" value="100%">
              It's crazy, but given enough time, every fiat currency in history has ultimately failed and collapsed.
            </RiskStat>
          </template>
          <template #stat4>
            <RiskStat title="Stablecoins Dependent On Fiat" value="100%">
              The percentage of stablecoins in the market that are fully tied to the current fiat system and its risks.
            </RiskStat>
          </template>
        </ScrollRisk>
        <div ref="fiatCollapseRiskRunwayRef" aria-hidden="true" class="relative z-[90] pointer-events-none" />
      </ScrollGroup>

      <div class="relative z-10 h-[15vh]"></div>

      <ScrollOverlay ref="fiatCollapseOverlayRef" color="argon" class="z-[100] text-black" data-gsap-bg-from="#5E5968" gsap-is-at-or-above-top>
        <header class="w-11/12 max-w-300 mx-auto text-center mt-10 md:mt-20 font-serif uppercase">
          <div class="text-2xl md:text-5xl">Argon Is Fully</div>
          <div class="text-4xl md:text-7xl xl:text-8xl mt-2">Insulated From The Collapse of Fiat</div>
        </header>

        <div class="flex flex-col w-full gap-y-10 mt-8 md:mt-10 mx-auto px-4 md:px-12 xl:px-20 max-w-300 text-base md:text-xl leading-normal font-serif">
          <p>
            Nearly every stablecoin in existence is pegged to the dollar — which means every stablecoin inherits the
            dollar's problems. It doesn't matter how decentralized the collateral. If the peg is in dollars, the risk
            is in dollars. Argon is different. It has no banks, no custodians, no fiat currencies, and no governments
            in its dependency chain.
          </p>

          <p>
            Argon's only dependency is Bitcoin, the asset that has survived every financial crisis of the last fifteen
            years without a central authority keeping it alive. Even if every government defaulted, every bank collapsed,
            and the world’s fiat currency went to zero, Argon would continue to function. The only scenario that puts
            Argon on shaky territory is if Bitcoin’s price falls more than 97%, a threshold that has never been breached.
          </p>

          <div>
            <img class="w-full max-w-full" src="/insulated-from-the-collapse-of-fiat/illustration1.png" />
          </div>

          <p>
            Stablecoins are only as strong as their weakest link. If any single layer in that stack fails — a bank
            collapses, inflation spirals, or a government defaults — everything above it fails too. Argon's chain has
            only one link. As long as Bitcoin holds above 3% of its current value, Argon holds.
          </p>

          <header class="font-bold text-2xl">Dive Deeper</header>
          <div class="flex flex-col gap-y-4">
            <div>
              <router-link to="/docs/whitepapers/fundamentals">
                <ArrowRightCircleIcon class="h-6 inline-block -mt-1" />
                Read our Whitepaper, On the Stabilization of Collateral-Backed Stablecoins
              </router-link>
            </div>
            <div>
              <router-link to="/docs/bitcoin-locking">
                <ArrowRightCircleIcon class="h-6 inline-block -mt-1" />
                Explore Our Stabilization Analysis Model
              </router-link>
            </div>
          </div>

        </div>
      </ScrollOverlay>

      <div ref="fiatCollapseOverlayRunwayRef" class="relative z-10 h-[15vh] bg-[var(--bg-charcoal)]" />

      <ScrollGroup ref="group3Ref" v-slot="{ setMoveToCenterRef }" class="relative z-70 bg-[var(--bg-charcoal)] -mt-1">
        <div class="relative h-[40vh] w-full z-[70] -mt-1" />
        <div class="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 border-r-2 border-dashed border-gray-300" />
        <div class="bg-linear-to-t from-transparent to-[var(--bg-charcoal)] h-10 w-full z-10 absolute top-0 left-0" />
        <Circle :ref="setMoveToCenterRef" data-move-speed="0.5" class="fixed z-20" />

        <ScrollRisk :showBackground="false" ref="deathSpiralsRiskRef" header="Death Spirals" class="z-[110]">
          The dollar took decades to lose 88% of its value. TerraUSD's stablecoin took just 72 hours. The death spiral is
          what happens when fiat's slow erosion gains an unstable algorithm.
          <template #stat1>
            <RiskStat title="Algorithmic Stablecoin Failures" value="100%">
              Every algorithmic stablecoin has either collapsed entirely or been forced to abandon its peg.
            </RiskStat>
          </template>
          <template #stat2>
            <RiskStat title="Single Biggest-Week Loss" value="$40B">
              Terra collapsed in May 2022, wiping out $40 billion and the life savings of thousands of investors.
            </RiskStat>
          </template>
          <template #stat3>
            <RiskStat title="Stablecoin Capital at Risk" value="$320B">
              Dollar stablecoins inherit all the risks of fractional reserve banking. See USDC's near collapse in 2023.
            </RiskStat>
          </template>
          <template #stat4>
            <RiskStat title="Protected by FDIC Insurance" value="$0">
              The GENIUS Act of 2025 confirmed the fact that dollar stablecoins are not protected by the FDIC.
            </RiskStat>
          </template>
        </ScrollRisk>
        <div ref="deathSpiralsRiskRunwayRef" aria-hidden="true" class="relative z-[110] pointer-events-none" />
      </ScrollGroup>

      <div class="relative z-10 h-[15vh] bg-[var(--bg-charcoal)]"></div>

      <ScrollOverlay ref="deathSpiralsOverlayRef" color="argon" class="z-[120] text-black" data-gsap-bg-from="#5E5968" gsap-is-at-or-above-top>
        <header class="w-11/12 max-w-300 mx-auto text-center mt-10 md:mt-20 font-serif uppercase">
          <div class="text-2xl md:text-5xl">Argon Is Fully</div>
          <div class="text-4xl md:text-7xl xl:text-8xl mt-2">
            Immune From
            Crypto Death Spirals
          </div>
        </header>

        <div class="flex flex-col w-full gap-y-10 mt-8 md:mt-10 mx-auto px-4 md:px-12 xl:px-20 max-w-300 text-base md:text-xl leading-normal font-serif">
          <p>
            Every non-Argon stablecoin has fallen into one of two traps. The first was custodial collateral — dollars
            held in banks — which inherits all the fragility of fractional-reserve banking. The second is an algorithmic
            second token to manage supply, which creates a reflexive loop: when confidence drops, the token sells off,
            which drops confidence further. TerraUSD wiped out $40 billion this way in three days. Argon uses neither
            approach.
          </p>

          <div>
            <img class="w-full max-w-full" src="/immune-from-death-spirals/illustration1.png" />
          </div>

          <p>
            Argon's stabilization mechanism uses Bitcoin as a fully exogenous asset with no need for fractional-reserve
            banking or custodial reserves. In the simulated stress test above, Argon returns to its target within two
            days with no outside capital required. The dashed line is where TerraUSD and every traditional stablecoin
            go instead.
          </p>

          <p>
            There's a second-order effect worth noting. As Argon grows, its stabilization mechanism creates a natural
            price floor for Bitcoin. Argon’s Liquid Locking of Bitcoin means the total supply of 21 million
            coins, at current prices, represents protection capacity for up to $40 trillion in argon value. The bigger
            Bitcoin gets, the more resilient Argon becomes. And the more resilient Argon becomes, the better Bitcoin
            looks as a long-term holding.
          </p>

          <header class="font-bold text-2xl">Dive Deeper</header>
          <div class="flex flex-col gap-y-4">
            <div>
              <router-link to="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3899499">
                <ArrowRightCircleIcon class="h-6 inline-block -mt-1" />
                Professor Catalini's On the Economic Design of Stablecoins
              </router-link>
            </div>
            <div>
              <router-link to="/docs/whitepapers/fundamentals">
                <ArrowRightCircleIcon class="h-6 inline-block -mt-1" />
                Read our Whitepaper, The Fundamentals for Creating a Stable Crypto Asset
              </router-link>
            </div>
          </div>
        </div>
      </ScrollOverlay>

      <div ref="deathSpiralsOverlayRunwayRef" class="relative z-10 h-[15vh] bg-[var(--bg-charcoal)]" />

      <ScrollBasic ref="conclusionRef" v-slot="{ setMoveToCenterRef }" class="z-70 min-h-[90vh] flex flex-col items-center justify-end bg-[var(--bg-charcoal)]">
        <div class="absolute top-0 bottom-0 w-px border-r-2 border-dashed border-gray-300 left-1/2 -translate-x-1/2 z-0" />
        <div class="bg-linear-to-t from-transparent to-[var(--bg-charcoal)] h-10 z-10 absolute top-0 left-0 w-full" />
        <Circle :ref="setMoveToCenterRef" data-move-speed="0.5" class="fixed z-20" />

        <div class="relative flex flex-col items-center justify-center z-30 font-serif">
          <div class="absolute -top-10 bg-linear-to-b from-transparent to-[var(--bg-charcoal)] h-10 w-10 z-10" />
          <div class="text-lg md:text-2xl w-11/12 max-w-200 mx-auto leading-relaxed flex flex-col font-bold text-center bg-[var(--bg-charcoal)] pb-20">
            <div class="text-2xl md:text-3xl uppercase opacity-50 mt-3">In Conclusion</div>
            <p class="border-b border-gray-300/20 pb-12 mt-5">
              Argon is the only stablecoin in production that is fully decentralized, protected from inflation,
              insulated from the collapse of fiat money, and immune to death spirals.
            </p>
            <p class="border-b border-gray-300/20 pb-12 mt-12">
              We believe the crypto industry will soon begin waking up to the risks of fiat-backed stablecoins. As that
              happens, the massive shift that is already in progress will accelerate.
            </p>
          </div>
        </div>
      </ScrollBasic>

    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import MainLayout from "../../navigation/MainLayout.vue";
import ScrollRisk from './components/ScrollRisk.vue';
import ScrollBasic from './components/ScrollBasic.vue';
import ScrollOverlay from './components/ScrollOverlay.vue';
import ScrollGroup from './components/ScrollGroup.vue';
import DottedLine from './components/DottedLine.vue';
import Circle from './components/Circle.vue';
import RiskStat from './components/RiskStat.vue';
import MacOldIcon from '../../assets/mac-old.svg?component';
import BananaIcon from '../../assets/why-its-better/banana.svg?component';
import SwapIcon from '../../assets/why-its-better/swap.svg?component';
import { ChevronDoubleDownIcon, ArrowRightCircleIcon } from "@heroicons/vue/20/solid";

gsap.registerPlugin(ScrollTrigger);

const pageRef = ref<HTMLElement | null>(null);
const heroRef = ref<unknown>(null);
const introRef = ref<unknown>(null);
const introContentRef = ref<HTMLElement | null>(null);
const firstThingsFirstRef = ref<unknown>(null);
const firstThingsFirstRunwayRef = ref<HTMLElement | null>(null);
const firstThingsIntermissionRef = ref<unknown>(null);
const firstThingsSecondRef = ref<unknown>(null);
const firstThingsSecondRunwayRef = ref<HTMLElement | null>(null);
const group1Ref = ref<unknown>(null);
const group2Ref = ref<unknown>(null);
const group3Ref = ref<unknown>(null);
const groupEffectsRef = ref<HTMLElement | null>(null);
const stateOfMoneyRef = ref<unknown>(null);
const stateOfMoneyContentRef = ref<HTMLElement | null>(null);
const stateOfMoneyRunwayRef = ref<HTMLElement | null>(null);
const inflationRiskRef = ref<unknown>(null);
const inflationRiskRunwayRef = ref<HTMLElement | null>(null);
const inflationOverlayRef = ref<unknown>(null);
const inflationOverlayRunwayRef = ref<HTMLElement | null>(null);
const fiatCollapseRiskRef = ref<unknown>(null);
const fiatCollapseRiskRunwayRef = ref<HTMLElement | null>(null);
const fiatCollapseOverlayRef = ref<unknown>(null);
const fiatCollapseOverlayRunwayRef = ref<HTMLElement | null>(null);
const deathSpiralsRiskRef = ref<unknown>(null);
const deathSpiralsRiskRunwayRef = ref<HTMLElement | null>(null);
const deathSpiralsOverlayRef = ref<unknown>(null);
const deathSpiralsOverlayRunwayRef = ref<HTMLElement | null>(null);
const conclusionRef = ref<unknown>(null);

let gsapContext: gsap.Context | undefined;

const getExposedElement = (value: unknown, key = "$el") => {
  if (value instanceof Element) return value as HTMLElement;

  const exposedElement = (value as Record<string, unknown> | null)?.[key];
  if (exposedElement instanceof Element) return exposedElement as HTMLElement;

  const refElement = (exposedElement as {value?: unknown} | null)?.value;
  if (refElement instanceof Element) return refElement as HTMLElement;

  return null;
};

const getExposedElements = (value: unknown, key: string) => {
  const exposedElements = (value as Record<string, unknown> | null)?.[key];
  const refElements = (exposedElements as {value?: unknown} | null)?.value ?? exposedElements;

  if (Array.isArray(refElements)) {
    return refElements.filter((element): element is HTMLElement => element instanceof Element);
  }

  if (refElements instanceof Element) return [refElements as HTMLElement];

  return [];
};

const getElementSpeed = (element: HTMLElement) => {
  const speed = Number(element.dataset.ySpeed);
  return Number.isFinite(speed) && speed > 0 ? speed : 1;
};

const getTopSpeed = (element: HTMLElement) => {
  const speed = Number(element.dataset.topSpeed);
  return Number.isFinite(speed) && speed > 0 ? speed : 1;
};

const getTopMax = (element: HTMLElement) => {
  const topMax = element.dataset.topMax;
  if (topMax && /^-?\d+(\.\d+)?(px|%)$/.test(topMax)) return topMax;

  return `${-60 * getTopSpeed(element)}%`;
};

const getTopEnd = (element: HTMLElement) => {
  if (!element.dataset.topMax) return "top center";

  return `top ${100 - 50 / getTopSpeed(element)}%`;
};

const getMoveSpeed = (element: HTMLElement) => {
  const speed = Number(element.dataset.moveSpeed);
  return Number.isFinite(speed) && speed > 0 ? speed : 1;
};

const getFadeSpeed = (element: HTMLElement) => {
  const speed = Number(element.dataset.fadeSpeed);
  return Number.isFinite(speed) && speed > 0 ? speed : 1;
};

const getScaleSpeed = (element: HTMLElement) => {
  const speed = Number(element.dataset.scaleSpeed);
  return Number.isFinite(speed) && speed > 0 ? speed : 1;
};

const getDelayPercent = (element: HTMLElement) => {
  const percent = Number(element.dataset.delay);
  return Number.isFinite(percent) && percent > 0 ? percent : 0;
};

const getPausePercent = (element: HTMLElement) => {
  const percent = Number(element.dataset.pause);
  return Number.isFinite(percent) && percent > 0 ? percent : 0;
};

const getPauseDistance = (element: HTMLElement) => {
  return window.innerHeight * (getPausePercent(element) / 100);
};

const getFadeStartPercent = (element: HTMLElement) => {
  return 100 - getDelayPercent(element);
};

const getFadeStart = (element: HTMLElement) => {
  const startPercent = getFadeStartPercent(element);
  return startPercent === 100 ? "bottom bottom" : `bottom ${startPercent}%`;
};

const getFadeEnd = (element: HTMLElement) => {
  const endPercent = getFadeStartPercent(element) - 20 / getFadeSpeed(element);
  return `bottom ${endPercent}%`;
};

const getScaleEnd = (element: HTMLElement) => {
  const endPercent = getFadeStartPercent(element) - 20 / getScaleSpeed(element);
  return `bottom ${endPercent}%`;
};

const getMoveStart = (element: HTMLElement) => {
  const startPercent = 100 - getPausePercent(element);
  return startPercent === 100 ? "bottom bottom" : `bottom ${startPercent}%`;
};

const getMoveEnd = (element: HTMLElement) => {
  return `bottom ${80 - getPausePercent(element)}%`;
};

const getRiskElements = (value: unknown) => {
  const root = getExposedElement(value);
  const content = getExposedElement(value, "$contentEl");
  const header = getExposedElement(value, "header");
  const body = getExposedElement(value, "body");
  const statsOne = getExposedElement(value, "statsOne");
  const statsTwo = getExposedElement(value, "statsTwo");

  if (!root || !content || !header || !body || !statsOne || !statsTwo) return null;

  return {
    root,
    content,
    header,
    body,
    statsOne,
    statsTwo,
  };
};

function pulseContent(contentRef: { value: HTMLElement | null }) {
  const element = contentRef.value;
  if (!element) return;

  element.classList.remove("pulse-once-big");
  void element.offsetWidth;
  element.classList.add("pulse-once-big");
}

function pulseIntroContent() {
  pulseContent(introContentRef);

  getExposedElements(introRef.value, "$fadeWhenLeavingEls")
    .forEach((element) => {
      gsap.set(element, { autoAlpha: 1 });
    });
}

function pulseStateOfMoneyContent() {
  pulseContent(stateOfMoneyContentRef);
}

onMounted(async () => {
  await nextTick();
  await nextTick();

  const heroEl = getExposedElement(heroRef.value);
  const introEl = getExposedElement(introRef.value);
  const firstThingsFirstEl = getExposedElement(firstThingsFirstRef.value);
  const firstThingsFirstContentEl = getExposedElement(firstThingsFirstRef.value, "$contentEl");
  const firstThingsIntermissionEl = getExposedElement(firstThingsIntermissionRef.value);
  const firstThingsSecondEl = getExposedElement(firstThingsSecondRef.value);
  const firstThingsSecondContentEl = getExposedElement(firstThingsSecondRef.value, "$contentEl");
  const group1El = getExposedElement(group1Ref.value);
  const stateOfMoneyEl = getExposedElement(stateOfMoneyRef.value);
  const inflationRisk = getRiskElements(inflationRiskRef.value);
  const inflationOverlayEl = getExposedElement(inflationOverlayRef.value);
  const inflationOverlayContentEl = getExposedElement(inflationOverlayRef.value, "$contentEl");
  const fiatCollapseRisk = getRiskElements(fiatCollapseRiskRef.value);
  const fiatCollapseOverlayEl = getExposedElement(fiatCollapseOverlayRef.value);
  const fiatCollapseOverlayContentEl = getExposedElement(fiatCollapseOverlayRef.value, "$contentEl");
  const deathSpiralsRisk = getRiskElements(deathSpiralsRiskRef.value);
  const deathSpiralsOverlayEl = getExposedElement(deathSpiralsOverlayRef.value);
  const deathSpiralsOverlayContentEl = getExposedElement(deathSpiralsOverlayRef.value, "$contentEl");

  if (
    !pageRef.value ||
    !heroEl ||
    !introEl ||
    !introContentRef.value ||
    !firstThingsFirstEl ||
    !firstThingsFirstContentEl ||
    !firstThingsFirstRunwayRef.value ||
    !firstThingsIntermissionEl ||
    !firstThingsSecondEl ||
    !firstThingsSecondContentEl ||
    !firstThingsSecondRunwayRef.value ||
    !group1El ||
    !groupEffectsRef.value ||
    !stateOfMoneyEl ||
    !stateOfMoneyContentRef.value ||
    !stateOfMoneyRunwayRef.value ||
    !inflationRisk ||
    !inflationRiskRunwayRef.value ||
    !inflationOverlayEl ||
    !inflationOverlayContentEl ||
    !inflationOverlayRunwayRef.value ||
    !fiatCollapseRisk ||
    !fiatCollapseRiskRunwayRef.value ||
    !fiatCollapseOverlayEl ||
    !fiatCollapseOverlayContentEl ||
    !fiatCollapseOverlayRunwayRef.value ||
    !deathSpiralsRisk ||
    !deathSpiralsRiskRunwayRef.value ||
    !deathSpiralsOverlayEl ||
    !deathSpiralsOverlayContentEl ||
    !deathSpiralsOverlayRunwayRef.value
  ) {
    return;
  }

  gsapContext = gsap.context(() => {
    const leavingRefs = [
      heroRef,
      introRef,
      firstThingsSecondRef,
      stateOfMoneyRef,
      group1Ref,
      group2Ref,
      group3Ref,
      conclusionRef,
    ];

    const moveWhenLeaving = (
      section: HTMLElement,
      element: HTMLElement,
      scrollTrigger: {
        trigger?: HTMLElement;
        start?: string | number | (() => string | number);
        end?: string | number | (() => string | number);
      } = {},
    ) => {
      gsap.to(element, {
        autoAlpha: 0,
        y: 32 * getElementSpeed(element),
        scale: 0.65,
        transformOrigin: "center center",
        ease: "none",
        scrollTrigger: {
          trigger: scrollTrigger.trigger ?? section,
          start: scrollTrigger.start ?? (() => getMoveStart(element)),
          end: scrollTrigger.end ?? (() => getMoveEnd(element)),
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    };

    const fadeWhenLeaving = (
      section: HTMLElement,
      element: HTMLElement,
    ) => {
      const initialHeight = element.offsetHeight;

      gsap.set(element, {
        height: initialHeight,
        overflow: "hidden",
      });

      gsap.to(element, {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: () => getFadeStart(element),
          end: () => getFadeEnd(element),
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(element, {
        height: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: () => getFadeStart(element),
          end: () => getScaleEnd(element),
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    };

    const moveToCenter = (
      section: HTMLElement,
      element: HTMLElement,
    ) => {
      const isFixed = () => window.getComputedStyle(element).position === "fixed";

      gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 95%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        element,
        { top: () => isFixed() ? window.innerHeight - 40 : -40 },
        {
          top: "45%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: () => `top ${100 - 50 / getMoveSpeed(element)}%`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      if (isFixed()) {
        const setHiddenAfterContent = (self: ScrollTrigger) => {
          if (self.isActive || self.progress === 1) {
            gsap.set(element, { autoAlpha: 0 });
          }
        };

        ScrollTrigger.create({
          trigger: section,
          start: "bottom 70%",
          end: "bottom top",
          invalidateOnRefresh: true,
          onEnter: () => gsap.set(element, { autoAlpha: 0 }),
          onEnterBack: () => gsap.set(element, { autoAlpha: 0 }),
          onLeaveBack: () => gsap.set(element, { autoAlpha: 1 }),
          onRefresh: setHiddenAfterContent,
          onUpdate: setHiddenAfterContent,
        });
      }
    };

    const moveTopWhileScrolling = (
      section: HTMLElement,
      element: HTMLElement,
    ) => {
      const startTop = element.style.top || window.getComputedStyle(element).top;

      gsap.fromTo(
        element,
        { top: startTop },
        {
          top: () => getTopMax(element),
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: () => getTopEnd(element),
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    };

    const transitionBackgroundFrom = (
      section: HTMLElement,
      element: HTMLElement,
      exitTrigger = section,
    ) => {
      const backgroundFrom = section.dataset.gsapBgFrom;
      if (!backgroundFrom) return;

      const backgroundTo = window.getComputedStyle(element).backgroundColor;

      gsap.fromTo(
        element,
        { backgroundColor: backgroundFrom },
        {
          backgroundColor: backgroundTo,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        element,
        { backgroundColor: backgroundTo },
        {
          backgroundColor: backgroundFrom,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: exitTrigger,
            start: "bottom bottom",
            end: "bottom center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    };

    leavingRefs.forEach((sectionRef) => {
      const sectionEl = getExposedElement(sectionRef.value);
      if (!sectionEl) return;

      getExposedElements(sectionRef.value, "$moveWhenLeavingEls")
        .forEach((element) => moveWhenLeaving(sectionEl, element));

      getExposedElements(sectionRef.value, "$fadeWhenLeavingEls")
        .forEach((element) => fadeWhenLeaving(sectionEl, element));

      getExposedElements(sectionRef.value, "$moveToCenterEls")
        .forEach((element) => moveToCenter(sectionEl, element));

      getExposedElements(sectionRef.value, "$topWhileScrollingEls")
        .forEach((element) => moveTopWhileScrolling(sectionEl, element));
    });

    [
      firstThingsFirstRef,
      firstThingsIntermissionRef,
      firstThingsSecondRef,
      inflationOverlayRef,
      fiatCollapseOverlayRef,
      deathSpiralsOverlayRef,
    ].forEach((sectionRef) => {
      const sectionEl = getExposedElement(sectionRef.value);
      const backgroundEl = getExposedElement(sectionRef.value, "$gsapBackgroundToEl");
      const exitTrigger = (
        sectionRef === inflationOverlayRef ? inflationOverlayRunwayRef.value :
        sectionRef === fiatCollapseOverlayRef ? fiatCollapseOverlayRunwayRef.value :
        sectionRef === deathSpiralsOverlayRef ? deathSpiralsOverlayRunwayRef.value :
        sectionEl
      );

      if (sectionEl && backgroundEl && exitTrigger) {
        transitionBackgroundFrom(sectionEl, backgroundEl, exitTrigger);
      }
    });

    gsap.fromTo(
      introContentRef.value,
      { y: "-20vh" },
      {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: introEl,
          start: "top bottom",
          end: "center center",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );

    ScrollTrigger.create({
      trigger: stateOfMoneyEl,
      start: "center center",
      invalidateOnRefresh: true,
      onEnter: pulseStateOfMoneyContent,
      onEnterBack: pulseStateOfMoneyContent,
    });

    ScrollTrigger.create({
      trigger: stateOfMoneyEl,
      start: "top top",
      end: () => `+=${stateOfMoneyRunwayRef.value?.offsetHeight ?? 0}`,
      pin: stateOfMoneyEl,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    const updateGroupEffectsHeight = () => {
      if (!groupEffectsRef.value) return;

      groupEffectsRef.value.style.height = `${group1El.offsetHeight}px`;
      groupEffectsRef.value.style.width = `${group1El.offsetWidth}px`;
    };

    updateGroupEffectsHeight();

    ScrollTrigger.create({
      trigger: group1El,
      start: "bottom bottom",
      endTrigger: inflationOverlayRunwayRef.value,
      end: "bottom bottom",
      pin: groupEffectsRef.value,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefreshInit: updateGroupEffectsHeight,
      onRefresh: updateGroupEffectsHeight,
    });

    const pinOverlayForRunway = (
      overlay: HTMLElement,
      runwayRef: { value: HTMLElement | null },
    ) => {
      ScrollTrigger.create({
        trigger: overlay,
        start: "top top",
        end: () => `+=${runwayRef.value?.offsetHeight ?? 0}`,
        pin: overlay,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    };


    const scenes = [
      {
        section: introEl,
        trigger: introEl,
        start: "center center",
        onEnter: pulseIntroContent,
        onEnterBack: pulseIntroContent,
      },
      {
        section: firstThingsIntermissionEl,
        trigger: firstThingsIntermissionEl,
        start: "bottom bottom",
      },
    ];

    const updateTopClasses = () => {
      pageRef.value
        ?.querySelectorAll<HTMLElement>("[gsap-is-at-or-above-top]")
        .forEach((element) => {
          element.classList.toggle(
          "gsap-is-at-or-above-top",
            element.getBoundingClientRect().top <= 1,
          );
        });
    };

    scenes.forEach((scene) => {
      ScrollTrigger.create({
        trigger: scene.trigger,
        start: scene.start,
        endTrigger: scene.endTrigger ?? deathSpiralsOverlayEl,
        end: scene.end ?? "bottom bottom",
        pin: scene.section,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          scene.onEnter?.();
          updateTopClasses();
        },
        onEnterBack: () => {
          scene.onEnterBack?.();
          updateTopClasses();
        },
        onLeaveBack: () => {
          scene.onLeaveBack?.();
          updateTopClasses();
        },
        onRefresh: updateTopClasses,
        onUpdate: updateTopClasses,
      });
    });

    const createScrollableOverlay = (
      overlay: HTMLElement,
      content: HTMLElement,
      runwayRef: { value: HTMLElement | null },
      exposedRef: { value: unknown },
      pinEndTrigger?: HTMLElement,
    ) => {
      const getScrollDistance = () => {
        const viewport = content.parentElement?.parentElement;
        if (!viewport) return 0;

        const bottomPadding = 48;
        const viewportHeight = Math.min(viewport.clientHeight, window.innerHeight - 24);

        return Math.max(
          0,
          content.offsetTop + content.scrollHeight - viewportHeight + bottomPadding,
        );
      };

      const getRunwayDistance = () => (
        getScrollDistance() +
        (window.innerHeight * 0.25)
      );

      const updateRunway = () => {
        if (!runwayRef.value) return;

        runwayRef.value.style.height = `${getRunwayDistance()}px`;
      };

      updateRunway();

      ScrollTrigger.create({
        trigger: overlay,
        start: "top top",
        endTrigger: pinEndTrigger ?? runwayRef.value,
        end: "bottom bottom",
        pin: overlay,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefreshInit: updateRunway,
        onRefresh: updateRunway,
      });

      gsap.fromTo(
        content,
        { y: 0 },
        {
          y: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: overlay,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            scrub: true,
            invalidateOnRefresh: true,
            onRefreshInit: updateRunway,
            onRefresh: updateRunway,
          },
        },
      );

      getExposedElements(exposedRef.value, "$moveWhenAtEndEls")
        .forEach((element) => {
          moveWhenLeaving(overlay, element, {
            trigger: overlay,
            start: () => overlay.offsetTop + getScrollDistance() + getPauseDistance(element),
            end: () => overlay.offsetTop + getScrollDistance() + getPauseDistance(element) + (window.innerHeight * 0.2),
          });
        });
    };

    createScrollableOverlay(
      firstThingsFirstEl,
      firstThingsFirstContentEl,
      firstThingsFirstRunwayRef,
      firstThingsFirstRef,
      firstThingsIntermissionEl,
    );

    createScrollableOverlay(
      firstThingsSecondEl,
      firstThingsSecondContentEl,
      firstThingsSecondRunwayRef,
      firstThingsSecondRef,
    );

    createScrollableOverlay(
      inflationOverlayEl,
      inflationOverlayContentEl,
      inflationOverlayRunwayRef,
      inflationOverlayRef,
    );

    createScrollableOverlay(
      fiatCollapseOverlayEl,
      fiatCollapseOverlayContentEl,
      fiatCollapseOverlayRunwayRef,
      fiatCollapseOverlayRef,
    );

    createScrollableOverlay(
      deathSpiralsOverlayEl,
      deathSpiralsOverlayContentEl,
      deathSpiralsOverlayRunwayRef,
      deathSpiralsOverlayRef,
    );

    const createScrollableRiskContent = (
      risk: NonNullable<ReturnType<typeof getRiskElements>>,
      runwayRef: { value: HTMLElement | null },
      pinEndTrigger: HTMLElement,
    ) => {
      const getScrollDistance = () => {
        const bottomPadding = 48;
        const availableHeight = Math.max(
          0,
          window.innerHeight - risk.header.offsetHeight,
        );

        return Math.max(
          0,
          risk.content.scrollHeight - availableHeight + bottomPadding,
        );
      };

      const getRunwayDistance = () => (
        getScrollDistance() +
        (window.innerHeight * 0.25)
      );

      const updateRunway = () => {
        if (!runwayRef.value) return;

        runwayRef.value.style.height = `${getRunwayDistance()}px`;
      };

      updateRunway();

      ScrollTrigger.create({
        trigger: risk.root,
        start: "top top",
        endTrigger: pinEndTrigger,
        end: "top top",
        pin: risk.root,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefreshInit: updateRunway,
        onRefresh: updateRunway,
      });

      gsap.fromTo(
        risk.content,
        { y: 0 },
        {
          y: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: risk.root,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            scrub: true,
            invalidateOnRefresh: true,
            onRefreshInit: updateRunway,
            onRefresh: updateRunway,
          },
        },
      );
    };

    createScrollableRiskContent(inflationRisk, inflationRiskRunwayRef, inflationOverlayEl);
    createScrollableRiskContent(fiatCollapseRisk, fiatCollapseRiskRunwayRef, fiatCollapseOverlayEl);
    createScrollableRiskContent(deathSpiralsRisk, deathSpiralsRiskRunwayRef, deathSpiralsOverlayEl);
    updateGroupEffectsHeight();

    const createRiskTimeline = (
      risk: NonNullable<ReturnType<typeof getRiskElements>>,
      endTrigger: HTMLElement,
    ) => {
      const revealItems = [risk.body, risk.statsOne, risk.statsTwo];

      gsap.set(revealItems, {
        autoAlpha: 0,
        y: 28,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: risk.header,
          start: "center center",
          endTrigger: risk.root,
          end: "top top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
        .to(risk.body, {
          autoAlpha: 1,
          y: 0,
          ease: "none",
          duration: 1,
        })
        .to(risk.statsOne, {
          autoAlpha: 1,
          y: 0,
          ease: "none",
          duration: 1,
        })
        .to(risk.statsTwo, {
          autoAlpha: 1,
          y: 0,
          ease: "none",
          duration: 1,
        });
    };

    createRiskTimeline(inflationRisk, inflationOverlayEl);
    createRiskTimeline(fiatCollapseRisk, fiatCollapseOverlayEl);
    createRiskTimeline(deathSpiralsRisk, deathSpiralsOverlayEl);

  }, pageRef.value);
});

onUnmounted(() => {
  gsapContext?.revert();
});
</script>
