import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import {Provider} from 'react-redux'
//components
import Layout from './Layout'
//pages
import Login from "../pages/login";
// context
// import { useUserState } from "../context/UserContext";

import configureStore from '../store/configureStore'

export default function App() {
    // global
    
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
            <PublicRoute path="/login" component={Login} /> 
            <PrivateRoute path="/app" component={Layout} />
        
          {/* <Route component={Error} /> */}
        </Switch>
      </HashRouter>
      </Provider>
      </>
    );
  
    // #######################################################################
    function PrivateRoute({ component, ...rest }) {
      //TODO need to check 
      let  isAuthenticated  = localStorage.getItem("access_token")
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
         //TODO need to check 
      let  isAuthenticated  = localStorage.getItem("access_token")
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

