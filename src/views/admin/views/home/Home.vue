<template>
  <HomeTable/>
</template>

<script>
  import HomeTable from "@/components/home/home-main/HomeTable.vue"
  export default {
    name:"Home",
    components:{
      HomeTable
    },
    methods:{
      created(){
        console.log("home create")
      }
    }
  }

  
</script>
  
<style scoped>

</style>

