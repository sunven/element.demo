<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-form-item label="权证号">
                    <el-input v-model="value.obligeeNo"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="权利人">
                    <el-input v-model="value.obligeeUserName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="权益人属性">
                    <el-select v-model="value.obligee" clearable placeholder="请选择">
                        <el-option v-for="item in value.obligeeList" :key="item.Value" :label="item.Description" :value="item.Value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="共有情况">
                    <el-select v-model="value.coownershipCircumstance" clearable placeholder="请选择">
                        <el-option v-for="item in value.coownershipCircumstanceList" :key="item.Value" :label="item.Description" :value="item.Value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-form-item label="证载用途">
                    <el-select v-model="value.purpose" clearable placeholder="请选择">
                        <el-option v-for="item in value.purposeList" :key="item.Value" :label="item.Description" :value="item.Value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="竣工日期">
                    <el-input v-model="value.completionYear"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="套内面积">
                    <el-input v-model="value.internalArea" type="number"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="土地面积">
                    <el-input v-model="value.landAcreage" type="number"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-form-item label="地上层数">
                    <el-input v-model="value.floorUp"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="地下层数">
                    <el-input v-model="value.floorDown"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="所在层数">
                    <el-select v-model="value.floor" clearable placeholder="请选择">
                        <el-option v-for="item in floorList" :key="item.Value" :label="item.Description" :value="item.Value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="使用权来源">
                    <el-input v-model="value.landTenureTypes" type="number"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-form-item label="购房日期">
                    <el-date-picker v-model="value.purchaseTime" type="date" placeholder="选择日期">
                </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="登记价格">
                    <el-input v-model="value.purchasePrice"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </div>

</template>
<script>
export default {
  data() {
    return {
      floorList: []
    };
  },
  props: ["value"]
};
</script>
