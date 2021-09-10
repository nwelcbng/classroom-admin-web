<template>
  <div>
    <el-card>
      <div slot="header">
        <h2>个人信息</h2>
        <el-input v-model="statusNum" placeholder="请输入状态值"></el-input>
      </div>
      <div>
        <el-steps
          :active="statusNum >= 501 ? 5 : parseInt(statusNum / 100) - 1"
          finish-status="success"
        >
          <el-step title="提交报名表">
            <el-timeline slot="description">
              <el-timeline-item
                key="1"
                hide-timestamp
                v-if="statusNum >= 100"
                :icon="judgeIcon(100).icon"
                :color="judgeIcon(100).color"
              >
                <span class="timeline-desc-title">收集中</span>
                <span
                  v-if="statusNum == 100"
                  style="color: #f56c6c; font-weight: 700"
                  >未提交</span
                >
                <span v-if="statusNum >= 101"
                  >已提交<el-button class="small-btn" round
                    >查看报名表</el-button
                  ></span
                >
              </el-timeline-item>
              <el-timeline-item
                key="2"
                hide-timestamp
                v-if="statusNum >= 110"
                :icon="judgeIcon(110).icon"
                :color="judgeIcon(110).color"
              >
                <span class="timeline-desc-title">审核</span>
                <span v-if="statusNum == 110">正在审核...</span>
                <span v-if="statusNum >= 111">已通过</span>
              </el-timeline-item>
            </el-timeline>
          </el-step>
          <el-step title="一轮面试">
            <el-timeline slot="description">
              <el-timeline-item
                key="1"
                hide-timestamp
                v-if="statusNum >= 200"
                :icon="judgeIcon(200, 202).icon"
                :color="judgeIcon(200, 202).color"
              >
                <span class="timeline-desc-title">面试通知</span>
                <span
                  style="font-weight: 700"
                  v-if="statusNum >= 200 && statusNum < 210"
                  >【{{ interviewAddr }}】</span
                >
                <span
                  v-if="statusNum == 200"
                  style="color: #e6a23c; font-weight: 700"
                >
                  待确认
                  <el-button class="small-btn" round @click="confirmJoin(201)"
                    >确认参加</el-button
                  >
                  <el-button class="small-btn" round @click="confirmJoin(202)"
                    >放弃</el-button
                  >
                </span>
                <span
                  v-if="statusNum == 202"
                  style="color: #f56c6c; font-weight: 700"
                  >已放弃</span
                >
                <span v-if="statusNum >= 201 && statusNum != 202">已确认</span>
              </el-timeline-item>

              <el-timeline-item
                key="2"
                hide-timestamp
                v-if="statusNum >= 210"
                :icon="judgeIcon(210).icon"
                :color="judgeIcon(210).color"
              >
                <span class="timeline-desc-title">面试签到</span>
                <span
                  v-if="statusNum == 210"
                  style="color: #e6a23c; font-weight: 700"
                >
                  待签到
                  <el-button class="small-btn" round @click="confirmJoin(211)"
                    >签到</el-button
                  >
                </span>
                <span v-if="statusNum >= 211">已签到</span>
              </el-timeline-item>

              <el-timeline-item
                key="3"
                hide-timestamp
                v-if="statusNum >= 220"
                :icon="judgeIcon(220).icon"
                :color="judgeIcon(220).color"
              >
                <span class="timeline-desc-title">等待叫号</span>
              </el-timeline-item>

              <el-timeline-item
                key="4"
                hide-timestamp
                v-if="statusNum >= 230"
                :icon="judgeIcon(230).icon"
                :color="judgeIcon(230).color"
              >
                <span class="timeline-desc-title">面试中</span>
                <span
                  v-if="statusNum == 230"
                  style="color: #f56c6c; font-weight: 700"
                >
                  已轮到你的面试时间，请去面试
                </span>
              </el-timeline-item>

              <el-timeline-item
                key="5"
                hide-timestamp
                v-if="statusNum >= 240"
                :icon="judgeIcon(240).icon"
                :color="judgeIcon(240).color"
              >
                <span class="timeline-desc-title">面试结束</span>
              </el-timeline-item>
            </el-timeline>
          </el-step>
          <el-step title="笔试">
            <el-timeline slot="description">
              <el-timeline-item
                key="1"
                hide-timestamp
                v-if="statusNum >= 300"
                :icon="judgeIcon(300, 302).icon"
                :color="judgeIcon(300, 302).color"
              >
                <span class="timeline-desc-title">笔试通知</span>
                <span
                  style="font-weight: 700"
                  v-if="statusNum >= 300 && statusNum < 310"
                  >【{{ examinationAddr }}】</span
                >
                <span
                  v-if="statusNum == 300"
                  style="color: #e6a23c; font-weight: 700"
                >
                  待确认
                  <el-button class="small-btn" round @click="confirmJoin(301)"
                    >确认参加</el-button
                  >
                  <el-button class="small-btn" round @click="confirmJoin(302)"
                    >放弃</el-button
                  >
                </span>
                <span
                  v-if="statusNum == 302"
                  style="color: #f56c6c; font-weight: 700"
                  >已放弃</span
                >
                <span v-if="statusNum >= 301 && statusNum != 302">已确认</span>
              </el-timeline-item>
              <el-timeline-item
                key="2"
                hide-timestamp
                v-if="statusNum >= 310"
                :icon="judgeIcon(310).icon"
                :color="judgeIcon(310).color"
              >
                <span class="timeline-desc-title">笔试签到</span>
                <span
                  v-if="statusNum == 310"
                  style="color: #e6a23c; font-weight: 700"
                >
                  待签到
                  <el-button class="small-btn" round @click="confirmJoin(311)"
                    >签到</el-button
                  >
                </span>
                <span v-if="statusNum >= 311">已签到</span>
              </el-timeline-item>
              <el-timeline-item
                key="3"
                hide-timestamp
                v-if="statusNum >= 320"
                :icon="judgeIcon(320).icon"
                :color="judgeIcon(320).color"
              >
                <span class="timeline-desc-title">笔试交卷</span>
                <span
                  v-if="statusNum == 320"
                  style="color: #e6a23c; font-weight: 700"
                >
                  未交卷
                  <el-button class="small-btn" round @click="confirmJoin(321)"
                    >交卷</el-button
                  >
                </span>
                <span v-if="statusNum >= 321">已交卷</span>
              </el-timeline-item>
            </el-timeline>
          </el-step>
          <el-step title="二轮面试">
            <el-timeline slot="description">
              <el-timeline-item
                key="1"
                hide-timestamp
                v-if="statusNum >= 400"
                :icon="judgeIcon(400).icon"
                :color="judgeIcon(400).color"
              >
                <span class="timeline-desc-title">等待叫号</span>
              </el-timeline-item>

              <el-timeline-item
                key="2"
                hide-timestamp
                v-if="statusNum >= 410"
                :icon="judgeIcon(410).icon"
                :color="judgeIcon(410).color"
              >
                <span class="timeline-desc-title">等待第二志愿面试</span>
              </el-timeline-item>
            </el-timeline>
          </el-step>
          <el-step title="结果">
            <el-timeline slot="description">
              <el-timeline-item
                key="1"
                hide-timestamp
                v-if="statusNum >= 500"
                :icon="judgeIcon(500, 502).icon"
                :color="judgeIcon(500, 502).color"
              >
                <span class="timeline-desc-title">录取结果</span>

                <span v-if="statusNum == 500"> 商讨中... </span>
                <span
                  v-if="statusNum == 501"
                  style="color: #67c23a; font-weight: 700"
                >
                  已录取
                </span>
                <span
                  v-if="statusNum == 502"
                  style="color: #f56c6c; font-weight: 700"
                >
                  未录取
                </span>
              </el-timeline-item>
            </el-timeline>
          </el-step>
        </el-steps>
      </div>
      <el-divider>管理员留言</el-divider>
      <VueMarkdown :source="adminMsg" class="adminmsg" />
      <el-divider>你的留言</el-divider>
      <p style="color: #f56c6cc4;font-size: 14px;">请注意，提交留言会覆盖历史留言，如需保存原留言内容，请在输入框内追加内容而不是删除原有信息</p>
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入留言"
        v-model="userMsg"
      >
      </el-input>
      <el-button type="primary" @click="submitUserMsg">提交</el-button>
    </el-card>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
