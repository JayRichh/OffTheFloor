<template>
  <div class="container py-5">
    <h1 class="display-4">Contact Us</h1>
    <p class="lead">Get in touch with us for any inquiries or support.</p>
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <ContactForm />
        <Map />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactForm from '../components/sections/ContactForm.vue';
import Map from '../components/sections/Map.vue';
</script>

<style scoped>
</style>