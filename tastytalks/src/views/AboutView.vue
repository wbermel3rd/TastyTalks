<template>

  <div>
    <h1>About Us</h1>
    <div class="slider-container">
      <div @click="prevPerson" class="nav-button left">❮</div>
      <div class="slides">
        <transition :name="slideDirection">
          <div :key="currentPersonIndex" class="person-slider">
            <img :src="persons[currentPersonIndex].image" :alt="persons[currentPersonIndex].name">
            <h2>{{ persons[currentPersonIndex].name }}</h2>
            <p>{{ persons[currentPersonIndex].jobTitle }}</p>
          </div>
        </transition>
      </div>
      <div @click="nextPerson" class="nav-button right">❯</div>
    </div>
  </div>

</template>


<script>

export default {
  data() {
    return {
      persons: [
        { id: 1, name: 'John Doe', jobTitle: 'Job Title 1', image: 'person1.jpg' },
        { id: 2, name: 'Jane Smith', jobTitle: 'Job Title 2', image: 'person2.jpg' },
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

<style>

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
}

.left {
  transform: rotate(180deg);
}

.right {
  transform: rotate(0deg);
}

.nav-button:hover {
  color: #333;
}

.slides {
  width: 80vw; /* 80% of viewport width */
}

.person-slider {
  position: relative;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.person-slider img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
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
</style>