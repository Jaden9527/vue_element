<template>
    <div class="content">
        <el-container style="height: 100%;">
            <el-aside :width="asideWidth">
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :collapse="isCollapsed"
                    :style="{width: asideWidth}"
                    unique-opened="true"
                    :collapse-transition="transition"
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
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
                        <div class="flex-grow-1"></div>
                        <div class="flex-grow-0" style="margin: 0px 10px;">
                            <el-dropdown>
                                <i class="el-icon-setting" style="margin-right: 15px"></i>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>查看</el-dropdown-item>
                                    <el-dropdown-item>新增</el-dropdown-item>
                                    <el-dropdown-item>删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <span>王小虎</span>
                        </div>
                    </div>
                </el-header>
                <el-main
                    :style="{margin: '80px 15px 15px', background: '#fff', minHeight: '260px',overflow: 'auto'}"
                >
                    <router-view></router-view>
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
      transition: false
    };
  },
  computed: {
    asideWidth() {
      return this.isCollapsed ? "78px" : "200px";
    },
    headerClass() {
      return this.isCollapsed ? "collapsed-header" : "";
    }
  },
  methods: {
    toggleSideBar() {
      this.isCollapsed = !this.isCollapsed;
    },
    /** 打开的菜单 */
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../common/style/flex.css";

.content {
  width: 100%;
  height: 100%;
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

.el-aside {
  overflow-x: hidden;
  background: #545C64;
  box-sizing: border-box;
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
