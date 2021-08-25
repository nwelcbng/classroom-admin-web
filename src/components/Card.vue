<template>
  <div>
    <div class="out-card">
      <transition
        name="card"
        enter-class="card-enter"
        enter-active-class="card-enter-active"
      >
        <div class="card clearfix" v-if="!cardHide">
          <slot></slot>
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
        {{contentTitle}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props:{
    contentTitle:String
  },
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
      this.$emit("getUUID");//通知父组件获取uuid
    },
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
  transition: opacity 1.5s;
  transition-delay: 1.5s;
}

/* 一般样式 */

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
.out-card {
  position: relative;
  height: 400px;
  width: 350px;
  /* background-color: red; */
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
</style>
