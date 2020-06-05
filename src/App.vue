<template>
  <div id="app">
    <nav class="navbar navbar-light navbar-custom">
      <span class="navbar-brand mb-0 h1">🏥 Medical Supplies</span>
    </nav>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #21D4FD;
  background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
  display: block;
}
html, body{
 margin: 0;
 padding: 0;
}
body {
}
.navbar-custom {
  box-shadow: 2px 2px 20px rgba(0,0,0,0.2);
}

.navbar-custom .h1{
  color: rgba(255,255,255,.9);
}
</style>
