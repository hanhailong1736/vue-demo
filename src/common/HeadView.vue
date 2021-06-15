<template>
  <div class="HeadViewPage">
    <div class="left">
      <!-- <img class="logo" src="../img/logo.png" alt srcset /> -->
      <span class="title">后台管理系统Demo</span>
    </div>
    <div class="right">
      <!-- <img class="user_icon" v-if="isLogin" src="../img/user.png" alt srcset /> -->
      <span class="login" v-if="!isLogin" @click="loginClick()">登录</span>
      <div class="dropdown" v-else>
        <div class="dropbtn">
          {{ loginName }}
          <img class="arrow" src="../img/down.png" alt srcset />
        </div>
        <!-- <div class="dropdown-content">
          <router-link :to="{ name: 'personal' }" replace>个人资料</router-link>
          <a @click="logoutClick()" href="javascript:void(0)">退出</a>
        </div> -->
      </div>
    </div>
    <div v-if="showLoginView" class="loginView">
      <div class="mark" @click="loginViewHide"></div>
      <div class="login_mark">
        <i class="el-icon-close close_icon" @click="loginViewHide"></i>
        <el-input
          class="loginName"
          placeholder="请输入用户名"
          v-model="loginName"
          clearable
        ></el-input>
        <el-input
          class="loginName"
          placeholder="请输入密码"
          v-model="password"
          show-password
        ></el-input>
        <el-button class="login_button" type="primary" @click="submitClick"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
// import Toast from "../components/Toast";
import "./HeadView.css";
export default {
  components: {},
  name: "HeadView",
  data() {
    return {
      isLogin: false,
      loginName: "",
      password: "",
      showLoginView: false,
      loading: false
    };
  },
  props: {},
  computed: {
    ...mapGetters([
      //这里是getter 定义导出的数据
      "userInfo"
    ])
  },
  methods: {
    ...mapActions([
      //这里是 action 的具体方法名
      "getUserInfo"
    ]),
    loginClick: function() {
      this.showLoginView = true;
    },
    loginViewHide: function() {
      this.showLoginView = false;
    },
    submitClick: function() {
      var that = this;
      if (!this.loginName) {
        // Toast("请输入用户名");
        return;
      }
      if (!this.password) {
        // Toast("请输入用户名密码");
        return;
      }
      if (this.loading) {
        return;
      }
      this.loading = true;
      axios({
        method: "post",
        url: "/login/login",
        data: {
          account: this.loginName,
          password: this.password
        }
      })
        .then(function(res) {
          that.loading = false;
          if (res.data && !res.data.error_code) {
            if (res.data.data && res.data.data.token) {
              window.localStorage.setItem("token", res.data.data.token);
            }
            that.$message({
              type: "success",
              message: "登录成功!"
            });
            that.isLogin = true;
            that.loginName = res.data.data.userInfo.account;
            that.showLoginView = false;
          } else {
            // Toast(res.data.message);
          }
        })
        .catch(function(err) {
          that.loading = false;
          // Toast("接口异常，请稍后再试");
        });
    },
    logoutClick: function() {
      localStorage.clear();
      location.reload();
    }
  },
  watch: {
    userInfo: function(newVal) {
      if (newVal && newVal.account) {
        this.isLogin = true;
        this.loginName = newVal.account;
      } else {
        this.isLogin = false;
        this.loginName = "";
      }
    }
  },
  created() {
    if (this.userInfo&&this.userInfo.account) {
      this.isLogin = true;
      this.loginName = this.userInfo.account;
    } else {
      // this.getUserInfo();
    }
  },
  mounted() {}
};
</script>
