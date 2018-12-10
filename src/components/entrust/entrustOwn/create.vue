<template>
  <el-dialog title="新增" :visible.sync="visible" top="5vh" width="80%" :fullscreen="false" @closed="handleClosed">
    <el-form :inline="true" :label-position="labelPosition" label-width="130px" :model="form" :rules="rules" ref="form" size="mini">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="询价机构信息" name="1">
          <company v-model="form"></company>
        </el-collapse-item>
        <el-collapse-item title="业务信息" name="2">
          <business v-model="form"></business>
        </el-collapse-item>
        <el-collapse-item title="权属信息" name="3">
          <equityInfo v-model="form"></equityInfo>
        </el-collapse-item>
        <el-collapse-item title="税费信息" name="4">
          <taxInfo v-model="form"></taxInfo>
        </el-collapse-item>
        <el-collapse-item title="委托方信息" name="5">
          <entrustInfo v-model="form"></entrustInfo>
        </el-collapse-item>
        <el-collapse-item title="收费信息" name="6">
          <payment v-model="form"></payment>
        </el-collapse-item>
        <el-collapse-item title="业务附件" name="7">
          <attachment v-model="form"></attachment>
        </el-collapse-item>
      </el-collapse>
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

import companyTree from "./companyTree";
import company from "./company";
import business from "./business";
import taxInfo from "./taxInfo";
import equityInfo from "./equityInfo";
import entrustInfo from "./entrustInfo";
import payment from "./payment";
import attachment from "./attachment";

export default {
  components: {
    companyTree,
    company,
    business,
    equityInfo,
    taxInfo,
    entrustInfo,
    payment,
    attachment
  },
  name: "create",
  props: ["dialogVisible"],
  data() {
    return {
      labelPosition:"right",
      visible2: false,
      activeNames: ["1", "2"],
      visible: this.dialogVisible,
      formInitData: {
        propertyTypeList: [],
        entrustTypeList: [],
        productIdList: [],
        appraisalObjectiveList: [],
        priceTypeList: []
      },
      form: {
        qqemail: "",
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
        sellerOnly: "",
        sellerOnlyList: [],
        buyHouseType: "",
        buyHouseTypeList: [],
        housingCover: "",
        housingCoverList: [],
        tPurchaseTime: "",
        tPurchasePrice: "",
        deductionPrice: "",
        usageAreaLimit: "",
        plotRatio: "",
        loopLine: "",
        loopLineList: [],
        estimateTime: "",
        originalProve: "",
        originalProveList: [],
        certificateCount: "",
        //权属信息
        entrustLinkman: "",
        entrustMobilePhone: "",
        //收费信息
        sellerPrice: "",
        draweeName: "",
        draweePhoneNumber: "",
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
      },
      rules: {
        qqemail: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
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
<style>
.el-collapse-item__header {
  font-size: 18px;
  color: #409eff;
}
</style>
