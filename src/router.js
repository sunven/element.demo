import Vue from "vue";
import VueRouter from "vue-router";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [{
  path:"/",
  component:{
    template:"<h1>index</h1>"
  }
}]

var router = new VueRouter({
  routes
})

export default router;
