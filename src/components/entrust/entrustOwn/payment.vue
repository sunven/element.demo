<template>
    <div>
        <el-row>
            <el-col>
                <el-form-item label="">
                    <el-checkbox v-model="value.isPayment">是否发起收费</el-checkbox>
                </el-form-item>
            </el-col>
        </el-row>
        <div v-show="value.isPayment">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="收费金额">
                        <el-input v-model="value.sellerPrice"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="通知付款人">
                        <el-input v-model="value.draweeName"></el-input><el-checkbox v-model="whetherSendMessage">通知付款人</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="手机号">
                        <el-input v-model="value.draweePhoneNumber"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      isPayment: false,
      whetherSendMessage:false
    };
  },
  props: ["value"]
};
</script>
