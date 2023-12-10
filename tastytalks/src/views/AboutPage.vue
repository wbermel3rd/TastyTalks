<template>
  <main>

    <div class="centered-container">
      <h1 class="cylinder-heading">Tasty Talks</h1>
    </div>


    <div class="container">
      <img src="images/TastkyTalkMainIcon.jpg" alt="Image">
      <div class="text-box">
        <p>       Where UNC Charlotte students come together to share and discover recipes from around the world.  Explore diverse culinary traditions, and connect with fellow students passionate about the art of cooking. Embark on a flavorful journey with us!</p>
      </div>
    </div>

    <!-- Recipes Button -->
    <div class= "textButton-container">
      <router-link to="/recipefeed" class="btn-1">Recipes</router-link>
      <p class="button-description">Filter, read, and provide feedback on other students' recipes.</p>
    </div>


    <!-- Questions Button -->
    <div class= "textButton-container">
      <router-link to="/questionfeed" class="btn-2">Questions</router-link>
      <p class="button-description">View other students' cooking related questions and provide feedback.</p>
    </div>

    <!-- Recipes Button -->
    <div class= "textButton-container">
      <router-link to="/choosepost" class="btn-1">Create Post</router-link>
      <p class="button-description">Post your own recipes and questions.</p>
    </div>

    <div class="centered-container">
          <h1 class="cylinder-heading2"><code>&lt;-</code> Meet the Tasty Talks Team -></h1>
    </div>

        <div class="slider-container">

          <div @click="nextPerson" class="nav-button right">
            <div class="arrow-container">
              <div class="arrow-circle"></div>
              <span>&#x2190;</span>
            </div>
          </div>

      <div class="slides">
        <transition :name="slideDirection">
          <div :key="currentPersonIndex" class="person-slider">
            <div class="person-image">
              <img :src="persons[currentPersonIndex].image" :alt="persons[currentPersonIndex].name">
            </div>
            <div class="person-info">
              <h2>{{ persons[currentPersonIndex].name }}</h2>
              <p>{{ persons[currentPersonIndex].jobTitle }}</p>
            </div>
          </div>
        </transition>
      </div>

      <div @click="prevPerson" class="nav-button left">
        <div class="arrow-container">
          <div class="arrow-circle"></div>
          <span>&#x2190;</span>
        </div>
      </div>

    </div>

  </main>
</template>


<script>

export default {
  name: 'about-page',
  data() {
    return {
      persons: [
        { id: 1, name: 'Samuel Baynes', jobTitle: 'Design Manager', image: require('@/assets/images/Group/Sam.jpg')},
        { id: 2, name: 'Ian Boyd', jobTitle: 'Frontend Development', image: require('@/assets/images/Group/IanB.jpg') },
        { id: 3, name: 'Sushmita Hari', jobTitle: 'Design Specialist', image: require('@/assets/images/Group/Sushmita.jpg') },
        { id: 4, name: 'Olivier Deschamps', jobTitle: 'Frontend Development', image: require('@/assets/images/Group/Olivier.jpg')},
        { id: 5, name: 'Will Bermel', jobTitle: 'Backend Development', image: require('@/assets/images/Group/will_formal.jpeg') },

        // Add more persons as needed
      ],
      currentPersonIndex: 0,
      slideDirection: '',
    };
  },
  watch: {
    currentPersonIndex(newValue, oldValue) {
      this.slideDirection = newValue > oldValue ? 'slide-right' : 'slide-left';
    },
  },
  methods: {
    prevPerson() {
      this.currentPersonIndex = (this.currentPersonIndex - 1 + this.persons.length) % this.persons.length;
    },
    nextPerson() {
      this.currentPersonIndex = (this.currentPersonIndex + 1) % this.persons.length;
    },
  },
};

</script>

<style scoped>

h1 {
  text-align: center;
}

.slider-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px;
}

.nav-button {
  font-size: 24px;
  cursor: pointer;
  background: none;
  border: none;
  transition: color 0.3s;
}

.arrow-container {
  position: relative;
  display: inline-block;
}

.arrow-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent; /* Change this to your preferred initial color */
  transition: background-color 0.3s;
}

.left {
  transform: rotate(180deg);
}

.right {
  transform: rotate(0deg);
}

/* Specific hover styles for .nav-button, .left, and .right */
.nav-button:hover .arrow-circle {
  background-color: #555; /* Change the color on hover */
}

.slides {
  width: 80vw; /* 80% of viewport width */
}

.person-slider {
  display: flex;
  position: relative;

  /* BACKGROUND COLOR OF THE SLIDER */
  background-color: var(--darkMainBackgroundColor);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  border-radius: 15px;
  padding: 20px;
  text-align: center;
  color: #FADF54;
}

.person-info {
  flex: 1;
  text-align: left;
}

.person-image {
  flex: 1;
  text-align: left; /* Align the image to the left */
}

.person-slider img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px; /* Adjust the margin as needed */
}

.slide-left-enter-active, .slide-right-enter-active, .slide-left-leave-active, .slide-right-leave-active {
  transition: transform 0.5s;
}

.slide-left-enter, .slide-right-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter, .slide-left-leave-to {
  transform: translateX(100%);
}


.container {
    display: flex;
    align-items: center;
    margin-top: 30px;
    margin-right: 150px;
    margin-left: 150px;
    margin-bottom: 50px;
}

img {
    max-width: 100%;
    height: auto;
    border-radius: 50%;
    margin-right: 120px;
}


.text-box {
    background-color: #0B6E4F;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 22px;
    color: white;
}

/* Button Style 1 */
.btn-1 {
    width: 200px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-left: 180px;
    margin-right: 20px;
    cursor: pointer;
    background-color: #4c934c;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    font-weight: bolder;
    font-size: 25px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: var(--secondaryFontColor);
    text-align: center;
  }


  /* Button Style 2 */
  .btn-2 {
    width: 200px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-left: 180px;
    margin-right: 20px;
    cursor: pointer;
    background-color: var(--secondaryBackgroundColor) ;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    font-weight: bolder;
    font-size: 25px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: #4c934c;
    text-align: center;
  }

 /*Button animation*/
 .btn-1:hover {
    opacity: 0.8;
  }

  /*Button animation*/
 .btn-2:hover {
    opacity: 0.8;
  }

  header {
    background-color: #373D20;
    border-radius: 10px;
    width: 650px;
    padding: auto;
    text-align: center;
    color: white;
  }
</style>