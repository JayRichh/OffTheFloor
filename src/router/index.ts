import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Booking from '../views/Booking.vue';
import Classes from '../views/Classes.vue';
import Contact from '../views/Contact.vue';
import Updates from '../views/Updates.vue';
import FAQ from '../views/FAQ.vue';

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/booking', component: Booking, name:'booking' },
  { path: '/classes', component: Classes, name:'classes' },
  { path: '/updates', component: Updates, name:'updates' },
  { path: '/contact-us', component: Contact, name: 'contact' },
  { path: '/faq', component: FAQ, name: 'faq' },
];

const router = createRouter({
  history: createWebHistory('/OffTheFloor/'),
  routes,
});

export default router;
