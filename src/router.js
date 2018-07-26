import Vue from "vue";
import VueRouter from "vue-router";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [{
  //path: '/:area/:controller/:action',
  path: '/entrust',
  component: {
    //template: `<div>{{$route.params.area+'/'+$route.params.controller+'/'+$route.params.action}}</div>`
    template:"<h1>Index1</h1>"
  },
  path: '/entrust/entrustown',
  component: {
    //template: `<div>{{$route.params.area+'/'+$route.params.controller+'/'+$route.params.action}}</div>`
    template:"<h1>Index2</h1>"
  },
  path: '/entrust/entrustown/historyList',
  component: {
    //template: `<div>{{$route.params.area+'/'+$route.params.controller+'/'+$route.params.action}}</div>`
    template:"<h1>Index3</h1>"
  },
  path: '/entrust/businessreport/index',
  component: {
    //template: `<div>{{$route.params.area+'/'+$route.params.controller+'/'+$route.params.action}}</div>`
    template:"<h1>Index11111</h1>"
  },
  //component:resolve => require([`./components/entrust/entrustown/historylist`], resolve)
}]

var router = new VueRouter({
  routes
})

export default router;
