<template>
    <el-popover placement="bottom" width="160" v-model="visible">
        <!-- <el-tree node-key="Id" :data="formInitData.company" :props="formSettings.companyProps" :check-strictly="true" @node-click="handleNodeClick">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                  <span v-if="!(data.ParentId==0||data.Type==3||data.Type==4||data.Type==0||data.Type==-1)">
                    <el-checkbox v-model="checked"></el-checkbox>
                  </span>
                  <span>{{ node.label }}</span>
                </span>
              </span>
            </el-tree> -->
        <el-tree node-key="Id" :data="$store.state.entrust_store.companyTreeData" :props="$store.state.entrust_store.companyProps" :expand-on-click-node="false" show-checkbox @check="handleCheck">
        </el-tree>
        <el-input v-model="value.companyTreeNameList" :disabled="true" slot="reference">{{value.companyTreeNameList}}</el-input>
    </el-popover>
</template>
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
