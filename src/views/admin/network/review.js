import { request } from './request'

export function getAllReview() {
    return request({
        url: '/admin/getForwards',
        method: "GET",
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export function check(data) {
    return request({
        url: '/admin/check',
        method: "POST",
        headers: {
            Authorization: localStorage.getItem('token')
        },
        data
    })
}