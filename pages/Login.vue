/* eslint-disable no-console */
<template>
  <div class="login row justify-content-center" :style="{ 'background-image': 'url(' + backgroundURL + ')' }">
    <div class="backdrop row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-light text-center mt-333">
          Iniciar Sesion
        </h2>
        <form class="form" @submit.prevent="submit">
          <FormInput
            v-model="user.email"
            type="email"
            :validator="$v.user.email"
            error-message="Eso no es un mail, mostri"
            label="Email"
            hint=" "
          />
          <FormInput
            v-model="user.password"
            :validator="$v.user.password"
            type="password"
            error-message="Le falta panqueques"
            label="Contraseña"
            hint=" "
          />

          <button v-if="$v.user.$anyError" disabled class="btn btn-primary disabled">
            Iniciar Sesion
          </button>
          <button v-else type="submit" class="btn btn-primary">
            Iniciar Sesion
          </button>
          <span> o sino <router-link to="/signup">Registrarse</router-link> </span>

          <div v-if="showSuccessMessage" class="alert alert-success mt-111" role="alert">
            Usuario autenticado correctamente!
          </div>
          <div v-if="showErrorMessage" class="alert alert-danger mt-111" role="alert">
            Hubo un error al procesar tu solicitud
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
import randomanime from 'random-anime'
import FormInput from '~/components/Input.vue'

export default {
  name: 'LoginForm',
  auth: false,
  components: {
    FormInput
  },
  props: {
    msg: String
  },
  data () {
    return {
      showSuccessMessage: false,
      showErrorMessage: false,
      submittingForm: false,
      error: null,
      backgroundURL: '',
      user: {
        email: '',
        password: ''
      }
    }
  },
  created () {
    this.backgroundURL = randomanime.anime()
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(1)
      }
    }
  },
  methods: {
    ...mapActions(['loginAuth']),
    async submit () {
      this.showSuccessMessage = false
      this.showErrorMessage = false
      try {
        await this.$auth.loginWith('local', { data: this.user })
        // console.log(response)
        this.showSuccessMessage = true
        if (this.$auth.user.is_admin) {
          this.$router.push('/admin')
        }
        this.$router.push('/myorders')
      } catch (error) {
        console.log(error)
        this.showSuccessMessage = false
        this.showErrorMessage = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin: 40px 0 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.backdrop {
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.4);
}
.login{
  text-align: left;
  background-color: black;
  height: calc(100vh - 56px);
  background-repeat: no-repeat;
  background-size: cover;
}
.mt-333 {
  margin-top: 3em;
}
.form {
    background-color: white;
    padding: 2em;
    margin: 2em;
    box-shadow: 2px 2px 20px rgba(0,0,0,0.2);
}
.mt-111 {
  margin-top: 1em;
}
</style>
