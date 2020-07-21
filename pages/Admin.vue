<template>
  <div>
    <div class="admin row justify-content-center">
      <div class="col-md-10">
        <h2 class="text-light text-center">
          🗒️ Solicitudes sin procesar
        </h2>
        <div v-if="!loading" class="form rounded">
          <div v-if="pendingOrders(orders).length > 0">
            <div class="list-group">
              <div v-for="order in pendingOrders(orders)" :key="order.id" href="#" class="list-group-item list-group-item-action">
                <div class="row">
                  <div class="col">
                    <strong>💊 Insumo</strong>
                    <p>{{ getSupplyName(order.supply_type) }}</p>
                  </div>
                  <div class="col">
                    <strong>👥 Area destino</strong>
                    <p>{{ getAreaName(order.area_id) }}</p>
                  </div>
                  <div class="col">
                    <strong>⏳ Status</strong>
                    <StatusBadge :status="order.status" />
                  </div>
                  <div class="col">
                    <strong>🚚 Proveedor</strong>
                    <p>{{ order.organization_name || "---" }}</p>
                  </div>
                  <div class="col">
                    <strong>🧍 Solicitante</strong>
                    <p>{{ order.informer_id || "---" }}</p>
                  </div>
                  <div class="col">
                    <b-dropdown text="Acciones" variant="primary" class="mt-2">
                      <b-dropdown-item-button v-b-modal.assign-org @click="() => selectedOrder = order">
                        <i class="text-success fa fa-check" /> Aceptar
                      </b-dropdown-item-button>
                      <b-dropdown-item-button @click="() => rejectOrder(order)">
                        <i class="text-danger fa fa-times" /> Rechazar
                      </b-dropdown-item-button>
                    </b-dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center p-4">
            <img class="rounded" :src="noOrdersImage" alt="">
            <p class="lead text-muted text-center mt-4">
              <i>No hay pedidos pendientes. A mirar memes!</i>
            </p>
          </div>
          <div v-if="showSuccessMessage" class="alert alert-success mt-111" role="alert">
            Solicitud enviada correctamente!
          </div>
          <div v-if="showErrorMessage" class="alert alert-danger mt-111" role="alert">
            Hubo un error al procesar tu solicitud
          </div>
        </div>
        <div v-else class="form rounded">
          <Loader />
        </div>
        <AssignOrganization :order="selectedOrder" />
      </div>
    </div>
    <div class="admin row justify-content-center">
      <div class="col-md-10">
        <h2 class="text-light text-center">
          🗹 Solicitudes Procesadas
        </h2>
        <div v-if="!loading" class="form rounded">
          <div v-if="theRest(orders).length > 0">
            <div class="list-group">
              <div v-for="order in theRest(orders)" :key="order.id" href="#" class="list-group-item list-group-item-action">
                <div class="row">
                  <div class="col">
                    <strong>💊 Insumo</strong>
                    <p>{{ getSupplyName(order.supply_type) }}</p>
                  </div>
                  <div class="col">
                    <strong>👥 Area destino</strong>
                    <p>{{ getAreaName(order.area_id) }}</p>
                  </div>
                  <div class="col">
                    <strong>⏳ Status</strong>
                    <StatusBadge :status="order.status" />
                  </div>
                  <div class="col">
                    <strong>🚚 Proveedor</strong>
                    <p>{{ order.organization_name || "---" }}</p>
                  </div>
                  <div class="col">
                    <strong>🧍 Solicitante</strong>
                    <p>{{ order.informer_id || "---" }}</p>
                  </div>
                  <div class="col">
                    <b-dropdown text="Acciones" variant="primary" class="mt-2">
                      <b-dropdown-item-button v-b-modal.assign-org @click="() => selectedOrder = order">
                        <i class="text-success fa fa-check" /> Aceptar
                      </b-dropdown-item-button>
                      <b-dropdown-item-button @click="() => rejectOrder(order)">
                        <i class="text-danger fa fa-times" /> Rechazar
                      </b-dropdown-item-button>
                    </b-dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center p-4">
            <img class="rounded" :src="noOrdersImage" alt="">
            <p class="lead text-muted text-center mt-4">
              <i>Todavía no procesaste ninguna solicitud</i>
            </p>
            <button v-b-modal.supplies-order class="btn btn-success btn-lg">
              <i class="fa fa-plus" /> Nueva solicitud
            </button>
          </div>
          <div v-if="showSuccessMessage" class="alert alert-success mt-111" role="alert">
            Solicitud enviada correctamente!
          </div>
          <div v-if="showErrorMessage" class="alert alert-danger mt-111" role="alert">
            Hubo un error al procesar tu solicitud
          </div>
        </div>
        <div v-else class="form rounded">
          <Loader />
        </div>
        <AssignOrganization :order="selectedOrder" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
import AssignOrganization from '~/components/AssignOrganization'
import StatusBadge from '~/components/StatusBadge'
import Loader from '~/components/Loading'

export default {
  name: 'Admin',
  components: {
    AssignOrganization,
    Loader,
    StatusBadge
  },
  props: {

  },
  middleware: ['auth'],
  data () {
    return {
      showSuccessMessage: false,
      showErrorMessage: false,
      submittingForm: false,
      error: null,
      noOrdersImage: 'https://cataas.com/cat/cute/says/Y%20las%20solicitudes?height=250',
      selectedOrder: {},
      showModal: false,
      loading: true
    }
  },
  computed: {
    ...mapState(['orders', 'supplyTypes', 'areas'])
  },
  validations: {

  },
  mounted () {
    this.$api.listSupplyTypes()
      .then(({ data }) => {
        this.addSupplyTypes(data.items)
      }).catch((error) => {
        console.log(error)
      })
    this.$api.listAreas()
      .then(({ data }) => {
        this.addAreas(data.items)
      }).catch((error) => {
        console.log(error)
      })
    this.$api.listOrgs()
      .then(({ data }) => {
        this.addOrgs(data.items)
      }).catch((error) => {
        console.log(error)
      })
    this.$api.listSupplyOrders()
      .then(({ data }) => {
        this.addOrders(data.items)
        this.loading = false
      }).catch((error) => {
        console.log(error)
      })
  },
  methods: {
    ...mapMutations(['addOrders', 'addSupplyTypes', 'addAreas', 'addOrgs', 'updateOrder']),
    getSupplyName (supplyType) {
      return this.supplyTypes.length > 0 ? (this.supplyTypes.find(supply => supply.id === supplyType) || {}).description : supplyType
    },
    getAreaName (areaId) {
      console.log('areaId', areaId)

      return this.areas.length > 0 ? (this.areas.find(area => area.name === areaId) || {}).description : areaId
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
    rejectOrder (order) {
      const orderPayload = { supplies_order_id: order.id }
      this.$api.rejectSupplyOrder({ order: orderPayload })
        .then(() => {
          this.updateOrder({ id: order.id, status: 'REJECTED' })
          this.toast('success', 'La solicitud ha sido rechazada')
        })
    },
    pendingOrders (orders) {
      return orders.filter(order => order.status === 'PENDING')
    },
    theRest (orders) {
      return orders.filter(order => order.status !== 'PENDING')
    }
  }
}
</script>

<style>
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

.form {
    background-color: white;
    padding: 2em;
    margin: 2em;
    box-shadow: 2px 2px 20px rgba(0,0,0,0.2);
}
.mt-111 {
  margin-top: 1em;
}
.admin {
  min-height: calc(90vh - 61px);
}
</style>
