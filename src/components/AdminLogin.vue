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
import md5 from "js-md5";
import { PostAdminLogin } from '../network/ElcRequest';

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
      console.log(this.account,this.psswd);
      this.mdPsswd=md5(this.psswd);
      PostAdminLogin("/admin/login",{
        data:{
          username:this.account,
          password:this.mdPsswd
        }
      }).then(res=>{
        console.log(res);
        if(res.data.code==="200"){
          //res.data.data 是管理员jwt
          this.result=res.data.message;
        }else{
          this.result="登录失败"//这里不知道message会不会包含密码错误和账户不存在等情况，如果有按照message显示
        }
      }).catch(err=>{
        console.log(err);
      })
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
