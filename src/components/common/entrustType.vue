<template>
  <el-select
    v-model="value.entrustType"
    clearable
    placeholder="请选择"
  >
    <el-option
      v-for="item in data"
      :key="item.Value"
      :label="item.Description"
      :value="item.Value"
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