<template>
  <el-dialog title="教室面板" :visible.sync="show">
    <el-form>
      <el-form-item label="教室id" :label-width="formLabelWidth">
        <span>{{ info.cid }}</span>
      </el-form-item>
      <el-form-item label="位置" :label-width="formLabelWidth">
        <span>{{ info.position }}</span>
      </el-form-item>
      <el-form-item label="名称" :label-width="formLabelWidth">
        <span>{{ info.name }}</span>
      </el-form-item>
      <el-form-item label="选择日期" :label-width="formLabelWidth">
        <div class="block">
          <el-date-picker v-model="date" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item
        v-for="(item2, index) in monments"
        :key="index"
        :label="item2"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="Allstatus[index]"
          placeholder="请选择"
          @change="statusChange(index)"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fomatNetwork } from "../../views/admin/serve/network";
import {
  getClassStatusByDate,
  changeClassStatus,
} from "../../views/admin/network/classroom";
export default {
  data() {
    return {
      show: false,
      formLabelWidth: "120px",
      level: "",
      info: {},
      options: [
        {
          value: 0,
          label: "空闲",
        },
        {
          value: 1,
          label: "审核中",
        },
        {
          value: 2,
          label: "使用中",
        },
      ],
      monments: [
        "8:00-9:40",
        "10:00-11:40",
        "14:30-16:10",
        "16:20-18:00",
        "19:00-20:40",
        "20:50-21:35",
      ],
      Allstatus: [0, 0, 0, 0, 0, 0, 0],
      Allsid: [],
      date: new Date(),
    };
  },
  computed: {
    dateConverted() {
      let date = new Date(this.date);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    },
  },
  watch: {
    dateConverted(newValue) {
      this.getStatus();
    },
  },
  methods: {
    confirm() {
      this.show = false;
      let data = {
        uid: this.info.uid,
        level: this.level,
      };
      this.$emit("confirm", { data, uid: this.info.uid });
    },
    getStatus() {
      let data = new Object();
      data.cid = String(this.info.cid);
      data.date = this.dateConverted;
      console.log(data);
      fomatNetwork
        .call(this, getClassStatusByDate, data)
        .then((res) => {
          console.log(res);
          res.sort((a, b) => {
            return a.moment - b.moment;
          });
          let status = [];
          let sid = [];
          for (let index = 0; index < res.length; index++) {
            status.push(res[index].status);
            sid.push(res[index].sid);
          }
          this.Allstatus = status;
          this.Allsid = sid;
        })
        .catch((err) => {
          console.log(err);
          this.$notify({
            title: "提示信息",
            message: "获取日期信息失败",
            position: "bottom-left",
          });
        });
    },
    statusChange(index) {
      console.log({
        sid: this.Allsid[index],
        status: this.Allstatus[index],
        date: this.dateConverted,
        cid: this.info.cid,
        moment: index,
      });
      let data = new FormData();
      data.append("sid", parseInt(this.Allsid[index]));
      data.append("status", parseInt(this.Allstatus[index]));
      data.append("date", this.dateConverted);
      data.append("cid", parseInt(this.info.cid));
      data.append("moment", parseInt(index));
      fomatNetwork.call(this, changeClassStatus, data).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
          this.$notify({
            title: "提示信息",
            message: "修改状态失败",
            position: "bottom-left",
          });
        }
      );
    },
  },
};
</script>

<style>
</style>