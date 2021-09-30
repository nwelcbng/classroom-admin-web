import { request } from "./request";
export function login(data){
    return request({
        url:'/user/login',
        method:'POST',
        data:data
    })
}
export function test(){
    return request({
        url:'/admin/getAnnouncements',
        method:'GET',
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}