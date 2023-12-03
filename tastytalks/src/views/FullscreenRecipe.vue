<template>
    <main>

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
        <!-- Comments Section -->
        <div class="comments">
          <!-- Display comments here -->
          <div class="comment-card">
            <p class="comment-author">John Doe</p>
            <p class="comment-text">This is a sample comment to show how it will look on the page.</p>
            <p class="comment-date">2023-12-03</p>
          </div>
      </div>
        <!-- Add Comment Button -->
        <button @click="showCommentBox = !showCommentBox">Add Comment</button>

        <!-- Comment Box Section -->
        <div v-if="showCommentBox" class="comment-box">
          <textarea v-model="newComment" placeholder="Write your comment here..."></textarea>
          <button @click="submitComment">Submit</button>
        </div>
    </div>
    </main>
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
      const showCommentBox = ref(false); // For toggling the comment box
      const newComment = ref(''); // For storing new comment text

      const submitComment = () => {
        console.log('Comment submitted:', newComment.value);
        // Here, you can add logic to send the comment to your backend or Firebase
        newComment.value = ''; // Clear the comment box after submission
        showCommentBox.value = false; // Hide the comment box after submission
      };
  
      onMounted(fetchPost);
  
      return {
        post,
        showCommentBox,
        newComment,
        submitComment,
      };
    }
  };
  </script>
  
  
  <style scoped>

  h1{
    color: black;
  }
  h2{
    font-size: 25px;
  }
  .full-post-view {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
    min-height: 500px;
  }
  .comments-container{
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
  }
  .comment-box textarea {
    width: 100%; /* Full width of the container */
    max-width: 100%; /* Max width restricted to the container width */
    box-sizing: border-box; /* Include padding and border in the element's total width and height */
    overflow: auto; /* Add scrollbars if content overflows */
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .comments-container button {
    margin-top: 10px;
    padding: 6px 12px;
    background-color: rgb(104, 150, 56);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .comment-box button:hover {
    background-color: #0056b3;
  }
  /* Comment Card */
  .comment-card {
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    margin-top: 20px;
  }

  .comment-author {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .comment-text {
    margin-bottom: 10px;
  }

  .comment-date {
    font-size: 0.8em;
    color: #666;
  }

  </style>
  