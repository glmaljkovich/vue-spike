/* eslint-disable no-console */
<template>
  <div class="myorders row justify-content-center">
    <div class="col-md-10">
      <h2 class="text-light text-center">
        🗒️ Mis Solicitudes
      </h2>
      <div v-if="!loading" class="form rounded">
        <div v-if="userOrders.length > 0">
          <div class="row justify-content-end">
            <button v-b-modal.supplies-order class="btn btn-success mx-3 mb-3">
              <i class="fa fa-plus" /> Nueva solicitud
            </button>
          </div>
          <div class="list-group">
            <div v-for="order in userOrders" :key="order.id" href="#" class="list-group-item list-group-item-action">
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
                  <button v-if="order.status === 'PENDING'" class="btn btn-danger mt-3 float-right" @click="() => cancelOrder(order)">
                    <i class="fa fa-times" /> Cancelar
                  </button>
                  <p v-else class="mt-4 float-right"><i>Sin acciones</i></p>
                </div>
              </div>
            </div>
            <div v-if="updatingList" class="loadingoverlay">
              <div class="form rounded">
                <Loader />
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center p-4">
          <img class="rounded" :src="noOrdersImage" alt="">
          <p class="lead text-muted text-center mt-4">
            <i>Todavía no hiciste ningun pedido</i>
          </p>
          <button v-b-modal.supplies-order class="btn btn-success btn-lg">
            <i class="fa fa-plus" /> Nueva solicitud
          </button>
        </div>
      </div>
      <div v-else class="form rounded">
        <Loader />
      </div>
      <SuppliesOrder />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
import Loader from '~/components/Loading'
import StatusBadge from '~/components/StatusBadge'
import SuppliesOrder from '~/components/SuppliesOrder'

export default {
  name: 'MyOrders',
  components: {
    Loader,
    StatusBadge,
    SuppliesOrder
  },
  props: {
    msg: String
  },
  middleware: ['auth'],
  data () {
    return {
      loading: true,
      submittingForm: false,
      error: null,
      noOrdersImage: 'https://cataas.com/cat/cute/says/Y%20las%20solicitudes?height=250',
      order: {
        supply: null,
        area: null
      },
      showModal: false,
      updatingList: false
    }
  },
  computed: {
    ...mapState(['authUser', 'orders', 'supplyTypes', 'areas']),
    userOrders () {
      return this.orders.filter(order => order.informer_id === this.$auth.user.email)
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
    this.$api.listSupplyOrders(this.$auth.user.email)
      .then(({ data }) => {
        this.addOrders(data.items)
        this.loading = false
      }).catch((error) => {
        console.log(error)
      })
  },
  methods: {
    ...mapMutations(['addOrders', 'addSupplyTypes', 'addAreas', 'removeOrder']),
    getSupplyName (supplyType) {
      return this.supplyTypes.length > 0 ? this.supplyTypes.find(supply => supply.id === supplyType).description : supplyType
    },
    getAreaName (areaId) {
      console.log('areaId', areaId)

      return this.areas.length > 0 ? this.areas.find(area => area.name === areaId).description : areaId
    },
    cancelOrder (order) {
      this.updatingList = true
      this.$api.cancelSupplyOrder({ orderId: order.id })
        .then(() => {
          this.toast('success', 'Solicitud cancelada')
          this.removeOrder(order)
          this.updatingList = false
        }).catch((_error) => {
          this.toast('danger', 'Hubo un problema al cancelar tu solicitud')
          this.updatingList = false
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
.myorders {
  min-height: calc(100vh - 50px);
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

.loadingoverlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
