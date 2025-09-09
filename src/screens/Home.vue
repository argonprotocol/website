<template>
  <div class="Home Screen">
    <TopBar class="relative z-10" :darkMode="true" />

    <main class=" flex flex-col items-center text-center min-h-screen relative border-b border-argon-800">
      <div class="relative grid grid-cols-2 items-center text-center gap-x-4 gap-y-16 text-white/60 pt-24 pb-10 w-10/12">
        
        <div class="flex flex-row justify-start text-left pr-[110px]">
          <RouterLink class="relative block items-star group hover:text-white" to="/learn/four-pillars/immunity-from-death-spirals">
            <div class="absolute -top-3 -left-3 right-1 -bottom-3 bg-black/30 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
            <header class="flex flex-row items-center text-xl font-black mb-1 relative">
              <span class="relative z-10 whitespace-nowrap pr-3">Immunity from Death Spiral</span>
              <div class="grow h-px bg-black/60 group-hover:invisible" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)" />
            </header>
            <div class="text-lg font-light relative w-fit inline-block cursor-pointer pr-7">
              <span>The further Argon falls, the faster it</span>
              <span class="block">rebounds back to target</span>
            </div>
          </RouterLink>
          <div class="grow">
            <div class="text-xl font-black relative z-10">
              &nbsp;
              <div class="absolute bg-black/60 top-1/2 -translate-y-1/2 left-0 w-full h-px" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)"></div>
            </div>
          </div>
        </div>

        <div class="flex flex-row justify-start text-right pl-[110px]">
          <div class="grow">
            <div class="text-xl font-black relative z-10">
              &nbsp;
              <div class="absolute bg-black/60 top-1/2 -translate-y-1/2 right-0 w-full h-px" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)"></div>
            </div>
          </div>
          <RouterLink class="relative block items-star group hover:text-white" to="/learn/four-pillars/full-  stack-decentralization">
            <div class="absolute -top-3 -right-3 left-1 -bottom-3 bg-black/30 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
            <header class="flex flex-row items-center text-xl font-black mb-1 relative">
              <div class="grow h-px bg-black/60 group-hover:invisible" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)" />
              <span class="relative z-10 whitespace-nowrap pl-3">Full Stack Decentralization</span>
            </header>
            <div class="text-lg font-light relative w-fit inline-block cursor-pointer pl-7">
              <span>Argon doesn't care if banks fail or</span>
              <span class="block">government bonds collapse</span>
            </div>
          </RouterLink>
        </div>

        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[-90%] w-[80px] md:w-[220px] z-20">
          <LogoSkinny class="w-full text-white/70" />
          <div class="absolute left-1/2 top-[97%] translate-y-4 w-px h-[75%] bg-black/60" style="box-shadow: 1px 0 0 rgba(255,255,255,0.25)" />
        </div>
        
        <div class="flex flex-row justify-start text-left pr-[30px]">
          <RouterLink class="relative block items-star group hover:text-white" to="/learn/four-pillars/zero-inflation-money">
            <div class="absolute -top-3 -left-3 right-1 -bottom-3 bg-black/30 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
            <header class="flex flex-row items-center text-xl font-black mb-1 relative">
              <span class="relative z-10 whitespace-nowrap pr-3">Zero Inflation Money</span>
              <div class="grow h-px bg-black/60 group-hover:invisible" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)" />
            </header>
            <div class="text-lg font-light relative w-fit inline-block cursor-pointer pr-7">
              <span>Argon allows you to build wealth</span>
              <span class="block">without worrying about time eroding it</span>
            </div>
          </RouterLink>
          <div class="grow">
            <div class="text-xl font-black relative z-10">
              &nbsp;
              <div class="absolute bg-black/60 top-1/2 -translate-y-1/2 left-0 w-full h-px" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)" />
              <div class="absolute right-0 top-[-125%] w-px h-[180%] bg-black/60" style="box-shadow: 1px 0 0 rgba(255,255,255,0.25)" />
            </div>
          </div>
        </div>

        <div class="flex flex-row justify-start text-right pl-[30px]">
          <div class="grow">
            <div class="text-xl font-black relative z-10">
              &nbsp;
              <div class="absolute bg-black/60 top-1/2 -translate-y-1/2 right-0 w-full h-px" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)" />
              <div class="absolute left-0 top-[-125%] w-px h-[180%] bg-black/60" style="box-shadow: 1px 0 0 rgba(255,255,255,0.25)" />
            </div>
          </div>
          <RouterLink class="relative block items-star group hover:text-white" to="/learn/four-pillars/exogenous-profit-incentives">
            <div class="absolute -top-3 -right-3 left-1 -bottom-3 bg-black/30 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
            <header class="flex flex-row items-center text-xl font-black mb-1 relative">
              <div class="grow h-px bg-black/60 group-hover:invisible" style="box-shadow: 0 1px 0 rgba(255,255,255,0.25)" />
              <span class="relative z-10 whitespace-nowrap pl-3">Exogenous Profit Incentives</span>
            </header>
            <div class="text-lg font-light relative w-fit inline-block cursor-pointer pl-7">
              <span>Argon solves the core problem inherent</span>
              <span class="block">in previous algorithmic stablecoins</span>
            </div>
          </RouterLink>
        </div>

      </div>

      <RouterLink as="h1" to="/learn/four-pillars"
        class="text-white text-6xl md:text-8xl uppercase opacity-75 my-5 font-black hover:opacity-90"
        style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);"
        >
        <div class="my-5">THE STABLECOIN</div>
        <div class="my-5">BUILT TO LAST FOR A</div>
        <div class="my-5">THOUSAND YEARS</div>
      </RouterLink>

      <p class="text-white w-10/12 md:w-8/12 px-6 md:px-10 text-xl mt-4 md:mt-2 md:text-xl lg:text-2xl font-light md:leading-[3rem] lg:leading-[2.2rem] opacity-80">
        Argon's novel algorithmic stablecoin leverages Bitcoin's $2.7T market capitalization to create a currency you can depend
        on. Bitcoin drives both the bootstrapping mechanism of the Argon network and the stabilizing force of its currency. Argon's 
        immutable purchasing power never loses value like fiat or fiat-pegged stablecoins, and it has zero centralized 
        dependencies, meaning it can outlast any nation state or world calamity.
      </p>

      <div class="flex flex-col md:flex-row gap-16 text-white font-bold text-xl w-8/12 mx-auto py-16 relative">
        <RouterLink to="/learn" class="grow border border-argon-900 rounded-md md:px-32 py-4 hover:bg-white/10 font-bold" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.3), 1px 1px 0 rgba(255, 255, 255, 0.3);">
          Learn More
        </RouterLink>
        <RouterLink to="/start" class="grow border border-argon-900 rounded-md md:px-32 py-4 hover:bg-white/10 font-bold" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.3), 1px 1px 0 rgba(255, 255, 255, 0.3);">
          Get Started
          <ChevronDoubleRightIcon class="w-4 h-4 inline-block" />
        </RouterLink>
      </div>

      <div class="relative flex flex-row items-stretch whitespace-nowrap w-full text-white/80 py-5 mt-12">
        <div class="DIVIDER-HORIZONTAL-FADED !absolute top-0 left-0"></div>
        <RouterLink as="div" to="/learn/currency-metrics/argons-in-circulation" class="w-1/3 py-5">
          <div class="text-6xl font-bold">{{ numeral(circulation).format('0,0') }}</div>
          <div class="mt-2 font-light">ARGNs In Circulation</div>
        </RouterLink>
        <div class="DIVIDER-VERTICAL !h-auto self-stretch"></div>
        <RouterLink as="div" to="/learn/currency-metrics/argon-to-dollar-exchange-rate" class="w-1/3 py-5">
          <div class="text-6xl font-bold">₳1.00 -> ${{ usdForArgon ? numeral(usdForArgon).format('0.00') : '-.--' }}</div>
          <div class="mt-2 font-light">ARGN-to-USD Exchange Rate</div>
        </RouterLink>
        <div class="DIVIDER-VERTICAL !h-auto self-stretch"></div>
        <RouterLink as="div" to="/learn/currency-metrics/bitcoin-to-argon-short-value" class="w-1/3 py-5">
          <div class="text-6xl font-bold">₳{{ numeral(shortValue).format('0,0') }}</div>
          <div class="mt-2 font-light">BTC-to-ARGN Short Value (at TerraUSD collapse)</div>
        </RouterLink>
      </div>
    </main>
      
    <section class="relative flex flex-col bg-white items-center justify-center w-full pt-10 cursor-default text-center border-b border-argon-600/30 shadow-md">
      <h3 class="text-argon-600/70 font-bold text-2xl">DESIGNED TO WORK ACROSS ALL CHAINS</h3>
      <p class="text-black/50 text-xl w-7/12 mx-auto mt-4">
        Argon is a sovereign, level-one blockchain built on Polkadot's rust-based Substrate. It uses the Hyperbridge protocol to deliver
        trustless, native bridging across all major chains.
      </p>
      <div class="grid grid-cols-9 w-full text-center pt-12 pb-6 divide-x divide-argon-400/20 text-argon-600/70">
        <div class="opacity-80 hover:opacity-100" v-tooltip="'Live!'">
          <OptimismIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Optimism</div>
        </div>
        <div class="opacity-80 hover:opacity-100" v-tooltip="'Coming Soon'">
          <PolygonIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Polygon</div>
        </div>
        <div class="opacity-80 hover:opacity-100" v-tooltip="'Live!'">
          <BaseIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Base</div>
        </div>
        <div class="opacity-80 hover:opacity-100" v-tooltip="'Live!'">
          <EthereumIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Ethereum</div>
        </div>
        <div class="opacity-80 hover:opacity-100" v-tooltip="'Live!'">
          <ArbitrumIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Arbitrum</div>
        </div>
        <div class="opacity-80 hover:opacity-100" v-tooltip="'Coming Soon'">
          <CardanoIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Cardano</div>
        </div>
        <div class="opacity-80 hover:opacity-100" v-tooltip="'Coming Soon'">
          <PolkadotIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Polkadot</div>
        </div>
        <div class="opacity-80 hover:opacity-100" v-tooltip="'Coming Soon'">
          <GnosisIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Gnosis</div>
        </div>
        <div class="opacity-80 hover:opacity-100" v-tooltip="'Live!'">
          <BnbChainIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">BNB Chain</div>
        </div>
      </div>
    </section>

    <section class="relative flex flex-col pt-28">
      <h2 class="text-center text-7xl font-bold text-argon-700">
        <div class="font-light text-4xl mb-3">PARTICIPATE IN ARGON MINING AND VAULTING</div>
        <div>DIRECTLY FROM YOUR LAPTOP</div>
      </h2>

      <div class="relative opacity-70">
        <img src="/commander.png" alt="Argon Commander" class="w-10/12 mx-auto mt-12 object-cover object-top" style="height: 50vh;" />
        <div class="absolute left-0 bottom-0 w-full h-1/2" style="background: linear-gradient(to bottom, var(--bg-transparent) 0%, var(--bg-color) 100%)" />
      </div>

      <div class="flex flex-col items-center mt-20">
        <button @click="downloadCommander" class="flex flex-row items-center gap-3 bg-argon-button border border-argon-800 text-white rounded-md text-2xl px-40 py-5 font-bold cursor-pointer hover:bg-argon-button-hover" style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);">
          <MacIcon class="w-7 h-7 relative -top-0.5" />
          <span>Download Argon Commander for Mac</span>
        </button>
        <div class="text-gray-500/80 text-base mt-2">Lastest version: 1.0.0-rc2, experimental for testnet</div>
        <p class="w-7/12 mx-auto text-xl text-center opacity-80 mt-16">
          Argon's mining doesn't require expensive ASIC mining rigs. Instead, you can use any basic laptop computer. We built 
          Argon Commander to run on Windows, Linux, or MacOS. It's fully anonymous with 
          no centralized logins, telementry data or other trackable mechanics. Download and use as you please.</p>
      </div>

      <div class="grid grid-cols-4 w-full text-center pb-6 mt-32 divide-x divide-argon-400/30 text-argon-600/70">
        <RouterLink as="div" to="/learn/mining-metrics/active-mining-seats" class="opacity-80 hover:opacity-100 py-5">
          <div class="text-6xl font-bold">100</div>
          <div class="mt-2 font-light">Active Mining Seats</div>
        </RouterLink>
        <RouterLink as="div" to="/learn/mining-metrics/current-mining-apy" class="opacity-80 hover:opacity-100 py-5">
          <div class="text-6xl font-bold">473.3%</div>
          <div class="mt-2 font-light">Current Mining APY</div>
        </RouterLink>
        <RouterLink as="div" to="/learn/vaulting-metrics/active-vaults" class="opacity-80 hover:opacity-100 py-5">
          <div class="text-6xl font-bold">4</div>
          <div class="mt-2 font-light">Active Vaults</div>
        </RouterLink>
        <RouterLink as="div" to="/learn/vaulting-metrics/current-vaulting-apy" class="opacity-80 hover:opacity-100 py-5">
          <div class="text-6xl font-bold">528.1%</div>
          <div class="mt-2 font-light">Current Vaulting APY</div>
        </RouterLink>
      </div>
    </section>

    <section class="relative flex flex-col bg-white items-center justify-center w-full pt-16 pb-4 cursor-default text-center border-t border-argon-800/15 border-b border-b-argon-900/70" style="box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);">
      <h3 class="text-argon-600/80 font-bold text-2xl">THE AI-FIRST MICROPAYMENT STACK</h3>
      <p class="text-black/50 text-xl w-8/12 mx-auto mt-4">
        Argon's L2 localchain is a lightweight, fast throughput, peer-to-peer payment protocol. Our new MCP Payment protocol will
        serve as the foundational layer for AI agents to faciliate payments.
      </p>
      <div class="grid grid-cols-6 w-full text-center pt-16 pb-6 divide-x divide-argon-400/20 text-argon-600/70">
        <div class="opacity-80 hover:opacity-100 py-2" v-tooltip="'Live!'">
          <ChatgptIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">ChatGPT</div>
        </div>
        <div class="opacity-80 hover:opacity-100 py-2" v-tooltip="'Coming Soon'">
          <ClaudeIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Claude</div>
        </div>
        <div class="opacity-80 hover:opacity-100 py-2" v-tooltip="'Live!'">
          <GeminiIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Gemini</div>
        </div>
        <div class="opacity-80 hover:opacity-100 py-2" v-tooltip="'Live!'">
          <GrokIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Grok</div>
        </div>
        <div class="opacity-80 hover:opacity-100 py-2" v-tooltip="'Live!'">
          <LlamaIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Llama</div>
        </div>
        <div class="opacity-80 hover:opacity-100 py-2" v-tooltip="'Coming Soon'">
          <MinstralIcon class="w-12 h-12 inline-block mb-2" />
          <div class="text-md">Minstral</div>
        </div>
      </div>
    </section>

    <section HelpUsBootstrap class="text-white">
      <h2 class="text-center text-7xl font-bold pt-24">
        <div class="font-light text-4xl mb-3">HELP US BOOTSTRAP ARGON INTO A</div>
        <div>TRILLION DOLLAR STABLECOIN</div>
      </h2>

      <div class="flex flex-col gap-5 w-8/12 mx-auto text-xl mt-12">
        <p class="text-justify">
          The world needs an alternative to inflation-ridden fiat currencies. Every year, fiat quietly erodes the savings of hard-working families while governments continue to accumulate unsustainable debts that threaten to collapse the entire system.
        </p>

        <p class="text-justify">
          Argon is designed to break this cycle, and it's doing it on top of Bitcoin. Argon's economic model uses the 
          process of endosymbiosis &ndash; the act of minting Argon from Bitcoin &ndash; to consume and convert Bitcoin's 
          fixed 21M supply into a stable currency. It's math creates an exponential growth curve that will continue to grow 
          until it establishes a stablecoin circulation worth twice Bitcoin's market value. At that scale, Argon will have 
          achieved the critical mass required to stand as an independent, global currency.
        </p>

        <p class="text-justify">
          On January 15, 2025, Argon launched with zero rewards in its genesis block. Unlike most other crypto projects, Argon showed no favoritism
          to the founders or early adopters. Its goal of becoming the world's dominant currency 
          requires a platform that can be fully trusted, fully open, and accessible to everyone. From day one.
        </p>

        <p class="text-justify">
          Argon's launch is unfolding across seven phases. The first two are now complete. The third is underway. You're invited to join us at
          any point along the journey.
        </p>
      </div>

      <div class="flex flex-col w-8/12 mx-auto gap-2 mt-10 pb-10">
        <ul ArrowsContainer class="mt-32 grid grid-cols-7 h-16 font-bold text-2xl text-white">
          <li :Selected="selectedPhase === 1 || undefined" class="relative w-full h-full">
            <div @click="selectPhase(1)" Arrow Start class="w-[calc(100%+10px)] h-full rounded-l-md">
              1
            </div>
          </li>
          <li :Selected="selectedPhase === 2 || undefined" class="relative w-full h-full">
            <div @click="selectPhase(2)" Arrow class="w-[calc(100%+10px)] relative left-[-1.6667px] h-full">
              2
            </div>
          </li>
          <li :Selected="selectedPhase === 3 || undefined" class="relative w-full h-full">
            <div :class="[selectedPhase === 3 ? 'opacity-100' : 'opacity-50']" class="absolute -top-3 left-0 -translate-y-full -translate-x-1/2">
              <PhasesArrow />
              <span class="text-white/80 font-black absolute top-0 -left-3 -translate-x-full -translate-y-1/2 whitespace-nowrap">We're Here</span>
            </div>
            <div @click="selectPhase(3)" Arrow class="w-[calc(100%+10px)] relative left-[-3.3334px] h-full">
              3
            </div>
          </li>
          <li :Selected="selectedPhase === 4 || undefined" class="relative w-[calc(100%+10px)] left-[-5.0001px] h-full">
            <div @click="selectPhase(4)" Arrow class="w-full h-full">
              4
            </div>
          </li>
          <li :Selected="selectedPhase === 5 || undefined" class="relative w-full h-full">
            <div @click="selectPhase(5)" Arrow class="w-[calc(100%+10px)] relative left-[-6.6667px] h-full">
              5
            </div>
          </li>
          <li :Selected="selectedPhase === 6 || undefined" class="relative w-full h-full">
            <div @click="selectPhase(6)" Arrow class="w-[calc(100%+10px)] relative left-[-8.3333px] h-full">
              6
            </div>
          </li>
          <li :Selected="selectedPhase === 7 || undefined" class="relative w-full h-full">
            <div @click="selectPhase(7)" Arrow End class="w-[calc(100%+10px)] relative left-[-10px] h-full rounded-r-md">
              7
            </div>
          </li>
        </ul>

        <div PhasesContainer class="flex flex-col gap-5 border border-black/60 border-t-0 rounded-md rounded-t-none px-12 py-10 mb-20" style="box-shadow: inset 1px 0 0 rgba(255, 255, 255, 0.2), 1px 1px 0 rgba(255, 255, 255, 0.2);">
          <div v-if="selectedPhase === 1">
            <h2>
              <div PhaseNumber>PHASE ONE</div>
              <div PhaseTitle>Initiate First Tokens Into Existence Through a Fair and Open Process</div>
            </h2>
            <div EstimatedTimeframe>Estimated Timeframe: 3 months</div>

            <div PhasesContent>
              <p>
                Argon's launch was a contrarian approach from most crypto projects. Rather than seeding the 
                network with tokens in its genesis block, Argon began with zero. To ensure a fair distribution, 
                it introduced a two-step process that used two different consensus mechanisms, giving everyone an 
                equal chance to earn early rewards.
              </p>

              <h3 class="font-bold mt-2">Proof-of-Compute-Work</h3>
              <p>
                Beginning January 15, 2025, anyone could connect their laptop, desktop, or even rented cloud servers 
                to the Argon network and join the mining process. Argon employed a custom, ASIC-resistant 
                proof-of-work algorithm designed to keep mining accessible and competitive. Thousands of machines 
                contributed from around the world, bootstrapping the initial token supply. This effort resulted is around 
                ~10,000 argons being minted into existence, providing enough circulation for the next phase to begin.
              </p>

              <h3 class="font-bold mt-2">Proof-of-Authorized-Work</h3>
              <p>
                On March 6, 2025, Argon transitioned into its second phase-one launch step. From this point forward, active 
                miners were determined through auctions. Participants were required to bid argons for the right to secure a mining 
                seat. Winners were selected based on highest bid. The mining seats were allowed to mine for a set duration. 
                This system created a transparent, market-based method for allocating mining power.
              </p>
              
              <h3 class="font-bold mt-2">Why This Matters</h3>
              <p>
                The two-step launch solved a critical challenge: with no founder tokens in the genesis block, it 
                would have been impossible to bid for mining seats on day one. There were no argons to bid with!
                Proof-of-Compute-Work allowed argons to be minted organically, paving the way for Proof-of-Authorized-Work to take over.
              </p>
              
              <p class="mt-2 font-bold">
                <span @click="selectPhase(2)" class="cursor-pointer hover:underline hover:text-argon-100">Next Step: Stabilize the Mining Seat Auctions with Transparency and Liquidity ⟫</span>
              </p>
            </div>
          </div>
          <div v-if="selectedPhase === 2">
            <h2>
              <div PhaseNumber>PHASE TWO</div>
              <div PhaseTitle>Stabilize the Mining Seat Auctions with Transparency and Liquidity</div>
            </h2>
            <div EstimatedTimeframe>Estimated Timeframe: 6 months</div>

            <div PhasesContent>
              <p>
                While Phase One successfully bootstrapped the network, it also revealed challenges with Argon's initial 
                auction format. Liquidity constraints and inefficiencies made it clear that improvements were needed to 
                ensure fairness and stability. For a deeper dive, see our 
                <a href="https://clarkbyrnes.substack.com/p/argon-learnings-from-epoch-one" class="opacity-80 hover:opacity-100">Learnings From Epoch One</a>
                blog post.
              </p>

              <p>
                Over the next six months, we focused on redesigning, implementing, and rigorously testing a new auction 
                framework. Our goal was to deliver greater transparency, efficiency, and balance across the network. 
                This upgraded system laid the foundation for Argon's next stage of growth.
              </p>
              
              <p class="mt-2 font-bold">
                <span @click="selectPhase(3)" class="cursor-pointer hover:underline hover:text-argon-100">Next Step: Grow Argon Into An Economically-Viable, Global Medium of Exchange ⟫</span>
              </p>
            </div>
          </div>
          <div v-if="selectedPhase === 3">
            <h2>
              <div PhaseNumber>PHASE THREE</div>
              <div PhaseTitle>Grow Argon Into An Economically-Viable, Global Medium of Exchange</div>
            </h2>
            <div EstimatedTimeframe>Estimated Timeframe: 8 months</div>

            <div PhasesContent>
              <p>
                Phase Three marks a critical inflection point where we begin scaling Argon into a major stablecoin. It also 
                coincides with the launch of Argon Commander, a desktop app for Windows, Linux, and macOS that makes mining 
                and vaulting simple and accessible for all.
              </p>

              <p>
                The goal is to expand Argon's circulation to 200-300 million tokens. This would provide a threshold large 
                enough to support meaningful market activity without unhealthy price volatility.
              </p>

              <h3 class="font-bold">What's Needed</h3>

              <ul>
                <li class="list-['-'] ml-3 pl-3"><strong>A robust community of miners</strong>. These miners will mint the 200M-300M argons required for a functioning economy, earning the value of those newly created tokens.</li>

                <li class="list-['-'] ml-3 pl-3 mt-5"><strong>A robust community of vaulters</strong>. These vaulters will securitize argons by locking bitcoin, stabilizing the system, and earning payouts from the treasury pools.</li>

                <li class="list-['-'] ml-3 pl-3 mt-5"><strong>Bitcoiners who liquid-lock</strong>. By locking their bitcoins, they help stabilize Argon while gaining the ability to unlock the full market value of their assets—hedging against downside volatility.</li>
              </ul>
              
              <p>
                Together, these participants form the foundation of Argon's economic engine.
              </p>

              <p class="mt-2 font-bold">
                <span @click="selectPhase(4)" class="cursor-pointer hover:underline hover:text-argon-100">Next Step: Activate the AI Payments Layer ⟫</span>
              </p>
            </div>
          </div>

          <div v-if="selectedPhase === 4">
            <h2>
              <div PhaseNumber>PHASE FOUR</div>
              <div PhaseTitle>Activate the AI Payments Layer</div>
            </h2>
            <div EstimatedTimeframe>Estimated Timeframe: 6 months</div>

            <div PhasesContent>
              <p></p>
              
              <p class="mt-2 font-bold">
                <span @click="selectPhase(5)" class="cursor-pointer hover:underline hover:text-argon-100">Next Step: Launch the Larger Payments Layer ⟫</span>
              </p>
            </div>
          </div>

          <div v-if="selectedPhase === 5">
            <h2>
              <div PhaseNumber>PHASE FIVE</div>
              <div PhaseTitle>Launch the Larger Payments Layer</div>
            </h2>
            <div EstimatedTimeframe>Estimated Timeframe: 12 months</div>

            <div PhasesContent>
              <p></p>
              
              <p class="mt-2 font-bold">
                <span @click="selectPhase(6)" class="cursor-pointer hover:underline hover:text-argon-100">Next Step: Split Mining Seats Into Fractional Ownership to Sustain Larger Growth ⟫</span>
              </p>
            </div>
          </div>

          <div v-if="selectedPhase === 6">
            <h2>
              <div PhaseNumber>PHASE SIX</div>
              <div PhaseTitle>Split Mining Seats Into Fractional Ownership to Sustain Larger Growth</div>
            </h2>
            <div EstimatedTimeframe>Estimated Timeframe: 3 months</div>

            <div PhasesContent>
              <p></p>
              
              <p class="mt-2 font-bold">
                <span @click="selectPhase(7)" class="cursor-pointer hover:underline hover:text-argon-100">Next Step: Facilitate Sovereign SDK Integration⟫</span>
              </p>
            </div>
          </div>

          <div v-if="selectedPhase === 7">
            <h2>
              <div PhaseNumber>PHASE SEVEN</div>
              <div PhaseTitle>Facilitate Sovereign SDK Integration</div>
            </h2>
            <div EstimatedTimeframe>Estimated Timeframe: 5 years</div>

            <div PhasesContent>
              <p></p>
              
            </div>
          </div>

        </div>
      </div>

    </section>

    <FooterBar :darkMode="true" />
  </div>
