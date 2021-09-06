<template>
  <el-dialog title="考核内容" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="给师弟师妹的留言" :label-width="formLabelWidth">
        <el-input
          :rows="6"
          type="textarea"
          placeholder="请输入内容"
          v-model="form.textarea"
          maxlength="60"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="考核结果" :label-width="formLabelWidth">
        <el-select v-model="form.result" placeholder="请选择考核结果">
          <el-option label="通过考核" value="pass"></el-option>
          <el-option label="考核失败" value="faid"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogFormVisible: Boolean,
  },
  data() {
    return {
      form: {
        result: "",
        textarea: "",
      },
      formLabelWidth: "140px",
    };
  },
  methods: {
    sure() {
      this.$emit("subSure",this.form);
    },
    cancel() {
      this.$emit("subCancel");
    },
  },
};
</script>

<style>
</style>