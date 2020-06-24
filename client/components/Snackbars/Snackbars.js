import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { Snackbar  } from '@material-ui/core'
import {
    Alert 
}from '@material-ui/lab';
import * as uiCommonStateAction from '../../actions/uiCommonStateAction'

class Snackbars extends Component {
    constructor(props) {
        super(props)
    }

    handleCloseSnackBar = () => {
        const { uiCommonStateCreators } = this.props
        const { closeSnackbar } = uiCommonStateCreators
        closeSnackbar()
    }

    render() {
        const { snackBar } = this.props
        const { isOpenSnackBars, noticeText, snackBarVariant, autoHideDuration } = snackBar
        return (
            <>
                <Snackbar open={isOpenSnackBars} autoHideDuration={autoHideDuration || 6000} onClose={this.handleCloseSnackBar}>
                    <Alert onClose={this.handleCloseSnackBar} severity={snackBarVariant}>
                        {noticeText}
                    </Alert>
                </Snackbar>
            </>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        snackBar: state.uiCommonState.snackBar
    }
}


const mapDispatchToProps = dispatch => {
    return {
        uiCommonStateCreators: bindActionCreators(uiCommonStateAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Snackbars)

