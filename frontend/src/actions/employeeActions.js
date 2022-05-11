import Axios from "axios";
import {
  FETCH_EMPLOYEES_FAIL,
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  FETCH_EMPLOYEE_FAIL,
  FETCH_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
} from "../constants/employeeConstants";

export const fetchEmployees = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_EMPLOYEES_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/api/employee", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: FETCH_EMPLOYEES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_EMPLOYEES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchEmployee = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_EMPLOYEE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/employee/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: FETCH_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_EMPLOYEE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addEmployee = (employee) => async (dispatch, getState) => {
  dispatch({ type: ADD_EMPLOYEE_REQUEST, payload: employee });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/employee", employee, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_EMPLOYEE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateEmployee = (employee) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_EMPLOYEE_REQUEST, payload: employee });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/employee/${employee._id}`,
      employee,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: UPDATE_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_EMPLOYEE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteEmployee = (id) => async (dispatch, getState) => {
  console.log("here");
  dispatch({ type: DELETE_EMPLOYEE_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/employee/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_EMPLOYEE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
