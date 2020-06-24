import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'

import {
    Grid,
    Button,
    Paper,
    TextField,
    InputAdornment,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core'
import {
    Search as SearchIcon,
    Visibility as VisibilityIcon
} from "@material-ui/icons";
import {
    Getter,
} from '@devexpress/dx-react-core';
import {
    Grid as DevGrid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
    TableColumnResizing
} from '@devexpress/dx-react-grid-material-ui';
import {
    EditingState,
} from '@devexpress/dx-react-grid'

import Command from '../../components/ActionTableButton'
import * as sprintActions from '../../actions/sprintActions'
import * as uiCommonStateAction from '../../actions/uiCommonStateAction'
import Cell from './Cell/Cell.js'
import { TEXT, WARNING_TYPE } from '../../constants'
import { COLUMNS, COLUMN_EXTENSIONS } from './Sprint.const'


class Sprint extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            textSearchUserID: "",
            deletingRows:[]
        }
    }

    componentDidMount(){ 
        this.handleFindSprintByUserID()
    }
    
    getRowId = row => row.id

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
        if (textSearchUserID.trim() != "") {
            fetchListSprintRequest(textSearchUserID)
        }
    }

    handleSearchEnter = (event) => {
        if (event.keyCode === 13) {
            this.handleFindSprintByUserID()
        }
    }

    commitChanges = ({ added, changed, deleted }) => {
        const { textSearchUserID } = this.state
        const { sprintActionCreators, uiCommonStateCreators } = this.props
        const { createSprintRequest, updateSprintRequest } = sprintActionCreators
        const {openSnackbar} = uiCommonStateCreators
        if (added) {
            added.forEach((data) => {
                data = {...data, createdByID: textSearchUserID}
                const createSprintPromise = () => {
                    return new Promise((resolve, reject) => {
                        createSprintRequest(data, resolve, reject)
                    })
                }
                createSprintPromise()
                    .then(() => {
                        openSnackbar({ noticeText: TEXT.snackbar.addSuccess, snackBarVariant: WARNING_TYPE.success })
                    })
                    .catch(() => {
                        openSnackbar({ noticeText: TEXT.snackbar.addFail, snackBarVariant: WARNING_TYPE.error })
                    })
            })
        }
        if (changed) {
            Object.keys(changed).forEach(function (id) {
                const payload = { created_by_id:  textSearchUserID, id, ...changed[id] }
                console.log(payload)
                const updateSprintPromise = () => {
                    return new Promise((resolve, reject) => {
                        updateSprintRequest(payload, resolve, reject)
                    })
                }
                updateSprintPromise()
                    .then(() => {
                         openSnackbar({ noticeText: TEXT.snackbar.updateSuccess, snackBarVariant: WARNING_TYPE.success })
                    })
                    .catch(() => {
                        openSnackbar({ noticeText: TEXT.snackbar.updateFail, snackBarVariant: WARNING_TYPE.error })
                    })
            })
        }
        if (deleted) {
            this.setState({ deletingRows: deleted })
        }
    }

    
    cancelDelete = () => this.setState({ deletingRows: [] })

    deleteRows = () => {
        const { textSearchUserID } = this.state
        const { sprintActionCreators, uiCommonStateCreators } = this.props
        const { deleteSprintRequest } = sprintActionCreators
        const {openSnackbar} = uiCommonStateCreators
        this.state.deletingRows.forEach((rowId) => {
            let deleteSprintPromise = () => {
                return new Promise((resolve, reject) => {
                    const payload={created_by_id: textSearchUserID, id: rowId}
                    deleteSprintRequest(payload, resolve, reject)
                })
            }
            deleteSprintPromise()
                .then(() => {
                    openSnackbar({ noticeText: TEXT.snackbar.deleteSuccess, snackBarVariant: WARNING_TYPE.success })
                })
                .catch(() => {
                    openSnackbar({ noticeText: TEXT.snackbar.deleteFail, snackBarVariant: WARNING_TYPE.error })
                })
        })
        this.setState({ deletingRows: [] })
    }

    renderDialog = () => {
        return (
            <Dialog
                name="dialogConfirmation"
                onClose={this.cancelDelete}
                open={!!this.state.deletingRows.length}
                maxWidth="md"
            >
                <DialogTitle name='dialog-title'>{TEXT.dialog.dialogConfirmDeleteTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText name='dialog-text'>
                        {TEXT.dialog.dialogConfirmDeleteText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button name="noButton" onClick={this.cancelDelete} color="secondary" >{TEXT.button.cancel}</Button>
                    <Button name="yesButton" onClick={this.deleteRows} color="primary">{TEXT.button.ok}</Button>
                </DialogActions>
            </Dialog>
        )
    }

    renderTable() {
        const { listSprint } = this.props
        return (
            <Paper>
                <DevGrid
                    rows={listSprint}
                    columns={COLUMNS}
                    getRowId={this.getRowId}
                >   
                    <EditingState
                        onCommitChanges={this.commitChanges}
                        columnExtensions={COLUMN_EXTENSIONS}
                    />
                    <Table
                        cellComponent={Cell}
                    />
                    <TableColumnResizing defaultColumnWidths={COLUMN_EXTENSIONS} />
                    <TableHeaderRow />
                    <TableEditRow />
                    <TableEditColumn
                        showAddCommand
                        showEditCommand
                        showDeleteCommand
                        commandComponent={Command}
                    />
                  
                    <Getter
                        name="tableColumns"
                        computed={({ tableColumns }) => {
                            const result = [
                                ...tableColumns.filter(c => c.type !== TableEditColumn.COLUMN_TYPE),
                                { key: 'editCommand', type: TableEditColumn.COLUMN_TYPE, width: 100 }
                                
                            ];
                            return result;
                        }
                        }
                    />
                </DevGrid>
            </Paper>
        )
    }

    render() {
        return (
            <>
                <h2>{TEXT.title}</h2>
                <Grid container spacing={3}>
                    <Grid container item direction="row" justify="flex-start" xs={6}>
                        <TextField
                            size="small"
                            variant="outlined"
                            placeholder={TEXT.searchUserID}
                            onChange={this.handleSearchUserIDChange}
                            onKeyDown={this.handleSearchEnter}
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
                </Grid>
                <br/>           
                {this.renderTable()}
                {this.renderDialog()}
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
        sprintActionCreators: bindActionCreators(sprintActions, dispatch),
        uiCommonStateCreators: bindActionCreators(uiCommonStateAction, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sprint)