</template>

<script lang="ts">
import * as Vue from 'vue';

const circulation = Vue.ref(0);
const usdForArgon = Vue.ref(0);
const shortValue = Vue.ref(0);
</script>

<script setup lang="ts">
import LogoSkinny from '../assets/logo-skinny.svg?component';
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/outline';
import OptimismIcon from '../assets/chains/optimism.svg?component';
import PolygonIcon from '../assets/chains/polygon.svg?component';
import BaseIcon from '../assets/chains/base.svg?component';
import EthereumIcon from '../assets/chains/ethereum.svg?component';
import ArbitrumIcon from '../assets/chains/arbitrum.svg?component';
import CardanoIcon from '../assets/chains/cardano.svg?component';
import PolkadotIcon from '../assets/chains/polkadot.svg?component';
import GnosisIcon from '../assets/chains/gnosis.svg?component';
import BnbChainIcon from '../assets/chains/bnbchain.svg?component';
import ChatgptIcon from '../assets/aimodels/chatgpt.svg?component';
import ClaudeIcon from '../assets/aimodels/claude.svg?component';
import GeminiIcon from '../assets/aimodels/gemini.svg?component';
import GrokIcon from '../assets/aimodels/grok.svg?component';
import LlamaIcon from '../assets/aimodels/llama.svg?component';
import MinstralIcon from '../assets/aimodels/minstral.svg?component';
import PhasesArrow from '../assets/phases-arrow.svg?component';
import MacIcon from '../assets/os/mac.svg?component';
import vTooltip from '../directives/tooltip';
import FooterBar from '../navigation/FooterBar.vue';
import TopBar from '../navigation/TopBar.vue';
import { getClient, convertFixedU128ToBigNumber } from '@argonprotocol/mainchain';
import numeral from 'numeral';

