<template>
  <el-dialog title="收货地址" :visible.sync="visible" :fullscreen="true" @closed="handleClosed">
    <el-form :inline="true" :model="form" size="mini">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="询价机构信息" name="1">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="询价机构" :label-width="formLabelWidth">
                <el-popover placement="bottom" width="160" v-model="visible2">
                  <el-tree node-key="Id" :data="companyTreeData" :props="companyProps" :expand-on-click-node="false" show-checkbox @check="companyHandleCheck">
                  </el-tree>
                  <el-input v-model="fromSearchData.ListCompanyName" :disabled="true" slot="reference">{{fromSearchData.ListCompanyName}}</el-input>
                </el-popover>
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
        <el-collapse-item title="业务信息" name="2">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="所在区县" :label-width="formLabelWidth">
                <regionSelect v-model="form.region"></regionSelect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="详细地址">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="所属项目">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="物业类型">
                <el-select v-model="form.propertyType" clearable placeholder="请选择">
                  <el-option v-for="item in formInitData.propertyTypeList" :key="item.Value" :label="item.Description" :value="item.Value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="评估类型">
                <el-select v-model="form.entrustType" clearable placeholder="请选择">
                  <el-option v-for="item in formInitData.entrustTypeList" :key="item.Value" :label="item.Description" :value="item.Value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品">
                <el-select v-model="form.productId" clearable placeholder="请选择">
                  <el-option v-for="item in formInitData.productIdList" :key="item.Value" :label="item.Description" :value="item.Value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="估价目的">
                <el-select v-model="form.appraisalObjective" clearable placeholder="请选择">
                  <el-option v-for="item in formInitData.appraisalObjectiveList" :key="item.Value" :label="item.Description" :value="item.Value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="价格类型">
                <el-select v-model="form.priceType" clearable placeholder="请选择">
                  <el-option v-for="item in formInitData.priceTypeList" :key="item.Value" :label="item.Description" :value="item.Value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="价值时点">
                <el-date-picker v-model="form.timePoint" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="建筑面积">
                <el-input v-model="form.floorAcreage" type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="贷款申请人">
                <el-input v-model="form.proposer" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="贷款申请人电话">
                <el-input v-model="form.proposerPhone" type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form.remarks">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="权属信息" name="3">
          <equityInfo v-model="form"></equityInfo>
        </el-collapse-item>
        <el-collapse-item title="税费信息" name="4">
          <taxInfo v-model="form"></taxInfo>
        </el-collapse-item>
      </el-collapse>
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" :label-width="formLabelWidth">

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="setVisible">取 消</el-button>
      <el-button type="primary" @click="setVisible">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

import regionSelect from "./../../common/regionSelect";
import equityInfo from "./equityInfo";
import taxInfo from "./taxInfo";

export default {
  components: { regionSelect, equityInfo, taxInfo },
  name: "create",
  props: ["dialogVisible"],
  data() {
    return {
      visible2: false,
      activeNames: ["1"],
      visible: this.dialogVisible,
      formInitData: {
        propertyTypeList: [],
        entrustTypeList: [],
        productIdList: [],
        appraisalObjectiveList: [],
        priceTypeList: []
      },
      form: {
        propertyType: "",
        entrustType: "",
        productId: "",
        appraisalObjective: "",
        priceType: "",
        timePoint: "",
        floorAcreage: "",
        proposer: "",
        proposerPhone: "",
        remarks: "",
        //权属信息
        obligeeNo: "",
        obligeeUserName: "",
        obligee: "",
        obligeeList: [],
        coownershipCircumstance: "",
        coownershipCircumstanceList: [],
        purpose: "",
        purposeList: "",
        completionYear: "",
        internalArea: "",
        landAcreage: "",
        floorUp: "",
        floorDown: "",
        floor: "",
        landTenureTypes: "",
        purchaseTime: "",
        purchasePrice: "",
        //税费信息
        isCalcTax: false,
        transActionType: "",
        transActionTypeList: [],
        landProperty: "",
        landPropertyList: [],
        celllabel: "",
        celllabelList: [],
        sellerType: "",
        sellerTypeList: [],
        sellerOnly:"",
        sellerOnlyList:[],
        buyHouseType:"",
        buyHouseTypeList:[],
        housingCover:"",
        housingCoverList:[],
        tPurchaseTime:"",
        tPurchasePrice:"",
        deductionPrice:"",
        usageAreaLimit:"",
        plotRatio:"",
        loopLine:"",
        loopLineList:[],
        estimateTime:"",
        originalProve:"",
        originalProveList:[],
        certificateCount:"",
        //
        name: "",
        region: [],
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      formSettings: {},
      fromSearchData: {
        searchState: "",
        entrustType: "",
        createTime: "",
        incomingTime: "",
        groupNumber: "",
        comCondition: "",
        province: 0,
        ListCompanyId: [1],
        ListCompanyName: "",
        ListInquirerId: [],
        ListInquirerName: "",
        ListEntrustOrgId: [],
        ListEntrustOrgName: "",
        entrustLinkman: "",
        isOrientation: "",
        timePoint: ""
      }
    };
  },
  computed: {
    ...mapState({
      companyTreeData: state => state.entrust_store.companyTreeData,
      companyProps: state => state.entrust_store.companyProps,
      provinceProps: state => state.entrust_store.provinceProps
    }),
    ...mapGetters(["getData"])
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
    },
    companyHandleCheck(data, data1) {},
    handleItemChange(val) {
      var selId = val[val.length - 1];
      var selectOption;
      var optionDatas = this.formInitData.province;
      for (let index = 0; index < val.length; index++) {
        const element = val[index];
        selectOption = optionDatas.filter(c => {
          return c.Id === element;
        })[0];
        optionDatas = selectOption.Children;
      }
      //var regionData = this.$store.getters.getData(selId);
      var regionData = this.getData(selId);
      if (regionData == null) {
        this.$ajax
          .get("api/Common/Common/GetArea", { params: { id: selId } })
          .then(response => {
            selectOption.Children = response;
            this.addRegionData({
              pId: selId,
              data: response
            });
            // this.$store.commit("addRegionData", {
            //   pId: selId,
            //   data: response
            // });
          });
      } else {
        selectOption.Children = regionData.data;
      }
    }
  },
  watch: {
    dialogVisible(val) {
      this.visible = val;
    }
  }
};
</script>