import Vue from "vue";
import VueRouter from "vue-router";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [{
  path: '/:area/:controller/:action',
  
  component: {
    //template: `<div>{{$route.params.area+'/'+$route.params.controller+'/'+$route.params.action}}</div>`
    template:"<div>123{{$route.params.area}}</div>"
  },
  // component:() => {
  //   debugger;
  //   import(`./components/${this.$route.params.area}/entrustOwn/HistoryList`)}
  component:resolve => require([`./components/entrust/entrustOwn/HistoryList`], resolve)
  // component: resolve => {
  //   //debugger;
  //   return require(["./components/{{$route.params.area}}/entrustOwn/HistoryList"], resolve)
  // }
}]

var router = new VueRouter({
  routes
})

export default router;
