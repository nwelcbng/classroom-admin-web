<template>
  <el-dialog title="预约面板" :visible.sync="show">
    <el-form>
      <el-form-item label="用户id" :label-width="formLabelWidth">
        <span>{{ info.uid }}</span>
      </el-form-item>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <span>{{ info.username }}</span>
      </el-form-item>
      <el-form-item label="学号" :label-width="formLabelWidth">
        <span>{{ info.sno }}</span>
      </el-form-item>
      <el-form-item label="班级" :label-width="formLabelWidth">
        <span>{{ info.class }}</span>
      </el-form-item>
      <el-form-item label="专业" :label-width="formLabelWidth">
        <span>{{ info.major }}</span>
      </el-form-item>
      <el-form-item label="学院" :label-width="formLabelWidth">
        <span>{{ info.college }}</span>
      </el-form-item>
      <el-form-item label="权限" :label-width="formLabelWidth">
        <el-select v-model="level" placeholder="请选择">
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
      <el-button @click="confirm">修 改</el-button>
      <el-button @click="show = false">取 消</el-button>
      <el-button @click="cancelUser" type="danger">注销用户</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
  },
  data() {
    return {
      show: false,
      formLabelWidth: "120px",
      level: "",
      options: [
        {
          value: 0,
          label: "用户",
        },
        {
          value: 1,
          label: "管理员",
        },
      ],
    };
  },
  computed: {
    status() {
      switch (this.info.status) {
        case 0:
          return "审核中";
        case 1:
          return "已驳回";
        case 2:
          return "已通过";
      }
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
    cancelUser() {
      this.show = false;
      this.$emit("cancelUser", this.info.uid);
    },
  },
};
</script>

<style>
</style>