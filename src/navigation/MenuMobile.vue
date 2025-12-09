<template>
  <div class="flex flex-row items-center justify-end gap-x-1">
    <div Button @click="window.open('https://discord.gg/xDwwDgCYr9', '_blank')">
      <DiscordIcon class="w-6 h-6" />
    </div>
    <div Button @click="window.open('https://github.com/argonprotocol/mainchain', '_blank')">
      <GithubIcon class="w-6 h-6" />
    </div>
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <Bars3Icon class="w-6 h-6 block md:hidden" />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent class="w-full bg-white border border-gray-200 rounded-md shadow-lg py-1 z-100">
            <DropdownMenuItem
                Button
                :Selected="router.currentRoute.value.path.startsWith('/start') || undefined"
                @click="router.push('/start')"
            >
              Get Started
            </DropdownMenuItem>
          <DropdownMenuItem
              Button
              :Selected="router.currentRoute.value.path.startsWith('/playbook') || undefined"
              @click="router.push('/playbook')"
          >
            Read Our Playbook
          </DropdownMenuItem>
            <DropdownMenuItem
                Button
                :Selected="router.currentRoute.value.path.startsWith('/learn') || undefined"
                @click="router.push('/learn')"
            >
              Go Deeper
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a Button href="/start/testnet" class="flex flex-row items-center gap-2">
                <div class="rounded-full w-4 h-4 bg-[#8FFF23]/80 border border-black"></div>
                <span class="opacity-80">
                  TESTNET
                </span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a Button href="/start/mainnet" class="flex flex-row items-center gap-2">
                <div class="LoadingPulse rounded-full w-4 h-4 bg-[#8FFF23] border border-black"></div>
                <span class="opacity-100">
                  MAINNET
                </span>
              </a>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  </div>
</template>

<script setup lang="ts">

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger
} from "reka-ui";
import {Bars3Icon} from "@heroicons/vue/24/solid";
import router from "@/router";
import DiscordIcon from "@/assets/discord.svg";
import GithubIcon from "@/assets/github.svg";
</script>