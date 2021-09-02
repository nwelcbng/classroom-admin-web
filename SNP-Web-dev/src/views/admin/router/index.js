import Vue from 'vue'
import VueRouter from 'vue-router'
const home = () => import("../views/home/Home.vue");
const about = () => import("../views/about/About.vue");
const exam = () =>import("../views/exam/Exam.vue");

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: home
  },
  {
    path:"/home",
    name: 'Home',
    component:home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: about
  },
  {
    path: '/exam',
    name: 'Exam',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: exam
  }
]

const router = new VueRouter({
  routes
})

export default router
