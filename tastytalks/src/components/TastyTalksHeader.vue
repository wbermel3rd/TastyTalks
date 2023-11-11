<!-- TastyTalksHeader.vue -->
<template>
    <!-- ... content of the header component ... -->
    <header>
        <div class="top-header">
            <div class="TastyTalks-LogoDiv">
                <a href="createAccount.html">
                    <div class="main-icon">
                        <img src="images/TastkyTalkMainIconSmall.jpg" alt="Main_Icon_of_the_page">
                    </div>
        
                    <div class="main-title">
                        <h1>Tasty Talks</h1>
                    </div>
                </a>
            </div>
            <div class="utility-icons">
                <a href=""><i class="fa-solid fa-user"></i></a>
            </div>
        </div>

        <!-- NAVBAR PLACEHOLDER -->
        <div class="bottom-header">
            <div class="navbar"> 
                <a href="index.html">Home</a>
                <a href="#">Recipies</a>
                <a href="#">Post</a>
            </div>
        </div>
    </header>
</template>
  
<script>
  export default {
    // Component logic goes here
    name: 'TastyTalksHeader',
  }
</script>
  
<style scoped>
    /* Component-specific styles go here */
    .navbar {
        color: #6666;
    }
  

</style>