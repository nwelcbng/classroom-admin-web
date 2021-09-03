<template>
    <div class="UserInfo">        
        <img class="UserImg" src="~@/assets/img/logo.png" alt="">
        <div class="UserName">匿名用户</div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .UserInfo{
        width: 300px;
        height: 230px;
        text-align: center;
        position: relative;
    }
    .UserImg{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px grey solid;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 30px;
    }
    .UserName{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 180px;
    }
</style>