<template>
  <main class="register">
    <form class="register" @submit.prevent="Register">
        <h2>Register</h2>
        <input 
            type="email"
            placeholder="Email Address"
            v-model="register_form.email" />
        <input 
            type="password"
            placeholder="Password"
            v-model="register_form.password" />
        <input 
            type="submit"
            value="Register" />
        
    </form>
    <a href="/login">Have an account? Login here</a>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const register_form = ref({})
        const store = useStore()

        const Register = () => {
            store.dispatch('register', register_form.value)
        }
        return {
            register_form,
            Register
        }
    }
    
}
</script>

<style>

</style>
