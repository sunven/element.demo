<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-form-item label="委托机构">
                    <companyTree v-model="value"></companyTree>
                </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系人">
                <el-input v-model="value.entrustLinkman"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话">
                <el-input v-model="value.entrustMobilePhone"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import companyTree from "./companyTree";
export default {
    data(){
        return {}
    },
    components:{companyTree},
    props:["value"]
}
</script>
