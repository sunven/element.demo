<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-form-item label="所在区县">
                    <regionSelect v-model="value.region"></regionSelect>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="详细地址">
                    <el-input v-model="value.name"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-form-item label="所属项目">
                    <el-input v-model="value.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="物业类型">
                    <el-select v-model="value.propertyType" clearable placeholder="请选择">
                        <el-option v-for="item in $store.state.entrust_store.propertyTypeList" :key="item.Value" :label="item.Description" :value="item.Value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="评估类型">
                    <el-select v-model="value.entrustType" clearable placeholder="请选择">
                        <el-option v-for="item in $store.state.entrust_store.entrustTypeList" :key="item.Value" :label="item.Description" :value="item.Value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="产品">
                    <!-- <el-select v-model="value.productId" clearable placeholder="请选择">
                        <el-option v-for="item in formInitData.productIdList" :key="item.Value" :label="item.Description" :value="item.Value">
                        </el-option>
                    </el-select> -->
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-form-item label="估价目的">
                    <el-select v-model="value.appraisalObjective" clearable placeholder="请选择">
                        <el-option v-for="item in $store.state.entrust_store.appraisalObjectiveList" :key="item.Value" :label="item.Description" :value="item.Value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="价格类型">
                    <el-select v-model="value.priceType" clearable placeholder="请选择">
                        <el-option v-for="item in $store.state.entrust_store.priceTypeList" :key="item.Value" :label="item.Description" :value="item.Value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="价值时点">
                    <el-date-picker v-model="value.timePoint" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="建筑面积">
                    <el-input v-model="value.floorAcreage" type="number"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-form-item label="贷款申请人">
                    <el-input v-model="value.proposer" type="number"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="贷款申请人电话">
                    <el-input v-model="value.proposerPhone" type="number"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="备注">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="value.remarks">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </div>
</template>
<script>

import regionSelect from "./../../common/regionSelect";
export default {
  data() {
    return {};
  },
  props: ["value"],
  components:{regionSelect}
};
</script>
