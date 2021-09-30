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
      type="aid"
      v-show="show" 
      :loading="show"
      :titles="['aid','题目','日期']"
      :props="['aid','title','date']"
      :propsData="Allnews"
      :searchData="searchData"
      />
    </transition>
  </div>
</template>

<script>
import { getAllNews,searchNews,deleteNews } from "../../network/news"
import { fomatNetwork } from "../../serve/network"
import { convertDate,deleteItem } from "../../serve/data"
import HomeTable from "@/components/home/home-main/HomeTable.vue";
export default {
  name: "news",
  components: {
    HomeTable,
  },
  data() {
    return {
      show: true,
      loading:false,
      TableDeafault:null,
      Allnews:null,
      searchData:null,
      isDeleting:false
    };
  },
  methods: {
    toPage(params) {
      console.log(params);
      this.$emit("toPage", params);
    },
    search(query){
      //发送搜索网络请求
      this.loading = true;
      fomatNetwork.call(this,searchNews,query).then(res => {
        this.loading = false;
        let result = [res];
        convertDate(result);
        this.searchData = result;
      })
    },
    HomeDelete(query){
      //发送删除网络请求
      if(this.isDeleting){
        this.$notify({
          title: '提示信息',
          message: '请不要频繁操作',
          position: 'bottom-right'
      });
        return;
      }
      this.isDeleting = true;
      this.$notify({
        title: '提示信息',
        message: '删除中',
        position: 'bottom-right'
      });
      fomatNetwork.call(this,deleteNews,query).then(res => {
        this.isDeleting = false;
        this.$notify({
          title: '操作结果',
          message: '删除完成',
          position: 'bottom-right'
        });    
        deleteItem(this.Allnews,'aid',query);
        deleteItem(this.searchData,'aid',query);
      }).finally(() => {
        this.isDeleting = false;        
      })
    }
  },
  created() {
    fomatNetwork.call(this,getAllNews).then(res => {
      convertDate(res);
      this.Allnews = res;
    })
  },
  activated(){
    console.log(this.$route.path)
  }
};
</script>
  
<style scoped>
</style>

