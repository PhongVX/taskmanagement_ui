import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
    Grid,
    Button,
    Paper
} from '@material-ui/core'

import SprintDetail from './SprintDetail'

import {
    Grid as DevGrid,
    Table,
    TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';


const columns = [
    { name: 'id', title: 'ID' },
    { name: 'product', title: 'Product' },
    { name: 'owner', title: 'Owner' },
];
const rows = [
    { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
    { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
];


class Sprint extends PureComponent {
    renderTable() {
        return (
            <Paper>
                <DevGrid
                    rows={rows}
                    columns={columns}
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
                <Grid container spacing={3}>
                    <Grid container item direction="row" justify="flex-end" xs={12}>
                        <Button variant="contained" color="primary">Create Sprint</Button>
                    </Grid>
                    <Grid container item direction="row" justify="flex-end" xs={12}>
                        {this.renderTable()}
                    </Grid>
                </Grid>
                <SprintDetail />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        // listEmployee: state.employees.listEmployee
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // employeeActionCreators: bindActionCreators(employeeActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sprint)