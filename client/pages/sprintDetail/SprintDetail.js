import React, { Component } from 'react'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Grid,
} from '@material-ui/core'

import TaskContainer from './TaskContainer/TaskContainer'
import * as taskActions from '../../actions/taskActions'
import * as sprintActions from '../../actions/sprintActions'


class SprintDetail extends Component {

    componentDidMount() {
        const { match, taskActionCreators, sprintActionCreators, listSprint } = this.props
        const { fetchListTaskRequest } = taskActionCreators
        const { fetchListSprintRequest } = sprintActionCreators
        const { params } = match
        const { sprintId } = params
        fetchListTaskRequest(sprintId)
        //For copy and enter sprint-detail url to new tab browser
        if (!listSprint.length){
            const userId = localStorage.getItem('user_id')
            if (userId.trim() != "") {
                fetchListSprintRequest(userId)
            }
        }
    }

    render() {
        const { match, sprintInfo} = this.props
        const { params } = match
        const { sprintId } = params
        return (
            <>
                <Grid container spacing={3}>
                    <Grid direction="row" item xs={12}>
                        <h2>{sprintInfo?sprintInfo.title:null}</h2>
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
    const sprintInfo = state.sprints.listSprint.filter((s)=> s.id == sprintId)
    return {
        listTask: listTask,
        listSprint: state.sprints.listSprint,
        sprintInfo: sprintInfo[0]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        taskActionCreators: bindActionCreators(taskActions, dispatch),
        sprintActionCreators: bindActionCreators(sprintActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SprintDetail))


