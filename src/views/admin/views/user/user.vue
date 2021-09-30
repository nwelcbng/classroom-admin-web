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
      :titles="['用户id','用户名','学号','权限']"
      :props="['uid','username','sno','level']"
      :propsData="AllUsers"
      />
    </transition>
  </div>
</template>

<script>
import { getAllUsers } from "../../network/user"
import { fomatNetwork } from "../../serve/network"
import HomeTable from "@/components/home/home-main/HomeTable.vue";
export default {
  name: "user",
  components: {
    HomeTable,
  },
  data() {
    return {
      show: true,
      loading:false,
      TableDeafault:null,
      AllUsers:[]
    };
  },
  methods: {
    toPage(res) {
      console.log(res);
      this.$emit("toPage", res);
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
    fomatNetwork.call(this,getAllUsers).then(res => {
      this.AllUsers = res;
    })
  },
  activated(){
    
  }
};
</script>
  
<style scoped>
</style>

