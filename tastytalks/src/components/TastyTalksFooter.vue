<!-- TastyTalksFooter.vue -->
<template>
  <footer>
    <!-- Need to add the some Social Media Icons and stuff here -->
    <!-- Also add the little "c" for copyright some -->

    <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
    <a href="#"><i class="fa-brands fa-instagram"></i></a>

    <p>&copy; 2023 Tasty Talks</p>
  </footer>
</template>
  
<script>
  export default {
    name: 'TastyTalksFooter'
  }
</script>
  
<style scoped>

  footer{
    display:flex;
    justify-content: right;

    padding: 7px;
    padding-right: 4%;
    gap: 20px;

    font-family: var(--footerFont);

    background-color:#4c934c;
    color: white;

  }

  a {
    text-decoration: none;
    color: white;
  }

  a:hover{
    color: rgb(209, 209, 209);
  }
  
</style>