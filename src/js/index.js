
console.log("begin");
var visCard=$(".visitor");
var visBtn=$(".visitor-btn");
var card=$(".card");
var text =$(".visitor-btn-text");
var changing=false;
// 模拟伪类元素hover效果 在鼠标移入时加上类
visBtn.on("mouseenter",function(){
    if(changing)return ;//如果正在进行动画就忽略hover状态
    console.log("in...");
    visBtn.addClass("card-center-btn-hover");
    text.addClass("btn-text-hover");
});

visBtn.on("mouseleave",function(){
    if(changing)return ;
    console.log("out...");
    visBtn.removeClass("card-center-btn-hover");
    text.removeClass("btn-text-hover");
});
//动画开始时候移除hover的样式
visBtn.on("animationstart",function(){
    changing=true;
    visBtn.removeClass("card-center-btn-hover");
    text.removeClass("btn-text-hover");
});
visBtn.on('click',()=>{
    console.log("btn click");
    //添加动画
    visBtn.addClass("expendbtn");
    text.addClass("movetitle");
});
//结束时显示card 隐藏btn
visBtn.on("animationend",function(){
    //先让卡片准备出现
    visCard.removeClass("hide");
    visCard.fadeOut(0);
    visCard.fadeIn(500);
    //让按钮同步渐渐消失
    visBtn.fadeOut(500);
    setTimeout(()=>{
        visBtn.removeClass("expendbtn");
        visBtn.addClass("card-center-btn:hover");
        changing=false;
    },2000);
    
});