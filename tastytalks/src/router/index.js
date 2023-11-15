import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import UserLogin from '../views/LoginPage.vue'
import UserRegister from '../views/RegistrationPage.vue'
import { auth } from '../firebase'




const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home

    // Require the authentification of the user to be able to see the page. 
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }

  next();
})

export default router