import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import money from 'v-money'
import VueCurrencyFilter from 'vue-currency-filter'


Vue.config.productionTip = false

Vue.use(money, {precision: 4})
Vue.use(VueCurrencyFilter,
  {
    symbol : 'R$',
    thousandsSeparator: '.',
    fractionCount: 2,
    fractionSeparator: ',',
    symbolPosition: 'back',
    symbolSpacing: true,
    avoidEmptyDecimals: undefined,
  })

new Vue({
  vuetify,
  router,
  VueCurrencyFilter,
  render: h => h(App)
}).$mount('#app')
