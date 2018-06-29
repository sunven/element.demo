import Vue from "vue";
import VueRouter from "vue-router";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [{
  path: '/:area/:controller/:action',
  component: {
    template: `<div>{{$route.params.area+'/'+$route.params.controller+'/'+$route.params.action}}</div>`
  },
  //component:resolve => require(['./components/entrust/entrustOwn/HistoryList'], resolve)
  component: resolve => require(['./components/entrust/entrustOwn/HistoryList'], resolve)
}]

var router = new VueRouter({
  routes
})

export default router;
