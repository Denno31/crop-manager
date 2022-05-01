import Axios from "axios";
import {
  FETCH_PLANTINGS_FAIL,
  FETCH_PLANTINGS_REQUEST,
  FETCH_PLANTINGS_SUCCESS,
  ADD_PLANTING_REQUEST,
  ADD_PLANTING_SUCCESS,
  ADD_PLANTING_FAIL,
  UPDATE_PLANTING_REQUEST,
  UPDATE_PLANTING_SUCCESS,
  UPDATE_PLANTING_FAIL,
  FETCH_PLANTING_FAIL,
  FETCH_PLANTING_SUCCESS,
  FETCH_PLANTING_REQUEST,
  DELETE_PLANTING_REQUEST,
  DELETE_PLANTING_SUCCESS,
  DELETE_PLANTING_FAIL,
} from "../constants/plantingConstants";

export const fetchPlantings = () => async (dispatch) => {
  dispatch({ type: FETCH_PLANTINGS_REQUEST });
  try {
    const { data } = await Axios.get("/api/activity/planting");
    dispatch({ type: FETCH_PLANTINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_PLANTINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchPlanting = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PLANTING_REQUEST });
  try {
    const { data } = await Axios.get(`/api/activity/planting/${id}`);
    dispatch({ type: FETCH_PLANTING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_PLANTING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addPlanting = (planting) => async (dispatch, getState) => {
  dispatch({ type: ADD_PLANTING_REQUEST, payload: planting });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/activity/planting", planting, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_PLANTING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_PLANTING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updatePlanting = (planting) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_PLANTING_REQUEST, payload: planting });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/activity/planting/${planting._id}`,
      planting,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: UPDATE_PLANTING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PLANTING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deletePlanting = (id) => async (dispatch, getState) => {
  console.log("here");
  dispatch({ type: DELETE_PLANTING_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/activity/planting/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_PLANTING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_PLANTING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
