<template>
  <div class="scroll-button-container overflow-hidden" v-auto-animate>
    <button
      ref="button"
      @click="handleButtonClick"
      v-if="showButton"
      class="scroll-button"
      aria-label="Scroll to Top"
      title="Scroll to Top"
    >
      <i class="fas fa-arrow-up"></i>
      <span class="sr-only">Scroll to Top</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const showButton = ref(false);
const button = ref(null);

const handleButtonClick = () => {
  let btn = button.value

  btn.classList.add('fade-out');
  window.scrollTo({top: 0,behavior: "smooth",});

  btn.addEventListener('transitionend', () => {
    btn.style.display = 'none';
  }, { once: true });
};

onMounted(() => {
  window.addEventListener('scroll', () => {
    showButton.value = window.scrollY > 175;
  });
});
</script>

<style scoped>
.scroll-button-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}

.scroll-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 1em;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  overflow: hidden;
}

.scroll-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.scroll-button:active {
  transform: scale(0.90);
  transition: transform 0.1s ease-in-out;
}

.fade-out {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
</style>
