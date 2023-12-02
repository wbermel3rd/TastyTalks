import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut

} from 'firebase/auth'


export default createStore({
  state: {
    loadedRecipes:[
      {
        id: 'qlwkjdhfiuqewnlc',
        title: '',
        date: '2023-12-1',
      },
      {
        id: 'alksecluqwneckqjn',
        title: '',
        date: '2023-12-2',
      }
    ],
    loadedQuestions:[
      {
        id: 'qlwkjdhfiuqewnlc',
        title: '',
        date: '2023-12-1',
      },
      {
        id: 'alksecluqwneckqjn',
        title: '',
        date: '2023-12-2',
      }
    ],
    user: {
      id: 'asdfasdfasdf',
      createdRecipes: ['qlwkjdhfiuqewnlc'],
      createdQuestions: [] 
    }
  },
  mutations: {

    SET_USER (state, user){
      state.user = user
    },

    CLEAR_USER (state){
      state.user = null
    }
  },
  actions: {
    async login({commit}, details){
      const { email, password } = details

      try{
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error){
        switch(error.code){
          case 'auth/user-not-found': 
            alert('User not found')
            break
          default:
            alert ('Something went wrong')
        }

        return
      }

      commit('SET_USER', auth.currentUser)
      router.push('/')

    },
    async register({commit}, details){
      const { email, password } = details
      try{
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error){
        switch(error.code){
          case 'auth/email-already-in-use': 
            alert('Email already in use')
            break
          case 'auth/invalid-email': 
            alert('Invalid email')
            break
          case 'auth/operation-not-allowed': 
            alert('Operation not allowed')
            break
          case 'auth/weak-password': 
            alert('Weak password')
            break
          default:
            alert ('Something went wrong')
        }

        return
      }

      commit('SET_USER', auth.currentUser)
      router.push('/login')
    },
    async logout({commit}){
      await signOut(auth)
      commit('CLEAR_USER')
      router.push('/login')
    },
    fetchUser({ commit }){
      auth.onAuthStateChanged(async user => {
        if(user === null){
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)

          if(router.isReady() && router.currentRoute.value.path === '/login'){
            router.push('/')
          }
        }
      })
    }
  },
  getters: {
    loadedRecipes(state){
      return state.loadedRecipes.sort((recipeA, recipeB) => {
        return recipeA.date > recipeB.date
      })
    },
    loadedRecipe(state){
      return(recipeId) => {
        return state.loadedRecipes.find((recipe) => {
          return recipe.id === recipeId
        })
      }
    },
    loadedQuestions(state){
      return state.loadedQuestions.sort((questionA, questionB) => {
        return questionA.date > questionB.date
      })
    },
    loadedQuestion(state){
      return(questionId) => {
        return state.loadedQuestions.find((question) => {
          return question.id === questionId
        })
      }
    },
    featuredRecipes(state, getters){
      return getters.loadedRecipes.slice(0, 3)
    },
    featuredQuestions(state, getters){
      return getters.loadedQuestions.slice(0, 3)
    }

  }
})