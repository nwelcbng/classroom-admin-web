<template>
  <div>
    <div class="title">Admin</div>
    <mainPannel />
  </div>
</template>

<script>
import mainPannel from "./views/main";
export default {
  components: {
    mainPannel,
  },
};
</script>

<style>
.title {
  margin-top: 180px;
  text-align: center;
  font-size: 50px;
}
</style>
