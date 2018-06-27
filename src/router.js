import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import helloWorld1 from "./components/HelloWorld.vue";
import helloWorld2 from "./components/HelloWorld.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path:"/helloWorld1",
        component: helloWorld1
    },
    {
        path: "/helloWorld2",
        component: helloWorld2
    }
]

var router =  new VueRouter({
    routes
})

export default router;