import {
  FETCH_FIELDS_FAIL,
  FETCH_FIELDS_REQUEST,
  FETCH_FIELDS_SUCCESS,
  ADD_FIELD_REQUEST,
  ADD_FIELD_SUCCESS,
  ADD_FIELD_FAIL,
  ADD_FIELD_RESET,
  FETCH_FIELD_REQUEST,
  FETCH_FIELD_SUCCESS,
  FETCH_FIELD_FAIL,
  FETCH_FIELD_RESET,
  UPDATE_FIELD_REQUEST,
  UPDATE_FIELD_SUCCESS,
  UPDATE_FIELD_RESET,
  UPDATE_FIELD_FAIL,
  DELETE_FIELD_REQUEST,
  DELETE_FIELD_SUCCESS,
  DELETE_FIELD_RESET,
  DELETE_FIELD_FAIL,
} from "../constants/fieldConstants";
export const fieldsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_FIELDS_REQUEST:
      return { loading: true };
    case FETCH_FIELDS_SUCCESS:
      return { loading: false, fields: action.payload };
    case FETCH_FIELDS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const fieldReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_FIELD_REQUEST:
      return { loading: true };
    case FETCH_FIELD_SUCCESS:
      return { loading: false, field: action.payload };
    case FETCH_FIELD_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_FIELD_RESET:
      return {};
    default:
      return state;
  }
};

export const addFieldReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FIELD_REQUEST:
      return { loading: true };
    case ADD_FIELD_SUCCESS:
      return { loading: false, success: true, field: action.payload };
    case ADD_FIELD_RESET:
      return {};
    case ADD_FIELD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateFieldReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FIELD_REQUEST:
      return { loading: true };
    case UPDATE_FIELD_SUCCESS:
      return { loading: false, success: true, field: action.payload };
    case UPDATE_FIELD_RESET:
      return {};
    case UPDATE_FIELD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteFieldReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_FIELD_REQUEST:
      return { loading: true };
    case DELETE_FIELD_SUCCESS:
      return { loading: false, success: true };
    case DELETE_FIELD_RESET:
      return {};
    case DELETE_FIELD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
