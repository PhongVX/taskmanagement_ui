import axiosService from '../commons/axiosService'

import {API_URL} from '../constants'


const authUrl ='api/v1/auth/login'


export const loginRequest = (payload)=>{
    return axiosService.post(`${API_URL}/${authUrl}`, payload)
}


