<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-smoke border-bottom">
    <div class="container" v-auto-animate>
      <a class="navbar-brand" href="/">
        <img src="../../assets/transparent-logo.png" class="logo-img" />
      </a>

      <button class="navbar-toggler" type="button" 
              @click="toggleDropdown">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-center" :class="{ show: isDropdownOpen }">
        <!-- Navigation links -->
        <ul class="navbar-nav mb-2 mb-lg-0" v-auto-animate>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/schedule">Schedule</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/classes">Classes</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact-us">Contact & Location</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Updates</router-link>
          </li>
        </ul>

        <!-- Booking button and Social icons -->
        <div class="d-flex justify-content-center">
          <div class="">
            
            <button class="btn btn-outline-secondary d-lg-flex mb-2 mb-lg-0">
              BOOK YOUR SESSION
            </button>
            
            <div class="icon-container d-flex ">
              <i class="fab fa-facebook-f me-2 fa-2x"></i>
              <i class="fab fa-instagram me-2 fa-2x"></i>
              <i class="fab fa-twitter fa-2x"></i>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  // Scriptttttttttttttttttttttttt
  const isDropdownOpen = ref(false);

  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };
</script>

<style lang="scss" scoped>
.logo-img {
  height: 10rem;
  width: auto;
}

.navbar {
  font-family: 'Arial', sans-serif; 
}

.nav-link {
  color: rgb(53, 53, 53);
  text-align: center;
  transition: color 0.3s ease, background-color 0.3s ease;

  &:hover {

  }
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0,0,0,.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  i {
    transition: transform 0.3s ease;
  }
  @media screen and (min-width: 1024px) {
    justify-content: flex-end;
  }
}

.btn {
  font-weight: bold;
  color: black;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  justify-self: center;
  &:hover {
    color: rgba(3, 29, 51, 0.795);
    background-color: darken(#22a7db31, 10%);
  }
}

.btn-outline-secondary:hover {
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
}

.navbar-collapse {
  transition: max-height 0.4s ease-out;
}

@media (min-width: 992px) {
  .navbar-collapse {
    flex-grow: 0;
  }
  .nav-link {
  }
}

@media (max-width: 991px) {
  .nav-item {
    margin-bottom: 0.5rem;
  }
  .navbar-collapse {
    background-color: #f8f9fa;
  }
}
</style>

