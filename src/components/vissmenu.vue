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
      <el-aside width="200px">
        <el-row class="tac">
          <el-col>
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <template v-for="(item, index) in menus.leftMenu">
                <el-menu-item :key="'m'+item.Id" v-if="item.Children.length==0" :index="'i'+index">
                  <!-- <i class="el-icon-menu"></i> -->
                  <router-link :to="item.Url.toLocaleLowerCase()">
                    <span>{{item.MenuName}}</span>
                  </router-link>
                </el-menu-item>
                <el-submenu v-else :key="'m'+item.Id" :index="'i'+index">
                  <template slot="title">
                    <!-- <i class="el-icon-location"></i> -->
                    <router-link :to="item.Url.toLocaleLowerCase()">
                      <span>{{item.MenuName}}</span>
                    </router-link>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item v-for="(item1,index1) in item.Children" :key="'m'+item1.Id" :index="index+'-'+index1">
                      <router-link :to="item1.Url.toLocaleLowerCase()">
                        <span>{{item1.MenuName}}</span>
                      </router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </template>
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
    this.loadData();
  },
  methods: {
    loadData: function() {
      this.$ajax
        .get("http://localhost:5618/api/Portal/Passport/GetMenus")
        .then(response => {
          this.menus = response;
          var routus = [];
          getRouter1(response.leftMenu, routus);
          console.log(routus);
          this.$router.addRoutes(routus);
        });
    },
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

function getRouter(menus) {
  var routus = [];
  for (let index = 0; index < menus.length; index++) {
    const element = menus[index];
    var path = element.Url.toLocaleLowerCase();
    console.log(path);
    routus.push({
      path: path,
      component: () => import("@/components" + path)
    });
    if (element.Children != 0) {
      getRouter(element.Children).map(c => {
        routus.push(c);
      });
    }
  }
  return routus;
}

function getRouter1(menus, routus) {
  for (let index = 0; index < menus.length; index++) {
    const element = menus[index];
    var arr = element.Url.toLocaleLowerCase().split("/");
    //一级
    var routuArr = routus.filter(c => {
      return c.path == "/" + arr[1];
    });
    var firstRoutu;
    if (routuArr.length == 0) {
      firstRoutu = {
        path: "/" + arr[1],
        component: {
          template: "<router-view></router-view>"
        },
        children: []
      };
      routus.push(firstRoutu);
    } else {
      firstRoutu = routuArr[0];
    }
    //二级
    routuArr = firstRoutu.children.filter(c => {
      return c.path == arr[2];
    });
    var secondRoutu;
    if (routuArr.length == 0) {
      secondRoutu = {
        path: arr[2],
        component: {
          template: "<router-view></router-view>"
        },
        children: []
      };
      firstRoutu.children.push(secondRoutu);
    } else {
      secondRoutu = routuArr[0];
    }
    //三级
    routuArr = secondRoutu.children.filter(c => {
      return c.path == arr[3];
    });
    var thirdRoutu;
    if (routuArr.length == 0) {
      thirdRoutu = {
        path: arr[3],
        component: resolve => require(["@/components" + element.Url.toLocaleLowerCase()], resolve)
      };
      secondRoutu.children.push(thirdRoutu);
    } else {
      thirdRoutu = routuArr[0];
    }

    if (element.Children != 0) {
      getRouter1(element.Children, routus);
    }
  }
}
</script>

