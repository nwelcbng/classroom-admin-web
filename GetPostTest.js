//Node 服务器 模拟后台接收/发送数据 监听在127.0.0.1:3421
//运行命令： node ./GetPostTest
"use strict"
console.log("Hello world");
var http = require("http")
var qs = require("querystring")
var server = http.createServer(function (request, response) {
  console.log(request.method, request.url);
  let data = "";

  response.writeHead(200, {
    "Content-Type": 'text/html',
    "Access-Control-Allow-Origin": "*"
  });
  if (request.method === "POST") {
    request.on('data', chunk => {
      data += chunk;
    });
    request.on("end", () => {

      if (request.url.includes("/admin/login")) {
        let d = qs.parse(data);
        console.log(qs.parse(data));
        console.log(d.username, d.password);
        let res = d.username.includes("admin") ? {
          data: "This is an admin jwt",
          code:200,
          message: "success"
        } : {
          data: "null",
          code: -200,
          message: "wrong"
        }
        response.end(JSON.stringify(res));
      }
    })
  }
  if (request.url.includes("/user/getQRCode")) {
    response.end(JSON.stringify({
      data: "This is a test UUID",
      code: 200,
      message: "success"
    }));
  }
  if(request.url.includes("/user/weblogin")){
    response.end(JSON.stringify({
      data: {
        code:200,
        jwt:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJwaG9uZSI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ.x27K81l-cGgBgsMCc0-XopG25CX-aZG3qrI9OOcjs1M"
      },
      code: 200,
      message: "success"
    }));
  }

})
server.listen(3421);
console.log("listening 127.0.0.1:3421");
