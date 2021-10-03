<template>
  <el-dialog title="预约面板" :visible.sync="show">
    <el-form>
      <el-form-item label="id" :label-width="formLabelWidth">
        <span>{{ info.oid }}</span>
      </el-form-item>
      <el-form-item label="订阅者id" :label-width="formLabelWidth">
        <span>{{ info.subscriber_id }}</span>
      </el-form-item>
      <el-form-item label="预约时刻" :label-width="formLabelWidth">
        <span>{{ info.sid }}</span>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <span>{{ info.remark }}</span>
      </el-form-item>
      <el-form-item label="	预约状态" :label-width="formLabelWidth">
        <span>{{ status }}</span>
      </el-form-item>
      <el-form-item label="	留言" :label-width="formLabelWidth">
        <el-input v-model="acomment" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary" @click="confirm">通 过</el-button>
      <el-button type="primary" @click="battle">驳 回</el-button>
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
      acomment: "",
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
      let result = {};
      result.oid = this.info.oid;
      result.status = 2;
      result.acomment = this.acomment;
      this.$emit("confirm", result);
    },
    battle() {
      this.show = false;
      let result = {};
      result.oid = this.info.oid;
      result.status = 1;
      result.acomment = this.acomment;
      this.$emit("confirm", result);
    },
  },
};
</script>

<style>
</style>