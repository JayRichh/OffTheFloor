<template>
  <form @submit.prevent="submitForm" class="g-3">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" v-model="form.name" required>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" id="email" v-model="form.email" required>
    </div>
    <div class="mb-3">
      <label for="message" class="form-label">Message</label>
      <textarea class="form-control" id="message" rows="4" v-model="form.message" required></textarea>
    </div>
    <div class="text-center">
      <button type="submit" class="btn btn-primary">Send Message</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const form = ref<ContactForm>({
  name: '',
  email: '',
  message: '',
});

const submitForm = () => {
  // TODO: Implement form submission logic
  alert(`Message sent by: ${form.value.name}`);
  form.value = { name: '', email: '', message: '' }; // Reset form
};
</script>

<style scoped>
</style>