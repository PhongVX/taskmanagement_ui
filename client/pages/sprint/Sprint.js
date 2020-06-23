import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Grid,
    Button,
    Paper,
    TextField,
    InputAdornment,
    IconButton
} from '@material-ui/core'
import {
    Search as SearchIcon
} from "@material-ui/icons";

import {
    Grid as DevGrid,
    Table,
    TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

import * as sprintActions from '../../actions/sprintActions'

import { COLUMNS, TEXT } from './Sprint.const'

class Sprint extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            textSearchUserID: ""
        }
    }

    handleSearchUserIDChange = (event) => {
        if (event.target.value.trim() === "") {
            this.setState({
                textSearchUserID: ""
            });
            return;
        }
        this.setState({
            textSearchUserID: event.target.value
        });
    }

    handleFindSprintByUserID = () => {
        const { textSearchUserID } = this.state
        const { sprintActionCreators } = this.props
        const { fetchListSprintRequest } = sprintActionCreators
        fetchListSprintRequest(textSearchUserID)
    }

    renderTable() {
        const { listSprint } = this.props
        return (
            <Paper>
                <DevGrid
                    rows={listSprint}
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
                        <TextField
                            size="small"
                            variant="outlined"
                            placeholder={TEXT.searchUserID}
                            onChange={this.handleSearchUserIDChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton onClick={this.handleFindSprintByUserID}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
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
        listSprint: state.sprints.listSprint
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sprintActionCreators: bindActionCreators(sprintActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sprint)