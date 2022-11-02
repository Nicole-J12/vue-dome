import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from "vant"
import 'vant/lib/index.css'
import 'lib-flexible/flexible' //PX转换成rem
import * as Axios from '../utils/axios' //公共axios请求方法
import { Lazyload } from 'vant'

Vue.prototype.Axios = Axios //公共方法注册到全局
Vue.use(Vant)
Vue.use(Lazyload)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//路由跳转监听方法、路由跳转前执行
router.beforeEach((to, from, next) => {
  next();
})

// 路由跳转监听方法、路由跳转后执行
router.afterEach((to, from) => {
  //跳转到首页时显示记录的页面的title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
})
