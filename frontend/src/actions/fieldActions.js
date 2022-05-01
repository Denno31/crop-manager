import Axios from "axios";
import {
  FETCH_FIELDS_FAIL,
  FETCH_FIELDS_REQUEST,
  FETCH_FIELDS_SUCCESS,
  ADD_FIELD_REQUEST,
  ADD_FIELD_SUCCESS,
  ADD_FIELD_FAIL,
  UPDATE_FIELD_REQUEST,
  UPDATE_FIELD_SUCCESS,
  UPDATE_FIELD_FAIL,
  FETCH_FIELD_FAIL,
  FETCH_FIELD_SUCCESS,
  FETCH_FIELD_REQUEST,
  DELETE_FIELD_REQUEST,
  DELETE_FIELD_SUCCESS,
  DELETE_FIELD_FAIL,
} from "../constants/fieldConstants";

export const fetchFields = () => async (dispatch) => {
  dispatch({ type: FETCH_FIELDS_REQUEST });
  try {
    const { data } = await Axios.get("/api/field");
    dispatch({ type: FETCH_FIELDS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_FIELDS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchField = (id) => async (dispatch) => {
  dispatch({ type: FETCH_FIELD_REQUEST });
  try {
    const { data } = await Axios.get(`/api/field/${id}`);
    dispatch({ type: FETCH_FIELD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_FIELD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addField = (field) => async (dispatch, getState) => {
  dispatch({ type: ADD_FIELD_REQUEST, payload: field });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/field", field, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_FIELD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_FIELD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateField = (field) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_FIELD_REQUEST, payload: field });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(`/api/field/${field._id}`, field, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: UPDATE_FIELD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_FIELD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteField = (id) => async (dispatch, getState) => {
  console.log("here");
  dispatch({ type: DELETE_FIELD_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/field/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_FIELD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_FIELD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
