<template>
  <div>
    <el-card class="box-card">
      <div slot="header">这是报名表单</div>
      <div>
        <el-form
          status-icon
          ref="form"
          :model="form"
          :rules="rules"
          label-width="110px"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" class="half"></el-input>
            <div class="half preview">
              <VueMarkdown :source="form.name" />
            </div>
          </el-form-item>

          <el-form-item label="年级" prop="grade">
            <el-select
              v-model="form.grade"
              placeholder="请选择年级"
              class="half"
            >
              <el-option
                v-for="item in gradeOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
            <div class="half preview">
              <!-- <VueMarkdown :source="gradeOptions[form.grade - 1].label" /> -->
            </div>
          </el-form-item>

          <el-form-item label="学院" prop="college">
            <el-select
              v-model="form.college"
              placeholder="请选择学院"
              class="half"
            >
              <el-option
                v-for="item in collegeOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
            <div class="half preview">
              <!-- <VueMarkdown :source="collegeOptions[form.college - 1].label" /> -->
            </div>
          </el-form-item>

          <el-form-item
            :label="form.college == 23 ? '学院专业' : '专业'"
            prop="major"
          >
            <el-input v-model="form.major" class="half"></el-input>
            <div class="half preview"><VueMarkdown :source="form.major" /></div>
          </el-form-item>

          <el-form-item label="班级" prop="class">
            <el-input v-model="form.class" class="half"></el-input>
            <div class="half preview"><VueMarkdown :source="form.class" /></div>
          </el-form-item>

          <el-form-item label="学号" prop="sno">
            <el-input v-model="form.sno" class="half"></el-input>
            <div class="half preview"><VueMarkdown :source="form.sno" /></div>
          </el-form-item>

          <el-form-item label="QQ号" prop="qq">
            <el-input v-model="form.qq" class="half"></el-input>
            <div class="half preview"><VueMarkdown :source="form.qq" /></div>
          </el-form-item>

          <div v-if="needPhone">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" class="half">
                <el-button slot="append" @click="getCode" :disabled="!ifCode">{{getCodeMsg}}</el-button>
              </el-input>
              <div class="half preview">
                <!-- <VueMarkdown :source="form.phone" /> -->
                </div>
            </el-form-item>
            <el-form-item label="验证码" style="width: 300px" prop="checkcode">
              <el-input v-model="form.checkcode"></el-input>
            </el-form-item>
          </div>

          <el-form-item label="宿舍" prop="domitory">
            <el-input v-model="form.domitory" class="half"></el-input>
            <div class="half preview">
              <VueMarkdown :source="form.domitory" />
            </div>
          </el-form-item>

          <el-form-item label="性别">
            <el-radio-group v-model="form.gender">
              <el-radio-button label="false">美若天仙</el-radio-button>
              <el-radio-button label="true">貌若潘安</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="意向部门" prop="dno">
            <el-select v-model="form.dno" placeholder="请选择部门" class="half">
              <el-option
                v-for="item in departOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
            <div class="half preview">
              <!-- <VueMarkdown :source="departOptions[form.dno - 1].label" /> -->
            </div>
          </el-form-item>

          <el-form-item label="第二意向" prop="secdno">
            <el-select
              v-model="form.secdno"
              placeholder="请选择部门"
              class="half"
            >
              <el-option
                v-for="item in departOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
            <div class="half preview">
              <!-- <VueMarkdown :source="departOptions[form.dno - 1].label" /> -->
            </div>
          </el-form-item>

          <el-form-item label="自我介绍" prop="dsp">
            <el-input
              type="textarea"
              class="half"
              v-model="form.dsp"
            ></el-input>
            <div class="half preview"><VueMarkdown :source="form.dsp" /></div>
          </el-form-item>

          <el-form-item label="如何了解协会的" prop="know">
            <el-input
              type="textarea"
              class="half"
              v-model="form.know"
            ></el-input>
            <div class="half preview"><VueMarkdown :source="form.know" /></div>
          </el-form-item>

          <el-form-item label="已加入的社团">
            <el-input
              type="textarea"
              class="half"
              v-model="form.party"
            ></el-input>
            <div class="half preview"><VueMarkdown :source="form.party" /></div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click.prevent="onSubmit" class="">提交</el-button>
            <el-button type="primary" @click="storeLoc" class="inline-block">暂存至本地</el-button>
            <el-button type="primary" @click="recoverLoc" class="inline-block">恢复本地历史</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
