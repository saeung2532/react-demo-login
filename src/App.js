import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Drawer from "./components/layouts/Drawer";
import * as loginActions from "./actions/login.action";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import HomePage from "./components/pages/HomePage/HomePage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(3),
  },
}));

export default function App() {
  const classes = useStyles();

  // Login Route
  const LoginRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        loginActions.checkLogIn("login", props.history) ? (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        ) : (
          <div className={classes.root}>
            <Container className={classes.content} maxWidth={false}>
              <Component {...props} />
            </Container>
          </div>
        )
      }
    />
  );

  //Private Route
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        loginActions.checkLogIn("private", props.history) ? (
          <div className={classes.root}>
            <Drawer company={loginActions.getTokenCompany()} />
            <Container className={classes.content} maxWidth={false}>
              <Component {...props} />
            </Container>
          </div>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );

  //Public Route
  const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (
        <div className={classes.root}>
          <Container className={classes.content} maxWidth={false}>
            <Component {...props} />
          </Container>
        </div>
      )}
    />
  );

  return (
    <Router
      basename={
        process.env.REACT_APP_IS_PRODUCTION === "1" ? "/react-demo" : ""
      }
    >
      <Switch>
        <LoginRoute exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={HomePage} />
        {/* The Default not found component */}
        {/* <Route render={(props) => <Redirect to="/" />} /> */}
      </Switch>
    </Router>
  );
}
