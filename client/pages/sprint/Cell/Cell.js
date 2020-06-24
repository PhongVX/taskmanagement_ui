import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import {
    TableCell,
    IconButton
} from '@material-ui/core'
import {
    Visibility as VisibilityIcon
} from '@material-ui/icons'
import moment from "moment"

class Cell extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            redirectToView: false
        }
    }

    render() {
        const { column, tableRow, value, classes } = this.props;
        const { row } = tableRow

        switch (column.name) {
            case 'action': {
                return (
                    <TableCell name={column.name}>
                        <NavLink to={`/app/sprint-detail/${row.id}`}>
                            <IconButton title="View">
                                <VisibilityIcon color="primary" />
                            </IconButton>
                        </NavLink>
                    </TableCell>
                )
            }
            case 'created_at': {
                return (

                    <TableCell name={column.name}>
                        {moment(value).format("MMMM Do YYYY, h:mm")}
                    </TableCell>
                )
            }
            case 'updated_at': {
                return (

                    <TableCell name={column.name}>
                         {moment(value).format("MMMM Do YYYY, h:mm")}
                    </TableCell>
                )
            }
            default:
                return (
                    <TableCell name={column.name} title={value}>
                        {value}
                    </TableCell>
                )
        }
    }
}

export default Cell