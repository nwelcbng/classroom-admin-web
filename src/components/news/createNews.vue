<template>
  <el-dialog title="公告面板" :visible.sync="show">
    <el-form :model="form">
      <el-form-item label="公告标题" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="公告内容" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
          v-model="form.content"
          resize="none"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="公告日期" :label-width="formLabelWidth">
        <span>{{ dateNow }}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary" @click="confirm">发 布</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      form: {
        title: "",
        content: "",
      },
      aid:0,
      formLabelWidth: "120px",
    };
  },
  computed: {
    dateNow() {
      let date = new Date();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return (
        date.getFullYear() +
        "-" +
        (month < 10 ? "0" + month : month) +
        "-" +
        (day < 10 ? "0" + day : day)
      );
    },
  },
  methods: {
    confirm() {
      this.show = false;
      this.form.date = this.dateNow;
      if(this.aid){
        this.form.aid = this.aid;
      }
      this.$emit("addConfirm", this.form);
    },
  },
};
</script>

<style>
</style>