<template>
    <div class="Create-Container">
        <h1>Create New Post</h1>
        <form action="submit">
            <h2>Recipe Name</h2>
            <input type="text" name="recipeName" id="recipeName" placeholder="Recipe Name" required>
            <h2>Recipe Region of Origin</h2>
            <select name="countryOfOrigin" id="countrySelect" required>
                <option value="" disabled selected>Select Region</option>
                <option value="1">North America</option>
                <option value="2">South America</option>
                <option value="3">Europe</option>
                <option value="4">Asia</option>
                <option value="5">Africa</option>
                <option value="6">Australia</option>
                <option value="7">Middle East</option>
            </select>
            <h2>Recipe Description</h2>
            <input type="text" name="recipeDescription" id="recipeDescription" placeholder="Recipe Description">
            <h2>Recipe Instructions & Ingredients</h2>
            <input type="text" name="recipeIngredients" id="recipeIngredients" placeholder="Recipe Ingredients" required>

            <h2>Upload Image</h2>
            <input type="file" name="recipeImage" id="recipeImage" accept="image/*">

            <button>Submit Post</button>
        </form>
    </div>
</template>

<script>
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



</style>