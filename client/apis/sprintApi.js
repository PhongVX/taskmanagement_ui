import axiosService from '../commons/axiosService'
import {API_URL} from '../constants'

const pathSprint='api/v1/sprints';

export const getListSprint = (createdByID)=>{
    let params=`?created_by_id=${createdByID}`
    return axiosService.get(`${API_URL}/${pathSprint}${params}`)
};

export const updateSprint = (payload)=>{ 
    return axiosService.put(`${API_URL}/${pathSprint}`, payload)
}

export const createSprint = (payload)=>{ 
    return axiosService.post(`${API_URL}/${pathSprint}`, payload)
}

export const deleteSprint = (id)=>{ 
    return axiosService.delete(`${API_URL}/${pathSprint}/${id}`)
}