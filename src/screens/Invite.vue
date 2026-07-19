<template>
  <div class="min-h-screen bg-[#f7f3fb] text-slate-900">
    <TopBar class="relative z-10" />

    <main class="flex min-h-[calc(100vh-86px)] flex-col px-3 pt-8 pb-16 sm:px-5 md:pt-12 md:pb-20">
      <section v-if="isLoading" class="mx-auto flex w-full max-w-11/12 grow flex-col items-center justify-center rounded-lg border border-black/15 bg-white shadow-2xl">
        <div class="pb-[5%] text-center text-2xl uppercase text-slate-600/30 md:text-3xl">Loading...</div>
      </section>
      <section v-else-if="isAlreadyUsed" class="mx-auto flex w-full max-w-11/12 grow flex-col items-center justify-center rounded-lg border border-black/15 bg-white shadow-2xl">
        <div class="pb-[5%] text-center text-2xl uppercase text-slate-600/30 md:text-3xl">This Invite Has Already Been Used</div>
      </section>
      <section v-else-if="isInvalid" class="mx-auto flex w-full max-w-11/12 grow flex-col items-center justify-center rounded-lg border border-black/15 bg-white shadow-2xl">
        <div class="pb-[5%] text-center text-2xl uppercase text-slate-600/30 md:text-3xl">Invite Not Found</div>
      </section>
      <section v-else-if="isExpired" class="mx-auto flex w-full max-w-11/12 grow flex-col items-center justify-center rounded-lg border border-black/15 bg-white shadow-2xl">
        <div class="px-5 pb-[5%] text-center">
          <div class="text-2xl uppercase text-slate-600/30 md:text-3xl">This Invite Has Expired</div>
          <p class="mt-1 text-lg text-slate-900/60 md:text-xl">
            Contact the person who sent you this invite. They<br class="hidden sm:block" />
            may be able to extend the time.</p>
        </div>
      </section>
      <section v-else class="mx-auto w-full max-w-11/12 rounded-lg border border-black/15 bg-white shadow-2xl">
        <div class="px-4 pb-9 sm:px-7 md:px-12 md:pb-18">
          <header class="relative -top-3 text-center">
            <div class="absolute top-0 -right-2 h-3 w-5 rounded-tr-full bg-argon-800 shadow-lg sm:-right-4 sm:w-7" />
            <div class="relative rounded-b-md rounded-tl-xl border border-t-0 border-argon-700 bg-argon-600 px-4 py-3 font-serif text-base font-black uppercase leading-snug tracking-tight text-white shadow-lg sm:text-xl md:py-4 md:text-2xl md:leading-none">
              <span class="hidden md:inline-block">You have a free, </span>
              <span class="inline-block md:hidden">Free </span>
              ${{ numeral(inviteEstimatedGiftUsd).format('0,0') }} gift from {{ inviteFromName }}
            </div>
          </header>

          <div class="py-6 text-center font-serif text-lg uppercase leading-relaxed tracking-widest text-argon-800 sm:text-xl md:py-7 md:text-2xl">
            Expires In
            <CountdownClock
              :time="inviteExpiresAt"
              v-slot="{ days, hours, minutes, seconds }"
            >
              <span v-if="days" class="contents">{{ days }} day{{ days === 1 ? '' : 's' }}, </span>
              <span v-if="hours" class="contents">{{ hours }} hour{{ hours === 1 ? '' : 's' }}, </span>
              <span v-if="minutes" class="contents">{{ minutes }} minute{{ minutes === 1 ? '' : 's' }} and </span>
              <span class="contents">{{ seconds }} second{{ seconds === 1 ? '' : 's' }}</span>
            </CountdownClock>
          </div>

          <div class="mx-auto h-px w-[97%] bg-slate-300/70" />

          <div class="px-0 py-7 text-center font-serif text-3xl leading-tight text-slate-800 sm:text-5xl md:px-8 md:py-14 md:text-7xl xl:text-8xl">
            <h1 class="md:flex flex-col">
              <span>Liquid Lock <span class="opacity-40">Your First </span></span>
              <span>Bitcoin for Free, </span>
              <span class="opacity-40">Compliments of {{  inviteFromName }}</span>
            </h1>
          </div>

          <CopyAccessCode :accessCode="inviteEnvelope" class="mx-auto max-w-4xl w-full" />

          <p class="mx-auto mt-7 w-full max-w-4xl font-serif text-lg font-light leading-8 text-slate-700 md:mt-8 md:text-xl md:leading-loose">
            The access code listed above gives you full access to the Treasury features of Argon Desktop. This allows you
            to Liquid Lock Bitcoins and participate in other high-yield investments of the Argon Network. <a href="#instructions">View install instructions</a>.
          </p>
        </div>

        <div class="mx-0 border-y border-argon-100/70 bg-argon-100/30 px-4 py-9 sm:px-7 md:mx-1 md:px-12 md:py-10">
          <div class="mx-auto flex w-full max-w-4xl flex-col">
            <h2 class="mt-4 mb-10 text-center font-serif text-3xl md:mt-6 md:mb-20 md:text-4xl">
              <span class="border-b border-slate-600/20 px-0 pb-4 sm:px-10 md:px-20 md:pb-5 inline-block">How Liquid Locking Works</span>
            </h2>

            <div class="relative mt-5 grid grid-cols-[auto_auto_1fr] items-start gap-x-3 gap-y-2 md:flex md:flex-row md:items-stretch md:left-14">
              <div class="font-serif text-5xl md:text-2xl font-bold md:absolute md:right-full md:-translate-x-3">1.</div>
              <div class="relative flex items-center justify-center md:order-4 md:w-3/12 md:flex-col">
                <img src="/treasury-invite/1-locking-bitcoin.png" alt="Locking Bitcoin" class="relative h-12 w-auto md:-top-1 md:-left-9 md:h-20" />
                <div class="relative hidden w-2 grow  md:block" :style="{ backgroundColor: lineColor }" />
              </div>
              <div class="col-span-3 min-w-0 grow pb-4 md:order-1 md:w-8/12 md:pb-20">
                <header class="font-serif text-xl md:text-2xl">
                Lock your Bitcoin Into
                Argon’s Stabilization Vaults
                </header>
                <p class="mt-1.5 leading-loose">
                  Argon uses a special multisig that keeps you in control of your bitcoin’s chain of custody. It cannot
                  be unlocked without your direct sign-off.
                </p>
              </div>
              <div class="hidden w-1/12 md:order-2 md:block" />
            </div>

            <div class="relative mt-8 grid grid-cols-[auto_auto_1fr] items-start gap-x-3 gap-y-2 md:mt-3 md:flex md:flex-row md:items-stretch md:left-14">
              <div class="font-serif text-5xl md:text-2xl font-bold md:absolute md:right-full md:-translate-x-3">2.</div>
              <div class="relative flex items-center justify-center md:order-4 md:w-3/12 md:flex-col">
                <img src="/treasury-invite/2-collect-argons.png" alt="Collect Argons" class="relative h-12 w-auto md:-top-1 md:h-20" />
                <div class="relative hidden w-2 grow  md:block" :style="{ backgroundColor: lineColor }" />
              </div>
              <div class="col-span-3 min-w-0 grow pb-4 md:order-1 md:w-8/12 md:pb-20">
                <header class="font-serif text-xl md:text-2xl">
                  Borrow Against the Full Market Value of Your Bitcoin
                </header>
                <p class="mt-1.5 leading-loose">
                  Get access to the full liquidity of your bitcoin (its market value at the moment of locking) at an
                  interest rate of {{ numeral(inviteBtcPctFee).format('0,0.[00]') }}% or less (zero percent interest on your first bitcoin).
                </p>
              </div>
              <div class="hidden w-1/12 md:order-2 md:block" />
            </div>

            <div class="relative mt-8 grid grid-cols-[auto_auto_1fr] items-start gap-x-3 gap-y-2 md:mt-3 md:flex md:flex-row md:items-stretch md:left-14">
              <div class="font-serif text-5xl md:text-2xl font-bold md:absolute md:right-full md:-translate-x-3">3.</div>
              <div class="relative flex items-center justify-center md:order-4 md:w-3/12 md:flex-col">
                <img src="/treasury-invite/3-investment.png" alt="Invest" class="relative h-12 w-auto md:-top-1 md:h-20" />
                <div class="relative mt-1 hidden w-2 grow md:block" :style="{ backgroundColor: lineColor }" />
              </div>
              <div class="col-span-3 min-w-0 grow pb-4 md:order-1 md:w-8/12 md:pb-20">
                <header class="font-serif text-xl md:text-2xl">
                  Deploy Your Newfound Stablecoin
                  Capital
                </header>
                <p class="mt-1.5 leading-loose">
                  Argon loans are completely unencumbered meaning there are zero limitations on how your newly acquired
                  capital is used. They’re also immutable meaning you can invest your capital without risk of the loan being called early.
                </p>
              </div>
              <div class="hidden w-1/12 md:order-2 md:block" />
            </div>

            <div class="relative flex flex-col items-end md:left-14">
              <div class="relative grid w-full grid-cols-2 gap-2 py-8 text-center md:flex md:flex-row md:gap-0 md:py-16">
                <div class="absolute -top-2 left-[12.5%] hidden h-2 w-[75%] grow md:block" :style="{ backgroundColor: lineColor }" />
                <div class="absolute left-[12.5%] -top-2 -bottom-2 hidden w-2 grow -translate-x-1/2  md:block" :style="{ backgroundColor: lineColor }" />
                <div class="relative bg-[#FCECFE] px-2 py-3 md:w-1/4">
                  <div class="text-3xl font-bold md:text-5xl">4.1%</div>
                  <div class="text-sm md:text-base">Inflation-Free APR</div>
                </div>
                <div class="absolute left-[37.5%] -top-2 -bottom-2 hidden w-2 grow -translate-x-1/2 md:block" :style="{ backgroundColor: lineColor }" />
                <div class="relative bg-[#FCECFE] px-2 py-3 md:w-1/4">
                  <div class="text-3xl font-bold md:text-5xl">{{ numeral(data.bitcoinAPR).formatIfElseCapped('< 1_000', '0,0.[0]', '0,0', 9_999) }}%</div>
                  <div class="text-sm md:text-base">Locked Bitcoin APR</div>
                </div>
                <div class="absolute left-[62.5%] -top-2 -bottom-2 hidden w-2 grow -translate-x-1/2 md:block" :style="{ backgroundColor: lineColor }" />
                <div class="relative bg-[#FCECFE] px-2 py-3 md:w-1/4">
                  <div class="text-3xl font-bold md:text-5xl">{{ numeral(data.bondsAPR).formatIfElseCapped('< 1_000', '0,0.[0]', '0,0', 9_999) }}%</div>
                  <div class="text-sm md:text-base">Argon Bonds APR</div>
                </div>
                <div class="absolute left-[87.5%] -top-2 -bottom-2 hidden w-2 grow md:block" :style="{ backgroundColor: lineColor }" />
                <div class="relative bg-[#FCECFE] px-2 py-3 md:w-1/4">
                  <div class="text-3xl font-bold md:text-5xl">13.9%</div>
                  <div class="text-sm md:text-base">Stable Swaps APR</div>
                </div>
                <div class="absolute left-[12.5%] -bottom-2 hidden h-2 w-[75%] grow  md:block" :style="{ backgroundColor: lineColor }" />
              </div>
              <div class="relative right-[12.5%] mt-1 hidden h-20 w-2 translate-x-full  md:block" :style="{ backgroundColor: lineColor }" />
            </div>

            <div class="relative mt-8 grid grid-cols-[auto_auto_1fr] items-start gap-x-3 gap-y-2 md:mt-2 md:flex md:flex-row md:items-stretch md:left-14">
              <div class="font-serif text-5xl md:text-2xl font-bold md:absolute md:right-full md:-translate-x-3">4.</div>
              <div class="relative flex items-center justify-center md:order-4 md:w-3/12 md:flex-col">
                <img src="/treasury-invite/4-unlock-bitcoin.png" alt="Unlock Bitcoin" class="relative h-12 w-auto md:right-3 md:h-20" />
              </div>
              <div class="col-span-3 min-w-0 grow pb-4 md:order-1 md:w-8/12 md:pb-10">
                <header class="font-serif text-xl md:text-2xl">
                  Unlock Your Bitcoin Whenever
                  You Want
                </header>
                <p class="mt-1.5 leading-loose">
                  You always retain complete control over when you unlock your bitcoin. Simply insert the required
                  argons back into the vault. The full amount of your original bitcoin is released to the destination address you choose.
                </p>
              </div>
              <div class="hidden w-1/12 md:order-2 md:block" />
            </div>
          </div>
        </div>

        <div class="px-4 sm:px-7 md:px-12">
          <section class="mx-auto w-full max-w-4xl px-1 py-9 md:px-2 md:py-14">
            <div class="space-y-6 text-lg leading-8 text-slate-800 md:space-y-7 md:text-[1.2rem] md:leading-[2.2rem]">
              <h2 class="my-5 text-center font-serif text-3xl md:my-6 md:text-4xl" id="instructions">
                <span class="border-b border-slate-600/20 px-0 pb-4 sm:px-10 md:px-20 md:pb-5 inline-block">Installing the Argon Treasury</span>
              </h2>
              <p class="mt-10 font-serif md:mt-12">
                Argon is an inflation-resistant, fiat-independent stablecoin. This app is how you access its
                yield-generating instruments. Savings, bonds, bitcoin locks, and stable swaps are all available.
                Each instrument has different risk and return profiles. Access is invite-only, which
                means being invited by an existing member is the only way in.
              </p>

              <p class="hidden font-serif md:block">Here's how to get started:</p>
            </div>

            <div class="mt-8 rounded-lg border border-slate-300/70 bg-slate-50 px-5 py-6 text-center font-serif text-lg leading-relaxed text-slate-700 sm:text-xl md:hidden">
              <div class="text-center text-black font-bold mb-1">Laptop Required</div>
              This page must be loaded in a desktop browser in order to display the download link.
            </div>

            <section class="hidden border-t border-slate-300/70 pt-10 mt-10 md:block">
              <div class="flex items-center gap-4">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-600 text-2xl font-black leading-none text-white">
                  1
                </div>
                <h2 class="text-xl md:text-2xl font-black tracking-tight text-slate-700">
                  Download the App
                </h2>
              </div>

              <p class="mt-5 text-[1.15rem] leading-9 text-slate-900 font-serif">
                This desktop app works on MacOS, Windows, and Linux. Once you've downloaded and opened it, you'll be
                asked for an access code. See next step.
              </p>

              <div class="mt-8 flex flex-col items-start gap-5 md:flex-row md:items-center">
                <a
                  :href="downloadUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex min-w-[340px] items-center justify-center rounded-md border border-violet-700 bg-[linear-gradient(180deg,_#b71dd0_0%,_#9b12c6_100%)] px-8 py-3 text-[1.15rem] font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] transition hover:brightness-105"
                >
                  Download Argon Desktop
                </a>
                <RouterLink
                  to="/docs/desktop-apps/treasury"
                  class="text-lg text-black no-underline transition hover:text-violet-700"
                >
                  Open documentation
                </RouterLink>
              </div>
            </section>

            <section class="hidden border-t border-slate-300/70 pt-10 mt-20 mb-20 md:block">
              <div class="flex items-center gap-4">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-600 text-2xl font-black leading-none text-white">
                  2
                </div>
                <h2 class="text-xl md:text-2xl font-black tracking-tight text-slate-700">
                  Use This Access Code
                </h2>
              </div>

              <p class="mt-5 text-[1.15rem] leading-9 text-slate-900 font-serif">
                Copy and paste the following code to activate your account. It's also allows you to lock your first
                bitcoin for free (up to ${{ numeral(inviteEstimatedGiftUsd).format('0,0') }} in waived fees).
              </p>

              <div class="mt-9 flex flex-col items-end">
                <CopyAccessCode ref="copyAccessCodeRef" :accessCode="inviteEnvelope" class="w-full" />
                <div
                  class="pr-4 mt-2 cursor-pointer opacity-70 transition hover:opacity-100"
                  @click="copyAccessCodeRef?.copyAccessCode()"
                >
                  <span class="relative top-1.5 mr-1">Click here to copy your access code</span>
                  <ArrowTurnRightUpIcon class="inline-block h-5 w-5" />
                </div>
              </div>
            </section>
          </section>
        </div>
      </section>
    </main>
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import dayjs, {Dayjs} from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import TopBar from '@/navigation/TopBar.vue';
import { Download } from '@/lib/Download';
import { InviteEnvelope } from "@/lib/InviteEnvelope";
import CountdownClock from '../components/CountdownClock.vue';
import numeral from '@/lib/numeral';
import FooterBar from "@/navigation/FooterBar.vue";
import Data from "@/lib/Data";
import { defaultBasicsRecord, type IBasicsRecord } from "@/interfaces/IBasicsRecord";
import CopyAccessCode from "@/components/CopyAccessCode.vue";
import { ArrowTurnRightUpIcon } from "@heroicons/vue/24/outline";

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(relativeTime);

