<template>
  <div class="login row justify-content-center" v-bind:style="{ 'background-image': 'url(' + backgroundURL + ')' }">
    <div class="backdrop row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-light text-center mt-333">Iniciar Sesion</h2>
        <form @submit.prevent="submit" class="form">
          <FormInput type="email" v-model="user.email" :validator="$v.user.email" errorMessage="Eso no es un mail, mostri" label="Email" hint=" "/>
          <FormInput type="password" v-model="user.password" errorMessage="Le falta panqueques" label="Contraseña" hint=" " />

          <button v-if="$v.user.$anyError" disabled class="btn btn-primary disabled">Iniciar Sesion</button>
          <button v-else type="submit" class="btn btn-primary">Iniciar Sesion</button>
          <span> o sino <router-link to="/signup">Registrarse</router-link> </span>

          <div v-if="showSuccessMessage" class="alert alert-success mt-111" role="alert">
            Usuario autenticado correctamente!
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import FormInput from './Input';
import { API } from '../api';
import randomanime from 'random-anime';

export default {
  name: 'LoginForm',
  components: {
    FormInput
  },
  props: {
    msg: String
  },
  data(){
    return {
      showSuccessMessage: false,
      submittingForm: false,
      error: null,
      backgroundURL: '',
      user: {
        email: "",
        password: ""
      }
    }
  },
  created() {
    this.backgroundURL = randomanime.anime();
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      },
    }
  },
  methods: {
    submit(){
      API.post("/user", this.user)
        .then((response) => {
          console.log(response);
          this.showSuccessMessage = true;
        })
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
