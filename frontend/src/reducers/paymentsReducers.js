import {
  FETCH_TRANSACTIONS_FAIL,
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAIL,
  ADD_TRANSACTION_RESET,
  FETCH_TRANSACTION_REQUEST,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_FAIL,
  FETCH_TRANSACTION_RESET,
  UPDATE_TRANSACTION_REQUEST,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_RESET,
  UPDATE_TRANSACTION_FAIL,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_RESET,
  DELETE_TRANSACTION_FAIL,
} from "../constants/transactionConstants";
export const transactionsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS_REQUEST:
      return { loading: true };
    case FETCH_TRANSACTIONS_SUCCESS:
      return { loading: false, transactions: action.payload };
    case FETCH_TRANSACTIONS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const transactionReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TRANSACTION_REQUEST:
      return { loading: true };
    case FETCH_TRANSACTION_SUCCESS:
      return { loading: false, transaction: action.payload };
    case FETCH_TRANSACTION_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_TRANSACTION_RESET:
      return {};
    default:
      return state;
  }
};

export const addTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TRANSACTION_REQUEST:
      return { loading: true };
    case ADD_TRANSACTION_SUCCESS:
      return { loading: false, success: true, transaction: action.payload };
    case ADD_TRANSACTION_RESET:
      return {};
    case ADD_TRANSACTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TRANSACTION_REQUEST:
      return { loading: true };
    case UPDATE_TRANSACTION_SUCCESS:
      return { loading: false, success: true, transaction: action.payload };
    case UPDATE_TRANSACTION_RESET:
      return {};
    case UPDATE_TRANSACTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TRANSACTION_REQUEST:
      return { loading: true };
    case DELETE_TRANSACTION_SUCCESS:
      return { loading: false, success: true };
    case DELETE_TRANSACTION_RESET:
      return {};
    case DELETE_TRANSACTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
