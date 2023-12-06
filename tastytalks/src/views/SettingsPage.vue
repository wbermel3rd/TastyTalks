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
            <input type="text" id="username" :value="user?.username || 'Loading...'" readonly>
    </div>
    <div class="setting-item">
      <h2>Password:</h2>
  <input type="password" id="password" value="Password" readonly>
  <button id="change-password" @click="showPasswordChangeFields = true">Change Password</button>

  <div v-if="showPasswordChangeFields">
  <div class="password-field">
    <input :type="showPassword ? 'text' : 'password'" class="newpassword1" v-model="newPassword" placeholder="New Password">
    <i :class="['fa', showPassword ? 'fa-eye-slash' : 'fa-eye']" @click="showPassword = !showPassword"></i>
  </div>
  <input :type="password" v-model="confirmPassword" placeholder="Confirm New Password">
    <button @click="changePassword">Confirm Change</button>
  </div>
    </div>
    <div class="setting-item">
      <h2>Email:</h2>
        <input type="email" id="email" value="user@example.com" readonly>
    </div>
    <div class="setting-item">
      <h2>Account:</h2>
        <button id="logout">Log Out</button>
        <button id="delete-account" class="danger" @click="confirmAndDeleteAccount">Delete Account</button>

    </div>
        </div>
      </div>
    </div>
</main>
  </template>
  

  <script>
  import { auth, db } from '../firebase/index';
  import { getAuth, updatePassword, signOut, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
  import { collection, query, where, getDocs } from 'firebase/firestore';

  import router from '@/router'
  
  export default {
    data() {
      return {
        user: null,
        showPasswordChangeFields: false,
    newPassword: '',
    confirmPassword: '',
    showPassword: false,
      };
    },
    created() {
      this.fetchUserData();
    },
    methods: {
      async fetchUserData() {
  const currentUser = auth.currentUser;
  if (currentUser) {
    try {
      const userCollection = collection(db, 'users');
      const userQuery = query(userCollection, where('authId', '==', currentUser.uid));
      const userQuerySnapshot = await getDocs(userQuery);
      
      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].data();
        this.user = userData;
      } else {
        console.log('User document not found.');
        // Consider handling the case where user data is not found
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  } else {
    console.log('User not authenticated.');
    // Redirect to login or handle unauthenticated state
  }
},

      reauthenticateAndRetry(currentPassword, action) {
      const auth = getAuth();
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, currentPassword);

      reauthenticateWithCredential(user, credential).then(() => {
        // User re-authenticated. Retry the action
        if (action === 'changePassword') {
          this.changePassword();
        } else if (action === 'deleteAccount') {
          this.deleteAccount();
        }
      }).catch(error => {
        console.error('Error during re-authentication:', error);
        alert('Error during re-authentication: ' + error.message);
      });
    },
      changePassword() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user && this.newPassword === this.confirmPassword) {
        updatePassword(user, this.newPassword)
          .then(() => {
            alert('Password changed successfully');
            this.resetPasswordFields();
          })
          .catch(error => {
    if (error.code === "auth/requires-recent-login") {
      const currentPassword = prompt("Please enter your current password for verification:");
      this.reauthenticateAndRetry(currentPassword, 'changePassword');
    } else {
              console.error('Error changing password:', error);
              alert('Error changing password: ' + error.message);
            }
          });
      } else {
        alert('Passwords do not match or user is not logged in');
      }
    },

    handleRecentLoginError() {
      // Log the user out
      signOut(auth).then(() => {
        // Redirect to login page with a message or flag
        router.push({ name: 'UserLogin', query: { reason: 'reauth' } });
      }).catch(error => {
        console.error('Error logging out:', error);
        alert('Error logging out');
      });
    },

    resetPasswordFields() {
      this.showPasswordChangeFields = false;
      this.newPassword = '';
      this.confirmPassword = '';
    },
    confirmAndDeleteAccount() {
      const confirmed = confirm("Are you sure you want to delete your account? This action cannot be undone.");

      if (confirmed) {
        this.deleteAccount();
      }
    },

    deleteAccount() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    deleteUser(user).then(() => {
      alert('Account deleted successfully');
      router.push({ name: 'UserLogin' });
    }).catch(error => {
      if (error.code === "auth/requires-recent-login") {
        const currentPassword = prompt("Please enter your current password for verification:");
        this.reauthenticateAndRetry(currentPassword, 'deleteAccount');
      } else {
        console.error('Error deleting account:', error);
        alert('Error deleting account: ' + error.message);
      }
    });
  } else {
    alert('No user is logged in.');
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
  min-height: calc(100vh - 160px);
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

.password-field {
  position: relative;
  display: flex;
  align-items: center;
}

.password-field input {
  flex-grow: 1;
}

.password-field i {
  cursor: pointer;
  position: absolute;
  right: 10px; /* Adjust as needed */
}


/* Adding a little bit of responsiveness */
@media (max-width: 600px) {
    .setting-item button {
        width: 100%;
    }
}
</style>