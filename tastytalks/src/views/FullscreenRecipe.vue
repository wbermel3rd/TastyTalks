<template>
  <main>

    <div class="full-post-view" v-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.date }}</p>
      <br>

      <h2> Instructions </h2>
      <br>
      <p>{{ post.instructions }}</p>
      
      <!-- Display other post details and comments -->
    </div>

    <div v-else>
      Loading post...
    </div>

    <div class="comments-container">
      <h2 class="comments-header">Comments:</h2>
      <!-- Comments Section -->
      <div class="comments" v-for="comment in comments" :key="comment.id">
        <template v-if="comment.editMode">
          <!-- Edit mode -->
          <textarea v-model="comment.text"></textarea>
          <button @click="cancelEdit(comment.id)">Cancel</button>
          <button @click="saveEdit(comment.id)">Save</button>
        </template>
        <!-- Comment display -->
        <div class="comment-card">
          <p class="comment-author">{{ comment.username }}</p>
          <p class="comment-text">{{ comment.text }}</p>
          <p class="comment-date">{{ comment.date }}</p>
          <button v-if="comment.userId === user.uid" @click="deleteComment(comment.id)">Delete</button>
          <button v-if="comment.userId === user.uid" @click="editComment(comment.id)">Edit</button>
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
import { addDoc, doc, getDoc, getDocs, collection, query, where, deleteDoc, updateDoc } from 'firebase/firestore';
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

          // Fetch comments on the server side and ensure that the id is set for each comment
          const commentsCollectionRef = collection(db, 'recipes', postId, 'comments');
          const commentsSnapshot = await getDocs(commentsCollectionRef);
          this.comments = commentsSnapshot.docs.map(doc => {
            const commentData = doc.data();
            return { id: doc.id, ...commentData };
          });
          
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

        const formattedDate = new Date().toLocaleDateString('en-US');

        const newCommentObject = {
          username: this.username,
          userId: currentUser.uid,
          region: this.region,
          text: this.newComment,
          date: formattedDate,
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
    async deleteComment(commentId) {
      console.log('delete comment method called under recipe')
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          // Identify the comment to be deleted in the local array
          const indexToDelete = this.comments.findIndex(comment => comment.id === commentId);

          if (indexToDelete !== -1) {
            const commentToDelete = this.comments[indexToDelete];

            // Check if the current user is the original poster
            if (commentToDelete && commentToDelete.userId === currentUser.uid) {

              // Identify the comment to be deleted in the Firestore collection
              const postId = this.route.params.id;
              const commentDocRef = doc(db, 'recipes', postId, 'comments', commentId);

              // Delete the comment from Firestore
              await deleteDoc(commentDocRef);

              this.comments.splice(indexToDelete, 1)

            } else {
              console.log('User is not the original poster and cannot delete the comment.');
            }
          }

        } catch (error) {
          console.error('Error deleting comment: ', error);
        }
      } else {
        console.log('User not authenticated');
      }
    },
    async editComment(commentId) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          // Identify the comment to be edited in the local array
          const indexToEdit = this.comments.findIndex(comment => comment.id === commentId);

          if (indexToEdit !== -1) {
            const commentToEdit = this.comments[indexToEdit];

            // Check if the current user is the original poster
            if (commentToEdit.userId === currentUser.uid) {
              commentToEdit.editMode = true;
              commentToEdit.originalText = commentToEdit.text;
            } else {
              console.log('User is not the original poster and cannot edit the comment.');
            }
          } else {
            console.log('Comment not found in the local array.');
          }

        } catch (error) {
          console.error('Error editing comment: ', error);
        }
      } else {
        console.log('User not authenticated');
      }
    },
    async cancelEdit(commentId) {
      // Find the comment in the local array
      const indexToCancel = this.comments.findIndex(comment => comment.id === commentId);

      if (indexToCancel !== -1) {
        const commentToCancel = this.comments[indexToCancel];
        commentToCancel.text = commentToCancel.originalText; // revert the comment text to the original text
        commentToCancel.editMode = false; //disable edit mode
      }
    },
    async saveEdit(commentId) {
      console.log('save edit method called under recipe')
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          // Find the comment in the local array
          const indexToSave = this.comments.findIndex(comment => comment.id === commentId);

          if (indexToSave !== -1) {
            const commentToSave = this.comments[indexToSave];

            // Check if the current user is the original poster
            if (commentToSave && commentToSave.userId === currentUser.uid) {
              // Update the comment text in Firestore
              const postId = this.route.params.id;
              const commentDocRef = doc(db, 'recipes', postId, 'comments', commentId);
              await updateDoc(commentDocRef, { text: commentToSave.text });

              commentToSave.editMode = false; //disable edit mode with new comment
            } else {
              console.log('User is not the original poster and cannot edit the comment.');
            }
          } else {
            console.log('Comment not found in the local array.');
          }

        } catch (error) {
          console.error('Error saving edited comment: ', error);
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
  color: #FADF54;
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
  background-color: #4c934c;
  min-height: 500px;
  font-family: 'Lucida Sans';
  color: #FADF54
}
.comments-container{
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #0B6E4F;
  border-radius: 8px;
  background-color: #FADF54;
  font-family:'Times New Roman';
  color: #4c934c
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
  font-family:'Times New Roman';
}

.comments-container button {
  margin-top: 10px;
  padding: 6px 12px;
  background-color: rgb(104, 150, 56);
  font-family:'Times New Roman';
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
  font-family:'Times New Roman';
}

.comment-author {
  font-weight: bold;
  margin-bottom: 5px;
  font-family:'Times New Roman';
}

.comment-text {
  margin-bottom: 10px;
  font-family:'Times New Roman';
}

.comment-date {
  font-size: 0.8em;
  font-family:'Times New Roman';
  color: #666;
}

button {
  margin-right: 10px;
}

</style>
