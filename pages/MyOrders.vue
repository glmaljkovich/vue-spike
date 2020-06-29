<template>
  <div class="myorders row justify-content-center">
    <div class="col-md-10">
      <h2 class="text-light text-center">
        🗒️ Mis Solicitudes
      </h2>
      <div class="form rounded">
        <div v-if="orders.length > 0" class="list-group">
            <a v-for="order in orders" :key="order.id" href="#" class="list-group-item list-group-item-action">
                <div class="col-xs-6">
                    <strong>💊 Insumo</strong>
                    <p>{{order.supply}}</p>
                </div>
                <div class="col-xs-6">
                    <strong>👥 Area destino</strong>
                    <p>{{order.area}}</p>
                </div>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small class="text-muted">3 days ago</small>
                </div>
                <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                <small class="text-muted">Donec id elit non mi porta.</small>
            </a>
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
import { mapState } from 'vuex'
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
      areas: ["Cirujia", "Terapia Intensiva", "Tecnicos"],
      supplies: [
          "Mascaras Protectoras",
          "Barbijos",
          "Guantes",
          "Medicamentos"
      ],
      showModal: false
    }
  },
  computed: mapState(["authUser", "orders"]),
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
