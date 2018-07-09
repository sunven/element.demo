<template>
  <el-container>
    <el-header height="120px">
      <el-form :inline="true" :model="fromSearchData" class="demo-form-inline">
        <el-form-item label="业务状态">
          <el-select v-model="fromSearchData.searchState" clearable placeholder="请选择">
            <el-option v-for="item in formInitData.searchState" :key="item.Value" :label="item.Description" :value="item.Value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物业类型">
          <el-select v-model="fromSearchData.propertyType" clearable placeholder="请选择">
            <el-option v-for="item in formInitData.propertyType" :key="item.Id" :label="item.DictText" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在区县">
          <el-cascader :options="formInitData.province" @active-item-change="handleItemChange" :props="formSettings.provinceProps"></el-cascader>
        </el-form-item>
        <el-form-item label="单据类型">
          <el-select v-model="fromSearchData.entrustType" clearable placeholder="请选择">
            <el-option v-for="item in formInitData.entrustType" :key="item.Value" :label="item.Description" :value="item.Value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker v-model="fromSearchData.createTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="询价机构">
          <el-popover placement="bottom" width="160" v-model="visible2">
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
            <el-tree node-key="Id" :data="formInitData.company" :props="formSettings.companyProps" :check-strictly="true" @node-click="handleNodeClick" :render-content="renderContent">
            </el-tree>
            <el-input slot="reference">删除</el-input>
          </el-popover>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <treenode vif="true" checkboxmodel="true" :nodelabel="checked"></treenode>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="Number" label="编号" width="150">
        </el-table-column>
        <el-table-column prop="StateName" label="状态" width="120">
        </el-table-column>
        <el-table-column prop="SysOrgName" label="当前处理机构" width="120">
        </el-table-column>
        <el-table-column prop="ProvinceName" label="省" width="120">
        </el-table-column>
        <el-table-column prop="CityName" label="市" width="300">
        </el-table-column>
        <el-table-column prop="CountyName" label="取" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </el-main>
  </el-container>

</template>

<script>


export default {
  //components: { treenode },
  data() {
    return {
      checked: false,
      visible2: false,
      formSettings: {
        provinceProps: {
          label: "DictText",
          value: "Id",
          children: "Children"
        },
        companyProps: {
          children: "Children",
          label: "Name"
        }
      },
      formInitData: {
        searchState: [],
        propertyType: [],
        entrustType: [],
        province: [],
        company: []
      },
      fromSearchData: {
        searchState: "",
        propertyType: "",
        entrustType: "",
        createTime: "",
        province: "",
        company: ""
      },
      tableData: [],
      pageIndex: 1,
      pageSize: 20,
      totalCount: 0
    };
  },
  created: function() {
    this.loadSearchForm();
    this.loadData();
  },
  methods: {
    loadSearchForm: function() {
      this.$ajax.get("api/Entrust/Entrust/GetSearchForm").then(response => {
        this.formInitData = response;
      });
    },
    loadData: function() {
      var vm = this;
      this.$ajax
        .post("http://localhost:5618/api/Entrust/Entrust/GetHistoryList", {
          Order: {
            CreateTime: 0
          },
          Page: {
            PageIndex: vm.pageIndex,
            PageSize: vm.pageSize
          },
          Search: {
            EntrustTypes: [16941]
            //CreateUserIds: [8797104653716160576]
          }
        })
        .then(response => {
          this.tableData = response.Items;
          this.totalCount = response.TotalItemCount;
        });
    },
    onSubmit() {
      console.log(this.fromSearchData.createTime);
      this.loadData();
    },
    handleClick(row) {
      console.log(row);
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
      console.log("active item:", val);
      var selectOption;
      var optionDatas = this.formInitData.province;
      for (let index = 0; index < val.length; index++) {
        const element = val[index];
        selectOption = optionDatas.filter(c => {
          return c.Id === element;
        })[0];
        optionDatas = selectOption.Children;
      }
      this.$ajax
        .get("api/Common/Common/GetArea", { params: { id: selId } })
        .then(response => {
          selectOption.Children = response;
        });
    },
    handleNodeClick(data) {
      //this.visible2=false;
      console.log(data);
    },
    renderContent(h, { node, data, store }) {
      return (
        <treenode vif="!(data.ParentId==0||data.Type==3||data.Type==4||data.Type==0||data.Type==-1)" propchecked="true" nodelabel="checked"></treenode>
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