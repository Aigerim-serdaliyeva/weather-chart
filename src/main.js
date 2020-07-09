import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import { router } from './router'
import { store } from './store' 

Vue.use(VueRouter)

Vue.config.productionTip = false
import './assets/scss/main.scss';
import 'vue-search-select/dist/VueSearchSelect.css'



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
