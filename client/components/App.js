import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import {Provider} from 'react-redux'

import Layout from './Layout'
// context
import { useUserState } from "../context/UserContext";

import configureStore from '../store/configureStore'

export default function App() {
    // global
    var { isAuthenticated } = useUserState();
    const store = configureStore()

    return (
      < >
      <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app/sprint" />} />
          <Route
            exact
            path="/app"
            render={() => <Redirect to="/app/sprint" />}
          />
          <PublicRoute path="/app" component={Layout} />
          {/* <PublicRoute path="/login" component={Login} /> */}
          {/* <Route component={Error} /> */}
        </Switch>
      </HashRouter>
      </Provider>
      </>
    );
  
    // #######################################################################
  
    function PrivateRoute({ component, ...rest }) {
      return (
        <Route
          {...rest}
          render={props =>
            isAuthenticated ? (
              React.createElement(component, props)
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            )
          }
        />
      );
    }
  
    function PublicRoute({ component, ...rest }) {
      return (
        <Route
          {...rest}
          render={props =>
            isAuthenticated ? (
              <Redirect
                to={{
                  pathname: "/",
                }}
              />
            ) : (
              React.createElement(component, props)
            )
          }
        />
      );
    }
  }

