<template>
  <div class="container">
    <div class="content">
      <div class="main mainBorder">
        <p style="text-align: center;">
          <span class="systemName">Vue Element
            <br>Management System
          </span>
        </p>
        <el-form
          :model="loginModel"
          status-icon
          :rules="rules"
          ref="loginModel"
          label-width="0px"
          class="demo-ruleForm"
        >
          <el-form-item prop="userName">
            <el-input placeholder="用户名" v-model="loginModel.userName">
              <template slot="prepend">
                <i class="el-icon-user-solid icon-i"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="用户密码"
              v-model="loginModel.password"
              type="password"
              show-password
              autocomplete="off"
            >
              <template slot="prepend">
                <i class="el-icon-lock icon-i"></i>
              </template>
            </el-input>
          </el-form-item>
          <div>
            <el-checkbox v-model="loginModel.rememberMe">记住密码</el-checkbox>
            <a style="float:right;font-size: 14px;margin-top: 3px;color:#1890ff;">
              <span>忘记密码</span>|
              <span @click="register">注册</span>
            </a>
          </div>
          <div style="margin-top:15px">
            <el-button type="primary" @click="login()">提交</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginModel: {
        userName: "",
        password: "",
        rememberMe: false
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      redirect: null,
      otherQuery: {
        query: null,
        params: null
      }
    };
  },
  methods: {
    login() {
      let vm = this;
      vm.$refs.loginModel.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "登录中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          vm.$store
            .dispatch("login", vm.loginModel)
            .then(() => {
              setTimeout(function() {
               loading.close();
                vm.$router.replace({
                  path: vm.redirect || "/",
                  query: vm.otherQuery.query
                    ? JSON.parse(vm.otherQuery.query)
                    : null,
                  params: vm.otherQuery.params
                    ? JSON.parse(vm.otherQuery.params)
                    : null
                });
              }, 1000);
            })
            .catch(err => {
              loading.close();
              console.log("loginFail", err);
            });
        }
      });
    },
    register() {
      this.$router.push({ path: "/register" });
    }
  },
  watch: {
    /** 监听路由是否有重定向  */
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery.query = query.query;
          this.otherQuery.params = query.params;
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
form {
  margin-top: 20px;
}
.mainBorder {
  width: 420px;
  border-radius: 10px;
  background-color: #fff;
  padding: 30px 40px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 10px;

  .systemName {
    font-weight: 700;
    color: #1890ff;
    line-height: 36px;
    font-size: 28px;
  }
  .EnglishSystemName {
    font-weight: 400;
    font-size: 20px;
    color: #1890ff;
    line-height: 36px;
  }
}
.container {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-height: 100%;
  background: #f0f2f5;
}
@media (min-width: 768px) {
  .container {
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
    font-size: 18px;
  }
}
.content {
  padding: 32px 0;
  -ms-flex: 1 1 0%;
  flex: 1 1 0%;
}
.main {
  width: 368px;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .content {
    padding: 140px 0 24px;
  }
}
.top {
  text-align: center;
}
.header {
  height: 44px;
  line-height: 44px;
}
.logo {
  height: 44px;
  vertical-align: top;
  margin-right: 16px;
}
.title {
  font-size: 33px;
  color: rgba(0, 0, 0, 0.85);
  font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}
.desc {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 12px;
  margin-bottom: 40px;
}
.tenant-title {
  margin-bottom: 24px;
  text-align: center;
}

.el-button--primary {
  width: 100%;
}

.icon-i{
  font-size: 20px;
}
</style>