<template>
  <el-dialog title="收货地址" :visible.sync="visible" :fullscreen="true" @closed="handleClosed">
    <el-form :inline="true" :model="form" size="mini">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="询价机构信息" name="1">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="询价机构" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="询价人" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="询价机构联系人" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="询价机构联系电话" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="询价机构邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback" name="2">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability" name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
      </el-collapse>
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="setVisible">取 消</el-button>
      <el-button type="primary" @click="setVisible">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "create",
  props: ["dialogVisible"],
  data() {
    return {
      activeNames: ["1"],
      visible: this.dialogVisible,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    setVisible: function() {
      this.visible = false;
      this.$emit("changeVisible", this.visible);
    },
    handleClosed: function() {
      this.setVisible();
    }
  },
  watch: {
    dialogVisible(val) {
      this.visible = val;
    }
  }
};
</script>