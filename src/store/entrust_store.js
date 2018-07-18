import lStorage from 'store'

export default {
  state: {
    companyTreeData: [],
    orgTreeData:[]
  },
  mutations: {
    setCompanyTreeData(state, payload) {
      state.companyTreeData = payload;
      lStorage.set("companyTreeData",state.companyTreeData);
    },
    setOrgTreeData(state, payload) {
        state.orgTreeData = payload;
        lStorage.set("orgTreeData",state.orgTreeData);
      }
  },
  actions:{
    initData({commit},payload){
        if (payload.companyTreeData) {
            commit('setCompanyTreeData',payload.companyTreeData);
        }
        if (payload.orgTreeData) {
            commit('setOrgTreeData',payload.orgTreeData);
        }
    }
  }
}
