import Axios from "axios";

export function request(config) {
    const instance = Axios.create({
        baseURL:'https://www.ximple.icu/api',
        timeout: 10000
    })
    instance.interceptors.request.use(config => {
        return config;
    }, err => {
        throw new Error(err)
    })
    instance.interceptors.response.use(res => {
        return res.data;
    }, err => {
        throw new Error(err)
    })
    return instance(config);
}