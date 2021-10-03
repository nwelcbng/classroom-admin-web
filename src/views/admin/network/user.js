import { request } from './request'

export function getAllUsers() {
    return request({
        url: '/admin/getAllUsers',
        method: "GET",
        headers: {
            Authorization: localStorage.getItem('token')
        } 
    })
}

export function changePermission(data) {
    return request({
        url: '/admin/changePermission',
        method: "POST",
        headers: {
            Authorization: localStorage.getItem('token')
        },
        data
    })
}

export function cancelUser(data) {
    return request({
        url: '/admin/deleteUser',
        method: "POST",
        headers: {
            Authorization: localStorage.getItem('token')
        },
        data
    })
}
