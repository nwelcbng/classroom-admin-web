import { request } from './request'

export function getAllNews() {
    return request({
        url: '/admin/getAnnouncements',
        method: "GET",
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export function searchNews(aid) {
    return request({
        url: '/admin/getAnnouncementById',
        method: "GET",
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: {
            aid
        }
    })
}

export function deleteNews(aid) {
    return request({
        url: '/admin/deleteAnnouncement',
        method: "POST",
        headers: {
            Authorization: localStorage.getItem('token')
        },
        params: {
            aid
        }
    })
}