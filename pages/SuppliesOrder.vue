<template>
  <div class="suppliesorder row justify-content-center">
    <div class="col-md-6">
      <h2 class="text-light text-center">
        Nueva solicitud
      </h2>
      <form class="form" @submit.prevent="submit">
        <FormSelect
          :value="order.supply"
          label="💊 Insumo"
          :options="supplies"
          @select="(option) => {order.supply = option}"
        />
        <FormSelect
          :value="order.area"
          label="👥 Area destino"
          :options="areas"
          @select="(option) => {order.area = option}"
        />

        <button v-if="$v.user.$anyError" disabled class="btn btn-primary disabled">
          Enviar
        </button>
        <button v-else type="submit" class="btn btn-primary">
          Enviar
        </button>

        <div v-if="showSuccessMessage" class="alert alert-success mt-111" role="alert">
          Solicitud enviada correctamente!
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
import FormSelect from '~/components/Select'
import { API } from '~/api'

export default {
  name: 'SuppliesOrder',
  components: {
    FormSelect
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
      order: {
          supply: null,
          area: null,
      },
      areas: ["Cirujia", "Terapia Intensiva", "Tecnicos"],
      supplies: [
          "Mascaras Protectoras",
          "Barbijos",
          "Guantes",
          "Medicamentos"
      ]
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
      API.createSupplyOrder(this.user)
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
.suppliesorder{
  text-align: left;
  height: calc(100vh - 56px);
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
