// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//
import helloWorld from './components/HelloWorld';

import axios from 'axios'
Vue.prototype.$ajax = axios

Vue.use(ElementUI);
//
Vue.use(helloWorld);

Vue.config.productionTip = false

var baseHost='';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
