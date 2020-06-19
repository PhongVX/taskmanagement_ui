import * as sprintApi from '../apis/sprintApi'
import * as sprintConstants from '../constants/sprintConstants'

export const clearListSprint = ()=>{
    return{
        type: sprintConstants.CLEAR_SPRINT
    }
}

export const fetchListSprintSuccess = (data)=>{
    return{
        type: sprintConstants.FETCH_SPRINT_SUCCESS,
        payload:{
            data
        }
    }
}

export const fetchListSprintFailed = (error)=>{
    return{
        type: sprintConstants.FETCH_SPRINT_FAILED,
        payload:{
            error
        }
    }
}

export const fetchListSprintRequest = ()=>{
    return dispatch =>{
        dispatch(clearListSprint())
        sprintApi
        .getListSprint()
        .then(resp=>{
            const {data} = resp
            const {result} = data
            dispatch(fetchListSprintSuccess(result))
        }).catch(error=>{
            dispatch(fetchListSprintFailed(error))
        })
    }
}

// export const createSprintRequest = (payload) =>{
//     return dispatch =>{
//         dispatch(fetchListSprint())
//         sprintApi
//         .createSprint(payload)
//         .then(resp=>{
//             dispatch(fetchListSprintRequest())
//         }).catch(error=>{
//             console.log(error)
//         })
//     } 
// }

// export const deleteSprintRequest = (id) =>{
//     return dispatch =>{
//         dispatch(fetchListSprint())
//         sprintApi
//         .deleteSprint({"id":id})
//         .then(resp=>{
//             dispatch(fetchListSprintRequest())
//         }).catch(error=>{
//             console.log(error)
//         })
//     } 
// }