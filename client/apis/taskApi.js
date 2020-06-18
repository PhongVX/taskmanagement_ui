import axiosService from '../commons/axiosService'
import {API_URL} from '../constants'

const pathTask='api/v1/tasks';

export const getTask = ()=>{
    return axiosService.post(`${API_URL}/${pathTask}`)
};

