<template>
  <reg-form
    @getCode="getCode"
    @submitForm="submitForm"
    @getForm="getForm"
    :formInfo="formInfo"
  />
</template>

<script>
import RegForm from '../../../../components/user/RegForm.vue'
import {PostPhone ,PostForm ,GetForm} from "../../network/UserRequest"
export default {
  components: { RegForm },
  data(){
    return {
      formInfo:"",
    }
  },
  methods:{
    getCode(phone){
      console.log("-getcode- ",phone);
      PostPhone({
        "phone":phone
      }).then((res)=>{
        if(res.data.code === 1){
          this.$message({
          message: res.data.msg,
          type: 'success'
        });
        }else{
          this.$message.error(res.data.msg);
        }
      }).catch((err)=>{
        this.$message.error(err);
      })
    },
    submitForm(form){
      console.log("submit ",form);
      PostForm(form).then((res)=>{
        if(res.data.code === 1){
          this.$message({
          message: res.data.msg,
          type: 'success'
        });
        }else{
          this.$message.error(res.data.msg);
        }
      }).catch((err)=>{
        this.$message.error(err);
      })
    },
    getForm(){
      GetForm().then((res)=>{
        if(res.data.code === 1){
          if(res.data.data.name){
              this.$message({
              message:"已拉取提交的最新报名表",
              type:"success"
            })
            this.formInfo=res.data.data;
          }
        }else{
          this.$message.error(res.data.msg);
        }
      }).catch((err)=>{
        this.$message.error(err);
      })
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      if(from.meta.getForm){//如果需要获取报名表的话
        vm.getForm();
        from.meta.getForm=false;
      }
    });
  }

}
</script>

<style>

</style>
