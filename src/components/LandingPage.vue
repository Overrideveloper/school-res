<template>
  <div class="container">
    <br/>
    <div class="jumbotron text-center">
      <h3 class="header">{{ header }}</h3>
      <h4 class="text-muted">{{ sub_header }}</h4>
    </div>
    <br />
    <br />
    <center>
      <router-link class="btn btn-success btn-lg text-center" to="/all_students"><span> PROCEED </span><icon name="arrow-right"></icon></router-link>
    </center>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      header: 'SCHOOL RESOURCE MANAGEMENT APP',
      sub_header: 'ALC 2.0 ASSESSMENT',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  font-weight: bold;
  font-family: Tahoma;
}
span {
  font-family: Tahoma;
}
</style>
