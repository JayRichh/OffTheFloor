<template>
  <div class="faq my-5">
    <div class="container">
      <h2 class="h3 mb-4 text-center">Frequently Asked Questions</h2>
      <div class="accordion" id="faqAccordion">
        <div class="accordion-item" v-for="(faq, index) in faqs" :key="faq.id">
          <h2 class="accordion-header" :id="'heading' + faq.id">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#collapse' + faq.id"
              :aria-expanded="index === 0 ? 'true' : 'false'"
              :aria-controls="'collapse' + faq.id"
            >
              {{ faq.question }}
            </button>
          </h2>
          <div
            :id="'collapse' + faq.id"
            class="accordion-collapse collapse"
            :class="{ 'show': index === 0 }"
            :aria-labelledby="'heading' + faq.id"
            data-bs-parent="#faqAccordion"
          >
            <div class="accordion-body">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs = ref<FAQ[]>([
  {
    id: 1,
    question: 'How do I get started?',
    answer: 'Simply contact us through our form, and we will guide you through the process.',
  },
  {
    id: 2,
    question: 'What is the turnaround time for a project?',
    answer: 'The timeline varies based on the project scope, but we always aim to deliver promptly.',
  },
]);
</script>

<style scoped>
</style>