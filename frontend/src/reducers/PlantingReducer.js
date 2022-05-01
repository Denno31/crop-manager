import {
  FETCH_PLANTINGS_FAIL,
  FETCH_PLANTINGS_REQUEST,
  FETCH_PLANTINGS_SUCCESS,
  ADD_PLANTING_REQUEST,
  ADD_PLANTING_SUCCESS,
  ADD_PLANTING_FAIL,
  ADD_PLANTING_RESET,
  FETCH_PLANTING_REQUEST,
  FETCH_PLANTING_SUCCESS,
  FETCH_PLANTING_FAIL,
  FETCH_PLANTING_RESET,
  UPDATE_PLANTING_REQUEST,
  UPDATE_PLANTING_SUCCESS,
  UPDATE_PLANTING_RESET,
  UPDATE_PLANTING_FAIL,
  DELETE_PLANTING_REQUEST,
  DELETE_PLANTING_SUCCESS,
  DELETE_PLANTING_RESET,
  DELETE_PLANTING_FAIL,
} from "../constants/plantingConstants";
export const plantingsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PLANTINGS_REQUEST:
      return { loading: true };
    case FETCH_PLANTINGS_SUCCESS:
      return { loading: false, plantings: action.payload };
    case FETCH_PLANTINGS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const plantingReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PLANTING_REQUEST:
      return { loading: true };
    case FETCH_PLANTING_SUCCESS:
      return { loading: false, planting: action.payload };
    case FETCH_PLANTING_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_PLANTING_RESET:
      return {};
    default:
      return state;
  }
};

export const addPlantingReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PLANTING_REQUEST:
      return { loading: true };
    case ADD_PLANTING_SUCCESS:
      return { loading: false, success: true, planting: action.payload };
    case ADD_PLANTING_RESET:
      return {};
    case ADD_PLANTING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updatePlantingReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PLANTING_REQUEST:
      return { loading: true };
    case UPDATE_PLANTING_SUCCESS:
      return { loading: false, success: true, planting: action.payload };
    case UPDATE_PLANTING_RESET:
      return {};
    case UPDATE_PLANTING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deletePlantingReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PLANTING_REQUEST:
      return { loading: true };
    case DELETE_PLANTING_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PLANTING_RESET:
      return {};
    case DELETE_PLANTING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
