<template>
  <div class="main-pannel" v-loading="loading">
    <div class="inputs">
      <el-input
        maxlength="20"
        v-model="username"
        placeholder="请输入账号"
      ></el-input>
      <el-input
        type="password"
        style="margin-top: 30px"
        maxlength="20"
        v-model="password"
        placeholder="请输入密码"
      ></el-input>
    </div>
    <div class="buttons">
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { login, test } from "../network/login";
export default {
  data() {
    return {
      username: "weq",
      password: "",
      loading: false,
    };
  },
  methods: {
    login() {
      let formDate = new FormData();
      formDate.append("username", this.username);
      formDate.append("password", this.password);
      this.loading = true;
      login(formDate)
        .then((res) => {
          if (res.code === 1) {
            localStorage.setItem("token", res.data);
            return test();
          } else {
            return {
              code: 400,
              msg: res.msg,
            };
          }
        })
        .then((res) => {
          if (res.code === 1) {
            this.$message("登录成功");
            localStorage.setItem("username", this.username);
            setTimeout(() => {
              location.href = "/admin";
            }, 1000);
          } else {
            localStorage.clear(token);
            this.$message(res.msg);
            this.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.$message("网络繁忙");
        });
    },
  },
};
</script>

<style>
.main-pannel {
  height: 300px;
  width: 700px;
  margin: 20px auto;
  margin-bottom: 0;
  border-radius: 20px;
  box-shadow: 0px 0px 20px grey;
  overflow: hidden;
}
.inputs {
  margin: 20px;
  margin-top: 70px;
}
.buttons {
  display: flex;
  justify-content: center;
}
</style>