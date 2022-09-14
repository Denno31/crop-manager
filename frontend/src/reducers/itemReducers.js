import {
  FETCH_ITEMS_FAIL,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  ADD_ITEM_RESET,
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAIL,
  FETCH_ITEM_RESET,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_RESET,
  UPDATE_ITEM_FAIL,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_RESET,
  DELETE_ITEM_FAIL,
} from "../constants/itemConstants";
export const itemsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return { loading: true };
    case FETCH_ITEMS_SUCCESS:
      return { loading: false, items: action.payload };
    case FETCH_ITEMS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ITEM_REQUEST:
      return { loading: true };
    case FETCH_ITEM_SUCCESS:
      return { loading: false, item: action.payload };
    case FETCH_ITEM_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_ITEM_RESET:
      return {};
    default:
      return state;
  }
};

export const addItemReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
      return { loading: true };
    case ADD_ITEM_SUCCESS:
      return { loading: false, success: true, item: action.payload };
    case ADD_ITEM_RESET:
      return {};
    case ADD_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateItemReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ITEM_REQUEST:
      return { loading: true };
    case UPDATE_ITEM_SUCCESS:
      return { loading: false, success: true, item: action.payload };
    case UPDATE_ITEM_RESET:
      return {};
    case UPDATE_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteItemReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ITEM_REQUEST:
      return { loading: true };
    case DELETE_ITEM_SUCCESS:
      return { loading: false, success: true };
    case DELETE_ITEM_RESET:
      return {};
    case DELETE_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
