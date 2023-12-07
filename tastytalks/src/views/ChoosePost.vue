<template>
    <main>
        <div>
            <div class="clickable-div" @click="goToCreateRecipe">
                <h2>Create Recipe</h2>
                <!-- You can add other content or styling for this div -->
            </div>
        
            <div class="clickable-div" @click="goToCreateQuestion">
                <h2>Create Question</h2>
                <!-- You can add other content or styling for this div -->
            </div>
        </div>
    </main>
</template>
  
<script>
  export default {
    methods: {
      goToCreateRecipe() {
        this.$router.push('/createrecipe');
      },
  
      goToCreateQuestion() {
        console.log("Navigating to Create Question");
        this.$router.push('/createquestion');
      },
    },
  };
</script>
  
<style>
  /* Add your styling for clickable-div here */
  .clickable-div {
    cursor: pointer;
    border: 2px solid #0B6E4F; /* Change border color */
    border-radius: 8px; /* Add border-radius for rounded corners */
    padding: 15px 20px; /* Adjust padding for top/bottom and left/right */
    margin: 10px;
    text-align: center;
    transition: background-color 0.3s, color 0.3s; /* Add smooth transition for background color and text color */
    background-color: #4c934c; /* Set default background color */
    font-family:'Times New Roman';
    color: #FADF54; /* Set default text color */
  }

  .clickable-div:hover {
    background-color: #4c934c; /* Change background color on hover */
    font-family:'Times New Roman';
    color: #FADF54; /* Change text color on hover */
  }
</style>