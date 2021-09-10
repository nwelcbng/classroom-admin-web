<template>
  <div>
    <info-form @putStatus="putStatus" :Status="Status" @getStatus="getStatus"/>
  </div>
</template>

<script>
import InfoForm from "../../../../components/user/InfoForm.vue";
import { PutStatus, GetStatus } from "../../network/UserRequest";
export default {
  components: { InfoForm },
  data(){
    return {
      Status:{
        statusNum: 100,
        userMsg: "",
        adminMsg: "",
      },
    }
  },
  methods: {
    putStatus(status, text) {
      console.log("putStatus", status, text);
      PutStatus({
        check: parseInt(status),
        reason: text,
      })
        .then((res) => {
          if (res.data.code === 1) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.getStatus();//每次提交完状态后都拉取新的状态更新
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    getStatus() {
      GetStatus()
        .then((res) => {
          if (res.data.code === 1) {
            console.log("getstatus 成功",res.data.data);
            //这里要给Status对象赋新值，只修改其属性无法激活子控件中的watch！
            this.Status={
              statusNum: res.data.data.enroll,//状态码
              userMsg: res.data.data.usermsg,
              adminMsg: res.data.data.result,
            }
            // this.Status.statusNum=res.data.data.enroll;
            // this.Status.userMsg=res.data.data.usermsg;
            // this.Status.adminMsg=res.data.data.result;

          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>

<style>

</style>
