<template>
  <el-menu :default-active="active" :default-openeds="['1']">
    <el-submenu index="1">
      <template slot="title"
        ><i class="el-icon-message"></i>查看报名表</template
      >
      <el-menu-item
        index="/home/学院号"
        @click="
          toPage({
            path: '/home',
            query: { type: '学院号' },
          })
        "
        >学院</el-menu-item
      >
      <el-menu-item
        index="/home/名字"
        @click="
          toPage({
            path: '/home',
            query: { type: '名字' },
          })
        "
        >名字</el-menu-item
      >
      <el-menu-item
        index="/home/部门"
        @click="
          toPage({
            path: '/home',
            query: { type: '部门' },
          })
        "
        >部门</el-menu-item
      >
    </el-submenu>
    <el-menu-item
      index="/about"
      @click="
        toPage({
          path: '/about',
          query: {}
        })
      "
      ><i class="el-icon-chat-dot-round"></i>查看并评价学员</el-menu-item
    >
    <!-- </el-submenu>
      <el-submenu index="3"> -->
    <!-- <template slot="title"><i class="el-icon-menu"></i>考核学员</template> -->
    <el-menu-item
      index="/exam"
      @click="
        toPage({
          path: '/exam',
          query: {}
        })
      "
      ><i class="el-icon-edit"></i>考核学员</el-menu-item
    >
    <!-- </el-submenu> -->
  </el-menu>
</template>

<script>
export default {
  computed: {
    active() {
      if(this.$route.query.type){
        return this.$route.path + "/" + this.$route.query.type;
      }else{
        return this.$route.path;
      }

    },
  },
  methods: {
    toPage(params) {
      this.$emit('toPage',params);
    },
  },
};
</script>

<style>
</style>