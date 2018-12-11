<template>
    <el-popover placement="bottom" popper-class="popover" width="160" v-model="visible">
        <el-tree node-key="Id" :data="$store.state.entrust_store.companyTreeData" :props="$store.state.entrust_store.companyProps" :expand-on-click-node="false" show-checkbox @check="handleCheck">
        </el-tree>
        <el-input v-model="value.companyTreeNameList" :disabled="true" slot="reference">{{value.companyTreeNameList}}</el-input>
    </el-popover>
</template>
<style scoped>

/deep/ .popover{
  height:200px;
}
</style>
<script>
export default {
  data() {
    return {
        visible:false
    };
  },
  props: ["value"],
  methods: {
    handleCheck: function(data, data1) {
      this.value.companyTreeIdList = data1.checkedKeys;
      var names = data1.checkedNodes.map(c => {
        return c.Name;
      });
      this.value.companyTreeNameList = names.join();
    }
  }
};
</script>
