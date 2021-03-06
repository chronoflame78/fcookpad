import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {apiURL} from "../config/Constant";
import {
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`${apiURL}/auth/signup`, userData)
    .then(res => history.push("/confirm/?email="+userData.email)) // re-direct to confirm email on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = (userData, history) => dispatch => {
  axios
    .post(`${apiURL}/auth/login`, userData)
    .then(res => {
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      if(err.response.data.message === "Tài khoản chưa được kích hoạt"){
        history.push("/confirm/?email="+userData.email);
      }
      else{
        dispatch({
               type: GET_ERRORS,
               payload: err.response.data
             });
      }
    })
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};