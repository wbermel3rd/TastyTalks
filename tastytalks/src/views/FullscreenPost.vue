<template>
    <div class="full-post-view" v-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.instructions }}</p>
      <p>{{ post.date }}</p>
      <!-- Display other post details and comments -->
    </div>
    <div v-else>
      Loading post...
    </div>

    <div class="comments-container">
    <h2 class="comments-header">Comments:</h2>
    </div>
  </template>
  
  
  <script>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router'; // Import useRoute
  import { doc, getDoc } from 'firebase/firestore';
  import { db } from '../firebase';
  
  export default {
    setup() {
      const route = useRoute(); // Use the useRoute hook
      const postId = route.params.id; // Access the id parameter from the route
      const post = ref(null);
  
      const fetchPost = async () => {
        if (postId) {
          const postDoc = doc(db, 'recipes', postId);
          const docSnap = await getDoc(postDoc);
  
          if (docSnap.exists()) {
            post.value = { id: docSnap.id, ...docSnap.data() };
          } else {
            console.log("No such document!");
          }
        } else {
          console.error("Post ID is undefined");
        }
      };
  
      onMounted(fetchPost);
  
      return {
        post,
      };
    },
  };
  </script>
  
  
  <style scoped>
  .full-post-view {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
  }
  .comments-container{
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
  }

  </style>
  