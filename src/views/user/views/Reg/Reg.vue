<template>
  <reg-form
    @getCode="getCode"
    @submitForm="submitForm"
  />
</template>

<script>
import RegForm from '../../../../components/user/RegForm.vue'
import {PostPhone} from "../../network/UserRequest"
export default {
  components: { RegForm },
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
    }
  }

}
</script>

<style>

</style>
