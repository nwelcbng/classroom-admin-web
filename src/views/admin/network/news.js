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

export function deleteNews(data) {
    return request({
        url: '/admin/deleteAnnouncement',
        method: "POST",
        headers: {
            Authorization: localStorage.getItem('token')
        },
        data
    })
}

export function addNews(data){
    return request({
        url: '/admin/publicAnnouncement',
        method: "POST",
        headers: {
            Authorization: localStorage.getItem('token')
        },
        data
    })
}

export function changeNews(data){
    return request({
        url: '/admin/updateAnnouncement',
        method: "POST",
        headers: {
            Authorization: localStorage.getItem('token')
        },
        data
    })
}