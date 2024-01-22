<template>
  <nav :class="['navbar navbar-expand-lg navbar-dark border-bottom', { 'home-route': isHomeRoute }]" :style="navbarStyle">
    <div class="container " style="">
      <a class="navbar-brand" href="/">
        <img src="../../assets/transparent-logo.png" class="logo-img" />
      </a>

      <button class="navbar-toggler" type="button" 
              @click="toggleDropdown">
        <span class="navbar-toggler-icon" :class="{ 'open': isDropdownOpen }"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-center align-items-center" :class="{ show: isDropdownOpen && !isScrolled }">
        <!-- Navigation links -->
        <ul class="navbar-nav mb-2 primary-nav" v-auto-animate>
          <li class="nav-item">
            <router-link active-class="router-active" class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="router-active" class="nav-link" to="/classes">Classes</router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="router-active" class="nav-link" to="/updates">Updates</router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="router-active" class="nav-link" to="/contact-us">Contact & Location</router-link>
          </li>
        </ul>

        <!-- Booking button and Social icons -->
        <div class="d-flex justify-content-center flex-shrink-0" v-show="!isScrolled">
          <div class="col-container">
    
            <div class="icon-container d-flex mt-lg-3 mobile-icons" v-auto-animate>
              <i class="fab fa-facebook-f me-2 fa-2x"></i>
              <i class="fab fa-youtube me-2 fa-2x"></i>
              <i class="fab fa-instagram me-2 fa-2x"></i>
              <i class="fab fa-twitter fa-2x"></i>
            </div>

            <button id="joinButton" class="btn btn-outline-secondary d-lg-flex mb-2 mb-lg-4 mt-lg-3 mx-auto">
              BOOK YOUR SESSION
            </button>
            
          </div>
        </div>
      </div>
    </div>
  </nav>

  <template v-if="isScrolled">

    <nav class="secondary-navbar overflow-hidden" id="mate" :style="navbarSecondaryStyle" :class="{ 'show': isScrolled }" v-auto-animate>

      <div class="container d-flex justify-content-between">
        <ul class="navbar-nav d-flex align-items-center">
          <li class="nav-item d-block w-auto">
            <router-link active-class="router-active" class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item d-block w-auto">
            <router-link active-class="router-active" class="nav-link" to="/classes">Classes</router-link>
          </li>
          <li class="nav-item d-block w-auto">
            <router-link active-class="router-active" class="nav-link" to="/updates">Updates</router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="router-active" class="nav-link" to="/contact-us">Updates</router-link>
          </li>
        </ul>
        <button class="navbar-toggler" type="button" @click="toggleSecondaryDropdown">
          <span class="navbar-toggler-icon" :class="{ 'open': isSecondaryDropdownOpen }"></span>
        </button>
      </div>
      <div class="d-flex align-items-center">
        <!-- Secondary Togglies -->
        <div class="secondary-dropdown align-items-center pb-4  overflow-hidden" >
          <transition-group name="flip-fade" v-show="isSecondaryDropdownOpen" v-auto-animate>
            <i key="4" class="fab fa-facebook-f me-2 fa-2x pb-2"></i>
            <i key="3" class="fab fa-youtube me-2 fa-2x pb-2"></i>
            <i key="2" class="fab fa-instagram me-2 fa-2x pb-2"></i>
            <i key="1" class="fab fa-twitter fa-2x pb-2"></i>
            <button key="5" id="joinButton" class="btn btn-outline-secondary ms-4 d-lg-flex mx-auto">
              BOOK
            </button>
          </transition-group>
        </div>
      </div>
    </nav>
  </template>
</template>

<script setup lang="ts">
 import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const isDropdownOpen = ref(false)
const isSecondaryDropdownOpen = ref(false)
const isMobileDropdownOpen = ref(false)
const isScrolled = ref(false)
const scrollY = ref(0);
const route = useRoute()
const currentPath = computed(() => route.path)
const isHomeRoute = computed(() => currentPath.value === '/');

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const toggleSecondaryDropdown = () => {
  isSecondaryDropdownOpen.value = !isSecondaryDropdownOpen.value
}

const toggleMobileDropdown = () => {
  isMobileDropdownOpen.value = !isMobileDropdownOpen.value;
};

const handleScroll = () => {
  scrollY.value = window.scrollY
  if (window.scrollY > 185) {
    isScrolled.value = true
  } else {
    isScrolled.value = false
  }
};

const animateIcons = () => {
  let els = null as any
  els = [...document.querySelectorAll('.secondary-dropdown i'), ...document.querySelectorAll('.secondary-dropdown button')];
  els.reverse().forEach((element, index) => {
    element.style.transitionDelay = `${index * 100}ms`;
    if (!isSecondaryDropdownOpen.value) {
      element.style.transform = 'translateY(-100%)'; // Move up (hide)
      element.style.opacity = 0;
    } else {
      element.style.transform = 'translateY(0)'; // Move down (show)
      element.style.opacity = 1;
    } 
  });
};

watch(isSecondaryDropdownOpen, () => {
  animateIcons();
});

const navbarStyle = computed(() => {
  let opacity = 0.8;
  if (scrollY.value > 0 && scrollY.value < 185) {
    opacity = 0.8 - (scrollY.value / 185);
  } else if (scrollY.value >= 185) {
    opacity = 0;
  }
  const backgroundColor = `rgba(255, 255, 255, ${opacity})`;
  return { backgroundColor };
});

