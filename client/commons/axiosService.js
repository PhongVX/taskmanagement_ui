import axios from 'axios'
import {URL} from '../constants'
import {clearLocalStorage, getToken} from './utils'
class axiosService {
    constructor() {
        const instance = axios.create({ headers: { "Content-Type": "application/json;charset=utf-8" } })
        instance.interceptors.response.use(this.handleSuccess, this.handleError)
        instance.interceptors.request.use(async (config) => {
            if (!config.headers.Authorization) {
                let token = getToken('access_token');
                if (token) {
                    // let isExpire = checkTokenExpired(token)
                    // if (!isExpire) {
                    config.headers.Authorization = `Bearer ${token}`;
                    // }
                  
                }else{
                    clearLocalStorage()
                    window.location.href = URL.login
                }

            }
            return config;
        }, error => {
            Promise.reject(error)
        })
        this.instance = instance
    }

    handleSuccess(response) {
        return response
    }

    handleError(error) {
        return Promise.reject(error)
    }

    get(url) {
        return this.instance.get(url)
    }

    post(url, payload) {
        return this.instance.post(url, payload)
    }

    put(url, payload) {
        return this.instance.put(url, payload)
    }

    delete(url, payload) {
        return this.instance.delete(url, payload)
    }

    upload(url, formData) {
        return this.instance.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    export(url){ 
        return this.instance.get(url,{ 
            responseType: 'blob'
        })
    }
}

export default new axiosService()