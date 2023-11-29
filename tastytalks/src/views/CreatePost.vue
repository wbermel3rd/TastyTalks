<template>
    <main>

        <!-- FORM CONTAINER -->
        <div class="form-newPost">
            <div class="title-CreateNewPost">
                <h1>Create new Recipe</h1>
            </div>

            <!-- FORM -->

            <!-- The form action goes to /posts because the page should be redirected to the post page with all the posts when the person click submit -->
            <form @submit="addPost" enctype= multipart/form-data method="POST">

                <!-- Receipe Name  -->
                <label for="title">Recipe Name</label>
                <input type="text" name="recipeName" id="recipeName" placeholder="Recipe Name" v-model="recipe_form.title" required>

                <!-- Receipe Category -->
                <label for="category">Post Category</label>
                <select name="countryOfOrigin" id="countrySelect" v-model="recipe_form.region" required>
                    <option value="" disabled selected>Select Region</option>
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
                </select>

                <!-- Tags Dropdown -->
                <label for="tags">Tags</label>
                <br>
                <br>

                <div class="tag-dropdown">
                  <button class="tag-dropdown-btn" @click="toggleDropdown('course')">Course</button>
                  <div v-if="showDropdown.course" class="tag-dropdown-content">
                    <a href="#" @click.prevent="addTag('Easter')">Easter</a>
                    <a href="#" @click.prevent="addTag('Christmas')">Christmas</a>
                    <a href="#" @click.prevent="addTag('Valentine\'s Day')">Valentine's Day</a>
                  </div>
                </div>

                <div class="tag-dropdown">
                  <button class="tag-dropdown-btn" @click="toggleDropdown('region')">Region</button>
                  <div v-if="showDropdown.region" class="tag-dropdown-content">
                    <a href="#" @click.prevent="addTag('North')">North</a>
                    <a href="#" @click.prevent="addTag('South')">South</a>
                    <!-- Add more predefined tags for region dropdown -->
                  </div>
                </div>

                <div class="tag-dropdown">
                  <button class="tag-dropdown-btn" @click="toggleDropdown('specialDiets')">Special Diets</button>
                  <div v-if="showDropdown.specialDiets" class="tag-dropdown-content">
                    <a href="#" @click.prevent="addTag('Vegetarian')">Vegetarian</a>
                    <a href="#" @click.prevent="addTag('Vegan')">Vegan</a>
                    <a href="#" @click.prevent="addTag('Gluten-Free')">Gluten-Free</a>
                    <!-- Add more predefined tags for special diets dropdown -->
                  </div>
                </div>

                <div class="tag-dropdown">
                  <button class="tag-dropdown-btn" @click="toggleDropdown('holiday')">Holiday</button>
                  <div v-if="showDropdown.holiday" class="tag-dropdown-content">
                    <a href="#" @click.prevent="addTag('Thanksgiving')">Thanksgiving</a>
                    <a href="#" @click.prevent="addTag('Halloween')">Halloween</a>
                    <a href="#" @click.prevent="addTag('Independence Day')">Independence Day</a>
                    <!-- Add more predefined tags for holiday dropdown -->
                  </div>
                </div>


                <!-- Selected Tags -->
                <div class="tag-container">
                  <div class="tag-list" id="tagList">
                    <div v-for="(tag, index) in tags" :key="index" class="tag" :style="{ backgroundColor: tag.color }">
                      <div class="tag-item">
                        {{ tag.name }}
                        <span class="tag-delete" @click="deleteTag(index)">×</span>
                      </div>
                    </div>
                  </div>
                </div>










                <!-- This is for inputing tag with a input bar (Could be usefull in the future) -->
                <!-- <div class="tag-input">
                    <input type="text" id="tagInput" placeholder="Add a tag" v-model="newTag">
                    <button type="button" @click.prevent="addTag(newTag)">Add Tag</button>
                </div> -->


                <br>

                <!-- Ingredients -->
                <label for="ingredients">Recipe Ingredients</label>
                <input type="text" name="recipeIngredients" id="recipeIngredients" placeholder="Recipe Ingredients" v-model="recipe_form.ingredients" required>
                
                <!-- Instructions, description and details -->
                <label for="details">Recipe Instructions and Description</label>
                <textarea id="text" name="recipeDescription" type="text" minlength="10" placeholder="Recipe Details..." v-model="recipe_form.instructions" required></textarea>


                <!-- Image of recipe -->
                <label for="image">Image of Recipe</label>
                <input id="recipeImage" type="file" name="receipeImage" accept="image/*" required>

                <input type="submit" @click="addPost" value="Submit" >
            </form>

        </div>
    </main>

    
