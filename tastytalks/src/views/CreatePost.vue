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
                <div class="tag-dropdown">
                <button class="tag-dropdown-btn">Select Tags</button>
                <div class="tag-dropdown-content">
                    <a href="#" @click.prevent="addTag('Holiday')">Holiday</a>
                    <a href="#" @click.prevent="addTag('Christmas')">Christmas</a>
                    <a href="#" @click.prevent="addTag('Valentine\'s Day')">Valentine's Day</a>
                    <!-- Add more predefined tags here -->
                </div>
                </div>

                <!-- Selected Tags -->
                <label for="selectedTags">Selected Tags</label>
                <div class="tag-container">
                <div class="tag-list" id="tagList">
                    <!-- Tags will be dynamically added here -->
                </div>
                <div class="tag-input">
                    <input type="text" id="tagInput" placeholder="Add a tag" v-model="newTag">
                    <button type="button" @click.prevent="addTag(newTag)">Add Tag</button>
                </div>
                </div>


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
    };
  },
  methods: {
    addTag(tag) {
      const tagList = document.getElementById('tagList');

      if (tag.trim() !== '') {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag';
        tagElement.innerHTML = `${tag} <span class="tag-delete" @click="deleteTag(tag)">×</span>`;
        tagList.appendChild(tagElement);
        this.newTag = '';
      }
    },
    deleteTag(tag) {
      const tagList = document.getElementById('tagList');
      const tags = tagList.getElementsByClassName('tag');
      for (const tagElement of tags) {
        if (tagElement.innerText.startsWith(tag)) {
          tagList.removeChild(tagElement);
          break;
        }
      }
    },
  },
};


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


</style>