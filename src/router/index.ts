import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Booking from '../views/Booking.vue';
import Classes from '../views/Classes.vue';
import Contact from '../views/Contact.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/booking', component: Booking },
  { path: '/classes', component: Classes },
  { path: '/contact-us', component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
