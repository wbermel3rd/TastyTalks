<template>
  <TastyTalksHeader />
    <div id="nav" v-if="$store.state.user">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <button @click="$store.dispatch('logout')">Logout</button>
    </div>
  <router-view/>
  <TastyTalksFooter />
</template>

<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import TastyTalksHeader from './components/TastyTalksHeader.vue'
import TastyTalksFooter from './components/TastyTalksFooter.vue'

export default {
    setup() {
        const store = useStore();
        onBeforeMount(() => {
            store.dispatch("fetchUser");
        });
    },
    components: { TastyTalksHeader, TastyTalksFooter }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