export default {
  components: { VueMarkdown },
  props:{
    formInfo:{
      type:Object,
      default: function(){
        return {}
      }
    }
  },
  data() {
    var checkPhone=(rule,value,callback)=>{
      if(!this.ifPhone){
        callback();//不需要填手机号时跳过
      }
      if(!value){
        this.ifCode=false;
        callback(new Error("请输入电话号码"))
      }
      let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
      if(!reg.test(value)){
        this.ifCode=false;
        callback(new Error("请输入正确的电话号码"))
      }
      else{
        this.ifCode=true;
        callback();
      }
    };
    var checkCode=(rule,value,callback)=>{
      if(!this.ifPhone){
        callback();//不需要填手机号时跳过
      }
      if(!value){
         callback(new Error("请输入验证码"))
      }
      let reg = /^\d{6}$/;
      if(!reg.test(value)){
         callback(new Error("请输入正确的验证码"))
      }
      else{
        callback();
      }
    };
    var checkSno=(rule,value,callback)=>{
      if(!value){
         callback(new Error("请输入学号"))
      }
      let reg = /^\d{10}$/;
      if(!reg.test(value)){
         callback(new Error("请输入正确的学号"))
      }
      else{
        callback();
      }
    };
    var checkQQ=(rule,value,callback)=>{
      if(!value){
         callback(new Error("请输入qq"))
      }
      let reg = /^\d{5,13}$/;
      if(!reg.test(value)){
         callback(new Error("请输入正确qq"))
      }
      else{
        callback();
      }
    };
    return {
      needPhone: true,
      ifCode: false,
      codeSec:0,
      form: {
        name: "",
        grade: "",
        college: "",
        major: "",
        class: "",
        dsp: "", //自我介绍
        dno: "", //第一意向部门
        secdno: "", //第二意向部门
        gender: true, //性别
        sno: "", //学号
        qq: "",
        domitory: "", //宿舍位置
        know: "", //如何了解到协会
        party: "", //已加入的社团
        checkcode: "", //手机验证码
        phone:"",
      },
      rules: {
        name: [{ required: true, message: "请输入名字", trigger: "blur" }],
        grade: [{ required: true, message: "请选择年级", trigger: "change" }],
        college: [{ required: true, message: "请选择学院", trigger: "change" }],
        major: [{ required: true, message: "请输入专业", trigger: "blur" }],
        class: [{ required: true, message: "请输入班级", trigger: "blur" }],
        dsp: [{ required: true, message: "请输入自我介绍", trigger: "blur" }],
        dno: [{ required: true, message: "请选择意向部门", trigger: "change" }],
        secdno: [{ required: true, message: "请选择第二意向部门", trigger: "change" }],
        sno: [{ validator: checkSno,required: true,  trigger: 'blur' }],
        qq: [{ validator: checkQQ,required: true,  trigger: 'blur' }],
        domitory: [{ required: true, message: "请输入宿舍", trigger: "blur" }],
        know: [{ required: true, message: "请输入了解途径", trigger: "blur" }],
        phone: [{ validator: checkPhone,required: true,  trigger: 'change' }],
        checkcode: [{ validator: checkCode,required: true,  trigger: 'blur' }],
      },
      gradeOptions: [
        {
          value: 1,
          label: "大一",
        },
        {
          value: 2,
          label: "大二",
        },
        {
          value: 3,
          label: "大三",
        },
        {
          value: 4,
          label: "大四",
        },
        {
          value: 5,
          label: "研究生",
        },
      ],
      collegeOptions: [
        {
          value: 1,
          label: "机电工程学院",
        },
        {
          value: 2,
          label: "自动化学院",
        },
        {
          value: 3,
          label: "轻工化工学院",
        },
        {
          value: 4,
          label: "信息工程学院",
        },
        {
          value: 5,
          label: "土木与交通工程学院",
        },
        {
          value: 6,
          label: "管理学院",
        },
        {
          value: 7,
          label: "计算机学院",
        },
        {
          value: 8,
          label: "材料与能源学院",
        },
        {
          value: 9,
          label: "环境科学与工程学院",
        },
        {
          value: 10,
          label: "外国语学院",
        },
        {
          value: 11,
          label: "数学与统计学院",
        },
        {
          value: 12,
          label: "物理与光电工程学院",
        },
        {
          value: 13,
          label: "艺术与设计学院",
        },
        {
          value: 14,
          label: "政法学院",
        },
        {
          value: 15,
          label: "马克思主义学院",
        },
        {
          value: 16,
          label: "建筑与城市规划学院",
        },
        {
          value: 17,
          label: "经济与贸易学院",
        },
        {
          value: 18,
          label: "生物医药学院",
        },
        {
          value: 19,
          label: "微电子学院",
        },
        {
          value: 20,
          label: "国际教育学院",
        },
        {
          value: 21,
          label: "继续教育学院",
        },
        {
          value: 22,
          label: "先进制造学院",
        },
        {
          value: 23,
          label: "其他学院",
        },
      ],
      departOptions: [
        {
          value: 1,
          label: "维修部",
        },
        {
          value: 2,
          label: "秘书部",
        },
        {
          value: 3,
          label: "网宣部",
        },
        {
          value: 4,
          label: "外联部",
        },
        {
          value: 5,
          label: "实践部",
        },
        {
          value: 6,
          label: "项目部",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid)=>{
        if(valid){
          console.log("提交", JSON.stringify(this.form));
          this.$emit("submitForm",JSON.parse(JSON.stringify(this.form)))
        }else{
          return false;
        }
      })
    },
    getCode(){
      this.$emit("getCode",this.form.phone)//向上请求发送验证码
      this.codeSec=60;
      var countDown=setInterval(()=>{this.codeSec--},1000)//开始倒计时
      this.ifCode=false;//并禁止点击按钮
      setTimeout(()=>{
        window.clearInterval(countDown)//清除倒计时
        this.ifCode=true;//恢复按钮点击
      },60000)
    },
    storeLoc(){
      // console.log(this.form);
      // console.log((new Function("return "+JSON.stringify(this.form)))());
      localStorage.setItem("formHistory",JSON.stringify(this.form));
      this.$message({
          message: "保存成功",
          type: 'success'
        });
    },
    recoverLoc(){
      if(!localStorage.formHistory){
        this.$message({
          message:"暂未历史记录，请先保存",
          type:"error"
        });
        return ;
      }
      let oldForm=JSON.parse(localStorage.formHistory);
      Object.keys(this.form).forEach(key => {
        // console.log(key,oldForm[key]);
        this.form[key]=oldForm[key]
      });
    }
  },
  watch:{
    formInfo:{
      immediate:true,
      deep:true,
      handler(newFormInfo){
        // console.log("new",newFormInfo);
        Object.keys(this.form).forEach(key => {
        // console.log(key,newForm[key]);
        this.form[key]=newFormInfo[key]
        if(key==="grade"||key==="college"||key==="dno"||key==="secdno"){
          this.form[key]=this.form[key]?this.form[key]-0:1;//还原成数字
          //上面在初始化时，若为空，则数据全部为undefined，要对数值做适配
        }
      });
      }
    }
  },
  computed:{
    getCodeMsg(){
      if(this.codeSec==0){
        return "获取验证码"
      }else{
        return "获取验证码("+this.codeSec+")"
      }
    }
  },
  created(){
    // console.log(JSON.parse(Buffer.from(localStorage.jwt.split(".")[1], 'base64')).phone);
    if(!localStorage.jwt){
      this.$message({
          message: '未检测到有效登录信息，请重新登录',
          type: 'warning'
        });
      setTimeout(()=>location.href="/",2000);
      return ;
    }else if(JSON.parse(Buffer.from(localStorage.jwt.split(".")[1], 'base64')).phone){
      this.needPhone=false;
    }
    this.$emit("getForm");//第一次创建时拉取报名表

  }
};
</script>

<style>
.el-form-item__content {
  display: flex;
  flex-flow: row;
}
.half {
  flex: 1;
}
.preview {
  padding-left: 30px;
}
.inline-block{
  display: inline-block;
}
</style>
