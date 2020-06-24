import * as sprintApi from '../apis/sprintApi'
import * as sprintConstants from '../constants/sprintConstants'

export const clearListSprint = () => {
    return {
        type: sprintConstants.CLEAR_SPRINT
    }
}

export const fetchListSprintSuccess = (data) => {
    return {
        type: sprintConstants.FETCH_SPRINT_SUCCESS,
        payload: {
            data
        }
    }
}

export const fetchListSprintFailed = (error) => {
    return {
        type: sprintConstants.FETCH_SPRINT_FAILED,
        payload: {
            error
        }
    }
}

export const fetchListSprintRequest = (userId) => {
    return dispatch => {
        sprintApi
            .getListSprint(userId)
            .then(resp => {
                const { data } = resp
                const { result } = data
                dispatch(fetchListSprintSuccess(result))
            }).catch(error => {
                dispatch(fetchListSprintFailed(error))
            })
    }
}


export const updateSprintRequest = (payload, resolve, reject) =>{
    const {created_by_id, ...restPayload} = payload
    return dispatch =>{
        sprintApi
        .updateSprint(restPayload)
        .then(resp=>{
            dispatch(fetchListSprintRequest(created_by_id))
            resolve(resp)
        }).catch(error=>{
            reject(error)
        })
    } 
}


export const createSprintRequest = (payload, resolve, reject) =>{
    const {created_by_id} = payload
    return dispatch =>{
        sprintApi
        .createSprint(payload)
        .then(resp=>{
            dispatch(fetchListSprintRequest(created_by_id))
            resolve(resp)
        }).catch(error=>{
            reject(error)
        })
    } 
}

export const deleteSprintRequest = (payload, resolve, reject) =>{
    const {created_by_id, id} = payload
    return dispatch =>{
        sprintApi
        .deleteSprint(id)
        .then(resp=>{
            dispatch(fetchListSprintRequest(created_by_id))
            resolve(resp)
        }).catch(error=>{
            reject(error)
        })
    } 
}

