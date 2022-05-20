import Axios from "axios";
import {
  FETCH_ATTENDANCES_FAIL,
  FETCH_ATTENDANCES_REQUEST,
  FETCH_ATTENDANCES_SUCCESS,
  ADD_ATTENDANCE_REQUEST,
  ADD_ATTENDANCE_SUCCESS,
  ADD_ATTENDANCE_FAIL,
  UPDATE_ATTENDANCE_REQUEST,
  UPDATE_ATTENDANCE_SUCCESS,
  UPDATE_ATTENDANCE_FAIL,
  FETCH_ATTENDANCE_FAIL,
  FETCH_ATTENDANCE_SUCCESS,
  FETCH_ATTENDANCE_REQUEST,
  DELETE_ATTENDANCE_REQUEST,
  DELETE_ATTENDANCE_SUCCESS,
  DELETE_ATTENDANCE_FAIL,
} from "../constants/attendanceConstants";

export const fetchAttendances = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_ATTENDANCES_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/api/attendance", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: FETCH_ATTENDANCES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ATTENDANCES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchAttendance = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_ATTENDANCE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/attendance/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: FETCH_ATTENDANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ATTENDANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addAttendance = (attendance) => async (dispatch, getState) => {
  dispatch({ type: ADD_ATTENDANCE_REQUEST, payload: attendance });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/attendance", attendance, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_ATTENDANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_ATTENDANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateAttendance = (attendance) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_ATTENDANCE_REQUEST, payload: attendance });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/attendance/${attendance._id}`,
      attendance,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: UPDATE_ATTENDANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_ATTENDANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteAttendance = (id) => async (dispatch, getState) => {
  console.log("here");
  dispatch({ type: DELETE_ATTENDANCE_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/attendance/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_ATTENDANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_ATTENDANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
