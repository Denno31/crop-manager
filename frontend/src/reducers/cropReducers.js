import {
  FETCH_CROPS_FAIL,
  FETCH_CROPS_REQUEST,
  FETCH_CROPS_SUCCESS,
  ADD_CROP_REQUEST,
  ADD_CROP_SUCCESS,
  ADD_CROP_FAIL,
  ADD_CROP_RESET,
  FETCH_CROP_REQUEST,
  FETCH_CROP_SUCCESS,
  FETCH_CROP_FAIL,
  FETCH_CROP_RESET,
  UPDATE_CROP_REQUEST,
  UPDATE_CROP_SUCCESS,
  UPDATE_CROP_RESET,
  UPDATE_CROP_FAIL,
  DELETE_CROP_REQUEST,
  DELETE_CROP_SUCCESS,
  DELETE_CROP_RESET,
  DELETE_CROP_FAIL,
} from "../constants/cropConstants";
export const cropsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CROPS_REQUEST:
      return { loading: true };
    case FETCH_CROPS_SUCCESS:
      return { loading: false, crops: action.payload };
    case FETCH_CROPS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const cropReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CROP_REQUEST:
      return { loading: true };
    case FETCH_CROP_SUCCESS:
      return { loading: false, crop: action.payload };
    case FETCH_CROP_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_CROP_RESET:
      return {};
    default:
      return state;
  }
};

export const addCropReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CROP_REQUEST:
      return { loading: true };
    case ADD_CROP_SUCCESS:
      return { loading: false, success: true, crop: action.payload };
    case ADD_CROP_RESET:
      return {};
    case ADD_CROP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateCropReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CROP_REQUEST:
      return { loading: true };
    case UPDATE_CROP_SUCCESS:
      return { loading: false, success: true, crop: action.payload };
    case UPDATE_CROP_RESET:
      return {};
    case UPDATE_CROP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteCropReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CROP_REQUEST:
      return { loading: true };
    case DELETE_CROP_SUCCESS:
      return { loading: false, success: true };
    case DELETE_CROP_RESET:
      return {};
    case DELETE_CROP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
