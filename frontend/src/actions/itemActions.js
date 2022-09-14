import Axios from "axios";
import {
  FETCH_ITEMS_FAIL,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAIL,
  FETCH_ITEM_FAIL,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_REQUEST,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAIL,
} from "../constants/itemConstants";

export const fetchItems = () => async (dispatch) => {
  dispatch({ type: FETCH_ITEMS_REQUEST });
  try {
    const { data } = await Axios.get("/api/items");
    dispatch({ type: FETCH_ITEMS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ITEMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchItem = (id) => async (dispatch) => {
  dispatch({ type: FETCH_ITEM_REQUEST });
  try {
    const { data } = await Axios.get(`/api/items/${id}`);
    dispatch({ type: FETCH_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addItem = (item) => async (dispatch, getState) => {
  dispatch({ type: ADD_ITEM_REQUEST, payload: item });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/items", item, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADD_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateItem = (item) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_ITEM_REQUEST, payload: item });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(`/api/items/${item._id}`, item, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: UPDATE_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteItem = (id) => async (dispatch, getState) => {
  console.log("here");
  dispatch({ type: DELETE_ITEM_REQUEST, payload: id });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/items/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
