import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/LoginWindow.vue';
import Home from './components/Homepage.vue';
import register from './components/RegistrationPage.vue';

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
    {
      path: '/register',
      name: 'Register',
      component: register,
    },
    // ... other routes
  ],
});

export default router;