shortValue.value = calculateUnlockBurnPerBitcoinDollar(0.001) * 1_028;

const selectedPhase = Vue.ref(3);

function selectPhase(phase: number) {
  selectedPhase.value = phase;
}

function calculateUnlockBurnPerBitcoinDollar(argonRatioPrice: number): number {
  const r = argonRatioPrice;
  if (r >= 1.0) {
    return 1;
  } else if (r >= 0.9) {
    return 20 * Math.pow(r, 2) - 38 * r + 19;
  } else if (r >= 0.01) {
    return (0.5618 * r + 0.3944) / r;
  } else {
    return (1 / r) * (0.576 * r + 0.4);
  }
}

function downloadCommander() {
  window.open('https://github.com/argonprotocol/commander/releases/download/v0.1.0-rc2/Argon.Commander.-.Experimental_0.1.0-rc2_universal.dmg');
}

Vue.onMounted(async () => {
  const api = await getClient('wss://rpc.testnet.argonprotocol.org')

  const totalIssuance = await api.query.balances.totalIssuance();
  circulation.value = totalIssuance.toNumber() / 1_000_000;

  const priceIndexRaw = await api.query.priceIndex.current();
  const priceIndex = priceIndexRaw.value;
  const usdForArgonBn = convertFixedU128ToBigNumber(priceIndex.argonUsdPrice.toBigInt());
  usdForArgon.value = usdForArgonBn.toNumber();
})

