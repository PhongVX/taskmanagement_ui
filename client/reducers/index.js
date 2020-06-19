import {combineReducers} from 'redux'
import sprintReducer from './sprintReducer'
import taskReducer from './taskReducer'

const rootReducer = combineReducers({
    sprints : sprintReducer,
    tasks: taskReducer
})

export default rootReducer