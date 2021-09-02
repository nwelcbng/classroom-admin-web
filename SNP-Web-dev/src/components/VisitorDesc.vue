<template>
  <div>
    <div class="desc">
      请打开 <a href="#" class="wx-applet">报名小程序</a>
      ，在报名页扫描下方二维码登录
      <div class="wx-applet-QR"></div>
    </div>
    <div class="wx-logincode" id="qrcode" ref="qrcode"></div>
    <span class="status">{{ status }}</span>
    <!-- <button class="go iconfont icon-jinru " :class="{'hide':goHide}"></button> -->
    <el-button
      type="success"
      :class="{ hide: goHide }"
      class="go"
      size="mini"
      round
      >进入<i class="el-icon-right el-icon--right"></i
    ></el-button>
  </div>
</template>

<script>
import QRcode from "qrcodejs2";
export default {
  name: "VisitorDesc",
  props: {
    UUID: String,
    jwt: String,
  },
  data() {
    return {
      status: "等待扫描",
      goHide: true,
    };
  },
  watch: {
    UUID: function (newData) {
      console.log("watch change " + newData);
      this.$refs.qrcode.innerHTML = ""; //清除原有二维码
      new QRcode(this.$refs.qrcode, {
        text: newData,
        width: 200,
        height: 200,
        colorLight:"#fff0"//背景透明
      });
    },
    jwt: function (newData) {
      console.log("get jwt" + newData);
      //TODO

      this.status = "登陆成功";
      this.goHide = false; //显示进入按钮
    },
  },
};
</script>

<style>
.desc {
  margin: 40px 5px;
  color: #7a737499;
  text-align: center;
  font-size: 25px;
  font-weight: 400;
  letter-spacing: 1px;
}
.wx-applet {
  color: #7a737499;
  text-decoration: underline;
}
/* 小程序二维码 hover状态显示 */
.wx-applet-QR {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -35%);
  width: 170px;
  height: 170px;
  background-color: blue;
  background: url("../assets/wx-applet-QR.png") no-repeat;
  background-size: 100% 100%;
  border-radius: 30%;
}
.wx-applet:hover + .wx-applet-QR {
  opacity: 1;
}
.wx-logincode {
  position: absolute;
  opacity: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -35%);
  width: 200px;
  height: 200px;
  z-index: -1;
}
.status {
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
  color: #7a737499;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 1px;
}
.go {
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  background-color: rgba(51, 214, 51, 0.603);
  box-shadow: 20px 20px 60px #bebebe99;
}
.go:hover {
  cursor: pointer;
}
.icon-jinru {
  color: rgba(16, 165, 16, 0.849);
  font-weight: 700;
}
</style>
