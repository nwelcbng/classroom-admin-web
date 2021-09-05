
import Vue from 'vue'
import VueRouter from 'vue-router'
const info = () =>  { return import('../views/Info/Info.vue')}
const reg = () =>  { return import('../views/Reg/Reg.vue')}

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: reg

  },
  {
    path: "/reg",
    name: "Reg",
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
  routes
})

export default router
