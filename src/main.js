// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//axios
import axios from 'axios'
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
})
