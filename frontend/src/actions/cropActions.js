import Axios from "axios";
import {
  FETCH_CROPS_FAIL,
  FETCH_CROPS_REQUEST,
  FETCH_CROPS_SUCCESS,
  ADD_CROP_REQUEST,
  ADD_CROP_SUCCESS,
  ADD_CROP_FAIL,
  UPDATE_CROP_REQUEST,
  UPDATE_CROP_SUCCESS,
  UPDATE_CROP_FAIL,
  FETCH_CROP_FAIL,
  FETCH_CROP_SUCCESS,
  FETCH_CROP_REQUEST,
  DELETE_CROP_REQUEST,
  DELETE_CROP_SUCCESS,
  DELETE_CROP_FAIL,
} from "../constants/cropConstants";

export const fetchCrops = () => async (dispatch) => {
  dispatch({ type: FETCH_CROPS_REQUEST });
  try {
    const { data } = await Axios.get("/api/crop");
    dispatch({ type: FETCH_CROPS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_CROPS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchCrop = (id) => async (dispatch) => {
  dispatch({ type: FETCH_CROP_REQUEST });
  try {
    const { data } = await Axios.get(`/api/crop/${id}`);
    dispatch({ type: FETCH_CROP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_CROP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addCrop = (crop) => async (dispatch, getState) => {
  dispatch({ type: ADD_CROP_REQUEST, payload: crop });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/CROP", crop, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_CROP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_CROP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateCrop = (crop) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_CROP_REQUEST, payload: crop });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(`/api/CROP/${crop._id}`, crop, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: UPDATE_CROP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_CROP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteCrop = (id) => async (dispatch, getState) => {
  console.log("here");
  dispatch({ type: DELETE_CROP_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/crop/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_CROP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_CROP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
