<template>
  <div class="faq my-5">
    <div class="container">
      <h2 class="h3 mb-4 text-center">Frequently Asked Questions</h2>
      <div class="accordion" id="faqAccordion">
        <div class="accordion-item" v-for="(faq, index) in faqs" :key="faq.id">
          <h2 class="accordion-header" :id="'heading' + faq.id">
            <button
              class="accordion-button collapsed"
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
    question: 'Can parents watch?',
    answer: 'Yes. There is a designated viewing area for parents and family to watch during the sessions.',
  },
  {
    id: 2,
    question: 'What should my child wear to class?',
    answer: 'For boys and girls, leggings or shorts are fine with a tight fitted top that can be tucked in. A leotard is not essential but is the most ideal when participating in gymnastics. Please avoid t-shirts or baggy clothing as it restricts movement and can hinder our ability to provide feedback and corrections.',
  },
  {
    id: 3,
    question: 'Are your coaches qualified?',
    answer: 'Yes, all of our leading coaches are fully qualified. We also have assistant coaches who are learning to become leading coaches and are always under the supervision of a head coach or qualified coach.',
  },
  {
    id: 4,
    question: 'Is gymnastics safe?',
    answer: 'Gymnastics is a very safe sport when taught correctly. Our coaches will ensure your child’s welfare is paramount and will not push any skills above what they are capable of doing.',
  },
  {
    id: 5,
    question: 'What kind of fitness background do I need as an adult?',
    answer: 'No fitness background is needed to start adult classes. Whether you have a dance or gymnastics background or none at all, if you can hang from a pull-up bar, you can start a beginner course.',
  },
  {
    id: 6,
    question: 'What if I am afraid of heights?',
    answer: 'Do not worry! Many professional aerialists start with a fear of heights. Our class sizes are small, and our instructors are experienced in working with students who have concerns about heights. Beginners work right off the mat, and moves are spotted by instructors.',
  },
]);
</script>

<style scoped>
.faq .container {
  padding: 1rem;
}

.accordion-button {
  font-size: 1rem;
  padding: 0.75rem 1.25rem;
}

.accordion-body {
  font-size: 0.9rem;
  line-height: 1.6;
  padding: 1rem;
}

@media (min-width: 576px) {
  .faq .container {
    padding: 1.5rem;
  }
}

@media (min-width: 768px) {
  .faq .container {
    padding: 2rem;
  }
  .accordion-button {
    font-size: 1.1rem;
  }
}

@media (min-width: 992px) {
  .faq .container {
    padding: 2.5rem;
  }
  .accordion-button {
    font-size: 1.2rem;
  }
  .accordion-body {
    font-size: 1rem; 
  }
}
</style>