<template v-auto-animate>
  <Navbar />
  <router-view :key="uniqueKey" />
  <ScrollToTop />
  <Footer />
</template>

<script setup lang="ts">
// @ts-nocheck
import { onMounted, toRefs, ref } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/common/Navbar.vue';
import Footer from './components/common/Footer.vue';
import ScrollToTop from './components/common/ScrollToTop.vue';

const route = useRoute();
const uniqueKey = ref(crypto.randomUUID())

onMounted(()=>{
  const { fullPath } = toRefs(route);
})
</script>

