import Axios from "axios";
import {
  FETCH_VARIETIES_FAIL,
  FETCH_VARIETIES_REQUEST,
  FETCH_VARIETIES_SUCCESS,
  ADD_VARIETY_REQUEST,
  ADD_VARIETY_SUCCESS,
  ADD_VARIETY_FAIL,
  UPDATE_VARIETY_REQUEST,
  UPDATE_VARIETY_SUCCESS,
  UPDATE_VARIETY_FAIL,
  FETCH_VARIETY_FAIL,
  FETCH_VARIETY_SUCCESS,
  FETCH_VARIETY_REQUEST,
  DELETE_VARIETY_REQUEST,
  DELETE_VARIETY_SUCCESS,
  DELETE_VARIETY_FAIL,
} from "../constants/varietyConstants";

export const fetchVarieties = () => async (dispatch) => {
  dispatch({ type: FETCH_VARIETIES_REQUEST });
  try {
    const { data } = await Axios.get("/api/variety");
    dispatch({ type: FETCH_VARIETIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_VARIETIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchVariety = (id) => async (dispatch) => {
  dispatch({ type: FETCH_VARIETY_REQUEST });
  try {
    const { data } = await Axios.get(`/api/variety/${id}`);
    dispatch({ type: FETCH_VARIETY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_VARIETY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchVarietiesByCrop = (id) => async (dispatch) => {
  dispatch({ type: FETCH_VARIETIES_REQUEST });
  try {
    const { data } = await Axios.get(`/api/variety/crop/${id}`);
    dispatch({ type: FETCH_VARIETIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_VARIETIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addVariety = (expense) => async (dispatch, getState) => {
  dispatch({ type: ADD_VARIETY_REQUEST, payload: expense });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/variety", expense, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_VARIETY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_VARIETY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateVariety = (expense) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_VARIETY_REQUEST, payload: expense });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(`/api/variety/${expense._id}`, expense, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: UPDATE_VARIETY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_VARIETY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteVariety = (id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_VARIETY_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/variety/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_VARIETY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_VARIETY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
