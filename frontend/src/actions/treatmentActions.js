import Axios from "axios";
import {
  FETCH_TREATMENTS_FAIL,
  FETCH_TREATMENTS_REQUEST,
  FETCH_TREATMENTS_SUCCESS,
  ADD_TREATMENT_REQUEST,
  ADD_TREATMENT_SUCCESS,
  ADD_TREATMENT_FAIL,
  UPDATE_TREATMENT_REQUEST,
  UPDATE_TREATMENT_SUCCESS,
  UPDATE_TREATMENT_FAIL,
  FETCH_TREATMENT_FAIL,
  FETCH_TREATMENT_SUCCESS,
  FETCH_TREATMENT_REQUEST,
  DELETE_TREATMENT_REQUEST,
  DELETE_TREATMENT_SUCCESS,
  DELETE_TREATMENT_FAIL,
} from "../constants/treatmentConstants";

export const fetchTreatments = () => async (dispatch) => {
  dispatch({ type: FETCH_TREATMENTS_REQUEST });
  try {
    const { data } = await Axios.get("/api/activity/treatment");
    dispatch({ type: FETCH_TREATMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_TREATMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchTreatment = (id) => async (dispatch) => {
  dispatch({ type: FETCH_TREATMENT_REQUEST });
  try {
    const { data } = await Axios.get(`/api/activity/treatment/${id}`);
    dispatch({ type: FETCH_TREATMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_TREATMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addTreatment = (treatment) => async (dispatch, getState) => {
  dispatch({ type: ADD_TREATMENT_REQUEST, payload: treatment });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/activity/treatment", treatment, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_TREATMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_TREATMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateTreatment = (treatment) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_TREATMENT_REQUEST, payload: treatment });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/activity/treatment/${treatment._id}`,
      treatment,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: UPDATE_TREATMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_TREATMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteTreatment = (id) => async (dispatch, getState) => {
  console.log("here");
  dispatch({ type: DELETE_TREATMENT_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/activity/treatment/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_TREATMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_TREATMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
