<!-- TastyTalksHeader.vue -->
<template>
    <!-- ... content of the header component ... -->
    <header>
        <div class="top-header">
            <div class="TastyTalks-LogoDiv">
                <a href="/">
                    <div class="main-icon">
                        <img src="images/TastkyTalkMainIconSmall.jpg" alt="Main_Icon_of_the_page">
                    </div>
        
                    <div class="main-title">
                        <h1>Tasty Talks</h1>
                    </div>
                </a>
            </div>
            <div class="utility-icons">
            </div>
        </div>

        <!-- NAVBAR PLACEHOLDER   -->
        <!-- (Bottom rectangle with lighter green color that has the pages link inside) -->
        <div class="bottom-header">
            <div class="navbar"> 
                <router-link to="/">Home</router-link>
                <router-link to="/about">About</router-link>
                <router-link to="/postfeed">Recipes</router-link>
                <router-link to="/createpost">Post</router-link>
            </div>
        </div>
        <div class="custom-header">
            <SignedOutHeader />
        </div>



    </header>
</template>

<!-- //////////////////////////////////////////// SCRIPT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

<script>

import SignedOutHeader from './SignedOutHeader.vue';

  export default {
    // Component logic goes here
    name: 'TastyTalksHeader',
    components: {
        SignedOutHeader
    }
  }


</script>
  

<!-- /////////////////////////////////////////// CSS  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->


<style scoped>
    /* Component-specific styles go here */

    .top-header {
        display: flex;
        /* top, right, bottom, left */
        padding: 1% 5% 1% 3%;
        justify-content: space-between;
    }

    .main-title{
        white-space: nowrap;;
    }
    
    .main-title{
        font-size: 20px;
        font-family: var(--TestingFont);
        color: var(--Trying2);
    }

    .top-header a{
        display: flex;
        text-decoration: none;
        gap: 15px;
    }
    header{
        display: flex;
        align-items: stretch;
        width: 100%;
        height: 100%;
        background-color: var(--Trying2);
        font-family: var(--TestingFont);
    }
    
    .bottom-header{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 55%;
    }
    .custom-header{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 45%;
        max-height: auto;
    }


</style>