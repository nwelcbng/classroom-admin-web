<template>
  <div>
    <transition name="el-fade-in-linear">
      <el-skeleton :rows="20" animated v-show="loading" />
    </transition>
    <transition name="el-fade-in-linear">
      <HomeTable @toPage="toPage" @HomeSearch="search" @HomeDelete="HomeDelete" v-show="show" :loading="show"/>
    </transition>
  </div>
</template>

<script>
import HomeTable from "@/components/home/home-main/HomeTable.vue";
export default {
  name: "Home",
  components: {
    HomeTable,
  },
  data() {
    return {
      show: true,
      loading:false
    };
  },
  methods: {
    toPage(params) {
      console.log(params);
      this.$emit("toPage", params);
    },
    created() {
      console.log("home create");
    },
    search(){
      this.show = false;
      //发送网络请求
      setTimeout(() => {
        this.loading = true;
      }, 500);
    },
    HomeDelete(){
      console.log("delete")
    }
  },
};
</script>
  
<style scoped>
</style>

