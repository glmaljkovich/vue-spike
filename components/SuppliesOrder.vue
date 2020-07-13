<template>
  <b-modal id="supplies-order" title="Nueva solicitud" @ok="submit">
    <form class="form" @submit.prevent="submit">
      <FormSelect
        :value="order.supply_type"
        label="💊 Insumo"
        :options="supplyTypes"
        option-text-property="description"
        option-value-property="id"
        @select="(option) => {order.supply_type = option}"
      />
      <FormInput
        v-if="order.supply_type === 'MEDICAMENTO'"
        v-model="order.supply_attributes.description"
        type="text"
        :validator="$v.order.supply_description"
        error-message="El nombre es muy corto"
        label="Nombre del medicamento"
        hint="Ej: Clonas el pan"
      />
      <FormSelect
        :value="order.area_id"
        label="👥 Area destino"
        :options="areas"
        option-text-property="description"
        option-value-property="name"
        @select="(option) => {order.area_id = option}"
      />
    </form>
    <template v-slot:modal-footer="{ ok }">
      <button v-if="!order.supply_type || !order.area_id" disabled class="btn btn-primary disabled">
        Enviar
      </button>
      <button v-else type="submit" class="btn btn-primary" @click="ok()">
        Enviar
      </button>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
import FormSelect from '~/components/Select'
import FormInput from '~/components/Input'

export default {
  name: 'SuppliesOrder',
  components: {
    FormSelect,
    FormInput
  },
  props: {

  },
  data () {
    return {
      submittingForm: false,
      error: null,
      order: {
        supply_type: null,
        supply_attributes: { description: '' },
        area_id: null
      }
    }
  },
  computed: mapState(['authUser', 'orders', 'supplyTypes', 'areas']),
  validations: {
    order: {
      supply_description: {
        required,
        minLength: minLength(1)
      }
    }
  },
  methods: {
    ...mapMutations(['addOrder']),
    submit () {
      this.$api.createSupplyOrder({ order: this.order })
        .then(({ data }) => {
          this.addOrder({ ...this.order, status: 'PENDING', informer_id: this.$auth.user.email, id: data.id })
          this.toast('success', 'Solicitud enviada correctamente')
        })
        .catch((_error) => {
          this.toast('danger', 'Hubo un problema al procesar tu solicitud')
        })
    },
    toast (variant, msg) {
      this.$bvToast.toast(msg, {
        toaster: 'b-toaster-bottom-right',
        solid: true,
        title: 'Mensaje',
        variant,
        appendToast: false
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
