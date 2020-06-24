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

export const updateTaskRequest = (sprintId, payload, resolve, reject) =>{
    return dispatch =>{
        taskApi
        .updateTask(payload)
        .then(resp=>{
            dispatch(fetchListTaskRequest(sprintId))
            resolve(resp)
        }).catch(error=>{
            reject(error)
        })
    } 
}


export const createTaskRequest = (sprintId, payload, resolve, reject) =>{
    return dispatch =>{
        taskApi
        .createTask(payload)
        .then(resp=>{
            dispatch(fetchListTaskRequest(sprintId))
            resolve(resp)
        }).catch(error=>{
            reject(error)
        })
    } 
}

export const deleteTaskRequest = (sprintId, id, resolve, reject) =>{
    return dispatch =>{
        taskApi
        .deleteTask(id)
        .then(resp=>{
            dispatch(fetchListTaskRequest(sprintId))
            resolve(resp)
        }).catch(error=>{
            reject(error)
        })
    } 
}

