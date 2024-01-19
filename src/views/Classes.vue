<template>
  <section>
    <h2 class="h3 text-center mb-4">Our Services</h2>
    <div class="row g-4">
      <div class="col-md-4" v-for="service in services" :key="service.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ service.title }}</h5>
            <p class="card-text">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Service {
  id: number;
  title: string;
  description: string;
}

const services = ref<Service[]>([
  { id: 1, title: 'Web Design', description: 'Creating stunning and responsive websites.' },
  { id: 2, title: 'Digital Marketing', description: 'Promoting your business online.' },
  { id: 3, title: 'Branding', description: 'Building your brand identity.' },
]);
</script>

<style scoped>
</style>