import {
  FETCH_STOCKS_FAIL,
  FETCH_STOCKS_REQUEST,
  FETCH_STOCKS_SUCCESS,
  ADD_STOCK_REQUEST,
  ADD_STOCK_SUCCESS,
  ADD_STOCK_FAIL,
  ADD_STOCK_RESET,
  FETCH_STOCK_REQUEST,
  FETCH_STOCK_SUCCESS,
  FETCH_STOCK_FAIL,
  FETCH_STOCK_RESET,
  UPDATE_STOCK_REQUEST,
  UPDATE_STOCK_SUCCESS,
  UPDATE_STOCK_RESET,
  UPDATE_STOCK_FAIL,
  DELETE_STOCK_REQUEST,
  DELETE_STOCK_SUCCESS,
  DELETE_STOCK_RESET,
  DELETE_STOCK_FAIL,
} from "../constants/stockConstants";
export const stocksReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STOCKS_REQUEST:
      return { loading: true };
    case FETCH_STOCKS_SUCCESS:
      return { loading: false, stocks: action.payload };
    case FETCH_STOCKS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const stockReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STOCK_REQUEST:
      return { loading: true };
    case FETCH_STOCK_SUCCESS:
      return { loading: false, stock: action.payload };
    case FETCH_STOCK_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_STOCK_RESET:
      return {};
    default:
      return state;
  }
};

export const addStockReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_STOCK_REQUEST:
      return { loading: true };
    case ADD_STOCK_SUCCESS:
      return { loading: false, success: true, stock: action.payload };
    case ADD_STOCK_RESET:
      return {};
    case ADD_STOCK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateStockReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STOCK_REQUEST:
      return { loading: true };
    case UPDATE_STOCK_SUCCESS:
      return { loading: false, success: true, stock: action.payload };
    case UPDATE_STOCK_RESET:
      return {};
    case UPDATE_STOCK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteStockReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_STOCK_REQUEST:
      return { loading: true };
    case DELETE_STOCK_SUCCESS:
      return { loading: false, success: true };
    case DELETE_STOCK_RESET:
      return {};
    case DELETE_STOCK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
