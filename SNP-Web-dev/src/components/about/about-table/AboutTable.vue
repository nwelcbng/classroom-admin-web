<template>
  <el-form ref="form" :model="form" label-width="150px">
    <el-form-item label="姓名">
      <span>{{ form.name }}</span>
    </el-form-item>
    <el-form-item label="学号">
      <span>{{ form.Sno }}</span>
    </el-form-item>
    <el-form-item label="性别">
      <span>{{ form.sex }}</span>
    </el-form-item>
    <el-form-item label="qq">
      <span>{{ form.qq }}</span>
    </el-form-item>
    <el-form-item label="手机">
      <span>{{ form.phone }}</span>
    </el-form-item>
    <el-form-item label="年级">
      <span>{{ form.grade }}</span>
    </el-form-item>
    <el-form-item label="学院">
      <span>{{ form.college }}</span>
    </el-form-item>
    <el-form-item label="专业和班级">
      <span>{{ form.major }}</span>
    </el-form-item>
    <el-form-item label="意向部门">
      <span>{{ form.dep }}</span>
    </el-form-item>
    <el-form-item label="第二部门">
      <span>{{ form.sec }}</span>
    </el-form-item>
    <el-form-item label="自我介绍">
      <div class="long-text">{{ form.intro }}</div>
    </el-form-item>
    <el-form-item label="如何了解社团">
      <div class="long-text">{{ form.know }}</div>
    </el-form-item>
    <!-- <el-form-item label="活动时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="即时配送">
    <el-switch v-model="form.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="活动性质">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源">
    <el-radio-group v-model="form.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item> -->
    <el-form-item align="center">
      <el-button type="primary" @click="onSubmit" round>考核学员</el-button>
      <el-button type="primary" @click="onSubmit" round>查看评价</el-button>
      <el-button round>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        Sno: "12312312",
        college: "计算机学院",
        dep: "网宣部",
        grade: "20级",
        intro:
          "我是而蔷薇科蔷薇了口气为了看却忘了看清未来我是而蔷薇科蔷薇了口气为了看却忘了看清未来我是而蔷薇科蔷薇了口气为了看却忘了看清未来我是而蔷薇科蔷薇了口气为了看却忘了看清未来",
        know: "的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿的请问请问请问请问额为全额饿",
        major: "软件工程",
        name: "Tan",
        phone: "12312312312313",
        qq: "1231231231",
        sec: "网宣部",
        sex: 0,
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
  created() {
    console.log("about create");
  },
};
</script>


<style>
.long-text {
  padding: 0 20px;
  text-align: left;
  text-indent: 2em;
}
</style>