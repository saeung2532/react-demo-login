import {
  HTTP_LOGIN_SUCCESS,
  HTTP_LOGIN_FETCHING,
  HTTP_LOGIN_FAILED,
  HTTP_LOGIN_LOGOUT,
} from "../constants";
import { server } from "../constants";
import { httpClient } from "./../utils/HttpClient";
import jwt from "jsonwebtoken";

export const setStateLoginToFetching = () => ({
  type: HTTP_LOGIN_FETCHING,
});

export const setStateLoginToFailed = (payload) => ({
  type: HTTP_LOGIN_FAILED,
  payload,
});

export const setStateLoginToSuccess = (payload) => ({
  type: HTTP_LOGIN_SUCCESS,
  payload,
});

export const setStateLoginToLogout = () => ({
  type: HTTP_LOGIN_LOGOUT,
});

export const login = (value, history) => {
  return async (dispatch) => {
    dispatch(setStateLoginToFetching());
    doGetLogins(dispatch, value, history);
  };
};

const doGetLogins = async (dispatch, value, history) => {
  try {
    let result = await httpClient.post(server.LOGIN_URL, value);
    // console.log(JSON.stringify(result));
    if (result.data.result === "ok") {
      localStorage.setItem(server.TOKEN_KEY, result.data.token);
      localStorage.setItem(server.REFRESH_TOKEN_KEY, result.data.refreshToken);
      dispatch(setStateLoginToSuccess(result));
      history.push("/");
    } else {
      // console.log(JSON.stringify(result.data.message));
      dispatch(setStateLoginToFailed(result.data.message));
    }
  } catch (err) {
    alert(err.message);
    dispatch(setStateLoginToFailed());
  }
};

export const logout = (history) => {
  return (dispatch) => {
    // console.log(history);
    localStorage.removeItem(server.TOKEN_KEY);
    dispatch(setStateLoginToLogout());
    history.push("/login");
  };
};

const checkToken = async () => {
  try {
    let result = await httpClient.get(`${server.CHECKTOKEN_URL}`);
    // console.log("checkToken(): " + result.data.message);
    return result.data.message;
  } catch (err) {
    // alert(err.message);
  }
};

export const isLoggedIn = () => {
  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    // console.log("getToken: " + token);
    if (token) {
      var decodedToken = jwt.decode(token, { complete: true });
      var dateNow = new Date();
      // console.log("decodedToken: " + JSON.stringify(decodedToken));
      // console.log(decodedToken.payload.exp + " : " + dateNow.getTime().toString().substr(0,10));
      if (
        decodedToken.payload.exp <
        dateNow
          .getTime()
          .toString()
          .substr(0, 10)
      ) {
        // console.log("getToken: " + false);
        return false;
      } else {
        // console.log("getToken: " + true);
        return true;
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export const checkLogIn = (route, history) => {
  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    // console.log("getToken: " + token);
    if (token) {
      return checkToken(history).then((result) => {
        // console.log("checkToken: " + result);
        if (result) {
          return true;
        } else {
          if (route == "private") {
            alert("Token expired, please login.");
            localStorage.removeItem(server.TOKEN_KEY);
            history.push("/login");
          }
          return false;
        }
      });
    } else {
      // if (route == "private") {
      //   alert("Token not access, please login.");
      //   localStorage.removeItem(server.TAKEORDER_TOKEN_KEY);
      // }
      return false;
    }
  } catch (err) {
    // if (route == "private") {
    //   alert("Token error. " + err);
    //   localStorage.removeItem(server.TAKEORDER_TOKEN_KEY);
    // }
    return false;
  }
};

export const getTokenCompany = () => {
  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    var decodedToken = jwt.decode(token, { complete: true });
    return decodedToken.payload.sub;
  } catch (e) {
    return false;
  }
};

export const getTokenUsername = () => {
  try {
    let token = localStorage.getItem(server.TOKEN_KEY);
    var decodedToken = jwt.decode(token, { complete: true });
    return decodedToken.payload.aud;
  } catch (e) {
    return false;
  }
};
