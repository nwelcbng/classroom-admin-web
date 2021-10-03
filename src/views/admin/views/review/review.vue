<template>
  <div>
    <transition name="el-fade-in-linear">
      <el-skeleton :rows="20" animated v-show="loading" />
    </transition>
    <transition name="el-fade-in-linear">
      <HomeTable
        @showDetail="showDetail"
        @HomeDelete="HomeDelete"
        @refresh="refresh"
        :hasDeBtn="false"
        type="oid"
        v-show="show"
        :loading="show"
        :titles="['oid', '预约者id', 'sid', '预约状态']"
        :props="['oid', 'subscriber_id', 'sid', 'status']"
        :propsData="reviewNow"
      />
    </transition>
    <reviewDetail ref="detail" :info="detailInfo" @confirm="confirm" />
    <el-pagination
      background
      layout="prev, pager, next"
      :total="AllReview.length"
      :page-size="pageSize"
      :current-page="pageNow"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import qs from "qs";
import { getAllReview, check } from "../../network/review";
import { fomatNetwork } from "../../serve/network";
import HomeTable from "@/components/home/home-main/HomeTable";
import reviewDetail from "@/components/review/reviewDetail";
export default {
  name: "review",
  components: {
    HomeTable,
    reviewDetail,
  },
  data() {
    return {
      show: true,
      loading: false,
      TableDeafault: null,
      AllReview: [],
      detailInfo: {},
      pageNow: 1,
      pageSize: 30,
    };
  },
  computed: {
    AllReviewSorted() {
      var result = JSON.parse(JSON.stringify(this.AllReview));
      result.forEach((item) => {
        if (item) {
          switch (item.status) {
            case 0:
              item.status = "审核中";
              break;
            case 1:
              item.status = "已驳回";
              break;
            case 2:
              item.status = "已通过";
              break;
          }
        }
      });
      return result;
    },
    reviewNow() {
      let result = this.AllReviewSorted.slice(
        (this.pageNow - 1) * this.pageSize,
        this.pageNow * this.pageSize
      );
      return result;
    },
  },
  methods: {
    showDetail(params) {
      this.detailInfo = params;
      this.$refs.detail.show = true;
    },
    confirm(data) {
      console.log(qs.stringify(data));
      this.$notify({
        title: "提示信息",
        message: "请求中",
        position: "bottom-left",
      });
      fomatNetwork.call(this, check, qs.stringify(data)).then(
        (res) => {
          var index = this.AllReview.findIndex((item) => {
            return item.oid == data.oid;
          });
          this.AllReview[index]["status"] = data["status"];
          this.$notify({
            title: "操作结果",
            message: "请求成功",
            position: "bottom-left",
          });
        },
        (err) => {
          console.log(err);
          this.$notify({
            title: "提示信息",
            message: "请求失败",
            position: "bottom-left",
          });
        }
      );
    },
    HomeDelete() {
      console.log("delete");
    },
    handleCurrentChange(val) {
      this.pageNow = val;
    },
    refresh() {
      fomatNetwork.call(this, getAllReview).then(
        (res) => {
          this.AllReview = res;
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  created() {
    this.refresh();
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

