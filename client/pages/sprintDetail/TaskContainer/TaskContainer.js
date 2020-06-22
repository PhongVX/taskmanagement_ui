import React, { PureComponent } from 'react'
import {
    Paper
} from '@material-ui/core'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TaskCard from '../TaskCard'

class TaskContainer extends PureComponent {

    renderTaskCard(){ 
        const { listTask, status, sprintId } = this.props
        let tasks = listTask.filter((task)=>{ 
            return task.status.toLowerCase() == status.toLowerCase()
        })
        return tasks.map((task)=>{ 
            return (
                <div>
                    <TaskCard sprintId={sprintId} task={task}/>
                    <br/>
                </div>
            )
        })
    }
    render() {
        let {status} = this.props
        return (
            <>
                <Paper style={{ padding: 10, backgroundColor: 'rgb(244, 245, 247)' }} variant="outlined" square>
                    <div>
                        {status}
                    </div>
                    <br />
                    { 
                        this.renderTaskCard()
                    }
                </Paper>
            </>
        )
    }
}



const mapStateToProps = (state, ownProps) => {
    const { sprintId } = ownProps
    const listTask = state.tasks.listTask[sprintId] ? state.tasks.listTask[sprintId] : []
    return {
        listTask: listTask
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // taskActionCreators: bindActionCreators(taskActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer)