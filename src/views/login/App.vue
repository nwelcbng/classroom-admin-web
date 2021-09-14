<template>
  <div>
    <div class="title">
      <span class="italic">GDUTELC</span> - 干事招新报名系统
    </div>
    <div id="cards">
      <card :contentTitle="contentTitle1" @getUUID="getUUID">
        <visitor-desc :UUID="UUID" :jwt="jwt" @goToUser="locTo('/user')"></visitor-desc>
      </card>
      <card :contentTitle="contentTitle2">
        <admin-login></admin-login>
      </card>
    </div>
    <div id="Inputs">
      <div id="UUIDInput">
        <el-input
          v-model="UUID"
          placeholder="模拟输入UUID"
          clearable
        ></el-input>
      </div>
      <el-input
        v-model="jwtInput"
        placeholder="模拟服务器返回的轮询数据"
        id="jwtInput"
        maxlength="10"
        clearable
        show-password
      ></el-input>
    </div>
    <el-button type="primary" @click="locTo('/admin')">admin</el-button>
    <el-button type="primary" @click="locTo('/user')">user</el-button>
    <el-button type="primary" @click="clearLocStore">清空localStorage</el-button>
  </div>
</template>

<script>
import AdminLogin from "@/components/AdminLogin.vue";
import Card from "@/components/Card.vue";
import VisitorDesc from "@/components/VisitorDesc.vue";
import { GetELCUUID, PostScanResult } from "./network/ElcRequest.js";
export default {
  components: { Card, VisitorDesc, AdminLogin },
  name: "App",
  data() {
    return {
      contentTitle1: "干事报名",
      contentTitle2: "审核入口",
      UUID: "",
      jwt: "null",
      jwtInput: "", //用于模拟服务器返回询问数据
      timer: null,
    };
  },
  methods: {
    getUUID() {
      //TODO 在这里获取UUID
      GetELCUUID()
        .then((res) => {
          if (res.data.code === 1) {
            this.UUID = res.data.data;
          } else {
            console.log(res);
            this.getUUID(); //失败后再次尝试获取UUID
          }
        })
        .catch((err) => {
          this.UUID = "远程服务器响应错误，请联系管理员" + err;
        });
      //开始轮询
      this.timer = setInterval(this.getJWT, 5000);
    },
    getJWT() {
      //TODO 发送请求
      console.log("begin ask");
      PostScanResult({
        uuid:this.UUID
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            //登录成功
            this.jwt = res.data.jwt;
            localStorage.setItem("jwt", res.data.data.jwt);
            console.log(localStorage.jwt,res.data.data.jwt);
            clearInterval(this.timer);
          }else{
            this.$message(res.msg);
        }
        })
        .catch((err) => {
          console.log(err);
        });
      if (this.jwtInput.includes("OK")) {
        this.jwt = this.jwtInput;
        console.log("jwt ok!");
        clearInterval(this.timer);
      }
      if (this.jwtInput.includes("FAIL")) {
        console.log("jwt FAIL!", this.jwtInput);
        clearInterval(this.timer);
        this.getUUID();
      }
    },
    locTo(url){
      location.href=url
    },
    clearLocStore(){
      localStorage.clear()
    }

  },
};
</script>

<style>
#UUIDInput {
  width: 300px;
  margin-left: 10px;
  margin-top: 5px;
}
.el-input__inner {
  background-color: rgba(255, 255, 255, 0.3);
}
#jwtInput {
  width: 300px;
  margin-left: 10px;
  margin-top: 5px;
  /* background-color: rgba(255, 255, 255, 0.3); */
}
body {
  background-image: linear-gradient(
    125deg,
    #fab1a0,
    #ffeaa7,
    #55efc4,
    #81ecec,
    #74b9ff,
    #a29bfe
  );
  background-size: 500% 500%;
  animation: slide 15s infinite;
}
@keyframes slide {
  0% {
    background-position: 0% 0%;
  }
  25% {
    background-position: 75% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 50% 75%;
  }
  100% {
    background-position: 0% 0%;
  }
}
.title {
  margin-top: 50px;
  font-size: 50px;
  letter-spacing: 10px;
  text-align: center;
  color: #ffffff99;
}
#cards {
  margin-top: 80px;
  display: flex;
  justify-content: space-around;
}
</style>
