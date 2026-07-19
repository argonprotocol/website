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
        <div class="px-4 pb-9 sm:px-7 md:px-12 md:pb-14">
          <header class="relative -top-3 text-center">
            <div class="absolute top-0 -right-2 h-3 w-5 rounded-tr-full bg-argon-800 shadow-lg sm:-right-4 sm:w-7" />
            <div class="relative rounded-b-md rounded-tl-xl border border-t-0 border-argon-700 bg-argon-600 px-4 py-3 font-serif text-base font-black uppercase leading-snug tracking-tight text-white shadow-lg sm:text-xl md:py-4 md:text-2xl md:leading-none">
              {{ inviteFromName }} Saved You a Spot!
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
            <h1>
              <span class="opacity-40">You’ve Been Invited<br/>
              to Join</span> Argon’s Global<br />
              Operations Team
            </h1>
          </div>

          <p class="mx-auto w-full max-w-4xl font-serif text-lg font-light leading-8 text-slate-700 md:text-xl md:leading-loose">
            Argon is run by a network of operators who manage the network’s mining nodes and stabilization vaults. No
            technical knowledge is needed, only a laptop computer and our simple desktop app. Admission to the club is
            by invite only. <a href="#instructions">View install instructions</a>.
          </p>
        </div>

        <div class="mx-0 border-y border-slate-300/70 bg-[#FAE2FF] px-4 py-9 sm:px-7 md:mx-0.5 md:py-10">
          <div class="mx-auto flex w-full max-w-4xl flex-col gap-9 text-center md:flex-row md:gap-x-10">
            <div>
              <header class="pb-4 font-serif text-2xl md:text-3xl">Mining</header>
              <div class="border-y border-argon-700/30 py-5">
                <div class="text-5xl font-black leading-none tracking-tight text-argon-900/60 sm:text-6xl md:text-[5.25rem]">
                  {{ numeral(data.miningAPR).format('0,0.[00]') }}%
                </div>
                <div class="mt-1 tracking-[0.04em] text-slate-500">
                  Current APR
                </div>
              </div>
              <p class="mt-4 font-serif text-base leading-relaxed sm:text-lg">
                Argons are bid at auction to win a rotating selection of mining seats. Winners are then given the right to
                create blocks and accrue block rewards for their timeslot.
              </p>
            </div>
            <div>
              <header class="pb-4 font-serif text-2xl md:text-3xl">Vaulting</header>
              <div class="border-y border-argon-700/30 py-5">
                <div class="text-5xl font-black leading-none tracking-tight text-argon-900/60 sm:text-6xl md:text-[5.25rem]">
                  {{ numeral(data.vaultingAPR).format('0,0.[00]') }}%
                </div>
                <div class="mt-1 tracking-[0.04em] text-slate-500">
                  Current APR
                </div>
              </div>
              <p class="mt-4 font-serif text-base leading-relaxed sm:text-lg">
                Vaulters are the other half of the network. They stabilize newly mined stablecoins, and in return they
                earn all revenue generated from mining seat auctions.
              </p>
            </div>
          </div>
        </div>

        <div class="px-4 sm:px-7 md:px-12">
          <section class="mx-auto w-full max-w-4xl px-1 py-9 md:px-2 md:py-14">
            <div class="space-y-6 text-lg leading-8 text-slate-800 md:space-y-7 md:text-[1.2rem] md:leading-[2.2rem]">
              <h2 class="my-5 text-center font-serif text-3xl md:my-6 md:text-4xl" id="instructions">
                <span class="border-b border-slate-600/20 px-0 pb-4 sm:px-10 md:px-20 md:pb-5 inline-block">Installing the Argon Operations App</span>
              </h2>
              <p class="mt-8 font-serif md:mt-10">
                Installing and setting up your Argon Operations is a simple two-step process. Download the app and then
                use the Access Code below to activate it. The app will guide you through the process from there.
              </p>
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
                  Download Operations App
                </a>
                <RouterLink
                  to="/docs/desktop-apps/operations"
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
                Copy and paste the following code to activate your account. It gives you full access to the
                operational side of the Argon network.
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
import Data from "@/lib/Data";
import CopyAccessCode from "@/components/CopyAccessCode.vue";
import {defaultBasicsRecord, type IBasicsRecord} from "@/interfaces/IBasicsRecord";
import numeral from "@/lib/numeral";
import {ArrowTurnRightUpIcon} from "@heroicons/vue/24/outline";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);

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

let intervalId: number | undefined;

async function loadData() {
  data.value = await Data.fetchBasics();
}

async function fetchInvite() {
  const { host, port, inviteCode } = InviteEnvelope.decode(inviteEnvelope.value);
  if (!host || !port || !inviteCode) return;

  try {
    const response = await fetch(`https://${host}:${port}/operational-users/${encodeURIComponent(inviteCode)}/preview`);
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
    inviteExpiresAt.value = dayjs.utc(invite.expiresAt);
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
    downloadUrl.value = '/desktop-apps';
  }

  await fetchInvite();
  isLoading.value = false;
});

Vue.onBeforeUnmount(() => {
  if (intervalId) window.clearInterval(intervalId);
});
</script>
