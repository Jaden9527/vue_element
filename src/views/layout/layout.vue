<template>
  <div class="content">
    <el-container style="height: 100%;">
      <el-aside :width="asideWidth">
        <!-- logo -->
        <template>
          <div :class="logoClass">
            <img src="../../common/images/vueLogo.png" class="sidebar-logo">
            <h1 v-if="!isCollapsed" class="sidebar-title">{{ title }}</h1>
          </div>
        </template>
        <!-- 菜单 -->
        <el-menu
          :default-active="currentPageName"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapsed"
          :style="{width: asideWidth}"
          :unique-opened="!transition"
          :collapse-transition="transition"
        >
          <template v-for="item, index in routeList" v-if="item.show && !item.hidden">
            <el-menu-item v-if="item.children.length <= 1" :index="item.children[0].name">
              <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
              <span slot="title">{{item.children[0].meta.title}}</span>
            </el-menu-item>
            <el-submenu v-else :index="item.name">
              <template slot="title">
                <i v-if="item.meta.icon" :class="item.meta.icon"></i>
                <span>{{item.meta.title}}</span>
              </template>
              <template v-for="child in item.children" v-if="child.show && !child.hidden">
                <el-menu-item :index="child.name">
                  <i v-if="child.meta.icon" :class="child.meta.icon"></i>
                  <span>{{child.meta.title}}</span>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header :class="headerClass">
          <div class="flex-row flex-y-center">
            <div class="flex-grow-0">
              <hamburger
                id="hamburger-container"
                :is-active="!isCollapsed"
                class="hamburger-container"
                @toggleClick="toggleSideBar"
              />
            </div>
            <div class="flex-grow-1 tags-inner-scroll-body">
              <el-tag
                v-for="item in pageTagsList"
                :key="item.name"
                type=""
                size="small"
                effect="dark"
                style="margin-right:10px"
                :closable="item.name==='home'?false:true"
                @close="closePage(item)"
                @click="linkTo(item)"
                :class="item.children?(item.children[0].name===currentPageName?'tag-select':'tag'):(item.name===currentPageName?'tag-select':'tag')"
              >{{ item.meta.title }}</el-tag>
            </div>
            <div class="flex-grow-0" style="margin: 0px 10px;">
              <!-- 标签页清除 -->
              <el-dropdown @command="handleTagsOption">
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="clearAll">清除全部</el-dropdown-item>
                  <el-dropdown-item command="clearOthers">清除其他</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!-- 用户信息 -->
              <el-dropdown @command="handleClickUserDropdown">
                <template>
                  <div>
                    <img class="avatar" src="../../common/images/usericon.jpg" alt="">
                    <span style="padding-left:5px;color:#1890ff">{{userName}}</span>
                  </div>
                </template>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="UserProfile">个人信息</el-dropdown-item>
                  <el-dropdown-item command="loginout">注销</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-main
          :style="{margin: '60px 0 0', background: '#fafafa', height:'100%',overflow: 'hidden'}"
        >
          <div style="background:#fff;height:100%;width:100%;overflow: auto">
            <router-view :key="key"></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Hamburger from "./component/Hamburger";

export default {
  name: "Layout",
  components: {
    Hamburger
  },
  data() {
    return {
      isCollapsed: false,
      currentPageName: null,
      title: "Vue Element",
      transition: false
    };
  },
  computed: {
    asideWidth() {
      return this.isCollapsed ? "78px" : "200px";
    },
    headerClass() {
      return this.isCollapsed ? "collapsed-header" : "";
    },
    logoClass() {
      return ["logo", this.isCollapsed ? "collapsed-logo" : ""];
    },
    key() {
      return this.$route.fullPath;
    },
    userName() {
      return this.$store.getters.userName || "未登录";
    },
    /** 返回页签列表 */
    pageTagsList() {
      return this.$store.getters.pageOpenedList || [];
    },
    /** 根据路由生成菜单项 */
    routeList() {
      const route = this.$router.options.routes || [];
      this.$store.dispatch("GenerateRoutes", route);
      return this.$store.getters.routeList;
    }
  },
  methods: {
    toggleSideBar() {
      this.isCollapsed = !this.isCollapsed;
    },
    /** 选中菜单 */
    handleSelect(key, keyPath) {
      this.$router.push({ name: key });
    },
    /** 关闭所选页签 */
    closePage(event) {
      this.$store.commit("removeTag", event.name);
      let pageOpenedList = this.$store.state.app.pageOpenedList;
      if (this.currentPageName === event.name) {
        let lastPageName = "";
        if (pageOpenedList.length > 1) {
          lastPageName = pageOpenedList[pageOpenedList.length - 1].name;
        } else {
          lastPageName = pageOpenedList[0].name;
        }
        this.$router.push({
          name: lastPageName
        });
      }
    },
    /** 跳转所选标签页 */
    linkTo(item) {
      if (item.name != this.currentPageName) {
        this.$router.push({
          name: item.name
        });
      }
    },
    /** 清除页签 */
    handleTagsOption(command) {
      if (command === "clearAll") {
        this.$store.commit("clearAllTags");
        this.$router.push({
          name: "home"
        });
      } else {
        this.$store.commit("clearOtherTags", this);
      }
    },
    /** 用户信息/注销 */
    handleClickUserDropdown(name) {
      if (name === "UserProfile") {
      } else if (name === "loginout") {
        localStorage.removeItem("userName");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberMe");

        this.$router.replace({
          name: "login",
          query: {
            //路由传参时push和query搭配使用 ，作用时传递参数
            id: 1
          }
        });
      }
    }
  },
  created() {
    this.currentPageName = this.$route.name;
    let obj = {
      meta: this.$route.meta,
      path: this.$route.path,
      name: this.$route.name
    };
    this.$store.dispatch("GeneratePageOpenedList", obj);
  },
  mounted() {},
  /** 监听,当路由发生变化的时候执行 */
  watch: {
    $route(to, from) {
      if (to.name != this.currentPageName) {
        this.currentPageName = to.name;
        let obj = {
          meta: to.meta,
          path: to.path,
          name: to.name
        };

        this.$store.dispatch("GeneratePageOpenedList", obj);
      }
    }
  }
};
</script>

<style lang="less">
.tag i {
  color: black !important;
  background: #d8dce5 !important;
}
</style>


<style lang="less" scoped>
@import "../../common/style/flex.css";

.content {
  width: 100%;
  height: 100%;
}
.logo {
  padding: 5px 20px;
  background: #2b2f3a;
  display: flex;
  align-items: center;
}
.collapsed-logo {
  padding: 20px;
}
.sidebar-logo {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 12px;
}
.sidebar-title {
  display: inline-block;
  margin: 0;
  color: #fff;
  font-weight: 600;
  line-height: 50px;
  font-size: 14px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
.el-header {
  background-color: #fff;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 200px);
  //   -webkit-transition: width 0.28s;
  //   transition: width 0.28s;
}
.collapsed-header {
  width: calc(100% - 78px);
}

.tags-inner-scroll-body {
  white-space: nowrap;
  transition: left 0.3s ease;
  overflow-y: auto;
}

.tag-select {
  background: #409eff;
  color: #fff;
}

.tag {
  background: #fff;
  color: black;
  border: 1px solid #d8dce5;
}

.el-aside {
  overflow-x: hidden;
  background: #545c64;
  box-sizing: border-box;
}
.avatar {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  border-radius: 50%;
}
.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
</style>
