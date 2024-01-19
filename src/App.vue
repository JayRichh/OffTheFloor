<template>
  <Navbar />
  <router-view :key="uniqueKey" />
  <Footer />
</template>

<script setup lang="ts">
import { onMounted, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/common/Navbar.vue';
import Footer from './components/common/Footer.vue';

const route = useRoute();
const uniqueKey = crypto.randomUUID()

onMounted(()=>{
  const { fullPath } = toRefs(route);
  console.log(fullPath)
  
})
</script>

<style lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

</style>
