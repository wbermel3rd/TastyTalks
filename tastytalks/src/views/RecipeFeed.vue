<!-- RecipeFeed.vue -->
<template>
  <main>

    <div class="post-feed">
      
      <div class="centered-container">
        <h1 class="cylinder-heading">Recipes</h1>
      </div>

      <p class="page-instructions">Filter recipes by region, course, season, holiday, or dietary restrictions to find a dilicious recipe. <br>Once you find an intriguing dish, click to learn more and contribute to the community conversation.</p>
      




      <!-- Filter Section -->
      <div class="filter-container">
        <!-- Region Filter -->
        <label for="region" class= "filter-label">Region</label>
        <select v-model="selectedRegion" @change="fetchRecipes">
          <option value="">Select Region</option>
          <option value="1">Asia-Pacific</option>
            <option value="2">Caribbean</option>
            <option value="3">Central America</option>
            <option value="4">Central Asia</option>
            <option value="5">Eastern Europe</option>
            <option value="6">Middle East</option>
            <option value="7">Nordic Countries</option>
            <option value="8">North America</option>
            <option value="9">Northern Africa</option>
            <option value="10">Oceania</option>
            <option value="11">Southern Africa</option>
            <option value="12">South America</option>
            <option value="13">Southeast Asia</option>
            <option value="14">Western Europe</option>
            <!-- Add more options for other regions -->
        </select>

        <!-- Course Filter -->
        <label for="course" class= "filter-label">Course</label>
        <select v-model="selectedCourse" @change="fetchRecipes">
          <option value="">Select Course</option>
          <option value="Starter">Starter</option>
          <option value="Entrée">Entrée</option>
          <option value="Dessert">Dessert</option>
          <!-- Add more options for other holidays -->
        </select>

        <!-- Season Filter -->
        <label for="specialDiet" class= "filter-label">Season</label>
        <select v-model="selectedSpecialDiet" @change="fetchRecipes">
          <option value="">Select Special Diet</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
          <!-- Add more options for other special diets -->
        </select>

        <!-- Holiday Filter -->
        <label for="holiday" class= "filter-label">Holiday</label>
        <select v-model="selectedHoliday" @change="fetchRecipes">
          <option value="">Select Holiday</option>
          <option value="Christmas">Christmas</option>
          <option value="Easter">Easter</option>
          <option value="Halloween">Halloween</option>
          <option value="Independence Day">Independence Day</option>
          <option value="Thanksgiving">Thanksgiving</option>
          <option value="Valentine's Day">Valentine's Day</option>
          <!-- Add more options for other holidays -->
        </select>

        <!-- Special Diets Filter -->
        <label for="specialDiet" class= "filter-label">Dietary Restrictions</label>
        <select v-model="selectedSpecialDiet" @change="fetchRecipes">
          <option value="">Select Dietary Restrictions</option>
          <option value="Gluten-Free">Gluten-Free</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <!-- Add more options for other special diets -->
        </select>

      </div>





      <div class="post-grid">
        <div v-for="recipe in recipes" :key="recipe.id" class="post-item" @click="goToRecipe(recipe.id)"> <!--  -->
          <div class="post-content">
            <h2 class="recipe-title">{{ recipe.title }}</h2>
            <div class="image-container">
              <img :src="recipe.image" alt="Recipe Image" style="max-height:120px; max-width:100%;">
            </div>
            <!-- Following Line adds instructions, but it'll go out of the box -->
           <!--  <p>{{ recipe.instructions }}</p> -->
            
          
          </div>



          <!-- Display tags -->
          <div class="tags">
            <strong>Tags:</strong>
            <span v-for="tag in recipe.tags" :key="tag.name" class="tag">{{ tag.name }}</span>
          </div>


          <!-- Display regions -->
          <div class="tags">
            <strong>Region: </strong>
            <span :key="recipe.tags[0].name" class="region">{{ getRegionName(recipe.regionID) }}</span>
          </div>
    
        </div>
      </div>
      <br>

    </div>

  </main>
</template>

