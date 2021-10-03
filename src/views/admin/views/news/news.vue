<template>
  <div>
    <transition name="el-fade-in-linear">
      <el-skeleton :rows="20" animated v-show="loading" />
    </transition>
    <transition name="el-fade-in-linear">
      <HomeTable
        @showDetail="showDetail"
        @HomeSearch="search"
        @HomeDelete="HomeDelete"
        :hasSearch="true"
        type="aid"
        v-show="show"
        :loading="show"
        :titles="['aid', '题目', '日期']"
        :props="['aid', 'title', 'date']"
        :propsData="newsNow"
        :searchData="searchData"
      >
        <el-button slot="add-button" @click="HomeAdd" type="primary"
          >发布公告</el-button
        >
      </HomeTable>
    </transition>
    <addToast ref="addToast" @addConfirm="addConfirm" />
    <addToast ref="searchToast" @addConfirm="changeConfirm" />
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="Allnews.length"
        :page-size="pageSize"
        :current-page="pageNow"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import {
  getAllNews,
  searchNews,
  deleteNews,
  addNews,
  changeNews,
} from "../../network/news";
import { fomatNetwork } from "../../serve/network";
import { convertDate, deleteItem } from "../../serve/data";
import HomeTable from "@/components/home/home-main/HomeTable";
import addToast from "@/components/news/createNews";
export default {
  name: "news",
  components: {
    HomeTable,
    addToast,
  },
  data() {
    return {
      show: true,
      loading: false,
      TableDeafault: null,
      Allnews: [],
      searchData: null,
      isDeleting: false,
      pageNow: 1,
      pageSize: 30,
    };
  },
  computed: {
    newsNow() {
      let result = this.Allnews.slice(
        (this.pageNow - 1) * this.pageSize,
        this.pageNow * this.pageSize
      );
      return result;
    },
  },
  methods: {
    showDetail(params) {
      console.log(params);
      this.$refs.searchToast.show = true;
      this.$refs.searchToast.aid = params.aid;
      this.$refs.searchToast.form.title = params.title;
      this.$refs.searchToast.form.content = params.content;
    },
    search(query) {
      //发送搜索网络请求
      this.loading = true;
      fomatNetwork
        .call(this, searchNews, query)
        .then((res) => {
          this.loading = false;
          let result = [res];
          convertDate(result);
          this.searchData = result;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    HomeDelete(query) {
      //发送删除网络请求
      console.log(query.aid);
      let data = new FormData();
      data.append("aid", query.aid);
      if (this.isDeleting) {
        this.$notify({
          title: "提示信息",
          message: "请不要频繁操作",
          position: "bottom-left",
        });
        return;
      }
      this.isDeleting = true;
      this.$notify({
        title: "提示信息",
        message: "删除中",
        position: "bottom-left",
      });
      fomatNetwork
        .call(this, deleteNews, data)
        .then((res) => {
          this.isDeleting = false;
          this.$notify({
            title: "操作结果",
            message: "删除完成",
            position: "bottom-left",
          });
          this.Allnews = deleteItem(this.Allnews, "aid", query.aid);
          this.searchData = deleteItem(this.searchData, "aid", query.aid);
        })
        .catch((err) => {
          this.$notify({
            title: "操作结果",
            message: "删除失败",
            position: "bottom-left",
          });
          console.log(err);
          this.isDeleting = false;
        });
    },
    HomeAdd() {
      this.$refs.addToast.show = true;
    },
    addConfirm(data) {
      this.$notify({
        title: "提示信息",
        message: "发布中",
        position: "bottom-left",
      });
      fomatNetwork
        .call(this, addNews, qs.stringify(data))
        .then((res) => {
          data.aid = res;
          this.Allnews.push(data);
          this.$notify({
            title: "操作结果",
            message: "发布成功",
            position: "bottom-left",
          });
        })
        .catch((err) => {
          this.$notify({
            title: "操作结果",
            message: "发布失败",
            position: "bottom-left",
          });
        });
    },
    changeConfirm(data) {
      this.$notify({
        title: "提示信息",
        message: "修改中",
        position: "bottom-left",
      });
      fomatNetwork.call(this, changeNews, qs.stringify(data)).then(
        (res) => {
          var index = this.Allnews.findIndex((item) => {
            return item.aid == data.aid;
          });
          for (var key in data) {
            this.Allnews[index][key] = data[key];
          }
          if (this.searchData) {
            var index = this.Allnews.findIndex((item) => {
              return item.aid == data.aid;
            });
            for (var key in data) {
              this.searchData[index][key] = data[key];
            }
          }
          this.$notify({
            title: "提示信息",
            message: "修改成功",
            position: "bottom-left",
          });
        },
        (err) => {
          this.$notify({
            title: "提示信息",
            message: "修改失败",
            position: "bottom-left",
          });
        }
      );
    },
    handleCurrentChange(val) {
      this.pageNow = val;
    },
  },
  created() {
    fomatNetwork.call(this, getAllNews).then(
      (res) => {
        convertDate(res);
        this.Allnews = res;
      },
      (err) => {
        console.log(err);
      }
    );
  },
  activated() {
    console.log(this.$route.path);
  },
};
</script>
  
<style scoped>
.pagination {
  margin-top: 20px;
}
</style>

