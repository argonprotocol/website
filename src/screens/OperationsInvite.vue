<template>
  <div class="min-h-screen bg-[#f7f3fb] text-slate-900">
    <TopBar class="relative z-10" />

    <main class="py-5 md:py-12">
      <section class="mx-auto max-w-11/12 border border-black/15 bg-white shadow-2xl rounded-lg">
        <div class="px-9 md:px-12 pb-10 md:pb-14">
          <header class="text-center -top-3 relative">
            <div class="absolute top-0 -right-4 w-7 h-3 bg-argon-800 rounded-tr-full shadow-lg" />
            <div class="relative py-4 font-black font-serif text-xl md:text-2xl uppercase tracking-tight text-white md:leading-none bg-argon-600 rounded-b-md rounded-tl-xl border border-argon-700 border-t-0 shadow-lg">
              {{ inviteFromName }} Saved You a Spot!
            </div>
          </header>

          <div class="text-center py-7 font-serif text-xl md:text-2xl uppercase tracking-widest text-argon-800">
            <CountdownClock
                v-if="inviteExpiresAt"
                :time="inviteExpiresAt"
                v-slot="{ days, hours, minutes, seconds }"
            >
              <span v-if="days" class="contents">{{ days }} day{{ days > 1 ? 's' : '' }}, </span>
              <span v-if="hours" class="contents">{{ hours }} hour{{ hours > 1 ? 's' : '' }}, </span>
              <span v-if="minutes" class="contents">{{ minutes }} minute{{ minutes > 1 ? 's' : '' }} and </span>
              <span class="contents">{{ seconds }} second{{ seconds > 1 ? 's' : '' }}</span>
            </CountdownClock>
            <template v-else>
              Oops... This Invite Expired
            </template>
          </div>

          <div class="mx-auto h-px w-[97%] bg-slate-300/70" />

          <div class="px-0 py-8 text-center md:px-8 md:py-14 text-8xl font-serif leading-tight text-slate-800">
            <h1>
              <span class="opacity-40">You’ve Been Invited<br/>
              to Join</span> Argon’s Global<br />
              Operations Team
            </h1>
          </div>

          <p class="w-8/12 text-xl leading-loose mx-auto text-slate-700 font-light font-serif">
            Argon is run by a network of operators who manage the network’s mining nodes and stabilization vaults. No
            technical knowledge is needed, only a laptop computer and our simple desktop app. Admission to the club is
            by invite only. Jump to Install Instructions.
          </p>
        </div>

        <div class="border-y border-slate-300/70 py-10 bg-[#FAE2FF] mx-0.5">
          <div class="w-8/12 mx-auto flex flex-row text-center gap-x-5">
            <div>
              <header>Mining</header>
              <div class="border-y border-argon-700/30 py-3">
                <div class="text-6xl font-black leading-none tracking-tight text-slate-400 md:text-[5.25rem]">
                  46%
                </div>
                <div class="mt-4 font-mono text-sm tracking-[0.04em] text-slate-500 md:text-[1.05rem]">
                  Current APY
                </div>
              </div>
              <p>
                Argons are bid at auction to win a rotating selection of mining seats. Winners are then given the right to
                create blocks and accrue block rewards for their timeslot.
              </p>
            </div>
            <div>
              <header>Vaulting</header>
              <div class="border-y border-argon-700/30 py-3">
                <div class="text-6xl font-black leading-none tracking-tight text-slate-400 md:text-[5.25rem]">
                  46%
                </div>
                <div class="mt-4 font-mono text-sm tracking-[0.04em] text-slate-500 md:text-[1.05rem]">
                  Current APY
                </div>
              </div>
              <p>
                Vaulters are the other half of the network. They stabilize newly mined stablecoins, and in return they
                earn all revenue generated from mining seat auctions.
              </p>
            </div>
          </div>
        </div>

        <div>
          <section class="mx-auto max-w-[840px] px-1 py-10 md:px-2 md:py-14">
            <div class="space-y-7 text-[1.25rem] leading-[2.2rem] text-slate-800 md:text-[1.2rem]">
              <h2>Install the Argon Operations App</h2>
              <p>
                Argon is an inflation-resistant, fiat-independent stablecoin — and this app is how you access its
                yield-generating instruments. Savings, bonds, bitcoin locks, and stable swaps are all available through
                the Operations App. Each instrument has different risk and return profiles. Access is invite-only, which
                means your invite from {{ inviteFromName }} is the only way in.
              </p>

              <p>Here&apos;s how to get started:</p>
            </div>

            <section class="border-t border-slate-300/70 pt-10 mt-10">
              <div class="flex items-center gap-4">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-600 text-3xl font-black leading-none text-white">
                  1
                </div>
                <h2 class="text-2xl font-black tracking-tight text-slate-700 md:text-[2.2rem]">
                  Download the Operations App
                </h2>
              </div>

              <p class="mt-5 text-[1.15rem] leading-9 text-slate-900">
                This simple desktop app works on MacOS, Windows, and Linux.
              </p>

              <div class="mt-8 flex flex-col items-start gap-5 md:flex-row md:items-center">
                <a
                  :href="downloadUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex min-w-[340px] items-center justify-center rounded-md border border-violet-700 bg-[linear-gradient(180deg,_#b71dd0_0%,_#9b12c6_100%)] px-8 py-4 text-[1.15rem] font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] transition hover:brightness-105"
                >
                  Download App
                </a>
                <RouterLink
                  to="/docs/desktop-apps/capital"
                  class="text-xl font-semibold text-black no-underline transition hover:text-violet-700"
                >
                  View Installation Instructions
                </RouterLink>
              </div>
            </section>

            <section class="border-t border-slate-300/70 pt-10 mt-20">
              <div class="flex items-center gap-4">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-600 text-3xl font-black leading-none text-white">
                  2
                </div>
                <h2 class="text-2xl font-black tracking-tight text-slate-700 md:text-[2.2rem]">
                  Verify Your Access Code
                </h2>
              </div>

              <p class="mt-5 text-[1.15rem] leading-9 text-slate-900">
                After installing the app, paste this code to activate your account.
              </p>

              <div class="mt-9">
                <div class="rounded-[1.35rem] border border-black/20 bg-white px-6 py-5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                  <div class="overflow-x-auto whitespace-nowrap text-[1.05rem] text-slate-500 md:text-[1rem]">
                    <span class="text-2xl leading-none text-slate-700">
                      {{ inviteCode }}
                    </span>
                  </div>
                </div>

                <div class="mt-8 flex flex-col gap-4 md:flex-row">
                  <button
                    type="button"
                    class="inline-flex min-w-[340px] items-center justify-center rounded-md border border-violet-700 bg-[linear-gradient(180deg,_#b71dd0_0%,_#9b12c6_100%)] px-8 py-4 text-[1.15rem] font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] transition hover:brightness-105"
                    @click="openInviteLink"
                  >
                    Open with Link
                  </button>
                  <button
                    type="button"
                    class="inline-flex min-w-[340px] items-center justify-center rounded-md border border-fuchsia-400 bg-white px-8 py-4 text-[1.15rem] font-black text-fuchsia-600 transition hover:bg-fuchsia-50"
                    @click="copyToken"
                  >
                    {{ copyButtonLabel }}
                  </button>
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
import TopBar from '@/navigation/TopBar.vue';
import { Download } from '@/lib/Download';
import { Invites } from "@/lib/Invites";
import CountdownClock from '../components/CountdownClock.vue';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const route = useRoute();
const download = new Download();
const downloadUrl = Vue.ref('/desktop-apps');
const now = Vue.ref(dayjs());

