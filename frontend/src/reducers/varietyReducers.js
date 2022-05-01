import {
  FETCH_VARIETIES_FAIL,
  FETCH_VARIETIES_REQUEST,
  FETCH_VARIETIES_SUCCESS,
  ADD_VARIETY_REQUEST,
  ADD_VARIETY_SUCCESS,
  ADD_VARIETY_FAIL,
  ADD_VARIETY_RESET,
  FETCH_VARIETY_REQUEST,
  FETCH_VARIETY_SUCCESS,
  FETCH_VARIETY_FAIL,
  FETCH_VARIETY_RESET,
  UPDATE_VARIETY_REQUEST,
  UPDATE_VARIETY_SUCCESS,
  UPDATE_VARIETY_RESET,
  UPDATE_VARIETY_FAIL,
  DELETE_VARIETY_REQUEST,
  DELETE_VARIETY_SUCCESS,
  DELETE_VARIETY_RESET,
  DELETE_VARIETY_FAIL,
} from "../constants/varietyConstants";
export const varietiesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_VARIETIES_REQUEST:
      return { loading: true };
    case FETCH_VARIETIES_SUCCESS:
      return { loading: false, varieties: action.payload };
    case FETCH_VARIETIES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const varietyReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_VARIETY_REQUEST:
      return { loading: true };
    case FETCH_VARIETY_SUCCESS:
      return { loading: false, variety: action.payload };
    case FETCH_VARIETY_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_VARIETY_RESET:
      return {};
    default:
      return state;
  }
};

export const addVarietyReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_VARIETY_REQUEST:
      return { loading: true };
    case ADD_VARIETY_SUCCESS:
      return { loading: false, success: true, field: action.payload };
    case ADD_VARIETY_RESET:
      return {};
    case ADD_VARIETY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateVarietyReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_VARIETY_REQUEST:
      return { loading: true };
    case UPDATE_VARIETY_SUCCESS:
      return { loading: false, success: true, field: action.payload };
    case UPDATE_VARIETY_RESET:
      return {};
    case UPDATE_VARIETY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteVarietyReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_VARIETY_REQUEST:
      return { loading: true };
    case DELETE_VARIETY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_VARIETY_RESET:
      return {};
    case DELETE_VARIETY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
