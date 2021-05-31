import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import money from 'v-money'

Vue.config.productionTip = false

Vue.use(money, {precision: 4})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
