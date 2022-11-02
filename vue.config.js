// vue.config.js
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = "搜索页面"; // 标题
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",// 部署应用时的基本 URL
  assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, //取消eslint规则的检查
  productionSourceMap: false, //不使用SourceMap
  // css的处理
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require('postcss-px2rem')({
          remUnit: 37.5 //移动端px自动转换成rem配置
        })]
      }
    }
  },
  devServer: {//本地代理
    host: '',
    port: 8080,//端口号
    proxy: {
      [process.env.VUE_APP_API]: {
        target: `https://itunes.apple.com`, //公开环境域名
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_API]: ''
        }
       }
     },
    disableHostCheck: true
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
}