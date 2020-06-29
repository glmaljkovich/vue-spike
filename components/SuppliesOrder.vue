<template>
  <b-modal id="supplies-order" title="Nueva solicitud" @ok="submit">
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

        </form>
        <template v-slot:modal-footer="{ ok }">
          <button v-if="!order.supply || !order.area" disabled class="btn btn-primary disabled">
            Enviar
          </button>
          <button v-else type="submit" class="btn btn-primary" @click="ok()">
            Enviar
          </button>

          <div v-if="showSuccessMessage" class="alert alert-success mt-111" role="alert">
            Solicitud enviada correctamente!
          </div>
          <div v-if="showErrorMessage" class="alert alert-danger mt-111" role="alert">
            Hubo un error al procesar tu solicitud
          </div>
        </template>
  </b-modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
  computed: mapState(["authUser", "orders"]),
  validations: {
    order: {
      area: {
        required,
        minLength: minLength(4)
      },
      supply: {
        required,
        minLength: minLength(4)
      },
    }
  },
  methods: {
    ...mapMutations(["addOrder"]),
    submit () {
      const supplyOrder = {
        "supply_type": this.order.supply,
        "supply_attributes": {
          "description": this.order.description
        },
        "area_id": this.order.area
      }
      API.createSupplyOrder({order: supplyOrder, token: this.authUser})
        .then((_response) => {
          // console.log(response)
          this.showSuccessMessage = true
          this.showErrorMessage = false
          this.addOrder({...order, status: "pending"})
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

.mt-111 {
  margin-top: 1em;
}
</style>
