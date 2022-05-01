import {
  FETCH_EXPENSE_CATEGORIES_FAIL,
  FETCH_EXPENSE_CATEGORIES_REQUEST,
  FETCH_EXPENSE_CATEGORIES_SUCCESS,
  ADD_EXPENSE_CATEGORY_REQUEST,
  ADD_EXPENSE_CATEGORY_SUCCESS,
  ADD_EXPENSE_CATEGORY_FAIL,
  ADD_EXPENSE_CATEGORY_RESET,
  FETCH_EXPENSE_CATEGORY_REQUEST,
  FETCH_EXPENSE_CATEGORY_SUCCESS,
  FETCH_EXPENSE_CATEGORY_FAIL,
  FETCH_EXPENSE_CATEGORY_RESET,
  UPDATE_EXPENSE_CATEGORY_REQUEST,
  UPDATE_EXPENSE_CATEGORY_SUCCESS,
  UPDATE_EXPENSE_CATEGORY_RESET,
  UPDATE_EXPENSE_CATEGORY_FAIL,
  DELETE_EXPENSE_CATEGORY_REQUEST,
  DELETE_EXPENSE_CATEGORY_SUCCESS,
  DELETE_EXPENSE_CATEGORY_RESET,
  DELETE_EXPENSE_CATEGORY_FAIL,
} from "../constants/expenseCategoryConstants";
export const expenseCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_EXPENSE_CATEGORIES_REQUEST:
      return { loading: true };
    case FETCH_EXPENSE_CATEGORIES_SUCCESS:
      return { loading: false, expenseCategories: action.payload };
    case FETCH_EXPENSE_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const expenseCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_EXPENSE_CATEGORY_REQUEST:
      return { loading: true };
    case FETCH_EXPENSE_CATEGORY_SUCCESS:
      return { loading: false, expenseCategory: action.payload };
    case FETCH_EXPENSE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_EXPENSE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const addExpenseCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EXPENSE_CATEGORY_REQUEST:
      return { loading: true };
    case ADD_EXPENSE_CATEGORY_SUCCESS:
      return { loading: false, success: true, expenseCategory: action.payload };
    case ADD_EXPENSE_CATEGORY_RESET:
      return {};
    case ADD_EXPENSE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateExpenseCategroyReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EXPENSE_CATEGORY_REQUEST:
      return { loading: true };
    case UPDATE_EXPENSE_CATEGORY_SUCCESS:
      return { loading: false, success: true, expenseCategory: action.payload };
    case UPDATE_EXPENSE_CATEGORY_RESET:
      return {};
    case UPDATE_EXPENSE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteExpenseCateogryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EXPENSE_CATEGORY_REQUEST:
      return { loading: true };
    case DELETE_EXPENSE_CATEGORY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_EXPENSE_CATEGORY_RESET:
      return {};
    case DELETE_EXPENSE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
