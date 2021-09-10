import Axios from "axios";
import qs from "qs";

//向服务器发送手机号
export function PostPhone(config) {
  const axios = Axios.create({
    baseURL: "http://127.0.0.1:3421",
    timeout: 5000,
    // withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      "Authorization": localStorage.jwt,
    }
  });
  // document.cookie=localStorage.jwt;
  return axios.post("/user/webGetPhone", qs.stringify(config));
}
//向服务器发送报名表单
export function PostForm(config) {
  const axios = Axios.create({
    baseURL: "http://127.0.0.1:3421",
    timeout: 5000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage.jwt,
    }
  });
  return axios.post("/user/websign", qs.stringify(config));
}

//向服务器轮询用户扫码结果
export function GetScanResult() {
  const axios = Axios.create({
    baseURL: "http://127.0.0.1:3421",
    timeout: 5000,
    url: '/user/weblogin'
  });
  return axios();
}


//向服务器发送状态码信息
export function PutStatus(config) {
  const axios = Axios.create({
    baseURL: "http://127.0.0.1:3421",
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.jwt,
    }
  });
  return axios.put("/user/setstatus", config);
}

//向服务器请求状态码信息
export function GetStatus() {
  const axios = Axios.create({
    baseURL: "http://127.0.0.1:3421",
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.jwt,
    }
  });
  return axios("/user/getstatus");
}
