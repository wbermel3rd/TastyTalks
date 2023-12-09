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
        <form action="/post" enctype="multipart/form-data" method="POST">
          <!-- Question Name  -->
          <label for="title">Question Name</label>
          <input type="text" name="questionName" id="questionName" placeholder="Question Name" v-model="question_form.title" required>

          <!-- Question Category -->
          <label for="category">Region</label>
          <select name="countryOfOrigin" id="countrySelect" v-model="question_form.region" required>
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

          <!-- Instructions, description, and details -->
          <label for="details">Question Instructions and Description</label>
          <textarea id="text" name="questionDescription" minlength="10" placeholder="Question Details..." v-model="question_form.description" required></textarea>

          <input type="submit" @click="addPost" value="Submit">
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { addDoc, collection, updateDoc, doc, arrayUnion, getDocs, query, where } from 'firebase/firestore';
import { auth } from '../firebase';
import { db } from '../firebase';
import { ref } from 'vue';

export default {
  setup() {
    const question_form = ref({
      title: '',
      region: '',
      description: '', // Add description to the form data
    });

    // Create a question post in the database
    const addPost = async (event) => {

      event.preventDefault();

      const user = auth.currentUser

      if(user){

        const userId = auth.currentUser.uid

        try{
          
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
              const formattedDate = new Date().toLocaleDateString('en-US');

              console.log("username:", username);
              console.log("userRegion:", userRegion);

              const questionRef = await addDoc(collection(db, 'questions'), {
                date: formattedDate,
                title: question_form.value.title,
                regionID: question_form.value.region,
                description: question_form.value.description,
                user: userId,
                username: username,
                userRegion: userRegion,
              });

              //add the questionId to the user's created questions
              await updateDoc(doc(db, 'users', userDocId), {
                  questions: arrayUnion(questionRef.id),
              });

              //redirect 
              window.location.href = '/questionfeed';
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
      question_form,
      addPost,
    };
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


/* /////// Form ///////////////////// */

.form-newPost {
    border-radius: 5px;
    padding: 20px;
    background-color: var(--Trying);
    font-family: var(--primaryFont);
    /* Control the width of the Question Form container */
    /* max-width: 800px; */
  }


.title-CreateNewPost h1{
    text-align: center;
    color: #4c934c;
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
    background-color: var(--secondaryBackgroundColor);
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

input[type=submit]:hover {
    background-color: var(--secondaryBackgroundColorHover)
  }

  textarea {
    width: 100%;
    padding: 12px 20px;
    margin: 15px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

</style>