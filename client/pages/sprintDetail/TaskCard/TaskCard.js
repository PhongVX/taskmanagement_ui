import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import moment from "moment"

import { STATUS_OF_TASKS } from '../../../constants/taskConstants'
import * as taskActions from '../../../actions/taskActions'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function TaskCard(props) {
  const {task, sprintId,  taskActionCreators } = props
  const { updateTaskRequest} = taskActionCreators
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleOpenStatusMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleStatusMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusMenuSelected = (value) => {
    const payload={ 
      id:task.id,
      status: value
    }
    updateTaskRequest(sprintId, payload)
    setAnchorEl(null);
  };

  const renderStatusMenu=()=>{
      return STATUS_OF_TASKS.map((status)=>{ 
        return (
          <MenuItem value={status} onClick={() => handleStatusMenuSelected(status)}>{status}</MenuItem>
        )
      })
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            T
          </Avatar>
        }
        action={
          <IconButton onClick={handleOpenStatusMenuClick} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={task.title}
        subheader={moment(task.created_at).format("MMMM Do YYYY, h:mm")}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {task.description}
        </Typography>
      </CardContent>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleStatusMenuClose}
        TransitionComponent={Fade}
      > 
        { 
          renderStatusMenu()
        }
  
      </Menu>
    </Card>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
      taskActionCreators: bindActionCreators(taskActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskCard)


