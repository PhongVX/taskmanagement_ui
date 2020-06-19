import * as taskApi from '../apis/taskApi'
import * as taskConstants from '../constants/taskConstants'

export const fetchListTask = ()=>{
    return{
        type: taskConstants.FETCH_TASK
    }
}

export const fetchListTaskSuccess = (data)=>{
    return{
        type: taskConstants.FETCH_TASK_SUCCESS,
        payload:{
            data
        }
    }
}

export const fetchListTaskFailed = (error)=>{
    return{
        type: taskConstants.FETCH_TASK_FAILED,
        payload:{
            error
        }
    }
}



// export const fetchListTaskRequest = ()=>{
//     return dispatch =>{
//         dispatch(fetchListTask())
//         taskApi
//         .getListTask()
//         .then(resp=>{
//             const {data} = resp
//             dispatch(fetchListTaskSuccess(data))
//         }).catch(error=>{
//             dispatch(fetchListTaskFailed(error))
//         })
//     }
// }

// export const createTaskRequest = (payload) =>{
//     return dispatch =>{
//         dispatch(fetchListTask())
//         taskApi
//         .createTask(payload)
//         .then(resp=>{
//             dispatch(fetchListTaskRequest())
//         }).catch(error=>{
//             console.log(error)
//         })
//     } 
// }

// export const deleteTaskRequest = (id) =>{
//     return dispatch =>{
//         dispatch(fetchListTask())
//         taskApi
//         .deleteTask({"id":id})
//         .then(resp=>{
//             dispatch(fetchListTaskRequest())
//         }).catch(error=>{
//             console.log(error)
//         })
//     } 
// }