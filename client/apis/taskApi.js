import axiosService from '../commons/axiosService'
import {API_URL} from '../constants'

const pathTask='api/v1/tasks';

export const getListTask = (sprintId)=>{
    let params=`?sprint_id=${sprintId}` 
    return axiosService.get(`${API_URL}/${pathTask}${params}`)
};

export const updateTask = (payload)=>{ 
    return axiosService.put(`${API_URL}/${pathTask}`, payload)
}