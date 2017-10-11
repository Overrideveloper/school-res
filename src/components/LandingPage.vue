<template>
  <div class="hello">
    <h1>{{ text }}</h1>
    <button class="btn btn-primary btn-lg text-center" v-link="'home'" >ENTER</button>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      text: 'SCHOLASTIC SCHOOL RESOURCE MANAGEMENT APP',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: bold;
}
</style>
