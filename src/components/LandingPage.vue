<template>
  <div class="hello">
    <h1>{{ text }}</h1>
    <br />
    <hr />
    <br />
    <button class="btn btn-default btn-lg text-center" v-link="'start'" ><i class="fa fa-door" aria-hidden="true"></i>ENTER</button>
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
