<template>
  <div class="container error">
    <div class="form">
      <img src="https://cataas.com/cat/cute/says/Se%20rompio" alt="">
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>Nooo, Leo que hiciste?</h1>
      <nuxt-link to="/">Home page</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'basic' // you can set a custom layout for the error page
}
</script>

<style lang="css" scoped>
  .error {
    height: calc(100vh - 60px)
  }
  .form {
    background-color: white;
    padding: 2em;
    margin: 2em;
    box-shadow: 2px 2px 20px rgba(0,0,0,0.2);
}
</style>
