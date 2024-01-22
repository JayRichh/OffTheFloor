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
// @ts-nocheck
import Hero from '../components/layout/Hero.vue';
import Header from '../components/layout/Header.vue';
import Testimonials from '../components/sections/Testimonials.vue';
import ServicesSection from '../components/sections/Services.vue';
import FAQ from '../components/sections/FAQ.vue';
</script>

<style scoped>
.video-header {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
}
</style>
