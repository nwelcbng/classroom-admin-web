<template>
  <div class="main-pannel">
    <transition name="el-fade-in-linear">
      <el-skeleton :rows="20" animated v-show="loading" />
    </transition>
    <transition name="el-fade-in-linear">
      <HomeTable
        @showDetail="showDetail"
        @HomeSearch="search"
        @HomeDelete="HomeDelete"
        @refresh="refresh"
        type="aid"
        v-show="show"
        :loading="show"
        :titles="['用户id', '用户名', '学号', '权限']"
        :props="['uid', 'username', 'sno', 'level']"
        :propsData="userNow"
        :hasDeBtn="false"
      />
    </transition>
    <usersDetail
      ref="detail"
      :info="detailInfo"
      @confirm="confirm"
      @cancelUser="cancelUser"
    />
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="AllUsers.length"
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
import { deleteItem } from "../../serve/data";
import { getAllUsers, changePermission, cancelUser } from "../../network/user";
import { fomatNetwork } from "../../serve/network";
import HomeTable from "@/components/home/home-main/HomeTable";
import usersDetail from "@/components/users/usersDetail";
export default {
  name: "user",
  components: {
    HomeTable,
    usersDetail,
  },
  data() {
    return {
      show: true,
      loading: false,
      TableDeafault: null,
      AllUsers: [],
      detailInfo: {},
      pageNow: 1,
      pageSize: 30,
    };
  },
  computed: {
    AllUserSorted() {
      var result = JSON.parse(JSON.stringify(this.AllUsers));
      result.forEach((item) => {
        if (item) {
          switch (item.level) {
            case 0:
              item.level = "用户";
              break;
            case 1:
              item.level = "管理员";
              break;
          }
        }
      });
      return result;
    },
    userNow() {
      let result = this.AllUserSorted.slice(
        (this.pageNow - 1) * this.pageSize,
        this.pageNow * this.pageSize
      );
      return result;
    },
  },
  methods: {
    showDetail(parmas) {
      this.detailInfo = parmas;
      this.$refs.detail.show = true;
      this.$refs.detail.level = parmas.level;
    },
    search() {
      this.show = false;
      //发送网络请求
      setTimeout(() => {
        this.loading = true;
      }, 500);
    },
    HomeDelete() {
      console.log("delete");
    },
    confirm(params) {
      this.$notify({
        title: "提示信息",
        message: "请求中",
        position: "bottom-left",
      });
      fomatNetwork.call(this, changePermission, qs.stringify(params.data)).then(
        (res) => {
          this.$notify({
            title: "操作结果",
            message: "请求成功",
            position: "bottom-left",
          });
          var index = this.AllUsers.findIndex((item) => {
            return item.uid == params.uid;
          });
          this.AllUsers[index]["level"] = params.data.level;
        },
        (err) => {
          this.$notify({
            title: "操作结果",
            message: "请求失败",
            position: "bottom-left",
          });
        }
      );
    },
    cancelUser(uid) {
      console.log(uid);
      this.$notify({
        title: "提示信息",
        message: "请求中",
        position: "bottom-left",
      });
      fomatNetwork.call(this, cancelUser, qs.stringify({ uid })).then(
        (res) => {
          this.$notify({
            title: "操作结果",
            message: "请求成功",
            position: "bottom-left",
          });
          this.AllUsers = deleteItem(this.AllUsers, "uid", uid);
        },
        (err) => {
          console.log(err);
          this.$notify({
            title: "操作结果",
            message: "请求失败",
            position: "bottom-left",
          });
        }
      );
    },
    handleCurrentChange(val) {
      this.pageNow = val;
    },
    refresh() {
      fomatNetwork.call(this, getAllUsers).then(
        (res) => {
          this.AllUsers = res;
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
  activated() {},
};
</script>
  
<style scoped>
.pagination {
  margin-top: 20px;
}
</style>

