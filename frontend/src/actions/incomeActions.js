import Axios from "axios";
import {
  FETCH_INCOMES_FAIL,
  FETCH_INCOMES_REQUEST,
  FETCH_INCOMES_SUCCESS,
  ADD_INCOME_REQUEST,
  ADD_INCOME_SUCCESS,
  ADD_INCOME_FAIL,
  UPDATE_INCOME_REQUEST,
  UPDATE_INCOME_SUCCESS,
  UPDATE_INCOME_FAIL,
  FETCH_INCOME_FAIL,
  FETCH_INCOME_SUCCESS,
  FETCH_INCOME_REQUEST,
  DELETE_INCOME_REQUEST,
  DELETE_INCOME_SUCCESS,
  DELETE_INCOME_FAIL,
} from "../constants/incomeConstants";

export const fetchIncomes = () => async (dispatch) => {
  dispatch({ type: FETCH_INCOMES_REQUEST });
  try {
    const { data } = await Axios.get("/api/income");
    dispatch({ type: FETCH_INCOMES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_INCOMES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchIncome = (id) => async (dispatch) => {
  dispatch({ type: FETCH_INCOME_REQUEST });
  try {
    const { data } = await Axios.get(`/api/income/${id}`);
    dispatch({ type: FETCH_INCOME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_INCOME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addIncome = (expense) => async (dispatch, getState) => {
  dispatch({ type: ADD_INCOME_REQUEST, payload: expense });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/income", expense, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_INCOME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_INCOME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateIncome = (expense) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_INCOME_REQUEST, payload: expense });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(`/api/income/${expense._id}`, expense, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: UPDATE_INCOME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_INCOME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteIncome = (id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_INCOME_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/income/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_INCOME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_INCOME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
