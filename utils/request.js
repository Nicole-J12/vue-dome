import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 30000, // request timeout
  withCredentials: true
})

service.interceptors.request.use(
  config => {
    store.state.loading = true; //显示加载中状态 透明遮罩层防止重复点击 3秒后显示加载中
    console.log(store.state,'store')
    return config;
  },
  error => {
    store.state.loading = false;
    return Promise.reject(error);
  }
)

// 响应拦截器
service.interceptors.response.use(response => {
  store.state.loading = false
  if (response) {
    if (response.status == 200) {
      return response.data;
    } else if (response.status == 404) {
      showMessage("接口找不到了");
    } else if (response.data.code == 500) {
      if (response.data.message) {
        showMessage(response.data.message);
      } else {
        showMessage("系统异常");
      }
      return Promise.reject(response.data)
    } else if (response.data.code == 502) {
      showMessage("后台接口正在发布中");
    } else if (response.data.code == 504) {
      showMessage("服务器未开启");
    } else {
      if (response.data.message) {
        showMessage(response.data.message);
      } else {
        showMessage("网络异常");
      }
    }
  } else {
    showMessage("网络超时，请检查您的网络");
  }
}, error => {
  store.state.loading = false //隐藏加载中状态
  showMessage("系统异常");
  return Promise.reject(error);
})

// 提示消息
function showMessage(msg) {
  Vue.prototype.$toast(msg);
}

export default service
