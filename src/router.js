import Vue from "vue";
import VueRouter from "vue-router";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

// const routes = [{
//   path: '/',
//   component: {
//     template: '<div>index</div>'
//   },
//   children: [{
//     path: '/entrust',
//     component: {
//       template: '<div>entrust</div>'
//     },
//     children: [{
//       path: 'BusinessReport',
//       component: {
//         template: '<div>BusinessReport</div>'
//       },
//       children: [{
//         path: 'AdvisorBusinessAnalysis',
//         component: {
//           template: '<div>AdvisorBusinessAnalysis</div>'
//         }
//       }]
//     }]
//   }]
// }]
// const User = {
//     template: `<div>User {{ $route.params.id+'-'+$route.params.a }}</div>`
//   }
const routes = [{
    path: '/:area/:controller/:action',
    component: {
      template: `<div>{{$route.params.area+'/'+$route.params.controller+'/'+$route.params.action}}</div>`
    }
  }]

var router = new VueRouter({
  routes
})

export default router;
