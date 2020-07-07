<template>
  <b-modal id="assign-org" title="Asignar Organizacion" @ok="submit">
    <form class="formolio" @submit.prevent="submit">
      <FormSelect
        :value="organization_id"
        label="👥 Organizacion"
        :options="orgbyType(order.supply_type)"
        option-text-property="organization_name"
        option-value-property="organization_id"
        @select="(option) => {organization_id = option}"
      />
    </form>
    <template v-slot:modal-footer="{ ok }">
      <button v-if="!organization_id" disabled class="btn btn-primary disabled">
        Aceptar Solicitud
      </button>
      <button v-else type="submit" class="btn btn-primary" @click="ok()">
        Aceptar Solicitud
      </button>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
import FormSelect from '~/components/Select'

export default {
  name: 'AssignOrganization',
  components: {
    FormSelect
  },
  props: ['order'],
  data () {
    return {
      submittingForm: false,
      error: null,
      organization_id: null
    }
  },
  computed: mapState(['organizations']),
  methods: {
    ...mapMutations(['updateOrder']),
    submit () {
      const order = { supplies_order_id: this.order.id, organization_id: Number(this.organization_id) }
      this.$api.acceptSupplyOrder({ order })
        .then((_response) => {
          this.updateOrder({ id: this.order.id, status: 'ACCEPTED' })
          this.toast('success', 'Cambios guardados.')
        })
        .catch((_error) => {
          this.toast('danger', 'Hubo un error al actualizar la solicitud')
        })
    },
    orgbyType (type) {
      return (this.organizations.find(org => org.supply_type_id === type) || {}).organizations || []
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
.mt-111 {
  margin-top: 1em;
}
</style>
