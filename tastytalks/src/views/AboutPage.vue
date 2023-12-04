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

<!-- Ian Boyd
Olivier DeschampsOlivier Deschamps
Samuel BaynesSamuel Baynes
Sushmita HariSushmita Hari
Will BermelWill Bermel  -->

<script>

export default {
  name: 'about-page',
  data() {
    return {
      persons: [
        { id: 1, name: 'Samuel Baynes', jobTitle: 'Job Title', image: 'person1.jpg' },
        { id: 2, name: 'Ian Boyd', jobTitle: 'Job Title', image: 'person2.jpg' },
        { id: 3, name: 'Sushmita Hari', jobTitle: 'Job Title', image: require('@/assets/images/Sushmita.jpg') },
        { id: 4, name: 'Olivier Deschamps', jobTitle: 'Job Title', image: require('@/assets/images/Olivier.jpg')},
        { id: 5, name: 'Will Bermel', jobTitle: 'Job Title', image: 'person2.jpg' },
        
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
  background-color: #bbc9f1;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
    background-color: #373D20;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 20px;
    color: #dcfabd;
}


</style>