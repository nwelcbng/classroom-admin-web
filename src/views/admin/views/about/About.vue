<template>
  <AboutTable  @toPage="toPage"/>
</template>

<script>
import AboutTable from "@/components/about/about-table/AboutTable.vue";
export default {
  components: {
    AboutTable,
  },
  methods:{
    toPage(params){
      this.$emit('toPage',params);
    }
  }
};
</script>

<style>
</style>
