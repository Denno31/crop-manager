import {
  FETCH_INCOME_CATEGORIES_FAIL,
  FETCH_INCOME_CATEGORIES_REQUEST,
  FETCH_INCOME_CATEGORIES_SUCCESS,
  ADD_INCOME_CATEGORY_REQUEST,
  ADD_INCOME_CATEGORY_SUCCESS,
  ADD_INCOME_CATEGORY_FAIL,
  ADD_INCOME_CATEGORY_RESET,
  FETCH_INCOME_CATEGORY_REQUEST,
  FETCH_INCOME_CATEGORY_SUCCESS,
  FETCH_INCOME_CATEGORY_FAIL,
  FETCH_INCOME_CATEGORY_RESET,
  UPDATE_INCOME_CATEGORY_REQUEST,
  UPDATE_INCOME_CATEGORY_SUCCESS,
  UPDATE_INCOME_CATEGORY_RESET,
  UPDATE_INCOME_CATEGORY_FAIL,
  DELETE_INCOME_CATEGORY_REQUEST,
  DELETE_INCOME_CATEGORY_SUCCESS,
  DELETE_INCOME_CATEGORY_RESET,
  DELETE_INCOME_CATEGORY_FAIL,
} from "../constants/incomeCategoryConstants";
export const incomeCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_INCOME_CATEGORIES_REQUEST:
      return { loading: true };
    case FETCH_INCOME_CATEGORIES_SUCCESS:
      return { loading: false, incomeCategories: action.payload };
    case FETCH_INCOME_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const incomeCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_INCOME_CATEGORY_REQUEST:
      return { loading: true };
    case FETCH_INCOME_CATEGORY_SUCCESS:
      return { loading: false, incomeCategory: action.payload };
    case FETCH_INCOME_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_INCOME_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const addIncomeCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_INCOME_CATEGORY_REQUEST:
      return { loading: true };
    case ADD_INCOME_CATEGORY_SUCCESS:
      return { loading: false, success: true, incomeCategory: action.payload };
    case ADD_INCOME_CATEGORY_RESET:
      return {};
    case ADD_INCOME_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateIncomeCategroyReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_INCOME_CATEGORY_REQUEST:
      return { loading: true };
    case UPDATE_INCOME_CATEGORY_SUCCESS:
      return { loading: false, success: true, incomeCategory: action.payload };
    case UPDATE_INCOME_CATEGORY_RESET:
      return {};
    case UPDATE_INCOME_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteIncomeCateogryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_INCOME_CATEGORY_REQUEST:
      return { loading: true };
    case DELETE_INCOME_CATEGORY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_INCOME_CATEGORY_RESET:
      return {};
    case DELETE_INCOME_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
