import React from "react";
import {loginRequest} from '../apis/auth'
import {URL} from '../constants'
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  const payload = { 
     user_name: login,
     password
  }
  loginRequest(payload).then((res)=>{ 
    const {data} = res 
    localStorage.setItem("access_token", data["access_token"])
    localStorage.setItem("refresh_token", data["refresh_token"])
    setError(null);
    setIsLoading(false);
    dispatch({ type: "LOGIN_SUCCESS" });
    history.push("/");
  }).catch(()=>{
    dispatch({ type: "SIGN_OUT_SUCCESS" });
    setError(true);
    setIsLoading(false);
  })
}

function signOut(dispatch, history) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  window.location.href = URL.login
}
