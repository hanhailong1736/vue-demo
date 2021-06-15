<template>
  <div class="login_container" v-loading="loading">
    <h2 class="title">Excel采集工具管理系统</h2>
    <div class="login_box">
      <!-- 头部区域 -->
      <!-- <div class="avatar_box">
        <img src="../img/dxlogo.png" alt="" />
      </div> -->
      <!-- <h3 class="title_tip">登录</h3> -->
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="account">
          <el-input v-model="loginForm.account"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="loginClick">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      // 登录表单数据
      loginForm: {
        account: "",
        password: ""
      },
      // 表单验证规则
      loginFormRules: {
        account: [
          { required: true, message: "请输入登录名称", trigger: "blur" }
          // { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
          // { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters([
      //这里是getter 定义导出的数据
      "crumb"
    ])
  },
  methods: {
    // 点击重置按钮  重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    // 登录前的预验证
    loginClick() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return false;
        this.submit();
      });
    },
    submit: function() {
      let that = this;
      this.loading = true;
      this.axios({
        method: "post",
        url: "/xiangkao/admin/login",
        data: this.loginForm
      })
        .then(function(res) {
          that.loading = false;
          if (res.data.data && res.data.data.token) {
            window.localStorage.setItem("token", res.data.data.token);
          }
          if (res.data.data && res.data.data.account) {
            window.localStorage.setItem("account",res.data.data.account);
          }
          that.$message({
            type: "success",
            message: "登录成功!"
          });
          that.$router.push("/index");
        })
        .catch(function(err) {
          that.loading = false;
        });
    }
  }
};
</script>
<style lang="postcss" scoped>
.login_container {
  background-color: rgba(228, 228, 228, 1);
  height: 100%;
  box-sizing: border-box;
}
.title {
  font-size: 40px;
  padding: 30px 0;
}

.login_box {
  width: 450px;
  height: 300px;
  border-radius: 3px;
  position: absolute;
  background-color: #fff;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  & .title_tip {
    margin-top: 30px;
    font-size: 25px;
  }
  & .avatar_box {
    width: 100px;
    height: 100px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    & img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
