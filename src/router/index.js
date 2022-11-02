import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import("@/views/index.vue"),
    meta:{
      title:'首页'
    },
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import("@/views/detail.vue"),
    meta:{
      title:'详情'
    },
  },
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router

