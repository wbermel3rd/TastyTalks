<template>
    <main>
      <div class="divForm">

      
        <!-- FORM CONTAINER -->
        <div class="form-newPost">
            <div class="title-CreateNewPost">
                <h1>Create new question</h1>
            </div>

            <!-- FORM -->

            <!-- The form action goes to /posts because the page should be redirected to the post page with all the posts when the person click submit -->
            <form action="/post" enctype= multipart/form-data method="POST">

                <!-- Receipe Name  -->
                <label for="title">question Name</label>
                <input type="text" name="questionName" id="questionName" placeholder="question Name" v-model="question_form.title" required>

                
                <!-- Instructions, description and details -->
                <label for="details">question Instructions and Description</label>
                <textarea id="text" name="questionDescription" type="text" minlength="10" placeholder="question Details..." v-model="question_form.instructions" required></textarea>



                <input type="submit" @click="addPost" value="Submit" >
            </form>

        </div>

      </div>
    </main>
</template>
  
<script>

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase'
import { ref } from 'vue'

export default {
  setup() {

    const question_form = ref({
      title: '',
    });



    // Create a question post in the database
    const addPost = async (event) => {
      event.preventDefault();

      await addDoc(collection(db, 'questions'), {
        date: Date.now(),
        title: question_form.value.title,
        description: question_form.value.description,
      });
      window.location.href = '/questionfeed';
    };

    return {
      question_form,
      addPost,
    };
  },
}



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