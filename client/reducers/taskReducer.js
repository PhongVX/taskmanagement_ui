import * as taskConstants from '../constants/taskConstants'

const initialState = {
    listTask:{}
}

const taskReducer = (state = initialState, action)=>{
    switch(action.type){
        case taskConstants.CLEAR_TASK:{
            const {sprintId} = action.payload
            return {
                ...state,
                listTask:{
                    ...state.listTask,
                    [sprintId]:[]
                }
            }
        }
        case taskConstants.FETCH_TASK_SUCCESS:{
            const {data, sprintId} = action.payload
            return {
                ...state,
                listTask: { 
                    ...state.listTask,
                    [sprintId]:data
                } 
            }
        }
        case taskConstants.FETCH_TASK_FAILED:{

        }
        default:
            return state
    }
}

export default taskReducer