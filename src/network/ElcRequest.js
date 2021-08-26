import Axios from "axios";
import qs from "qs";
//向服务器请求UUUID GET
export function GetUUID(config){
  const axios= Axios.create({
    baseURL:"http://127.0.0.1:3421",
    timeout: 5000
  });
  return axios(config);
}
//向服务器发送管理员登录的账号信息
export function PostAdminLogin(url,config){
  const axios= Axios.create({
    baseURL:"http://127.0.0.1:3421",
    timeout: 5000,
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return axios.post(url,qs.stringify(config.data));
}
