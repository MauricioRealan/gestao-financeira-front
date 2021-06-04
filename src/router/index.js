import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/movimentacoes',
    name: 'Movimentacoes',
    component: () => import('../components/Movimentos.vue'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem("user") !== null) {
        next()
      } else {
        console.log('no else')
        router.push("/")
      }
    }
  },
  {
    path: '/novo-lancamento',
    name: 'NovoLancamento',
    component: () => import('../components/NovoLancamento.vue'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem("user") !== null) {
        next()
      } else {
        console.log('no else')
        router.push("/")
      }
    }
  },
  {
    path: '/balanco',
    name: 'Balanco',
    component: () => import('../components/Balanco.vue'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem("user") !== null) {
        next()
      } else {
        console.log('no else')
        router.push("/")
      }
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
