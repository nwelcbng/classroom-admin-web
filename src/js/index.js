
console.log("begin");
var visCard=$(".visitor");
var visBtn=$(".visitor-btn");
var vis_test =$(".visitor-btn-text");
var vis_changing=false;

var adminCard=$(".admin");
var adminBtn=$(".admin-btn");
var admin_test =$(".admin-btn-text");
var admin_changing=false;
// 模拟伪类元素hover效果 在鼠标移入时加上类
visBtn.on("mouseenter",function(){
    if(vis_changing)return ;//如果正在进行动画就忽略hover状态
    console.log("in...");
    visBtn.addClass("card-center-btn-hover");
    vis_test.addClass("btn-text-hover");
});
adminBtn.on("mouseenter",function(){
    if(admin_changing)return ;//如果正在进行动画就忽略hover状态
    console.log("in...");
    adminBtn.addClass("card-center-btn-hover");
    admin_test.addClass("btn-text-hover");
});

visBtn.on("mouseleave",function(){
    if(vis_changing)return ;
    console.log("out...");
    visBtn.removeClass("card-center-btn-hover");
    vis_test.removeClass("btn-text-hover");
});
adminBtn.on("mouseleave",function(){
    if(admin_changing)return ;
    console.log("out...");
    adminBtn.removeClass("card-center-btn-hover");
    admin_test.removeClass("btn-text-hover");
});
//动画开始时候移除hover的样式
visBtn.on("animationstart",function(){
    vis_changing=true;
    visBtn.removeClass("card-center-btn-hover");
    vis_test.removeClass("btn-text-hover");
    makeQR("testtesttest");
});
adminBtn.on("animationstart",function(){
    admin_changing=true;
    adminBtn.removeClass("card-center-btn-hover");
    admin_test.removeClass("btn-text-hover");
});
visBtn.on('click',()=>{
    console.log("btn click");
    //添加动画
    visBtn.addClass("expendbtn");
    vis_test.addClass("movetitle");
});
adminBtn.on('click',()=>{
    console.log("btn click");
    //添加动画
    adminBtn.addClass("expendbtn");
    admin_test.addClass("movetitle");
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
        vis_changing=false;
        
        simulation();
    },2000);
    
});
adminBtn.on("animationend",function(){
    //先让卡片准备出现
    adminCard.removeClass("hide");
    adminCard.fadeOut(0);
    adminCard.fadeIn(500);
    //让按钮同步渐渐消失
    adminBtn.fadeOut(500);
    setTimeout(()=>{
        adminBtn.removeClass("expendbtn");
        adminBtn.addClass("card-center-btn:hover");
        admin_changing=false;
    },2000);
    
});

function changeStatus(txt){
    var status=$(".status");
    // console.log(status);
    status.text(txt);
}
function simulation(){
    setTimeout(()=>{
        changeStatus("确认中");
        console.log("ok?");
    },2000);
    setTimeout(()=>{
        changeStatus("登录成功");
        console.log("ok!");
        var goBtn=$(".go");
        goBtn.removeClass("hide");
    },3000);
}
function makeQR(str){
    console.log("making qrcode");
    $("#qrcode").qrcode({
        render:"table",
        width:200,
        height:200,
        text: str
    });
    console.log("done");
}