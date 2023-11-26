<template>
    <main>

        <!-- FORM CONTAINER -->
        <div class="form-newPost">
            <div class="title-CreateNewPost">
                <h1>Create new Receipe</h1>
            </div>

            <!-- FORM -->

            <!-- The form action goes to /posts because the page should be redirected to the post page with all the posts when the person click submit -->
            <form action="/posts" enctype= multipart/form-data method="POST">

                <!-- Receipe Name  -->
                <label for="title">Receipe Name</label>
                <input type="text" name="recipeName" id="recipeName" placeholder="Recipe Name" required>

                <!-- Receipe Category -->
                <label for="category">Post Category</label>
                <select name="countryOfOrigin" id="countrySelect" required>
                    <option value="" disabled selected>Select Region</option>
                    <option value="1">North America</option>
                    <option value="2">South America</option>
                    <option value="3">Europe</option>
                    <option value="4">Asia</option>
                    <option value="5">Africa</option>
                    <option value="6">Pacific</option>
                    <option value="7">Middle East</option>
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
                <input type="text" name="recipeIngredients" id="recipeIngredients" placeholder="Recipe Ingredients" required>
                
                <!-- Instructions, description and details -->
                <label for="details">Receipe Instructions and Description</label>
                <textarea id="text" name="recipeDescription" type="text" minlength="10" placeholder="Recipe Details..." required></textarea>



                <!-- Image of receipe -->
                <label for="image">Image of Receipe</label>
                <input id="recipeImage" type="file" name="receipeImage" accept="image/*" required>

                <input type="submit" value="Submit">
            </form>

        </div>
    </main>

    
</template>

<script>

export default {
  data() {
    return {
      newTag: '',
      showDropdown: {
        course: false,
        region: false,
        specialDiets: false,
        holiday: false,
      },
      tags: [],
    };
  },
  methods: {
    addTag(tag) {

      if (tag.trim() !== "") {
        this.tags.push({ name: tag});
        this.newTag = "";

      // const tagList = document.getElementById('tagList');

      // if (tag.trim() !== '') {
      //   const tagElement = document.createElement('div');
      //   tagElement.className = 'tag';
      //   tagElement.innerHTML = `${tag} <span class="tag-delete" @click="deleteTag(tag)">×</span>`;
      //   tagList.appendChild(tagElement);
      //   this.newTag = '';
      }
    },
    deleteTag(index) {
      // const tagList = document.getElementById('tagList');
      // const tags = tagList.getElementsByClassName('tag');
      // for (const tagElement of tags) {
      //   if (tagElement.innerText.startsWith(tag)) {
      //     tagList.removeChild(tagElement);
      //     break;
      //   }
      // }
      this.tags.splice(index, 1);
    },
    toggleDropdown(category) {
      // Close all dropdowns
      for (const key in this.showDropdown) {
        this.showDropdown[key] = false;
      }
      // Open the clicked dropdown
      this.showDropdown[category] = true;
    },
    //Add what it needs to
    submitForm() {
    },
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
  background-color: red;
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