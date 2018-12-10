<template>
  <el-select
    v-model="value.propertyType"
    clearable
    placeholder="请选择"
  >
    <el-option
      v-for="item in data"
      :key="item.Id"
      :label="item.DictText"
      :value="item.Id"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["value", "data"]
};
</script>