<template>
  <div class="myorders row justify-content-center">
    <div class="col-md-10">
      <h2 class="text-light text-center">
        🗒️ Mis Solicitudes
      </h2>
      <div class="form rounded">
          <div v-if="userOrders.length > 0">
            <div class="row justify-content-end">
                <button class="btn btn-success mx-3 mb-3" v-b-modal.supplies-order> <i class="fa fa-plus"></i> Nueva solicitud</button>
            </div>
            <div class="list-group">
                <div v-for="order in userOrders" :key="order.id" href="#" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col">
                            <strong>💊 Insumo</strong>
                            <p>{{getSupplyName(order.supply_type)}}</p>
                        </div>
                        <div class="col">
                            <strong>👥 Area destino</strong>
                            <p>{{getAreaName(order.area_id)}}</p>
                        </div>
                        <div class="col">
                            <strong>⏳ Status</strong>
                            <h5><span class="badge badge-secondary">{{order.status}}</span></h5>
                        </div>
                        <div class="col">
                            <strong>🚚 Proveedor</strong>
                            <p>{{order.organization_name || "---"}}</p>
                        </div>
                        <div class="col">
                            <button class="btn btn-danger mt-3 float-right" @click="cancelOrder"> <i class="fa fa-times"></i> Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>

        <div v-else class="text-center p-4">
            <img class="rounded" :src="noOrdersImage" alt="">
            <p class="lead text-muted text-center mt-4"><i>Todavía no hiciste ningun pedido</i></p>
            <button class="btn btn-success btn-lg" v-b-modal.supplies-order> <i class="fa fa-plus"></i> Nueva solicitud</button>
        </div>
        <div v-if="showSuccessMessage" class="alert alert-success mt-111" role="alert">
          Solicitud enviada correctamente!
        </div>
        <div v-if="showErrorMessage" class="alert alert-danger mt-111" role="alert">
          Hubo un error al procesar tu solicitud
        </div>
      </div>
      <SuppliesOrder/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
import FormSelect from '~/components/Select'
import SuppliesOrder from '~/components/SuppliesOrder'
import { API } from '~/api'

export default {
  name: 'MyOrders',
  components: {
    FormSelect,
    SuppliesOrder
  },
  props: {
    msg: String
  },
  middleware: ["auth"],
  data () {
    return {
      showSuccessMessage: false,
      showErrorMessage: false,
      submittingForm: false,
      error: null,
      noOrdersImage: "https://cataas.com/cat/cute/says/Y%20las%20solicitudes?height=250",
      order: {
          supply: null,
          area: null,
      },
      showModal: false
    }
  },
  computed: {
      ...mapState(["authUser", "orders", "supplyTypes", "userEmail", "areas"]),
      userOrders() {
          return this.orders.filter(order => order["informer_id"] === this.userEmail)
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
    mounted() {
        API.listSupplyTypes(this.authUser)
            .then(({ data }) => {
                this.addSupplyTypes(data.items)
            }).catch(error => {
                console.log(error);
            }) 
        API.listAreas(this.authUser)
            .then(({ data }) => {
                this.addAreas(data.items)
            }).catch(error => {
                console.log(error);
            })
        API.listSupplyOrders(this.authUser)
            .then(({ data }) => {
                this.addOrders(data.items)
            }).catch(error => {
                console.log(error);  
            })
    },
  methods: {
      ...mapMutations(["addOrders", "addSupplyTypes", "addAreas"]),
      getSupplyName(supplyType) {
          return this.supplyTypes.length > 0 ? this.supplyTypes.find(supply => supply.id === supplyType).description : supplyType
      },
      getAreaName(areaId) {
          console.log("areaId", areaId);
          
          return this.areas.length > 0 ? this.areas.find(area => area.name === areaId).description : areaId
      },
      cancelOrder(id) {

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
.myorders{
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
