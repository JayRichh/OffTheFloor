<template>
  <div class="testimonials my-5">
    <div class="container-xxl">
      <h2 class="h3 mb-4 text-center">What Our Clients Say</h2>
      <Carousel :items-to-show="3" :center-mode="true" ref="carousel" v-model="currentSlide" :wrapAround="true" :autoplay="5000" v-auto-animate>
        <Slide v-for="(testimonial, index) in testimonials" :key="testimonial.id">
          <div 
            class="carousel__item" 
            :class="{
              'is-side': isSideSlide(index),
              'is-active': index === currentSlide,
            }">
            <div class="card-carousel__body">
              <blockquote class="blockquote">
                <p class="testimonial-quote">{{ testimonial.quote }}</p>
                <footer class="blockquote-footer">
                  {{ testimonial.author }}
                  <span class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </span>
                </footer>
              </blockquote>
            </div>
          </div>
        </Slide>
      </Carousel>

      <div class="d-flex justify-content-center align-items-center mt-3 gap-4">
        <button class="btn btn-primary" style="background-color: transparent; border: none; color: #007bff;" @click="prev">
          Prev
        </button>
        <button class="btn btn-primary" style="background-color: transparent; border: none; color: #007bff;" @click="next">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

interface Testimonial {
  id: number;
  author: string;
  quote: string;
}

const currentSlide = ref(1);

const isSideSlide = (index) => {
  const total = testimonials.value.length;
  const prevIndex = (currentSlide.value - 1 + total) % total;
  const nextIndex = (currentSlide.value + 1) % total;
  return index === prevIndex || index === nextIndex;
};

const next = () => {
  currentSlide.value = (currentSlide.value + 1) % testimonials.value.length;
};

const prev = () => {
  currentSlide.value = (currentSlide.value - 1 + testimonials.value.length) % testimonials.value.length;
};

const testimonials = ref<Testimonial[]>([
  {
    id: 1,
    author: "Helen R Young",
    quote: "What a place! The sense of camaraderie between the students is like nothing I've experienced. My daughter spends all week asking when she can go back. Gemma is phenomenal as an instructor and genuinely decent human being. Such a refreshing change to the usual dancing/gymnastics cliques. I cannot recommended Gemma and herJunior Instructions enough."
  },
  {
    id: 2,
    author: "Alisha Asquith",
    quote: "I’ve been going to the studio for two years now. I love training here and it’s perfect for any skill level. If you are thinking about taking up pole, hoop or silks this is the perfect place to give it a try no prior training is needed and Gemma is super supportive throughout."
  },
  {
    id: 3,
    author: "Sie Christian",
    quote: "Excellent  place if you are into hoop and aerial. Gemma is an excellent teacher catering to individual  students needs."
  },
  {
    id: 4,
    author: "Charlotte Dowson",
    quote: "Never felt more energised after dancing, caters for everyone's needs and has a brilliant social side to it too. Nothing is too much for Gemma and feeling more confident every time I go."
  },
  {
    id: 5,
    author: "Trinity Brown",
    quote: "The most amazing place on the planet fantastic Gemma the owner and coach is the nicest person you could ever meet and all the kids and mams and dads love her fabulous coach as well everyone is welcome with open arms it’s like one big happy family with some incredible aerial skills on show."
  },
  {
    id: 6,
    author: "Sashenka lindridge",
    quote: "Grate place to go everyone is every friendly there gemma is amazing at teaching x."
  },
  {
    id: 7,
    author: "Maurice brazell",
    quote: "Attend first session after Christmas break the kids and trainers are full on and everyone had a wonderful session."
  },
  {
    id: 8,
    author: "Claire Brazell",
    quote: "Super Fun environment, well priced. A wide range of ages/experience levels of the students."
  },
  {
    id: 9,
    author: "Vanessa Hill",
    quote: "Sadly had to move away and couldn't go anymore but great facilities, lovely people and atmosphere! Would go back if I could!"
  },
  {
    id: 10,
    author: "Mark Harrington",
    quote: "Amazing love coming here Gemma is a legend x."
  }
]);

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

const shuffledTestimonials = shuffleArray(testimonials.value.map((testimonial, index) => ({
  ...testimonial,
  id: index + 1,
})));

</script>

<style scoped lang="scss">
.testimonials {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  position: relative;
  overflow: hidden;

  .carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    margin: 0 1rem;
    &.is-active {
      transform: scale(1);
      opacity: 1;
    }
    .testimonial-quote {
      font-size: 1.25rem;
      font-style: italic;
      margin-bottom: 1rem;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: rem;
      pointer-events: none;
      z-index: 2;
    }

    &::before {
      left: 0;
      background: linear-gradient(to right, rgba(245, 245, 245, 1), rgba(245, 245, 245, 0));
    }

    &::after {
      right: 0;
      background: linear-gradient(to right, rgba(245, 245, 245, 0), rgba(245, 245, 245, 0.5));
    }

    &.is-side:first-child {
      transform: scale(0.8) !important;
      opacity: 0.5;
    }

    &.is-side:not(:first-child) {
      background: linear-gradient(to bottom, rgba(245, 245, 245, 1), rgba(245, 245, 245, 0.5));
    }
  }
}

@media (max-width: 768px) {
  .testimonials {
    .container-xxl {
      .carousel__item {
        height: auto; // Adjust height for smaller screens
      }
    }
  }
}
</style>

