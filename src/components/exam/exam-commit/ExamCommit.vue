<template>
  <el-dialog title="考核内容" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="想说的话" :label-width="formLabelWidth">
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
      <div class="CommitRate">
        <span class="rate">评分</span>
        <el-rate
          v-model="form.value"
          :icon-classes="iconClasses"
          void-icon-class="icon-rate-face-off"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
      </div>

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
    data(){
        return{
            
            iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'] ,
            form: {
                textarea: "",
                value:5
            },
            formLabelWidth: "140px",
        }
    },
    methods:{
    sure() {
      this.$emit("comSure",this.form);
    },
    cancel() {
      this.$emit("comCancel");
    },
    }
}
</script>

<style scoped>
    .CommitRate{
        display: flex;
        justify-content: center;
    }
    .CommitRate .rate{
        margin-right:20px ;
    }
</style>