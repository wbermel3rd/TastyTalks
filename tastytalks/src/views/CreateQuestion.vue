<template>
    <main>
        <div>
            <div class="clickable-div" @click="goToCreateRecipe">
                <h2>Create Recipe</h2>
                <!-- You can add other content or styling for this div -->
            </div>
        
        </div>
    </main>
</template>
  
<script>
  export default {
    methods: {
      goToCreateRecipe() {
        // Navigate to the Create Recipe page
        // You can use Vue Router or any other navigation method here
        console.log("Navigating to Create Recipe");
        // For example, using Vue Router:
        // this.$router.push('/create-recipe');
      },
  
      goToCreateQuestion() {
        // Navigate to the Create Question page
        // You can use Vue Router or any other navigation method here
        console.log("Navigating to Create Question");
        // For example, using Vue Router:
        // this.$router.push('/create-question');
      },
    },
  };
</script>
  
  <style>
  /* Add your styling for clickable-div here */
  .clickable-div {
    cursor: pointer;
    border: 1px solid #ccc;
    padding: 20px;
    margin: 10px;
    text-align: center;
    transition: background-color 0.3s; /* Add a smooth transition effect */
  }

  .clickable-div:hover {
    background-color: #e0e0e0; /* Change the background color on hover */
  }
</style>