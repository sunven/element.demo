<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="onRoutes"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
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
        <el-menu-item
          index="3"
          disabled
        >消息中心</el-menu-item>
        <el-menu-item index="4">
          <a
            href="https://www.ele.me"
            target="_blank"
          >订单管理</a>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
            >
              <template v-for="(item, index) in menus.leftMenu">
                <el-menu-item
                  :key="'m'+item.Id"
                  v-if="item.Children.length==0"
                  :index="item.Url.toLocaleLowerCase()"
                >
                  <i class="el-icon-menu"></i>
                  <!-- <router-link :to="item.Url.toLocaleLowerCase()">
                    <span>{{item.MenuName}}</span>
                  </router-link> -->
                  {{item.MenuName}}
                </el-menu-item>
                <el-submenu
                  v-else
                  :key="'m'+item.Id"
                  :index="'i'+index"
                >
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    {{item.MenuName}}
                  </template>
                  <el-menu-item-group>
                    <el-menu-item
                      v-for="(item1) in item.Children"
                      :key="'m'+item1.Id"
                      :index="item1.Url.replace('/','').toLocaleLowerCase()"
                    >
                      <!-- <router-link :to="item1.Url.toLocaleLowerCase()">
                        <span>{{item1.MenuName}}</span>
                      </router-link> -->
                      {{item1.MenuName}}
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </template>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          @tab-remove="removeTab"
          @tab-click="clickTab"
        >
          <el-tab-pane
            v-for="(item,i) in tabs"
            :key="i"
            :closable="item.closable"
            :label="item.label"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>
        <el-main style="padding:4px;">
          <layout/>
        </el-main>
      </el-main>
    </el-container>
  </el-container>
</template>
<style scoped>
.el-header {
  padding: 0;
}
.el-main {
  padding: 4px;
}
</style>

<script>
import createList from "./entrust/createList";
import layout from './layout'
export default {
  components: {
    createList,layout
  },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      menus: {},
      editableTabsValue: "",
      tabs: [
        {
          closable: false,
          label: "Index",
          name: "/"
        }
      ]
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
          //var routus = getRouter(response.leftMenu);
          var routus = [];
          getRouter1(response.leftMenu, routus);
          // let root = [
          //   {
          //     path: "/",
          //     component: () => import("@/components/HelloWorld"),
          //     children: routus
          //   }
          // ];
          //console.log(routus)
          this.$router.addRoutes(routus);
        });
    },
    clickTab(tab) {
      this.$router.push(tab.name);
    },
    removeTab(tab) {
      let tabIndex = 0;
      let delItem;
      for (let index = 0; index < this.tabs.length; index++) {
        const element = this.tabs[index];
        if (element.name === tab) {
          tabIndex = index;
          delItem = this.tabs.splice(index, 1)[0];
          const item = this.tabs[tabIndex]
            ? this.tabs[tabIndex]
            : this.tabs[tabIndex - 1];
          if (item) {
            this.editableTabsValue = item.name;
            delItem.name === this.$route.fullPath &&
              this.$router.push(item.name);
          } else {
            this.editableTabsValue = "";
            this.tabs = [];
            this.$router.push("/");
          }

          return;
        }
      }
      //this.tabs = this.tabs.filter(c => c.name !== tab);
    },
    setTabs(route) {
      const isExist = this.tabs.some(item => {
        return item.name === route.fullPath;
      });
      if (!isExist) {
        this.tabs.push({
          closable: true,
          label: route.meta.title,
          name: route.fullPath
        });
        this.$router.push(route.fullPath);
      }
      this.editableTabsValue = route.fullPath;
      //bus.$emit("tags", this.tagsList);
    }
  },
  computed: {
    onRoutes() {
      //return this.$route.path.replace("/", "");
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTabs(newValue);
    }
  }
};

function getRouter(menus) {
  var routus = [];
  for (let index = 0; index < menus.length; index++) {
    const element = menus[index];
    var path = element.Url.toLocaleLowerCase();
    routus.push({
      path: path,
      meta: { title: element.MenuName },
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
        meta: { title: element.MenuName, keepAlive: true },
        component: layout,
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
        meta: { title: element.MenuName, keepAlive: true },
        component: layout,
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
        meta: { title: element.MenuName, keepAlive: true },
        component: resolve =>
          require(["@/components" + element.Url.toLocaleLowerCase()], resolve)
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

