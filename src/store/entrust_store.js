import lStorage from 'store'

export default {
  state: {
    propertyTypeList: [],
    entrustTypeList: [],
    priceTypeList: [],
    appraisalObjectiveList: [],
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
    companyUserTreeData: [],
    orgTreeData: []
  },
  mutations: {
    setPropertyTypeList(state, payload) {
      state.propertyTypeList = payload;
      lStorage.set("propertyTypeList", state.propertyTypeList);
    },
    setEntrustTypeList(state, payload) {
      state.entrustTypeList = payload;
      lStorage.set("entrustTypeList", state.entrustTypeList);
    },
    setAppraisalObjectiveList(state, payload) {
      state.appraisalObjectiveList = payload;
      lStorage.set("appraisalObjectiveList", state.appraisalObjectiveList);
    },
    setPriceTypeList(state, payload) {
      state.priceTypeList = payload;
      lStorage.set("priceTypeList", state.priceTypeList);
    },
    setCompanyTreeData(state, payload) {
      state.companyTreeData = payload;
      lStorage.set("companyTreeData", state.companyTreeData);
    },
    setCompanyUserTreeData(state, payload) {
      var data = state.companyUserTreeData.filter(c => {
        return c.pId === payload.pId;
      });
      if (data.length > 0) {
        return;
      }
      state.companyUserTreeData.push(payload);
      lStorage.set("companyUserTreeData", state.regionData);
    },
    setOrgTreeData(state, payload) {
      state.orgTreeData = payload;
      lStorage.set("orgTreeData", state.orgTreeData);
    }
  },
  actions: {
    initData({
      commit
    }, payload) {
      if (payload.company) {
        commit('setCompanyTreeData', payload.company);
      }
      if (payload.orgTreeData) {
        commit('setOrgTreeData', payload.orgTreeData);
      }
      if (payload.propertyType) {
        commit('setPropertyTypeList', payload.propertyType);
      }
      if (payload.entrustType) {
        commit('setEntrustTypeList', payload.entrustType);
      }
    }
  }
}
