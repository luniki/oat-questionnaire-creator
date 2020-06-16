<template>
  <b-navbar class="navbar">
    <template slot="brand">
      <b-navbar-item class="brand">
        Opencast Annotation Tool
      </b-navbar-item>
    </template>
    <template slot="start">
    </template>

    <template slot="end"> </template>
  </b-navbar>
</template>

<script>
export default {
  components: {
  }
};
</script>

<style scoped>
.navbar {
  background-color: #333;
  color: #fff;
  margin-bottom: 3rem;
}
.navbar a {
  color: white !important;
}
.brand {
  font-size: 2rem;
}
</style>
