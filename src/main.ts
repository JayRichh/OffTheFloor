import initAutoAnimate from './plugins/auto-animate';  
import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import './styles/reset.css';
import './styles/main.css';

const app = createApp(App);
app.use(router);
initAutoAnimate(app);  

app.mount('#app');
