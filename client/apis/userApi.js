import axiosService from '../commons/axiosService'
import {API_URL} from '../constants'

const pathUser='api/v1/users';
const pathWhoAmI='who-am-i'

export const getListUser = ()=>{
    return axiosService.get(`${API_URL}/${pathUser}`)
}

export const updateUser = (payload)=>{ 
    return axiosService.put(`${API_URL}/${pathUser}`, payload)
}

export const createUser = (payload)=>{ 
    return axiosService.post(`${API_URL}/${pathUser}`, payload)
}

export const deleteUser = (id)=>{ 
    return axiosService.delete(`${API_URL}/${pathUser}/${id}`)
}

export const whoAmI = (identity)=>{
    return axiosService.get(`${API_URL}/${pathUser}/${pathWhoAmI}/${identity}`)
}
