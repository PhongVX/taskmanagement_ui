import * as userApi from '../apis/userApi'
import * as userConstants from '../constants/userConstants'

export const clearListUser = ()=>{
    return{
        type: userConstants.CLEAR_USER
    }
}

export const fetchListUserSuccess = (data)=>{
    return{
        type: userConstants.FETCH_USER_SUCCESS,
        payload:{
            data
        }
    }
}

export const fetchListUserFailed = (error)=>{
    return{
        type: userConstants.FETCH_USER_FAILED,
        payload:{
            error
        }
    }
}

export const fetchListUserRequest = ()=>{
    return dispatch =>{
        userApi
        .getListUser()
        .then(resp=>{
            const {data} = resp
            const {result} = data
            dispatch(fetchListUserSuccess(result))
        }).catch(error=>{
            dispatch(fetchListUserFailed(error))
        })
    }
}

export const updateUserRequest = (payload, resolve, reject) => { 
    return dispatch =>{
        userApi
        .updateUser(payload)
        .then(resp=>{
            dispatch(fetchListUserRequest())
            resolve(resp)
        }).catch(error=>{
            reject(error)
        })
    } 
}

export const createUserRequest = (payload, resolve, reject) =>{
    return dispatch =>{
        userApi
        .createUser(payload)
        .then(resp=>{
            dispatch(fetchListUserRequest())
            resolve(resp)
        }).catch(error=>{
            reject(error)
        })
    } 
}

export const deleteUserRequest = (id, resolve, reject) =>{
    return dispatch =>{
        userApi
        .deleteUser(id)
        .then(resp=>{
            dispatch(fetchListUserRequest())
            resolve(resp)
        }).catch(error=>{
            reject(error)
        })
    } 
}