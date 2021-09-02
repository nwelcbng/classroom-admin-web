<template>
  <div class="commentsItem">
    <div class="commentsHost">
      <img src="~@/assets/img/logo.png" alt="" class="Host-img" />
      <span class="Host-name"><span class="Host">{{data.host}}</span>  对  {{data.name}}  的评价：</span>
    </div>
    <div class="commentsInfo">
      <div class="message">
        {{data.message}}
      </div>
    </div>
    <div class="commentsData">
      <el-rate
        v-model="data.value"
        disabled
        :icon-classes="iconClasses"
        void-icon-class="icon-rate-face-off"
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
        class="rate"
        show-text
      >
      </el-rate>
      <span class="time">{{data.time}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"], // 等同于 { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' }
    };
  },
  props:{
    data:Object
  },
  methods: {},
};
</script>

<style scoped>
.commentsItem {
  border: 1px solid #f1f1f1;
  padding: 0 10px;
  margin: 30px;
}
.commentsHost {
  display: flex;
  align-items: center;
}
.Host-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid black;
}
.Host-name {
  margin: 20px;
}
.Host{
  color: #409eff;
  font-size: 20px;
}
.commentsInfo {
  border: 1px solid #f3f3f3;
  padding: 20px;
}
.message {
  text-indent: 2em;
}
.message {
  text-align: left;
}
.commentsData {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.rate,
.time {
  margin: 0 30px;
}
</style>