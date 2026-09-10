<template>
  <div class="border border-black/10 rounded-xl overflow-hidden shadow-xl">
    <video
      autoplay
      muted
      playsinline
      ref="videoRef"
      class="block w-full opacity-100 transition-opacity duration-500 ease-in-out"
      @ended="handleEnded"
      @transitionend="handleTransitionEnd"
    >
      <source :src="props.src" type="video/webm">
    </video>
  </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';

const props = defineProps<{
  src: string;
}>();

const videoRef = Vue.ref<HTMLVideoElement | null>(null);

function handleEnded(): void {
  const video = videoRef.value;
  if (!video) return;

  // Hold the final frame and fade it out.
  video.style.opacity = '0';
}

async function handleTransitionEnd(event: TransitionEvent): Promise<void> {
  const video = videoRef.value;

  // Ignore the fade-in transition and unrelated transitions.
  if (
      !video ||
      event.propertyName !== 'opacity' ||
      video.style.opacity !== '0'
  ) {
    return;
  }

  // Register the listener before changing the playback position.
  const seeked = new Promise<void>((resolve) => {
    video.addEventListener('seeked', () => resolve(), { once: true });
  });

  // Reset while invisible.
  video.currentTime = 0;
  await seeked;

  try {
    await video.play();
  } catch (error) {
    console.warn('Video playback could not restart:', error);
  }

  // Allow the opening frame to render before fading it in.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      video.style.opacity = '1';
    });
  });
}
</script>