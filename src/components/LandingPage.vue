<template>
  <div>
    <h3 class="jumbotron">{{ text }}</h3>
    <br />
    <br />
    <button class="btn btn-default btn-lg text-center"> PROCEED! </button>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      text: 'ALC ASSESSMENT SCHOOL RESOURCE MANAGEMENT APP',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: bold;
  font-family: Monotype;
}
</style>
