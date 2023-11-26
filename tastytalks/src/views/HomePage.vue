<template>
    <main>
      <!-- <h1>Welcome to Taksty Talks</h1>

      <P>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos quia, laborum ut natus sequi unde reiciendis nostrum. Obcaecati reiciendis odit asperiores, voluptates accusamus quibusdam excepturi ipsam quidem quas ad debitis.</P>


      <div class="bigGreebBox">
        <div class="receipeRectangle">
          
        </div>

        <div class="questionsSquare">
          
        </div>

        <div class="AboutUsSquare">

        </div>
      </div> -->

      <div class="main-page">
    <!-- Ingredients of the Day Section -->
    <div class="section ingredients-section">
      <h2>Ingredients of the Day</h2>
      <ul>
        <li>Ingredient 1</li>
        <li>Ingredient 2</li>
        <li>Ingredient 3</li>
        <!-- Add more ingredients as needed -->
      </ul>
    </div>

    <!-- Recommended Recipe Section -->
    <div class="section recommended-recipe-section">
      <h2>Recommended Recipe</h2>
      <div class="recipe-card">
        <img src="recipe-image.jpg" alt="Recipe Image">
        <div class="recipe-info">
          <h3>Delicious Recipe Title</h3>
          <p>Description of the recommended recipe. Lorem ipsum dolor sit amet...</p>
          <a href="#" class="btn">View Recipe</a>
        </div>
      </div>
    </div>

    <!-- Creative Element Section -->
    <div class="section creative-element-section">
      <h2>Explore Something New</h2>
      <p>Discover unique cooking techniques, kitchen hacks, and more!</p>
      <!-- Your creative element goes here -->
    </div>
  </div>



    </main>
</template>
  
<script>
  export default {
    name: 'LoginWindow'
    
  }
</script>
  
<style scoped>

.main-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section {
  margin-bottom: 40px;
}

.ingredients-section ul {
  list-style-type: none;
  padding: 0;
}

.recipe-card {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.recipe-card img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.recipe-info {
  padding: 10px;
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

</style>