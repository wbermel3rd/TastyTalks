<template>
  <main>
    <div class="main-page">

      <!-- Recommended Recipe Section -->
      <div class="section recommended-recipe-section">
        <h2>Recommended Recipe</h2>
        <div class="recipe-card">
          <img :src="recommendedRecipe.image" alt="Recipe Image">
          <div class="recipe-info">
            <h3>{{ recommendedRecipe.title }}</h3>
            <p>{{ recommendedRecipe.instructions }}</p>
            <a :href="'/recipe/' + recommendedRecipe.id" class="btn">View Recipe</a>
          </div>
        </div>
      </div>

      <!-- Container for Ingredient of the Day and Discovery Section -->
      <div class="section-container">
        <!-- Ingredients of the Day Section -->
        <div class="section ingredients-section">
          <h2>Ingredient of the Day</h2>
          <div class="ingredient-card">
            <img :src="currentIngredient.image" alt="Ingredient Image">
            <p>{{ currentIngredient.name }}</p>
          </div>
        </div>

        <!-- Discovery Section -->
        <div class="section discovery-section">
          <h2>Explore Something New</h2>
          <p>Discover unique cooking techniques, kitchen hacks, and more!</p>
          <a href="/recipefeed" class="btn">Discover More</a>
        </div>
      </div>
    </div>

  </main>
</template>
<script>
import { ref, onMounted } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default {
  name: 'HomePage',
  setup() {
    const recommendedRecipe = ref({});
    const recommendedRecipeId = 'yq6W5tWHekzSMiyRrzFn';

    const currentIngredient = ref({});
    const ingredients = [
      { name: 'Avocado', image: require('@/assets/images/Ingredients/avocado.jpg') },
      { name: 'Quinoa', image: require('@/assets/images/Ingredients/quinoa.jpg') },
      { name: 'Tomatoes', image: require('@/assets/images/Ingredients/tomato.jpg') },
      { name: 'Salmon', image: require('@/assets/images/Ingredients/salmon.jpg') },
      { name: 'Shrimp', image:  require('@/assets/images/Ingredients/shrimp.jpg') },
    ];

    const fetchRecommendedRecipe = async () => {
      const recipeDoc = doc(db, 'recipes', recommendedRecipeId);
      const docSnapshot = await getDoc(recipeDoc);

      if (docSnapshot.exists()) {
        recommendedRecipe.value = {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        };
      } else {
        console.error('Recommended recipe not found');
      }
    };

    const calculateIngredientIndex = () => {
      const currentDate = new Date();
      const dayOfMonth = currentDate.getDate();
      return (dayOfMonth - 1) % ingredients.length; // Adjust to 0-based index
    };

    const updateCurrentIngredient = () => {
      const index = calculateIngredientIndex();
      currentIngredient.value = ingredients[index];
    };

    onMounted(() => {
      fetchRecommendedRecipe();
      updateCurrentIngredient();
    });

    return {
      recommendedRecipe,
      currentIngredient,
    };
  },
};
</script>



<style scoped>

h2{
  font-family: var(--littleTitleFont);
  color: var(--mainFontColor);
  padding: 20px;
}
.main-page {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section {
  margin-bottom: 40px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex-grow: 1; /* Make the sections take up an equal amount of space */
}

.section-container {
  display: flex;
  justify-content: space-between;
}

.ingredient-card {
  text-align: center;
}

.recipe-card {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  margin-bottom: 20px;
}

.recipe-card img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.recipe-info {
  padding: 10px;
  text-align: center;
  /* justify-content: center; */
  background-color: var(--PrimaryBackgroundColor);
  flex-grow: 1;
}

.btn {
  display: inline-block;
  padding: 8px 12px;
  background-color: #4caf50;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .section {
    width: 100%;
    background-color: lightgreen;
  }

  .section-container {
    flex-direction: column;
  }
}

.section{
  background-color: lightgreen;;
}

.recipe-card p{
  padding-bottom: 10px;
}
  

.ingredients-section{
  max-width: 60%;
}

.discovery-section p{
  padding-bottom: 10px;
}
.discovery-section {
  text-align: center;
}

img {
  max-width: 20%;
}

p{
  font-family: var(--littleTextFont);
}

/* Put recommended Recipe Title in the middle */

/* .recommended-recipe-section{
  text-align: center;
} */

.section-container{
  gap: 20px;
  text-align: center;
}
</style>