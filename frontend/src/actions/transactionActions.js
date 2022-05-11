import Axios from "axios";
import {
  FETCH_TRANSACTIONS_FAIL,
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAIL,
  UPDATE_TRANSACTION_REQUEST,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAIL,
  FETCH_TRANSACTION_FAIL,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAIL,
} from "../constants/transactionConstants";

export const fetchTransactions = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_TRANSACTIONS_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/api/transaction", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: FETCH_TRANSACTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_TRANSACTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchTransaction = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_TRANSACTION_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/transaction/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: FETCH_TRANSACTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_TRANSACTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addTransaction = (transaction) => async (dispatch, getState) => {
  dispatch({ type: ADD_TRANSACTION_REQUEST, payload: transaction });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/transaction", transaction, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_TRANSACTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_TRANSACTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateTransaction =
  (transaction) => async (dispatch, getState) => {
    dispatch({ type: UPDATE_TRANSACTION_REQUEST, payload: transaction });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.put(
        `/api/transaction/${transaction._id}`,
        transaction,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: UPDATE_TRANSACTION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_TRANSACTION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const deleteTransaction = (id) => async (dispatch, getState) => {
  console.log("here");
  dispatch({ type: DELETE_TRANSACTION_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/transaction/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_TRANSACTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_TRANSACTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