const inviteCode = Vue.ref<string>(route.params.inviteCode as string);
const inviteFromName = Vue.ref('▮▮▮▮▮');
const inviteExpiresAt = Vue.ref<Dayjs>(dayjs().add(1, 'day'));

const copyButtonLabel = Vue.ref('Copy to Clipboard');

const stats = [
  { value: '28%', label: 'Argon Bond APY' },
  { value: '42%', label: 'Bitcoin Lock APY' },
  { value: '13%', label: 'Stable Swap APY' },
];

const inviteLink = Vue.computed(() => {
  return `argon://capital-invite/${inviteCode.value}`;
});

async function copyToken() {
  try {
    await navigator.clipboard.writeText(inviteCode.value);
    copyButtonLabel.value = 'Copied';
    window.setTimeout(() => {
      copyButtonLabel.value = 'Copy to Clipboard';
    }, 1800);
  } catch {
    copyButtonLabel.value = 'Copy Failed';
    window.setTimeout(() => {
      copyButtonLabel.value = 'Copy to Clipboard';
    }, 1800);
  }
}

function openInviteLink() {
  window.location.href = inviteLink.value;
}

let intervalId: number | undefined;

Vue.onMounted(async () => {
  intervalId = window.setInterval(() => {
    now.value = dayjs();
  }, 1000);

  try {
    await download.load();
    downloadUrl.value = download.currentUrl;
  } catch {
    downloadUrl.value = '/desktop-apps';
  }

  const { ipAddress, port, privateKey } = Invites.decodeInviteCode(inviteCode.value);
  const response = await fetch(`http://${ipAddress}:${port}/capital-users/${inviteCode.value}`);
  const { fromName, invite } = await response.json()
  inviteFromName.value = fromName || 'Anonymous';
  inviteExpiresAt.value = invite?.couponExpiresAt ? dayjs(invite.couponExpiresAt) : null;
});

Vue.onBeforeUnmount(() => {
  if (intervalId) window.clearInterval(intervalId);
});
</script>
