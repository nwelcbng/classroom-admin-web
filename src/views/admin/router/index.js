import Vue from 'vue'
import VueRouter from 'vue-router'
const news = () => import("../views/news/news.vue");
const classroom = () => import("../views/classroom/classroom.vue");
const review = () => import("../views/review/review.vue");
const user = () => import("../views/user/user.vue");

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'news',
  },
  {
    path: "/news",
    name: 'news',
    component: news,
  },
  {
    path: '/classroom',
    name: 'classroom',
    component: classroom
  },
  {
    path: '/review',
    name: 'review',
    component: review
  },
  {
    path: '/user',
    name: 'user',
    component: user
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/admin/',
  routes
})

export default router
