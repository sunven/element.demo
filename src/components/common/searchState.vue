<template>
  <el-select
    v-model="value.searchState"
    clearable
    placeholder="请选择"
  >
    <el-option
      v-for="item in data"
      :key="item.value"
      :label="item.text"
      :value="item.value"
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