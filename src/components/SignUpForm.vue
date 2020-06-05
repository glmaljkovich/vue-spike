<template>
  <div class="signup row justify-content-center">
    <div class="col-md-6">
      <h2 class="text-light text-center">Cree su cuenta</h2>
      <form @submit.prevent="submit" class="form">
        <FormInput type="text" v-model="user.name" :validator="$v.user.name" errorMessage="Tan corto va a ser? No te creo" label="Nombre Completo" hint="ej: Juan Perez"/>
        <FormInput type="email" v-model="user.email" :validator="$v.user.email" errorMessage="Eso no parece un mail ni a palos" label="Email" hint="ej: juan@perez.co"/>
        <FormInput type="password" v-model="user.password" :validator="$v.user.password" errorMessage="Te dije minimo 8 digitos, el resto te lo perdono" label="Contraseña" hint="Min: 8 digitos. Tiene que contener un numero primo y el octavo digito de pi (?" />
        <FormInput type="phone" v-model="user.phone" :validator="$v.user.phone" errorMessage="Muy cortito, me gustan mas largos ;)" label="Telefono" hint="ej: 0303-456-lalala-lala-lala"/>
        <FormInput type="text" v-model="user.entity" :validator="$v.user.entity" errorMessage="Pone el nombre completo, no la sigla" label="Entidad" hint="A que ente representas"/>
        <FormInput type="text" v-model="user.position" :validator="$v.user.position" errorMessage="Tres letras tenian, tres letras" label="Cargo" hint="ej: Payamedico/a (no discriminamos)"/>
        <FormInput type="text" v-model="user.town" :validator="$v.user.town" errorMessage="Y dale con las 3 letras, si vas a mentir usa mas caracteres" label="Localidad" hint="A que barrio mandamos los insumos"/>

        <button v-if="$v.user.$anyError" disabled class="btn btn-primary disabled">Registrarse</button>
        <button v-else type="submit" class="btn btn-primary">Registrarse</button>
        <span> o sino <router-link to="/login">Iniciar sesion</router-link> </span>

        <div v-if="showSuccessMessage" class="alert alert-success mt-111" role="alert">
          Usuario registrado correctamente!
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import FormInput from './Input';
import { API } from '../api';

export default {
  name: 'SignUpForm',
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
      user: {
        name: "",
        email: "",
        password: "",
        entity: "",
        position: "",
        phone: "",
        town: ""
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
      town: {
        required,
        minLength: minLength(4)
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
