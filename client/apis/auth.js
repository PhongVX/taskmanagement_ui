import axios from 'axios'
import axiosService from '../commons/axiosService'

import {API_URL} from '../constants'


const authUrl ='api/v1/auth/login'
const refreshUrl ='api/v1/auth/refresh'

export const loginRequest = (payload)=>{
    return axiosService.post(`${API_URL}/${authUrl}`, payload)
}

export const accessTokenRequest = (payload) =>{
    let inst = axios.create({ headers: { "Content-Type": "application/json;charset=utf-8" } })
    return inst.post(`${API_URL}/${refreshUrl}`, payload)
}

export const loginGoogleRequest =()=>{ 
    return axiosService.post("http://localhost:8585/api/v1/oauth/google/login")
}