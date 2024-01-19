<template>
  <div class="hero">
    <div class="video-container">
      <canvas ref="upscaledCanvas" class="upscaled-video"></canvas>
    </div>
    <h2 class="hero-heading">Join the fun</h2>
    <p class="hero-subheading">Jump in and jump jump test tetstsetstetstest.</p>
    <button class="btn btn-primary">Learn More</button>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import WebSR from '@websr/websr';

const upscaledCanvas = ref<HTMLCanvasElement | null>(null);
const videoSources = [
  new URL('../assets/vid1.mp4', import.meta.url).href,
  new URL('../assets/vid2.mp4', import.meta.url).href,
  new URL('../assets/vid3.mp4', import.meta.url).href,
]
let currentVideoIndex = 0;
let videoElement: HTMLVideoElement | null = null;

async function initWebSR() {
  const gpu = await WebSR.initWebGPU();
  if (!gpu) return console.log("Browser/device doesn't support WebGPU");

  videoElement = document.createElement('video');
  videoElement.muted = true;
  videoElement.loop = true; // Set to false if you want to trigger 'ended' event
  videoElement.autoplay = true;
  videoElement.src = videoSources[currentVideoIndex];

  const canvasElement = upscaledCanvas.value;
  if (canvasElement && videoElement) {
    canvasElement.width = videoElement.videoWidth * 2;
    canvasElement.height = videoElement.videoHeight * 2;

    const websr = new WebSR({
      source: videoElement,
      network_name: "anime4k/cnn-2x-s",
      weights: await (await fetch('./cnn-2x-s.json')).json(), // Adjust path if necessary
      gpu,
      canvas: canvasElement
    });

    await websr.start();
  }

  videoElement.addEventListener('ended', () => {
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    videoElement.src = videoSources[currentVideoIndex];
    videoElement.play();
  });
}

onMounted(async () => {
  await nextTick();
  initWebSR();
});
</script>

<style scoped>
.hero {
  /* ... existing styles ... */
  position: relative;
  overflow: hidden;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5; /* Adjust the opacity as needed */
}

.upscaled-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>