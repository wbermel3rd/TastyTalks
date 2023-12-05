<template>
  <main>
    <div class="profile-container">
      <div class="profile-card">
        <div class="profile-header">
          <h1>Your Profile</h1>
          <i @click="goToSettings" class="fa-solid fa-gear settings-icon"></i>
        </div>
        <div class="profile-body">
          <div class="profile-info"> <!-- user info display -->
            <p><strong>Name: </strong> {{ user?.username || 'Loading...' }}</p>
            <p><strong>Email: </strong> {{ user?.email || 'Loading...' }}</p>
            <p><strong>Region: </strong>{{ user?.region || 'Loading...' }}</p>
            <!-- Display more user information here -->
          </div>
          <div class="post-grid"> <!-- Recipes display // add styling and postion on left side of page only--> 
            <h2>Recipes</h2>
            <ul>
              <li v-for="recipe in recipes" :key="recipe.id">
                <strong>Title:</strong> {{ recipe.title || 'No Title' }} <br>
                <!-- Display more recipe information here -->
              </li>
            </ul>
          </div>
          <div class="post-grid"> <!-- Questions display // add styling and postion on right side of page only--> 
            <h2>Questions</h2>
            <ul>
              <li v-for="question in questions" :key="question.id">
                <strong>Title: </strong> {{ question.title }} <br>
                <!-- Display more question information here -->
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
  

<script>
// import { onMounted, ref } from 'vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
// import { useRouter } from 'vue-router';
import { auth } from '../firebase'

export default {

  data() {
    return {
      recipes: [],
      questions: [],
      user: null,
    };
  },
  mounted() {
    this.fetchUserData()
    this.fetchRecipes()
    this.fetchQuestions()
  },
  methods: {

    //fetch users
    async fetchUserData() {
      const currentUser = auth.currentUser;
      
        if (currentUser) {
          try{
            //fetches user data from the user document, based on the authId
            const userCollection = collection(db, 'users');   // Create a reference to the "users" collection
            const userQuery = query(userCollection, where('authId', '==', currentUser.uid));   // Create a query to find the user document by authId
            const userQuerySnapshot = await getDocs(userQuery);   // Fetch the user document based on the query
            
            if (!userQuerySnapshot.empty) { // Check if there are any matching documents
              const userData = userQuerySnapshot.docs[0].data();  // Assuming there is only one user document per authId
              this.user = userData;
              await this.fetchRecipes(); // start display of recipe section
            } else {
              console.log('User document not found.');
            }

            
          } catch (error) {
              console.error('Error fetching user data: ', error)
          }
        } else {
          console.log('User not authenticated.')
        } 
    },

    //fetch recipes
    async fetchRecipes() {

      const currentUser = auth.currentUser;

      if (currentUser) { //check user exists
        try {
          const authId = currentUser.uid;  // get the user's id (authId) 
          const recipesCollection = collection(db, 'recipes');  // reference to the recipes collection
          const recipesQuery = query(recipesCollection, where('user', '==', authId));  //create a query to filter by the user field
          const querySnapshot = await getDocs(recipesQuery)   //fetch the recipes based on the query
          console.log('Recipes:', querySnapshot.docs.map((doc) => doc.data()));
          this.recipes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        } catch (error) {
          console.log('Error fetching recipes: ', error)
        }
      } else {
        console.log('User not authenticated.')
      }
    },

    //fetch questions
    async fetchQuestions() {

      const currentUser = auth.currentUser;

      if (currentUser) { //check user exists
        try {
          const authId = currentUser.uid;  // get the user's id (authId) 
          const questionsCollection = collection(db, 'questions');  // reference to the recipes collection
          const questionsQuery = query(questionsCollection, where('user', '==', authId));  //create a query to filter by the user field
          const querySnapshot = await getDocs(questionsQuery)   //fetch the recipes based on the query
          console.log('Questions:', querySnapshot.docs.map((doc) => doc.data()));
          this.questions = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        } catch (error) {
          console.log('Error fetching questions: ', error)
        }
      } else {
        console.log('User not authenticated.')
      }
    },
    goToSettings() {
        this.$router.push('/settings');
    },
    // goToRecipe(recipeId){
    //     router.push({ name: 'Recipe', params: { id: recipeId } });
    // },
    // goToEditProfile(){
    //   //fill in
    // },
  }
}

// created() {
//   this.fetchUserData();
// },
</script>


<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 160px);
  /* Adjust based on your header and footer height */
  padding: 20px;
}

.profile-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  /* Increased width */
  min-height: 800px;
  margin: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* Stack children vertically */
}

.profile-header {
  background-color: #4c934c;
  /* Similar green from your image */
  color: #fff;
  padding: 20px;
  text-align: center;
  position: relative;
}

.settings-icon {
  position: absolute;
  top: 23px;
  /* Adjust as needed */
  right: 20px;
  /* Adjust as needed */
  font-size: 32px;
  /* Adjust as needed */
  color: #fff;
  /* Adjust as needed */
  cursor: pointer;
}

.profile-body {
  padding: 20px;
  flex-grow: 1;
  /* Makes the body take up all available space */
}

.profile-info p {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 30px;
  /* Spacing between paragraphs */
}

.profile-info strong {
  color: #4c934c;
  /* Similar green for emphasis */
}</style>