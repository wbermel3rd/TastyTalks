


<template>
  <div>
    <TastyTalksHeader />
    <router-view />
    <TastyTalksFooter />
  </div>
</template>

<script>
import TastyTalksHeader from './components/TastyTalksHeader.vue'
import TastyTalksFooter from './components/TastyTalksFooter.vue'


export default {
  name: 'App',
  components: {
    TastyTalksHeader,
    TastyTalksFooter
}
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
