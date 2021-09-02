import Axios from "axios";

Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json';

export function request(config) {
    const instance = Axios.create({
        timeout: 5000
    })
    instance.interceptors.request.use(config => {
        return config;
    }, err => {
        console.log(err)
    })
    instance.interceptors.response.use(res => {
        return res.data;
    }, err => {
        console.log(err)
    })
    return instance(config);
}