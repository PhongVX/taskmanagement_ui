import * as taskApi from '../apis/taskApi'
import * as taskConstants from '../constants/taskConstants'

export const clearListTask = (sprintId)=>{
    return{
        type: taskConstants.CLEAR_TASK,
        payload:{
            sprintId
        }
    }
}

export const fetchListTaskSuccess = (sprintId, data)=>{
    return{
        type: taskConstants.FETCH_TASK_SUCCESS,
        payload:{
            data,
            sprintId
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



export const fetchListTaskRequest = (sprintId)=>{
    return dispatch =>{
        taskApi
        .getListTask(sprintId)
        .then(resp=>{
            const {data} = resp
            const {result} = data
            dispatch(fetchListTaskSuccess(sprintId, result))
        }).catch(error=>{
            dispatch(fetchListTaskFailed(error))
        })
    }
}

export const updateTaskRequest = (sprintId, payload) =>{
    return dispatch =>{
        taskApi
        .updateTask(payload)
        .then(resp=>{
            dispatch(fetchListTaskRequest(sprintId))
        }).catch(error=>{
            console.log(error)
        })
    } 
}

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