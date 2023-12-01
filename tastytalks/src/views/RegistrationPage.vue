<template>
  <main>
    <div class="registration-container">
      <div class="registration-box">
        <div class="logo">
            <img src="images/TastkyTalkMainIconSmall.jpg" alt="Logo Placeholder" />
        </div>
        <h1>Create an Account</h1>
        <form class="register" @submit.prevent="Register">
          <div class="textbox">
            <input type="text" placeholder="First Name" v-model="register_form.first_name">
          </div>
          <div class="textbox">
            <input type="text" placeholder="Last Name" v-model="register_form.last_name">
          </div>
          <div class="textbox">
            <input type="email" placeholder="Email Address" v-model="register_form.email">
          </div>
          <div class="textbox">
            <input type="username" placeholder="Username" v-model="register_form.username">
          </div>
  
          <div class="textbox">
            <input type="password" placeholder="Password" v-model="register_form.password">
          </div>
          <div class="textbox">
            <input type="password" placeholder="Confirm Password">
          </div>
          
          <div class="dropdown">
            <select v-model="register_form.region" required>
                <option value="" disabled selected>Select your country</option>
                <option value="1">Asia-Pacific</option>
                <option value="2">Caribbean</option>
                <option value="3">Central America</option>
                <option value="4">Central Asia</option>
                <option value="5">Eastern Europe</option>
                <option value="6">Middle East</option>
                <option value="7">Nordic Countries</option>
                <option value="8">North America</option>
                <option value="9">Northern Africa</option>
                <option value="10">Oceania</option>
                <option value="11">Southern Africa</option>
                <option value="12">South America</option>
                <option value="13">Southeast Asia</option>
                <option value="14">Western Europe</option>

                
            </select>
          </div>

          <button type="submit" value="Register" class="btn create-account">Create your Account</button>
        </form>
      </div>
    </div>
    </main>
  </template>
    
  <script>

  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { db } from '../firebase'
  import { collection, addDoc } from 'firebase/firestore'

  export default {
    name: 'User-Register',
    components: {},
    methods: {},
    setup() {
     
      const register_form = ref({})
      const store = useStore()

      const Register = async () => {
        await store.dispatch('register', register_form.value)
        await addDoc(collection(db, "users"), {
            email: register_form.value.email,
            username: register_form.value.username,
            first_name: register_form.value.first_name,
            last_name: register_form.value.last_name,
            region: register_form.value.region,
        })
      }
      return {
          register_form,
          Register
      }
    }
      
  }
  </script>
    
  <style scoped>
  .registration-container {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 620px;
    /* height: 100vh; */
    background-color: #222;
  }
  
  .registration-box {
    width: 500px;
    min-height: 600px;
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

  .dropdown select{
    width: 100%;
    margin-bottom: 20px;
    margin-top: 10px;
    padding: 10px;
    border: none;
    border-bottom: 2px solid #8CC84B;
    background-color: transparent;
    color: rgb(158, 158, 158);
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
  
  .create-account {
    background-color: #8CC84B;
    color: white;
  }
  
 /*Button animation*/
  .btn:hover {
    opacity: 0.8;
  }

  .logo img{
    height: auto;
    border-radius: 50%;
    /* max-width: 50px; */
  }

  .logo{
    margin-bottom: 20px;
  }
  </style>
  