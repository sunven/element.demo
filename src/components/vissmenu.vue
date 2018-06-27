<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4">
          <a href="https://www.ele.me" target="_blank">订单管理</a>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="400px">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <el-submenu :key="item.Id" v-for="(item, index) in menus.leftMenu" :index="index">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item.MenuName}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item v-for="(item1,index1) in item.Children" :key="item1.Id" :index="index+'-'+index1">
                    <router-link :to="item1.Url">{{item1.MenuName}}</router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <!-- <component v-bind:is="currentTabComponent" class="tab"></component> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import createList from "./entrust/createList";

export default {
  components: {
    createList
  },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      menus: {}
    };
  },
  mounted: function() {
    this.$ajax
      .get("http://localhost:5618/api/Portal/Passport/GetMenus", {
        headers: {
          Authorization:
            "Basic YWRtaW46NmYxODI0MDAwYTZjYzBjYzJlZTIwOGQ1ZDdlYzM3NWU="
        }
      })
      // .then(function(response) {
      //   console.log(response);
      //   this.menus = response.data.Data;
      // })
      .then(response => {
        console.log(response);
        this.menus = response.data.Data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  computed: {
    currentTabComponent: function() {
      return "createList";
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};

// [
//         {
//           id: 1,
//           name: "A",
//           children: [
//             {
//               id: 10,
//               name: "A-1"
//             }
//           ]
//         },
//         {
//           id: 2,
//           name: "B",
//           children: [
//             {
//               id: 20,
//               name: "B-1"
//             }
//           ]
//         }
//       ]
</script>

