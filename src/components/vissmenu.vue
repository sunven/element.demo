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
      <el-aside width="300px">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <el-submenu :key="'m'+item.Id" v-for="(item, index) in menus.leftMenu" :index="'i'+index">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <router-link :to="item.Url"><span>{{item.MenuName}}</span></router-link>
                </template>
                <el-menu-item-group>
                  <el-menu-item v-for="(item1,index1) in item.Children" :key="'m'+item1.Id" :index="index+'-'+index1">
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
  created: function() {
    var vm = this;
    this.$ajax
      .get("http://localhost:5618/api/Portal/Passport/GetMenus", {
        headers: {
          Authorization:
            "Basic YWRtaW46NmYxODI0MDAwYTZjYzBjYzJlZTIwOGQ1ZDdlYzM3NWU="
        }
      })
      .then(response => {
        this.menus = response.data.Data;
        // let extendsRoutes = response.data.Data.leftMenu.map(c => {
        //   return {
        //     path: c.Url,
        //     component: { template: "<div>" + c.Url + "</div>" }
        //     //component: (resolve) => require(['./entrust/createList'], resolve)
        //   };
        // });
        //vm.$router.addRoutes(getRouter(response.data.Data.leftMenu));
      })
      .catch(function(error) {
        console.log(error);
      });
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

function getRouter(meuns) {
  let routes = meuns.map(c => {
    return {
      path: c.Url.substr(1,c.Url.lastIndexOf('/')-1),
      component: { template: "<div>" + c.Url + "</div>" },
      children: c.Children.map(p => {
        return {
          path: p.Url.substr(1),
          component: { template: "<div>" + p.Url + "</div>" }
        };
      })
    };
  });
  var arr = [
    { path: '/', redirect: '/entrust' },
    {
      path: "/entrust",
      component: { template: "<div>entrust</div>" },
      children: routes
    }
  ];
  console.log(arr);
  return arr;
}
</script>

