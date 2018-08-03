<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-form-item label="询价机构">
                    <companyTree v-model="value"></companyTree>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="询价人">
                    <el-input v-model="value.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-form-item label="询价机构联系人">
                    <el-input v-model="value.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="询价机构联系电话">
                    <el-input v-model="value.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="询价机构邮箱" prop="qqemail">
                    <el-input v-model="value.qqemail" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import companyTree from "./companyTree";
export default {
  data() {
    return {};
  },
  props: ["value"],
  components:{companyTree}
};
</script>
