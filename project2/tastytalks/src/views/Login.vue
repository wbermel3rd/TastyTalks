<!-- <template>
  <div class="Login">
    <form class="Login" @submit.prevent="Login">
        <h2>Login</h2>
        <input 
            type="email"
            placeholder="Email Address"
            v-model="login_form.email" />
        <input 
            type="password"
            placeholder="Password"
            v-model="login_form.password" />
        <input 
            type="submit"
            value="Login" />
    </form>
    
    <a href="/register">No account? Register here</a>
</div>
</template> -->
<template>
    <div class="login-container">
      <div class="login-box">
        <div class="logo">
          <img src="" alt="Logo Placeholder" />
        </div>
        <h1>Login</h1>
        <form class="Login" @submit.prevent="Login">
          <div class="textbox">
            <input type="text" placeholder="Email" v-model="login_form.email">
          </div>
  
          <div class="textbox">
            <input type="password" placeholder="Password" v-model="login_form.password">
          </div>
  
          <button type="submit" class="btn sign-in" value="Login">Sign in</button>
          <button type="button" class="btn create-account" @click="goToRegister">Create Account</button>
        </form>
      </div>
    </div>
  </template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const login_form = ref({}) 
        const store = useStore()
        const router = useRouter()
        const goToRegister = () => {
            router.push('/register')
        }

        const Login = () => {
            store.dispatch('login', login_form.value)
        }
        return {
            login_form,
            Login,
            goToRegister
        }
        

    }
}


</script>

<style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    padding-top: 30;
    padding-bottom: 850px;
    height: 100vh;
    background-color: #cdf7a0;
  }
  
  .login-box {
    width: 500px;
    padding: 40px;
    min-height: 400px;
    background-color: #222;
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
</style>
  