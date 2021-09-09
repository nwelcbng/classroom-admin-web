<template>
  <div>
    <div class="side-bar">
      <el-button @click="goTo('reg')" class="side-btn">报名表</el-button>
      <el-button @click="goTo('info')" class="side-btn">个人信息</el-button>
    </div>
    <div class="card">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    console.log(localStorage.jwt);
    if (!localStorage.jwt) {
      this.$message({
        message: "未检测到有效登录信息，请重新登录",
        type: "warning",
      });
      setTimeout(() => (location.href = "/"), 2000);
    }
  },
  methods: {
    goTo(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style>
.card {
  position: sticky;
  max-width: 1000px;
  min-width: 500px;
  margin: 200px auto;
}
.side-bar {
  display: inline-block;
  width: 150px;
  position: fixed;
  top: 30px;
  left: 0px;
}
.side-btn {
  width: 100px;
  height: 50px;
  margin: 10px !important;
}
.side-bar .el-button {
  background-color: rgba(255, 255, 255, 0.3) !important;
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
</style>
