import { request } from "./request";

export function getDeafult(){
    return request({
        url:"https://mockapi.eolinker.com/DIvEEJG0adff1fcb42ec5c36ec5dba353d96bb5387d1a6b/admin/getbydno"
    })
}