const route = useRoute();

const isLoading = Vue.ref(true);
const isExpired = Vue.ref(false);
const isInvalid = Vue.ref(false);
const isAlreadyUsed = Vue.ref(false);

const copyAccessCodeRef = Vue.ref<InstanceType<typeof CopyAccessCode>>();
const data = Vue.ref<IBasicsRecord>(defaultBasicsRecord);

const download = new Download();
const downloadUrl = Vue.ref('/desktop-apps');
const now = Vue.ref(dayjs());

const inviteEnvelope = Vue.ref<string>(route.params.inviteEnvelope as string);
const inviteFromName = Vue.ref('▮▮▮▮▮');
const inviteExpiresAt = Vue.ref<Dayjs>(dayjs().add(1, 'day'));
const inviteEstimatedGiftUsd = Vue.ref(0);
const inviteBtcPctFee = Vue.ref(0);

const lineColor = '#F2CAFB';

let intervalId: number | undefined;

async function loadData() {
  data.value = await Data.fetchBasics();
}

async function fetchInvite() {
  console.log('FETCHING INVITE')
  const { host, port, inviteCode } = InviteEnvelope.decode(inviteEnvelope.value);
  if (!host || !port || !inviteCode) return;

  try {
    console.log('FETCHING ', host, port, inviteCode);
    const response = await fetch(`https://${host}:${port}/invites/${encodeURIComponent(inviteCode)}/preview`);
    const invite = await response.json();
    if (!response.ok) {
      if (invite.code === 'ALREADY_USED') {
        isAlreadyUsed.value = true;
      } else {
        isInvalid.value = true;
      }
      return;
    }

    inviteFromName.value = invite.fromName || 'Anonymous';
    inviteEstimatedGiftUsd.value = invite.estimatedGiftUsd;
    inviteExpiresAt.value = dayjs.utc(invite.expiresAt);
    inviteBtcPctFee.value = invite.btcPctFee;
    isExpired.value = inviteExpiresAt.value.isBefore(dayjs.utc());
  } catch(e) {
    isInvalid.value = true;
  }
}

Vue.onMounted(async () => {
  intervalId = window.setInterval(() => {
    now.value = dayjs();
  }, 1000);

  await loadData();

  try {
    await download.load();
    downloadUrl.value = download.downloadUrl;
  } catch {
    downloadUrl.value = '/apps/treasury';
  }

  await fetchInvite();
  isLoading.value = false;
});

Vue.onBeforeUnmount(() => {
  if (intervalId) window.clearInterval(intervalId);
});
</script>
