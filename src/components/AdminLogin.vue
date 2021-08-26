<template>
  <div class="box">
    <div class="inputs">
      <div id="accountInput">
        <el-input
          v-model="account"
          placeholder="账号"
          prefix-icon="el-icon-user"
          clearable
        ></el-input>
      </div>
      <div id="psswdInput">
        <el-input
          v-model="psswd"
          placeholder="密码"
          prefix-icon="el-icon-lock"
          show-password
          clearable
        ></el-input>
      </div>
    </div>
    <span class="inputRst">{{result}}</span>
    <el-button id="login-btn" type="primary" round @click="login">登录</el-button>
  </div>
</template>

<script>
export default {
  name: "AdminLogin",
  data() {
    return {
      account: "",
      psswd: "",
      mdPsswd: "",
      result:"",
    };
  },
  methods:{
    login(){

    }
  }
};
</script>

<style>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.inputs {
  margin: 10px;
}
#accountInput {
  width: 250px;
  margin: 30px auto;
}
#psswdInput {
  width: 250px;
  margin: 50px auto;
}
.el-input__inner {
  background-color: rgba(255, 255, 255, 0.3);
  height: 50px;
  font-size: 20px;
}
#login-btn{
  width: 150px;
  background-color: rgba(255, 255, 255, 0.3);
  color: #7a737499;
  font-size: 20px;
}
.inputRst{
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  color: #7a737499;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 1px;
}
</style>
