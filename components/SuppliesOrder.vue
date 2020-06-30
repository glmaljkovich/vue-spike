<template>
  <b-modal id="supplies-order" title="Nueva solicitud" @ok="submit">
        <form class="form" @submit.prevent="submit">
          <FormSelect
            :value="order.supply_type"
            label="💊 Insumo"
            :options="supplyTypes"
            @select="(option) => {order.supply_type = option}"
            optionTextProperty="description"
            optionValueProperty="id"
          />
          <FormSelect
            :value="order.area_id"
            label="👥 Area destino"
            :options="areas"
            @select="(option) => {order.area_id = option}"
            optionTextProperty="description"
            optionValueProperty="name"
          />

        </form>
        <template v-slot:modal-footer="{ ok }">
          <button v-if="!order.supply_type || !order.area_id" disabled class="btn btn-primary disabled">
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
          supply_type: {},
          supply_attributes: {},
          area_id: null,
      }
    }
  },
  computed: mapState(["authUser", "orders", "supplyTypes", "areas", "userEmail"]),
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
      API.createSupplyOrder({order: this.order, token: this.authUser})
        .then((_response) => {
          // console.log(response)
          this.showSuccessMessage = true
          this.showErrorMessage = false

          this.addOrder({...this.order, status: "PENDING", informer_id: this.userEmail})
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
