<template>
    <main>
    <div class="profile-container">
      <div class="profile-card">
        <div class="profile-header">
          <h1>Your Profile</h1>
          <i class="fa-solid fa-gear settings-icon" @click="goToEditProfile"></i>
        </div>
        <div class="profile-body">
          <div class="profile-info">
            <p><strong>Name:</strong> {{ user.username }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Region:</strong>{{ user.Region }}</p>
            <!-- Add more user information here -->
          </div>
        </div>
      </div>
    </div>
</main>
  </template>
  

  <script>
  import { auth } from '../firebase/index';
  
  export default {
    data() {
      return {
        user: null,
      };
    },
    created() {
      this.fetchUserData();
    },
    methods: {
      fetchUserData() {
        const currentUser = auth.currentUser;
        if (currentUser) {
          // Fetch additional user info if needed
          this.user = currentUser;
        }
      }
    }
  }
  </script>


<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 160px); /* Adjust based on your header and footer height */
  padding: 20px;
}

.profile-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px; /* Increased width */
  min-height: 800px;
  margin: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column; /* Stack children vertically */
}

.profile-header {
  background-color: #4c934c; /* Similar green from your image */
  color: #fff;
  padding: 20px;
  text-align: center;
  position: relative;
}
.settings-icon {
  position: absolute;
  top: 23px; /* Adjust as needed */
  right: 20px; /* Adjust as needed */
  font-size: 32px; /* Adjust as needed */
  color: #fff; /* Adjust as needed */
  cursor: pointer;
}

.profile-body {
  padding: 20px;
  flex-grow: 1; /* Makes the body take up all available space */
}

.profile-info p {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 30px; /* Spacing between paragraphs */
}

.profile-info strong {
  color: #4c934c; /* Similar green for emphasis */
}
</style>