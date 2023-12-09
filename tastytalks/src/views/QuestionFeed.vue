<!-- QuestionFeed.vue -->
<template>
    <main>
      <div class="question-feed">
        <div class="centered-container">
          <h1 class="cylinder-heading">Questions</h1>
        </div>
  
        <p class="page-instructions">
          Explore questions from the community. Click on a question to view details and participate in the discussion.
        </p>
  
        <!-- Filter Section -->
        <div class="filter-container">
          <!-- Region Filter -->
          <label for="region" class="filter-label">Filter Region:</label>
          <select v-model="selectedRegion" @change="fetchQuestions">
            <option value="">Select Region</option>
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
            <!-- Add more options for other regions -->
          </select>
        </div>
  
        <div class="question-list">
          <div v-for="question in questions" :key="question.id" class="question-item" @click="goToQuestion(question.id)">
            <div class="question-content">
              <h2 class="question-title">{{ question.title }}</h2>
              <p>{{ question.body }}</p>
              <!-- Display region instead of tags -->
              <div class="region">
                <strong>Region: </strong>
                <span>{{ getRegionName(question.regionID) }}</span>
              </div>
              <div class="region">
                <strong>Date: </strong>
                <span>{{ question.date }}</span>
              </div>
            </div>
          </div>
        </div>
        <br>
      </div>
    </main>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import { collection, getDocs } from 'firebase/firestore';
  import { db } from '../firebase';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      const questions = ref([]);
      const selectedRegion = ref('');
  
      // Define a map to store region names based on IDs
      const regionMap = {
        1: 'Asia-Pacific',
        2: 'Caribbean',
        3: 'Central America',
        4: 'Central Asia',
        5: 'Eastern Europe',
        6: 'Middle East',
        7: 'Nordic Countries',
        8: 'North America',
        9: 'Northern Africa',
        10: 'Oceania',
        11: 'Southern Africa',
        12: 'South America',
        13: 'Southeast Asia',
        14: 'Western Europe',
        // Add more entries for other regions
      };
  
      const getRegionName = (regionID) => {
        return regionMap[regionID] || 'Unknown Region';
      };
  
      const fetchQuestions = async () => {
        const questionsCollection = collection(db, 'questions');
        const querySnapshot = await getDocs(questionsCollection);
  
        const filteredQuestions = [];
  
        querySnapshot.forEach((doc) => {
          const questionData = doc.data();
  
          // Check if the question matches the selected region
          const matchesRegion = selectedRegion.value === '' || questionData.regionID === selectedRegion.value;
  
          if (matchesRegion) {
            filteredQuestions.push({
              id: doc.id,
              ...questionData,
            });
          }
        });
  
        questions.value = filteredQuestions;
      };
  
      const goToQuestion = (questionId) => {
        router.push({ name: 'Question', params: { id: questionId } });
      };
  
      onMounted(() => {
        fetchQuestions();
      });
  
      return {
        questions,
        goToQuestion,
        selectedRegion,
        fetchQuestions,
        getRegionName,
      };
    },
  };
  </script>
  
  
  <style scoped>
  .question-feed {
    max-width: 80%; /* Set the maximum width to 80% of the viewport */
    margin: 0 auto; /* Center the question feed horizontally */
  }
  
  /* Your existing styles remain unchanged */
  
  .question-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .question-item {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 8px;
    background-color: #4c934c;
    transition: transform 0.3s ease-in-out;
    margin-bottom: 20px;
    color: #FADF54;
  }
  .question-item:hover {
transform: scale(1.02);
}
  
  .region {
    display: inline-block;
    margin-right: 10px;
    margin-top: 10px;
    font-size: 16px;
  }

/* ///////// FILTER STYLE ////////////////// */


.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  text-align: center;
  background-color: #4c934c; /* Match the background color of the recipe boxes */
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.filter-label {
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-right: 10px;
}

.filter-select {
  width: 200px;
  padding: 8px;
  border: 1px solid #0B6E4F;
  border-radius: 4px;
  background-color: white;
  color: #0B6E4F;
  appearance: none; /* Remove default arrow */
  background-repeat: no-repeat;
  background-position: right 10px center; /* Adjust the position of the arrow */
  cursor: pointer; /* Add pointer cursor on hover */
}

/* Style select dropdown options */
.filter-select option {
  background-color: white;
  color: #0B6E4F;
}

/* Hover effect for select dropdown options */
.filter-select option:hover {
  background-color: #0B6E4F;
  color: white;
}

/* //////////////////// */

.filter-select {
  width: 200px;
  padding: 8px;
  border: 1px solid #0B6E4F;
  border-radius: 4px;
  background-color: white;
  color: #0B6E4F;
  appearance: none; /* Remove default arrow */
  background-repeat: no-repeat;
  background-position: right 10px center; /* Adjust the position of the arrow */
  cursor: pointer; /* Add pointer cursor on hover */
}

/* Style select dropdown options */
.filter-select option {
  background-color: white;
  color: #0B6E4F;
}

/* Hover effect for select dropdown options */
.filter-select option:hover {
  background-color: #0B6E4F;
  color: white;
}

/* Add the same background color and box shadow as the recipe boxes */
.filter-container select {
  background-color: #FADF54;
  font-family: 'Lucida Sans';
  color: #0B6E4F;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #0B6E4F;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}





  </style>
  