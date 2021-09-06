<template>
  <div>
    <div class="search-input">
      <el-input v-model="search" :placeholder="'请输入' + type"></el-input>
    </div>
    <div class="search-button">
      <el-button icon="el-icon-search" @click="HomeSearch"></el-button>
    </div>
    <el-table :data="tableData" border>
      <el-table-column prop="date" label="日期" width="140" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            round
            @click="
              toPage({
                path: '/about',
                query: {},
              })
            "
            >查看</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="HomeDelete"
            round
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
      search: null,
    };
  },
  methods: {
    toPage(params) {
      this.$emit("toPage", params);
    },
    HomeSearch() {
      this.$emit("HomeSearch");
    },
    HomeDelete() {
      this.$emit("HomeDelete");
    },
  },
  computed: {
    type() {
      return this.$route.query.type ? this.$route.query.type:'学院号';
    },
  },

  created() {
    console.log("home create");
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