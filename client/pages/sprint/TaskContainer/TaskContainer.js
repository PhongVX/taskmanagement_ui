import React, { PureComponent } from 'react'
import {
    Paper
} from '@material-ui/core'

import TaskCard from '../../../components/TaskCard'

export default class TaskContainer extends PureComponent {

    render() {
        let {status} = this.props
        return (
            <>
                <Paper style={{ padding: 10, backgroundColor: 'rgb(244, 245, 247)' }} variant="outlined" square>
                    <div>
                        {status}
                    </div>
                    <br />
                    <TaskCard />
                    <br />
                    <TaskCard />
                </Paper>
            </>
        )
    }
}
