import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import App from './App.vue'

import SignUpForm from './components/SignUpForm.vue';
import LoginForm from './components/LoginForm.vue';

Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(VueRouter);

const routes = [
  { path: '/login', component: LoginForm },
  { path: '/signup', component: SignUpForm },
  { path: '/', component: SignUpForm }
];

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
