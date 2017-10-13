<template>
    <section>
        <h1> {{ header }} </h1>
        <ul class="breadcrumb">
            <li class="active">
                <router-link to="/all_students"><icon name="users"></icon> All Students </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
  name: 'StudentList',
  data() {
    return {
      header: 'All Students',
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
