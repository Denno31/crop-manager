import Axios from "axios";
import {
  FETCH_EXPENSE_CATEGORIES_FAIL,
  FETCH_EXPENSE_CATEGORIES_REQUEST,
  FETCH_EXPENSE_CATEGORIES_SUCCESS,
  ADD_EXPENSE_CATEGORY_REQUEST,
  ADD_EXPENSE_CATEGORY_SUCCESS,
  ADD_EXPENSE_CATEGORY_FAIL,
  UPDATE_EXPENSE_CATEGORY_REQUEST,
  UPDATE_EXPENSE_CATEGORY_SUCCESS,
  UPDATE_EXPENSE_CATEGORY_FAIL,
  FETCH_EXPENSE_CATEGORY_FAIL,
  FETCH_EXPENSE_CATEGORY_SUCCESS,
  FETCH_EXPENSE_CATEGORY_REQUEST,
  DELETE_EXPENSE_CATEGORY_REQUEST,
  DELETE_EXPENSE_CATEGORY_SUCCESS,
  DELETE_EXPENSE_CATEGORY_FAIL,
} from "../constants/expenseCategoryConstants";

export const fetchExpenseCategories = () => async (dispatch) => {
  dispatch({ type: FETCH_EXPENSE_CATEGORIES_REQUEST });
  try {
    const { data } = await Axios.get("/api/expensecategory");
    dispatch({ type: FETCH_EXPENSE_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_EXPENSE_CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchExpenseCategory = (id) => async (dispatch) => {
  dispatch({ type: FETCH_EXPENSE_CATEGORY_REQUEST });
  try {
    const { data } = await Axios.get(`/api/expensecategory/${id}`);
    dispatch({ type: FETCH_EXPENSE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_EXPENSE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addExpenseCategory = (expense) => async (dispatch, getState) => {
  dispatch({ type: ADD_EXPENSE_CATEGORY_REQUEST, payload: expense });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/expensecategory", expense, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_EXPENSE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_EXPENSE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateExpenseCategory =
  (expense) => async (dispatch, getState) => {
    dispatch({ type: UPDATE_EXPENSE_CATEGORY_REQUEST, payload: expense });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.put(
        `/api/expensecategory/${expense._id}`,
        expense,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: UPDATE_EXPENSE_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_EXPENSE_CATEGORY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const deleteExpenseCategory = (id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_EXPENSE_CATEGORY_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/expensecategory/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_EXPENSE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_EXPENSE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
