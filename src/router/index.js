import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Movimentacoes',
    component: () => import('../components/Movimentos.vue')
  },
  {
    path: '/novo-lancamento',
    name: 'NovoLancamento',
    component: () => import('../components/NovoLancamento.vue')
  },
  {
    path: '/balanco',
    name: 'Balanco',
    component: () => import('../components/Balanco.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
