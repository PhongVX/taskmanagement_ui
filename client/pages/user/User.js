import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Grid,
    Paper
} from '@material-ui/core'

import {
    Grid as DevGrid,
    Table,
    TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

import * as userActions from '../../actions/userActions'
import { COLUMNS, TEXT } from './User.const'

class User extends Component {

    componentDidMount() {
        const { userActionCreators } = this.props
        const { fetchListUserRequest } = userActionCreators
        fetchListUserRequest()
    }

    renderTable() {
        const { listUser } = this.props
        return (
            <Paper>
                <DevGrid
                    rows={listUser}
                    columns={COLUMNS}
                >
                    <Table />
                    <TableHeaderRow />
                </DevGrid>
            </Paper>
        )
    }

    render() {

        return (
            <>
                <h2>{TEXT.title}</h2>
                <Grid container spacing={3}>
                    <Grid container item direction="row" justify="flex-end" xs={12}>
                        {this.renderTable()}
                    </Grid>
                </Grid>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        listUser: state.users.listUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userActionCreators: bindActionCreators(userActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(User)

