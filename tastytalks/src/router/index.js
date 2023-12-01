import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import UserLogin from '../views/LoginPage.vue'
import UserRegister from '../views/RegistrationPage.vue'
import { auth } from '../firebase'
import FullscreenRecipe from '../views/FullscreenRecipe.vue'
import ProfilePage from '../views/ProfilePage.vue'
import { onAuthStateChanged } from 'firebase/auth';


//Creating Questions and Recepies Import

import ChoosePost from '../views/ChoosePost.vue'
import CreateRecipe from '../views/CreateRecipe.vue'
import CreateQuestion from '../views/CreateQuestion.vue'


//Question and Recipe Feed Import

import QuestionFeed from '../views/QuestionFeed.vue'
import RecipeFeed from '../views/RecipeFeed.vue'




const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,

    // Require the authentification of the user to be able to see the page. 
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutPage.vue'),
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
  },
  {
    path: '/choosepost',
    name: 'ChoosePost',
    component: ChoosePost
  },
  {
    path: '/createrecipe',
    name: 'CreateRecipe',
    component: CreateRecipe
  },
  {
    path: '/createquestion',
    name: 'CreateQuestion',
    component: CreateQuestion
  },
  {
    path: '/recipefeed',
    name: 'RecipeFeed',
    component: RecipeFeed
  },
  {
    path: '/questionfeed',
    name: 'QuestionFeed',
    component: QuestionFeed
  },
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: FullscreenRecipe
  },
  { 
    path: '/profile', 
    name: 'ProfilePage', 
    component: ProfilePage,
    beforeEnter: (to, from, next) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          next(); // User is signed in, continue to profile page
        } else {
          next({ name: 'UserLogin' }); // No user is signed in, redirect to login
        }
      });
    } 
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