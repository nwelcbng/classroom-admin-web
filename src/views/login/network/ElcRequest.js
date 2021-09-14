import Axios from "axios";
import qs from "qs";
//向服务器请求UUUID GET

export function GetELCUUID(){
  const axios= Axios.create({
    baseURL:"http://127.0.0.1:3421",
    timeout: 5000,
    url: '/user/getQRCode'
  });
  return axios();
}

//向服务器发送管理员登录的账号信息
export function PostAdminLogin(config){
  const axios= Axios.create({
    baseURL:"http://127.0.0.1:3421",
    timeout: 5000,
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return axios.post("/admin/login",qs.stringify(config.data));
}

//向服务器轮询用户扫码结果
export function PostScanResult(config){
  const axios= Axios.create({
    baseURL:"http://127.0.0.1:3421",
    timeout: 5000,
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return axios.post('/user/weblogin',qs.stringify(config));
}
