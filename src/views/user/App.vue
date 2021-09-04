<template>
  <div>
    <h1>这是个人界面</h1>
    <router-link to="/reg">报名表</router-link>
    <router-link to="/info">个人信息</router-link>
    <hr>
    <router-view></router-view>
  </div>

</template>

<script>
import InfoForm from "@/components/user/InfoForm.vue";
import RegForm from "@/components/user/RegForm.vue";
export default {
  components: { InfoForm , RegForm},
  name: "App",
  data() {
    return {

    };
  },
  methods: {

  },
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
