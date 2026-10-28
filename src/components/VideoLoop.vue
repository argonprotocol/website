<template>
  <div :class="{ 'group/video-loop': !$slots.default }">
    <div class="border border-dashed border-black/20 rounded-lg overflow-hidden">
      <ul v-if="$slots.default" class="aspect-video overflow-y-auto list-disc space-y-2 m-0 py-4 pl-8 pr-4">
        <slot />
      </ul>
      <video
        v-else-if="props.src"
        autoplay
        muted
        playsinline
        ref="videoRef"
        class="block w-full opacity-100 transition-opacity duration-500 ease-in-out"
        @loadedmetadata="syncProgress"
        @durationchange="syncProgress"
        @timeupdate="syncProgress"
        @play="handlePlay"
        @pause="handlePause"
        @ended="handleEnded"
        @transitionend="handleTransitionEnd"
      >
        <source :src="props.src" type="video/webm">
      </video>
    </div>
    <div class="flex items-center gap-2 border border-black/20 rounded-md shadow-md bg-white min-h-8 mt-0.5 px-2 py-1 opacity-30 transition-opacity duration-500 ease-in-out group-hover/video-loop:opacity-100">
      <button
        type="button"
        class="flex size-6 shrink-0 items-center justify-center rounded text-black/50 hover:text-black/80 focus-visible:outline-2 focus-visible:outline-purple-500 transition-opacity duration-500 ease-in-out"
        :style="{ opacity: isFaded ? 0.3 : 1 }"
        :aria-label="isPlaying || isLooping ? 'Pause video' : 'Play video'"
        @click="togglePlayback"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" class="size-5" aria-hidden="true">
          <path v-if="isPlaying || isLooping" d="M4 3h4v14H4zm8 0h4v14h-4z" />
          <path v-else d="M5 2.5v15l12-7.5z" />
        </svg>
      </button>
      <input
        type="range"
        class="video-progress min-w-0 flex-1 transition-opacity duration-500 ease-in-out"
        :style="{ opacity: isFaded ? 0.3 : 1 }"
        aria-label="Video progress"
        min="0"
        :max="duration || 1"
        step="any"
        :value="currentTime"
        :disabled="!duration"
        @pointerdown="pauseForSeek"
        @input="seek"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';

const props = defineProps<{
  src?: string;
}>();

const videoRef = Vue.ref<HTMLVideoElement | null>(null);
const isPlaying = Vue.ref(false);
const isLooping = Vue.ref(false);
const isFaded = Vue.ref(false);
const currentTime = Vue.ref(0);
const duration = Vue.ref(0);
let playbackRevision = 0;
let soughtToEnd = false;
let progressFrame: number | undefined;

Vue.onBeforeUnmount(() => {
  cancelAnimationFrame(progressFrame ?? 0);
});

function updateProgressFrame(): void {
  syncProgress();
  progressFrame = requestAnimationFrame(updateProgressFrame);
}

function handlePlay(): void {
  soughtToEnd = false;
  isPlaying.value = true;
  cancelAnimationFrame(progressFrame ?? 0);
  updateProgressFrame();
}

function handlePause(): void {
  isPlaying.value = false;
  cancelAnimationFrame(progressFrame ?? 0);
  syncProgress();
}

function syncProgress(): void {
  const video = videoRef.value;
  if (!video) return;

  currentTime.value = video.currentTime;
  duration.value = Number.isFinite(video.duration) ? video.duration : 0;
}

async function togglePlayback(): Promise<void> {
  const video = videoRef.value;
  if (!video) return;

  const shouldPause = isPlaying.value || isLooping.value;
  playbackRevision += 1;
  isLooping.value = false;
  video.style.opacity = '1';
  isFaded.value = false;

  if (shouldPause) {
    video.pause();
    return;
  }

  try {
    await video.play();
  } catch (error) {
    console.warn('Video playback could not start:', error);
  }
}

function pauseForSeek(): void {
  const video = videoRef.value;
  if (!video) return;

  playbackRevision += 1;
  isLooping.value = false;
  video.style.opacity = '1';
  isFaded.value = false;
  video.pause();
}

function seek(event: Event): void {
  const video = videoRef.value;
  if (!video || !duration.value) return;

  pauseForSeek();
  const targetTime = Number((event.target as HTMLInputElement).value);
  soughtToEnd = targetTime >= duration.value;
  video.currentTime = targetTime;
  syncProgress();
}

function handleEnded(): void {
  const video = videoRef.value;
  if (!video || soughtToEnd) return;

  isLooping.value = true;

  // Hold the final frame and fade it out.
  video.style.opacity = '0';
  isFaded.value = true;
}

async function handleTransitionEnd(event: TransitionEvent): Promise<void> {
  const video = videoRef.value;

  // Ignore the fade-in transition and unrelated transitions.
  if (
      !video ||
      !isLooping.value ||
      event.propertyName !== 'opacity' ||
      video.style.opacity !== '0'
  ) {
    return;
  }

  const revision = playbackRevision;

  // Register the listener before changing the playback position.
  const seeked = new Promise<void>((resolve) => {
    video.addEventListener('seeked', () => resolve(), { once: true });
  });

  // Reset while invisible.
  video.currentTime = 0;
  await seeked;
  if (revision !== playbackRevision) return;

  isLooping.value = false;

  try {
    await video.play();
  } catch (error) {
    console.warn('Video playback could not restart:', error);
  }

  // Allow the opening frame to render before fading it in.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      video.style.opacity = '1';
      isFaded.value = false;
    });
  });
}
</script>

<style scoped>
.video-progress {
  appearance: none;
  height: 8px;
  border: 1px solid #aaa;
  border-radius: 999px;
  background: #e99bf5;
  cursor: pointer;
}

.video-progress::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #aaa;
  border-radius: 50%;
  background: white;
}

.video-progress::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border: 1px solid #aaa;
  border-radius: 50%;
  background: white;
}

.video-progress::-webkit-slider-thumb:hover {
  box-shadow: 0 2px 3px #0003;
}

.video-progress::-moz-range-thumb:hover {
  box-shadow: 0 2px 3px #0003;
}

.video-progress:focus-visible {
  outline: 2px solid #a855f7;
  outline-offset: 4px;
}

.video-progress:disabled {
  cursor: default;
}
</style>