const navbarSecondaryStyle = computed(() => {
  // start 200px from 0, another 100px be at 0.8.
  let opacity = 0;
  if (scrollY.value > 185) {
    opacity = (scrollY.value - 185) / 100;
  }
  const backgroundColor = `rgba(245, 245, 245, ${opacity})`;
  return { backgroundColor };
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
nav {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background-color 0.3s ease-in-out;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 999;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;

  &.home-route {
    margin-bottom: -12rem;
  }
}
.navbar * {
  overflow: hidden !important;
}
.router-active {
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);

  &:hover {
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
    margin-bottom: 0px;
  }
}
#joinButton {
  text-align: center;
  cursor: pointer;
  transition: box-shadow 1s ease-in-out;
  z-index: 5;
  &:hover {
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2)
  }
}
.logo-img {
  height: 10rem;
  width: auto;
}

.logo {
  height: 50px;
}

.mobile-icons * {
  border: 1.5px solid transparent;
  border-color: rgba(0, 0, 0, 0);
  border-radius: 5px;
  padding: 5px;
  transition: border-color 0.5s ease-in-out;
  cursor: pointer;
}
.mobile-icons *:hover {
  transition: border-color 0.5s ease-in-out;
  transition: ease 1s cubic-bezier(0.075, 0.82, 0.165, 1), ease 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  border-color: rgba(0, 0, 0, 0.808);
  scale: 1.15;
}
.mobile-icons *:nth-child(1) {
  padding-left: 10px;
  padding-right: 10px;
}
.mobile-icons *:nth-child(2) {
  padding-left: 5px;
  padding-right: 5px;
}
.mobile-icons *:nth-child(3) {
  padding-left: 6px;
  padding-right: 5px;
}
.navbar {
  font-family: 'Arial', sans-serif; 
  z-index: 2;
}
.nav-link {
  color: rgb(53, 53, 53);
  text-align: center;
  transition: color 0.3s ease, background-color 0.3s ease;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin: 10px;
  margin-bottom: 1rem;
  text-decoration: none;
  margin-bottom: 2px;
}

.nav-link:hover {
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  margin-bottom: 0px;
}

.nav-placeholder {
  flex: 1;
}
.primary-nav {
  position: absolute;
  top: 5rem;
  left: 50vw;
  width: auto;
  margin: 0;
  padding: 0;
  z-index: 99;
  transition: opacity 0.3s ease-in-out;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.secondary-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 60px;
  background-color: rgba(245, 245, 245, 0.815);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  transform: translateY(-100%);
  background-color: transparent;
  transition: background-color 0.3s ease-in-out;

  &.show {
    opacity: 1;
    transform: translateY(0);
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
  }
  .navbar-nav {
    display: flex;
    flex-direction: row;
    margin-bottom: 0;
    gap: 1rem;

    .nav-item {
      display: block;
      overflow: hidden;
      padding: 0.25rem 0 0 0;
    }

    .nav-link {

      padding: 0.5rem 0.5rem;
      margin-top: 0.25rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: transform 0.2s ease-in-out, border-bottom 0.2s ease-in-out;
      overflow: hidden;
      height: 100%;

      &:hover {
        transform: scale(1.05);
        border-bottom: rgba(116, 106, 106, 0.26)
      }
    }
  }

  .navbar-toggler {
    order: 2;
  }
}

.secondary-dropdown {
  position: absolute;
  right: 13vw;
  display: flex;
  width: auto;
  z-index: 2222;
  padding: 0;
  gap: 1rem;
  padding-top: 5px;
  margin-top: 0;
  top: 0.5rem;

  button {
    margin-bottom: 0.5rem;
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: rgba(245, 245, 245, 0.685);
      color: black;
      transform: translateY(-3px);
    }
  }

  .fab {
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: translateY(-3px);
      cursor: pointer;
    }
  }
}

.mobile-dropdown {
  display: none;
  position: absolute;
  left: 0;
  top: 60px; // Adjust according to your navbar height
  width: 100%;
  background-color: white;
  transition: transform 0.3s ease-in-out;
  transform: translateY(-100%); // Start off-screen
  z-index: 1000; // Ensure it's above other content

  .nav-item {
    padding: 10px;
  }
}

@media (max-width: 768px) {
  .navbar-toggler {
    display: block; // Show only on mobile
  }

  .mobile-dropdown {
    display: block; // Enable dropdown on mobile
    transform: translateY(0); // Adjust position based on toggle state
  }
}

.navbar-toggler {
  order: 1;

}

.secondary-navbar .navbar-nav {
  justify-content: flex-start;
}

@media (min-width: 992px) {
  .navbar-collapse {
    justify-content: space-between;
  }
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0,0,0,.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");

  &.open {
    background-image: none;
    position: relative;
  }
  &.open::before,
  &.open::after {
    content: '';
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    transition: transform 0.3s ease-in-out;
  }
  &.open::before {
    transform: translateY(-50%) rotate(45deg);
  }
  &.open::after {
    transform: translateY(-50%) rotate(-45deg);
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.flip-fade-enter-active,
.flip-fade-leave-active {
  transition: all 0.3s ease;
}
.flip-fade-enter,
.flip-fade-leave-to {
  transform: rotateY(90deg);
  opacity: 0;
}

.secondary-dropdown i,
.secondary-dropdown button {
  opacity: 0;
  transform: translateY(-100%); // Initial state above the view
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  i {
    transition: transform 0.3s ease;
  }
  button {
    transition: transform 0.3s ease;
  }
  @media screen and (min-width: 1024px) {
    justify-content: flex-end;
  }
}

#joinBtn {
  font-weight: bold;
  color: black;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  justify-self: center;
  &:hover {
    color: rgba(3, 29, 51, 0.795);
    background-color: var(--color-primary);
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