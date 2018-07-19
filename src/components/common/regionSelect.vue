<template>
    <el-cascader :options="province" @active-item-change="handleItemChange" :props="$store.state.entrust_store.provinceProps"></el-cascader>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getData"]),
    province() {
      return this.getData(0).data;
    }
  },
  methods: {
    handleItemChange: function(val) {
      var selId = val[val.length - 1];
      var selectOption;
      var optionDatas = this.province;
      for (let index = 0; index < val.length; index++) {
        const element = val[index];
        selectOption = optionDatas.filter(c => {
          return c.Id === element;
        })[0];
        optionDatas = selectOption.Children;
      }
      var regionData = this.getData(selId);
      if (regionData == null) {
        this.$store.dispatch("getRegionDataAsync", selId).then(response => {
          this.$store.commit("addRegionData", {
            pId: selId,
            data: response
          });
          selectOption.Children = this.getData(selId).data;
        });
      } else {
        selectOption.Children = regionData.data;
      }
    }
  }
};
</script>
