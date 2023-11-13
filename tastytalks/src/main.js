import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles.css'; //Import the global css file
import router from './router.js';


const app = createApp(App);
app.use(router);
app.mount('#app');
