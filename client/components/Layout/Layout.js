import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./Layout.style";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Sprint from '../../pages/sprint'

import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
                <Route path="/app/sprint" component={Sprint} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default Layout
