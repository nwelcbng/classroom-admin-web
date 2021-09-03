<template>
  <el-container>
    <el-aside id="side">
      <HomeUserInfo />
      <HomeOptions @toPage="goTo" />
    </el-aside>
    <el-container>
      <el-header>
        <el-page-header content="详情页面" @back="goBack"></el-page-header>
      </el-header>
      <el-main class="main">
        <transition name="el-fade-in-linear">
          <keep-alive >
            <router-view v-show="show"  />
          </keep-alive>
        </transition>
      </el-main>
      <el-footer>
        <!-- <router-link to="/about"><button>about</button></router-link> -->
        <Footer/>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
import HomeUserInfo from "@/components/common/aside/HomeUserInfo.vue";
import HomeOptions from "@/components/common/aside/HomeOptions.vue";
import Footer from "@/components/common/footer/Footer.vue"
export default {
  components: {
    HomeUserInfo,
    HomeOptions,
    Footer
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    goBack() {
      this.show = false;
      setTimeout(() => {
        history.back();
        // console.log(this.$route.path + "/" + this.$route.query.type);
        this.show = true;
      }, 300);
    },
    goTo(params) {
      this.show = false;
      if(this.$route.query.id){
        params.query.id = this.$route.query.id;
      } 
      // console.log(params);
      setTimeout(() => {
        this.$router.push(params);
        this.show = true;
      }, 300);
    },
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
  .el-aside{
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
