
import Vue from 'vue'
import VueRouter from 'vue-router'
const info = () => { import('../../../components/user/InfoForm.vue') }
const reg = () => { import('../../../components/user/RegForm.vue') }

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: reg

  },
  {
    path: "/user",
    name: "User",
    component: reg
  },
  {
    path: "/info",
    name: "Info",
    component: info

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
