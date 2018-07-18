import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import global_store from "./global_store"
import entrust_store from "./entrust_store"

export default new vuex.Store({
  modules: {
    global_store,entrust_store
  }
})