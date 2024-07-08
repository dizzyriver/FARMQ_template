// src/store/actions/authActions.js
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../types/actionTypes";

// Set the base URL for Axios
axios.defaults.baseURL = "http://127.0.0.1:8000";

// Async action for registering a user
export const registerUser = (userData) => async (dispatch) => {
  console.log("Registering user with data:", userData); // Add logging
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post("/api/users/", userData);
    console.log("User registered successfully:", response.data); // Add logging
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response ? error.response.data : error.message
    ); // Add logging
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response ? error.response.data : "Network error",
    });
    throw error;
  }
};

// Async action for logging in
export const loginUser = (credentials) => async (dispatch) => {
  console.log("Logging in with credentials:", credentials); // Add logging
  dispatch({ type: LOGIN_REQUEST });
  try {
    // Ensure credentials are sent as form data
    const formData = new URLSearchParams();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);
    const response = await axios.post("/api/token", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log("Login successful:", response.data); // Add logging
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    localStorage.setItem("token", response.data.access_token);
  } catch (error) {
    console.error(
      "Error logging in:",
      error.response ? error.response.data : error.message
    ); // Add logging
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response ? error.response.data : "Network error",
    });
  }
};

// Action for logging out
export const logoutUser = () => (dispatch) => {
  console.log("Logging out"); // Add logging
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};
