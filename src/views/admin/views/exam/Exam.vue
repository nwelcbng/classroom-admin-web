<template>
  <div class="ExamInfo">
    <div class="ExamUserInfo">
      <!-- <el-descriptions title="用户信息">
        <el-descriptions-item label="姓名">Tan</el-descriptions-item>
        <el-descriptions-item label="学号">312030123</el-descriptions-item>
        <el-descriptions-item label="意向部门">网络组</el-descriptions-item>
      </el-descriptions> -->
      <div class="ExamUserInfo-item"><span>姓名：</span><span>Tan</span></div>
      <div class="ExamUserInfo-item">
        <span>学号：</span><span>312312312</span>
      </div>
      <div class="ExamUserInfo-item">
        <span>意向部门：</span><span>网络组</span>
      </div>
    </div>
    <div class="progress">
      <el-steps :active="2" align-center>
        <el-step title="面试"></el-step>
        <el-step title="一轮考核"></el-step>
        <el-step title="二轮考核"></el-step>
        <el-step title="笔试"></el-step>
      </el-steps>
    </div>
    <div class="ExamButtons">
      <el-button
        type="primary"
        icon="el-icon-edit"
        round
        @click="dialogFormVisible2 = true"
        >发表评论</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-edit"
        round
        @click="dialogFormVisible1 = true"
        >考核学员</el-button
      >
    </div>
    <examBanners />
    <ExamCommentsItem v-for="(item, index) in data" :key="index" :data="item" />

    <ExamSubmit
      :dialogFormVisible="dialogFormVisible1"
      @subSure="submitSure"
      @subCancel="submitCancel"
    />
    <ExamCommit
      :dialogFormVisible="dialogFormVisible2"
      @comSure="commitSure"
      @comCancel="commitCancel"
    />
  </div>
</template>

<script>
import ExamCommentsItem from "@/components/exam/exam-comments/ExamCommentsItem.vue";
import examBanners from "@/components/exam/exam-banner/ExamBanner.vue";
import {
  GetUserInfo,
  SetExamInfo,
  GetExamInfo,
  DeleteInfo,
} from "../../network/exam.js";
import { examInfoFilter } from "../../data/exam.js";
import ExamSubmit from "@/components/exam/exam-submit/ExamSubmit.vue";
import ExamCommit from "@/components/exam/exam-commit/ExamCommit.vue";
export default {
  data() {
    return {
      data: {},
      dialogFormVisible1: false,
      dialogFormVisible2: false,
    };
  },
  components: {
    ExamCommentsItem,
    examBanners,
    ExamSubmit,
    ExamCommit,
  },
  methods: {
    submitSure(res) {
      this.dialogFormVisible1 = false;
    },
    submitCancel() {
      this.dialogFormVisible1 = false;
    },
    commitSure(res) {
      this.dialogFormVisible2 = false;
    },
    commitCancel() {
      this.dialogFormVisible2 = false;
    },
  },
  created() {
    // const data = {
    //         "title": "这是一个测试评价",
    //         "raw": "管理员1&学生1&4@@@这是一条测试评价",
    //         "category": 38,
    //         "archetype": "regular",
    //         "created_at": "测试"
    //     }
    // SetExamInfo(data).then(res => {
    //     console.log(res);
    // })
    GetExamInfo().then((res) => {
      const newData = examInfoFilter(res);
      console.log(newData);
      this.data = newData;
      // FilterItem(newData[0])
      // console.log(newData)
    });
  },
};
</script>

<style scoped>
.ExamInfo {
  text-align: center;
}
.ExamUserInfo {
  height: 80px;
  display: flex;
  justify-content: space-around;
}
.ExamUserInfo-item {
  height: 100%;
  line-height: 80px;
}
.progress {
  margin: 40px 0;
}
.ExamButtons {
  margin-bottom: 20px;
}
</style>