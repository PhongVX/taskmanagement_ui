import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@material-ui/core";

import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import google from "../../images/google.svg";
import github from "../../images/github.svg"
import logo from "./logo.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import { ELEMENT_TEXT } from './LoginConst'
import {loginGoogleRequest} from '../../apis/auth'
function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [firstNameValue, setFirstNameValue] = useState("");
  var [lastNameValue, setLastNameValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [gender, setGender] = React.useState('male');

  const handleChangeGender = (e)=>{ 
    setGender(event.target.value);
  }
  const handleLoginEnter = (e)=>{
    if(e.keyCode==13){
      loginUser(
        userDispatch,
        loginValue,
        passwordValue,
        props.history,
        setIsLoading,
        setError,
      )
    }
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>{ELEMENT_TEXT.yourSprint}</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label={ELEMENT_TEXT.loginText} classes={{ root: classes.tab }} />
            <Tab label={ELEMENT_TEXT.registerText} classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h3" className={classes.greeting}>
                {ELEMENT_TEXT.loginTitle}
              </Typography>
              <a href="http://localhost:8888/api/v1/oauth/google/login"><Button  size="large" className={classes.googleButton}>
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;{ELEMENT_TEXT.loginWithGoogleText}
              </Button></a> 
              <Button size="large" className={classes.googleButton}>
                <img src={github} alt="github" className={classes.googleIcon} />
                &nbsp;{ELEMENT_TEXT.loginWithGithubText}
              </Button>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>{ELEMENT_TEXT.or}</Typography>
                <div className={classes.formDivider} />
              </div>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  {error}
                </Typography>
              </Fade>
              <TextField
                error={error}
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                onKeyDown={handleLoginEnter}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                error={error}
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                onKeyDown={handleLoginEnter}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />

              
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                    <Button
                      disabled={
                        loginValue.length === 0 || passwordValue.length === 0
                      }
                      onClick={() =>
                        loginUser(
                          userDispatch,
                          loginValue,
                          passwordValue,
                          props.history,
                          setIsLoading,
                          setError,
                        )
                      }
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      {ELEMENT_TEXT.loginText}
                    </Button>
                  )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  {ELEMENT_TEXT.forgetPasswordText}
                </Button>
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              {/* <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography> */}
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="firstName"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={firstNameValue}
                onChange={e => setFirstNameValue(e.target.value)}
                margin="normal"
                placeholder={ELEMENT_TEXT.firstName}
                type="text"
                fullWidth
              />

              <TextField
                id="lastName"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={lastNameValue}
                onChange={e => setLastNameValue(e.target.value)}
                margin="normal"
                placeholder={ELEMENT_TEXT.lastName}
                type="text"
                fullWidth
              />

              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder={ELEMENT_TEXT.email}
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder={ELEMENT_TEXT.password}
                type="password"
                fullWidth
              />

              <FormControl component="fieldset">
                <FormLabel component="legend">{ELEMENT_TEXT.gender}</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={handleChangeGender}>
                  <FormControlLabel value="male" control={<Radio />} label={ELEMENT_TEXT.male}/>
                  <FormControlLabel value="female" control={<Radio />} label={ELEMENT_TEXT.female} />
                </RadioGroup>
              </FormControl>
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                    <Button
                      onClick={() =>
                        loginUser(
                          userDispatch,
                          loginValue,
                          passwordValue,
                          props.history,
                          setIsLoading,
                          setError,
                        )
                      }
                      disabled={
                        loginValue.length === 0 ||
                        passwordValue.length === 0 ||
                        nameValue.length === 0
                      }
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.createAccountButton}
                    >
                      {ELEMENT_TEXT.createAccountText}
                    </Button>
                  )}
              </div>
              {/* <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>{ELEMENT_TEXT.or}</Typography>
                <div className={classes.formDivider} />
              </div>
              <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;{ELEMENT_TEXT.loginWithGoogleText}
              </Button> */}
            </React.Fragment>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
          © ... All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
