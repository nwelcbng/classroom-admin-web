<template>
  <div>
    <div class="title">
      <span class="italic">GDUTELC</span> - 干事招新报名系统
    </div>
    <div id="cards">
      <card></card>
    </div>
  </div>
</template>

<script>
import Card from './components/Card.vue'
export default {
	components: { Card },
  name:"App"
}
</script>

<style>
body {
    background-image: linear-gradient(125deg,#fab1a0,
    #ffeaa7,#55efc4,#81ecec,#74b9ff,#a29bfe);
    background-size: 500% 500%;
    /* animation: slide 15s infinite; */

}
@keyframes slide {
    0%{
        background-position: 0% 0%;
    }
    25%{
        background-position: 75% 50%;
    }
    50%{
        background-position: 100% 50%;
    }
    75%{
        background-position: 50% 75%;
    }
    100%{
        background-position: 0% 0%;
    }
}
.title{
    margin-top: 50px;
    font-size: 50px;
    letter-spacing: 10px;
    text-align: center;
    color: #ffffff99;

}
#cards{
    margin-top: 80px;
    display: flex;
    justify-content: space-around;
}
</style>
