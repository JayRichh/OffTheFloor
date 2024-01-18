<template>
  <div class="testimonials my-5">
    <div class="container">
      <h2 class="h3 mb-4 text-center">What Our Clients Say</h2>
      <div class="row">
        <div class="col-md-6" v-for="testimonial in testimonials" :key="testimonial.id">
          <div class="card mb-3">
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>{{ testimonial.quote }}</p>
                <footer class="blockquote-footer">{{ testimonial.author }}</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Testimonial {
  id: number;
  author: string;
  quote: string;
}

const testimonials = ref<Testimonial[]>([
  { id: 1, author: 'John Doe', quote: 'This company is amazing! They transformed our business.' },
  { id: 2, author: 'Jane Smith', quote: 'Highly professional team and outstanding service.' },
]);
</script>

<style scoped>
</style>