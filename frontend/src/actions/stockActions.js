import Axios from "axios";
import {
  FETCH_STOCKS_FAIL,
  FETCH_STOCKS_REQUEST,
  FETCH_STOCKS_SUCCESS,
  ADD_STOCK_REQUEST,
  ADD_STOCK_SUCCESS,
  ADD_STOCK_FAIL,
  UPDATE_STOCK_REQUEST,
  UPDATE_STOCK_SUCCESS,
  UPDATE_STOCK_FAIL,
  FETCH_STOCK_FAIL,
  FETCH_STOCK_SUCCESS,
  FETCH_STOCK_REQUEST,
  DELETE_STOCK_REQUEST,
  DELETE_STOCK_SUCCESS,
  DELETE_STOCK_FAIL,
} from "../constants/stockConstants";

export const fetchStocks = () => async (dispatch) => {
  dispatch({ type: FETCH_STOCKS_REQUEST });
  try {
    const { data } = await Axios.get("/api/stock");
    dispatch({ type: FETCH_STOCKS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_STOCKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchStock = (id) => async (dispatch) => {
  dispatch({ type: FETCH_STOCK_REQUEST });
  try {
    const { data } = await Axios.get(`/api/stock/${id}`);
    dispatch({ type: FETCH_STOCK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_STOCK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addStock = (stock) => async (dispatch, getState) => {
  dispatch({ type: ADD_STOCK_REQUEST, payload: stock });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/STOCK", stock, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_STOCK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_STOCK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateStock = (stock) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_STOCK_REQUEST, payload: stock });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(`/api/STOCK/${stock._id}`, stock, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: UPDATE_STOCK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_STOCK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteStock = (id) => async (dispatch, getState) => {
  console.log("here");
  dispatch({ type: DELETE_STOCK_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/stock/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_STOCK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_STOCK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
