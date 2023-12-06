<template>
    <div class="Account-Container">
        <button class="btn" @click="goToProfile" >Profile</button>
        <button class="btn" @click="handleLogout">Log Out</button>
    </div>
</template>

<script>
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/index'; // Adjust the path to your Firebase configuration

export default {
    name: 'SignedInHeader',
    methods: {
        async handleLogout() {
            try {
                await signOut(auth);
                window.location.reload();
                // Handle post-logout logic, like redirecting to the home page
                console.log("Logged out successfully");
            } catch (error) {
                console.error("Logout failed:", error);
            }
        },
        goToProfile(){
            this.$router.push({ name: 'ProfilePage'});
        },
        goToSettings() {
            this.$router.push('/settings');
        }
    }
}
</script>

<style scoped>
.Account-Container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 15px;
}
.user-icon{
    color: gray;
    font-size: 45px;
}

.btn {
    width: auto;
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    background-color: #FADF54;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    font-weight: bolder;
  }

</style>