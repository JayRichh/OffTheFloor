<template>
  <div class="hero">
    <video ref="backgroundVideo" :key="currentVid.value" class="video-background" autoplay loop muted playsinline>
      <source :src="currentVideoUrl" type="video/mp4">
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted, watch, nextTick, computed } from 'vue';

const videoSources = [
  () => import('@/assets/vid1.mp4'),
  () => import('@/assets/vid2.mp4'),
  () => import('@/assets/vid3.mp4'),
];

// const vidK = ref(0)

let currentVideoIndex = ref(0);
// const isPlayingVideo = ref(false)
const currentVideoUrl = ref('');
const currentVid = computed(() => currentVideoUrl);

async function loadVideo() {
  const videoModule = await videoSources[currentVideoIndex.value]();
  currentVideoUrl.value = videoModule.default;
  console.log(currentVideoUrl.value)
}

// async function checkVideo() {
//   if (backgroundVideo.value && backgroundVideo.value.paused) {
//     await loadVideo();
//   }
// }

function nextVideo() {
  currentVideoIndex.value = (currentVideoIndex.value + 1) % videoSources.length;
}

const backgroundVideo = ref<HTMLVideoElement | null>(null);

watch (backgroundVideo, (newV, _) => {
  if (newV && newV.paused) {
    loadVideo();
  }
})

watchEffect(() => {
  if (backgroundVideo.value) {
    backgroundVideo.value.load();
    backgroundVideo.value.addEventListener('ended', () => { nextVideo; console.log('erer');});
  }
});

onMounted(async () => {
  await nextTick();
  await loadVideo();
});


</script>

<style scoped lang="scss">
.hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.8;
  z-index: 1;
  animation: fadeIn 2s ease-in-out;

  &::after {
    content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0rem;
  height: 100px;
  background: linear-gradient(to bottom, transparent, #ffffff)
  }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  
}

.hero::before {
  content: '';
  display: block;
}


.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
}

.hero-heading {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 1rem;
}

.hero-subheading {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 2rem;
}

.btn-primary {
  background-color: #0069d9;
  border-color: #0062cc;
}
</style>