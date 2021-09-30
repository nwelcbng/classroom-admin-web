import { request } from './request'

export function getAllUsers() {
    console.log(localStorage.getItem('token'))
    return request({
        url: '/admin/getAllUsers',
        method: "GET",
        headers: {
            Authorization: localStorage.getItem('token')
        }
        
    })
}