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
            <div class="text-3xl md:text-5xl xl:text-6xl mx-auto text-center leading-tight md:leading-normal mt-1 px-4">
              <span>Understanding Fiat Money</span>
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

      <ScrollOverlay color="charcoal" ref="firstThingsFirstRef" class="z-40">
        <template #header>
          <div class="text-white text-center font-serif mx-auto pt-8 md:pt-16 pb-5 border-b border-gray-300/20 max-w-210">
            <div class="text-xl md:text-3xl uppercase text-argon-100/90">A Very Brief</div>
            <div class="text-4xl md:text-6xl xl:text-7xl mt-1 md:mt-2">History of Money</div>
          </div>
        </template>

        <div class="mt-6 md:mt-16 w-full max-w-210 flex flex-col mx-auto px-4 md:px-8 gap-y-8 md:gap-y-12 relative z-20">
          <div>
            <header class="font-serif text-xl md:text-2xl font-bold">
              Inventing Paper Money
            </header>
            <p class="mt-1 text-base md:text-xl leading-relaxed font-serif">
              Paper money was invented in 7th century A.D. to solve gold's biggest weakness: large amounts are
              <span class="text-argon-100">heavy</span> to
              move, <span class="text-argon-100">slow</span> to transport and <span class="text-argon-100">hard to
              conceal</span> from thieves. The introduction of paper make it <span class="text-argon-100">easier to
              move value</span> across distances, but it brought a new challenge: how could anyone be certain the paper
              had <span class="text-argon-100">real gold behind it?</span> Governments soon had the answer. They simply
              <span class="text-argon-100">decreed by fiat</span> that the paper had real value, and they ordered it
              to be used as the nation's currency. <span class="text-argon-100">Threat of force was used to make it
              so.</span>
            </p>
          </div>

          <div class="pb-10">
            <header class="font-serif text-xl md:text-2xl font-bold">
              The Transition to Infinite Fiat
            </header>
            <p class="mt-1 text-base md:text-xl leading-relaxed font-serif">
              Fiat is by definition "<em class="italic">an absolute command issued by decree.</em>"
              Fiat money has no intrinsic value; <span class="text-argon-100">it is money only because a government
            decrees it so</span>, and it contains a hidden superpower. Whoever controls the minting, controls unlimited
              resources, at least for a while. The Yuan dynasty of 13th century China was the first to harness this power,
              but not the last. <span class="text-argon-100">No longer constrained by gold's limited supply</span>, the leaders financed their
              military campaigns and government programs by simply printing more paper. Unfortunately, <span class="text-argon-100">Yuan's fiat
            currency imploded</span>, and every fiat currency since has eventually followed this same demise.
            </p>
          </div>
        </div>
      </ScrollOverlay>

      <div
        ref="firstThingsFirstRunwayRef"
        aria-hidden="true"
        class="relative z-40 pointer-events-none"
      />

      <ScrollOverlay color="charcoal" ref="firstThingsIntermissionRef" class="z-50">
        <div class="grow text-white text-center md:text-5xl font-serif relative z-20 flex flex-col justify-center">
          <div class="text-lg md:text-2xl w-11/12 max-w-200 mx-auto leading-relaxed font-bold">
            <MacOldIcon class="w-16 md:w-20 mx-auto mb-2 text-argon-100/90" />
            <div class="text-2xl md:text-3xl uppercase mt-3 mb-6 text-argon-100/90 font-light">{ <span class="relative top-1">Hello World</span> }</div>
            1989 was a pivotal moment in civilization. Tim Bernes-Lee invented the Web, and its emergence heralded
            a new age where everything would soon become digital: retail, finance, photos, music, social...
          </div>
        </div>
      </ScrollOverlay>

      <ScrollOverlay color="charcoal" ref="firstThingsSecondRef" class="z-60">
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
                <span class="text-argon-100">old monetary order of paper money</span> was no longer the future. Payment
                systems began rapidly evolving, but the underlying rails of ACH, Wire, SWIFT, and Visa were
                <span class="text-argon-100">legacy hacks stacked on top of old fiat paper</span>; these evolutions
                didn't create a real digital currency, they just added digital plumbing. A new generate of builders soon
                realized a true digital-first currency could open a wealth of possibilities, such as
                <span class="text-argon-100">instant transfers</span>,
                <span class="text-argon-100">rich programmability</span>,
                <span class="text-argon-100">radical transparency</span>,
                and <span class="text-argon-100">personal autonomy</span>.
                Projects like DigiCash and E-gold tried in the 1990s, but each failed for the same reason:
                <span class="text-argon-100">their currencies were simply IOUs promised by a company</span>, not money
                itself; and companies can fail, be shut down, or enact dystopian controls. It would take many more years
                before someone discovered how to create <span class="text-argon-100">a digital currency that held value
                independent of centralized institutions or promises</span>.
              </p>
            </div>

            <div>
              <header class="font-serif text-xl md:text-2xl font-bold">
                The Launch of Bitcoin
              </header>
              <p class="mt-1 text-base md:text-xl leading-relaxed font-serif">
                Bitcoin was released in 2009, and <span class="text-argon-100">it changed everything</span>. It
                was the  <span class="text-argon-100">first digital currency that worked</span> without a central power dictating it. No gold
                backed its value. No military power enforced its decree. It relied on no nation, bank or other
                centralized institution. <span class="text-argon-100">An algorithm</span> guaranteed its scarcity,
                security, and sovereignty. <span class="text-argon-100">No single power could control it, inflate it, or
                debase it</span>. It was nearly the perfect currency, except it had one critical weakness: the protocol had
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
                why Bitcoin's lack of a price stabilizer inhibits it from becoming a global medium of exchange.
                Multiple projects were launched in 2015 to solve this problem. They tried creating a new type of crypto currency that <span class="text-argon-100">
                embodied Bitcoin's independence from fiat</span> yet maintained a
                <span class="text-argon-100">stable value</span>.
                Over the next several years,
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
              stablecoins sit atop this paper. A patchwork of bandaids make it somewhat workable, but the global rise of
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

        <ScrollRisk :showBackground="false" ref="inflationRiskRef" header="Inflation" class="z-[70]">
          Inflation is one of the great hidden taxes on society, and the dollar
          has it in spades. Unfortunately, the risk is getting worse, and
          every stablecoins pegged to it inherits it.
          <template #stat1>
            <RiskStat title="The Dollar's Loss Due to Inflation" value="88%">
              This is the amount of wealth that has been erased from your wallet since 1971.
            </RiskStat>
          </template>
          <template #stat2>
            <RiskStat title="Stablecoins Pegged to the Dollar" value="99%">
              This is the percentage of stablecoins that have inherited all the problems of the dollar.
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
      </ScrollGroup>

      <div class="relative z-10 h-[15vh] bg-[var(--bg-charcoal)]" />

      <ScrollOverlay ref="inflationOverlayRef" color="argon" class="z-[80] text-black" data-gsap-bg-from="#5E5968">
        <header class="w-11/12 max-w-300 mx-auto text-center mt-10 md:mt-20 font-serif uppercase">
          <div class="text-2xl md:text-5xl">Argon Is Fully</div>
          <div class="text-4xl md:text-7xl xl:text-8xl mt-2">Protected From Inflation</div>
        </header>
        <div class="mt-8 md:mt-10 mx-auto px-4 md:px-12 xl:px-20 max-w-300 text-base md:text-xl leading-normal font-serif">
          <p>
            Instead of being pegged to a fiat currency like the dollar, Argon uses an argon-numerated Consumer Price Index to ensure a stable purchasing power over time. A single argon will buy you the same amount of goods today as it will 100 years from now.
          </p>

          <header>How Does It Work?</header>
          <p>
            Argon’s invented a novel stabilization algorithm that uses an endogenous asset — Bitcoin — The algorithm
            uses the $2T bitcoin market to apply shorts against the argon. These profit incentives.
          </p>
        </div>
      </ScrollOverlay>

      <div ref="inflationOverlayRunwayRef" class="relative z-10 h-[15vh] bg-[var(--bg-charcoal)]" />

      <ScrollGroup ref="group2Ref" v-slot="{ setMoveToCenterRef }" class="relative z-70 bg-[var(--bg-charcoal)] -mt-1">
        <div class="relative h-[40vh] w-full z-[70] -mt-1" />
        <div class="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 border-r-2 border-dashed border-gray-300" />
        <div class="bg-linear-to-t from-transparent to-[var(--bg-charcoal)] h-10 w-full z-10 absolute top-0 left-0" />
        <Circle :ref="setMoveToCenterRef" data-move-speed="0.5" class="fixed z-20" />

        <ScrollRisk :showBackground="false" ref="fiatCollapseRiskRef" header="Fiat Collapse" class="z-[90]">
          Every fiat in history has eventually collapsed, starting with China's Song dynasty of 1023 A.D.
          The dollar has lasted longer than most, but at which point does the inevitable begin?
          <template #stat1>
            <RiskStat title="Years In Existence" value="1,003 Years">
              The number of years since fiat has existed as a government run currency in one form or another.
            </RiskStat>
          </template>
          <template #stat2>
            <RiskStat title="Average Lifespan" value="39 Years">
              The average amount of time that any single fiat currency has remained solvent and usable.
            </RiskStat>
          </template>
          <template #stat3>
            <RiskStat title="Failure Rate" value="100%">
              Given enough time, every fiat currency in history has ultimately failed and collapsed.
            </RiskStat>
          </template>
          <template #stat4>
            <RiskStat title="Stablecoins Dependent On Fiat" value="100%">
              The percentage of stablecoins that are pegged to the dollar and therefore inherited its flaws.
            </RiskStat>
          </template>
        </ScrollRisk>
      </ScrollGroup>

      <div class="relative z-10 h-[15vh]"></div>

      <ScrollOverlay ref="fiatCollapseOverlayRef" color="argon" class="z-[100] text-black" data-gsap-bg-from="#5E5968">
        <header class="w-11/12 max-w-300 mx-auto text-center mt-10 md:mt-20 font-serif uppercase">
          <div class="text-2xl md:text-5xl">Argon Is Fully</div>
          <div class="text-4xl md:text-7xl xl:text-8xl mt-2">Insulated From The Collapse of Fiat</div>
        </header>

        <div class="mt-8 md:mt-10 mx-auto px-4 md:px-12 xl:px-20 max-w-300 text-base md:text-xl leading-normal font-serif">
          <p>
            Instead of being pegged to a fiat currency like the dollar, Argon uses an argon-numerated Consumer Price Index to ensure a stable purchasing power over time. A single argon will buy you the same amount of goods today as it will 100 years from now.
          </p>

          <header>How Does It Work?</header>
          <p>
            Argon’s invented a novel stabilization algorithm that uses an endogenous asset — Bitcoin — The algorithm
            uses the $2T bitcoin market to apply shorts against the argon. These profit incentives.
          </p>
        </div>
      </ScrollOverlay>

      <div ref="fiatCollapseOverlayRunwayRef" class="relative z-10 h-[15vh] bg-[var(--bg-charcoal)]" />

      <ScrollGroup ref="group3Ref" v-slot="{ setMoveToCenterRef }" class="relative z-70 bg-[var(--bg-charcoal)] -mt-1">
        <div class="relative h-[40vh] w-full z-[70] -mt-1" />
        <div class="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 border-r-2 border-dashed border-gray-300" />
        <div class="bg-linear-to-t from-transparent to-[var(--bg-charcoal)] h-10 w-full z-10 absolute top-0 left-0" />
        <Circle :ref="setMoveToCenterRef" data-move-speed="0.5" class="fixed z-20" />

        <ScrollRisk :showBackground="false" ref="deathSpiralsRiskRef" header="Death Spirals" class="z-[110]">
          The dollar took decades to lose 88% of its value. TerraUSD took just 72 hours to lose everything. The death spiral is
          what happens when fiat's slow erosion gains an algorithm.
          <template #stat1>
            <RiskStat title="Single Biggest Loss" value="$40B">
              Terra collapsed in May 2022, wiping out $40 billion and the life savings of thousands of investors.
            </RiskStat>
          </template>
          <template #stat2>
            <RiskStat title="Historical Failure Rate" value="100%">
              Every algorithmic stablecoin has either collapsed entirely or been forced to abandon its peg.
            </RiskStat>
          </template>
          <template #stat3>
            <RiskStat title="Capital at Risk" value="$320B">
              Dollar stablecoins inherit all the risks of fractional reserve banking. See USDC's near collapse in 2023.
            </RiskStat>
          </template>
          <template #stat4>
            <RiskStat title="Backed by FDIC Insurance" value="$0">
              The GENIUS act of 2025 confirmed that dollar stablecoins are not protected by FDIC insurance.
            </RiskStat>
          </template>
        </ScrollRisk>
      </ScrollGroup>

      <div class="relative z-10 h-[15vh]"></div>

      <ScrollOverlay ref="deathSpiralsOverlayRef" color="argon" class="z-[120] text-black" data-gsap-bg-from="#5E5968">
        <header class="w-11/12 max-w-300 mx-auto text-center mt-10 md:mt-20 font-serif uppercase">
          <div class="text-2xl md:text-5xl">Argon Is Fully</div>
          <div class="text-4xl md:text-7xl xl:text-8xl mt-2">Immune From Death Spirals</div>
        </header>

        <div class="mt-8 md:mt-10 mx-auto px-4 md:px-12 xl:px-20 max-w-300 text-base md:text-xl leading-normal font-serif">
          <p>
            Instead of being pegged to a fiat currency like the dollar, Argon uses an argon-numerated Consumer Price Index to ensure a stable purchasing power over time. A single argon will buy you the same amount of goods today as it will 100 years from now.
          </p>

          <header>How Does It Work?</header>
          <p>
            Argon’s invented a novel stabilization algorithm that uses an endogenous asset — Bitcoin — The algorithm
            uses the $2T bitcoin market to apply shorts against the argon. These profit incentives.
          </p>
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
              We believe the crypto industry will soon begin waking to the risk of fiat-backed stablecoins. As that
              happens, the massive shift that is already in progress will begin to accelerate.
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
import BankBrokenIcon from '../../assets/bank-broken.svg?component';
import { ChevronDoubleDownIcon } from "@heroicons/vue/20/solid";

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
const inflationOverlayRef = ref<unknown>(null);
const inflationOverlayRunwayRef = ref<HTMLElement | null>(null);
const fiatCollapseRiskRef = ref<unknown>(null);
const fiatCollapseOverlayRef = ref<unknown>(null);
const fiatCollapseOverlayRunwayRef = ref<HTMLElement | null>(null);
const deathSpiralsRiskRef = ref<unknown>(null);
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
  const header = getExposedElement(value, "header");
  const body = getExposedElement(value, "body");
  const statsOne = getExposedElement(value, "statsOne");
  const statsTwo = getExposedElement(value, "statsTwo");

  if (!root || !header || !body || !statsOne || !statsTwo) return null;

  return {
    root,
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
  const fiatCollapseRisk = getRiskElements(fiatCollapseRiskRef.value);
  const fiatCollapseOverlayEl = getExposedElement(fiatCollapseOverlayRef.value);
  const deathSpiralsRisk = getRiskElements(deathSpiralsRiskRef.value);
  const deathSpiralsOverlayEl = getExposedElement(deathSpiralsOverlayRef.value);

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
    !inflationOverlayEl ||
    !inflationOverlayRunwayRef.value ||
    !fiatCollapseRisk ||
    !fiatCollapseOverlayEl ||
    !fiatCollapseOverlayRunwayRef.value ||
    !deathSpiralsRisk ||
    !deathSpiralsOverlayEl ||
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

    pinOverlayForRunway(inflationOverlayEl, inflationOverlayRunwayRef);
    pinOverlayForRunway(fiatCollapseOverlayEl, fiatCollapseOverlayRunwayRef);
    pinOverlayForRunway(deathSpiralsOverlayEl, deathSpiralsOverlayRunwayRef);

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
      {
        section: inflationRisk.root,
        trigger: inflationRisk.root,
        start: "top top",
        endTrigger: inflationOverlayRunwayRef.value,
        end: "bottom bottom",
      },
      {
        section: fiatCollapseRisk.root,
        trigger: fiatCollapseRisk.root,
        start: "top top",
        endTrigger: fiatCollapseOverlayRunwayRef.value,
        end: "bottom bottom",
      },
      {
        section: deathSpiralsRisk.root,
        trigger: deathSpiralsRisk.root,
        start: "top top",
        endTrigger: deathSpiralsOverlayRunwayRef.value,
        end: "bottom bottom",
      },
    ];

    const updateTopClasses = () => {
      scenes.forEach((scene) => {
        scene.section.classList.toggle(
          "is-at-or-above-top",
          scene.section.getBoundingClientRect().top <= 1,
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
        endTrigger: runwayRef.value,
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
    );

    createScrollableOverlay(
      firstThingsSecondEl,
      firstThingsSecondContentEl,
      firstThingsSecondRunwayRef,
      firstThingsSecondRef,
    );

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
