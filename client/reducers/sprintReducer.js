import * as sprintConstants from '../constans/sprintConstants'

const initialState = {
    listSprint:[]
}

const sprintReducer = (state = initialState, action)=>{
    switch(action.type){
        case sprintConstants.CLEAR_SPRINT:{
            return {
                ...state,
                listSprint:[]
            }
        }
        case sprintConstants.FETCH_SPRINT_SUCCESS:{
            const {data} = action.payload
            return {
                ...state,
                listSprint: data
            }
        }
        case sprintConstants.FETCH_SPRINT_FAILED:{

        }
        default:
            return state
    }
}

export default sprintReducer