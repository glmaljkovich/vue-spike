<template>
  <div class="signup row justify-content-center">
    <div class="col-md-6">
      <h2 class="text-light text-center">
        Cree su cuenta
      </h2>
      <form class="form" @submit.prevent="submit">
        <FormInput
          v-model="user.name"
          type="text"
          :validator="$v.user.name"
          error-message="Tan corto va a ser? No te creo"
          label="Nombre Completo"
          hint="ej: Juan Perez"
        />
        <FormInput
          v-model="user.email"
          type="email"
          :validator="$v.user.email"
          error-message="Eso no parece un mail ni a palos"
          label="Email"
          hint="ej: juan@perez.co"
        />
        <FormInput
          v-model="user.password"
          type="password"
          :validator="$v.user.password"
          error-message="Te dije minimo 8 digitos, el resto te lo perdono"
          label="Contraseña"
          hint="Min: 8 digitos. Tiene que contener un numero primo y el octavo digito de pi (?"
        />
        <FormInput
          v-model="user.phone"
          type="phone"
          :validator="$v.user.phone"
          error-message="Muy cortito, me gustan mas largos ;)"
          label="Telefono"
          hint="ej: 0303-456-lalala-lala-lala"
        />
        <FormInput
          v-model="user.entity"
          type="text"
          :validator="$v.user.entity"
          error-message="Pone el nombre completo, no la sigla"
          label="Entidad"
          hint="A que ente representas"
        />
        <FormInput
          v-model="user.position"
          type="text"
          :validator="$v.user.position"
          error-message="Tres letras tenian, tres letras"
          label="Cargo"
          hint="ej: Payamedico/a (no discriminamos)"
        />
        <FormInput
          v-model="user.locality"
          type="text"
          :validator="$v.user.locality"
          error-message="Y dale con las 3 letras, si vas a mentir usa mas caracteres"
          label="Localidad"
          hint="A que barrio mandamos los insumos"
        />

        <button v-if="$v.user.$anyError" disabled class="btn btn-primary disabled">
          Registrarse
        </button>
        <button v-else type="submit" class="btn btn-primary">
          Registrarse
        </button>
        <span> o sino <router-link to="/login">Iniciar sesion</router-link> </span>

        <div v-if="showSuccessMessage" class="alert alert-success mt-111" role="alert">
          Usuario registrado correctamente!
        </div>
        <div v-if="showErrorMessage" class="alert alert-danger mt-111" role="alert">
          Hubo un error al procesar tu solicitud
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import FormInput from '~/components/Input'
import { API } from '~/api'

export default {
  name: 'SignUpForm',
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
      user: {
        name: '',
        email: '',
        password: '',
        entity: '',
        position: '',
        phone: '',
        locality: ''
      }
    }
  },
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      },
      phone: {
        required,
        minLength: minLength(4)
      },
      position: {
        required,
        minLength: minLength(4)
      },
      entity: {
        required,
        minLength: minLength(4)
      },
      locality: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    submit () {
      API.signUp(this.user)
        .then((_response) => {
          // console.log(response)
          this.showSuccessMessage = true
          this.showErrorMessage = false
        })
        .catch((_error) => {
          this.showSuccessMessage = false
          this.showErrorMessage = true
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
.signup{
  text-align: left;
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
