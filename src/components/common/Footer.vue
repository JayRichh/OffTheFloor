<template>
  <footer class="bg-primary text-white text-center py-3">
    <div class="container">
      © {{ currentYear }}   Name. All rights reserved.
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped>
</style>