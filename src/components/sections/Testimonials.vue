<template>
  <div class="testimonials my-5">
    <div class="container">
      <h2 class="h3 mb-4 text-center">What Our Clients Say</h2>
      <div class="carousel-container" v-auto-animate>
        <transition-group name="carousel" tag="div" class="carousel-inner">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.id"
            v-show="isTestimonialVisible(index)"
            :class="getItemClass(index)"
          >
            <div class="card mb-3">
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <p>{{ testimonial.quote }}</p>
                  <footer class="blockquote-footer">{{ testimonial.author }}</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <Map class="my-5" />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Map from './Map.vue';

interface Testimonial {
  id: number;
  author: string;
  quote: string;
}

const testimonials = ref<Testimonial[]>([
  { id: 1, author: 'John Doe', quote: 'This company is amazing! They transformed our business.' },
  { id: 2, author: 'Jane Smith', quote: 'Highly professional team and outstanding service.' },
  { id: 3, author: 'Michael Brown', quote: 'I am very impressed with their work.' },
  { id: 4, author: 'Emma Johnson', quote: 'The best company I have ever worked with.' },
  { id: 5, author: 'Lucas White', quote: 'Their customer service is top-notch.' },
  { id: 6, author: 'Sophia Green', quote: 'I highly recommend them to anyone.' },
]);

const activeIndex = ref(0);
const leftIndex = ref(testimonials.value.length - 1);
const rightIndex = ref(1);
let intervalId: any;

const isTestimonialVisible = (index: number) => {
  return index === leftIndex.value || index === activeIndex.value || index === rightIndex.value;
};

onMounted(() => {
  intervalId = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % testimonials.value.length;
    leftIndex.value = (activeIndex.value - 1 + testimonials.value.length) % testimonials.value.length;
    rightIndex.value = (activeIndex.value + 1) % testimonials.value.length;
  }, 5000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

const getItemClass = (index: number) => {
  if (index === leftIndex.value) return 'left';
  if (index === activeIndex.value) return 'active';
  if (index === rightIndex.value) return 'right';
  return 'hidden';
};
</script>

<style scoped>
.carousel-container {
  position: relative;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  justify-content: center;
}

.carousel-item {
  position: absolute;
  width: 100%;
  opacity: 0;
  transition: all 1s ease;
}

.carousel-item.active {
  opacity: 1;
  transform: translateX(0);
}

.carousel-item.left, .carousel-item.right {
  opacity: 0.5; /* Adjust the opacity for non-active items */
}

.carousel-item.right {
  transform: translateX(0); /* Keep the right item in place, only change the opacity */
}

.carousel-item.hidden {
  display: none;
}

.carousel-enter-active,
.carousel-leave-active {
  transition: all 1s ease;
}

.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>