<template>
    <main>
      <div class="divForm">

        <!-- FORM CONTAINER -->
        <div class="form-newPost">
            <div class="title-CreateNewPost">
                <h1>Create new Recipe</h1>
            </div>

            <!-- FORM -->

            <!-- The form action goes to /posts because the page should be redirected to the post page with all the posts when the person click submit -->
            <form @submit="addPost" enctype= multipart/form-data method="POST" novalidate>

                <!-- Receipe Name  -->
                <label for="title">Recipe Name</label>
                <input type="text" name="recipeName" id="recipeName" placeholder="Recipe Name" v-model="recipe_form.title" required>

                <!-- Receipe Category -->
                <label for="category">Region</label>
                <select name="countryOfOrigin" id="countrySelect" v-model="recipe_form.region" required>
                    <option value="" selected disabled>Select Region</option>
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
                    <a href="#" @click.prevent="addTag('Starter')">Starter</a>
                    <a href="#" @click.prevent="addTag('Entrée')">Entrée</a>
                    <a href="#" @click.prevent="addTag('Dessert')">Dessert</a>
                  </div>
                </div>

                <div class="tag-dropdown">
                  <button class="tag-dropdown-btn" @click="toggleDropdown('region')">Season</button>
                  <div v-if="showDropdown.region" class="tag-dropdown-content">
                    <a href="#" @click.prevent="addTag('Spring')">Spring</a>
                    <a href="#" @click.prevent="addTag('Summer')">Summer</a>
                    <a href="#" @click.prevent="addTag('Fall')">Fall</a>
                    <a href="#" @click.prevent="addTag('Winter')">Winter</a>
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
                    <a href="#" @click.prevent="addTag('Easter')">Easter</a>
                    <a href="#" @click.prevent="addTag('Christmas')">Christmas</a>
                    <a href="#" @click.prevent="addTag('Valentine\'s Day')">Valentine's Day</a>
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


                <!-- Image upload -->
                <label for="image">Recipe Image</label>
                <input 
                type="file" 
                id="imageUpload"
                accept="image/*"
                required>

                <!-- <img :src="picture.value" alt="preview">      -->

                <!-- Submit recipe -->
                <input type="submit" @click="addPost" value="Submit" >
            </form>

        </div>
      
      
      </div>  
    </main>
</template>

<script>
import { addDoc, collection, updateDoc, doc, arrayUnion, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase'
import { ref } from 'vue'
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseRef, storage, auth} from '../firebase';


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

      const user = auth.currentUser

      if(user){

        const userId = auth.currentUser.uid

        try{
          //find the user's document with same authId
          const userQuery = query(collection(db, 'users'), where('authId', '==', auth.currentUser.uid));
          const userSnapshot = await getDocs(userQuery);
          const userDoc = userSnapshot.docs[0]
          const userDocId = userDoc.id

          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("userData:", userData);
            
            if(userData && userData.username && userData.region) {

              const username = userData.username
              const userRegion = userData.region

              console.log("username:", username);
              console.log("userRegion:", userRegion);

              const imageInput = document.getElementById("imageUpload");
              const file = imageInput.files[0];
              let imageUrl = '';

              if (file) {
                try {
                  // Perform the upload
                  const fileRef = firebaseRef(storage, `images/recipePics/${file.name}`);

                  // Now upload the file
                  const uploadTaskSnapshot = await uploadBytes(fileRef, file);
                  imageUrl = await getDownloadURL(uploadTaskSnapshot.ref);
                } 
                
                catch (error) {
                  console.error("Error uploading file: ", error);
                  // Handle the error (e.g., display an error message)
                  return;
                }
              }

              try {

                //Format the date to "month/day/year"
                const formattedDate = new Date().toLocaleDateString('en-US');

                const recipeRef = await addDoc(collection(db, 'recipes'), {
                  date: formattedDate,
                  ingredients: recipe_form.value.ingredients,
                  instructions: recipe_form.value.instructions,
                  tags: tags.value,
                  title: recipe_form.value.title,
                  regionID: recipe_form.value.region,
                  summary: '',
                  image: imageUrl,
                  user: userId,
                  username: username,
                  userRegion: userRegion,
                  // MISSING SUMMARY DECLARATION: NO INPUT FIELD IN FORM
                  // SEPARATE INSTRUCTIONS AND SUMMARY
                  
                });
                //add the recipeId to the user's created recipes
                await updateDoc(doc(db, 'users', userDocId), {
                  recipes: arrayUnion(recipeRef.id),
                });

                //redirect
                window.location.href = '/recipefeed';

              } catch (error) {
                console.error("Error adding document: ", error);
                // Handle the error (e.g., display an error message)
              }
            } else{
              console.error("Error fetching user data, username, or regionID is undefined")
            }
          } else {
            console.error("User document does not exist")
          }
        } catch (error) {
          console.error("Error fetching user document", error)
        }
      } else {
      console.log("User not authenticated")
      }
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
    methods:{
    }
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
    color: #4c934c;
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