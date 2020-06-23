import React, { Component } from 'react'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Grid,
} from '@material-ui/core'

import TaskContainer from './TaskContainer/TaskContainer'
import * as taskActions from '../../actions/taskActions'
import { TEXT } from './SprintDetail.const'

class SprintDetail extends Component {

    componentDidMount() {
        const { match, taskActionCreators } = this.props
        const { fetchListTaskRequest } = taskActionCreators
        const { params } = match
        const { sprintId } = params
        fetchListTaskRequest(sprintId)
    }

    render() {
        const { match} = this.props
        const { params } = match
        const { sprintId } = params
        return (
            <>
                <Grid container spacing={3}>
                    <Grid direction="row" item xs={12}>
                        <h2>Sprint 1</h2>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TaskContainer sprintId={sprintId} status={"Todo"} />
                    </Grid>
                    <Grid item xs={4}>
                        <TaskContainer sprintId={sprintId} status={"Inprogress"} />
                    </Grid>
                    <Grid item xs={4}>
                        <TaskContainer sprintId={sprintId} status={"Done"} />
                    </Grid>
                </Grid>
            </>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { match } = ownProps
    const { params } = match
    const { sprintId } = params
    const listTask = state.tasks.listTask[sprintId] ? state.tasks.listTask[sprintId] : []
    return {
        listTask: listTask
    }
}

const mapDispatchToProps = dispatch => {
    return {
        taskActionCreators: bindActionCreators(taskActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SprintDetail))


