<template>
  <main>
    <div>
      <h1>About Us</h1>
      <div class="person-slider">
        <button @click="prevPerson" class="nav-button">❮</button>
        <img :src="person.image" :alt="person.name">
        <h2>{{ person.name }}</h2>
        <p>{{ person.jobTitle }}</p>
        <button @click="nextPerson" class="nav-button">❯</button>
      </div>
    </div>
  </main>
</template>


<script>


export default {
  props: ['person', 'prevPerson', 'nextPerson'],
};

</script>

<style>

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

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.nav-button:hover {
  color: #333;
}

</style>