</script>

<style>
@import "../main.css";

.Home.Screen {
  main {
    background: linear-gradient(to bottom, #780F85, #A428B3);
  }

  [HelpUsBootstrap] {
    background: linear-gradient(to bottom, #A428B3, #780F85);
  }

  --line-dark: rgba(15, 1, 17, 0.7);
  --line-dark-transparent: rgba(15, 1, 17, 0);

  --line-light: rgba(255, 255, 255, 0.2);
  --line-light-transparent: rgba(255, 255, 255, 0);

  [PhasesContainer] {
    h2 {
      [PhaseNumber] {
        @apply uppercase opacity-60 text-xl font-light;
      }
      [PhaseTitle] {
        @apply text-5xl font-bold mt-3 leading-16 -ml-px;
      }
    }
    [EstimatedTimeframe] {
      @apply text-lg font-light mt-3 border-t border-b border-dashed border-white/30 pt-3 pb-3;
    }
    [PhasesContent] {
      @apply flex flex-col gap-5 mt-7 text-lg;
    }
  }


  .DIVIDER-HORIZONTAL {
    background: linear-gradient(to right, var(--line-dark-transparent) 0%,  10%, var(--line-dark) 90%, var(--line-dark-transparent) 100%);
  }

  .DIVIDER-VERTICAL {
    position: relative;
    height: 100%;
    width: 1px;
    background: var(--line-dark);
    &:after {
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--line-light);
      top: 0;
      left: 1px;
      content: '';
    }
  }

  .DIVIDER-HORIZONTAL-FADED {
    position: relative;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, var(--line-dark-transparent) 0%, var(--line-dark) 10%, var(--line-dark) 90%,  var(--line-dark-transparent) 100%);
    &:after {
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: -1px;
      left: 0;
      content: '';
      background: linear-gradient(to right, var(--line-light-transparent) 0%, var(--line-light) 10%, var(--line-light) 90%, var(--line-light-transparent) 100%);  }
  }

  [ArrowsContainer] {
    [Arrow] {
      @apply flex flex-row items-center justify-center border border-argon-900 bg-argon-800 hover:bg-argon-900 cursor-pointer;

      clip-path: polygon(
        0% 0%, 
        calc(100% - 30px) 0%, 
        100% 50%, 
        calc(100% - 30px) 100%, 
        0% 100%, 
        30px 50%
      );
    }
    [Arrow][Start] {
      clip-path: polygon(
        0% 0%, 
        calc(100% - 30px) 0%, 
        100% 50%, 
        calc(100% - 30px) 100%, 
        0% 100%
      );
    }
    [Arrow][End] {
      clip-path: polygon(
        0% 0%, 
        100% 0%, 
        100% 100%, 
        0% 100%, 
        30px 50%
      );
    }

    li[Selected] [Arrow] {
      @apply bg-argon-400 border border-argon-800 inner-button-shadow;
    }
  }
}
</style>