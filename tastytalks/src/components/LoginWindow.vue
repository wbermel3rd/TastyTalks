<template>
    <TastyTalksHeader />
    <main>
      <div class="login-container">
        <div class="login-box">
          <div class="logo">
            <img src="" alt="Logo Placeholder" />
          </div>
          <h1>Login</h1>
          <form>
            <div class="textbox">
              <input type="text" placeholder="Username">
            </div>
    
            <div class="textbox">
              <input type="password" placeholder="Password">
            </div>
    
            <button type="button" class="btn sign-in">Sign in</button>
            <button type="button" class="btn create-account" @click="goToRegister">Create Account</button>
          </form>
        </div>
      </div>
    </main>
    <TastyTalksFooter />
  </template>
    
<script>

import TastyTalksHeader from './TastyTalksHeader.vue';
import TastyTalksFooter from './TastyTalksFooter.vue';

  export default {
    name: "LoginWindow",
    methods: {
        goToRegister() {
            this.$router.push("/register");
        }
    },
    components: { TastyTalksHeader }
}
</script>
    
<style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 850px;
    height: 100vh;
    background-color: #cdf7a0;
  }
  
  .login-box {
    width: 500px;
    padding: 40px;
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
  