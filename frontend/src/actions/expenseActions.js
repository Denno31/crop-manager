import Axios from "axios";
import {
  FETCH_EXPENSES_FAIL,
  FETCH_EXPENSES_REQUEST,
  FETCH_EXPENSES_SUCCESS,
  ADD_EXPENSE_REQUEST,
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_FAIL,
  UPDATE_EXPENSE_REQUEST,
  UPDATE_EXPENSE_SUCCESS,
  UPDATE_EXPENSE_FAIL,
  FETCH_EXPENSE_FAIL,
  FETCH_EXPENSE_SUCCESS,
  FETCH_EXPENSE_REQUEST,
  DELETE_EXPENSE_REQUEST,
  DELETE_EXPENSE_SUCCESS,
  DELETE_EXPENSE_FAIL,
} from "../constants/expenseConstants";

export const fetchExpenses = () => async (dispatch) => {
  dispatch({ type: FETCH_EXPENSES_REQUEST });
  try {
    const { data } = await Axios.get("/api/expense");
    dispatch({ type: FETCH_EXPENSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_EXPENSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchExpense = (id) => async (dispatch) => {
  dispatch({ type: FETCH_EXPENSE_REQUEST });
  try {
    const { data } = await Axios.get(`/api/expense/${id}`);
    dispatch({ type: FETCH_EXPENSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_EXPENSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addExpense = (expense) => async (dispatch, getState) => {
  dispatch({ type: ADD_EXPENSE_REQUEST, payload: expense });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/expense", expense, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_EXPENSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_EXPENSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateExpense = (expense) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_EXPENSE_REQUEST, payload: expense });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(`/api/expense/${expense._id}`, expense, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: UPDATE_EXPENSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_EXPENSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteExpense = (id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_EXPENSE_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/expense/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_EXPENSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_EXPENSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
