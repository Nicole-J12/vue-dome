// 封装公共请求方法
import request from './request'

//get请求
const get = (url, params) => {
  return request({
    url, method: 'get', params
  })
}

//post请求
const post = (url, data) => {
  return request({
    url, method: 'post', data
  })
}

//post请求get方式传参
const postQuery = (url, data) => {
  return request({
    url, method: 'post', params: data
  })
}
//上传图片请求方法
const upImg = (url, data) => {
  return request({
    method: 'post', // 请求方式
    url: url, // 请求链接
    data, // 请求带的参数
    timeout: 30000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
  }).then((response) => {
    if (response) {
      let res = JSON.parse(response.data.replace(/'/g, '"'))
      if (res.state == "200") {
        return res.url
      } else {
        showMessage(res.state);
      }
    } else {
      showMessage("接口无响应");
      return false
    }
  })
}
export {
  get,
  post,
  upImg,
  postQuery
}