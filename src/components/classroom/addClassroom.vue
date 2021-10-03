<template>
  <el-dialog title="预约面板" :visible.sync="show">
    <el-form>
    <el-form-item label="位置" :label-width="formLabelWidth">
      <el-input  v-model="position" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="人数" :label-width="formLabelWidth">
      <el-input  v-model="capacity" autocomplete="off" type="number"></el-input>
    </el-form-item>
        <el-form-item label="教室编号" :label-width="formLabelWidth">
      <el-input  v-model="name" autocomplete="off"></el-input>
    </el-form-item>
        <el-button @click="addComfirm">确定</el-button>
      <el-button @click="show = false">取 消</el-button>
    </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      formLabelWidth: "120px",
      show: false,
      position:'',
      capacity:'',
      name:''
    };
  },
  methods:{
    addComfirm(){
        let data = {};
        data.position = this.position;
        data.capacity = this.capacity;
        data.name = this.name;
        this.$emit('addComfirm',data);
        this.show = false;
    }
  }
};
</script>

<style>
</style>