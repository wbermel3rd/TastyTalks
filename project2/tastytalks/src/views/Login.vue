<template>
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
</template>

<script>
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

    }
}
</script>

<style>

</style>