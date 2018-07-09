<template>
  <span class="custom-tree-node">
    <span v-if="vif">
      <el-checkbox v-model="checked" />
    </span>
    <span>{{nodelabel}}</span>
  </span>
</template>

<script>
export default {
  name: "treenode",
  props: ["vif", "nodelabel", "propchecked"],
  data: function() {
    return {
      checked: this.propchecked
    };
  },
  watch: {
    propchecked(val) {
      this.checked = val;
    }
  }
};
</script>