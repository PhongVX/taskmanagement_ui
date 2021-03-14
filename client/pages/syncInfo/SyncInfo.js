import React, { PureComponent } from 'react'
import { Grid } from '@material-ui/core';

//import './SyncInfo.css'
import Loading from '../../components/Loading'
import { parseJwt } from '../../commons/jwt'
import { whoAmIRequest } from '../../actions/userActions'
import {clearLocalStorage} from '../../commons/utils'

class SyncInfo extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            syncSuccess: false
        }
    }
    componentDidMount() {
        const { history, match } = this.props
        const { params } = match
        let { accessToken, refreshToken } = params
        if (!!accessToken && !!refreshToken) {
            localStorage.setItem('access_token', accessToken)
            localStorage.setItem('refresh_token', refreshToken)
        } else {
            accessToken = localStorage.getItem('access_token')
            refreshToken = localStorage.getItem('refresh_token')
        }
        const tokenPayload = parseJwt(accessToken)
        localStorage.setItem("user_id", tokenPayload["user_id"])
        const whoAmIRequestPromise = () => {
            return new Promise((resolve, reject) => {
                whoAmIRequest(tokenPayload["user_id"], resolve, reject)
            })
        }
        whoAmIRequestPromise()
            .then((res) => {
                let { user_info } = res.data.result
                localStorage.setItem('user_info', JSON.stringify(user_info))
                if (user_info.is_oauth_first_login){
                    history.push('/new-password')
                    return
                }
                history.push('/app')
            })
            .catch((err) => {
                clearLocalStorage()
                history.push('/login')
            })
    }

    render() {
        //TODO Move this component to Loading Component
        return (<Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item>
                <Loading />
            </Grid>
        </Grid>
        )

    }
}

export default SyncInfo