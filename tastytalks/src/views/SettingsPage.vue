<template>
    <main>
    <div class="settings-container">
      <div class="settings-card">
        <div class="settings-header">
          <h1>Settings</h1>
        </div>
        <div class="settings-body">
          <div class="setting-item">
            <h2>Username:</h2>
        <label for="username">Name:</label>
        <input type="text" id="username" value="User Name" readonly>
    </div>
    <div class="setting-item">
      <h2>Password:</h2>
  <label for="password">Password:</label>
  <input type="password" id="password" value="Password" readonly>
  <button id="change-password" @click="showPasswordChangeFields = true">Change Password</button>

  <div v-if="showPasswordChangeFields">
    <input class="newpassword1" type="password" v-model="newPassword" placeholder="New Password">
    <input type="password" v-model="confirmPassword" placeholder="Confirm New Password">
    <button @click="changePassword">Confirm Change</button>
  </div>
    </div>
    <div class="setting-item">
      <h2>Email:</h2>
        <label for="email">Email:</label>
        <input type="email" id="email" value="user@example.com" readonly>
        <button id="change-email">Change Email</button>
    </div>
    <div class="setting-item">
      <h2>Account:</h2>
        <button id="logout">Log Out</button>
        <button id="delete-account" class="danger">Delete Account</button>
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
        showPasswordChangeFields: false,
    newPassword: '',
    confirmPassword: '',
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
      },
      changePassword() {
    if (this.newPassword === this.confirmPassword) {
      // Call Firebase to change the password
      auth.currentUser.updatePassword(this.newPassword)
        .then(() => {
          alert('Password changed successfully');
          this.showPasswordChangeFields = false;
          this.newPassword = '';
          this.confirmPassword = '';
        })
        .catch(error => {
          console.error('Error changing password:', error);
          alert('Error changing password');
        });
    } else {
      alert('Passwords do not match');
    }
  },
    }
  }
  </script>


<style scoped>
.settings-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 160px); /* Adjust based on your header and footer height */
  padding: 20px;
}

.settings-card {
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

.settings-header {
  background-color: #4c934c; /* Similar green from your image */
  color: #fff;
  padding: 20px;
  text-align: center;
  position: relative;
}


.settings-body {
  padding: 20px;
  flex-grow: 1; /* Makes the body take up all available space */
}

.settings-info p {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 30px; /* Spacing between paragraphs */
}

.settings-info strong {
  color: #4c934c; /* Similar green for emphasis */
}


.setting-item {
    margin-bottom: 20px;
}

.setting-item label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.setting-item input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.setting-item button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}

#delete-account {
    margin-left: 10px;
    margin-top: 15px;
}

#logout {
    margin-right: 10px;
}
.setting-item .danger {
    background-color: #f44336;
}

.newpassword1 {
    margin-bottom: 10px;
    margin-top: 10px;
}

/* Adding a little bit of responsiveness */
@media (max-width: 600px) {
    .setting-item button {
        width: 100%;
    }
}
</style>