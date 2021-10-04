<template>
  <el-container class="main-app">
    <el-aside id="side">
      <HomeUserInfo />
      <HomeOptions @toPage="goTo" />
    </el-aside>
    <el-container>
      <el-header>
        <el-page-header :content="nowPage" @back="goBack"></el-page-header>
      </el-header>
      <el-main class="main">
        <transition name="el-fade-in-linear">
          <keep-alive>
            <router-view v-show="show" @toPage="goTo" />
          </keep-alive>
        </transition>
      </el-main>
      <el-footer>
        <!-- <router-link to="/about"><button>about</button></router-link> -->
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
import HomeUserInfo from "@/components/common/aside/HomeUserInfo.vue";
import HomeOptions from "@/components/common/aside/HomeOptions.vue";
import Footer from "@/components/common/footer/Footer.vue";
export default {
  components: {
    HomeUserInfo,
    HomeOptions,
    Footer,
  },
  data() {
    return {
      show: true,
    };
  },
  computed: {
    nowPage(){
      switch(this.$route.path){
        case '/classroom': return '教室页面';
        case '/news': return '公告页面';
        case '/review': return '审核页面';
        case '/user': return '用户页面';
      }
    }
  },
  methods: {
    goBack() {
      this.show = false;
      new Promise((resolve) => {
        setTimeout(() => {
          history.back();
          resolve();
        }, 300);
      }).then(() => {
        setTimeout(() => {
          this.show = true;
        }, 100);
      });
    },
    goTo(params) {
      this.show = false;
      new Promise((resolve) => {
        setTimeout(() => {
          this.$router.push(params);
          resolve();
        }, 300);
      }).then(() => {
        setTimeout(() => {
          this.show = true;
        }, 100);
      });
    },
  },
  created() {
    // console.log(localStorage.jwt);
    // if (!localStorage.jwt) {
    //   this.$message({
    //     message: "未检测到有效登录信息，请重新登录",
    //     type: "warning",
    //   });
    //   setTimeout(() => (location.href = "/"), 2000);
    // }else{
    // }
  },
};
</script>

<style scoped>
@import url("~@/assets/css/base.css");
.el-footer {
  border-top: 1px solid #f1f1f1;
}
.el-header {
  border-bottom: 1px solid #f1f1f1;
}
.el-aside {
  color: #333;
  text-align: center;
  display: none;
}
@media screen and (min-width: 992px) {
  .el-aside {
    display: block;
  }
}
.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
}

body > .el-container {
  height: 100%;
  width: 100%;
}
.main {
  width: 100%;
  height: 100%;
}
.el-page-header {
  height: 100%;
  width: 100%;
  line-height: 100%;
  align-items: center;
}
</style>
