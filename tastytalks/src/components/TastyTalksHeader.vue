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

        <!-- NAVBAR PLACEHOLDER   -->
        <!-- (Bottom rectangle with lighter green color that has the pages link inside) -->
        <div class="bottom-header">
            <div class="navbar"> 
                <router-link to="/">Home</router-link> |
                <router-link to="/login">Login</router-link>
                <router-link to="/about">About</router-link>
                <a href="/home">Home</a>
                <a href="#">Recipies</a>
                <a href="#">Post</a>
                <a href="/login">Login</a>
                <a href="/blablalb">Login</a>
            </div>
        </div>
    </header>
</template>

<!-- //////////////////////////////////////////// SCRIPT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

<script>
  export default {
    // Component logic goes here
    name: 'TastyTalksHeader',
  }
</script>
  

<!-- /////////////////////////////////////////// CSS  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->


<style scoped>
    /* Component-specific styles go here */

    .top-header {
        display: flex;
        
        /* top, right, bottom, left */
        padding: 1% 5% 1% 3%;

        background-color: var(--Trying2);
        
        justify-content: space-between;
    }

    .top-header a{
        display: flex;
        text-decoration: none;
        gap: 10px;
    }


</style>