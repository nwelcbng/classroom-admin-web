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