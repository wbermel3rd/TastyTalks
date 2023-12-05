<template>
    <main>

      <div class="login-container">
        <div class="login-box">
          <div class="logo">
            <img src="images/TastkyTalkMainIconSmall.jpg" alt="Logo Placeholder" />
          </div>
          <br>
          <h1>Login</h1>
          <form class="Login" @submit.prevent="Login">
            <div class="textbox">
              <input type="text" placeholder="Email address" v-model="login_form.email">
            </div>
    
            <div class="textbox">
              <input type="password" placeholder="Password" v-model="login_form.password">
            </div>
    
            <button type="submit" value="Login" class="btn sign-in" >Sign in</button>
            <button type="button" class="btn create-account" @click="goToRegister">Create Account</button>
          </form>
        </div>
      </div>
      
    </main>
  </template>
    
<script>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const login_form = ref({}) 
        const store = useStore()

        const Login = () => {
            store.dispatch('login', login_form.value)
        }
        return {
            login_form,
            Login
        }

    },
    methods: {
      goToRegister() {
        this.$router.push('/register');
      }
    }
  }
</script>

<!-- //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

<style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 850px;
    height: 100vh;
    background-color: #222;
  }
  
  .login-box {
    min-width: 500px;
    padding: 40px;
    min-height: 500px;
    
    border-radius: 8px;
    text-align: center;
    color: #fff;
  }
  
  
  .textbox input {
    width: 100%;
    margin-bottom: 20px;
    margin-top: 10px;
    padding: 10px;
    border: none;
    border-bottom: 2px solid #8CC84B;
    background-color: transparent;
    color: white;
  }
  
  .btn {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .sign-in {
    background-color: #8CC84B;
    color: white;
  }
  
  .create-account {
    background-color: transparent;
    color: #bbb;
    border: 1px solid #bbb;
  }
  
 /*Button animation*/
  .btn:hover {
    opacity: 0.8;
  }

  h1{
    font-family: var(--primaryFont);
  }

  .logo img{
    height: auto;
    border-radius: 50%;
    /* max-width: 50px; */
  }

</style>
  