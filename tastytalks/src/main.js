import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles.css' //Import the global css file
import router from './router'
import store from './store'



/// Create App when launching (command: npm run serve) 

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
//createApp(App).use(store).use(router).mount('#app')
