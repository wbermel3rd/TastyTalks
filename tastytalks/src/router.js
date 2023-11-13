import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/LoginWindow.vue';
import Home from './components/Homepage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    // ... other routes
  ],
});

export default router;
