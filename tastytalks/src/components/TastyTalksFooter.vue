<!-- TastyTalksFooter.vue -->
<template>
  <footer>
    <!-- Need to add the some Social Media Icons and stuff here -->
    <!-- Also add the little "c" for copyright some -->
    <p>&copy; 2023 Tasty Talks</p>
  </footer>
</template>
  
<script>
  export default {
    name: 'TastyTalksFooter'
  }
</script>
  
<style scoped>
  /* .footer{
    background-color: #6666; 
    margin-top: auto;

  } */

  footer{
    display:flex;
    justify-content: right;
    padding-right: 4%;

    padding: 7px;

    background-color: var(--Trying);
    font-weight: bold;
}
</style>