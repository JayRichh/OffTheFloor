<template>
  <div class="video-header">
    <Suspense>
      <Hero />
    </Suspense>
    <Header />
  </div>
  
  <ServicesSection />
  <Testimonials />
  <FAQ />
</template>

<script setup lang="ts">
import Hero from '../components/layout/Hero.vue';
import Header from '../components/layout/Header.vue';
import Testimonials from '../components/sections/Testimonials.vue';
import ServicesSection from '../components/sections/Services.vue';
import FAQ from '../components/sections/FAQ.vue';
</script>

<style scoped>
.video-header {
  position: relative;
  width: 100%;
  height: auto;
}
</style>
