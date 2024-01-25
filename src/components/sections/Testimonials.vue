<template>
  <div class="testimonials">
    <div class="container-xxl ">
      <h1 class="h3 my-5 text-center">What Our Clients Say</h1>
      <Carousel
        :items-to-show="isMobile ? 1 : isTablet ? 2.5 : 3"
        :key="isMobile ? 1 : isTablet ? 2 : 3"
        :autoplay="5000"
        :center-mode="true"
        ref="carousel"
        pause-autoplay-on-hover
        v-model="currentSlide"
        v-auto-animate
      >
        <Slide v-for="(testimonial, index) in shuffledTestimonials" :key="testimonial.id" >
          <div 
            class="carousel__item " 
            :class="{
              'is-side': index !== currentSlide,
              'is-active': isActiveTestimonial(index),
            }">
            <div class="card-carousel__body">
              <blockquote class="blockquote">
                <p class="testimonial-quote ">{{ testimonial.quote }}</p>
                <footer class="blockquote-footer ">
                  {{ testimonial.author }}
                  <span class="stars">
                    <i class="fas fa-star d-none d-md-inline"></i>
                    <i class="fas fa-star d-none d-md-inline"></i>
                    <i class="fas fa-star d-none d-md-inline"></i>
                    <i class="fas fa-star d-none d-md-inline"></i>
                    <i class="fas fa-star d-none d-md-inline"></i>
                  </span>
                </footer>
              </blockquote>
            </div>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
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

const isActiveTestimonial = (index) => {
  const total = testimonials.value.length;
  const prevIndex = (currentSlide.value - 1 + total) % total;
  const nextIndex = (currentSlide.value + 1) % total;
  return index !== prevIndex && index !== nextIndex;
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

const isMobile = computed(() => window.innerWidth < 768);
const isTablet = computed(() => window.innerWidth >= 768 && window.innerWidth < 1200);

</script>

<style scoped lang="scss">
.testimonials {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  height: 70vh;
  
  .carousel {
    min-height: 100%;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    padding: 0 0 1rem 0;
    .carousel__viewport {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
      position: relative;
      transition: transform 0.3s ease-in-out;
      .carousel__track {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2vw 4vw; 
        background-color: #fff;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        margin: 1vw;
        &
        .testimonial-quote {
          font-style: italic;
          margin-bottom: 1rem;
        }
      }
    }
  }
}

.is-active {
  transform: scale(1.2);
  opacity: 1;
  max-width: 100%;
  @media (min-width: 1200px) {
    max-width: 80%;
  }
  @media (min-width: 800px) {
    font-size: 4vw;
  }
  @media (min-width: 2000px) {
    transform: scale(1.3);
  }
}
 
@media (min-width: 360px) and (max-width: 480px) {
  .testimonials {
    .carousel__item {
      margin: 6vw;
      padding: 3vw; 

      .testimonial-quote {
        font-size: 4vw;
      }
    }
  }
}

@media (min-width: 480px) and (max-width: 799px) {
  .testimonials {
    .carousel__item {
      margin: 6vw;
      padding: 3vw; 

      .testimonial-quote {
        font-size: 1.8vw;
      }
    }
  }
}

@media (min-width: 800px) and (max-width: 1199px) {
  .testimonials {
    padding: 2vw;
    .carousel__item {
      padding: 2.5vw 4vw;

      .testimonial-quote {
        font-size: 1.5vw;
      }
    }
  }
}

@media (min-width: 1200px) {
  .testimonials {
    padding: 4vh 0;

    .carousel__item {
      padding: 3vw; 

      .testimonial-quote {
        font-size: 1vw;
      }
    }
  }
}

@media (min-width: 2000px) {
  .testimonials {
    
    .carousel__item {
      padding: 5vw 2vw;
      .testimonial-quote {
        font-size: 0.75vw;
      }
    }
  }
}

@media (min-width: 3840px) {
  .testimonials {
    .carousel__item {
      padding: 0.5vw; 
      .testimonial-quote {
        font-size: 0.5vw;
      }
    }
  }
}
</style>

