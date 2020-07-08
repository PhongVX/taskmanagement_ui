import React, { PureComponent } from 'react'
import { Grid, TextField } from '@material-ui/core';
import { FiberPin } from '@material-ui/icons';

import {TEXT} from './NewPassword.const'
class NewPassword extends PureComponent {
    render() {
        return (
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item>
            <TextField
                label={TEXT.newPassword}
                type="password"
                autoComplete="current-password"
                />
            {/* <TextField
                label={TEXT.reTypeNewPassword}
                type="password"
                autoComplete="current-password"
                /> */}
            </Grid>
        </Grid>
        )
    }
}

export default NewPassword