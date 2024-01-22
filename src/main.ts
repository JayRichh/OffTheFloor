import initAutoAnimate from './plugins/auto-animate';  
import { createApp } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import router from './router';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue3-carousel/dist/carousel.css';
import './styles/reset.css';
import './styles/main.css';

const app = createApp(App);
app.use(router);
app.component('Carousel', Carousel);
app.component('Slide', Slide);

initAutoAnimate(app);  

app.mount('#app');