<script>
import { onMounted, ref } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const recipes = ref([]);
    const selectedRegion = ref('');
    const selectedCourse = ref('');
    const selectedSeason = ref('');
    const selectedSpecialDiet = ref('');
    const selectedHoliday = ref('');

    // Define a map to store region names based on IDs
    const regionMap = {
      1: 'Asia-Pacific',
      2: 'Caribbean',
      3: 'Central America',
      4: 'Central Asia',
      5: 'Eastern Europe',
      6: 'Middle East',
      7: 'Nordic Countries',
      8: 'North America',
      9: 'Northern Africa',
      10: 'Oceania',
      11: 'Southern Africa',
      12: 'South America',
      13: 'Southeast Asia',
      14: 'Western Europe',
      // Add more entries for other regions
    };

    const getRegionName = (regionID) => {
      return regionMap[regionID] || 'Unknown Region';
    };

    const fetchRecipes = async () => {
      const recipesCollection = collection(db, 'recipes');
      const querySnapshot = await getDocs(recipesCollection);

      const filteredRecipes = [];

      querySnapshot.forEach((doc) => {
        const recipeData = doc.data();

        // Check if the recipe matches all selected filters
        const matchesFilters =
          (selectedRegion.value === '' || recipeData.regionID === selectedRegion.value) &&
          (selectedCourse.value === '' || recipeData.tags.some((tag) => tag.name === selectedCourse.value)) &&
          (selectedSeason.value === '' || recipeData.tags.some((tag) => tag.name === selectedSeason.value)) &&
          (selectedSpecialDiet.value === '' || recipeData.tags.some((tag) => tag.name === selectedSpecialDiet.value)) &&
          (selectedHoliday.value === '' || recipeData.tags.some((tag) => tag.name === selectedHoliday.value));

        if (matchesFilters) {
          filteredRecipes.push({
            id: doc.id,
            ...recipeData,
          });
        }
      });

      // Sort recipes by date in descending order
      filteredRecipes.sort((a, b) => new Date(b.date) - new Date(a.date));

      recipes.value = filteredRecipes;
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
      selectedCourse,
      selectedSeason,
      selectedSpecialDiet,
      selectedHoliday,
      fetchRecipes,
      getRegionName,
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
background-color: #4c934c;
transition: transform 0.3s ease-in-out;
/* The following lines will set the size of each recipe box to a predetermined size.
  presetting the size allows content to extend beyond box in some circumstances.
height: 275px;
width: 375px; */
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
  font-family: 'Georgia', serif;
  color:black
}

/* Format for tag lists in recipe boxes*/
.tags .tag { 
  display: inline-block;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-right: 8px; 
  padding: 3px;
  background-color: #0B6E4F;
  font-weight: bold;
  font-size: 16px;
  color: white;
  border-radius: 4px;
}

/* Format for Regions in recipe boxes*/
.tags .region { 
  display: inline-block;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-right: 8px; 
  padding: 3px;
  background-color: white;
  font-weight: bold;
  font-size: 16px;
  color: #0B6E4F;
  border-radius: 4px;
}


/* Import title's font */
@font-face {
    font-family: 'Arturo';
    src: url('@/assets/fonts/Arturo-BoldItalic\ Trial.ttf') format('truetype');
  } 

  /* Font and format for text under page title*/
.page-instructions {
  text-align: center;
  padding: 22px;
  font-size: 16px;
  font-family: 'Times New Roman', serif;
}

/* For recipe title in recipe feed boxes*/
.recipe-title {
  margin-bottom: 10px;
  font-size: 26px;
  font-weight: bold;

  /* Find a titleFont for the recipes titles in the recepe feed */
  /* font-family: var(--titleFont); */
  color: #FADF54;
}

/* for centering the image in the box */
.image-container {
  display: flex;
  justify-content: center; /* Center the img horizontally */
  align-items: center; /* Center the img vertically */
  margin-bottom: 2px; 
}

img{
  border-radius: 2%;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  text-align: center;
  background-color: #4c934c; /* Match the background color of the recipe boxes */
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.filter-label {
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-right: 10px;
}

.filter-select {
  width: 200px;
  padding: 8px;
  border: 1px solid #0B6E4F;
  border-radius: 4px;
  background-color: white;
  color: #0B6E4F;
  appearance: none; /* Remove default arrow */
  background-repeat: no-repeat;
  background-position: right 10px center; /* Adjust the position of the arrow */
  cursor: pointer; /* Add pointer cursor on hover */
}

/* Style select dropdown options */
.filter-select option {
  background-color: white;
  color: #0B6E4F;
}

/* Hover effect for select dropdown options */
.filter-select option:hover {
  background-color: #0B6E4F;
  color: white;
}

/* //////////////////// */

.filter-select {
  width: 200px;
  padding: 8px;
  border: 1px solid #0B6E4F;
  border-radius: 4px;
  background-color: white;
  color: #0B6E4F;
  appearance: none; /* Remove default arrow */
  background-repeat: no-repeat;
  background-position: right 10px center; /* Adjust the position of the arrow */
  cursor: pointer; /* Add pointer cursor on hover */
}

/* Style select dropdown options */
.filter-select option {
  background-color: white;
  color: #0B6E4F;
}

/* Hover effect for select dropdown options */
.filter-select option:hover {
  background-color: #0B6E4F;
  color: white;
}

/* Add the same background color and box shadow as the recipe boxes */
.filter-container select {
  background-color: #FADF54;
  font-family: 'Lucida Sans';
  color: #0B6E4F;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #0B6E4F;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}



</style>