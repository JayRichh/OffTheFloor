<template>
  <div class="services-section ">
    <div class="services-hero">
      <h2>Classes & Timetable</h2>
      <p>Explore a range of classes and sessions we offer.</p>
      <div class="buttons-container">
        <router-link class="" to="/classes">
          <button class="view-session-btn btn btn-secondary-outline border" v-auto-animate>View Sessions</button>
        </router-link>
        <router-link class="" to="/classes">
          <button class="view-session-btn btn btn-secondary-outline border" v-auto-animate>Go To FAQ</button>
        </router-link>
      </div>
    </div>

    <div class="services-grid">
      <div class="service-item">
        <img src="@/assets/hoop.jpg" alt="Aerial Hoop" class="service-image">
        <h3>Aerial Hoop</h3>
        <p>Grace and strength combined in our Aerial Hoop classes.</p>
      </div>
      <div class="service-item">
        <img src="@/assets/neil.jpg" alt="Aerial Silks" 
        class="service-image">
        <h3>Aerial Silks</h3>
        <p>Flow and fly with our Aerial Silks sessions for all levels.</p>
      </div>
      <div class="service-item">
        <img src="@/assets/silks.jpg" alt="Pole Dance" class="service-image">
        <h3>Pole Dance</h3>
        <p>Empowerment and fitness meet in our Pole Dance workshops.</p>
      </div>
      <div class="service-item">
        <img src="@/assets/trap.jpg" alt="Sky Pole" class="service-image">
        <h3>Sky Pole</h3>
        <p>Take your pole skills to new heights with Sky Pole.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.services-hero {
  position: relative;
  z-index: 200;
  height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.services-hero h2,
.services-hero p {
  color: #2b2929e1;
}

.book-session-btn {
  padding: 10px 20px;
  background-color: #e53935;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 50px;
  background: #fff;
}

@media (max-width: 1200px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

.service-item {
  text-align: center;
  overflow: visible;
}

.service-item h3 {
  margin-top: 15px;
}

.service-image {
  max-width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  height: 600px;
  max-height: 600px;
  object-fit: cover;
  overflow: auto;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
}


.view-session-btn {
  transition: transform 0.3s ease-in-out;
  margin: 10px;
}

.view-session-btn:hover {
  transform: translateY(-3px);
}
</style>
