<template>
  <el-menu :default-active="active" :default-openeds="['1']">
    <el-menu-item
      index="/news"
      @click="
        toPage({
          path: '/news',
        })
      "
      ><i class="el-icon-chat-dot-round"></i>公告</el-menu-item
    >
    <el-menu-item
      index="/classroom"
      @click="
        toPage({
          path: '/classroom',
        })
      "
      ><i class="el-icon-chat-dot-round"></i>教室</el-menu-item
    >
    <el-menu-item
      index="/user"
      @click="
        toPage({
          path: '/user',
        })
      "
      ><i class="el-icon-edit"></i>用户</el-menu-item
    >
    <el-menu-item
      index="/review"
      @click="
        toPage({
          path: '/review',
        })
      "
      ><i class="el-icon-edit"></i>审核</el-menu-item
    >
  </el-menu>
</template>

<script>
export default {
  computed: {
    active() {
      return this.$route.path;
    },
  },
  methods: {
    toPage(params) {
      this.$emit("toPage", params);
    },
  },
};
</script>

<style>
</style>