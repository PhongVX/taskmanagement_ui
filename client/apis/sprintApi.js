import axiosService from '../commons/axiosService'
import {API_URL} from '../constants'

const pathSprint='api/v1/sprints';

export const getListSprint = (createdByID)=>{
    let params=`?created_by_id=${createdByID}`
    return axiosService.get(`${API_URL}/${pathSprint}${params}`)
};

