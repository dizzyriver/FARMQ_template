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

axios.defaults.baseURL = "http://127.0.0.1:8000";

// Helper function to transform data to x-www-form-urlencoded
const transformToFormData = (data) => {
  const formData = new URLSearchParams();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

// Async action for registering a user
export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post("/api/users/", userData);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response
        ? error.response.data.detail || error.response.data
        : "Network error",
    });
  }
};

// Async action for logging in
export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(
      "/api/token",
      transformToFormData(credentials),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    localStorage.setItem("token", response.data.access_token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response
        ? error.response.data.detail || error.response.data
        : "Network error",
    });
  }
};

// Action for logging out
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};
