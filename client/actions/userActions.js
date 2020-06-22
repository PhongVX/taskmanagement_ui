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
        dispatch(clearListUser())
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

// export const createUserRequest = (payload) =>{
//     return dispatch =>{
//         dispatch(fetchListUser())
//         userApi
//         .createUser(payload)
//         .then(resp=>{
//             dispatch(fetchListUserRequest())
//         }).catch(error=>{
//             console.log(error)
//         })
//     } 
// }

// export const deleteUserRequest = (id) =>{
//     return dispatch =>{
//         dispatch(fetchListUser())
//         userApi
//         .deleteUser({"id":id})
//         .then(resp=>{
//             dispatch(fetchListUserRequest())
//         }).catch(error=>{
//             console.log(error)
//         })
//     } 
// }