export default {
  components: { VueMarkdown },
  props: {
    Status: {
      type: Object,
      default: function () {
        return {
          statusNum: 100,
          userMsg: "",
          adminMsg: "",
        };
      },
    },
  },
  data() {
    return {
      statusNum: 302,
      interviewAddr: "面试时间地点",
      examinationAddr: "笔试时间地点",
      adminMsg: "这个是管理员留言\n ### 测试 \n **测试**",
      userMsg: "",
    };
  },
  watch: {
    statusNum: function (newStatus) {
      this.stepsNow = parseInt(newStatus / 100) - 1;
    },
    Status: {
      immediate: true,
      deep: true,
      handler(newStatus) {
        console.log("get newStatus", newStatus);
        this.statusNum = newStatus.statusNum;
        this.adminMsg = newStatus.adminMsg;
        this.userMsg = newStatus.userMsg;
      },
    },
  },
  computed: {
    judgeIcon() {
      return function (doingStatus, failStatus) {
        this.statusNum = this.statusNum - 0;
        if (failStatus != undefined && this.statusNum === failStatus) {
          return {
            icon: "el-icon-circle-close",
            color: "#FDE2E2",
          };
        }
        if (this.statusNum === doingStatus) {
          return {
            icon: "el-icon-more",
            color: "#C6E2FF",
          };
        }
        if (this.statusNum > doingStatus) {
          return {
            icon: "el-icon-circle-check",
            color: "#E1F3D8",
          };
        }
        return {
          icon: "",
          color: "",
        };
      };
    },
  },
  methods: {
    confirmJoin(status) {
      //确认笔试和面试参加
      switch (status) {
        case 201:
        case 301:
          this.$message({
            message: "已确认参加",
            type: "success",
          });
          this.$emit("putStatus", status, this.userMsg);
          break;

        case 202:
        case 302:
          this.$prompt("请填写放弃原因，以供我们参考改进", "提示", {
            comfirmButtonText: "确认放弃",
            cancelButtonText: "取消",
            inputPattern: /\S{3,}/,
            inputErrorMessage: "请至少输入三个字的放弃原因",
          })
            .then(({ value }) => {
              console.log("放弃原因：", value);
              this.$message("已确认放弃参加，原因： " + value);
              this.$emit("putStatus", status, value);
            })
            .catch(() => {
              this.$message("已取消");
            });
          break;

        case 211:
          this.$confirm(
            `请确认已经到达现场等候，
          签到后会将您加入等候队列，
          叫号后三分钟内未到场将视为放弃`,
            "警告",
            {
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
            .then(() => {
              this.$message({
                message: "已加入等候队列",
                type: "success",
              });
              this.$emit("putStatus", status, this.userMsg);
            })
            .catch(() => {
              this.$message("已取消");
            });
          break;

        case 311:
          this.$confirm(`请确认是否已经到达笔试现场`, "警告", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                message: "已签到",
                type: "success",
              });
              this.$emit("putStatus", status, this.userMsg);
            })
            .catch(() => {
              this.$message("已取消");
            });
          break;

        case 321:
          this.$confirm(
            `请确认是否已经交卷，
            交卷后会将您加入等候队列，
            叫号后三分钟内未到场将视为放弃`,
            "警告",
            {
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
            .then(() => {
              this.$message({
                message: "已交卷",
                type: "success",
              });
              this.$emit("putStatus", status, this.userMsg);
            })
            .catch(() => {
              this.$message("已取消");
            });
          break;
      }
    },
    submitUserMsg() {
      this.$confirm("确认提交？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$message({
            message: "已提交",
            type: "success",
          });

          this.$emit("putStatus", this.statusNum, this.userMsg);
        })
        .catch(() => {
          this.$message("已取消");
        });
    },
    refreshStatus(){
      this.$emit("getStatus");
    }
  },
  mounted(){
    this.refreshStatus();
  }

};
</script>

<style>
.small-btn {
  padding: 3px 5px !important;
}
.timeline-desc-title {
  font-weight: 700;
  padding-right: 3px;
}
.adminmsg {
  border: 1px solid #eee;
  border-radius: 30px;
  padding: 20px;
}
</style>
