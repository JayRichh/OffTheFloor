<template>
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" v-model="form.name" required>
    </div>
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

// const submitForm = () => {
//   alert(`Ello m8`);
// };
</script>

<style scoped>
</style>