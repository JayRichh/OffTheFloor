import { autoAnimatePlugin } from '@formkit/auto-animate/vue'  
import type { App } from 'vue';  

export default (app: App): App => {  
  return app.use(autoAnimatePlugin);  
};
