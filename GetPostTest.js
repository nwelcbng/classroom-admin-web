//Node 服务器 模拟后台接收/发送数据 监听在127.0.0.1:3421
//运行命令： node ./GetPostTest
"use strict"
console.log("Hello world");
var http = require("http")
var qs = require("querystring")
var statusNum = 100;
var statusUMsg = "";//用户留言
var statusAMsg = "";//管理员留言
var formInfo="";//报名表单
var server = http.createServer(function (request, response) {
  console.log(request.method, request.url);
  let data = "";

  response.writeHead(200, {
    "Content-Type": 'application/json,application/x-www-form-urlencoded',
    "Access-Control-Allow-Origin": "http://localhost:8081",
    "Access-Control-Allow-Headers": "Authorization,Content-Type",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "PUT,POST,OPTIONS,GET",
  });
  if (request.method === "OPTIONS") {
    response.end();
  }
  if (request.method === "POST" || request.method === "PUT") {
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
          code: 200,
          message: "success"
        } : {
          data: "null",
          code: -200,
          message: "wrong"
        }
        response.end(JSON.stringify(res));
      }
      if (request.url.includes("/user/webGetPhone")) {
        let d = qs.parse(data);
        console.log(d.phone);
        // console.log(request.headers.cookie);
        let res = request.headers.authorization ? {
          data: "ok",
          code: 1,
          msg: "已发送验证码"
        } : {
          data: "no jwt",
          code: -200,
          msg: "wrong no jwt"
        }
        response.end(JSON.stringify(res));
      }
      if (request.url.includes("/user/websign")) {
        let d = qs.parse(data);
        console.log(d, d.name);
        formInfo=d;
        let res = request.headers.authorization ? {
          data: "ok",
          code: 1,
          msg: "提交成功"
        } : {
          data: "no jwt",
          code: -200,
          msg: "wrong no jwt"
        }
        response.end(JSON.stringify(res));
      }
      if (request.url.includes("/user/setstatus")) {
        console.log(JSON.parse(data));
        statusNum = JSON.parse(data).check;
        statusUMsg = JSON.parse(data).reason;
        let res = request.headers.authorization ? {
          data: "ok",
          code: 1,
          msg: "提交成功"
        } : {
          data: "no jwt",
          code: -200,
          msg: "wrong no jwt"
        }
        response.end(JSON.stringify(res));
      }


    })
  }

  if (request.method === "GET") {
    if (request.url.includes("/user/getQRCode")) {
      response.end(JSON.stringify({
        data: "This is a test UUID",
        code: 200,
        message: "success"
      }));
    }
    if (request.url.includes("/user/weblogin")) {
      response.end(JSON.stringify({
        data: {
          code: 200,
          jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJwaG9uZSI6ZmFsc2UsImlhdCI6MTUxNjIzOTAyMn0.Bu7Sx763kL_x8BABjQo9axByiikGvQP67F7B8j4iMFI"
        },
        code: 200,
        message: "success"
      }));
    }
    if (request.url.includes("/user/getstatus")) {
      let res = request.headers.authorization ? {
        data: {
          enroll: statusNum,//当前状态值
          result: statusAMsg,//管理员留言
          usermsg: statusUMsg//用户留言
        },
        code: 1,
        msg: "成功 "
      } : {
        data: "no jwt",
        code: -200,
        msg: "wrong no jwt"
      }
      console.log(res);
      response.end(JSON.stringify(res));
    }
    if (request.url.includes("/user/getWebForm")) {
      let res = request.headers.authorization ? {
        data: formInfo,
        code: 1,
        msg: "成功 "
      } : {
        data: "no jwt",
        code: -200,
        msg: "wrong no jwt"
      }
      console.log(res);
      response.end(JSON.stringify(res));
    }
  }

})
server.listen(3421);
console.log("listening 127.0.0.1:3421");
