<!-- TastyTalksHeader.vue -->
<template>
    <!-- ... content of the header component ... -->
    <header>
        <div class="top-header">
            <div class="TastyTalks-LogoDiv">
                <a href="/">
                    <div class="main-icon">
                        <img src="../assets/images/TastkyTalkMainIconSmall.jpg" alt="Main_Icon_of_the_page">
                    </div>
        
                    <div class="main-title">
                        <h1 class="headerlogo-font">Tasty Talks</h1>
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

                <router-link to="/about">About</router-link>
                <router-link to="/recipefeed">Recipes</router-link>
                <router-link to="/questionfeed">Questions</router-link>
                <router-link to="/choosepost">Create Post</router-link>
            </div>
        </div>
        <div class="custom-header">
            <SignedInHeader v-if="isUserSignedIn" />
            <SignedOutHeader v-else />
        </div>
        


    </header>
    
</template>

<!-- //////////////////////////////////////////// SCRIPT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

<script>
import { ref, onMounted } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/index'; // Adjust the path to your Firebase configuration
import SignedOutHeader from './SignedOutHeader.vue';
import SignedInHeader from './SignedInHeader.vue';

export default {
    name: 'TastyTalksHeader',
    components: {
        SignedOutHeader,
        SignedInHeader
    },
    setup() {
        const isUserSignedIn = ref(false);

        onMounted(() => {
            onAuthStateChanged(auth, (user) => {
                isUserSignedIn.value = !!user;
            });
        });

        return { isUserSignedIn };
    }
}
</script>
  

<!-- /////////////////////////////////////////// CSS  ////////////////////////////////////////////////////////////// -->


<style scoped>
    /* Component-specific styles go here */

    .top-header {
        display: flex;
        /* top, right, bottom, left */
        padding: 1% 5% 1% 3%;
        justify-content: space-between;
        border-bottom: 2px inset #373D20;
    }

    .main-title{
        white-space: nowrap;;
    }
    
    .top-header a{
        display: flex;
        text-decoration: none;
        gap: 10px;
    }

    header{
        display: flex;
        align-items: stretch;
        width: 100%;
        height: 100%;
        background-color: var(--mainBackgroundColor);

    }
    
    .bottom-header{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 55%;
        border-bottom: 2px inset #373D20;
    }
    .custom-header{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 45%;
        max-height: auto;
        border-bottom: 2px inset #373D20;
    }


</style>