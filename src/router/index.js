import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DistilleryTest',
    component: () => import('../views/DistilleryTest.vue')
  },
  {
    path: '/add-question',
    name: 'DistilleryAddQuestion',
    component: () => import('../views/DistilleryAddQuestion.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