</template>

<script>
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase'
import { ref } from 'vue'

export default {
  setup() {

    const recipe_form = ref({
      title: '',
    });
    const newTag = ref('');
    const showDropdown = ref({
      course: false,
      region: false,
      specialDiets: false,
      holiday: false,
    });
    const tags = ref([]);

    const addTag = (tag) => {
      if (tag.trim() !== '') {
        tags.value.push({ name: tag });
        newTag.value = '';
      }
    };

    const deleteTag = (index) => {
      tags.value.splice(index, 1);
    };

    const toggleDropdown = (category) => {
      // Close all dropdowns
      for (const key in showDropdown.value) {
        showDropdown.value[key] = false;
      }
      // Open the clicked dropdown
      showDropdown.value[category] = true;
    };

    // Create a recipe post in the database
    const addPost = async (event) => {
      event.preventDefault();

      await addDoc(collection(db, 'recipes'), {
        date: Date.now(),
        ingredients: recipe_form.value.ingredients,
        instructions: recipe_form.value.instructions,
        tags: tags.value,
        title: recipe_form.value.title,
        regionID: recipe_form.value.region,
        summary:'',
        // MISSING SUMMARY DECLARATION: NO INPUT FIELD IN FORM
        // SEPARATE INSTRUCTIONS AND SUMMARY

        
      });
      window.location.href = '/postfeed';
    };

    return {
      recipe_form,
      newTag,
      showDropdown,
      tags,
      addTag,
      deleteTag,
      toggleDropdown,
      addPost,
    };
  },
}



</script>

<style scoped>
.Create-Container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 300px;
    padding-bottom: 850px;
    height: 100vh;
}
h1{
    color: white;
    padding-bottom: 10px;
}

h2{
    color: white;
}


/* ///////new Posts Main Section//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

main {
    padding: 20px 100px 100px 100px;
}



/* /////// Form ///////////////////// */

.form-newPost {
    border-radius: 5px;
    padding: 20px;
    background-color: var(--Trying);
    font-family: var(--primaryFont);
    /* Control the width of the Receipe Form container */
    /* max-width: 800px; */
  }


.title-CreateNewPost h1{
    text-align: center;
    /* justify-content: center; */

}

label{
    font-family: var(--primaryFont);
    color: white;
    font-size: 20px;
    font-weight: bold;
}

input[type=text], select, textarea[type=text], input[type=file], input[type=date], input[type=datetime], input[type=datetime-local] {
    width: 100%;
    padding: 12px 20px;
    margin: 15px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }


input[type=submit] {
    width: 100%;
    background-color: var(--fourthColor);
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

input[type=submit]:hover {
    background-color: var(--lightFourthColor)
  }



/* Tags Dropdown styles */
.tag-dropdown {
  display: inline-block;
  position: relative;
  padding-right: 10px;
}

.tag-dropdown-btn {
  background-color: var(--fourthColor);
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.tag-dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.tag-dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}


.tag-dropdown:hover .tag-dropdown-content {
  display: block;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  margin: 4px;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  align-items: center;
}

.tag-item {
  margin-right: 8px;
}

.tag-delete {
  cursor: pointer;
  font-weight: bold;
  color: white;
  background-color: #ff4d4d;
  padding: 4px;
  border-radius: 50%;
}

</style>