import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/tailwind.css'
import './assets/scss/main.scss'

// axios
import axios from 'axios'
Vue.prototype.$http = axios

// Filters
import  "@/helpers/filters";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
