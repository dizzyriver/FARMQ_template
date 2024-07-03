import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../types/actionTypes";

// Async action for logging in
export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post("/api/token", credentials);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    localStorage.setItem("token", response.data.access_token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response ? error.response.data : "Network error",
    });
  }
};

// Action for logging out
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};
