<template>
    <TastyTalksHeader />
    <main>
        <router-view/>
    </main>
    <TastyTalksFooter />

</template>

<script>

import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

// Importing the templates
import TastyTalksHeader from './components/TastyTalksHeader.vue'
import TastyTalksFooter from './components/TastyTalksFooter.vue'

export default {
  

  /////////////// Adding the Templates ////////////////////
  name: 'App',
  components: {
    TastyTalksHeader,
    TastyTalksFooter
  },


  ///////////////////////////////////////////////////////
  setup() {
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
  }
}

</script>

<style >


  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main{
    flex-grow: 1;
  }







  /* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  } */
</style>
