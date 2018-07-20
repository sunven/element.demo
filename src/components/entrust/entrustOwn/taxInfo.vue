<template>
    <div>
        <el-row>
            <el-col>
                <el-form-item label="">
                    <el-checkbox v-model="value.isCalcTax">是否计算税费</el-checkbox>
                </el-form-item>
            </el-col>
        </el-row>
        <div v-show="value.isCalcTax">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="交易类型">
                        <el-select v-model="value.transActionType" clearable placeholder="请选择">
                            <el-option v-for="item in value.transActionTypeList" :key="item.Value" :label="item.Description" :value="item.Value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="土地性质">
                        <el-select v-model="value.landProperty" clearable placeholder="请选择">
                            <el-option v-for="item in value.landPropertyList" :key="item.Value" :label="item.Description" :value="item.Value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="房屋性质">
                        <el-select v-model="value.celllabel" clearable placeholder="请选择">
                            <el-option v-for="item in value.celllabelList" :key="item.Value" :label="item.Description" :value="item.Value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="卖家类型">
                        <el-select v-model="value.sellerType" clearable placeholder="请选择">
                            <el-option v-for="item in value.sellerTypeList" :key="item.Value" :label="item.Description" :value="item.Value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="是否卖家唯一住房">
                        <el-select v-model="value.sellerOnly" clearable placeholder="请选择">
                            <el-option v-for="item in value.sellerOnlyList" :key="item.Value" :label="item.Description" :value="item.Value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="买家类型">
                        <el-select v-model="value.buyHouseType" clearable placeholder="请选择">
                            <el-option v-for="item in value.buyHouseTypeList" :key="item.Value" :label="item.Description" :value="item.Value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="房屋套次">
                        <el-select v-model="value.housingCover" clearable placeholder="请选择">
                            <el-option v-for="item in value.housingCoverList" :key="item.Value" :label="item.Description" :value="item.Value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="购入时间">
                        <el-form-item label="购房日期">
                        <el-date-picker v-model="value.tPurchaseTime" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="购入价格">
                        <el-input v-model="value.tPurchasePrice"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="抵扣费用">
                        <el-input v-model="value.deductionPrice"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="使用面积">
                        <el-input v-model="value.usageAreaLimit"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="容积率">
                        <el-input v-model="value.plotRatio" type="number"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="环线">
                        <el-select v-model="value.loopLine" clearable placeholder="请选择">
                            <el-option v-for="item in value.loopLineList" :key="item.Value" :label="item.Description" :value="item.Value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="预计完成时间">
                        <el-date-picker v-model="value.estimateTime" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="原值证明">
                        <el-select v-model="value.originalProve" clearable placeholder="请选择">
                            <el-option v-for="item in value.originalProveList" :key="item.Value" :label="item.Description" :value="item.Value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="产证数量">
                        <el-input v-model="value.certificateCount" type="number"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["value"]
};
</script>
