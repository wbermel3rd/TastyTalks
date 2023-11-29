<template>
    <div class="post-feed">
      <h1>Post Feed</h1>
      <div class="post-grid">
        <div v-for="post in posts" :key="post.id" class="post-item" @click="goToPost(post.id)">
          <h2>{{ post.title }}</h2>
          <p>{{ post.instructions }}</p>
          <p>{{ post.date }}</p>
          <!-- Add more details you want to display -->
  
          <!-- Example: Display tags -->
          <div class="tags">
            <span v-for="tag in post.tags" :key="tag.name" class="tag">{{ tag.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import { collection, getDocs } from 'firebase/firestore';
  import { db } from '../firebase';
import { useRouter } from 'vue-router'; // Import useRouter

  
  export default {
    setup() {
      //Used for fullscreen view
      const router = useRouter();


      const posts = ref([]);
  
      // Fetch posts from Firebase and update the component's data
      const fetchPosts = async () => {
        const postsCollection = collection(db, 'recipes');
        const querySnapshot = await getDocs(postsCollection);
  
        querySnapshot.forEach((doc) => {
          posts.value.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      };

      const goToPost = (postId) => {
      router.push({ name: 'Post', params: { id: postId } });
    };
      
      onMounted(() => {
        fetchPosts();
      });
  
      return {
        posts,
        goToPost,
      };
    },
  };
  </script>
  


<style scoped>
.post-feed {
  max-width: 1200px;
  margin: 0 auto;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.post-item {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  transition: transform 0.3s ease-in-out;
}

.post-item:hover {
  transform: scale(1.05);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;

  /* .tag {
    margin-right: 8px;
    background-color: #007bff;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
  } */
}



</style>