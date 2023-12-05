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
        <div class="comments" v-for="comment in comments" :key="comment.id">
          <!-- Display comments here -->
          <div class="comment-card">
            <p class="comment-author">{{ comment.username }}</p>
            <p class="comment-text">{{ comment.text }}</p>
            <p class="comment-date">{{ comment.date }}</p>
            <!-- <p class="comment-region">{{ comment.region }}</p>  NEEDS STYLING  -->  
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
  import { ref, reactive } from 'vue';
  import { useRoute } from 'vue-router'; // Import useRoute
  import { addDoc, doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
  import { db, auth } from '../firebase';
  
  export default {
    data(){
      const route = useRoute(); // Use the useRoute hook
      const post = ref(null);
      const showCommentBox = ref(false); // For toggling the comment box
      const newComment = ref(''); // For storing new comment text
      const user = auth.currentUser;

      return{
        route,
        post,
        showCommentBox,
        newComment,
        comments: reactive([]),
        user
      };
    },
    mounted(){
      this.fetchPost()
    },
    methods: {
      //fetch recipe
      async fetchPost() {
        const postId = this.route.params.id; // Access the id parameter from the route
        if (postId) {
          const postDoc = doc(db, 'recipes', postId);
          const docSnap = await getDoc(postDoc);
  
          if (docSnap.exists()) {
            const postData = docSnap.data()
            this.post = { id: docSnap.id, ...postData}

            // Fetch comments on the server side
            const commentsCollectionRef = collection(db, 'recipes', postId, 'comments');
            const commentsSnapshot = await getDocs(commentsCollectionRef);
            this.comments = commentsSnapshot.docs.map(doc => doc.data());
          } else {
            console.log("No such document!");
          }
        } else {
          console.error("Post ID is undefined");
        }
      },
      
      //submit comment
      async submitComment() {

        const currentUser = auth.currentUser;
        if(currentUser){
          try{
            //fetches user data from the user document, based on the authId
            const userCollection = collection(db, 'users');   // Create a reference to the "users" collection
            const userQuery = query(userCollection, where('authId', '==', currentUser.uid));   // Create a query to find the user document by authId
            const userQuerySnapshot = await getDocs(userQuery);   // Fetch the user document based on the query
            
            if (!userQuerySnapshot.empty) { // Check if there are any matching documents
              const userData = userQuerySnapshot.docs[0].data();  // Assuming there is only one user document per authId
              this.user = userData;
              this.username = userData.username;
              this.region = userData.region;
            } else {
              console.log('User document not found.');
            }
          } catch (error) {
              console.error('Error fetching user data: ', error)
          }
          // create new comment object
          const newCommentObject = {
            username: this.username,
            region: this.region,
            text: this.newComment,
            date: new Date().toISOString(),
          }; 

          // update comments in document
          try{

            const postId = this.route.params.id;
            const commentsCollectionRef = collection(db, 'recipes', postId, 'comments'); //get comments collection ref
            //add new document to the comments collection
            await addDoc(commentsCollectionRef, newCommentObject);

            // Update the local comments array
            this.comments.push(newCommentObject);
            this.newComment = ''; // Clear the comment box after submission
            this.showCommentBox = false; // Hide the comment box after submission

          } catch (error) {
            console.error('Error adding comment: ', error);
          }
        } else {
          console.log('User not authenticated');
        }
      },
    },
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
  