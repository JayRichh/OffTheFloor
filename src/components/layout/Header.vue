<template>
  <div class="header-content container" v-auto-animate>
    <div class="content-overlay"></div>
    <h2 class="hero-heading pb-5">Welcome</h2>
    <p class="hero-subheading mt-5">We are a fun friendly studio teaching Aerial Hoop, Aerial Silks, Pole, Sky Pole, Trapeze among for adults, children and families.</p>
    <button class="btn btn-primary d-flex ms-auto">More Info.</button>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.header-content {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 40vh;
  right: 4rem;
  width: 60%;
  text-align: right;
  z-index: 2;
  animation: fadeIn 0.3s ease-in-out;
  overflow: hidden;
  padding: 0 0 1rem 0;

  @media (max-width: 480px) {
    width: 100%;
    right: 0;
    padding: 0 1rem 1rem 1rem;
    background-color: #0000003a;
    backdrop-filter: blur(3px);
    padding: 4rem 1rem;
    // fade top and bottom
    .content-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, transparent, #ffffff00);
      z-index: 1;
    }

    
  }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.hero-heading, .hero-subheading {
  color: #fff;
}

.hero-heading {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-subheading {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.btn-primary {
  background-color: #e9f2fc0e;
  border-color: #eef0f1;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: var(--color-primary);
}
.btn-primary:active {
  border-color: var(--color-secondary);
  transform: translateY(2px)
}
</style>