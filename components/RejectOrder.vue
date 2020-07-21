<template>
  <b-modal id="reject-org" title="Rechazar solicitud" @ok="rejectOrder">
    <form class="formolio" @submit.prevent="submit">
        <FormInput
            v-model="reason"
            type="text"
            :validator="$v.reason"
            error-message="El motivo es muy corto"
            label="Motivo"
            hint="Ej: No ser peronista"
      />
    </form>
    <template v-slot:modal-footer="{ ok }">
      <button v-if="!reason" disabled class="btn btn-primary disabled">
        Rechazar Solicitud
      </button>
      <button v-else type="submit" class="btn btn-primary" @click="ok()">
        Rechazar Solicitud
      </button>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
import FormInput from '~/components/Input'

export default {
  name: 'AssignOrganization',
  components: {
    FormInput
  },
  props: ['order'],
  data () {
    return {
      reason: null,
      submittingForm: false,
      error: null,
      organization_id: null
    }
  },
  validations: {
      reason: {
          minLength: minLength(4)
      }
  },
  computed: mapState(['organizations']),
  methods: {
    ...mapMutations(['updateOrder']),
    submit () {
      const order = { supplies_order_id: this.order.id, organization_id: Number(this.organization_id) }
      this.$api.acceptSupplyOrder({ order })
        .then((_response) => {
          const orgName = this.orgbyType(this.order.supply_type)
            .find(org => Number(org.organization_id) === Number(this.organization_id)).organization_name

          this.updateOrder({ id: this.order.id, status: 'ACCEPTED', organization_name: orgName })
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
    },
    rejectOrder () {
      const orderPayload = { supplies_order_id: this.order.id, note: this.reason }
      this.$api.rejectSupplyOrder({ order: orderPayload })
        .then(() => {
          this.updateOrder({ id: this.order.id, status: 'REJECTED' })
          this.toast('success', 'La solicitud ha sido rechazada')
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
