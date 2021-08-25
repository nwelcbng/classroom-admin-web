<template>
  <div>
    <div class="title">
      <span class="italic">GDUTELC</span> - 干事招新报名系统
    </div>
    <div id="cards">
      <card :contentTitle="contentTitle1" @getUUID="getUUID">
        <visitor-desc :UUID="UUID"></visitor-desc>
      </card>
      <card :contentTitle="contentTitle2">
        <admin-login></admin-login>
      </card>
    </div>
    <input type="text" v-model="UUID">
  </div>
</template>

<script>
import AdminLogin from "./components/AdminLogin.vue";
import Card from "./components/Card.vue";
import VisitorDesc from "./components/VisitorDesc.vue";
export default {
  components: { Card, VisitorDesc, AdminLogin },
  name: "App",
  data() {
    return {
      contentTitle1: "干事报名",
      contentTitle2: "审核入口",
      UUID:"获取中"
    };
  },
  methods:{
    getUUID(){
      console.log("f get");
      //TODO 在这里获取UUID
      setTimeout(()=>{this.UUID="test UUID";},1000);
    }
  }
};
</script>

<style>
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
  /* animation: slide 15s infinite; */
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
