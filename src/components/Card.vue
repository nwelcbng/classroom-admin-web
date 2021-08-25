<template>
  <div>
    <div class="out-card">
      <transition
        name="card"
        enter-class="card-enter"
        enter-active-class="card-enter-active"
      >
        <div class="visitor card clearfix" v-if="!cardHide">
          <div class="desc">
            请打开 <a href="#" class="wx-applet">报名小程序</a>
            ，在报名页扫描下方二维码登录
            <div class="wx-applet-QR"></div>
          </div>
          <div class="wx-logincode" id="qrcode"></div>
          <span class="status">等待扫描</span>
          <button class="go iconfont icon-jinru hide"></button>
        </div>
      </transition>

      <transition name="btn" leave-active-class="btn-leave-active">
        <button
          class="visitor-btn card-center-btn"
          :class="{ 'card-center-btn-hover': btnHover }"
          @mouseenter="btnMouseEnter"
          @mouseleave="btnMouseLeave"
          @click="btnClick"
          ref="btn"
          v-if="!btnHide"
        ></button>
      </transition>
      <p
        class="visitor-btn-text btn-text"
        :class="{ 'btn-text-hover': textHover, movetitle: moveTitle }"
        @mouseenter="btnMouseEnter"
        @mouseleave="btnMouseLeave"
      >
        干事报名
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      onAnima: false,
      btnHover: false,
      btnHide: false,
      textHover: false,
      cardHide: true,
      expendBtn: false,
      moveTitle: false,
    };
  },
  mounted() {
    console.log("created!");
    //手动添加动画开始和结束的监听
    this.$refs.btn.addEventListener("animationstart", () => {
      this.onAnima = true;
      this.btnIsHover(false);
    });
    this.$refs.btn.addEventListener("animationend", () => {
      this.onAnima = false;
    });
  },
  methods: {
    btnIsHover(status) {
      this.btnHover = status;
      this.textHover = status;
    },
    btnMouseEnter() {
      if (this.onAnima) return; //如果正在进行动画就忽略hover状态
      this.btnIsHover(true);
    },
    btnMouseLeave() {
      if (this.onAnima) return; //如果正在进行动画就忽略hover状态
      this.btnIsHover(false);
    },
    btnClick() {
      this.moveTitle = true;
      this.btnHide = true;
      this.cardHide = false;
    }
  },
};
</script>

<style>
/* 动画样式 */

.btn-leave-active {
  animation: expending 3s linear;
}
@keyframes expending {
  50% {
    height: 400px;
    width: 350px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10%;
    box-shadow: 20px 20px 60px #bebebe99;
    color: #7a737499;
    text-align: center;
  }
  100% {
    height: 400px;
    width: 350px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10%;
    box-shadow: 20px 20px 60px #bebebe99;
    color: #7a737499;
    text-align: center;
    opacity: 0;
  }
}
/* 按钮文字上移成标题的动画样式组 */
.movetitle {
  animation: moving 1.5s forwards linear;
}
@keyframes moving {
  to {
    top: 5%;
    color: #7a737499;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 1px;
  }
}
.card-enter {
  opacity: 0;
}
.card-enter-active {
  /* animation: movingg 3s; */
  /* animation-delay: 1.5s; */
  transition: opacity 1.5s;
  transition-delay: 1.5s;
}
@keyframes movingg {
  100% {
    opacity: 1;
  }
}


/* 一般样式 */
.out-card {
  position: relative;
  height: 400px;
  width: 350px;
  /* background-color: red; */
}
.card {
  position: relative;
  height: 400px;
  width: 350px;
  background-color: rgba(255, 255, 255, 0.3);
  /* -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px); */
  border-radius: 10%;
  box-shadow: 20px 20px 60px #bebebe99;
}
.card-center-btn {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(235, 233, 233, 0.424);
  /* -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px); */
  border-radius: 50%;
  box-shadow: 5px 5px 6px #bebebe99;
}
/* 这里不用伪类是因为在动画开始的时候要取消伪类的样式 js做不到 */
.card-center-btn-hover {
  cursor: pointer;
  transform: translate(-51%, -51%);
  box-shadow: 8px 8px 10px #bebebe99;
}

.btn-text {
  position: absolute;
  width: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 30px;
  color: #00000063;
  font-weight: 800;
  letter-spacing: 5px;
}

.btn-text-hover {
  cursor: pointer;
  transform: translate(-51%, -51%);
}

.visitor .desc {
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
  background-color: blue;
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
  width: 30px;
  height: 30px;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background-color: rgba(235, 233, 233, 0.63);
}
.go:hover {
  cursor: pointer;
}
.icon-jinru {
  color: rgba(16, 165, 16, 0.849);
  font-weight: 700;
}


</style>
