<template>
  <div>
    <div class="search-input" v-if="hasSearch">
      <el-input v-model="search" :placeholder="'请输入' + type"></el-input>
    </div>
    <div class="search-button" v-if="hasSearch">
      <el-button icon="el-icon-search" @click="HomeSearch"></el-button>
    </div>

    <div class="search-button">
      <el-button @click="HomeSearch" type="primary">发布公告</el-button>
    </div>
    <!-- 这是搜索的内容 -->
    <el-table :data="searchData" border v-if="hasSearch && search">
      <el-table-column
        v-for="(item, index) in titles"
        :key="index"
        :prop="props[index]"
        :label="item"
        align="center"
      >
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            round
            @click="toPage(scope.row)"
            >查看</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            round
            @click="HomeDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="propsData" border v-else>
      <el-table-column
        v-for="(item, index) in titles"
        :key="index"
        :prop="props[index]"
        :label="item"
        align="center"
      >
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            round
            @click="toPage(scope.row)"
            >查看</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            round
            @click="HomeDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "",
    },
    hasSearch: {
      type: Boolean,
      default: false,
    },
    titles: {
      type: Array,
    },
    props: {
      type: Array,
    },
    propsData: {
      type: Array,
    },
    searchData: {
      type: Array,
    },
  },
  data() {
    return {
      search: null,
    };
  },
  methods: {
    toPage(params) {
      console.log(params);
    },
    HomeSearch() {
      this.$emit("HomeSearch", this.search);
    },
    HomeDelete(params) {
      console.log(params.aid);
      this.$emit("HomeDelete", params.aid);
    },
  },
};
</script>

<style>
.el-table {
  width: 100%;
}

.th {
  text-align: center;
}
.search-input {
  display: inline-block;
  width: 300px;
  margin: 10px auto;
}
.search-button {
  display: inline-block;
  margin-left: 50px;
}
</style>