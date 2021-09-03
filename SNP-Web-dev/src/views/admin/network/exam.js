import { request } from "./request";

export function GetUserInfo() {
    return request({
        baseURL:"http://localhost:3001",
        url:"/userInfo"
    })
}

export function SetExamInfo(data){
    return request({
        method:'post',
        url:"/posts.json",
        data:data,
        headers:{
            'Api-Key': '8dc3de635a6e85c5572c310d31b12f400d7a0b2ac299c3ef6361e3a64111073c'
        }
    })
}

export function GetExamInfo(){
    return request({
        method:'get',
        url:"/posts.json",
        headers:{
            'Api-Key': '8dc3de635a6e85c5572c310d31b12f400d7a0b2ac299c3ef6361e3a64111073c'
        }
    })
}

export function DeleteInfo(id){
    return request({
        method:'delete',
        url:`/t/${id}.json`,
        headers:{
            'Api-Key': '8dc3de635a6e85c5572c310d31b12f400d7a0b2ac299c3ef6361e3a64111073c',
            'Api-Username': 'ELC-Bot'
        }
    })
}
