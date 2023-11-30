<!-- RecipeFeed.vue -->
<template>
  <main>
    <div class="post-feed">
      <div class="centered-container">
          <h1 class="cylinder-heading">Recipe Feed</h1>
      </div>
      <p class="page-instructions">Filter recipes by region to find a dilicious recipe.  Once you find an intriguing dish, click to learn more and contribute to the community conversation.</p>
      <div class="post-grid">
        <div v-for="recipe in recipes" :key="recipe.id" class="post-item" @click="goToRecipe(recipe.id)">
          <h2>{{ recipe.title }}</h2>
          <p>{{ recipe.instructions }}</p>
          <p>{{ recipe.date }}</p>
          <!-- Add more details you want to display -->

          <!-- Example: Display tags -->
          <div class="tags">
            <span v-for="tag in recipe.tags" :key="tag.name" class="tag">{{ tag.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { onMounted, ref } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'vue-router'; // Import useRouter


export default {
  setup() {
    //Used for fullscreen view
    const router = useRouter();


    const recipes = ref([]);

    // Fetch posts from Firebase and update the component's data
    const fetchRecipes = async () => {
      const recipesCollection = collection(db, 'recipes');
      const querySnapshot = await getDocs(recipesCollection);

      querySnapshot.forEach((doc) => {
        recipes.value.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    };

    const goToRecipe = (recipeId) => {
    router.push({ name: 'Recipe', params: { id: recipeId } });
  };
    
    onMounted(() => {
      fetchRecipes();
    });

    return {
      recipes,
      goToRecipe,
    };
  },
};
</script>



<style scoped>
.post-feed {
max-width: 1200px;
margin: 0 auto;
}

.post-grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 20px;
}

.post-item {
border: 1px solid #ccc;
padding: 20px;
border-radius: 8px;
background-color: #fff;
transition: transform 0.3s ease-in-out;
}

.post-item:hover {
transform: scale(1.05);
}

.tags {
display: flex;
flex-wrap: wrap;
margin-top: 10px;

/* .tag {
  margin-right: 8px;
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
} */
}

/* Page's Heading Background */
.centered-container {
    text-align: center;
    padding-top: 30px;
    padding-bottom: 15px;
}

/* Page's Heading  */
.cylinder-heading {
    display: inline-block;
    padding: 10px;
    background: #373D20; 
    color: #fff; 
    border-radius: 20px; /* Border-radius to create a cylinder shape */
    width: 650px;
    font-family: 'Arturo', sans-serif; /* Set your font-family */
    font-size: 35px;
    margin: 0;
    line-height: normal;
}

/* Import title's font */
@font-face {
    font-family: 'Arturo';
    src: url('@/assets/fonts/Arturo-BoldItalic\ Trial.ttf') format('truetype');
  } 

.page-instructions {
  text-align: center;
  padding-bottom: 15px;
  font-size: 16px;
  font-family: 'Helvetica', sans-serif;
}
</style>