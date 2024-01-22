<template>
  <Navbar />
  <router-view :key="uniqueKey" v-auto-animate @change="onChange"/>
  <ScrollToTop />
  <Footer />
</template>

<script setup lang="ts">
import { onMounted, toRefs, ref } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/common/Navbar.vue';
import Footer from './components/common/Footer.vue';
import ScrollToTop from './components/common/ScrollToTop.vue';

const route = useRoute();
const uniqueKey = ref(crypto.randomUUID())

const onChange = () => {
  uniqueKey.value += crypto.randomUUID()
}

onMounted(()=>{
  const { fullPath } = toRefs(route);
  console.log(fullPath, route.toString())
  
})
</script>

