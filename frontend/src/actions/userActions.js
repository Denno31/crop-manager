import Axios from "axios";
import {
  ADD_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FETCH_USERS_FAIL,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USER_FAIL,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_SIGN_FAIL,
  USER_SIGN_REQUEST,
  USER_SIGN_SUCCESS,
} from "../constants/userConstants";

export const userSignin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/user/signin", { email, password });
    dispatch({ type: USER_SIGN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchUsers = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/api/user/", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchUser = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/user/${id}/edit`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: FETCH_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addUser = (user) => async (dispatch, getState) => {
  dispatch({ type: ADD_USER_REQUEST, payload: user });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/user/register", user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_REQUEST, payload: user });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(`/api/user/${user._id}/update`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_USER_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/user/${id}/delete`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
