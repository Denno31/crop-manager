import Axios from "axios";
import {
  FETCH_TASKS_FAIL,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  FETCH_TASK_FAIL,
  FETCH_TASK_SUCCESS,
  FETCH_TASK_REQUEST,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
} from "../constants/taskConstants";

export const fetchTasks = () => async (dispatch) => {
  dispatch({ type: FETCH_TASKS_REQUEST });
  try {
    const { data } = await Axios.get("/api/activity/task");
    dispatch({ type: FETCH_TASKS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchTask = (id) => async (dispatch) => {
  dispatch({ type: FETCH_TASK_REQUEST });
  try {
    const { data } = await Axios.get(`/api/activity/task/${id}`);
    dispatch({ type: FETCH_TASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addTask = (task) => async (dispatch, getState) => {
  dispatch({ type: ADD_TASK_REQUEST, payload: task });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/activity/task", task, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_TASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateTask = (task) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_TASK_REQUEST, payload: task });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(`/api/activity/task/${task._id}`, task, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: UPDATE_TASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteTask = (id) => async (dispatch, getState) => {
  console.log("here");
  dispatch({ type: DELETE_TASK_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/activity/task/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_TASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
