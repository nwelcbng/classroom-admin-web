<template>
  <div>
    <transition name="el-fade-in-linear">
      <el-skeleton :rows="20" animated v-show="loading" />
    </transition>
    <transition name="el-fade-in-linear">
      <HomeTable 
      @toPage="toPage"  
      @HomeSearch="search" 
      @HomeDelete="HomeDelete" 
      :hasSearch="true"
      type="教室id"
      v-show="show" 
      :loading="show"
      :titles="['aid','题目','日期']"
      :props="['aid','title','date']"
      :propsData="Allnews"
      />
    </transition>
  </div>
</template>

<script>
import { getAllNews } from "../../network/news"
import { fomatNetwork } from "../../serve/network"
import { convertDate } from "../../serve/data"
import HomeTable from "@/components/home/home-main/HomeTable.vue";
export default {
  name: "classroom",
  components: {
    HomeTable,
  },
  data() {
    return {
      show: true,
      loading:false,
      TableDeafault:null,
      Allnews:null
    };
  },
  methods: {
    toPage(params) {
      this.$emit("toPage", params);
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
  created() {
    fomatNetwork.call(this,getAllNews).then(res => {
      convertDate(res);
      this.Allnews = res;
    })
    // getAllNews().then(res => {
    //   console.log(res) 
    //   this.data.Allnews = res.announcements;
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  activated(){
    console.log(this.$route.path)
  }
};
</script>
  
<style scoped>
</style>

