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
        :hasSearch="false"
        type="cid"
        v-show="show"
        :loading="show"
        :titles="['课室id', '位置', '名称', '教室容量']"
        :props="['cid', 'position', 'name', 'capacity']"
        :propsData="classNow"
      >
        <el-button slot="add-button" @click="HomeAdd" type="primary"
          >增加课室</el-button
        >
      </HomeTable>
    </transition>
    <classroomDetail ref="detail"></classroomDetail>
    <addClassroom ref="add" @addComfirm="addComfirm"></addClassroom>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="AllClass.length"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { deleteItem } from "../../serve/data";
import { getAllClass, addClass, deleteClass } from "../../network/classroom";
import { fomatNetwork } from "../../serve/network";
import HomeTable from "@/components/home/home-main/HomeTable";
import classroomDetail from "@/components/classroom/classroomDetail";
import addClassroom from "@/components/classroom/addClassroom";
export default {
  name: "classroom",
  components: {
    HomeTable,
    classroomDetail,
    addClassroom,
  },
  data() {
    return {
      show: true,
      loading: false,
      AllClass: [],
      detail: {},
      pageNow: 1,
      pageSize: 30,
    };
  },
  computed: {
    classNow() {
      let result = this.AllClass.slice(
        (this.pageNow - 1) * this.pageSize,
        this.pageNow * this.pageSize
      );
      return result;
    },
  },
  methods: {
    showDetail(params) {
      console.log(params);
      this.$refs.detail.show = true;
      this.$refs.detail.info = params;
      this.$refs.detail.getStatus();
    },
    HomeDelete(params) {
      this.$notify({
        title: "提示信息",
        message: "删除中",
        position: "bottom-left",
      });
      console.log(params.cid);
      fomatNetwork
        .call(this, deleteClass, qs.stringify({ cid: params.cid }))
        .then(
          (res) => {
            this.$notify({
              title: "操作结果",
              message: "删除成功",
              position: "bottom-left",
            });
            this.AllClass = deleteItem(this.AllClass, "cid", params.cid);
          },
          (err) => {
            console.log(err);
            this.$notify({
              title: "操作结果",
              message: "删除失败",
              position: "bottom-left",
            });
          }
        );
    },
    HomeAdd() {
      this.$refs.add.show = true;
    },
    addComfirm(params) {
      this.$notify({
        title: "提示信息",
        message: "请求中",
        position: "bottom-left",
      });
      let data = new FormData();
      for (var key in params) {
        data.append(key, params[key]);
      }
      fomatNetwork.call(this, addClass, data).then(
        (res) => {
          this.$notify({
            title: "操作结果",
            message: "添加成功",
            position: "bottom-left",
          });
        },
        (err) => {
          this.$notify({
            title: "操作结果",
            message: "添加失败",
            position: "bottom-left",
          });
        }
      );
    },
    handleCurrentChange(val) {
      this.pageNow = val;
    },
    refresh() {
      fomatNetwork.call(this, getAllClass).then(
        (res) => {
          this.AllClass = res;
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
    // console.log(this.$route.path);
  },
};
</script>
  
<style scoped>
.pagination {
  margin-top: 20px;
}
</style>

