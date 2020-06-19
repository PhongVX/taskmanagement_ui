import * as taskConstants from '../constans/taskConstants'

const initialState = {
    listTask:[]
}

const taskReducer = (state = initialState, action)=>{
    switch(action.type){
        case taskConstants.CLEAR_TASK:{
            return {
                ...state,
                listTask:[]
            }
        }
        case taskConstants.FETCH_TASK_SUCCESS:{
            const {data} = action.payload
            return {
                ...state,
                listTask: data
            }
        }
        case taskConstants.FETCH_TASK_FAILED:{

        }
        default:
            return state
    }
}

export default taskReducer