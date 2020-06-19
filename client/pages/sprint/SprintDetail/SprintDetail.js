import React, { Component } from 'react'
import {
    Grid,
} from '@material-ui/core'
import TaskContainer from '../TaskContainer'

export default class SprintDetail extends Component {
    render() {
        return (
            <>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TaskContainer status={"Todo"} />
                    </Grid>
                    <Grid item xs={4}>
                        <TaskContainer status={"Inprogress"} />
                    </Grid>
                    <Grid item xs={4}>
                        <TaskContainer status={"Done"} />
                    </Grid>
                </Grid>
            </>
        )
    }
}
