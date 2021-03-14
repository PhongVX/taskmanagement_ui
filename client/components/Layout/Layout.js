import React from "react";
import {
  Route,
  Switch
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./Layout.style";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";
import Snackbars from '../Snackbars'

// pages
import Sprint from '../../pages/sprint'
import User from '../../pages/user'
import SprintDetail from '../../pages/sprintDetail/SprintDetail'

import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
                <Route path="/app/user" component={User} />
                <Route path="/app/sprint" component={Sprint} />

                <Route path="/app/sprint-detail/:sprintId" component={SprintDetail} /> 
            </Switch>
          </div>
          <Snackbars/>
    </div>
  );
}

export default Layout
