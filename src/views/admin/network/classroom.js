import { request } from './request'

export function getAllClass() {
    return request({
        url: '/user/getClass',
        method: "GET",
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export function getClassStatusByDate(data) {
    return request({
        url: '/user/getClassStatusByDate',
        method: "GET",
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params:data
    })
}

export function addClass(data){
    console.log(data)
    return request({
        url: '/admin/addClassRoom',
        method: "POST",
        headers: {
            Authorization: localStorage.getItem('token')
        },
        data
    })
}

export function deleteClass(data){
    return request({
        url: '/admin/deleteClassRoom',
        method: "POST",
        headers: {
            Authorization: localStorage.getItem('token')
        },
        data
    })
}

export function changeClassStatus(data){
    return request({
        url: '/admin/changeClassStatus',
        method: "POST",
        headers: {
            Authorization: localStorage.getItem('token')
        },
        data
    })
}