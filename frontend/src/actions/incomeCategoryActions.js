import Axios from "axios";
import {
  FETCH_INCOME_CATEGORIES_FAIL,
  FETCH_INCOME_CATEGORIES_REQUEST,
  FETCH_INCOME_CATEGORIES_SUCCESS,
  ADD_INCOME_CATEGORY_REQUEST,
  ADD_INCOME_CATEGORY_SUCCESS,
  ADD_INCOME_CATEGORY_FAIL,
  UPDATE_INCOME_CATEGORY_REQUEST,
  UPDATE_INCOME_CATEGORY_SUCCESS,
  UPDATE_INCOME_CATEGORY_FAIL,
  FETCH_INCOME_CATEGORY_FAIL,
  FETCH_INCOME_CATEGORY_SUCCESS,
  FETCH_INCOME_CATEGORY_REQUEST,
  DELETE_INCOME_CATEGORY_REQUEST,
  DELETE_INCOME_CATEGORY_SUCCESS,
  DELETE_INCOME_CATEGORY_FAIL,
} from "../constants/incomeCategoryConstants";

export const fetchIncomeCategories = () => async (dispatch) => {
  dispatch({ type: FETCH_INCOME_CATEGORIES_REQUEST });
  try {
    const { data } = await Axios.get("/api/incomecategory");
    dispatch({ type: FETCH_INCOME_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_INCOME_CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchIncomeCategory = (id) => async (dispatch) => {
  dispatch({ type: FETCH_INCOME_CATEGORY_REQUEST });
  try {
    const { data } = await Axios.get(`/api/incomecategory/${id}`);
    dispatch({ type: FETCH_INCOME_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_INCOME_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addIncomeCategory = (expense) => async (dispatch, getState) => {
  dispatch({ type: ADD_INCOME_CATEGORY_REQUEST, payload: expense });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/incomecategory", expense, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_INCOME_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_INCOME_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateIncomeCategory = (expense) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_INCOME_CATEGORY_REQUEST, payload: expense });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/incomecategory/${expense._id}`,
      expense,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: UPDATE_INCOME_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_INCOME_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteIncomeCategory = (id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_INCOME_CATEGORY_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/incomecategory/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_INCOME_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_INCOME_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
