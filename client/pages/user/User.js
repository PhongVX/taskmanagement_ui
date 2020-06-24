import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Grid,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@material-ui/core'
import {
    Getter,
} from '@devexpress/dx-react-core';
import {
    EditingState,
} from '@devexpress/dx-react-grid'
import {
    Grid as DevGrid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn
} from '@devexpress/dx-react-grid-material-ui'


import Command from '../../components/ActionTableButton'
import * as userActions from '../../actions/userActions'
import * as uiCommonStateAction from '../../actions/uiCommonStateAction'
import {WARNING_TYPE} from '../../constants'
import { COLUMNS, TEXT, COLUMN_EXTENSIONS } from './User.const'



class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deletingRows: []
        }
    }
    getRowId = row => row.id

    componentDidMount() {
        const { userActionCreators } = this.props
        const { fetchListUserRequest } = userActionCreators
        fetchListUserRequest()
    }

    commitChanges = ({ added, changed, deleted, ...resProps }) => {
        const { userActionCreators, uiCommonStateCreators } = this.props
        const { updateUserRequest, createUserRequest } = userActionCreators
        const {openSnackbar, closeSnackbar} = uiCommonStateCreators
        if (added) {
            added.forEach((data) => {
                const createUserPromise = () => {
                    return new Promise((resolve, reject) => {
                        createUserRequest(data, resolve, reject)
                    })
                }
                createUserPromise()
                    .then((res) => {
                        openSnackbar({ noticeText: TEXT.snackbar.addSuccess, snackBarVariant: WARNING_TYPE.success })
                    })
                    .catch((error) => {
                        openSnackbar({ noticeText: TEXT.snackbar.addFail, snackBarVariant: WARNING_TYPE.error })
                    })
            })
        }
        if (changed) {
            Object.keys(changed).forEach(function (id) {
                const payload = { id, ...changed[id] }
                const updateUserPromise = () => {
                    return new Promise((resolve, reject) => {
                        updateUserRequest(payload, resolve, reject)
                    })
                }
                updateUserPromise()
                    .then((res) => {
                        if (res.status === 200) {
                            openSnackbar({ noticeText: TEXT.snackbar.updateSuccess, snackBarVariant: WARNING_TYPE.success })
                        }

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
        const { userActionCreators, uiCommonStateCreators } = this.props
        const { deleteUserRequest } = userActionCreators
        const {openSnackbar, closeSnackbar} = uiCommonStateCreators
        this.state.deletingRows.forEach((rowId) => {
            let deleteUserPromise = () => {
                return new Promise((resolve, reject) => {
                    deleteUserRequest(rowId, resolve, reject)
                })
            }
            deleteUserPromise()
                .then((res) => {
                    openSnackbar({ noticeText: TEXT.snackbar.deleteSuccess, snackBarVariant: WARNING_TYPE.success })
                })
                .catch(() => {
                    openSnackbar({ noticeText: TEXT.snackbar.deleteFail, snackBarVariant: WARNING_TYPE.error })
                })
        })
        this.setState({ deletingRows: [] })
    }

    renderTable() {
        const { listUser } = this.props
        return (
            <Paper>
                <DevGrid
                    rows={listUser}
                    columns={COLUMNS}
                    getRowId={this.getRowId}
                >
                    <EditingState
                        onCommitChanges={this.commitChanges}
                        columnExtensions={COLUMN_EXTENSIONS}
                    />
                    <Table />
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
                                { key: 'editCommand', type: TableEditColumn.COLUMN_TYPE, width: 222 }
                            ];
                            return result;
                        }
                        }
                    />

                </DevGrid>
            </Paper>
        )
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
    render() {

        return (
            <>
                <h2>{TEXT.title}</h2>
                {this.renderTable()}
                {this.renderDialog()}
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
        userActionCreators: bindActionCreators(userActions, dispatch),
        uiCommonStateCreators: bindActionCreators(uiCommonStateAction, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(User)

