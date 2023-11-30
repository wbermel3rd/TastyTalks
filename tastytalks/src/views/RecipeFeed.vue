<template>
  <main>
    <div class="post-feed">
      <h1>Recipe Feed</h1>
      
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
    <br>
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



</style>