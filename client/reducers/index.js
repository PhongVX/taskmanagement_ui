import {combineReducers} from 'redux'
import sprintReducer from './sprintReducer'
import taskReducer from './taskReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    sprints : sprintReducer,
    tasks: taskReducer,
    users: userReducer
})

export default rootReducer