import axiosService from '../commons/axiosService'
import {API_URL} from '../constants'

const pathUser='api/v1/users';

export const getListUser = ()=>{
    return axiosService.get(`${API_URL}/${pathUser}`)
};

