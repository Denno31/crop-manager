import Axios from "axios";
import {
  FETCH_HARVESTS_FAIL,
  FETCH_HARVESTS_REQUEST,
  FETCH_HARVESTS_SUCCESS,
  ADD_HARVEST_REQUEST,
  ADD_HARVEST_SUCCESS,
  ADD_HARVEST_FAIL,
  UPDATE_HARVEST_REQUEST,
  UPDATE_HARVEST_SUCCESS,
  UPDATE_HARVEST_FAIL,
  FETCH_HARVEST_FAIL,
  FETCH_HARVEST_SUCCESS,
  FETCH_HARVEST_REQUEST,
  DELETE_HARVEST_REQUEST,
  DELETE_HARVEST_SUCCESS,
  DELETE_HARVEST_FAIL,
} from "../constants/harvestConstants";

export const fetchHarvests = () => async (dispatch) => {
  dispatch({ type: FETCH_HARVESTS_REQUEST });
  try {
    const { data } = await Axios.get("/api/activity/harvest");
    dispatch({ type: FETCH_HARVESTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_HARVESTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchHarvest = (id) => async (dispatch) => {
  dispatch({ type: FETCH_HARVEST_REQUEST });
  try {
    const { data } = await Axios.get(`/api/activity/harvest/${id}`);
    dispatch({ type: FETCH_HARVEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_HARVEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addHarvest = (harvest) => async (dispatch, getState) => {
  dispatch({ type: ADD_HARVEST_REQUEST, payload: harvest });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/activity/harvest", harvest, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_HARVEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_HARVEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateHarvest = (harvest) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_HARVEST_REQUEST, payload: harvest });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/activity/harvest/${harvest._id}`,
      harvest,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: UPDATE_HARVEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_HARVEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteHarvest = (id) => async (dispatch, getState) => {
  console.log("here");
  dispatch({ type: DELETE_HARVEST_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/activity/harvest/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_HARVEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_HARVEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
