import {combineReducers} from 'redux'
import uiCommonStateReducer from './uiCommonStateReducer'
import sprintReducer from './sprintReducer'
import taskReducer from './taskReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    uiCommonState:uiCommonStateReducer,
    sprints : sprintReducer,
    tasks: taskReducer,
    users: userReducer
})

export default rootReducer