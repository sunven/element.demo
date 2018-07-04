// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//axios
import axios from 'axios'
//全局的 axios 默认值
axios.defaults.baseURL = 'http://localhost:5618';
axios.defaults.headers.common['Authorization'] = "Basic YWRtaW46NmYxODI0MDAwYTZjYzBjYzJlZTIwOGQ1ZDdlYzM3NWU=";
//拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data.Data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
Vue.prototype.$ajax = axios

Vue.use(ElementUI);

//
Vue.config.productionTip = false

var baseHost = '';

import router from "./router.js"


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app')
