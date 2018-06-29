<template>
  <el-container>
    <el-header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table :data="tableData.Items" border style="width: 100%">
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
    </el-main>
  </el-container>

</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: {}
    };
  },
  created: function() {
    var vm = this;
    this.$ajax
      .post(
        "http://localhost:5618/api/Entrust/Entrust/GetHistoryList",
        {
          Order: {
            CreateTime: 0
          },
          Page: {
            PageIndex: 1,
            PageSize: "20"
          },
          Search: {
            EntrustTypes: [16941],
            //CreateUserIds: [8797104653716160576]
          }
        },
        {
          headers: {
            Authorization:
              "Basic YWRtaW46NmYxODI0MDAwYTZjYzBjYzJlZTIwOGQ1ZDdlYzM3NWU="
          }
        }
      )
      .then(response => {
        this.tableData = response.data.Data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>