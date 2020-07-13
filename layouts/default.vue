<template>
  <div id="app">
    <nav class="navbar navbar-light navbar-custom">
      <span class="navbar-brand mb-0 h1">🏥 Medical Supplies</span>
      <span class="float-right">
        <i v-if="this.$auth.user.is_admin" class="fa fa-shield text-white px-2" aria-hidden="true"></i>
        <b-dropdown v-if="$auth.user" right variant="outline-light" class="" menu-class="w-100">
          <template v-slot:button-content>
            <span><i class="fa fa-user" /> {{ $auth.user.email }}</span>
          </template>
          <b-dropdown-item>
            <b-button variant="primary" block size="sm" class="ml-1" @click="logout"><i class="fa fa-sign-out" /> Cerrar sesion</b-button>
          </b-dropdown-item>
        </b-dropdown>
      </span>
    </nav>
    <div class="container-fluid">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'APP',
  methods: {
    async logout () {
      try {
        await this.$auth.logout()
      } catch (error) {
          console.log(error)
      }
    }
  }
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
 height: 100%;
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
