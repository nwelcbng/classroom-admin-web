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
      type="aid"
      v-show="show" 
      :loading="show"
      :titles="['oid','预约者id','sid','预约状态']"
      :props="['oid','subscriber_id','sid','status']"
      :propsData="AllReview"
      />
    </transition>
  </div>
</template>

<script>
import { getAllReview } from "../../network/review"
import { fomatNetwork } from "../../serve/network"
import HomeTable from "@/components/home/home-main/HomeTable.vue";
export default {
  name: "review",
  components: {
    HomeTable,
  },
  data() {
    return {
      show: true,
      loading:false,
      TableDeafault:null,
      AllReview:[]
    };
  },
  methods: {
    toPage(params) {
      console.log(params);
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
    fomatNetwork.call(this,getAllReview).then(res => {
      this.AllReview = res;
    })
  },
  activated(){
    console.log(this.$route.path)
  }
};
</script>
  
<style scoped>
</style>

