import {
  FETCH_INCOMES_FAIL,
  FETCH_INCOMES_REQUEST,
  FETCH_INCOMES_SUCCESS,
  ADD_INCOME_REQUEST,
  ADD_INCOME_SUCCESS,
  ADD_INCOME_FAIL,
  ADD_INCOME_RESET,
  FETCH_INCOME_REQUEST,
  FETCH_INCOME_SUCCESS,
  FETCH_INCOME_FAIL,
  FETCH_INCOME_RESET,
  UPDATE_INCOME_REQUEST,
  UPDATE_INCOME_SUCCESS,
  UPDATE_INCOME_RESET,
  UPDATE_INCOME_FAIL,
  DELETE_INCOME_REQUEST,
  DELETE_INCOME_SUCCESS,
  DELETE_INCOME_RESET,
  DELETE_INCOME_FAIL,
} from "../constants/incomeConstants";
export const incomesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_INCOMES_REQUEST:
      return { loading: true };
    case FETCH_INCOMES_SUCCESS:
      return { loading: false, incomes: action.payload };
    case FETCH_INCOMES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const incomeReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_INCOME_REQUEST:
      return { loading: true };
    case FETCH_INCOME_SUCCESS:
      return { loading: false, income: action.payload };
    case FETCH_INCOME_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_INCOME_RESET:
      return {};
    default:
      return state;
  }
};

export const addIncomeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_INCOME_REQUEST:
      return { loading: true };
    case ADD_INCOME_SUCCESS:
      return { loading: false, success: true, income: action.payload };
    case ADD_INCOME_RESET:
      return {};
    case ADD_INCOME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateIncomeReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_INCOME_REQUEST:
      return { loading: true };
    case UPDATE_INCOME_SUCCESS:
      return { loading: false, success: true, income: action.payload };
    case UPDATE_INCOME_RESET:
      return {};
    case UPDATE_INCOME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteIncomeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_INCOME_REQUEST:
      return { loading: true };
    case DELETE_INCOME_SUCCESS:
      return { loading: false, success: true };
    case DELETE_INCOME_RESET:
      return {};
    case DELETE_INCOME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
