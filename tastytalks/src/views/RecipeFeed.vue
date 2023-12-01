<!-- RecipeFeed.vue -->
<template>
  <main>

    <div class="post-feed">
      
      <div class="centered-container">
          <h1 class="cylinder-heading">Recipe Feed</h1>
      </div>

      <p class="page-instructions">Filter recipes by region to find a dilicious recipe.  Once you find an intriguing dish, click to learn more and contribute to the community conversation.</p>
      
      



      <!-- Filter Section -->
      <div class="filter-container">
        <!-- Region Filter -->
        <label for="region" class= "filter-label">Region</label>
        <select v-model="selectedRegion" @change="fetchRecipes">
          <option value="" disabled>Select Region</option>
          <option value="1">Asia-Pacific</option>
          <!-- Add more options for other regions -->
        </select>

        <!-- Holiday Filter -->
        <label for="holiday" class= "filter-label">Holiday</label>
        <select v-model="selectedHoliday" @change="fetchRecipes">
          <option value="" disabled>Select Holiday</option>
          <option value="Christmas">Christmas</option>
          <!-- Add more options for other holidays -->
        </select>

        <!-- Special Diet Filter -->
        <label for="specialDiet" class= "filter-label">Special Diet</label>
        <select v-model="selectedSpecialDiet" @change="fetchRecipes">
          <option value="" disabled>Select Special Diet</option>
          <option value="Vegan">Vegan</option>
          <!-- Add more options for other special diets -->
        </select>
      </div>



      <div class="post-grid">
        <div v-for="recipe in recipes" :key="recipe.id" class="post-item" @click="goToRecipe(recipe.id)">
          <div class="post-content">
            <h2 class="recipe-title">{{ recipe.title }}</h2>
            <p>{{ recipe.instructions }}</p>
            <!-- Add more details you want to display -->
          
          </div>
          <!-- Display tags -->
          <div class="tags">
            <strong>Tags:</strong>
            <span v-for="tag in recipe.tags" :key="tag.name" class="tag">{{ tag.name }}</span>
          </div>
        </div>
      </div>
      <br>

    </div>

  </main>
</template>

<script>
import { onMounted, ref } from 'vue';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const recipes = ref([]);
    const selectedRegion = ref('');
    const selectedHoliday = ref('');
    const selectedSpecialDiet = ref('');

    const fetchRecipes = async () => {
      const recipesCollection = collection(db, 'recipes');

      // Prepare filters based on selected values
      const filters = [];
      if (selectedRegion.value !== '') {
        filters.push(where('regionID', '==', selectedRegion.value));
      }
      if (selectedHoliday.value !== '') {
        filters.push(where('tags', 'array-contains', { name: selectedHoliday.value }));
      }
      if (selectedSpecialDiet.value !== '') {
        filters.push(where('tags', 'array-contains', { name: selectedSpecialDiet.value }));
      }

      // Create a query with filters
      const q = query(recipesCollection, ...filters);

      const querySnapshot = await getDocs(q);

      recipes.value = [];

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
      selectedRegion,
      selectedHoliday,
      selectedSpecialDiet,
      fetchRecipes,
    };
  },
};
</script>


<style scoped>

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  text-align: center;
}

/* Spacing Filter Title */
.filter-label {
  margin: 12px; 
  
}


.filter-select {
  margin-right: 10px;
}

.tag-dropdown {
  position: relative;
  margin-right: 10px;
}

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
display: flex;
flex-direction: column;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
padding: 20px;
border-radius: 8px;
height: 275px;
width: 375px;
background-color: #bbc9f1;
transition: transform 0.3s ease-in-out;
}

.post-content {
  flex: 1; /* Allow the content to grow and take the available space */
}

.post-item:hover {
transform: scale(1.05);
}

/* Used for "Tags:" label before tags*/
.tags strong {
  margin-right: 8px; 
  margin-top: auto;
  font-size: 16px;
}

/* Format for tag lists in recipe boxes*/
.tags .tag { 
  display: inline-block;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-right: 8px; 
  padding: 3px;
  background-color: rgb(104, 150, 56);
  font-weight: bold;
  font-size: 16px;
  color: #fff4ba;
  border-radius: 2px;
}

/* background-color: rgb(104, 150, 56);
  border-radius: 10px;
  color: #FADF54; */

/* Page's Heading Background */
.centered-container {
    text-align: center;
    padding-top: 30px;
    padding-bottom: 25px;
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

  /* Font and format for text under title*/
.page-instructions {
  text-align: center;
  padding: 22px;
  font-size: 16px;
  font-family: 'Helvetica', sans-serif;
}

.recipe-title {
  margin-bottom: 10px;
  font-size: 26px;
  font-weight: bold;
  font-family: 'Helvetica', sans-serif;
}

</style>