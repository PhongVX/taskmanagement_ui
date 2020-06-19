import axiosService from '../commons/axiosService'
import {API_URL} from '../constants'

const pathSprint='api/v1/sprints';

export const getListSprint = ()=>{
    return axiosService.post(`${API_URL}/${pathSprint}`)
};

