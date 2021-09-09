<template>
  <div>
    <info-form
    @putStatus="putStatus"/>
  </div>
</template>

<script>
import InfoForm from '../../../../components/user/InfoForm.vue'
import {PutStatus} from "../../network/UserRequest"
export default {
  components: { InfoForm },
  methods:{
    putStatus(status,text){
      console.log("putStatus",status,text);
      PutStatus({
        check: parseInt(status),
        reason:text
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
    }
  }

}
</script>

<style>

</style>
