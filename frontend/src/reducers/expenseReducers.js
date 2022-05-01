import {
  FETCH_EXPENSES_FAIL,
  FETCH_EXPENSES_REQUEST,
  FETCH_EXPENSES_SUCCESS,
  ADD_EXPENSE_REQUEST,
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_FAIL,
  ADD_EXPENSE_RESET,
  FETCH_EXPENSE_REQUEST,
  FETCH_EXPENSE_SUCCESS,
  FETCH_EXPENSE_FAIL,
  FETCH_EXPENSE_RESET,
  UPDATE_EXPENSE_REQUEST,
  UPDATE_EXPENSE_SUCCESS,
  UPDATE_EXPENSE_RESET,
  UPDATE_EXPENSE_FAIL,
  DELETE_EXPENSE_REQUEST,
  DELETE_EXPENSE_SUCCESS,
  DELETE_EXPENSE_RESET,
  DELETE_EXPENSE_FAIL,
} from "../constants/expenseConstants";
export const expensesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_EXPENSES_REQUEST:
      return { loading: true };
    case FETCH_EXPENSES_SUCCESS:
      return { loading: false, expenses: action.payload };
    case FETCH_EXPENSES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const expenseReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_EXPENSE_REQUEST:
      return { loading: true };
    case FETCH_EXPENSE_SUCCESS:
      return { loading: false, expense: action.payload };
    case FETCH_EXPENSE_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_EXPENSE_RESET:
      return {};
    default:
      return state;
  }
};

export const addExpenseReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EXPENSE_REQUEST:
      return { loading: true };
    case ADD_EXPENSE_SUCCESS:
      return { loading: false, success: true, expense: action.payload };
    case ADD_EXPENSE_RESET:
      return {};
    case ADD_EXPENSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateExpenseReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EXPENSE_REQUEST:
      return { loading: true };
    case UPDATE_EXPENSE_SUCCESS:
      return { loading: false, success: true, expense: action.payload };
    case UPDATE_EXPENSE_RESET:
      return {};
    case UPDATE_EXPENSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteExpenseReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EXPENSE_REQUEST:
      return { loading: true };
    case DELETE_EXPENSE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_EXPENSE_RESET:
      return {};
    case DELETE_EXPENSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
