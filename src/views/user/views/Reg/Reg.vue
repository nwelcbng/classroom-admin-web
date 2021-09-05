<template>
  <reg-form
    @getCode="getCode"
    @submitForm="submitForm"
  />
</template>

<script>
import RegForm from '../../../../components/user/RegForm.vue'
export default {
  components: { RegForm },
  methods:{
    getCode(phone){
      console.log("-getcode- ",phone);
    },
    submitForm(form){
      console.log("submit ",form);
    }
  }

}
</script>

<style>

</style>
