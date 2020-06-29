import React from "react";
import {loginRequest} from '../apis/auth'
import {URL} from '../constants'
import {parseJwt} from '../commons/jwt'

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "LOGIN_FAIL":
      return { ...state, isAuthenticated: false };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("access_token"),
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
  if (login.trim() == "" || password.trim() == ""){
    setIsLoading(false);
    setError("Username and password should not be empty")
    return
  }
  const payload = { 
     user_name: login,
     password
  }
  loginRequest(payload).then((res)=>{ 
    const {data} = res 
    const tokenPayload = parseJwt(data["access_token"])
    localStorage.setItem("user_id", tokenPayload["user_id"])
    localStorage.setItem("access_token", data["access_token"])
    localStorage.setItem("refresh_token", data["refresh_token"])
    setError(null);
    setIsLoading(false);
    dispatch({ type: "LOGIN_SUCCESS"});
    history.push("/");
  }).catch((error)=>{
    if (error.response && error.response.data) { 
      setError(error.response.data.message)
    }
    dispatch({ type: "LOGIN_FAIL" })
   
    setIsLoading(false);
  })
}

function signOut(dispatch, history) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  window.location.href = URL.login
}
