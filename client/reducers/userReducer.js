import * as userConstants from '../constants/userConstants'

const initialState = {
    listUser:[]
}

const userReducer = (state = initialState, action)=>{
    switch(action.type){
        case userConstants.CLEAR_USER:{
            return {
                ...state,
                listUser:[]
            }
        }
        case userConstants.FETCH_USER_SUCCESS:{
            const {data} = action.payload
            return {
                ...state,
                listUser: data
            }
        }
        case userConstants.FETCH_USER_FAILED:{

        }
        default:
            return state
    }
}

export default userReducer