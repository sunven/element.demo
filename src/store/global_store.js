import lStorage from 'store'

export default {
  state: {
    regionData: []
  },
  getters: {
    getData: state => (pId) => {
      var data = state.regionData.filter(c => {
        return c.pId === pId;
      });
      return data.length > 0 ? data[0] : null;
    }
  },
  mutations: {
    initRegionData(state, payload) {
      state.regionData = payload;
    },
    addRegionData(state, payload) {
      var data = state.regionData.filter(c => {
        return c.pId === payload.pId;
      });
      if (data.length > 0) {
        return;
      }
      state.regionData.push(payload);
      lStorage.set("regionData",state.regionData)
    }
  }
}
