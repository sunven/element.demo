<template>
  <el-container>
    <el-header height="150px">
      <el-container>
        <el-main>
          <el-form
            :inline="true"
            size="mini"
            :model="fromSearchData"
            class="demo-form-inline"
          >
            <el-form-item label="业务状态">
              <el-select
                v-model="fromSearchData.searchState"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in formInitData.searchState"
                  :key="item.Value"
                  :label="item.Description"
                  :value="item.Value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物业类型">
              <el-select
                v-model="fromSearchData.propertyType"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in formInitData.propertyType"
                  :key="item.Id"
                  :label="item.DictText"
                  :value="item.Id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所在区县">
              <!-- <el-cascader :options="formInitData.province" @active-item-change="handleItemChange" :props="provinceProps"></el-cascader> -->
              <regionSelect v-model="fromSearchData.regionData"></regionSelect>
            </el-form-item>
            <el-form-item label="单据类型">
              <el-select
                v-model="fromSearchData.entrustType"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in formInitData.entrustType"
                  :key="item.Value"
                  :label="item.Description"
                  :value="item.Value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="fromSearchData.createTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="进件时间">
              <el-date-picker
                v-model="fromSearchData.incomingTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="分组号">
              <el-input v-model="fromSearchData.groupNumber">{{fromSearchData.groupNumber}}</el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="fromSearchData.comCondition">{{fromSearchData.comCondition}}</el-input>
            </el-form-item>
            <el-form-item label="询价机构">
              <el-popover
                placement="bottom"
                width="160"
                v-model="visible2"
              >
                <!-- <el-tree node-key="Id" :data="formInitData.company" :props="formSettings.companyProps" :check-strictly="true" @node-click="handleNodeClick">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                  <span v-if="!(data.ParentId==0||data.Type==3||data.Type==4||data.Type==0||data.Type==-1)">
                    <el-checkbox v-model="checked"></el-checkbox>
                  </span>
                  <span>{{ node.label }}</span>
                </span>
              </span>
            </el-tree> -->
                <el-tree
                  node-key="Id"
                  :data="formInitData.company"
                  :props="companyProps"
                  :expand-on-click-node="false"
                  show-checkbox
                  @check="companyHandleCheck"
                >
                </el-tree>
                <el-input
                  v-model="fromSearchData.ListCompanyName"
                  :disabled="true"
                  slot="reference"
                >{{fromSearchData.ListCompanyName}}</el-input>
              </el-popover>
            </el-form-item>
            <el-form-item label="询价人">
              <el-popover
                placement="bottom"
                width="160"
                v-model="visible1"
              >
                <el-tree
                  node-key="Id"
                  :data="formInitData.ListInquirerId"
                  :props="companyProps"
                  :expand-on-click-node="false"
                  show-checkbox
                  @check="inquirerHandleCheck"
                >
                </el-tree>
                <el-input
                  v-model="fromSearchData.ListInquirerName"
                  :disabled="true"
                  slot="reference"
                >{{fromSearchData.ListInquirerName}}</el-input>
              </el-popover>
            </el-form-item>
            <el-form-item label="委托方机构">
              <el-popover
                placement="bottom"
                width="160"
                v-model="entrustOrgVisible"
              >
                <el-tree
                  node-key="Id"
                  :data="formInitData.company"
                  :props="companyProps"
                  :expand-on-click-node="false"
                  show-checkbox
                  @check="entrustOrgHandleCheck"
                >
                </el-tree>
                <el-input
                  v-model="fromSearchData.ListEntrustOrgName"
                  :disabled="true"
                  slot="reference"
                >{{fromSearchData.ListEntrustOrgName}}</el-input>
              </el-popover>
            </el-form-item>
            <el-form-item label="委托方联系人">
              <el-input v-model="fromSearchData.entrustLinkman">{{fromSearchData.entrustLinkman}}</el-input>
            </el-form-item>
            <el-form-item label="需现场查勘">
              <!-- <el-radio v-model="radio" label="1">是</el-radio>
          <el-radio v-model="radio" label="2">否</el-radio> -->
              <!-- <el-select v-model="fromSearchData.isOrientation" clearable placeholder="请选择">
                <el-option v-for="item in formInitData.isOrientation" :key="item.value" :label="item.label" :value="item.Value">
                </el-option>
              </el-select> -->
              <el-radio
                v-model="radio"
                label="1"
              >是</el-radio>
              <el-radio
                v-model="radio"
                label="2"
              >否</el-radio>
            </el-form-item>
            <el-form-item label="价值时点">
              <el-date-picker
                v-model="fromSearchData.timePoint"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmit"
              >查询</el-button>
              <el-button
                type="primary"
                @click="onAdd"
                size="mini"
              >Add</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-header>
    <el-main>
      <create
        :dialogVisible="dialogAddVisible"
        @changeVisible="getVisible"
      ></create>
      <el-table
        size="mini"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="StateName"
          label="状态"
          width="70"
        >
        </el-table-column>
        <el-table-column
          prop="Number"
          label="编号"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="EntrustTypeName"
          label="评估类型"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="ProductName"
          label="单据类型"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="PropertyTypeDisplayName"
          label="物业类型"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="CompanyNameAndDeptName"
          label="询价机构"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="DetailAddress"
          :show-overflow-tooltip="true"
          label="物业地址"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="CreateTime"
          label="创建时间"
          :formatter="dateFormat"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="FloorAcreage"
          label="建筑面积"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="LandAcreage"
          label="土地面积"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="ProjectName"
          label="所属项目"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="ProvinceName"
          label="省"
          width="70"
        >
        </el-table-column>
        <el-table-column
          prop="CityName"
          label="市"
          width="70"
        >
        </el-table-column>
        <el-table-column
          prop="CountyName"
          label="区"
          width="70"
        >
        </el-table-column>
        <el-table-column
          prop="Proposer"
          label="贷款申请人"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="InquirerName"
          label="询价人"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="EntrustOrgName"
          label="委托方机构"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="EntrustLinkman"
          label="委托方联系人"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="IsOrientation"
          label="是否需查勘"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="SysUserName"
          label="当前处理人"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="TimePoint"
          label="价值时点"
          :formatter="dateFormat"
          width="160"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
            >查看</el-button>
            <el-button
              type="text"
              size="small"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[15, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </div>
    </el-main>
  </el-container>

</template>

<script>
import { format, compareAsc } from "date-fns";

import treenode from "./treenode";
import create from "./create";
import regionSelect from "./../../common/regionSelect";

import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

export default {
  components: { treenode, create, regionSelect },
  data() {
    return {
      radio: 1,
      dialogAddVisible: false,
      checked: false,
      visible1: false,
      visible2: false,
      entrustOrgVisible: false,
      formSettings: {},
      formInitData: {
        searchState: [],
        propertyType: [],
        entrustType: [],
        province: [],
        company: [],
        ListInquirerId: [],
        isOrientation: []
      },
      fromSearchData: {
        regionData: [],
        searchState: "",
        propertyType: "",
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
      tableData: [],
      pageIndex: 1,
      pageSize: 15,
      totalCount: 0
    };
  },
  computed: {
    ...mapState({
      companyTreeData: state => state.entrust_store.companyTreeData,
      companyProps: state => state.entrust_store.companyProps,
      provinceProps: state => state.entrust_store.provinceProps
      //currentRegionData: state => state.global_store.currentRegionData
    }),
    ...mapGetters(["getData"])
  },
  created: function() {
    this.loadSearchForm();
    this.loadData();
  },
  methods: {
    ...mapMutations(["addRegionData"]),
    ...mapActions(["initData", "getRegionDataAsync"]),
    loadSearchForm: function() {
      this.$ajax.get("api/Entrust/Entrust/GetSearchForm").then(response => {
        this.initData(response);
        this.addRegionData({
          pId: 0,
          data: response.province
        });
        this.formInitData = response;
        this.formInitData.isOrientation = [
          {
            value: "true",
            label: "是"
          },
          {
            value: "false",
            label: "否"
          }
        ];
      });
    },
    loadData: function() {
      var vm = this;
      this.$ajax
        .post("api/Entrust/Entrust/GetHistoryList", {
          Order: {
            CreateTime: 0
          },
          Page: {
            PageIndex: vm.pageIndex,
            PageSize: vm.pageSize
          },
          Search: this.fromSearchData
        })
        .then(response => {
          this.tableData = response.Items;
          this.totalCount = response.TotalItemCount;
        });
    },
    onAdd() {
      this.dialogAddVisible = true;
    },
    onSubmit() {
      console.log(this.fromSearchData.createTime);
      this.loadData();
    },
    handleClick(row) {
      this.dialogAddVisible = true;
      console.log(this.dialogAddVisible);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.loadData();
    },
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
      var regionData = this.getData(selId);
      if (regionData == null) {
        this.getRegionDataAsync(selId).then(response => {
          this.addRegionData({
            pId: selId,
            data: response
          });
          selectOption.Children = this.getData(selId).data;
        });
      } else {
        selectOption.Children = regionData.data;
      }
    },
    companyHandleCheck(data, data1) {
      this.fromSearchData.ListCompanyId = data1.checkedKeys;
      var names = data1.checkedNodes.map(c => {
        return c.Name;
      });
      this.fromSearchData.ListCompanyName = names.join();
      //
      this.$ajax
        .get("api/Common/Common/GetCustomUser", {
          params: { companyIdString: this.fromSearchData.ListCompanyId.join() }
        })
        .then(response => {
          this.formInitData.ListInquirerId = response;
        });
    },
    inquirerHandleCheck(data, data1) {
      this.fromSearchData.ListInquirerId = data1.checkedKeys;
      var names = data1.checkedNodes.map(c => {
        return c.Name;
      });
      this.fromSearchData.ListInquirerName = names.join();
    },
    entrustOrgHandleCheck(data, data1) {
      this.fromSearchData.ListEntrustOrgId = data1.checkedKeys;
      var names = data1.checkedNodes.map(c => {
        return c.Name;
      });
      this.fromSearchData.ListEntrustOrgName = names.join();
    },
    getVisible: function(value) {
      this.dialogAddVisible = value;
    },
    dateFormat: function(row, column, cellValue, index) {
      //2018-05-02T10:19:56.05
      return format(cellValue, "YYYY-MM-DD HH:mm:ss");
    },
    renderContent(h, { node, data, store }) {
      return (
        <treenode
          vif={
            !(
              data.ParentId == 0 ||
              data.Type == 3 ||
              data.Type == 4 ||
              data.Type == 0 ||
              data.Type == -1
            )
          }
          propchecked={false}
          nodelabel={node.label}
        />
      );
      // if (
      //   data.ParentId == 0 ||
      //   data.Type == 3 ||
      //   data.Type == 4 ||
      //   data.Type == 0 ||
      //   data.Type == -1
      // ) {
      //   return (
      //     <span class="custom-tree-node">
      //       <span>{node.label}</span>
      //     </span>
      //   );
      // } else {
      //   return (
      //     <span class="custom-tree-node">
      //       <span>
      //         <el-checkbox v-model="checked" />
      //       </span>
      //       <span>{node.label}</span>
      //     </span>
      //   );
      // }
    }
  }
};
</script>