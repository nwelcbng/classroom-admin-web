<template>
    <div class="footer">
        <a href="#"><div class="exit" @click="exit">退出登录</div></a>
    </div>
</template>

<script>
export default {
    methods:{
        exit(){
            localStorage.clear();
            location.href="./index";
        }
    }
}
</script>

<style>
    .footer{
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        overflow: hidden;
    }
    .exit{
        margin-right: 40px; 
    }
</style>