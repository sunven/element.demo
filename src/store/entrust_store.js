import lStorage from 'store'

export default {
  state: {
    provinceProps: {
      label: "DictText",
      value: "Id",
      children: "Children"
    },
    companyTreeData: [],
    companyProps: {
      children: "Children",
      label: "Name",
      disabled: "NoCheck"
    },
    companyUserTreeData:[],
    orgTreeData:[]
  },
  mutations: {
    setCompanyTreeData(state, payload) {
      state.companyTreeData = payload;
      lStorage.set("companyTreeData",state.companyTreeData);
    },
    setCompanyUserTreeData(state, payload) {
      var data = state.companyUserTreeData.filter(c => {
        return c.pId === payload.pId;
      });
      if (data.length > 0) {
        return;
      }
      state.companyUserTreeData.push(payload);
      lStorage.set("companyUserTreeData",state.regionData);
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
